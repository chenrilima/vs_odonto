import { Brand } from "@/components/Brand";
import { BookingTrigger } from "@/components/BookingTrigger";
import { SiteShell } from "@/components/SiteShell";
import { clinicMedia, planningSteps, treatments } from "@/data/content";
import { siteConfig } from "@/config/site";
import Image from "next/image";
export default function Home() {
  const currentYear = new Date().getFullYear();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: siteConfig.name,
    url: siteConfig.url,
    telephone: "+5511974218938",
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    sameAs: [siteConfig.instagram],
  };
  return (
    <SiteShell>
      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="container hero__grid">
            <div className="hero__copy">
              <p className="eyebrow">Odontologia planejada · Tatuapé</p>
              <h1>Seu sorriso merece um planejamento feito para você.</h1>
              <p className="hero__lead">
                Tratamentos odontológicos personalizados, avaliação
                individualizada e acompanhamento profissional no Tatuapé.
              </p>
              <div className="hero__actions">
                <BookingTrigger>Agendar uma avaliação</BookingTrigger>
                <a className="text-link" href="#tratamentos">
                  Conhecer tratamentos <span aria-hidden="true">↓</span>
                </a>
              </div>
              <div className="rating">
                <span className="rating__score">5,0</span>
                <span>
                  <span aria-label="5 de 5 estrelas" className="stars">
                    ★★★★★
                  </span>
                  <small>21 avaliações no Google</small>
                </span>
              </div>
            </div>
            <div className="hero__visual">
              <Image
                src={clinicMedia.hero.src}
                alt={clinicMedia.hero.alt}
                fill
                priority
                sizes="(max-width: 720px) calc(100vw - 28px), (max-width: 1000px) 40vw, (max-width: 1280px) 465px, 496px"
              />
              <div className="hero__caption">
                <p>
                  Precisão no planejamento.
                  <br />
                  Atenção em cada etapa.
                </p>
                <span className="hero__line" />
              </div>
            </div>
          </div>
        </section>
        <aside className="authority" aria-label="Informações da clínica">
          <div className="container authority__grid">
            <p>
              <b>5,0</b>
              <span>Avaliação Google</span>
            </p>
            <p>
              <b>21</b>
              <span>Avaliações</span>
            </p>
            <p>
              <b>Tatuapé</b>
              <span>São Paulo</span>
            </p>
            <p>
              <b>Odontologia</b>
              <span>Planejada</span>
            </p>
          </div>
        </aside>
        <section className="section treatments" id="tratamentos">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Tratamentos</p>
                <h2>Cuidado completo para o seu sorriso.</h2>
              </div>
              <p>
                Cada indicação parte de uma avaliação cuidadosa. O tratamento é
                pensado de acordo com as necessidades e o momento de cada
                pessoa.
              </p>
            </div>
            <ol className="treatment-list">
              {treatments.map((item, index) => (
                <li key={item.name}>
                  <BookingTrigger
                    className="treatment-button"
                    interest={item.shortName}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span>
                      <h3>{item.name}</h3>
                      <p>{item.description}</p>
                    </span>
                    <span aria-hidden="true">↗</span>
                  </BookingTrigger>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="planning">
          <div className="container planning__grid">
            <div>
              <p className="eyebrow eyebrow--gold">Nosso conceito</p>
              <h2>Planejar antes de cuidar.</h2>
              <p>
                Odontologia Planejada significa compreender o caso por inteiro
                antes de definir o caminho. A avaliação orienta as decisões e
                cada etapa é apresentada com clareza.
              </p>
            </div>
            <ol>
              {planningSteps.map((step, index) => (
                <li key={step}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <b>{step}</b>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <section className="section about" id="sobre">
          <div className="container about__grid">
            <div className="about__image">
              <Image
                src={clinicMedia.officeChair.src}
                alt={clinicMedia.officeChair.alt}
                fill
                sizes="(max-width: 720px) calc(100vw - 28px), (max-width: 1280px) 36vw, 446px"
              />
            </div>
            <div>
              <p className="eyebrow">Prática &amp; propósito</p>
              <h2>Dr. Vinicius Silva e Silva</h2>
              <p className="large-copy">
                Uma prática orientada por planejamento, escuta e acompanhamento
                próximo — do primeiro contato às etapas seguintes do cuidado.
              </p>
              <p>
                A atuação da clínica reúne diferentes áreas da odontologia em
                uma abordagem organizada e individualizada, sempre com
                comunicação clara.
              </p>
              <a
                className="text-link"
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Acompanhar no Instagram <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
        <section className="clinic section" id="clinica">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">A clínica</p>
                <h2>Um espaço pensado para cuidar de você.</h2>
              </div>
              <p>
                Ambientes organizados, estrutura contemporânea e atenção aos
                detalhes para receber cada pessoa com tranquilidade.
              </p>
            </div>
            <div className="gallery">
              <div className="gallery__main">
                <Image
                  src={clinicMedia.officePrimary.src}
                  alt={clinicMedia.officePrimary.alt}
                  fill
                  sizes="(max-width: 720px) calc(100vw - 28px), (max-width: 1280px) 61vw, 763px"
                />
                <div className="gallery__caption">
                  <span>Consultório</span>
                  <b>Estrutura para um cuidado planejado</b>
                </div>
              </div>
              <div className="gallery__side">
                <div>
                  <Image
                    src={clinicMedia.facadeEntrance.src}
                    alt={clinicMedia.facadeEntrance.alt}
                    fill
                    sizes="(max-width: 720px) calc((100vw - 44px) / 2), (max-width: 1280px) 31vw, 381px"
                  />
                  <span className="gallery__label">Fachada</span>
                </div>
                <div>
                  <Image
                    src={clinicMedia.officeSecondary.src}
                    alt={clinicMedia.officeSecondary.alt}
                    fill
                    sizes="(max-width: 720px) calc((100vw - 44px) / 2), (max-width: 1280px) 31vw, 381px"
                  />
                  <span className="gallery__label">Consultório</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="care">
          <div className="container care__grid">
            <p className="eyebrow eyebrow--gold">Estrutura & cuidado</p>
            <h2>Recursos que apoiam decisões cuidadosas.</h2>
            <p>
              Uma estrutura organizada apoia avaliações e tratamentos planejados
              com atenção a cada detalhe, mantendo o foco no que faz sentido
              para cada caso.
            </p>
          </div>
        </section>
        <section className="reviews section" id="avaliacoes">
          <div className="container reviews__grid">
            <div>
              <span className="reviews__score">5,0</span>
              <span aria-label="5 de 5 estrelas" className="stars">
                ★★★★★
              </span>
              <small>No Google</small>
            </div>
            <div>
              <p className="eyebrow">Avaliações</p>
              <h2>Quem conhece a clínica recomenda.</h2>
              <p>
                21 avaliações registradas no Google na referência fornecida pela
                clínica.
              </p>
              <a
                className="text-link"
                href={siteConfig.maps}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver avaliações no Google <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
        <section className="booking-cta" id="agendamento">
          <div className="container">
            <p className="eyebrow eyebrow--gold">Próximo passo</p>
            <h2>Uma conversa é o começo do planejamento.</h2>
            <p>
              Conte brevemente o que você procura e fale diretamente com a
              equipe pelo WhatsApp.
            </p>
            <a
              className="button button--light"
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar pelo WhatsApp <span aria-hidden="true">↗</span>
            </a>
          </div>
        </section>
        <section className="location section" id="localizacao">
          <div className="container location__grid">
            <div>
              <p className="eyebrow">Localização</p>
              <h2>Estamos no Tatuapé.</h2>
              <address>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.district}
                <br />
                {siteConfig.address.city} — {siteConfig.address.state}
                <br />
                {siteConfig.address.postalCode}
              </address>
              <div className="location__actions">
                <a
                  className="button"
                  href={siteConfig.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Como chegar <span aria-hidden="true">↗</span>
                </a>
                <a
                  className="text-link"
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar pelo WhatsApp
                </a>
              </div>
            </div>
            <div className="map-frame">
              <iframe
                title="Localização da clínica no Google Maps"
                src={siteConfig.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <a
                href={siteConfig.maps}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abrir endereço da clínica no Google Maps"
              >
                Abrir no Google Maps <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="container footer__grid">
          <div>
            <Brand inverse />
            <p>Odontologia planejada no Tatuapé.</p>
          </div>
          <nav aria-label="Navegação do rodapé">
            <b>Navegue</b>
            <a href="#tratamentos">Tratamentos</a>
            <a href="#clinica">Clínica</a>
            <a href="#sobre">Sobre</a>
            <a href="#localizacao">Localização</a>
          </nav>
          <div>
            <b>Contato</b>
            <a
              href={`https://wa.me/${siteConfig.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              @vs_odonto
            </a>
          </div>
          <address>
            <b>Visite</b>
            {siteConfig.address.street}
            <br />
            {siteConfig.address.district}
            <br />
            {siteConfig.address.city} — {siteConfig.address.state}
          </address>
        </div>
        <div className="container footer__bottom">
          <span>
            © {currentYear} Dr. Vinicius Silva e Silva — Odontologia Planejada.
          </span>
          <a href="#inicio">Voltar ao topo ↑</a>
        </div>
      </footer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </SiteShell>
  );
}
