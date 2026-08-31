import { describe, expect, it } from "vitest";
import { resolveIndexing, resolveSiteUrl } from "./site";

describe("site configuration", () => {
  it("keeps previews out of search engines", () => {
    const env = {
      NEXT_PUBLIC_SITE_URL: "https://preview.vercel.app",
      NEXT_PUBLIC_ALLOW_INDEXING: "false",
    };
    expect(resolveSiteUrl(env)).toBe("https://preview.vercel.app");
    expect(resolveIndexing(env)).toBe(false);
  });

  it("allows indexing with an official absolute URL", () => {
    const env = {
      NEXT_PUBLIC_SITE_URL: "https://dominio-oficial.com.br/",
      NEXT_PUBLIC_ALLOW_INDEXING: "true",
    };
    expect(resolveSiteUrl(env)).toBe("https://dominio-oficial.com.br");
    expect(resolveIndexing(env)).toBe(true);
  });

  it("blocks an indexable localhost build", () => {
    const env = {
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
      NEXT_PUBLIC_ALLOW_INDEXING: "true",
    };
    expect(() => resolveIndexing(env)).toThrow(/Build indexável bloqueado/);
  });
});
