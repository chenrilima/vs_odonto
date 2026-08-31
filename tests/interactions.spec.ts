import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

async function expectNoSeriousAxeViolations(
  page: import("@playwright/test").Page,
) {
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.filter(({ impact }) =>
      ["serious", "critical"].includes(impact ?? ""),
    ),
  ).toEqual([]);
}

test("abre o agendamento e gera o link do WhatsApp", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Agendar uma avaliação" })
    .first()
    .click();
  const dialog = page.getByRole("dialog", {
    name: "Vamos iniciar uma conversa.",
  });
  await expect(dialog).toBeVisible();
  await dialog.getByLabel("Nome").fill("João da Silva");
  await dialog
    .getByLabel("Interesse")
    .selectOption({ label: "Implantodontia" });
  await dialog.getByRole("button", { name: /Continuar pelo WhatsApp/ }).click();
  await expect(page).toHaveURL(/(wa\.me|whatsapp\.com)/);
});

test("navegação e mapa possuem destinos válidos", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Conhecer tratamentos" }).click();
  await expect(page).toHaveURL(/#tratamentos$/);
  await expect(
    page.getByTitle("Localização da clínica no Google Maps"),
  ).toHaveAttribute("src", /google\.com\/maps/);
  await expect(page.getByRole("link", { name: "Como chegar" })).toHaveAttribute(
    "href",
    /google\.com\/maps/,
  );
});

test("menu mobile cobre a página sem sobreposição do hero", async ({
  page,
}) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto("/");
  await page.getByRole("button", { name: "Abrir menu" }).click();
  const menu = page.locator("#mobile-menu");
  await expect(menu).toBeVisible();
  await expect(menu).toHaveCSS("height", "700px");
  await expect(menu).toHaveCSS("background-color", "rgb(247, 245, 240)");
  await expect(menu.getByRole("link", { name: "Início" })).toBeFocused();
  await expect(page.locator("[data-app-shell]")).toHaveAttribute("inert", "");
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
});

test("tratamento pré-seleciona interesse e CTA geral reinicia o estado", async ({
  page,
}) => {
  await page.goto("/");
  const treatment = page.getByRole("button", { name: /Implantodontia/ });
  await treatment.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByLabel("Interesse")).toHaveValue("Implantodontia");
  await dialog.getByRole("button", { name: "Fechar agendamento" }).click();
  await expect(treatment).toBeFocused();
  await page
    .getByRole("button", { name: "Agendar uma avaliação" })
    .first()
    .click();
  await expect(dialog.getByLabel("Interesse")).toHaveValue("");
});

test("validação anuncia erros e foca o primeiro campo inválido", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "Agendar uma avaliação" })
    .first()
    .click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: /Continuar pelo WhatsApp/ }).click();
  await expect(dialog.getByLabel("Nome")).toBeFocused();
  await expect(dialog.getByText("Informe seu nome.")).toHaveAttribute(
    "role",
    "alert",
  );
});

for (const viewport of [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 844, height: 390 },
  { width: 1024, height: 768 },
  { width: 1280, height: 720 },
  { width: 1920, height: 1080 },
  { width: 2560, height: 1440 },
]) {
  test(`sem overflow horizontal em ${viewport.width}x${viewport.height}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
  });
}

test("sem violações axe sérias nos estados principais", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expectNoSeriousAxeViolations(page);

  await page.getByRole("button", { name: "Abrir menu" }).click();
  await expectNoSeriousAxeViolations(page);
  await page.keyboard.press("Escape");

  await page
    .getByRole("button", { name: "Agendar uma avaliação" })
    .first()
    .click();
  await expectNoSeriousAxeViolations(page);
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: /Continuar pelo WhatsApp/ }).click();
  await expectNoSeriousAxeViolations(page);
});
