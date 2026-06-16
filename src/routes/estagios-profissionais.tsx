import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import iefpImg from "@/assets/footer-iefp.png";
import BlurText from "@/components/ReactBits/BlurText";
import ScrollReveal from "@/components/ReactBits/ScrollReveal";
import estagiosImg from "@/assets/estagios-image.png";
import qrcodeImg from "@/assets/qrcode.png";
import greenImg from "@/assets/green.png";
import redImg from "@/assets/red.png";

export const Route = createFileRoute("/estagios-profissionais")({
  head: () => ({
    meta: [
      { title: "Estágios Profissionais — CDNCore" },
      { name: "description", content: "CDNCore — Estágios Profissionais IEFP, Pessoas 2030, Portugal 2030, Cofinanciado pela União Europeia." },
    ],
  }),
  component: EstagiosPage,
});

const card = {
  background: "rgba(139,92,246,0.08)",
  border: "1px solid rgba(139,92,246,0.2)",
  borderRadius: "10px",
  padding: "20px 24px",
} as React.CSSProperties;

function EstagiosPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container-prose relative">

        {/* Back link */}
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-accent hover:underline mb-10">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        {/* Green decoration */}
        <img src={greenImg} alt="" aria-hidden className="absolute top-16 right-0 w-28 opacity-70 pointer-events-none" />

        {/* IEFP logo */}
        <div className="flex justify-center mb-10">
          <img src={iefpImg} alt="IEFP — Pessoas 2030 — Portugal 2030 — Cofinanciado pela União Europeia"
            className="w-full max-w-2xl object-contain" />
        </div>

        {/* Header card + photo */}
        <div className="flex flex-wrap gap-6 items-stretch mb-8">
          <div style={card} className="flex-1 min-w-[280px] flex flex-col items-center justify-center text-center">
            <BlurText text="ESTÁGIOS PROFISSIONAIS" delay={50} animateBy="words" direction="top" className="text-2xl font-bold text-foreground mb-2" />
            <div className="w-14 h-0.5 mb-3" style={{ background: "linear-gradient(90deg,#8B5CF6,#A855F7)" }} />
            <p className="text-muted-foreground text-sm mb-1">INSTITUTO DO EMPREGO E FORMAÇÃO PROFISSIONAL, I.P.</p>
            <p className="text-xs" style={{ color: "#6B7280" }}>Centro</p>
          </div>
          <div className="flex-none w-full sm:w-72 rounded-lg overflow-hidden">
            <img src={estagiosImg} alt="Estágios Profissionais" className="w-full h-full object-contain rounded-lg" />
          </div>
        </div>

        {/* Prioridade */}
        <h2 className="text-xl font-semibold text-foreground mb-6">Prioridade</h2>

        {/* Content card + QR */}
        <div className="flex flex-wrap gap-6 items-end">
          <div style={card} className="flex-1 min-w-[320px]">
            <h3 className="text-foreground text-base font-semibold mb-4 leading-snug">
              4A. Mais e melhor emprego, conciliação da vida profissional e pessoal e igualdade de género
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              A Operação insere-se na Tipologia Estágios Profissionais, possibilitando, aos jovens, a realização de uma experiência prática em contexto de trabalho, promovendo a sua integração no mercado de trabalho, assim como, a reconversão profissional de desempregados.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Constituem-se como objetivos especificos (ESO4.1.), melhorar o acesso ao emprego e a medidas de ativação de todos os candidatos a emprego, em especial os jovens, sobretudo através da implementação da Garantia para a Juventude, dos desempregados de longa duração e grupos desfavorecidos no mercado de trabalho, e das pessoas inativas, bem como promover o emprego por conta própria e a economia social.
            </p>
            <ScrollReveal
              enableBlur
              baseOpacity={0.1}
              baseBlur={4}
              containerClassName="text-muted-foreground text-sm leading-relaxed"
              wordAnimationEnd="bottom 80%"
            >
              A execução da Operação decorre no período de 01-01-2023 a 31-12-2025, e prevê abranger 12.520 pessoas desempregadas inscritas nos Serviços de Emprego do IEFP, I.P. Para atingir estes resultados destaca-se o apoio do Fundo Social Europeu mais (FSE+).
            </ScrollReveal>
          </div>

          {/* QR + reference */}
          <div className="flex flex-col items-center gap-3 shrink-0">
            <a href="https://iefp.pt" target="_blank" rel="noopener noreferrer">
              <img src={qrcodeImg} alt="QR Code IEFP" className="w-28 h-28 rounded-lg" />
            </a>
            <a href="https://iefp.pt" target="_blank" rel="noopener noreferrer"
              className="text-sm font-semibold underline" style={{ color: "#8B5CF6" }}>
              iefp.pt
            </a>
            <div style={{ ...card, padding: "8px 14px" }}>
              <p className="text-xs text-muted-foreground tracking-wide m-0">ALT20-01-08B9-FEDER-049179</p>
            </div>
          </div>
        </div>

        {/* Red decoration */}
        <img src={redImg} alt="" aria-hidden className="absolute bottom-0 -left-14 w-28 opacity-70 pointer-events-none" />
      </div>
    </div>
  );
}
