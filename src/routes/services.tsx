import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const Antigravity = lazy(() => import("@/components/ReactBits/Antigravity"));

function useDark() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  useEffect(() => {
    const obs = new MutationObserver(() => setDark(document.documentElement.classList.contains("dark")));
    obs.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}
import BlurText from "@/components/ReactBits/BlurText";
import ScrollReveal from "@/components/ReactBits/ScrollReveal";
import DecryptedText from "@/components/ReactBits/DecryptedText";
import ShinyText from "@/components/ReactBits/ShinyText";
import ScrollFloat from "@/components/ReactBits/ScrollFloat";
import GradientText from "@/components/ReactBits/GradientText";
import mehranPhoto from "@/assets/team-mehran.jpg";
import "@/components/css/Services.css";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — CDNCore" },
      { name: "description", content: "From hardened cybersecurity to agentic AI, CDNCore delivers end-to-end technology solutions built for modern enterprise." },
    ],
  }),
  component: ServicesPage,
});

/* ── SVG icon helpers ── */
const Icon = ({ path, size = 20 }: { path: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d={path} />
  </svg>
);

const ICONS: Record<string, string> = {
  shield:     "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  ddos:       "M18 8h1a4 4 0 0 1 0 8h-1 M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z M6 1v3 M10 1v3 M14 1v3",
  pen:        "M12 20h9 M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z",
  firewall:   "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  voip:       "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.88 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.8 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z",
  incident:   "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
  compliance: "M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",
  brain:      "M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2z M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2z",
  bot:        "M12 8V4H8 M16 4h-4 M12 4v4 M2 14s.5-2 2-2h16s2 0 2 2v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4z M6 18v2 M18 18v2 M8 14h.01 M16 14h.01",
  workflow:   "M22 12h-4l-3 9L9 3l-3 9H2",
  nlp:        "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  vision:     "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0",
  strategy:   "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  chart:      "M18 20V10 M12 20V4 M6 20v-6",
  dashboard:  "M3 3h7v7H3z M14 3h7v7h-7z M14 14h7v7h-7z M3 14h7v7H3z",
  pipeline:   "M12 2L2 7l10 5 10-5-10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  anomaly:    "M22 12h-4l-3 9L9 3l-3 9H2",
  iot:        "M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 2v2 M12 20v2 M2 12h2 M20 12h2",
  cloud:      "M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z",
  network:    "M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2v-4M9 21H5a2 2 0 0 1-2-2v-4m0 0h18",
  poc:        "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
  phd:        "M22 10v6M2 10l10-5 10 5-10 5z M6 12v5c3 3 9 3 12 0v-5",
  ieee:       "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
  mikrotik:   "M5 12h14 M12 5l7 7-7 7",
  data_sci:   "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  linkedin:   "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
};

/* ── Offering card ── */
function OfferingCard({ iconPath, name, desc }: { iconPath: string; name: string; desc: string }) {
  return (
    <div className="service-offering-card">
      <div className="service-offering-icon">
        <Icon path={iconPath} size={18} />
      </div>
      <div className="service-offering-name">{name}</div>
      <div className="service-offering-desc">{desc}</div>
    </div>
  );
}

/* ── Service section ── */
interface ServiceSectionProps {
  id: string;
  tag: string;
  title: string;
  desc: string;
  offerings: { icon: string; name: string; desc: string }[];
  tags: string[];
  caseStudy?: { title: string; text: string };
  index: number;
}

function ServiceSection({ id, tag, title, desc, offerings, tags, caseStudy, index }: ServiceSectionProps) {
  return (
    <section id={id} className="services-section">
      <div className="services-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="services-accent-line">
            <div className="services-accent-line-bar" />
            <DecryptedText
              text={tag}
              animateOn="view"
              speed={35}
              maxIterations={10}
              sequential
              className="services-section-tag"
              encryptedClassName="services-section-tag"
            />
          </div>
          <ScrollFloat
            containerClassName="mb-5"
            textClassName="services-section-title"
            animationDuration={1.1}
            stagger={0.03}
            ease="power3.out"
          >
            {title}
          </ScrollFloat>
          <div className="services-section-desc">
            <ScrollReveal
              enableBlur
              baseOpacity={0.08}
              baseBlur={4}
              containerClassName=""
              wordAnimationEnd="bottom 80%"
            >
              {desc}
            </ScrollReveal>
          </div>
        </motion.div>

        <div className="services-offerings-grid">
          {offerings.map((o, i) => (
            <motion.div
              key={o.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <OfferingCard iconPath={o.icon} name={o.name} desc={o.desc} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="services-tech-strip">
            {tags.map(t => <span key={t} className="services-tech-tag">{t}</span>)}
          </div>
        </motion.div>

        {caseStudy && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <div className="services-case-callout">
              <div className="services-case-callout-title">{caseStudy.title}</div>
              <p className="services-case-callout-text">{caseStudy.text}</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

/* ── Expert domain card ── */
function ExpertDomain({ iconPath, name, desc }: { iconPath: string; name: string; desc: string }) {
  return (
    <div className="services-expert-domain">
      <div className="services-expert-domain-icon">
        <Icon path={iconPath} size={16} />
      </div>
      <div>
        <div className="services-expert-domain-name">{name}</div>
        <div className="services-expert-domain-desc">{desc}</div>
      </div>
    </div>
  );
}

/* ── Main page component ── */
function ServicesPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dark = useDark();
  const btnTextColor = dark ? "#E5E7EB" : "#1e1b4b";

  return (
    <div className="services-page">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
          <Suspense fallback={null}>
            <Antigravity count={220} color="#a78bfa" autoAnimate={true} magnetRadius={12} ringRadius={10} waveSpeed={0.4} waveAmplitude={1.3} particleSize={2.0} lerpSpeed={0.09} />
          </Suspense>
        </div>
        <section className="services-hero relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="services-hero-eyebrow">{t("services_hero_eyebrow")}</p>
            <BlurText
              text={t("services_hero_heading")}
              delay={60}
              animateBy="words"
              direction="top"
              className="services-hero-title !justify-center !gap-x-6"
            />
            <p className="services-hero-subtitle">
              {t("services_hero_subtitle")}
            </p>
            <button className="services-hero-cta" onClick={() => navigate({ to: "/contact" })}>
              <Icon path={ICONS.strategy} size={16} />
              <ShinyText text={t("services_hero_cta")} speed={3} color={btnTextColor} shineColor="#c4b5fd" spread={80} />
            </button>
          </motion.div>
        </section>
      </div>

      {/* ── Divider ── */}
      <div style={{ padding: "0 20px" }}>
        <div className="services-divider" />
      </div>

      {/* ── 1 · Cybersecurity ── */}
      <ServiceSection
        id="services-cybersecurity"
        index={0}
        tag={t("services_cyber_tag")}
        title={t("services_cyber_title")}
        desc={t("services_cyber_desc")}
        offerings={[
          { icon: ICONS.shield,     name: t("services_cyber_o1_name"),  desc: t("services_cyber_o1_desc") },
          { icon: ICONS.ddos,       name: t("services_cyber_o2_name"),  desc: t("services_cyber_o2_desc") },
          { icon: ICONS.pen,        name: t("services_cyber_o3_name"),  desc: t("services_cyber_o3_desc") },
          { icon: ICONS.firewall,   name: t("services_cyber_o4_name"),  desc: t("services_cyber_o4_desc") },
          { icon: ICONS.voip,       name: t("services_cyber_o5_name"),  desc: t("services_cyber_o5_desc") },
          { icon: ICONS.incident,   name: t("services_cyber_o6_name"),  desc: t("services_cyber_o6_desc") },
          { icon: ICONS.compliance, name: t("services_cyber_o7_name"),  desc: t("services_cyber_o7_desc") },
        ]}
        tags={t('services_tags_cyber').split(',')}
      />

      {/* ── 2 · AI Solutions ── */}
      <ServiceSection
        id="services-ai"
        index={1}
        tag={t("services_ai_tag")}
        title={t("services_ai_title")}
        desc={t("services_ai_desc")}
        offerings={[
          { icon: ICONS.brain,    name: t("services_ai_o1_name"),  desc: t("services_ai_o1_desc") },
          { icon: ICONS.bot,      name: t("services_ai_o2_name"),  desc: t("services_ai_o2_desc") },
          { icon: ICONS.workflow, name: t("services_ai_o3_name"),  desc: t("services_ai_o3_desc") },
          { icon: ICONS.nlp,      name: t("services_ai_o4_name"),  desc: t("services_ai_o4_desc") },
          { icon: ICONS.vision,   name: t("services_ai_o5_name"),  desc: t("services_ai_o5_desc") },
          { icon: ICONS.strategy, name: t("services_ai_o6_name"),  desc: t("services_ai_o6_desc") },
        ]}
        tags={t('services_tags_ai').split(',')}
      />

      {/* ── 3 · Big Data Analytics ── */}
      <ServiceSection
        id="services-data"
        index={2}
        tag={t("services_data_tag")}
        title={t("services_data_title")}
        desc={t("services_data_desc")}
        offerings={[
          { icon: ICONS.chart,     name: t("services_data_o1_name"),  desc: t("services_data_o1_desc") },
          { icon: ICONS.dashboard, name: t("services_data_o2_name"),  desc: t("services_data_o2_desc") },
          { icon: ICONS.pipeline,  name: t("services_data_o3_name"),  desc: t("services_data_o3_desc") },
          { icon: ICONS.anomaly,   name: t("services_data_o4_name"),  desc: t("services_data_o4_desc") },
          { icon: ICONS.chart,     name: t("services_data_o5_name"),  desc: t("services_data_o5_desc") },
          { icon: ICONS.data_sci,  name: t("services_data_o6_name"),  desc: t("services_data_o6_desc") },
        ]}
        tags={t('services_tags_data').split(',')}
      />

      {/* ── 4 · Advanced R&D ── */}
      <ServiceSection
        id="services-rd"
        index={3}
        tag={t("services_rd_tag")}
        title={t("services_rd_title")}
        desc={t("services_rd_desc")}
        offerings={[
          { icon: ICONS.iot,      name: t("services_rd_o1_name"),  desc: t("services_rd_o1_desc") },
          { icon: ICONS.cloud,    name: t("services_rd_o2_name"),  desc: t("services_rd_o2_desc") },
          { icon: ICONS.network,  name: t("services_rd_o3_name"),  desc: t("services_rd_o3_desc") },
          { icon: ICONS.poc,      name: t("services_rd_o4_name"),  desc: t("services_rd_o4_desc") },
          { icon: ICONS.strategy, name: t("services_rd_o5_name"),  desc: t("services_rd_o5_desc") },
          { icon: ICONS.brain,    name: t("services_rd_o6_name"),  desc: t("services_rd_o6_desc") },
        ]}
        tags={["Edge Computing", "IoT", "MLOps", "SD-WAN", "5G", "Quantum Readiness", "Microservices", "Kubernetes", "Cloud-Native"]}
      />

      {/* ── Expert section: Dr. Mehran Pourvahab ── */}
      <section className="services-expert-section">
        <div className="services-expert-inner">

          {/* Profile card column */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}
          >
            <div className="services-profile-card">
              <div style={{
                width: "110px", height: "110px", borderRadius: "50%",
                margin: "0 auto 20px",
                background: "linear-gradient(135deg, rgba(139,92,246,0.3), rgba(59,130,246,0.3))",
                border: "2px solid rgba(139,92,246,0.5)",
                overflow: "hidden",
                display: "flex", alignItems: "flex-end", justifyContent: "center",
              }}>
                <img
                  src={mehranPhoto}
                  alt="Dr. Mehran Pourvahab"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                />
              </div>
              <div style={{ fontSize: "17px", fontWeight: 700, color: "#ffffff", marginBottom: "6px" }}>
                Dr. Mehran Pourvahab
              </div>
              <div style={{ fontSize: "12px", color: "#A78BFA", fontFamily: "monospace", letterSpacing: "0.05em", marginBottom: "20px" }}>
                {t("services_expert_role")}
              </div>
              <a
                href="https://www.linkedin.com/in/mehran-pourvahab/"
                target="_blank"
                rel="noopener noreferrer"
                className="services-linkedin-btn"
              >
                <Icon path={ICONS.linkedin} size={14} />
                LinkedIn
              </a>
            </div>

            {/* Credentials */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "260px" }}>
              {[
                { icon: ICONS.phd,      label: t("services_expert_phd") },
                { icon: ICONS.ieee,     label: t("services_expert_ieee") },
                { icon: ICONS.mikrotik, label: t("services_expert_mikrotik") },
              ].map(c => (
                <div key={c.label} className="services-credential-item">
                  <Icon path={c.icon} size={14} />
                  {c.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Content column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
            >
              <div className="services-accent-line">
                <div className="services-accent-line-bar" />
                <span className="services-section-tag">{t("services_expert_tag")}</span>
              </div>
              <div className="mb-4">
                <GradientText
                  colors={["#a78bfa", "#c4b5fd", "#818cf8", "#a78bfa"]}
                  animationSpeed={6}
                  className="services-expert-title"
                >
                  Dr. Mehran Pourvahab
                </GradientText>
              </div>
              <p className="services-expert-subtitle">
                {t("services_expert_bio")}
              </p>
            </motion.div>

            <div className="services-expert-domains">
              {[
                { icon: ICONS.brain,    name: t("services_expert_d1_name"),  desc: t("services_expert_d1_desc") },
                { icon: ICONS.shield,   name: t("services_expert_d2_name"),  desc: t("services_expert_d2_desc") },
                { icon: ICONS.cloud,    name: t("services_expert_d3_name"),  desc: t("services_expert_d3_desc") },
                { icon: ICONS.data_sci, name: t("services_expert_d4_name"),  desc: t("services_expert_d4_desc") },
                { icon: ICONS.nlp,      name: t("services_expert_d5_name"),  desc: t("services_expert_d5_desc") },
                { icon: ICONS.mikrotik, name: t("services_expert_d6_name"),  desc: t("services_expert_d6_desc") },
              ].map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                >
                  <ExpertDomain iconPath={d.icon} name={d.name} desc={d.desc} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="services-expert-coming-soon">
                <Icon path={ICONS.strategy} size={16} />
                <span>{t("services_expert_coming_soon")}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
          <Suspense fallback={null}>
            <Antigravity count={200} color="#a78bfa" autoAnimate={true} magnetRadius={11} ringRadius={10} waveSpeed={0.4} waveAmplitude={1.3} particleSize={2.0} lerpSpeed={0.09} />
          </Suspense>
        </div>
      <section className="services-cta-strip relative z-10" style={{ padding: "80px 20px", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="services-cta-eyebrow">
            {t("services_cta_eyebrow")}
          </p>
          <h2 className="services-cta-heading">
            <GradientText
              colors={["#A78BFA", "#C4B5FD", "#818cf8", "#A78BFA"]}
              animationSpeed={5}
              className="inline font-bold"
            >
              {t("services_cta_heading_gradient")}
            </GradientText>
            {" "}{t("services_cta_heading_rest")}
          </h2>
          <p className="services-cta-subtitle">
            {t("services_cta_subtitle")}
          </p>
          <button className="services-hero-cta" onClick={() => navigate({ to: "/contact" })}>
            <Icon path={ICONS.voip} size={16} />
            <ShinyText text={t("services_cta_button")} speed={3} color={btnTextColor} shineColor="#c4b5fd" spread={80} />
          </button>
        </motion.div>
      </section>
      </div>

    </div>
  );
}
