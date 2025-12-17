import { Page, test } from "@playwright/test";
import { uiHelpers } from "../azkasurvey_core/uiHelpers";

let _page: Page;
test("verify the mouse hover operation", async ({ page }) => {
  _page = page;
  let uiHelper = new uiHelpers(page);
  await uiHelper.navigateToUrl("http://www.testingdevnets.com/");
  await _page.waitForTimeout(1000);
  await page.locator("(//a[contains(text(),'Courses')])[1]").hover();
  await _page.waitForTimeout(1000);
  await page.locator("(//a[text()='Development'])[1]").hover();
  await _page.waitForTimeout(1000);
  let cLanguage = page.locator("(//a[text()='C Language'])[1]");
  await cLanguage.hover();
  await cLanguage.click();
});
test("verify keyboard operations", async ({ page }) => {
  _page = page;
  let uiHelper = new uiHelpers(page);
  await uiHelper.navigateToUrl("http://www.testingdevnets.com/");
  await _page.waitForTimeout(1000);
  await page.locator("//button[@class='Reg-button']").click();
  await _page.waitForTimeout(1000);
  await page.locator("//input[@type='name']").click();
  await _page.waitForTimeout(1000);
  await page.keyboard.type("Hello how are you, how do you do");
  await _page.waitForTimeout(1000);
  await page.keyboard.press("Control+A");
  await _page.waitForTimeout(1000);
  await page.keyboard.press("Backspace");
  await _page.waitForTimeout(1000);

  let file = page.locator("");
  let droplocation = page.locator("");
  await file.dragTo(droplocation);
});
test.afterEach("clean test", async () => {
  await _page.waitForTimeout(2000);
});
