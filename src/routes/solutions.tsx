import { createFileRoute, useSearch } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BlurText from "@/components/ReactBits/BlurText";
import SplitText from "@/components/ReactBits/SplitText";
import ScrollReveal from "@/components/ReactBits/ScrollReveal";

const Antigravity = lazy(() => import("@/components/ReactBits/Antigravity"));

export const Route = createFileRoute("/solutions")({
  validateSearch: (search: Record<string, unknown>) => ({
    discipline: (search.discipline as string) ?? undefined,
  }),
  head: () => ({
    meta: [
      { title: "Solutions — CDNCore" },
      { name: "description", content: "CDNCore's five disciplines: Artificial Intelligence, Cybersecurity, Operational Intelligence, Data Systems, and Applied R&D." },
      { property: "og:title", content: "Solutions — CDNCore" },
      { property: "og:description", content: "Enterprise capabilities engineered for resilience, sovereignty and measurable business outcomes." },
    ],
  }),
  component: SolutionsPage,
});

const disciplineIdMap: Record<string, string> = {
  ai: "solution-ai",
  cybersecurity: "solution-cybersecurity",
  ops: "solution-ops",
  data: "solution-data",
  rd: "solution-rd",
};

function SolutionsPage() {
  const { t } = useTranslation();
  const { discipline } = useSearch({ from: "/solutions" });

  const solutions = [
    {
      n: "01",
      t: t("solutions_s1_title"),
      id: "solution-ai",
      sub: t("solutions_s1_sub"),
      d: t("solutions_s1_desc"),
      items: [t("solutions_s1_i1"), t("solutions_s1_i2"), t("solutions_s1_i3"), t("solutions_s1_i4")],
    },
    {
      n: "02",
      t: t("solutions_s2_title"),
      id: "solution-cybersecurity",
      sub: t("solutions_s2_sub"),
      d: t("solutions_s2_desc"),
      items: [t("solutions_s2_i1"), t("solutions_s2_i2"), t("solutions_s2_i3"), t("solutions_s2_i4")],
    },
    {
      n: "03",
      t: t("solutions_s3_title"),
      id: "solution-ops",
      sub: t("solutions_s3_sub"),
      d: t("solutions_s3_desc"),
      items: [t("solutions_s3_i1"), t("solutions_s3_i2"), t("solutions_s3_i3"), t("solutions_s3_i4")],
    },
    {
      n: "04",
      t: t("solutions_s4_title"),
      id: "solution-data",
      sub: t("solutions_s4_sub"),
      d: t("solutions_s4_desc"),
      items: [t("solutions_s4_i1"), t("solutions_s4_i2"), t("solutions_s4_i3"), t("solutions_s4_i4")],
    },
    {
      n: "05",
      t: t("solutions_s5_title"),
      id: "solution-rd",
      sub: t("solutions_s5_sub"),
      d: t("solutions_s5_desc"),
      items: [t("solutions_s5_i1"), t("solutions_s5_i2"), t("solutions_s5_i3"), t("solutions_s5_i4")],
    },
  ];

  useEffect(() => {
    if (!discipline) return;
    const targetId = disciplineIdMap[discipline];
    if (!targetId) return;
    const scroll = () => {
      const el = document.getElementById(targetId);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    const timer = setTimeout(scroll, 300);
    return () => clearTimeout(timer);
  }, [discipline]);

  return (
    <>
      <section className="container-prose pt-24 md:pt-32 pb-20">
        <p className="eyebrow">{t("solutions_hero_eyebrow")}</p>
        <div className="rule-gold mt-6 max-w-4xl">
          <BlurText
            text={t("solutions_hero_heading")}
            delay={70}
            animateBy="words"
            direction="top"
            className="font-display text-5xl md:text-7xl leading-[1.05] text-foreground"
          />
        </div>
        <div className="mt-10 max-w-2xl">
          <ScrollReveal
            enableBlur
            baseOpacity={0.08}
            baseBlur={4}
            containerClassName="text-lg text-muted-foreground leading-[1.75]"
            wordAnimationEnd="bottom 80%"
          >
            {t("solutions_hero_body")}
          </ScrollReveal>
        </div>
      </section>

      <section className="hairline-t">
        {solutions.slice(0, 4).map((s, i) => (
          <div key={s.n} id={s.id} className={`${i % 2 === 1 ? "bg-secondary/60" : ""} hairline-b`}>
            <div className="container-prose py-20 md:py-24 grid md:grid-cols-12 gap-12">
              <div className="md:col-span-4">
                <p className="font-mono text-xs tracking-[0.22em] text-accent">{s.n} — Discipline</p>
                <div className="mt-6">
                  <SplitText
                    text={s.t}
                    splitType="words"
                    tag="h2"
                    className="font-display text-4xl md:text-5xl leading-[1.05] text-foreground"
                    delay={55}
                    duration={0.7}
                  />
                </div>
                <p className="mt-4 text-sm uppercase tracking-[0.16em] text-muted-foreground">{s.sub}</p>
              </div>
              <div className="md:col-span-7 md:col-start-6">
                <ScrollReveal
                  enableBlur
                  baseOpacity={0.08}
                  baseBlur={3}
                  containerClassName="text-[15px] leading-[1.85] text-foreground/85"
                  wordAnimationEnd="bottom 82%"
                >
                  {s.d}
                </ScrollReveal>
                <ul className="mt-10 grid sm:grid-cols-2 gap-px bg-hairline">
                  {s.items.map((it) => (
                    <li key={it} className="bg-background p-5 text-sm flex items-center gap-3">
                      <span className="h-1 w-3 bg-accent" aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── Last discipline (R&D) with Antigravity ── */}
      {(() => {
        const s = solutions[4];
        return (
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
              <Suspense fallback={null}>
                <Antigravity count={170} color="#818cf8" autoAnimate={true} magnetRadius={13} ringRadius={11} waveSpeed={0.38} waveAmplitude={1.1} particleSize={1.7} lerpSpeed={0.07} />
              </Suspense>
            </div>
            <div id={s.id} className="hairline-b relative z-10">
              <div className="container-prose py-20 md:py-24 grid md:grid-cols-12 gap-12">
                <div className="md:col-span-4">
                  <p className="font-mono text-xs tracking-[0.22em] text-accent">{s.n} — Discipline</p>
                  <div className="mt-6">
                    <SplitText
                      text={s.t}
                      splitType="words"
                      tag="h2"
                      className="font-display text-4xl md:text-5xl leading-[1.05] text-foreground"
                      delay={55}
                      duration={0.7}
                    />
                  </div>
                  <p className="mt-4 text-sm uppercase tracking-[0.16em] text-muted-foreground">{s.sub}</p>
                </div>
                <div className="md:col-span-7 md:col-start-6">
                  <ScrollReveal
                    enableBlur
                    baseOpacity={0.08}
                    baseBlur={3}
                    containerClassName="text-[15px] leading-[1.85] text-foreground/85"
                    wordAnimationEnd="bottom 82%"
                  >
                    {s.d}
                  </ScrollReveal>
                  <ul className="mt-10 grid sm:grid-cols-2 gap-px bg-hairline">
                    {s.items.map((it) => (
                      <li key={it} className="bg-background p-5 text-sm flex items-center gap-3">
                        <span className="h-1 w-3 bg-accent" aria-hidden />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

    </>
  );
}
