import { Page, expect } from "@playwright/test";
import { basePage } from "./basePage";

export class dashboardPage extends basePage {
  page: Page;
  constructor(_page: Page) {
    super(_page);
    this.page = _page;
  }
  /*
  get elementName(){
  return elementIdentification;
  }
  */
  get dashboardButton() {
    return this.page.getByRole("link", { name: "Dashboard" });
  }
  get viewButtons() {
    return this.page.getByRole("link", { name: "View" });
  }
  get backButton() {
    return this.page.getByRole("link", { name: "Back" });
  }
  get uploadJsonButton() {
    return this.page.locator("#openModalButton");
  }
  get chooseFile() {
    return this.page.locator("#jsonFileInput");
  }
  get uploadButton() {
    return this.page.locator("#uploadButton");
  }
  get acceptButton() {
    return this.page.getByRole("button", { name: "OK" });
  }

  async verifyViewButton() {
    // await this.page.getByRole("link", { name: "Dashboard" }).click();
    await this.dashboardButton.click();
    await expect(this.viewButtons.nth(0)).toBeVisible();
  }

  private tableRows_xpath: string =
    "//tr[@class='Mutual Fund']/parent::tbody/tr";
  private mutulaFund_css: string = "tr.Mutual";

  async verifyTheExsitingRecord() {
    await this.dashboardButton.click();
    await this.viewButtons.nth(2).click();
    await this.backButton.scrollIntoViewIfNeeded();
    await this.backButton.highlight();
    await this.page.waitForTimeout(3000);
    await this.backButton.click();
    await this.page.waitForTimeout(1000);

    await this.ClickOnTheElement(this.mutulaFund_css);

    let row = this.page.locator(this.mutulaFund_css);
    let mutualFundValue = await row.locator("td:nth-child(3)").textContent();
    this.page.locator(this.tableRows_xpath);
  }
  async uploadFile() {
    await this.page.waitForTimeout(1000);
    await this.uploadJsonButton.click({ timeout: 3000 });
    await this.page.waitForTimeout(1000);
    await this.chooseFile.setInputFiles("D:\\AzkaSurveyData.json", {
      timeout: 3000,
    });
    await this.page.waitForTimeout(2000);
    await this.uploadButton.click({ timeout: 3000 });
    await this.page.waitForTimeout(1000);
    await this.acceptButton.click({ timeout: 3000 });
    await this.page.waitForTimeout(1000);
    this.page.locator("button.btn-close").click();
  }
  async verifyTheRecord() {
    this.dashboardButton.click()
    await this.page.waitForLoadState("load")
    let records = await this.page.$$("//tr//td[2]");
    for (let record of records) {
      let recordName = await record.textContent();
      console.log(recordName)
      if (recordName == "LiveTech0842") {
        console.log("record Identified");
        break;
      }
    }
  }
}
