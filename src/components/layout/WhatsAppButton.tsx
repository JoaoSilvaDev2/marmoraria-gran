import Image from "next/image";
import { company } from "@/lib/data";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${company.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_8px_32px_rgb(37_211_102/0.35)] transition-transform duration-300 hover:scale-105 hover:bg-[#20bd5a] md:bottom-8 md:right-8"
      aria-label="Falar no WhatsApp"
    >
      <Image
        src="/images/whatsapp.svg"
        alt=""
        width={28}
        height={28}
        className="h-7 w-7"
      />
    </a>
  );
}
