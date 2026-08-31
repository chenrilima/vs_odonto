"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Brand } from "./Brand";
const links = [
  ["Início", "#inicio"],
  ["Tratamentos", "#tratamentos"],
  ["Clínica", "#clinica"],
  ["Sobre", "#sobre"],
  ["Avaliações", "#avaliacoes"],
  ["Localização", "#localizacao"],
];
export function Header({
  onBooking,
  onMenuChange,
}: {
  onBooking: () => void;
  onMenuChange: (open: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const changeOpen = useCallback(
    (next: boolean) => {
      setOpen(next);
      onMenuChange(next);
    },
    [onMenuChange],
  );
  useEffect(() => {
    if (!open) return;
    const prior = document.body.style.overflow;
    const menuButton = buttonRef.current;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") changeOpen(false);
      if (event.key !== "Tab" || !panelRef.current) return;
      const items = [
        ...panelRef.current.querySelectorAll<HTMLElement>(
          "a,button:not([disabled])",
        ),
      ];
      const first = items[0],
        last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      }
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = prior;
      document.removeEventListener("keydown", keydown);
      requestAnimationFrame(() => menuButton?.focus());
    };
  }, [changeOpen, open]);
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#inicio" className="brand-link">
            <Brand />
          </a>
          <nav className="desktop-nav" aria-label="Navegação principal">
            {links.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </nav>
          <noscript>
            <style>{`.menu-button{display:none!important}`}</style>
            <nav className="no-script-nav" aria-label="Navegação principal">
              {links.map(([label, href]) => (
                <a key={href} href={href}>
                  {label}
                </a>
              ))}
            </nav>
          </noscript>
          <button
            className="button button--small desktop-cta"
            onClick={onBooking}
          >
            Agendar avaliação
          </button>
          <button
            ref={buttonRef}
            className="menu-button"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => changeOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>
      {open &&
        createPortal(
          <div
            className="menu-backdrop"
            onMouseDown={(e) =>
              e.target === e.currentTarget && changeOpen(false)
            }
          >
            <div ref={panelRef} id="mobile-menu" className="mobile-menu">
              <div className="mobile-menu__top">
                <span>Menu</span>
                <button
                  onClick={() => changeOpen(false)}
                  aria-label="Fechar menu"
                >
                  ×
                </button>
              </div>
              <nav aria-label="Navegação mobile">
                {links.map(([label, href]) => (
                  <a key={href} href={href} onClick={() => changeOpen(false)}>
                    {label}
                    <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </nav>
              <button
                className="button"
                onClick={() => {
                  changeOpen(false);
                  onBooking();
                }}
              >
                Agendar avaliação
              </button>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
