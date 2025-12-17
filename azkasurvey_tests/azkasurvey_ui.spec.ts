import { chromium, expect, firefox, Page, test } from "@playwright/test";
import { uiHelpers } from "../azkasurvey_core/uiHelpers";
import { loginPage } from "../azkasurvey_pages/loginPage";
import { homePage } from "../azkasurvey_pages/homePage";
import { dashboardPage } from "../azkasurvey_pages/dashboardPage";
import fs from "fs";
import mysql from "mysql2/promise";

function getFormattedDateTime(): string {
  const now = new Date();
  const pad = (num: number) => num.toString().padStart(2, "0");
  const month = pad(now.getMonth() + 1); // Months are zero-based
  const day = pad(now.getDate());
  const year = now.getFullYear().toString();
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  return `${month}${day}${year}${hours}${minutes}${seconds}`;
}

test.describe("verify form filling functionality", () => {
  let _page: Page;
  let azkaData;
  let azkasurvey_env;
  let env = "qa";
  test.beforeAll("setup for describe", async () => {
    let azkaFile = fs.readFileSync(`./testdata/azkasurvey.json`, "utf-8");
    azkaData = await JSON.parse(azkaFile);
    azkasurvey_env = azkaData;
  });
  test.beforeEach("start test", async () => {
    let browser = await chromium.launch({ headless: true });
    let context = await browser.newContext({
      recordVideo: { dir: "video/" },
    });
    _page = await context.newPage();
    let uiHelper = new uiHelpers(_page);
    await uiHelper.navigateToUrl(azkasurvey_env.url);
    await _page.waitForLoadState("load", { timeout: 100 });
    let login = new loginPage(_page);
    await login.loginToAzkasurvey(
      azkasurvey_env.email,
      azkasurvey_env.password
    );
  });
  test.afterEach("clean up test", async () => {
    await _page.screenshot({
      fullPage: true,
      path: `./screenshots/screenshot_${getFormattedDateTime()}.jpg`,
    });
    await _page.waitForTimeout(3000);
  });
  test("Verify that user can login to azkasurvey", async () => {
    let home = new homePage(_page);
    await home.verifyLogOut();
  });
  test("verify that user can enter the personal details", async () => {
    let home = new homePage(_page);
    await home.enterPersonalDetails();
  });
  test("verify the list of elements", async () => {
    let home = new homePage(_page);
    await home.getAllTextboxes();
  });
  test("verify the text scenarios", async () => {
    let dashboard = new dashboardPage(_page);
    let contextText = await dashboard.uploadJsonButton.textContent();
    console.log(contextText);
    let innerText = await dashboard.uploadJsonButton.innerText();
    console.log(innerText);
    let home = new homePage(_page);
    let cText = await home.name.textContent();
    console.log(cText);
    let iText = await home.name.innerText();
    console.log(iText);
  });
  test("verify the file upload and verify the record in Dashboard", async () => {
    let dashboard = new dashboardPage(_page);
    await dashboard.uploadFile();
    await dashboard.verifyTheRecord();
  });
});
test.describe("dahboard functioanlity", () => {
  let page: Page;
  test.beforeEach("start test", async () => {
    let browser = await firefox.launch({ headless: true });
    page = await browser.newPage();
    let uiHelper = new uiHelpers(page);
    // await uiHelper.navigateToUrl();
    // let login = new loginPage(page);
    // await login.loginToAzkasurvey();
  });
  test("verify that user can see the existing records", async () => {
    await page.getByRole("link", { name: "Dashboard" }).click();
    await expect
      .soft(page.getByRole("link", { name: "Viewer" }).nth(0))
      .toBeVisible();
    console.log("the test is executed");
  });
  test("verify that user can see the existing records_custom", async () => {
    await page.getByRole("link", { name: "Dashboard" }).click();
    try {
      await expect(
        page.getByRole("link", { name: "Viewer" }).nth(0)
      ).toBeVisible();
    } catch {}
    console.log("the test is executed");
  });
  test("verify that user can see the existing records_custom1", async () => {
    await page.getByRole("link", { name: "Dashboard" }).click();
    try {
      await expect(
        page.getByRole("link", { name: "Viewer" }).nth(0)
      ).toBeVisible();
    } catch {
      console.log("view button is not visible");
    }
    console.log("the test is executed");
  });
  test("verify that user can see the existing records_custom2", async () => {
    await page.getByRole("link", { name: "Dashboard" }).click();
    try {
      await expect(
        page.getByRole("link", { name: "Viewer" }).nth(0)
      ).toBeVisible();
    } catch {
      throw new Error("view button is not visible");
    }
    console.log("the test is executed");
  });
  test("verify that user can view the existing record", async () => {
    let dashboard = new dashboardPage(page);
    await dashboard.verifyTheExsitingRecord();
    let home = new homePage(page);
    await home.logout();
    await page.waitForTimeout(3000);
  });
});

test.describe("verify form filling functionality using Database", () => {
  let _page: Page;
  let azkaData;
  let azkasurvey_env;
  let env = "qa";
  let dbOutput;

  test.beforeAll("setup for describe", async () => {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Root@123",
      database: "qa_chronicles",
    });
    const [rows] = await db.execute(
      "select * from azka_data"
    );
    // dbOutput = rows[0];
    let dbRows = rows as any[];
    for (let i = 0; i < dbRows.length; i++) {
      let name = rows[i].name;
      if (name == "test_user") {
        dbOutput = rows[i];
        break;
      }
    }
  });
  test.beforeEach("start test", async () => {
    let browser = await chromium.launch({ headless: true });
    let context = await browser.newContext({
      recordVideo: { dir: "video/" },
    });
    _page = await context.newPage();
    let uiHelper = new uiHelpers(_page);
    //row.column    ->dbOutput.columnName
    await uiHelper.navigateToUrl(dbOutput.url);
    await _page.waitForLoadState("load", { timeout: 100 });
    let login = new loginPage(_page);
    await login.loginToAzkasurvey(dbOutput.email, dbOutput.password);
  });
  test.afterEach("clean up test", async () => {
    await _page.screenshot({
      fullPage: true,
      path: `./screenshots/screenshot_${getFormattedDateTime()}.jpg`,
    });
    await _page.waitForTimeout(3000);
  });
  test("Verify that user can login to azkasurvey with DB", async () => {
    let home = new homePage(_page);
    await home.verifyLogOut();
  });
});

/*
Shift+Alt+F
Given I launch the browser and enter valid url
And I can login to azkasurvey with valid credentials
And I click on Dashboard button
Then I can see the list of saved records
*/

//expect(actual value).expected value
//expect(expected value).actual value
//Username: test@azkasurvey.com, Password: kAYd3sjx
//I am working on story#1234

//Identify using attribute and attribute value      ->  [attribute='attributeValue']
/*
test('test case title',async({page})=>{
    code logic
})
*/
/*
title: Verify that user can login to azkasurvey

Given I launch the browser and enter valid url
And I enter valid credentials
When I clicked on Login button
Then I can see the Home Page
*/
