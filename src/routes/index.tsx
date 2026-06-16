import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useEffect, lazy, Suspense } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TrustedBy } from "@/components/TrustedBy";
import hiscoxLogo from "@/assets/Hiscox.png";
import BlurText from "@/components/ReactBits/BlurText";
import TextType from "@/components/ReactBits/TextType";
import ShinyText from "@/components/ReactBits/ShinyText";
import GradientText from "@/components/ReactBits/GradientText";
import DecryptedText from "@/components/ReactBits/DecryptedText";
import ScrollFloat from "@/components/ReactBits/ScrollFloat";
import SplitText from "@/components/ReactBits/SplitText";
import ScrollReveal from "@/components/ReactBits/ScrollReveal";
import { useTranslation } from "react-i18next";

const LiquidEther = lazy(() => import("@/components/LiquidEther"));
const Antigravity = lazy(() => import("@/components/ReactBits/Antigravity"));
import parkurbisImg from "@/assets/Parkurbis.jpg";
import loritalkImg from "@/assets/project-loritalk.png";
import appdropImg from "@/assets/project-appdrop.png";
import authcentralImg from "@/assets/project-authcentral.png";
import castoriImg from "@/assets/project-castori.png";
import atlaseyeImg from "@/assets/Captura de ecrã 2026-06-11 133140.png";
import cube1 from "@/assets/Cube1.png";
import cube2 from "@/assets/Cube2.png";
import cube3 from "@/assets/Cube3.png";
import cube4 from "@/assets/Cube4.png";
import cube5 from "@/assets/Cube5.png";
import { GlassCard } from "@/components/glass/GlassCard";
import TestimonialsCard from "@/components/TestimonialsCard";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CDNCore — Intelligent Infrastructure for Modern Enterprises" },
      { name: "description", content: "A European technology group delivering AI, cybersecurity, operational intelligence and enterprise infrastructure to organizations operating at scale." },
    ],
  }),
  component: HomePage,
});

const cubeImages = [cube1, cube2, cube3, cube4, cube5];

const projectImages = [loritalkImg, appdropImg, authcentralImg, castoriImg, atlaseyeImg];
const projectTitles = ["LoriTalk", "AppDrop", "Auth Central", "Castori Club", "AtlasEye"];

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CubeCard({ cap, index }: { cap: { n: string; t: string; d: string; cube: string }; index: number }) {
  const cubeRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  useEffect(() => {
    const cube = cubeRef.current;
    if (!cube) return;
    const tl = gsap.to(cube, {
      y: -8,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: index * 0.3,
    });
    return () => { tl.kill(); };
  }, [index]);

  return (
    <motion.div
      ref={cardRef}
      className="h-full"
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard variant="surface" glow="brand" padding="lg" interactive className="h-full">
        <div className="flex flex-col items-center text-center gap-5 h-full min-h-[280px] justify-between">
          <img ref={cubeRef} src={cap.cube} alt="" className="w-20 h-20 object-contain" aria-hidden="true" />
          <div>
            <p className="font-mono text-xs tracking-[0.2em] mb-3 dark:text-accent text-ink">{cap.n}</p>
            <h3 className="font-semibold text-lg leading-snug mb-3 text-foreground">{cap.t}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{cap.d}</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}


function HomePage() {
  const { t } = useTranslation();

  const capabilities = [
    { n: "01", t: t('home_cap1_title'), d: t('home_cap1_desc'), cube: cubeImages[0] },
    { n: "02", t: t('home_cap2_title'), d: t('home_cap2_desc'), cube: cubeImages[1] },
    { n: "03", t: t('home_cap3_title'), d: t('home_cap3_desc'), cube: cubeImages[2] },
    { n: "04", t: t('home_cap4_title'), d: t('home_cap4_desc'), cube: cubeImages[3] },
    { n: "05", t: t('home_cap5_title'), d: t('home_cap5_desc'), cube: cubeImages[4] },
  ];

  const projectItems = [
    { id: 1, image: projectImages[0], title: projectTitles[0], description: t('home_proj1_desc') },
    { id: 2, image: projectImages[1], title: projectTitles[1], description: t('home_proj2_desc') },
    { id: 3, image: projectImages[2], title: projectTitles[2], description: t('home_proj3_desc') },
    { id: 4, image: projectImages[3], title: projectTitles[3], description: t('home_proj4_desc') },
    { id: 5, image: projectImages[4], title: projectTitles[4], description: t('home_proj5_desc') },
  ];

  const metrics = [
    { v: "12+", l: t('home_metrics_years_label') },
    { v: "EU", l: t('home_metrics_residency_label') },
    { v: "24 / 7", l: t('home_metrics_ops_label') },
    { v: "ISO", l: t('home_metrics_iso_label') },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-background" />
        <div className="absolute inset-0 -z-10">
          <Suspense fallback={null}>
            <LiquidEther
              colors={["#5227FF", "#9945ff", "#00ffff", "#FF9FFC"]}
              mouseForce={20}
              cursorSize={120}
              resolution={0.5}
              autoDemo={true}
              autoSpeed={0.4}
              autoIntensity={2.2}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
              style={{ width: "100%", height: "100%" }}
            />
          </Suspense>
        </div>
        <div className="container-prose pt-32 pb-40 text-foreground">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <TextType
              text={t('home_hero_eyebrow')}
              as="span"
              typingSpeed={35}
              initialDelay={400}
              loop={false}
              showCursor={false}
              className="eyebrow"
            />
          </motion.p>
          <motion.h1
            className="mt-8 max-w-4xl font-display text-5xl md:text-7xl leading-[1.05]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.05 }}
          >
            <BlurText
              text={t('home_hero_heading')}
              delay={80}
              animateBy="words"
              direction="top"
              className="font-display text-5xl md:text-7xl leading-[1.05] text-foreground"
            />
          </motion.h1>
          <motion.p
            className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('home_hero_body')}
          </motion.p>
          <motion.div
            className="mt-12 flex flex-wrap items-center gap-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/solutions" className="text-sm uppercase tracking-[0.2em] border-b border-foreground pb-1 hover:border-accent hover:text-accent">
              <ShinyText text={t('home_hero_cta_primary')} speed={3} color="currentColor" shineColor="#b8a9ff" spread={90} />
            </Link>
            <Link to="/contact" className="text-sm uppercase tracking-[0.2em] text-muted-foreground hover:text-accent">
              <ShinyText text={t('home_hero_cta_secondary')} speed={4} color="currentColor" shineColor="#b8a9ff" spread={90} />
            </Link>
          </motion.div>
        </div>

        <div className="border-t border-border bg-secondary text-foreground">
          <div className="container-prose grid grid-cols-2 md:grid-cols-4">
            {metrics.map((m, i) => (
              <motion.div
                key={m.l}
                className={`py-8 ${i !== 0 ? "md:border-l border-border" : ""} ${i % 2 !== 0 ? "border-l border-border md:border-l" : ""}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08 }}
              >
                <ScrollReveal
                  enableBlur={true}
                  baseOpacity={0.1}
                  baseBlur={6}
                  containerClassName="font-display text-3xl md:text-4xl !p-0 !m-0"
                  textClassName="font-display text-3xl md:text-4xl"
                  wordAnimationEnd="bottom 75%"
                >
                  {m.v}
                </ScrollReveal>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{m.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TrustedBy />

      {/* HISCOX CLIENT CARD */}
      <section className="container-prose py-20">
        <FadeUp>
          <GlassCard variant="frosted" glow="brand" interactive padding="lg" className="w-full hiscox-card">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
              <h3 className="font-mono text-4xl md:text-6xl font-black uppercase tracking-tight text-violet-500">
                <DecryptedText
                  text={t('home_hiscox_heading')}
                  animateOn="view"
                  speed={40}
                  maxIterations={12}
                  sequential={true}
                  revealDirection="start"
                  className="text-violet-500"
                  encryptedClassName="text-violet-300/60"
                />
              </h3>
              <div className="relative p-4 shrink-0">
                <div
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.4) 0%, rgba(139,92,246,0.15) 40%, transparent 70%)',
                    filter: 'blur(20px)',
                    zIndex: 0,
                  }}
                />
                <img
                  src={hiscoxLogo}
                  alt="Hiscox"
                  className="footer-logo-img h-20 md:h-24 w-auto object-contain relative z-10"
                />
              </div>
            </div>
            <p className="hiscox-desc text-lg leading-relaxed font-light max-w-5xl">
              {t('home_hiscox_desc')}
            </p>
          </GlassCard>
        </FadeUp>
      </section>

      {/* DOCTRINE */}
      <section id="doctrine" className="container-prose py-28 md:py-36">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow">{t('home_doctrine_eyebrow')}</p>
            <div className="rule-gold mt-6">
              <SplitText
                text={t('home_doctrine_heading')}
                splitType="words"
                tag="h2"
                className="font-display text-4xl md:text-5xl leading-tight text-foreground"
                delay={60}
                duration={0.7}
              />
            </div>
          </div>
          <FadeUp delay={0.1} className="md:col-span-7 md:col-start-6 text-[15px] leading-[1.85] text-muted-foreground space-y-6">
            <ScrollReveal
              enableBlur={true}
              baseOpacity={0.08}
              baseBlur={4}
              containerClassName="text-foreground text-lg leading-[1.7]"
              wordAnimationEnd="bottom 80%"
            >
              {t('home_doctrine_body1')}
            </ScrollReveal>
            <ScrollReveal
              enableBlur={true}
              baseOpacity={0.08}
              baseBlur={4}
              containerClassName="text-[15px] leading-[1.85] text-muted-foreground"
              wordAnimationEnd="bottom 80%"
            >
              {t('home_doctrine_body2')}
            </ScrollReveal>
            <ScrollReveal
              enableBlur={true}
              baseOpacity={0.08}
              baseBlur={4}
              containerClassName="text-[15px] leading-[1.85] text-muted-foreground"
              wordAnimationEnd="bottom 80%"
            >
              {t('home_doctrine_body3')}
            </ScrollReveal>
          </FadeUp>
        </div>
      </section>

      {/* CAPABILITIES — dark glass cards with floating cubes */}
      <section className="py-28 bg-secondary/60 hairline-t hairline-b">
        <div className="container-prose">
          <div className="mb-16">
            <p className="eyebrow">{t('home_capabilities_eyebrow')}</p>
            <ScrollFloat
              containerClassName="mt-6"
              textClassName="font-display text-4xl md:text-5xl text-foreground"
              animationDuration={1.2}
              ease="back.inOut(1.8)"
              stagger={0.025}
            >
              {t('home_capabilities_heading')}
            </ScrollFloat>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5 items-stretch">
            {capabilities.map((c, i) => (
              <CubeCard key={c.n} cap={c} index={i} />
            ))}
          </div>
          <FadeUp delay={0.2} className="mt-10 text-center">
            <Link to="/solutions" className="text-sm uppercase tracking-[0.18em] border-b border-accent/40 pb-0.5 text-accent hover:border-accent transition-colors">
              {t('home_capabilities_cta')}
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* PROJECTS — TestimonialsCard */}
      <section className="py-28 bg-background hairline-t hairline-b">
        <div className="container-prose">
          <FadeUp className="mb-8">
            <p className="eyebrow">{t('home_projects_eyebrow')}</p>
            <h2 className="mt-6 font-display text-4xl md:text-5xl">{t('home_projects_heading')}</h2>
          </FadeUp>
          <TestimonialsCard
            items={projectItems}
            width={720}
            showNavigation={true}
            showCounter={true}
            autoPlay={true}
            autoPlayInterval={4000}
          />
        </div>
      </section>

      {/* INFRASTRUCTURE + CTA — Antigravity background */}
      <div className="relative overflow-hidden">
        {/* Antigravity particle animation — absolute background */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <Suspense fallback={null}>
            <Antigravity
              count={220}
              magnetRadius={8}
              ringRadius={8}
              waveSpeed={0.35}
              waveAmplitude={0.8}
              particleSize={1.2}
              lerpSpeed={0.04}
              color="#a78bfa"
              autoAnimate={true}
              particleVariance={0.8}
              rotationSpeed={0.04}
              depthFactor={0.6}
              pulseSpeed={2}
              particleShape="capsule"
              fieldStrength={12}
            />
          </Suspense>
        </div>

        {/* INFRASTRUCTURE */}
        <section className="container-prose py-28 md:py-36 relative z-10">
          <div className="grid md:grid-cols-12 gap-16 items-start">
            <FadeUp className="md:col-span-5">
              <img src={parkurbisImg} alt="Data infrastructure" loading="lazy" width={1280} height={896} className="w-full h-auto" />
            </FadeUp>
            <FadeUp delay={0.15} className="md:col-span-6 md:col-start-7">
              <p className="eyebrow">{t('home_howwework_eyebrow')}</p>
              <div className="rule-gold mt-6">
                <GradientText
                  colors={["#a78bfa", "#c4b5fd", "#818cf8", "#a78bfa"]}
                  animationSpeed={6}
                  className="font-display text-4xl md:text-5xl"
                >
                  {t('home_howwework_heading')}
                </GradientText>
              </div>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                {t('home_howwework_body')}
              </p>
              <Link to="/solutions" className="mt-8 inline-block text-sm uppercase tracking-[0.18em] border-b border-foreground pb-0.5 hover:border-accent hover:text-accent">
                {t('home_howwework_cta')}
              </Link>
            </FadeUp>
          </div>
        </section>

        {/* PROCESS — 3 steps */}
        <section className="hairline-t relative z-10">
          <div className="container-prose py-24 md:py-32">
            <FadeUp>
              <p className="eyebrow">{t('home_process_eyebrow')}</p>
              <h2 className="rule-gold mt-6 font-display text-4xl md:text-5xl max-w-2xl">
                {t('home_process_heading')}
              </h2>
            </FadeUp>
            <div className="mt-16 grid md:grid-cols-3 gap-px bg-hairline">
              {[
                { num: t('home_process_s1_num'), title: t('home_process_s1_title'), body: t('home_process_s1_body') },
                { num: t('home_process_s2_num'), title: t('home_process_s2_title'), body: t('home_process_s2_body') },
                { num: t('home_process_s3_num'), title: t('home_process_s3_title'), body: t('home_process_s3_body') },
              ].map((step, i) => (
                <FadeUp key={step.num} delay={i * 0.1}>
                  <div className="bg-background p-8 md:p-10 h-full">
                    <p className="font-mono text-xs tracking-[0.22em] text-accent">{step.num}</p>
                    <h3 className="mt-6 font-display text-2xl md:text-3xl text-foreground">{step.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
            <FadeUp delay={0.3}>
              <div className="mt-12">
                <Link to="/contact" className="inline-block text-sm uppercase tracking-[0.2em] border-b border-foreground pb-1 hover:border-accent hover:text-accent transition-colors">
                  {t('home_process_cta')} →
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>

        {/* CTA */}
        <section className="container-prose py-28 relative z-10">
          <FadeUp>
            <div className="grid md:grid-cols-12 items-end gap-12">
              <div className="md:col-span-8">
                <p className="eyebrow">{t('home_cta_eyebrow')}</p>
                <h2 className="rule-gold mt-6 font-display text-4xl md:text-5xl">{t('home_cta_heading')}</h2>
                <p className="mt-6 max-w-xl text-muted-foreground">
                  {t('home_cta_body')}
                </p>
              </div>
              <Link to="/contact" className="md:col-span-4 md:justify-self-end text-sm uppercase tracking-[0.2em] border-b border-foreground pb-1 hover:border-accent hover:text-accent">
                {t('home_cta_button')}
              </Link>
            </div>
          </FadeUp>
        </section>
      </div>
    </>
  );
}
