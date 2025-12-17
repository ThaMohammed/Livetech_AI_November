import { Locator, Page } from "@playwright/test";

export class loginPage {
  page: Page;
  username: Locator;
  password: Locator;
  submit: Locator;
  constructor(_page: Page) {
    this.page = _page;
    this.username = this.page.getByPlaceholder("Enter Username");
    this.password = this.page.locator("[name='password']");
    this.submit = this.page.locator("[type='submit']");
  }
  
  async loginToAzkasurvey(email:string,pwd:string) {
    await this.username.fill(email);
    await this.password.fill(pwd);
    await this.submit.click();
  }
}
