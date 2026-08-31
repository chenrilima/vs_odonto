import { describe, expect, it } from "vitest";
import {
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  normalizeText,
} from "./whatsapp";

describe("WhatsApp booking", () => {
  it("normalizes whitespace without removing accents", () =>
    expect(normalizeText("  João   da Silva ")).toBe("João da Silva"));
  it("builds a message with treatment and line breaks", () =>
    expect(
      buildWhatsAppMessage({ name: "Ana", interest: "Implantodontia" }),
    ).toBe(
      "Olá! Meu nome é Ana.\n\nGostaria de agendar uma avaliação com a clínica Dr. Vinicius Silva e Silva.\n\nTenho interesse em: Implantodontia.",
    ));
  it("keeps special characters in the decoded note", () => {
    const url = buildWhatsAppUrl("+55 (11) 97421-8938", {
      name: "José",
      interest: "Prótese",
      note: "Dor & sensibilidade?",
    });
    expect(url.startsWith("https://wa.me/5511974218938?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1])).toContain(
      "Dor & sensibilidade?",
    );
  });
  it("encodes accents and newlines safely", () => {
    const url = buildWhatsAppUrl("5511974218938", {
      name: "Márcia",
      interest: "Avaliação geral",
    });
    expect(url).toContain("M%C3%A1rcia");
    expect(url).toContain("%0A%0A");
  });
  it("omits an empty optional note", () =>
    expect(
      buildWhatsAppMessage({
        name: "Carlos",
        interest: "Ortodontia",
        note: "  ",
      }),
    ).not.toContain("Observação"));
  it.each([
    "Carlos",
    "João",
    "José da Silva",
    "Ana Júlia",
    "ç",
    "ã",
    "é",
    "&",
    "?",
    "/",
    "￼\t",
  ])("round-trips %j without double encoding", (name) => {
    const url = buildWhatsAppUrl("5511974218938", {
      name,
      interest: "Avaliação geral",
    });
    expect(url).toMatch(/^https:\/\/wa\.me\/5511974218938\?text=/);
    const decoded = decodeURIComponent(url.split("text=")[1]);
    expect(decoded).toContain(normalizeText(name));
    expect(decoded).not.toContain("%25");
  });
});
