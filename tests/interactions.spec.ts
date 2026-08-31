import { expect, test } from "@playwright/test";

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
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(page.getByRole("button", { name: "Abrir menu" })).toBeFocused();
});
