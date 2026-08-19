import type { Metadata } from "next";
import { company } from "./data";

export const siteMetadata: Metadata = {
  metadataBase: new URL(company.url),
  title: {
    default: `${company.name} · Mármore, Granito e Quartzo`,
    template: `%s · ${company.name}`,
  },
  description:
    "Marmoraria premium no Rio de Janeiro. Fabricação própria, medição técnica e instalação especializada. Mármore, granito e quartzo de alto padrão.",
  keywords: [
    "marmoraria",
    "mármore",
    "granito",
    "quartzo",
    "Silestone",
    "Caesarstone",
    "bancadas",
    "Rio de Janeiro",
    "Granorte",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: company.url,
    siteName: company.name,
    title: `${company.name} · Pedras naturais de alto padrão`,
    description:
      "Transformamos pedras naturais em ambientes inesquecíveis. Orçamento gratuito e visita técnica.",
    images: [{ url: "/images/fundo-hero.png", width: 1200, height: 630, alt: company.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: company.name,
    description: "Marmoraria premium no Rio de Janeiro.",
    images: ["/images/fundo-hero.png"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: company.url },
  icons: {
    icon: [{ url: `${company.url}/images/logo-dourada.png`, type: "image/png" }],
    apple: [{ url: `${company.url}/images/logo-dourada.png`, type: "image/png" }],
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.legalName,
  image: `${company.url}/images/logo-dourada.png`,
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Pastor Martin Luther King Jr., 13655",
    addressLocality: "Rio de Janeiro",
    addressRegion: "RJ",
    addressCountry: "BR",
  },
  foundingDate: "1997",
  priceRange: "$$$",
  url: company.url,
};
