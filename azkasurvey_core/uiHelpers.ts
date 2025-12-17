import { Page } from "@playwright/test";

export class uiHelpers{
    page:Page
    constructor(_page:Page){
        this.page=_page
    }
    async navigateToUrl(url:string){
        await this.page.goto(url);
    }
}