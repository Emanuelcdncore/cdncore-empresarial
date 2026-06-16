import { LogoLoop } from "./LogoLoop";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiPostgresql,
  SiDocker, SiNginx, SiLinux, SiPython, SiKubernetes,
} from "react-icons/si";
import hiscoxLogo from "@/assets/Hiscox.png";
import { useTranslation } from "react-i18next";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiNginx />, title: "Nginx", href: "https://nginx.org" },
  { node: <SiLinux />, title: "Linux", href: "https://www.linux.org" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiKubernetes />, title: "Kubernetes", href: "https://kubernetes.io" },
];

export function TrustedBy() {
  const { t } = useTranslation();
  return (
    <div className="hairline-t hairline-b bg-secondary/40">
      {/* Clients — prominent */}
      <div className="container-prose py-16 md:py-20 flex flex-col items-center gap-10">
        <p className="eyebrow tracking-[0.22em]">{t('trusted_by_label')}</p>
        <div className="flex flex-wrap items-center justify-center gap-16">
          <a
            href="https://www.hiscox.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group transition-opacity opacity-70 hover:opacity-100"
            aria-label="Hiscox"
          >
            {/* invert in light mode so white logo shows on light bg */}
            <img
              src={hiscoxLogo}
              alt="Hiscox"
              className="h-12 md:h-16 w-auto object-contain dark:invert-0 invert"
            />
          </a>
        </div>
      </div>

      {/* Divider */}
      <div className="hairline-t" />

      {/* Tech stack */}
      <div className="container-prose py-10 md:py-14 flex flex-col items-center gap-7">
        <p className="eyebrow tracking-[0.22em]">{t('built_with_label')}</p>
        <div className="w-full h-14">
          <LogoLoop
            logos={techLogos}
            speed={28}
            direction="left"
            logoHeight={40}
            gap={64}
            hoverSpeed={0}
            fadeOut={true}
            scaleOnHover={true}
            ariaLabel="Technologies"
          />
        </div>
      </div>
    </div>
  );
}
