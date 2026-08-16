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
  whatsappMessage: "Olá, vim pelo site e gostaria de fazer um orçamento",
  email: "granortemarmores@gmail.com",
  address: "Av. Pastor Martin Luther King Jr., 13655, Rio de Janeiro, RJ",
  founded: 1997,
  url: "https://joaoSilvaDev2.github.io/marmoraria-gran",
};

export function whatsappUrl(text = company.whatsappMessage) {
  return `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`;
}

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

export const projects = [
  { id: "1", title: "Ilha com cascata", material: "Mármore branco veio dourado", location: "Residencial", image: "/images/projetos/projeto-01-ilha-cozinha.jpg" },
  { id: "2", title: "Banheiro master", material: "Mármore bege", location: "Residencial", image: "/images/projetos/projeto-02-banheiro-bege.jpg" },
  { id: "3", title: "Lavabo esculpido", material: "Mármore travertino", location: "Residencial", image: "/images/projetos/projeto-03-banheiro-cuba-esculpida.jpg" },
  { id: "4", title: "Banheiro contemporâneo", material: "Granito preto polido", location: "Residencial", image: "/images/projetos/projeto-04-banheiro-granito-preto.jpg" },
  { id: "5", title: "Banheiro minimalista", material: "Quartzo branco · cuba esculpida", location: "Residencial", image: "/images/projetos/projeto-05-banheiro-cuba-branca.jpg" },
  { id: "6", title: "Cozinha integrada", material: "Quartzo branco", location: "Residencial", image: "/images/projetos/projeto-06-cozinha-branca.jpg" },
  { id: "7", title: "Ilha e bancada", material: "Mármore branco", location: "Residencial", image: "/images/projetos/projeto-07-ilha-marmore-branco.jpg" },
  { id: "8", title: "Cozinha com ilha", material: "Granito preto · frontão", location: "Residencial", image: "/images/projetos/projeto-08-cozinha-granito-preto.jpg" },
  { id: "9", title: "Banheiro com frontão", material: "Mármore Crema Marfil", location: "Residencial", image: "/images/projetos/projeto-09-banheiro-marmore-integrado.jpg" },
  { id: "10", title: "Área gourmet externa", material: "Granito preto · pedra ferro", location: "Residencial", image: "/images/projetos/projeto-10-area-gourmet-externa.jpg" },
  { id: "11", title: "Escada em mármore", material: "Mármore branco veiado", location: "Residencial", image: "/images/projetos/projeto-11-escada-marmore.jpg" },
  { id: "12", title: "Bancada integrada", material: "Granito preto polido", location: "Residencial", image: "/images/projetos/projeto-12-bancada-granito-preto.jpg" },
  { id: "13", title: "Área de serviço", material: "Mármore branco", location: "Residencial", image: "/images/projetos/projeto-13-area-servico.jpg" },
  { id: "14", title: "Peitoril de janela", material: "Mármore bege polido", location: "Residencial", image: "/images/projetos/projeto-14-peitoril-marmore.jpg" },
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
