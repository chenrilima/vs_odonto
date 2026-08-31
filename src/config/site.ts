const fallbackUrl = "http://localhost:3000";
export const siteConfig = {
  name: "Dr. Vinicius Silva e Silva — Odontologia Planejada",
  shortName: "VS Odonto",
  description:
    "Odontologia planejada no Tatuapé, com avaliação individualizada, cuidado próximo e tratamentos personalizados.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || fallbackUrl).replace(/\/$/, ""),
  allowIndexing: process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true",
  whatsapp: (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511974218938"
  ).replace(/\D/g, ""),
  instagram: "https://www.instagram.com/vs_odonto/",
  maps: "https://www.google.com/maps/search/?api=1&query=R.%20Ant%C3%B4nio%20Camardo%2C%20308%2C%20Tatuap%C3%A9%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003309-060",
  mapsEmbed:
    "https://www.google.com/maps?q=R.%20Ant%C3%B4nio%20Camardo%2C%20308%2C%20Tatuap%C3%A9%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003309-060&output=embed",
  phoneDisplay: "(11) 97421-8938",
  address: {
    street: "R. Antônio Camardo, 308",
    district: "Tatuapé",
    city: "São Paulo",
    state: "SP",
    postalCode: "03309-060",
    country: "BR",
  },
} as const;
