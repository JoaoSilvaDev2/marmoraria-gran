export type StoneThemeMode = "light" | "dark";

export type CatalogStone = {
  id: string;
  index: string;
  name: string;
  shortName: string;
  category: string;
  headline: string;
  legend: string;
  image: string;
  theme: StoneThemeMode;
  overlay: string;
};

const base = "/images/stones";

export const catalogStones: CatalogStone[] = [
  {
    id: "quartzito",
    index: "01",
    name: "Quartzito",
    shortName: "Quartzito",
    category: "Quartzo natural",
    headline: "Resistência com veios naturais",
    legend: "Alta performance para áreas de uso intenso — cozinhas, áreas gourmet e fachadas com acabamento refinado.",
    image: `${base}/stone-01-quartzito.png`,
    theme: "light",
    overlay: "linear-gradient(to top, rgba(248,248,246,0.55) 0%, rgba(248,248,246,0.08) 45%, transparent 70%)",
  },
  {
    id: "branco",
    index: "02",
    name: "Branco",
    shortName: "Branco",
    category: "Mármore",
    headline: "Luminosidade atemporal",
    legend: "Superfícies claras que ampliam ambientes e valorizam a arquitetura com sobriedade e elegância.",
    image: `${base}/stone-02-branco.png`,
    theme: "light",
    overlay: "linear-gradient(to top, rgba(248,248,246,0.5) 0%, rgba(248,248,246,0.06) 50%, transparent 75%)",
  },
  {
    id: "bege",
    index: "03",
    name: "Bege",
    shortName: "Bege",
    category: "Mármore",
    headline: "Calor em tom neutro",
    legend: "Tonalidade acolhedora para banheiros, salas e integrações que pedem conforto visual sem perder sofisticação.",
    image: `${base}/stone-03-bege.png`,
    theme: "light",
    overlay: "linear-gradient(to top, rgba(30,30,30,0.35) 0%, rgba(30,30,30,0.05) 55%, transparent 80%)",
  },
  {
    id: "preto",
    index: "04",
    name: "Preto",
    shortName: "Preto",
    category: "Mármore",
    headline: "Presença e contraste",
    legend: "Profundidade dramática para bancadas, revestimentos e detalhes que definem o caráter do projeto.",
    image: `${base}/stone-04-preto.png`,
    theme: "dark",
    overlay: "linear-gradient(to top, rgba(30,30,30,0.72) 0%, rgba(30,30,30,0.25) 50%, rgba(30,30,30,0.08) 100%)",
  },
  {
    id: "cinza",
    index: "05",
    name: "Cinza",
    shortName: "Cinza",
    category: "Granito",
    headline: "Equilíbrio contemporâneo",
    legend: "Granito versátil, ideal para ambientes modernos que exigem durabilidade e uniformidade visual.",
    image: `${base}/stone-05-cinza.png`,
    theme: "dark",
    overlay: "linear-gradient(to top, rgba(30,30,30,0.65) 0%, rgba(30,30,30,0.2) 55%, transparent 85%)",
  },
  {
    id: "calacatta",
    index: "06",
    name: "Calacatta",
    shortName: "Calacatta",
    category: "Mármore",
    headline: "Veios que viram assinatura",
    legend: "Desenho marcante de alta gama para projetos exclusivos em que a pedra é protagonista.",
    image: `${base}/stone-06-calacatta.png`,
    theme: "light",
    overlay: "linear-gradient(to top, rgba(248,248,246,0.48) 0%, rgba(248,248,246,0.05) 50%, transparent 72%)",
  },
  {
    id: "branco-veinado",
    index: "07",
    name: "Branco Veinado",
    shortName: "Branco Veinado",
    category: "Mármore",
    headline: "Movimento em branco puro",
    legend: "Veios delicados que trazem ritmo e personalidade a superfícies amplas e iluminadas.",
    image: `${base}/stone-07-branco-veinado.png`,
    theme: "light",
    overlay: "linear-gradient(to top, rgba(248,248,246,0.52) 0%, rgba(248,248,246,0.06) 48%, transparent 75%)",
  },
];

export function stoneThemeClasses(mode: StoneThemeMode) {
  return mode === "dark"
    ? {
        title: "text-ice",
        body: "text-concrete",
        label: "text-ice/70",
        indexBg: "text-ice/[0.04]",
        selectorText: "text-ice/50",
        selectorActive: "text-ice",
        selectorHover: "text-ice/80",
        selectorBorder: "border-ice/30",
        selectorActiveBorder: "border-gold",
      }
    : {
        title: "text-graphite",
        body: "text-stone-600",
        label: "text-graphite/70",
        indexBg: "text-graphite/[0.05]",
        selectorText: "text-graphite/45",
        selectorActive: "text-graphite",
        selectorHover: "text-graphite/75",
        selectorBorder: "border-graphite/20",
        selectorActiveBorder: "border-gold",
      };
}

export function preloadStoneImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}
