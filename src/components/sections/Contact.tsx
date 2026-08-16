"use client";

import { FormEvent } from "react";
import { company, whatsappUrl } from "@/lib/data";
import Reveal from "@/components/ui/Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Contact() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const role = String(data.get("role") || "").trim();
    const project = String(data.get("project") || "").trim();

    const lines = [
      company.whatsappMessage,
      "",
      `Nome: ${name}`,
      `E-mail: ${email}`,
      `Telefone: ${phone}`,
    ];
    if (role) lines.push(`Profissão: ${role}`);
    if (project) lines.push(`Projeto: ${project}`);

    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
  };

  return (
    <section id="contato" className="section-pad bg-neutral-950">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <p className="label-premium">Contato</p>
          <h2 className="heading-display mt-3">Fale conosco</h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-concrete">
            Nossa equipe vai até o seu endereço para medir e preparar o orçamento.
          </p>
          <MagneticButton href="#contato" className="mt-8 px-7 py-3 text-sm">
            Solicitar orçamento gratuito
          </MagneticButton>
          <ul className="mt-12 space-y-4 text-sm text-concrete">
            <li>{company.address}</li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-ice">
                {company.email}
              </a>
            </li>
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-ice">
                WhatsApp · {company.phone}
              </a>
            </li>
            <li>Seg–Sex, 8h–18h · Sáb, 8h–13h</li>
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          <form onSubmit={onSubmit} className="rounded-2xl border border-ice/5 bg-surface/80 p-8 md:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Nome *" name="name" required />
              <Field label="E-mail *" name="email" type="email" required />
              <Field label="Telefone *" name="phone" type="tel" required />
              <Field label="Profissão" name="role" />
            </div>
            <div className="mt-5">
              <label className="mb-1.5 block text-xs font-medium text-concrete">Descrição do projeto</label>
              <textarea
                name="project"
                rows={4}
                className="w-full rounded-xl border border-ice/10 bg-graphite/50 px-4 py-3 text-sm text-ice outline-none transition-colors focus:border-gold/50"
                placeholder="Material, metragem, prazo..."
              />
            </div>
            <ul className="mt-6 space-y-2 border-t border-ice/5 pt-6 text-sm text-concrete">
              {["Orçamento gratuito", "Resposta em até 24 horas", "Sem compromisso"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-gold">✔</span> {t}
                </li>
              ))}
            </ul>
            <MagneticButton type="submit" className="mt-8 w-full">
              Enviar no WhatsApp
            </MagneticButton>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-concrete">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full rounded-xl border border-ice/10 bg-graphite/50 px-4 py-3 text-sm text-ice outline-none transition-colors focus:border-gold/50"
      />
    </div>
  );
}
