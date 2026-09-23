import { expect, test } from "@playwright/test";

const portfolioRoutes = ["/", "/projects/sift-and-shop", "/projects/ssi-metal"];
const viewportWidths = [320, 375, 768, 1024, 1440];

for (const route of portfolioRoutes) {
  for (const width of viewportWidths) {
    test(`${route} has no horizontal overflow at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      await expect(page.locator("main")).toBeVisible();

      // This guards the responsive widths required by the portfolio design guidelines.
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));

      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    });
  }
}

test("the Sift & Shop gallery supports controls, keyboard navigation, and thumbnails", async ({ page }) => {
  await page.setViewportSize({ width: 1024, height: 900 });
  await page.goto("/projects/sift-and-shop");

  await page.getByRole("button", { name: /Preview Sift & Shop homepage/ }).click();
  await expect(page.getByText("1 of 3")).toBeVisible();

  const dialog = page.getByRole("dialog");
  const dialogBox = await dialog.boundingBox();
  expect(dialogBox?.width).toBeLessThan(1024 * 0.95);

  await page.getByRole("button", { name: "Show next image" }).click();
  await expect(page.getByText("2 of 3")).toBeVisible();

  await page.keyboard.press("ArrowRight");
  await expect(page.getByText("3 of 3")).toBeVisible();

  await page.getByRole("button", { name: /Show image 1:/ }).click();
  await expect(page.getByText("1 of 3")).toBeVisible();

  await page.getByRole("button", { name: "Show previous image" }).click();
  await expect(page.getByText("3 of 3")).toBeVisible();
});
