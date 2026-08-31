export type BookingData = { name: string; interest: string; note?: string };
export function normalizeText(value: string) {
  return value.replace(/\s+/g, " ").trim();
}
export function buildWhatsAppMessage(data: BookingData) {
  const name = normalizeText(data.name),
    interest = normalizeText(data.interest),
    note = normalizeText(data.note || "");
  const lines = [
    `Olá! Meu nome é ${name}.`,
    "",
    "Gostaria de agendar uma avaliação com a clínica Dr. Vinicius Silva e Silva.",
    "",
    `Tenho interesse em: ${interest}.`,
  ];
  if (note) lines.push("", "Observação:", note);
  return lines.join("\n");
}
export function buildWhatsAppUrl(number: string, data: BookingData) {
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(buildWhatsAppMessage(data))}`;
}
