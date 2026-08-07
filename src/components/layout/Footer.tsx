import Image from "next/image";
import Link from "next/link";
import { company } from "@/lib/data";

const footerLinks = [
  { href: "#materiais", label: "Materiais" },
  { href: "#projetos", label: "Projetos" },
  { href: "#processo", label: "Processo" },
  { href: "#contato", label: "Contato" },
];

export default function Footer() {
  return (
    <footer className="border-t border-ice/5 bg-graphite py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/images/logo-dourada.png"
              alt={company.name}
              width={120}
              height={32}
              className="mb-5 h-8 w-auto drop-shadow-[0_0_20px_rgb(176_141_87/0.2)]"
            />
            <p className="max-w-xs text-sm leading-relaxed text-concrete">
              {company.legalName} — Rio de Janeiro. Pedras naturais e superfícies de alto padrão.
            </p>
          </div>
          <div>
            <p className="mb-4 text-sm text-ice">Navegação</p>
            <ul className="space-y-2">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group text-sm text-concrete transition-colors hover:text-ice">
                    <span className="bg-[length:0%_1px] bg-gradient-to-r from-gold to-gold-light bg-no-repeat bg-left-bottom transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-4 text-sm text-ice">Contato</p>
            <ul className="space-y-2 text-sm text-concrete">
              <li>{company.address}</li>
              <li>
                <a href={`mailto:${company.email}`} className="hover:text-ice">
                  {company.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${company.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-ice">
                  WhatsApp · {company.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-ice/5 pt-8 text-xs text-stone-600 md:flex-row md:justify-between">
          <p>&copy; {new Date().getFullYear()} {company.legalName}</p>
          <p>CNPJ {company.cnpj} · Rio de Janeiro, RJ</p>
        </div>
      </div>
    </footer>
  );
}
