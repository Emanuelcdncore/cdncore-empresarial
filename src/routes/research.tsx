import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import research from "@/assets/img-research.jpg";
import BlurText from "@/components/ReactBits/BlurText";
import SplitText from "@/components/ReactBits/SplitText";
import GradientText from "@/components/ReactBits/GradientText";
import ScrollReveal from "@/components/ReactBits/ScrollReveal";
import ShinyText from "@/components/ReactBits/ShinyText";
import ScrollFloat from "@/components/ReactBits/ScrollFloat";

const Antigravity = lazy(() => import("@/components/ReactBits/Antigravity"));

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "Research — CDNCore" },
      { name: "description", content: "Applied R&D translating frontier work in AI, security and systems into production-grade enterprise software." },
      { property: "og:title", content: "Research — CDNCore" },
      { property: "og:description", content: "Disciplined research that becomes operational software. Frontier work, shipped." },
      { property: "og:image", content: "/og/research.jpg" },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  const { t } = useTranslation();

  const themes = [
    { t: t("research_t1_title"), d: t("research_t1_desc") },
    { t: t("research_t2_title"), d: t("research_t2_desc") },
    { t: t("research_t3_title"), d: t("research_t3_desc") },
    { t: t("research_t4_title"), d: t("research_t4_desc") },
  ];

  const papers = [
    { y: "2026", t: t("research_p1_title"), k: t("research_p1_keywords") },
    { y: "2025", t: t("research_p2_title"), k: t("research_p2_keywords") },
    { y: "2025", t: t("research_p3_title"), k: t("research_p3_keywords") },
    { y: "2024", t: t("research_p4_title"), k: t("research_p4_keywords") },
  ];

  return (
    <>
      <section className="relative">
        <div className="absolute inset-0 -z-10">
          <img src={research} alt="" width={1280} height={896} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-[color:var(--ink)]/80" />
        </div>
        <div className="container-prose py-32 md:py-40 text-[color:var(--ivory)]">
          <p className="eyebrow text-[color:var(--ivory)]/70">{t("research_hero_eyebrow")}</p>
          <div className="mt-6 max-w-4xl">
            <BlurText
              text={t("research_hero_heading")}
              delay={75}
              animateBy="words"
              direction="top"
              className="font-display text-5xl md:text-7xl leading-[1.05] text-[color:var(--ivory)]"
            />
          </div>
          <div className="mt-10 max-w-2xl">
            <ScrollReveal
              enableBlur
              baseOpacity={0.1}
              baseBlur={4}
              containerClassName="text-[color:var(--ivory)]/75 text-lg leading-[1.7]"
              wordAnimationEnd="bottom 80%"
            >
              {t("research_hero_body")}
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="container-prose py-28">
        <p className="eyebrow">{t("research_themes_eyebrow")}</p>
        <ScrollFloat
          containerClassName="mt-6"
          textClassName="font-display text-4xl md:text-5xl text-foreground"
          animationDuration={1.1}
          ease="back.inOut(1.8)"
          stagger={0.025}
        >
          {t("research_themes_heading")}
        </ScrollFloat>
        <div className="mt-16 grid md:grid-cols-2 gap-px bg-hairline">
          {themes.map((th, i) => (
            <div key={th.t} className="bg-background p-10">
              <p className="font-mono text-xs text-accent tracking-[0.2em]">THEME · 0{i + 1}</p>
              <h3 className="mt-6 font-display text-2xl">{th.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{th.d}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <Suspense fallback={null}>
            <Antigravity count={160} color="#818cf8" autoAnimate={true} magnetRadius={10} ringRadius={9} waveSpeed={0.35} waveAmplitude={1.0} particleSize={1.6} lerpSpeed={0.07} />
          </Suspense>
        </div>
      <section className="bg-secondary/60 hairline-t hairline-b relative z-10">
        <div className="container-prose py-24">
          <p className="eyebrow">{t("research_pubs_eyebrow")}</p>
          <div className="rule-gold mt-6">
            <GradientText
              colors={["#a78bfa", "#c4b5fd", "#818cf8", "#a78bfa"]}
              animationSpeed={6}
              className="font-display text-4xl md:text-5xl"
            >
              {t("research_pubs_heading")}
            </GradientText>
          </div>
          <ol className="mt-12 divide-y divide-hairline">
            {papers.map((p) => (
              <li key={p.t} className="grid grid-cols-12 gap-6 py-7">
                <ScrollReveal
                  enableBlur
                  baseOpacity={0.1}
                  baseBlur={5}
                  containerClassName="col-span-2 md:col-span-1 font-display text-2xl text-accent"
                  wordAnimationEnd="bottom 78%"
                >
                  {p.y}
                </ScrollReveal>
                <div className="col-span-7 md:col-span-8">
                  <p className="font-display text-xl">{p.t}</p>
                </div>
                <p className="col-span-3 md:col-span-3 text-xs uppercase tracking-[0.18em] text-muted-foreground self-center text-right">
                  {p.k}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      </div>

      <section className="container-prose py-28">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="max-w-xl">
            <SplitText
              text={t("research_cta_heading")}
              splitType="words"
              tag="h2"
              className="font-display text-3xl md:text-4xl text-foreground"
              delay={60}
              duration={0.7}
            />
          </div>
          <Link to="/contact" className="text-sm uppercase tracking-[0.2em] border-b border-foreground pb-1 hover:border-accent hover:text-accent">
            <ShinyText text={t("research_cta_button")} speed={3} color="currentColor" shineColor="#b8a9ff" spread={90} />
          </Link>
        </div>
      </section>
    </>
  );
}
