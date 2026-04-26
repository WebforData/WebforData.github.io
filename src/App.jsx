import { ChevronLeft, ChevronRight, Moon, Sun } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import Hero from "./components/Hero.jsx";
import MetricStrip from "./components/MetricStrip.jsx";
import About from "./components/About.jsx";
import CaseStudies from "./components/CaseStudies.jsx";
import Skills from "./components/Skills.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";
import { canonicalUrl, defaultSeo, storySections as sections } from "./data/seo.js";

const themeStorageKey = "aouroui-portfolio-theme";

function getInitialTheme() {
  if (typeof window === "undefined") return "dark";
  return window.localStorage.getItem(themeStorageKey) === "light" ? "light" : "dark";
}

function normalizePath(pathname = "/") {
  const cleanPath = pathname.replace(/\/+$/, "") || "/";
  return cleanPath === "/index.html" ? "/" : cleanPath;
}

function getSectionIndexFromPath(pathname = "/") {
  const path = normalizePath(pathname);
  const index = sections.findIndex((section) => normalizePath(section.path) === path);
  return index >= 0 ? index : 0;
}

function getInitialSectionIndex(initialPath) {
  if (initialPath) return getSectionIndexFromPath(initialPath);
  if (typeof window === "undefined") return 0;
  return getSectionIndexFromPath(window.location.pathname);
}

function setMetaContent(selector, content) {
  const element = document.querySelector(`meta[name="${selector}"], meta[property="${selector}"]`);
  if (element) element.setAttribute("content", content);
}

function getScrollableY(target, root) {
  let element = target instanceof Element ? target : null;
  const section = element?.closest("section");

  while (element && element !== root) {
    const style = window.getComputedStyle(element);
    const canOverflowY = /(auto|scroll)/.test(style.overflowY);
    if (canOverflowY && element.scrollHeight > element.clientHeight + 1) {
      return element;
    }
    element = element.parentElement;
  }

  if (section && section !== root) {
    const candidates = section.querySelectorAll("*");
    for (const candidate of candidates) {
      const style = window.getComputedStyle(candidate);
      const canOverflowY = /(auto|scroll)/.test(style.overflowY);
      if (canOverflowY && candidate.scrollHeight > candidate.clientHeight + 1) {
        return candidate;
      }
    }
  }

  return null;
}

function canScrollY(element, deltaY) {
  if (!element) return false;
  if (deltaY > 0) return element.scrollTop + element.clientHeight < element.scrollHeight - 1;
  if (deltaY < 0) return element.scrollTop > 1;
  return false;
}

export default function App({ initialPath }) {
  const scrollerRef = useRef(null);
  const touchRef = useRef(null);
  const wheelLockRef = useRef(false);
  const initialIndexRef = useRef(getInitialSectionIndex(initialPath));
  const [activeIndex, setActiveIndex] = useState(initialIndexRef.current);
  const [highlightedSignal, setHighlightedSignal] = useState(null);
  const [theme, setTheme] = useState(getInitialTheme);

  const updateLocation = useCallback((index, method = "pushState") => {
    if (typeof window === "undefined") return;
    const section = sections[index] ?? sections[0];
    const nextPath = section.path;
    if (normalizePath(window.location.pathname) === normalizePath(nextPath)) return;
    window.history[method]({ section: section.id }, "", nextPath);
  }, []);

  const scrollToSection = useCallback((index, signal = null, options = {}) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const { updateUrl = true, historyMethod = "pushState" } = options;
    const nextIndex = Math.max(0, Math.min(sections.length - 1, index));
    setHighlightedSignal(signal);
    setActiveIndex(nextIndex);
    if (updateUrl) updateLocation(nextIndex, historyMethod);
    scroller.scrollTo({
      left: nextIndex * scroller.clientWidth,
      behavior: "smooth"
    });
  }, [updateLocation]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem(themeStorageKey, theme);
  }, [theme]);

  useEffect(() => {
    const section = sections[activeIndex] ?? sections[0];
    const title = section.title || defaultSeo.title;
    const description = section.description || defaultSeo.description;
    const url = canonicalUrl(section.path);
    const canonical = document.querySelector('link[rel="canonical"]');

    document.title = title;
    if (canonical) canonical.setAttribute("href", url);
    setMetaContent("description", description);
    setMetaContent("og:title", title);
    setMetaContent("og:description", description);
    setMetaContent("og:url", url);
    setMetaContent("twitter:title", title);
    setMetaContent("twitter:description", description);
  }, [activeIndex]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return undefined;

    let frame = 0;
    if (initialIndexRef.current > 0) {
      scroller.scrollTo({
        left: initialIndexRef.current * scroller.clientWidth,
        behavior: "auto"
      });
    }

    const syncProgress = () => {
      frame = 0;
      const nextIndex = Math.max(
        0,
        Math.min(sections.length - 1, Math.round(scroller.scrollLeft / scroller.clientWidth))
      );
      setActiveIndex(nextIndex);
    };

    const requestSync = () => {
      if (!frame) frame = requestAnimationFrame(syncProgress);
    };

    const handleWheel = (event) => {
      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (Math.abs(delta) < 8) return;

      const verticalIntent = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
      const scrollableY = verticalIntent ? getScrollableY(event.target, scroller) : null;
      if (canScrollY(scrollableY, event.deltaY)) {
        event.preventDefault();
        scrollableY.scrollTop += event.deltaY;
        return;
      }

      event.preventDefault();
      if (wheelLockRef.current) return;

      const currentIndex = Math.round(scroller.scrollLeft / scroller.clientWidth);
      const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + (delta > 0 ? 1 : -1)));
      if (nextIndex === currentIndex) return;

      wheelLockRef.current = true;
      setActiveIndex(nextIndex);
      updateLocation(nextIndex);
      scroller.scrollTo({
        left: nextIndex * scroller.clientWidth,
        behavior: "smooth"
      });

      window.setTimeout(() => {
        wheelLockRef.current = false;
        requestSync();
      }, 520);
    };

    const handleTouchStart = (event) => {
      const touch = event.touches[0];
      touchRef.current = {
        x: touch.clientX,
        y: touch.clientY,
        scrollLeft: scroller.scrollLeft,
        scrollableY: getScrollableY(event.target, scroller)
      };
    };

    const handleTouchMove = (event) => {
      const start = touchRef.current;
      const touch = event.touches[0];
      if (!start || !touch) return;

      const deltaX = start.x - touch.clientX;
      const deltaY = start.y - touch.clientY;
      const verticalIntent = Math.abs(deltaY) > Math.abs(deltaX);
      if (verticalIntent && canScrollY(start.scrollableY, deltaY)) {
        event.preventDefault();
        start.scrollableY.scrollTop += deltaY;
        start.y = touch.clientY;
        return;
      }

      const dominantDelta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;

      event.preventDefault();
      scroller.scrollLeft = start.scrollLeft + dominantDelta;
      requestSync();
    };

    const handleTouchEnd = (event) => {
      const start = touchRef.current;
      const touch = event.changedTouches[0];
      if (!start || !touch) return;

      const deltaX = start.x - touch.clientX;
      const deltaY = start.y - touch.clientY;
      const dominantDelta = Math.abs(deltaY) > Math.abs(deltaX) ? deltaY : deltaX;
      const currentIndex = Math.round(start.scrollLeft / scroller.clientWidth);
      const nextIndex =
        Math.abs(dominantDelta) > 45
          ? Math.max(0, Math.min(sections.length - 1, currentIndex + (dominantDelta > 0 ? 1 : -1)))
          : currentIndex;

      scroller.scrollTo({
        left: nextIndex * scroller.clientWidth,
        behavior: "smooth"
      });
      setActiveIndex(nextIndex);
      updateLocation(nextIndex);
      touchRef.current = null;
    };

    syncProgress();
    scroller.addEventListener("scroll", requestSync, { passive: true });
    scroller.addEventListener("wheel", handleWheel, { passive: false, capture: true });
    scroller.addEventListener("touchstart", handleTouchStart, { passive: true });
    scroller.addEventListener("touchmove", handleTouchMove, { passive: false });
    scroller.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("resize", requestSync);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      scroller.removeEventListener("scroll", requestSync);
      scroller.removeEventListener("wheel", handleWheel, true);
      scroller.removeEventListener("touchstart", handleTouchStart);
      scroller.removeEventListener("touchmove", handleTouchMove);
      scroller.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", requestSync);
    };
  }, [updateLocation]);

  useEffect(() => {
    const handlePopState = () => {
      scrollToSection(getSectionIndexFromPath(window.location.pathname), null, { updateUrl: false });
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
        scrollToSection(sections.length - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, scrollToSection]);

  const nextTheme = theme === "dark" ? "light" : "dark";
  const ThemeIcon = theme === "dark" ? Sun : Moon;
  const activeSection = sections[activeIndex];

  return (
    <div className={`theme-${theme} h-screen overflow-hidden bg-ink-950 text-warm-50`}>
      <nav className="sr-only" aria-label="Portfolio sections">
        {sections.map((section) => (
          <a key={section.id} href={section.path}>
            {section.label}
          </a>
        ))}
        <a href="/abderrahmane-ouroui-cv.html">Abderrahmane Ouroui CV</a>
      </nav>

      <div className="story-progress fixed inset-x-0 top-0 z-50 px-3 pt-2 sm:px-6 lg:px-8" aria-label="Portfolio story controls">
        <div className="mx-auto max-w-7xl">
          <div className="mb-1.5 flex items-center justify-between gap-3">
            <p className="story-label min-w-0 truncate rounded-full px-2.5 py-1 font-mono text-[0.58rem] uppercase tracking-[0.16em] sm:text-[0.66rem]" aria-live="polite">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="mx-1 text-warm-500">/</span>
              <span>{String(sections.length).padStart(2, "0")}</span>
              <span className="mx-2 text-redwood-300">·</span>
              <span>{activeSection.label}</span>
            </p>

            <div className="flex shrink-0 items-center gap-1.5">
              <button
                type="button"
                className="story-control"
                aria-label="Previous portfolio page"
                disabled={activeIndex === 0}
                onClick={() => scrollToSection(activeIndex - 1)}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                className="story-control"
                aria-label="Next portfolio page"
                disabled={activeIndex === sections.length - 1}
                onClick={() => scrollToSection(activeIndex + 1)}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div className="flex gap-1.5">
            {sections.map((section, index) => {
              const fill = index <= activeIndex ? 100 : 0;

              return (
                <button
                  key={section.id}
                  type="button"
                  aria-label={`Go to ${section.label}`}
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

      <button
        type="button"
        className="theme-toggle fixed bottom-4 right-4 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full transition sm:bottom-6 sm:right-6"
        aria-label={`Switch to ${nextTheme} theme`}
        title={`Switch to ${nextTheme} theme`}
        onClick={() => setTheme(nextTheme)}
      >
        <ThemeIcon size={18} />
      </button>

      <main ref={scrollerRef} className="horizontal-scroll redwood-shell h-screen overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory">
        <div className="flex min-h-full w-max">
          <Hero onNavigate={scrollToSection} />
          <MetricStrip highlightedSignal={highlightedSignal} />
          <About />
          <CaseStudies />
          <Skills />
          <Experience />
          <Contact />
        </div>
      </main>
    </div>
  );
}
