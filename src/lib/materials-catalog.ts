export type MaterialCategory = "marmore" | "granito" | "quartzo";

export type CatalogStone = {
  id: string;
  name: string;
  tagline: string;
  idealFor: string;
  image: string;
  theme: "light" | "dark";
};

export type MaterialCategoryData = {
  id: MaterialCategory;
  index: string;
  name: string;
  headline: string;
  lines: [string, string, string];
  exploreCta: string;
  stones: CatalogStone[];
};

const stonesBase = "/images/stones";

export const materialCategories: MaterialCategoryData[] = [
  {
    id: "marmore",
    index: "01",
    name: "Mármore",
    headline: "Elegância esculpida pela natureza.",
    lines: ["Elegância natural.", "Veios únicos.", "Presença atemporal."],
    exploreCta: "Explorar mármores",
    stones: [
      {
        id: "calacatta",
        name: "Calacatta",
        tagline: "Veios marcantes. Elegância atemporal.",
        idealFor: "Bancadas · Ilhas · Banheiros",
        image: `${stonesBase}/stone-06-calacatta.png`,
        theme: "light",
      },
      {
        id: "carrara",
        name: "Carrara",
        tagline: "Branco clássico. Veios suaves.",
        idealFor: "Banheiros · Lavabos · Revestimentos",
        image: `${stonesBase}/stone-02-branco.png`,
        theme: "light",
      },
      {
        id: "crema-marfil",
        name: "Crema Marfil",
        tagline: "Calor mineral. Sobriedade refinada.",
        idealFor: "Bancadas · Peitoris · Escadas",
        image: `${stonesBase}/stone-03-bege.png`,
        theme: "light",
      },
      {
        id: "nero-marquina",
        name: "Nero Marquina",
        tagline: "Contraste dramático. Personalidade forte.",
        idealFor: "Banheiros · Detalhes · Composições",
        image: `${stonesBase}/stone-04-preto.png`,
        theme: "dark",
      },
      {
        id: "statuario",
        name: "Statuario",
        tagline: "Movimento delicado. Luminosidade pura.",
        idealFor: "Ilhas · Salas · Ambientes amplos",
        image: `${stonesBase}/stone-07-branco-veinado.png`,
        theme: "light",
      },
      {
        id: "travertino",
        name: "Travertino",
        tagline: "Textura orgânica. Acolhimento natural.",
        idealFor: "Revestimentos · Escadas · Fachadas",
        image: `${stonesBase}/stone-03-bege.png`,
        theme: "light",
      },
    ],
  },
  {
    id: "granito",
    index: "02",
    name: "Granito",
    headline: "Força e permanência em cada chapa.",
    lines: ["Alta resistência.", "Textura autêntica.", "Uso intenso."],
    exploreCta: "Conhecer granitos",
    stones: [
      {
        id: "preto-sao-gabriel",
        name: "Preto São Gabriel",
        tagline: "Profundidade absoluta. Acabamento impecável.",
        idealFor: "Cozinhas · Ilhas · Áreas gourmet",
        image: `${stonesBase}/stone-04-preto.png`,
        theme: "dark",
      },
      {
        id: "sao-gabriel",
        name: "São Gabriel",
        tagline: "Cinza sofisticado. Movimento natural.",
        idealFor: "Bancadas · Frontões · Revestimentos",
        image: `${stonesBase}/stone-05-cinza.png`,
        theme: "dark",
      },
      {
        id: "blue-bahia",
        name: "Blue Bahia",
        tagline: "Azul profundo. Peça de destaque.",
        idealFor: "Ilhas · Detalhes · Composições exclusivas",
        image: `${stonesBase}/stone-05-cinza.png`,
        theme: "dark",
      },
      {
        id: "branco-parana",
        name: "Branco Paraná",
        tagline: "Clareza uniforme. Amplitude visual.",
        idealFor: "Cozinhas · Banheiros · Áreas integradas",
        image: `${stonesBase}/stone-02-branco.png`,
        theme: "light",
      },
      {
        id: "ubatuba",
        name: "Ubatuba",
        tagline: "Verde escuro. Presença contida.",
        idealFor: "Bancadas · Áreas internas · Lavabos",
        image: `${stonesBase}/stone-05-cinza.png`,
        theme: "dark",
      },
    ],
  },
  {
    id: "quartzo",
    index: "03",
    name: "Quartzo",
    headline: "Precisão contemporânea, baixa manutenção.",
    lines: ["Uniformidade.", "Durabilidade.", "Acabamento contínuo."],
    exploreCta: "Ver coleção de quartzos",
    stones: [
      {
        id: "silestone-calacatta",
        name: "Silestone Calacatta",
        tagline: "Veio marmorizado. Performance diária.",
        idealFor: "Cozinhas · Ilhas · Cubas integradas",
        image: `${stonesBase}/stone-06-calacatta.png`,
        theme: "light",
      },
      {
        id: "silestone-eternal",
        name: "Silestone Eternal",
        tagline: "Tom marfim. Superfície serena.",
        idealFor: "Banheiros · Bancadas · Áreas de serviço",
        image: `${stonesBase}/stone-02-branco.png`,
        theme: "light",
      },
      {
        id: "caesarstone-calacatta",
        name: "Caesarstone Calacatta",
        tagline: "Branco nobre. Precisão industrial.",
        idealFor: "Cozinhas · Ilhas · Ambientes amplos",
        image: `${stonesBase}/stone-07-branco-veinado.png`,
        theme: "light",
      },
      {
        id: "caesarstone-concrete",
        name: "Caesarstone Concrete",
        tagline: "Aspecto mineral. Tom neutro.",
        idealFor: "Cozinhas · Bancadas · Projetos modernos",
        image: `${stonesBase}/stone-05-cinza.png`,
        theme: "dark",
      },
    ],
  },
];


export function categoryById(id: MaterialCategory) {
  return materialCategories.find((c) => c.id === id)!;
}

export function stoneInCategory(categoryId: MaterialCategory, stoneId: string) {
  return categoryById(categoryId).stones.find((s) => s.id === stoneId);
}

export function preloadMaterialImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}
