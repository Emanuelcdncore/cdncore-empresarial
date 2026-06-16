import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { GlassCard } from "@/components/glass/GlassCard";
import { motion } from "framer-motion";
import BlurText from "@/components/ReactBits/BlurText";
import ScrollReveal from "@/components/ReactBits/ScrollReveal";
import { useTranslation } from 'react-i18next';

const Antigravity = lazy(() => import("@/components/ReactBits/Antigravity"));
import sergioPhoto from "@/assets/team-sergio.jpg";
import mehranPhoto from "@/assets/team-mehran.jpg";
import guilhermePhoto from "@/assets/team-guilherme.jpg";
import henriquePhoto from "@/assets/team-henrique.png";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Team — CDNCore" },
      { name: "description", content: "Meet the CDNCore leadership and engineering team." },
    ],
  }),
  component: TeamPage,
});

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

type TeamMemberRole = "team_role_ceo" | "team_role_cto" | "team_role_engineer";

const team: { name: string; roleKey: TeamMemberRole; handle: string; linkedin: string; photo: string; available: boolean }[] = [
  {
    name: "Sergio Pinheiro",
    roleKey: "team_role_ceo",
    handle: "@sergiopinheiro",
    linkedin: "https://www.linkedin.com/in/sergiogpinheiro/",
    photo: sergioPhoto,
    available: true,
  },
  {
    name: "Dr. Mehran Pourvahab",
    roleKey: "team_role_cto",
    handle: "@drmehranpourvah",
    linkedin: "https://www.linkedin.com/in/mehran-pourvahab/",
    photo: mehranPhoto,
    available: true,
  },
  {
    name: "Guilherme Poeta",
    roleKey: "team_role_engineer",
    handle: "@guilhermepoeta",
    linkedin: "https://www.linkedin.com/in/guilherme-fernandes-5b6a6913b/",
    photo: guilhermePhoto,
    available: true,
  },
  {
    name: "Henrique Ramos",
    roleKey: "team_role_engineer",
    handle: "@henriqueramos",
    linkedin: "https://www.linkedin.com/in/henriquer01/",
    photo: henriquePhoto,
    available: true,
  },
];

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const { t } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard variant="surface" glow="purple" padding="none" interactive className="h-full overflow-hidden">
        {/* Photo area */}
        <div className="relative h-64 bg-gradient-to-br from-[rgba(82,39,255,0.18)] to-[rgba(139,92,246,0.08)] flex items-end justify-center overflow-hidden">
          {/* Circuit / tech pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 30% 20%, rgba(139,92,246,0.6) 0%, transparent 50%),
                              radial-gradient(circle at 70% 80%, rgba(82,39,255,0.4) 0%, transparent 50%)`,
          }} />
          {/* Decorative icons faded in background */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
            <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
              <circle cx="90" cy="90" r="80" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4 8" />
              <circle cx="90" cy="90" r="55" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2 6" />
              <line x1="10" y1="90" x2="170" y2="90" stroke="#a78bfa" strokeWidth="0.5" />
              <line x1="90" y1="10" x2="90" y2="170" stroke="#a78bfa" strokeWidth="0.5" />
            </svg>
          </div>
          {member.photo ? (
            <>
              <img
                src={member.photo}
                alt={member.name}
                className="absolute inset-0 w-full h-full object-cover object-top"
                style={{ filter: "grayscale(30%) saturate(0.7)" }}
              />
              {/* Bottom fade — blends photo into card background */}
              <div className="absolute inset-0 z-10" style={{
                background: "linear-gradient(to bottom, rgba(10,8,24,0.35) 0%, transparent 35%, transparent 55%, rgba(10,8,24,0.85) 85%, rgba(10,8,24,1) 100%)",
              }} />
              {/* Side vignette */}
              <div className="absolute inset-0 z-10" style={{
                background: "linear-gradient(to right, rgba(10,8,24,0.4) 0%, transparent 25%, transparent 75%, rgba(10,8,24,0.4) 100%)",
              }} />
              {/* Purple colour tint overlay */}
              <div className="absolute inset-0 z-10" style={{
                background: "linear-gradient(160deg, rgba(82,39,255,0.18) 0%, rgba(139,92,246,0.1) 50%, transparent 100%)",
                mixBlendMode: "screen",
              }} />
            </>
          ) : (
            /* Silhouette placeholder */
            <div className="relative z-10 flex items-end justify-center h-52 w-32">
              <svg viewBox="0 0 128 200" fill="none" className="h-full w-full opacity-30">
                <ellipse cx="64" cy="52" rx="30" ry="32" fill="#a78bfa" />
                <path d="M10 200 C10 140 118 140 118 200" fill="#a78bfa" />
              </svg>
            </div>
          )}
          {/* Name overlay at top */}
          <div className="absolute top-0 left-0 right-0 p-4 z-20" style={{
            background: "linear-gradient(to bottom, rgba(8,6,20,0.75) 0%, transparent 100%)",
          }}>
            <h3 className="font-bold text-xl leading-tight" style={{ color: "#ffffff", textShadow: "0 1px 8px rgba(0,0,0,0.9)" }}>{member.name}</h3>
            <p className="text-sm mt-0.5 font-medium" style={{ color: "#c4b5fd", textShadow: "0 1px 6px rgba(0,0,0,0.8)" }}>{t(member.roleKey)}</p>
          </div>
        </div>

        {/* Bottom info bar */}
        <div
          className="flex items-center gap-3 px-4 py-3"
          style={{
            background: "rgba(8,6,20,0.92)",
            backdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(139,92,246,0.3)",
          }}
        >
          {/* Mini avatar circle */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-700 flex items-center justify-center shrink-0 text-[10px] font-bold" style={{ color: "#ffffff" }}>
            {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs truncate" style={{ color: "#e2e8f0" }}>{member.handle}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {member.available && (
              <span className="flex items-center gap-1 text-[10px] font-mono" style={{ color: "#34d399" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {t('team_card_available')}
              </span>
            )}
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-medium transition-all"
              style={{
                color: "#ffffff",
                background: "rgba(99,91,255,0.5)",
                border: "1px solid rgba(139,92,246,0.6)",
              }}
              onClick={e => e.stopPropagation()}
            >
              <LinkedInIcon />
              {t('team_card_linkedin')}
            </a>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

function TeamPage() {
  const { t } = useTranslation();
  return (
    <>
      <section className="container-prose pt-24 md:pt-32 pb-20">
        <p className="eyebrow">{t('team_hero_eyebrow')}</p>
        <div className="rule-gold mt-6 max-w-3xl">
          <BlurText
            text={t('team_hero_heading')}
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
            {t('team_hero_body')}
          </ScrollReveal>
        </div>
      </section>

      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <Suspense fallback={null}>
            <Antigravity count={150} color="#c4b5fd" autoAnimate={true} magnetRadius={9} ringRadius={7} waveSpeed={0.32} waveAmplitude={0.9} particleSize={1.5} lerpSpeed={0.06} />
          </Suspense>
        </div>
      <section id="team-members" className="container-prose pb-28 relative z-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <TeamCard key={member.handle} member={member} index={i} />
          ))}
        </div>
      </section>
      </div>
    </>
  );
}
