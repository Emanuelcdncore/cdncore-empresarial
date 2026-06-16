import { readFileSync, writeFileSync, statSync } from 'fs';

const filePath = 'src/lib/translations.ts';
let src = readFileSync(filePath, 'utf8');

// Keys to add per language
// Anchor: after "home_cta_button" in each lang block
// Also update nav_request_briefing and home_cta_button to "Get in touch" equivalent

const newKeys = {
  en: {
    home_process_eyebrow: "How to engage",
    home_process_heading: "Three steps to working together.",
    home_process_s1_num: "01",
    home_process_s1_title: "Briefing",
    home_process_s1_body: "A confidential session with a senior partner. We map your operating context, constraints, and objectives — no slides, no sales pitch.",
    home_process_s2_num: "02",
    home_process_s2_title: "Proposal",
    home_process_s2_body: "Within two weeks, we return with a scoped engagement: deliverables, timeline, team composition, and investment level.",
    home_process_s3_num: "03",
    home_process_s3_title: "Delivery",
    home_process_s3_body: "Embedded engineers and analysts work alongside your teams. Progress is measurable, documented, and auditable at every stage.",
    home_process_cta: "Get in touch",
    trusted_by_label: "Trusted by",
    built_with_label: "Built with",
    nav_request_briefing: "Get in touch",
    home_cta_button: "Get in touch",
  },
  pt: {
    home_process_eyebrow: "Como colaborar",
    home_process_heading: "Três passos para trabalharmos juntos.",
    home_process_s1_num: "01",
    home_process_s1_title: "Briefing",
    home_process_s1_body: "Uma sessão confidencial com um parceiro sénior. Mapeamos o vosso contexto operacional, restrições e objetivos — sem apresentações, sem discurso comercial.",
    home_process_s2_num: "02",
    home_process_s2_title: "Proposta",
    home_process_s2_body: "Em duas semanas, apresentamos um engagement delimitado: entregáveis, cronograma, composição da equipa e nível de investimento.",
    home_process_s3_num: "03",
    home_process_s3_title: "Entrega",
    home_process_s3_body: "Engenheiros e analistas integrados trabalham ao lado das vossas equipas. O progresso é mensurável, documentado e auditável em cada etapa.",
    home_process_cta: "Entrar em contacto",
    trusted_by_label: "Parceiros de confiança",
    built_with_label: "Construído com",
    nav_request_briefing: "Entrar em contacto",
    home_cta_button: "Entrar em contacto",
  },
  de: {
    home_process_eyebrow: "So arbeiten wir zusammen",
    home_process_heading: "Drei Schritte zur Zusammenarbeit.",
    home_process_s1_num: "01",
    home_process_s1_title: "Briefing",
    home_process_s1_body: "Eine vertrauliche Sitzung mit einem leitenden Partner. Wir erfassen Ihren Betriebskontext, Einschränkungen und Ziele — keine Präsentationen, kein Verkaufsgespräch.",
    home_process_s2_num: "02",
    home_process_s2_title: "Angebot",
    home_process_s2_body: "Innerhalb von zwei Wochen legen wir ein strukturiertes Engagement vor: Liefergegenstände, Zeitplan, Teamzusammensetzung und Investitionsrahmen.",
    home_process_s3_num: "03",
    home_process_s3_title: "Umsetzung",
    home_process_s3_body: "Eingebettete Ingenieure und Analysten arbeiten Seite an Seite mit Ihren Teams. Fortschritte sind messbar, dokumentiert und in jeder Phase prüfbar.",
    home_process_cta: "Kontakt aufnehmen",
    trusted_by_label: "Vertrauen von",
    built_with_label: "Entwickelt mit",
    nav_request_briefing: "Kontakt aufnehmen",
    home_cta_button: "Kontakt aufnehmen",
  },
  fr: {
    home_process_eyebrow: "Comment collaborer",
    home_process_heading: "Trois étapes pour travailler ensemble.",
    home_process_s1_num: "01",
    home_process_s1_title: "Briefing",
    home_process_s1_body: "Une session confidentielle avec un partenaire senior. Nous cartographions votre contexte opérationnel, vos contraintes et vos objectifs — sans présentation, sans discours commercial.",
    home_process_s2_num: "02",
    home_process_s2_title: "Proposition",
    home_process_s2_body: "Sous deux semaines, nous revenons avec un engagement cadré : livrables, calendrier, composition de l'équipe et niveau d'investissement.",
    home_process_s3_num: "03",
    home_process_s3_title: "Livraison",
    home_process_s3_body: "Des ingénieurs et analystes intégrés travaillent aux côtés de vos équipes. Les progrès sont mesurables, documentés et auditables à chaque étape.",
    home_process_cta: "Nous contacter",
    trusted_by_label: "Ils nous font confiance",
    built_with_label: "Construit avec",
    nav_request_briefing: "Nous contacter",
    home_cta_button: "Nous contacter",
  },
  es: {
    home_process_eyebrow: "Cómo colaborar",
    home_process_heading: "Tres pasos para trabajar juntos.",
    home_process_s1_num: "01",
    home_process_s1_title: "Briefing",
    home_process_s1_body: "Una sesión confidencial con un socio senior. Mapeamos su contexto operativo, restricciones y objetivos — sin presentaciones, sin discurso de ventas.",
    home_process_s2_num: "02",
    home_process_s2_title: "Propuesta",
    home_process_s2_body: "En dos semanas, regresamos con un compromiso estructurado: entregables, cronograma, composición del equipo y nivel de inversión.",
    home_process_s3_num: "03",
    home_process_s3_title: "Entrega",
    home_process_s3_body: "Ingenieros y analistas integrados trabajan junto a sus equipos. El progreso es medible, documentado y auditable en cada etapa.",
    home_process_cta: "Ponerse en contacto",
    trusted_by_label: "Confían en nosotros",
    built_with_label: "Construido con",
    nav_request_briefing: "Ponerse en contacto",
    home_cta_button: "Ponerse en contacto",
  },
  it: {
    home_process_eyebrow: "Come collaborare",
    home_process_heading: "Tre passi per lavorare insieme.",
    home_process_s1_num: "01",
    home_process_s1_title: "Briefing",
    home_process_s1_body: "Una sessione riservata con un partner senior. Mappiamo il vostro contesto operativo, i vincoli e gli obiettivi — nessuna presentazione, nessun discorso commerciale.",
    home_process_s2_num: "02",
    home_process_s2_title: "Proposta",
    home_process_s2_body: "Entro due settimane, torniamo con un engagement strutturato: deliverable, tempistiche, composizione del team e livello di investimento.",
    home_process_s3_num: "03",
    home_process_s3_title: "Consegna",
    home_process_s3_body: "Ingegneri e analisti integrati lavorano fianco a fianco con i vostri team. I progressi sono misurabili, documentati e verificabili in ogni fase.",
    home_process_cta: "Contattaci",
    trusted_by_label: "Si fidano di noi",
    built_with_label: "Costruito con",
    nav_request_briefing: "Contattaci",
    home_cta_button: "Contattaci",
  },
  zh: {
    home_process_eyebrow: "如何合作",
    home_process_heading: "三步开始合作。",
    home_process_s1_num: "01",
    home_process_s1_title: "简报",
    home_process_s1_body: "与高级合伙人进行保密会议。我们梳理您的运营背景、约束条件和目标——无幻灯片，无销售话术。",
    home_process_s2_num: "02",
    home_process_s2_title: "提案",
    home_process_s2_body: "两周内，我们提交一份结构化方案：交付物、时间表、团队构成和投资规模。",
    home_process_s3_num: "03",
    home_process_s3_title: "交付",
    home_process_s3_body: "嵌入式工程师和分析师与您的团队并肩工作。每个阶段的进展均可衡量、记录和审计。",
    home_process_cta: "联系我们",
    trusted_by_label: "合作伙伴",
    built_with_label: "技术栈",
    nav_request_briefing: "联系我们",
    home_cta_button: "联系我们",
  },
};

// Fallback translations for remaining languages (English text as placeholder)
const fallbackLangs = {
  bg: { process_cta: "Свържете се с нас", trusted: "Доверяват ни се", built: "Изградено с", nav: "Свържете се с нас" },
  cs: { process_cta: "Kontaktujte nás", trusted: "Důvěřují nám", built: "Postaveno s", nav: "Kontaktujte nás" },
  da: { process_cta: "Kontakt os", trusted: "Betroet af", built: "Bygget med", nav: "Kontakt os" },
  nl: { process_cta: "Neem contact op", trusted: "Vertrouwd door", built: "Gebouwd met", nav: "Neem contact op" },
  et: { process_cta: "Võtke ühendust", trusted: "Usaldavad meid", built: "Ehitatud kasutades", nav: "Võtke ühendust" },
  fi: { process_cta: "Ota yhteyttä", trusted: "He luottavat meihin", built: "Rakennettu käyttäen", nav: "Ota yhteyttä" },
  el: { process_cta: "Επικοινωνήστε μαζί μας", trusted: "Μας εμπιστεύονται", built: "Κατασκευάστηκε με", nav: "Επικοινωνήστε μαζί μας" },
  hu: { process_cta: "Lépjen kapcsolatba velünk", trusted: "Megbíznak bennünk", built: "Építve ezzel", nav: "Lépjen kapcsolatba velünk" },
  ga: { process_cta: "Déan teagmháil linn", trusted: "Muinín acu asainn", built: "Tógtha le", nav: "Déan teagmháil linn" },
  hr: { process_cta: "Stupite u kontakt", trusted: "Povjerenje klijenata", built: "Izgrađeno s", nav: "Stupite u kontakt" },
  lv: { process_cta: "Sazinieties ar mums", trusted: "Uzticas mums", built: "Veidots ar", nav: "Sazinieties ar mums" },
  lt: { process_cta: "Susisiekite su mumis", trusted: "Pasitiki mumis", built: "Sukurta su", nav: "Susisiekite su mumis" },
  mt: { process_cta: "Ikkuntattjana", trusted: "Jafidawna", built: "Mibnija b", nav: "Ikkuntattjana" },
  pl: { process_cta: "Skontaktuj się z nami", trusted: "Zaufali nam", built: "Zbudowane z", nav: "Skontaktuj się z nami" },
  ro: { process_cta: "Contactați-ne", trusted: "Au încredere în noi", built: "Construit cu", nav: "Contactați-ne" },
  ru: { process_cta: "Связаться с нами", trusted: "Нам доверяют", built: "Создано с помощью", nav: "Связаться с нами" },
  sk: { process_cta: "Kontaktujte nás", trusted: "Dôverujú nám", built: "Postavené s", nav: "Kontaktujte nás" },
  sl: { process_cta: "Stopite v stik z nami", trusted: "Zaupajo nam", built: "Zgrajeno z", nav: "Stopite v stik z nami" },
  sv: { process_cta: "Kontakta oss", trusted: "Betrodda av", built: "Byggt med", nav: "Kontakta oss" },
};

const langExports = {
  en: 'translationEn', pt: 'translationPt', de: 'translationDe', fr: 'translationFr',
  es: 'translationEs', it: 'translationIt', zh: 'translationZh',
  bg: 'translationBg', cs: 'translationCs', da: 'translationDa', nl: 'translationNl',
  et: 'translationEt', fi: 'translationFi', el: 'translationEl', hu: 'translationHu',
  ga: 'translationGa', hr: 'translationHr', lv: 'translationLv', lt: 'translationLt',
  mt: 'translationMt', pl: 'translationPl', ro: 'translationRo', ru: 'translationRu',
  sk: 'translationSk', sl: 'translationSl', sv: 'translationSv',
};

// Process full translations first (en, pt, de, fr, es, it, zh)
for (const [lang, keys] of Object.entries(newKeys)) {
  const exportName = langExports[lang];
  const exportStart = src.indexOf(`export const ${exportName}`);
  if (exportStart === -1) { console.log('Not found:', exportName); continue; }

  // Find home_cta_button in this block
  const ctaBtnIdx = src.indexOf('"home_cta_button":', exportStart);
  if (ctaBtnIdx === -1) { console.log('home_cta_button not found for', lang); continue; }

  // Update nav_request_briefing value in this block
  const navIdx = src.indexOf('"nav_request_briefing":', exportStart);
  if (navIdx !== -1) {
    const navLineEnd = src.indexOf('\n', navIdx);
    const newNavLine = `  "nav_request_briefing": "${keys.nav_request_briefing}",`;
    src = src.slice(0, navIdx) + newNavLine + src.slice(navLineEnd);
  }

  // Re-find home_cta_button after potential shift
  const ctaBtnIdx2 = src.indexOf('"home_cta_button":', exportStart);
  const ctaLineEnd = src.indexOf('\n', ctaBtnIdx2);
  const newCtaLine = `  "home_cta_button": "${keys.home_cta_button}",`;
  src = src.slice(0, ctaBtnIdx2) + newCtaLine + src.slice(ctaLineEnd);

  // Re-find end of home_cta_button line to insert new keys after it
  const ctaBtnIdx3 = src.indexOf('"home_cta_button":', exportStart);
  const insertAfter = src.indexOf('\n', ctaBtnIdx3);

  const insertBlock = '\n' + [
    ['home_process_eyebrow', keys.home_process_eyebrow],
    ['home_process_heading', keys.home_process_heading],
    ['home_process_s1_num', keys.home_process_s1_num],
    ['home_process_s1_title', keys.home_process_s1_title],
    ['home_process_s1_body', keys.home_process_s1_body],
    ['home_process_s2_num', keys.home_process_s2_num],
    ['home_process_s2_title', keys.home_process_s2_title],
    ['home_process_s2_body', keys.home_process_s2_body],
    ['home_process_s3_num', keys.home_process_s3_num],
    ['home_process_s3_title', keys.home_process_s3_title],
    ['home_process_s3_body', keys.home_process_s3_body],
    ['home_process_cta', keys.home_process_cta],
    ['trusted_by_label', keys.trusted_by_label],
    ['built_with_label', keys.built_with_label],
  ].map(([k, v]) => `  "${k}": "${v.replace(/"/g, '\\"')}",`).join('\n');

  src = src.slice(0, insertAfter) + insertBlock + src.slice(insertAfter);
  console.log('Done:', lang);
}

// Process fallback languages
for (const [lang, fb] of Object.entries(fallbackLangs)) {
  const exportName = langExports[lang];
  const exportStart = src.indexOf(`export const ${exportName}`);
  if (exportStart === -1) { console.log('Not found:', exportName); continue; }

  // Update nav_request_briefing
  const navIdx = src.indexOf('"nav_request_briefing":', exportStart);
  if (navIdx !== -1) {
    const navLineEnd = src.indexOf('\n', navIdx);
    src = src.slice(0, navIdx) + `  "nav_request_briefing": "${fb.nav}",` + src.slice(navLineEnd);
  }

  // Update home_cta_button
  const ctaIdx = src.indexOf('"home_cta_button":', exportStart);
  if (ctaIdx !== -1) {
    const ctaLineEnd = src.indexOf('\n', ctaIdx);
    src = src.slice(0, ctaIdx) + `  "home_cta_button": "${fb.process_cta}",` + src.slice(ctaLineEnd);
  }

  // Insert new keys after home_cta_button
  const ctaIdx2 = src.indexOf('"home_cta_button":', exportStart);
  const insertAfter = src.indexOf('\n', ctaIdx2);

  // Use English text for process steps, local text for labels/CTAs
  const enKeys = newKeys.en;
  const insertBlock = '\n' + [
    ['home_process_eyebrow', enKeys.home_process_eyebrow],
    ['home_process_heading', enKeys.home_process_heading],
    ['home_process_s1_num', '01'],
    ['home_process_s1_title', enKeys.home_process_s1_title],
    ['home_process_s1_body', enKeys.home_process_s1_body],
    ['home_process_s2_num', '02'],
    ['home_process_s2_title', enKeys.home_process_s2_title],
    ['home_process_s2_body', enKeys.home_process_s2_body],
    ['home_process_s3_num', '03'],
    ['home_process_s3_title', enKeys.home_process_s3_title],
    ['home_process_s3_body', enKeys.home_process_s3_body],
    ['home_process_cta', fb.process_cta],
    ['trusted_by_label', fb.trusted],
    ['built_with_label', fb.built],
  ].map(([k, v]) => `  "${k}": "${v.replace(/"/g, '\\"')}",`).join('\n');

  src = src.slice(0, insertAfter) + insertBlock + src.slice(insertAfter);
  console.log('Done (fallback):', lang);
}

writeFileSync(filePath, src);
console.log('Final size:', statSync(filePath).size);
