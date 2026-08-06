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

export const projects = [
  { id: "1", title: "Cozinha Premium", material: "Calacatta Gold", location: "Barra da Tijuca", image: "/images/marmore (1).jpeg", span: "lg:col-span-2 lg:row-span-2" },
  { id: "2", title: "Banheiro Master", material: "Nero Marquina", location: "Leblon", image: "/images/marmore (2).jpeg", span: "" },
  { id: "3", title: "Área Gourmet", material: "São Gabriel", location: "Niterói", image: "/images/marmore (3).jpeg", span: "" },
  { id: "4", title: "Lavabo Social", material: "Branco Paraná", location: "Tijuca", image: "/images/marmore (4).jpeg", span: "sm:col-span-2" },
  { id: "5", title: "Cozinha Integrada", material: "Via Láctea", location: "Botafogo", image: "/images/marmore (5).jpeg", span: "" },
  { id: "6", title: "Revestimento", material: "Taj Mahal", location: "Copacabana", image: "/images/marmore (6).jpeg", span: "" },
  { id: "7", title: "Bancada Esculpida", material: "Dekton", location: "Recreio", image: "/images/marmore (7).jpeg", span: "" },
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
