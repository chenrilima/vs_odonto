import Link from "next/link";
import { Brand } from "@/components/Brand";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <main className="not-found">
      <Link href="/" aria-label="Voltar ao início">
        <Brand />
      </Link>
      <p className="eyebrow">Erro 404</p>
      <h1>Página não encontrada.</h1>
      <p>O endereço pode ter mudado ou não estar mais disponível.</p>
      <div className="not-found__actions">
        <Link className="button" href="/">
          Voltar ao início
        </Link>
        <a
          className="text-link"
          href={`https://wa.me/${siteConfig.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Falar pelo WhatsApp
        </a>
      </div>
    </main>
  );
}
