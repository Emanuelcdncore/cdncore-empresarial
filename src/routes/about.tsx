import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import boardroom from "@/assets/img-boardroom.jpg";
import mundoImg from "@/assets/mundo.jpg";
import BlurText from "@/components/ReactBits/BlurText";
import SplitText from "@/components/ReactBits/SplitText";
import GradientText from "@/components/ReactBits/GradientText";
import ScrollReveal from "@/components/ReactBits/ScrollReveal";
import ShinyText from "@/components/ReactBits/ShinyText";
import ScrollFloat from "@/components/ReactBits/ScrollFloat";
import { useTranslation } from "react-i18next";

const Antigravity = lazy(() => import("@/components/ReactBits/Antigravity"));

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Company — CDNCore" },
      { name: "description", content: "CDNCore is a European technology group building intelligent, sovereign infrastructure for enterprises that operate at scale." },
      { property: "og:title", content: "Company — CDNCore" },
      { property: "og:description", content: "Our mission, leadership posture and the principles behind CDNCore's enterprise practice." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();

  const principles = [
    { t: t('about_p1_title'), d: t('about_p1_desc') },
    { t: t('about_p2_title'), d: t('about_p2_desc') },
    { t: t('about_p3_title'), d: t('about_p3_desc') },
    { t: t('about_p4_title'), d: t('about_p4_desc') },
  ];

  const timeline = [
    { y: "2013", t: t('about_t2013_title'), d: t('about_t2013_desc') },
    { y: "2017", t: t('about_t2017_title'), d: t('about_t2017_desc') },
    { y: "2020", t: t('about_t2020_title'), d: t('about_t2020_desc') },
    { y: "2023", t: t('about_t2023_title'), d: t('about_t2023_desc') },
    { y: "2026", t: t('about_t2026_title'), d: t('about_t2026_desc') },
  ];

  return (
    <>
      <section className="container-prose pt-24 md:pt-32 pb-20">
        <p className="eyebrow">{t('about_hero_eyebrow')}</p>
        <div className="rule-gold mt-6 max-w-4xl">
          <BlurText
            text={t('about_hero_heading')}
            delay={70}
            animateBy="words"
            direction="top"
            className="font-display text-5xl md:text-7xl leading-[1.05] text-foreground"
          />
        </div>
        <div className="mt-10 max-w-2xl">
          <ScrollReveal
            enableBlur={true}
            baseOpacity={0.08}
            baseBlur={4}
            containerClassName="text-lg leading-[1.75] text-muted-foreground"
            wordAnimationEnd="bottom 80%"
          >
            {t('about_hero_body')}
          </ScrollReveal>
        </div>
      </section>

      <section className="hairline-t">
        <div className="container-prose py-24 grid md:grid-cols-12 gap-16">
          <div className="md:col-span-5">
            <img src={mundoImg} alt="CDNCore mandate" loading="lazy" width={1280} height={896} className="w-full" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow">{t('about_mandate_eyebrow')}</p>
            <div className="rule-gold mt-6">
              <SplitText
                text={t('about_mandate_heading')}
                splitType="words"
                tag="h2"
                className="font-display text-4xl text-foreground"
                delay={70}
                duration={0.75}
              />
            </div>
            <div className="mt-8 space-y-5">
              <ScrollReveal enableBlur baseOpacity={0.08} baseBlur={4} containerClassName="text-[15px] leading-[1.85] text-muted-foreground" wordAnimationEnd="bottom 82%">
                {t('about_mandate_body1')}
              </ScrollReveal>
              <ScrollReveal enableBlur baseOpacity={0.08} baseBlur={4} containerClassName="text-[15px] leading-[1.85] text-muted-foreground" wordAnimationEnd="bottom 82%">
                {t('about_mandate_body2')}
              </ScrollReveal>
              <ScrollReveal enableBlur baseOpacity={0.08} baseBlur={4} containerClassName="text-[15px] leading-[1.85] text-muted-foreground" wordAnimationEnd="bottom 82%">
                {t('about_mandate_body3')}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <Suspense fallback={null}>
            <Antigravity count={180} color="#c4b5fd" autoAnimate={true} magnetRadius={12} ringRadius={8} waveSpeed={0.3} waveAmplitude={1.2} particleSize={1.8} lerpSpeed={0.08} />
          </Suspense>
        </div>
      <section className="bg-secondary/60 hairline-t hairline-b relative z-10">
        <div className="container-prose py-24">
          <p className="eyebrow">{t('about_principles_eyebrow')}</p>
          <ScrollFloat
            containerClassName="mt-6"
            textClassName="font-display text-4xl md:text-5xl text-foreground"
            animationDuration={1.1}
            ease="back.inOut(1.8)"
            stagger={0.025}
          >
            {t('about_principles_heading')}
          </ScrollFloat>
          <div className="mt-16 grid md:grid-cols-2 gap-px bg-hairline">
            {principles.map((p, i) => (
              <div key={i} className="bg-background p-10">
                <p className="font-mono text-xs text-accent tracking-[0.2em]">0{i + 1}</p>
                <h3 className="mt-6 font-display text-2xl">{p.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </div>

      <section className="container-prose py-28">
        <p className="eyebrow">{t('about_timeline_eyebrow')}</p>
        <div className="rule-gold mt-6">
          <GradientText
            colors={["#a78bfa", "#c4b5fd", "#818cf8", "#a78bfa"]}
            animationSpeed={6}
            className="font-display text-4xl md:text-5xl"
          >
            {t('about_timeline_heading')}
          </GradientText>
        </div>
        <ol className="mt-16 divide-y divide-hairline">
          {timeline.map((e) => (
            <li key={e.y} className="grid grid-cols-12 gap-6 py-8">
              <ScrollReveal
                enableBlur
                baseOpacity={0.1}
                baseBlur={5}
                containerClassName="col-span-3 md:col-span-2 font-display text-3xl text-accent"
                wordAnimationEnd="bottom 78%"
              >
                {e.y}
              </ScrollReveal>
              <div className="col-span-9 md:col-span-10">
                <p className="font-display text-xl">{e.t}</p>
                <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{e.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-prose pb-28">
        <div className="hairline-t pt-12 flex flex-wrap items-end justify-between gap-8">
          <h2 className="font-display text-3xl md:text-4xl max-w-xl">
            {t('about_cta_heading')}
          </h2>
          <Link to="/contact" className="text-sm uppercase tracking-[0.2em] border-b border-foreground pb-1 hover:border-accent hover:text-accent">
            <ShinyText text={t('about_cta_button')} speed={3} color="currentColor" shineColor="#b8a9ff" spread={90} />
          </Link>
        </div>
      </section>
    </>
  );
}
