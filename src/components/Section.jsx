export default function Section({ id, eyebrow, title, intro, children, wide = false, start = false }) {
  const justifyClass = wide || start ? "lg:justify-start" : "lg:justify-center";

  return (
    <section id={id} className="box-border h-screen w-screen min-w-0 shrink-0 snap-start overflow-hidden px-4 pb-8 pt-20 sm:px-6 lg:px-8">
      <div className={`mx-auto flex h-full w-full flex-col justify-start overflow-y-auto py-2 lg:py-0 ${wide ? "max-w-[88rem]" : "max-w-7xl"} ${justifyClass}`}>
        <div className="mb-6 max-w-3xl">
          <p className="font-mono text-xs uppercase text-redwood-300">{eyebrow}</p>
          <h2 className="mt-3 max-w-full break-words font-display text-3xl font-semibold leading-tight text-warm-50 sm:text-5xl">
            {title}
          </h2>
          {intro ? <p className="mt-4 max-w-2xl text-base leading-7 text-warm-300 sm:text-lg sm:leading-8">{intro}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}
