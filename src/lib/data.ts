export const brand = {
  graphite: "#1E1E1E",
  ice: "#F8F8F6",
  concrete: "#A8A8A8",
  gold: "#B08D57",
} as const;

export const company = {
  name: "Granorte Marmoraria",
  legalName: "Granorte Marmoraria Ltda",
  cnpj: "02.195.761/0001-71",
  phone: "(21) 97479-3847",
  whatsapp: "5521974793847",
  email: "granortemarmores@gmail.com",
  address: "Av. Pastor Martin Luther King Jr., 13655, Rio de Janeiro, RJ",
  founded: 1997,
  url: "https://joaoSilvaDev2.github.io/marmoraria-gran",
};

export type StoneMaterial = {
  id: string;
  name: string;
  category: string;
  origin: string;
  description: string;
  image: string;
  previewScene: string;
};

export const stones: StoneMaterial[] = [
  {
    id: "taj-mahal",
    name: "Taj Mahal",
    category: "Quartzo",
    origin: "Brasil",
    description: "Tom quente com veios dourados suaves.",
    image: "/images/marmore (1).jpeg",
    previewScene: "/images/marmore (1).jpeg",
  },
  {
    id: "via-lactea",
    name: "Via Láctea",
    category: "Granito",
    origin: "Brasil",
    description: "Movimento profundo em tons escuros.",
    image: "/images/marmore (2).jpeg",
    previewScene: "/images/marmore (2).jpeg",
  },
  {
    id: "branco-parana",
    name: "Branco Paraná",
    category: "Granito",
    origin: "Brasil",
    description: "Clareza e uniformidade para ambientes amplos.",
    image: "/images/marmore (3).jpeg",
    previewScene: "/images/marmore (3).jpeg",
  },
  {
    id: "sao-gabriel",
    name: "São Gabriel",
    category: "Granito",
    origin: "Brasil",
    description: "Cinza sofisticado com textura natural.",
    image: "/images/marmore (4).jpeg",
    previewScene: "/images/marmore (4).jpeg",
  },
  {
    id: "calacatta",
    name: "Calacatta Gold",
    category: "Mármore",
    origin: "Itália",
    description: "Branco nobre com veios dourados marcantes.",
    image: "/images/marmore (5).jpeg",
    previewScene: "/images/marmore (5).jpeg",
  },
  {
    id: "nero",
    name: "Nero Marquina",
    category: "Mármore",
    origin: "Espanha",
    description: "Preto intenso com veios brancos dramáticos.",
    image: "/images/marmore (6).jpeg",
    previewScene: "/images/marmore (6).jpeg",
  },
];

export type MaterialCategory = "marmore" | "granito" | "quartzo";

export type CatalogProduct = {
  id: string;
  name: string;
  category: MaterialCategory;
  origin: string;
  description: string;
  image: string;
};

export const catalogProducts: CatalogProduct[] = [
  { id: "calacatta-gold", name: "Calacatta Gold", category: "marmore", origin: "Itália", description: "Branco com veios dourados.", image: "/images/marmore (1).jpeg" },
  { id: "statuario", name: "Statuario Venato", category: "marmore", origin: "Itália", description: "Branco com veios cinza delicados.", image: "/images/marmore (2).jpeg" },
  { id: "nero-marquina", name: "Nero Marquina", category: "marmore", origin: "Espanha", description: "Preto com veios brancos.", image: "/images/marmore (3).jpeg" },
  { id: "carrara", name: "Carrara Bianco", category: "marmore", origin: "Itália", description: "Branco clássico, veios suaves.", image: "/images/marmore (4).jpeg" },
  { id: "sao-gabriel", name: "São Gabriel Cinza", category: "granito", origin: "Brasil", description: "Cinza com movimento natural.", image: "/images/marmore (5).jpeg" },
  { id: "blue-bahia", name: "Blue Bahia", category: "granito", origin: "Brasil", description: "Azul profundo com reflexos.", image: "/images/marmore (6).jpeg" },
  { id: "preto-tome", name: "Granito Preto São Tomé", category: "granito", origin: "Brasil", description: "Preto uniforme.", image: "/images/marmore (7).jpeg" },
  { id: "ubatuba", name: "Ubatuba Verde", category: "granito", origin: "Brasil", description: "Verde escuro, uso interno.", image: "/images/marmore (1).jpeg" },
  { id: "silestone-miami", name: "Silestone Miami Vena", category: "quartzo", origin: "Espanha", description: "Quartzo com veio marmorizado.", image: "/images/marmore (2).jpeg" },
  { id: "caesarstone-calacatta", name: "Caesarstone Calacatta Nuovo", category: "quartzo", origin: "Israel", description: "Imitação de Calacatta.", image: "/images/marmore (3).jpeg" },
  { id: "silestone-marfil", name: "Silestone Eternal Marfil", category: "quartzo", origin: "Espanha", description: "Tom marfim, baixa manutenção.", image: "/images/marmore (4).jpeg" },
  { id: "caesarstone-cloud", name: "Caesarstone Cloudburst Concrete", category: "quartzo", origin: "Israel", description: "Aspecto cimento, tom neutro.", image: "/images/marmore (5).jpeg" },
];

export const projects = [
  { id: "1", title: "Cozinha Premium", material: "Mármore Calacatta", location: "Barra da Tijuca", image: "/images/marmore (1).jpeg", span: "lg:col-span-2 lg:row-span-2" },
  { id: "2", title: "Banheiro Master", material: "Mármore Nero Marquina", location: "Leblon", image: "/images/marmore (2).jpeg", span: "" },
  { id: "3", title: "Bancada Gourmet", material: "Quartzo Silestone", location: "Recreio", image: "/images/marmore (3).jpeg", span: "" },
  { id: "4", title: "Área Gourmet", material: "Granito São Gabriel", location: "Niterói", image: "/images/marmore (4).jpeg", span: "sm:col-span-2" },
  { id: "5", title: "Lavabo Social", material: "Mármore Carrara", location: "Tijuca", image: "/images/marmore (5).jpeg", span: "" },
  { id: "6", title: "Revestimento", material: "Granito Blue Bahia", location: "Copacabana", image: "/images/marmore (7).jpeg", span: "" },
];

export const processSteps = [
  { step: "01", title: "Escolha", text: "Orientação na seleção do material ideal." },
  { step: "02", title: "Medição", text: "Visita técnica no local com precisão." },
  { step: "03", title: "Produção", text: "Corte e acabamento na fábrica própria." },
  { step: "04", title: "Instalação", text: "Equipe especializada e acabamento impecável." },
];

export const metrics = [
  { value: 2000, suffix: "+", label: "Projetos" },
  { value: 36, suffix: "", label: "Anos de experiência" },
  { value: 98, suffix: "%", label: "Satisfação" },
  { value: 100, suffix: "%", label: "Equipe própria" },
];

export const testimonials = [
  { name: "Maria Helena R.", role: "Arquiteta · Leblon", text: "Precisão no corte e prazo cumprido. Parceira essencial nos meus projetos de alto padrão.", initials: "MH" },
  { name: "Roberto Silva", role: "Cliente final · Barra", text: "Medição no apartamento, bancada perfeita. Atendimento direto, sem enrolação.", initials: "RS" },
  { name: "Ana Costa", role: "Designer · Niterói", text: "Instalação impecável. Entendem o que arquitetos e designers precisam.", initials: "AC" },
];

export const differentials = [
  { title: "Fabricação própria", text: "Controle total de qualidade em cada chapa." },
  { title: "Medição técnica", text: "Equipe no local para orçamento preciso." },
  { title: "Instalação especializada", text: "Profissionais treinados em pedra natural." },
  { title: "25+ anos", text: "Tradição e confiança desde 1997." },
  { title: "Atendimento exclusivo", text: "Consultoria personalizada em cada projeto." },
];

export function asset(path: string) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${path}`;
}
