"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import { treatments } from "@/data/content";
import { siteConfig } from "@/config/site";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
export function BookingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null),
    nameRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<{ name?: string; interest?: string }>(
    {},
  );
  useEffect(() => {
    if (!open) return;
    const prior = document.body.style.overflow,
      previous = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    nameRef.current?.focus();
    const keydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = [
          ...dialogRef.current.querySelectorAll<HTMLElement>(
            "input,select,textarea,button:not([disabled])",
          ),
        ],
        first = items[0],
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
      previous?.focus();
    };
  }, [open, onClose]);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget),
      data = {
        name: String(form.get("name") || ""),
        interest: String(form.get("interest") || ""),
        note: String(form.get("note") || ""),
      };
    const nextErrors = {
      name: data.name.trim() ? undefined : "Informe seu nome.",
      interest: data.interest ? undefined : "Selecione um interesse.",
    };
    setErrors(nextErrors);
    if (nextErrors.name || nextErrors.interest) return;
    window.location.href = buildWhatsAppUrl(siteConfig.whatsapp, data);
  }
  if (!open) return null;
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <button
          className="modal__close"
          onClick={onClose}
          aria-label="Fechar agendamento"
        >
          ×
        </button>
        <p className="eyebrow">Agendamento</p>
        <h2 id="booking-title">Vamos iniciar uma conversa.</h2>
        <p>
          Preencha os dados e continue diretamente pelo WhatsApp da clínica.
        </p>
        <form onSubmit={submit} noValidate>
          <label htmlFor="name">Nome</label>
          <input
            ref={nameRef}
            id="name"
            name="name"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span className="field-error" id="name-error">
              {errors.name}
            </span>
          )}
          <label htmlFor="interest">Interesse</label>
          <select
            id="interest"
            name="interest"
            defaultValue=""
            aria-invalid={!!errors.interest}
            aria-describedby={errors.interest ? "interest-error" : undefined}
          >
            <option value="" disabled>
              Selecione
            </option>
            <option>Avaliação geral</option>
            {treatments.map((item) => (
              <option key={item.name}>{item.shortName}</option>
            ))}
            <option>Outro</option>
          </select>
          {errors.interest && (
            <span className="field-error" id="interest-error">
              {errors.interest}
            </span>
          )}
          <label htmlFor="note">
            Conte brevemente como podemos ajudar <small>(opcional)</small>
          </label>
          <textarea id="note" name="note" rows={3} maxLength={500} />
          <button className="button button--full" type="submit">
            Continuar pelo WhatsApp <span aria-hidden="true">↗</span>
          </button>
        </form>
      </div>
    </div>
  );
}
