const fallbackUrl = "http://localhost:3000";

type PublicEnvironment = Record<string, string | undefined>;

export function resolveSiteUrl(env: PublicEnvironment = process.env) {
  const candidate =
    env.NEXT_PUBLIC_SITE_URL ||
    (env.VERCEL_URL ? `https://${env.VERCEL_URL}` : fallbackUrl);
  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    throw new Error(
      "NEXT_PUBLIC_SITE_URL deve ser uma URL absoluta válida (incluindo https://).",
    );
  }
  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error("NEXT_PUBLIC_SITE_URL deve usar http:// ou https://.");
  }
  return url.toString().replace(/\/$/, "");
}

export function resolveIndexing(env: PublicEnvironment = process.env) {
  const allowIndexing = env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
  const siteUrl = resolveSiteUrl(env);
  if (allowIndexing && new URL(siteUrl).hostname === "localhost") {
    throw new Error(
      "Build indexável bloqueado: configure NEXT_PUBLIC_SITE_URL com o domínio oficial.",
    );
  }
  return allowIndexing;
}

export const siteConfig = {
  name: "Dr. Vinicius Silva e Silva — Odontologia Planejada",
  shortName: "VS Odonto",
  description:
    "Odontologia planejada no Tatuapé, com avaliação individualizada, cuidado próximo e tratamentos personalizados.",
  url: resolveSiteUrl(),
  allowIndexing: resolveIndexing(),
  whatsapp: (
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5511974218938"
  ).replace(/\D/g, ""),
  instagram: "https://www.instagram.com/vs_odonto/",
  maps: "https://www.google.com/maps/search/?api=1&query=R.%20Ant%C3%B4nio%20Camardo%2C%20308%2C%20Tatuap%C3%A9%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003309-060",
  mapsEmbed:
    "https://www.google.com/maps?q=R.%20Ant%C3%B4nio%20Camardo%2C%20308%2C%20Tatuap%C3%A9%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003309-060&output=embed",
  phoneDisplay: "(11) 97421-8938",
  instagramHandle: "@vs_odonto",
  address: {
    street: "R. Antônio Camardo, 308",
    district: "Tatuapé",
    city: "São Paulo",
    state: "SP",
    postalCode: "03309-060",
    country: "BR",
  },
} as const;
