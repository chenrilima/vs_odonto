import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VS Odonto — Odontologia Planejada",
    short_name: "VS Odonto",
    description: "Odontologia planejada no Tatuapé.",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f5f0",
    theme_color: "#07141d",
  };
}
