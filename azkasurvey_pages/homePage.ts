import { expect, Page } from "@playwright/test";

export class homePage {
  page: Page;
  constructor(_page: Page) {
    this.page = _page;
  }
  async verifyLogOut() {
    await expect(this.page.locator("#logoutBtn")).toBeVisible();
  }
  get name() {
    return this.page.locator("#name");
  }
  async enterPersonalDetails() {
    await this.name.fill("LiveTech");
    await this.page.locator("[name='state']").selectOption("Delhi");
    await this.page.locator("//input[@value='male']").click();
    await this.page.getByPlaceholder("Please Enter Address").fill("Hyderabad");
    await this.page.getByPlaceholder("Please Enter Phone").fill("9666244444");
    await this.page.getByPlaceholder("Please Enter Town").fill("Mehdipatnam");
    await this.page.locator("#next_button").click();
  }
  async logout() {
    await this.page.locator("#logoutBtn").click();
  }
  async getAllTextboxes() {
    let names: string[] = [];
      let elements = await this.page.$$("//input[@type='text']");
    //  let elements = await this.page.locator("//input[@type='text']").all()
    for (let element of elements) {
      let name = await element.getAttribute("name");
      console.log(name);
      if (name) {
        names.push(name.toString());
      }
    }
    await expect(names).toContain("phone");
  }
}
