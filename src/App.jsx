import { ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Hero from "./components/Hero.jsx";
import MetricStrip from "./components/MetricStrip.jsx";
import CaseStudies from "./components/CaseStudies.jsx";
import CaseStudyDetail from "./components/CaseStudyDetail.jsx";
import Experience from "./components/Experience.jsx";
import Certifications from "./components/Certifications.jsx";
import Contact from "./components/Contact.jsx";
import { getPortfolioContent } from "./data/portfolio.js";
import { canonicalUrl, caseStudySections, defaultSeo, portfolioSections, storySections } from "./data/seo.js";

const themeStorageKey = "aouroui-portfolio-theme-v2";
const languageStorageKey = "aouroui-portfolio-language-v2";
const wheelIntentTimeoutMs = 420;
const wheelPageThreshold = 160;
const wheelEdgePageThreshold = 180;
const wheelHorizontalPageThreshold = 90;
const wheelEdgeHoldMs = 180;
const scrollLockMs = 680;
const touchAxisThreshold = 10;
const touchPageThreshold = 76;
const verticalScrollableOverflow = 8;
const verticalEdgeBuffer = 6;
const verticalScrollSelector = ".story-scroll-y, [class*=\"overflow-y-auto\"], [class*=\"overflow-y-scroll\"]";

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem(themeStorageKey) === "dark" ? "dark" : "light";
}

function getInitialLanguage() {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem(languageStorageKey) === "fr" ? "fr" : "en";
}

function normalizePath(pathname = "/") {
  const [pathOnly] = pathname.split("#");
  const cleanPath = pathOnly.replace(/\/+$/, "") || "/";
  return cleanPath === "/index.html" ? "/" : cleanPath;
}

function normalizeHash(hash = "") {
  const rawHash = hash.includes("#") ? hash.slice(hash.indexOf("#") + 1) : hash;
  return rawHash.replace(/^\/+/, "").replace(/\/+$/, "");
}

function normalizeNavigationTarget(pathname = "/", hash = "") {
  const normalizedPath = normalizePath(pathname);
  const normalizedHash = normalizeHash(hash || pathname);
  return `${normalizedPath}${normalizedHash ? `#${normalizedHash}` : ""}`;
}

function getSectionIndexFromPath(pathname = "/", hash = "") {
  const path = normalizePath(pathname);
  const hashId = normalizeHash(hash || pathname);

  if (path === "/" && hashId) {
    const hashIndex = portfolioSections.findIndex((section) => section.id === hashId);
    if (hashIndex >= 0) return hashIndex;
  }

  const index = portfolioSections.findIndex((section) => normalizePath(section.path) === path);
  if (index >= 0) return index;

  const legacyId = path.replace(/^\/+/, "").replace(/\/+$/, "");
  const legacyIndex = portfolioSections.findIndex((section) => section.id === legacyId);
  return legacyIndex >= 0 ? legacyIndex : 0;
}

function getInitialSectionIndex(initialPath) {
  if (initialPath) return getSectionIndexFromPath(initialPath);
  if (typeof window === "undefined") return 0;
  return getSectionIndexFromPath(window.location.pathname, window.location.hash);
}

function setMetaContent(selector, content) {
  const element = document.querySelector(`meta[name="${selector}"], meta[property="${selector}"]`);
  if (element) element.setAttribute("content", content);
}

function getActiveSection(root) {
  if (!root) return null;
  const currentIndex = Number(root.dataset.activeIndex || 0);
  return root.querySelector(".story-track")?.children?.[currentIndex] ?? null;
}

function isScrollableY(element) {
  if (!element) return false;
  const style = window.getComputedStyle(element);
  const canOverflowY = /(auto|scroll)/.test(style.overflowY);
  return canOverflowY && element.scrollHeight - element.clientHeight > verticalScrollableOverflow;
}

function getScrollableY(target, root) {
  const activeSection = getActiveSection(root);
  let element = target instanceof Element ? target : null;
  let section = element?.closest("section");

  if (!section || !root?.contains(section)) {
    section = activeSection;
  }

  while (element && element !== root) {
    if (section?.contains(element) && isScrollableY(element)) {
      return element;
    }
    element = element.parentElement;
  }

  if (section && section !== root) {
    if (isScrollableY(section)) return section;

    const candidates = section.querySelectorAll(verticalScrollSelector);
    for (const candidate of candidates) {
      if (isScrollableY(candidate)) {
        return candidate;
      }
    }
  }

  return null;
}

function getSectionByIndex(root, index) {
  return root?.querySelector(".story-track")?.children?.[clampSectionIndex(index)] ?? null;
}

function getPrimaryScrollableY(section) {
  if (!section) return null;
  if (isScrollableY(section)) return section;

  const candidates = section.querySelectorAll(verticalScrollSelector);
  for (const candidate of candidates) {
    if (isScrollableY(candidate)) return candidate;
  }

  return null;
}

function setSectionScrollPosition(root, index, placement = "start") {
  const panel = getPrimaryScrollableY(getSectionByIndex(root, index));
  if (!panel) return;

  if (placement === "end") {
    panel.scrollTop = Math.max(0, panel.scrollHeight - panel.clientHeight);
    return;
  }

  panel.scrollTop = 0;
}

function canScrollY(element, deltaY) {
  if (!element) return false;
  if (deltaY > 0) return element.scrollTop + element.clientHeight < element.scrollHeight - verticalEdgeBuffer;
  if (deltaY < 0) return element.scrollTop > verticalEdgeBuffer;
  return false;
}

function clampSectionIndex(index) {
  return Math.max(0, Math.min(portfolioSections.length - 1, index));
}

function normalizeWheelDelta(event) {
  const scale =
    event.deltaMode === WheelEvent.DOM_DELTA_LINE
      ? 16
      : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
        ? window.innerHeight
        : 1;

  return {
    x: event.deltaX * scale,
    y: event.deltaY * scale
  };
}

function preventDefault(event) {
  if (event.cancelable) event.preventDefault();
}

export default function App({ initialPath }) {
  const scrollerRef = useRef(null);
  const touchRef = useRef(null);
  const pageLockUntilRef = useRef(0);
  const wheelIntentRef = useRef({ delta: 0, lastTime: 0, edgeStartedAt: 0, sign: 0 });
  const initialIndexRef = useRef(getInitialSectionIndex(initialPath));
  const activeIndexRef = useRef(initialIndexRef.current);
  const [activeIndex, setActiveIndexState] = useState(initialIndexRef.current);
  const [highlightedSignal, setHighlightedSignal] = useState(null);
  const [theme, setTheme] = useState(getInitialTheme);
  const [language, setLanguage] = useState(getInitialLanguage);
  const content = getPortfolioContent(language);
  const ui = content.ui;
  const routePath =
    initialPath ?? (typeof window === "undefined" ? "/" : window.location.pathname);
  const routeSeo =
    caseStudySections.find((section) => normalizePath(section.path) === normalizePath(routePath)) ?? null;
  const selectedStudy = content.caseStudies.find((study) => normalizePath(study.path) === normalizePath(routePath));

  const updateLocation = useCallback((index, method = "pushState") => {
    if (typeof window === "undefined") return;
    const section = portfolioSections[index] ?? portfolioSections[0];
    const nextPath = section.path;
    if (normalizeNavigationTarget(window.location.pathname, window.location.hash) === normalizeNavigationTarget(nextPath)) return;
    window.history[method]({ section: section.id }, "", nextPath);
  }, []);

  const setActiveIndex = useCallback((index) => {
    const nextIndex = clampSectionIndex(index);
    activeIndexRef.current = nextIndex;
    setActiveIndexState(nextIndex);
  }, []);

  const scrollToSection = useCallback((index, signal = null, options = {}) => {
    const scroller = scrollerRef.current;

    const { updateUrl = true, historyMethod = "pushState", scrollPlacement = "start" } = options;
    const nextIndex = clampSectionIndex(index);
    setHighlightedSignal(signal);
    if (scroller) {
      scroller.dataset.activeIndex = String(nextIndex);
      setSectionScrollPosition(scroller, nextIndex, scrollPlacement);
    }
    setActiveIndex(nextIndex);
    if (updateUrl) updateLocation(nextIndex, historyMethod);
  }, [setActiveIndex, updateLocation]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(languageStorageKey, language);
  }, [language]);

  useEffect(() => {
    const section = selectedStudy && routeSeo ? routeSeo : null;
    const title = section?.title || defaultSeo.title;
    const description = section?.description || defaultSeo.description;
    const url = canonicalUrl(section?.path || "/");
    const canonical = document.querySelector('link[rel="canonical"]');

    document.title = title;
    if (canonical) canonical.setAttribute("href", url);
    setMetaContent("description", description);
    setMetaContent("og:type", "profile");
    setMetaContent("og:title", title);
    setMetaContent("og:description", description);
    setMetaContent("og:url", url);
    setMetaContent("twitter:title", title);
    setMetaContent("twitter:description", description);
  }, [routeSeo, selectedStudy]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    const resetWheelIntent = () => {
      wheelIntentRef.current = { delta: 0, lastTime: 0, edgeStartedAt: 0, sign: 0 };
    };

    const consumeIntent = (delta, threshold, minEdgeMs = 0) => {
      const now = performance.now();
      const sign = Math.sign(delta);
      const intent = wheelIntentRef.current;
      if (!sign || now - intent.lastTime > wheelIntentTimeoutMs || intent.sign !== sign) {
        intent.delta = 0;
        intent.edgeStartedAt = now;
      }

      intent.delta += delta;
      intent.sign = sign;
      intent.lastTime = now;

      const strongGesture = Math.abs(delta) >= threshold;
      if (Math.abs(intent.delta) < threshold || (!strongGesture && now - intent.edgeStartedAt < minEdgeMs)) return 0;
      const direction = sign;
      resetWheelIntent();
      return direction;
    };

    const goByDirection = (direction) => {
      const now = performance.now();
      if (!direction || now < pageLockUntilRef.current) return;
      const currentIndex = activeIndexRef.current;
      const nextIndex = clampSectionIndex(currentIndex + direction);
      if (nextIndex === currentIndex) return;

      pageLockUntilRef.current = now + scrollLockMs;
      scrollToSection(nextIndex, null, {
        scrollPlacement: direction > 0 ? "start" : "end"
      });
    };

    const handleWheel = (event) => {
      if (event.ctrlKey) return;
      const normalized = normalizeWheelDelta(event);
      const verticalIntent = Math.abs(normalized.y) >= Math.abs(normalized.x);
      const delta = verticalIntent ? normalized.y : normalized.x;
      if (Math.abs(delta) < 8) return;

      const scrollableY = verticalIntent ? getScrollableY(event.target, scroller) : null;
      if (verticalIntent && canScrollY(scrollableY, normalized.y)) {
        preventDefault(event);
        scrollableY.scrollTop += normalized.y;
        resetWheelIntent();
        return;
      }

      preventDefault(event);
      const threshold = verticalIntent
        ? scrollableY
          ? wheelEdgePageThreshold
          : wheelPageThreshold
        : wheelHorizontalPageThreshold;
      const minEdgeMs = verticalIntent && scrollableY ? wheelEdgeHoldMs : 0;
      goByDirection(consumeIntent(delta, threshold, minEdgeMs));
    };

    const handleTouchStart = (event) => {
      if (event.touches.length !== 1) return;
      const touch = event.touches[0];
      const scrollableY = getScrollableY(event.target, scroller);
      const scrollMax = scrollableY ? Math.max(0, scrollableY.scrollHeight - scrollableY.clientHeight) : 0;

      touchRef.current = {
        startX: touch.clientX,
        startY: touch.clientY,
        scrollableY,
        scrollTop: scrollableY?.scrollTop ?? 0,
        scrollMax
      };
    };

    const handleTouchMove = (event) => {
      const start = touchRef.current;
      const touch = event.touches[0];
      if (!start || !touch) return;

      const totalX = start.startX - touch.clientX;
      const totalY = start.startY - touch.clientY;
      const absX = Math.abs(totalX);
      const absY = Math.abs(totalY);

      if (absX > absY + touchAxisThreshold) {
        preventDefault(event);
      }
    };

    const handleTouchEnd = (event) => {
      const start = touchRef.current;
      if (!start) return;
      const touch = event.changedTouches[0];
      touchRef.current = null;
      if (!touch) return;

      const deltaX = start.startX - touch.clientX;
      const deltaY = start.startY - touch.clientY;
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);
      if (Math.max(absX, absY) < touchPageThreshold) return;

      const verticalIntent = absY >= absX;
      const delta = verticalIntent ? deltaY : deltaX;
      const direction = Math.sign(delta);
      if (!direction) return;

      if (verticalIntent && start.scrollableY) {
        const startedAwayFromEdge =
          direction > 0
            ? start.scrollTop < start.scrollMax - verticalEdgeBuffer
            : start.scrollTop > verticalEdgeBuffer;
        const movedInsideScrollable = Math.abs(start.scrollableY.scrollTop - start.scrollTop) > 2;

        if (startedAwayFromEdge || movedInsideScrollable) return;
      }

      goByDirection(direction);
    };

    scroller.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    scroller.addEventListener("touchstart", handleTouchStart, { passive: true });
    scroller.addEventListener("touchmove", handleTouchMove, { passive: false });
    scroller.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      scroller.removeEventListener("wheel", handleWheel, true);
      scroller.removeEventListener("touchstart", handleTouchStart);
      scroller.removeEventListener("touchmove", handleTouchMove);
      scroller.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scrollToSection]);

  useEffect(() => {
    const handlePopState = () => {
      scrollToSection(getSectionIndexFromPath(window.location.pathname, window.location.hash), null, { updateUrl: false });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [scrollToSection]);

  useEffect(() => {
    const isEditable = (target) => {
      if (!(target instanceof HTMLElement)) return false;
      const tag = target.tagName.toLowerCase();
      return target.isContentEditable || tag === "input" || tag === "textarea" || tag === "select";
    };

    const handleKeyDown = (event) => {
      if (isEditable(event.target) || event.altKey || event.ctrlKey || event.metaKey) return;

      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        scrollToSection(activeIndex + 1);
      }

      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        scrollToSection(activeIndex - 1);
      }

      if (event.key === "Home") {
        event.preventDefault();
        scrollToSection(0);
      }

      if (event.key === "End") {
        event.preventDefault();
        scrollToSection(portfolioSections.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollToSection]);

  const nextTheme = theme === "dark" ? "light" : "dark";
  const nextLanguage = language === "fr" ? "en" : "fr";
  const ThemeIcon = theme === "dark" ? Sun : Moon;
  const activeSection = portfolioSections[activeIndex];
  const activeSectionLabel = ui.sectionLabels[activeSection.id] ?? activeSection.label;
  const getStorySectionLabel = (section) =>
    ui.sectionLabels[section.id] ??
    content.caseStudies.find((study) => normalizePath(study.path) === normalizePath(section.path))?.title ??
    section.label;
  const toggleLanguage = () => setLanguage(nextLanguage);
  const cvPath = content.profile.cvHtml;
  const skipLabel = language === "fr" ? "Aller au contenu" : "Skip to content";
  const languageButton = (
    <button
      type="button"
      className="language-toggle fixed bottom-4 right-[4.5rem] z-50 inline-flex h-11 items-center justify-center rounded-full px-3 font-mono text-xs font-semibold uppercase tracking-[0.12em] transition sm:bottom-6 sm:right-20"
      aria-label={ui.switchLanguage}
      title={ui.switchLanguage}
      onClick={toggleLanguage}
    >
      {nextLanguage.toUpperCase()}
    </button>
  );

  if (selectedStudy) {
    return (
      <div className={`app-shell theme-${theme} h-screen overflow-hidden bg-ink-950 text-warm-50`}>
        <a href="#main-content" className="skip-link">
          {skipLabel}
        </a>
        <nav className="sr-only" aria-label="Portfolio sections">
          {storySections.map((section) => (
            <a key={section.id} href={section.path}>
              {getStorySectionLabel(section)}
            </a>
          ))}
          <a href={cvPath}>{ui.cvLinkLabel}</a>
        </nav>

        {languageButton}
        <button
          type="button"
          className="theme-toggle fixed bottom-4 right-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full transition sm:bottom-6 sm:right-6"
          aria-label={ui.themeTitle(nextTheme)}
          title={ui.themeTitle(nextTheme)}
          onClick={() => setTheme(nextTheme)}
        >
          <ThemeIcon size={18} aria-hidden="true" />
        </button>

        <main id="main-content" tabIndex={-1} className="redwood-shell h-screen overflow-hidden">
          <CaseStudyDetail study={selectedStudy} ui={ui.caseDetail} />
        </main>
      </div>
    );
  }

  return (
    <div className={`app-shell theme-${theme} h-screen overflow-hidden bg-ink-950 text-warm-50`}>
      <a href="#main-content" className="skip-link">
        {skipLabel}
      </a>
      <nav className="sr-only" aria-label="Portfolio sections">
        {storySections.map((section) => (
          <a key={section.id} href={section.path}>
            {getStorySectionLabel(section)}
          </a>
        ))}
        <a href={cvPath}>{ui.cvLinkLabel}</a>
      </nav>

      <div className="story-progress fixed inset-x-0 top-0 z-50 px-3 pt-2 sm:px-6 lg:px-8" aria-label={ui.storyControlsLabel}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <p className="story-label min-w-0 truncate rounded-full px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] sm:text-[0.66rem]" aria-live="polite">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="mx-1 text-warm-500">/</span>
              <span>{String(portfolioSections.length).padStart(2, "0")}</span>
              <span className="mx-2 text-redwood-300">·</span>
              <span>{activeSectionLabel}</span>
            </p>

            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                className="story-control"
                aria-label={ui.previousPage}
                disabled={activeIndex === 0}
                onClick={() => scrollToSection(activeIndex - 1)}
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="story-control"
                aria-label={ui.nextPage}
                disabled={activeIndex === portfolioSections.length - 1}
                onClick={() => scrollToSection(activeIndex + 1)}
              >
                <ChevronRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="flex gap-1.5">
            {portfolioSections.map((section, index) => {
              const fill = index <= activeIndex ? 100 : 0;

              return (
                <button
                  key={section.id}
                  type="button"
                  aria-label={`${ui.goTo} ${ui.sectionLabels[section.id] ?? section.label}`}
                  aria-current={index === activeIndex ? "step" : undefined}
                  className="group flex h-6 flex-1 appearance-none items-center rounded-full border-0 bg-transparent p-0"
                  onClick={() => scrollToSection(index)}
                >
                  <span className="block h-2 w-full overflow-hidden rounded-full bg-warm-50/10 transition group-hover:bg-warm-50/18">
                    <span
                      className="story-segment-fill block h-full rounded-full bg-redwood-400 shadow-[0_0_18px_rgba(227,99,79,0.45)]"
                      style={{ width: `${fill}%` }}
                    />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {languageButton}
      <button
        type="button"
        className="theme-toggle fixed bottom-4 right-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full transition sm:bottom-6 sm:right-6"
        aria-label={ui.themeTitle(nextTheme)}
        title={ui.themeTitle(nextTheme)}
        onClick={() => setTheme(nextTheme)}
      >
        <ThemeIcon size={18} aria-hidden="true" />
      </button>

      <main
        id="main-content"
        ref={scrollerRef}
        tabIndex={-1}
        data-active-index={activeIndex}
        className="horizontal-scroll redwood-shell h-screen overflow-hidden"
      >
        <div className="story-track flex min-h-full w-max" style={{ "--story-index": activeIndex }}>
          <Hero onNavigate={scrollToSection} content={content} />
          <MetricStrip highlightedSignal={highlightedSignal} content={content} />
          <CaseStudies content={content} />
          <Experience content={content} />
          <Certifications content={content} />
          <Contact content={content} />
        </div>
      </main>
    </div>
  );
}
