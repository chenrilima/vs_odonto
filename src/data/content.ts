export type Treatment = {
  name: string;
  shortName: string;
  description: string;
};
export const treatments: Treatment[] = [
  {
    name: "Periodontia",
    shortName: "Periodontia",
    description:
      "Atenção aos tecidos que dão suporte aos dentes, com avaliação cuidadosa e acompanhamento.",
  },
  {
    name: "Cirurgia Geral",
    shortName: "Cirurgia",
    description:
      "Procedimentos cirúrgicos conduzidos a partir de uma avaliação individual e planejamento prévio.",
  },
  {
    name: "Ortodontia",
    shortName: "Ortodontia",
    description:
      "Planejamento para o alinhamento dentário e o equilíbrio funcional de cada sorriso.",
  },
  {
    name: "Endodontia",
    shortName: "Endodontia",
    description:
      "Cuidado endodôntico realizado com atenção ao diagnóstico e às particularidades de cada caso.",
  },
  {
    name: "Prótese Dentária",
    shortName: "Prótese",
    description:
      "Soluções protéticas planejadas para recuperar função e harmonia de forma individualizada.",
  },
  {
    name: "Implantodontia",
    shortName: "Implantodontia",
    description:
      "Avaliação e planejamento implantodôntico respeitando as necessidades clínicas de cada pessoa.",
  },
];
export const planningSteps = [
  "Avaliação",
  "Diagnóstico",
  "Planejamento",
  "Tratamento",
  "Acompanhamento",
];
// Catálogo central para substituição pelos arquivos originais aprovados pelo cliente.
export const clinicMedia = {
  hero: {
    src: "/images/clinic/facade-night.webp",
    alt: "Fachada iluminada da clínica VS Odonto no Tatuapé",
  },
  officePrimary: {
    src: "/images/clinic/office-warm.webp",
    alt: "Consultório odontológico com cadeira, equipamentos e iluminação acolhedora",
  },
  officeSecondary: {
    src: "/images/clinic/office-wide.webp",
    alt: "Consultório odontológico e equipamentos da clínica",
  },
  officeChair: {
    src: "/images/clinic/office-chair.webp",
    alt: "Cadeira odontológica e estrutura do consultório",
  },
  facadeEntrance: {
    src: "/images/clinic/facade-entrance.webp",
    alt: "Entrada envidraçada e identidade visual da clínica VS Odonto",
  },
} as const;
