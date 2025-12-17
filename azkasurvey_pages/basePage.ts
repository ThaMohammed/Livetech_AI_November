import { Page } from "@playwright/test"

export class basePage{
    page:Page
    constructor(_page:Page){
        this.page=_page
    }
    
    // Click methods
    async ClickOnTheElement(elementLocator:string){
        await this.page.locator(elementLocator).click()
    }
    
    async clickElementByText(text: string) {
        await this.page.getByText(text).click()
    }
    
    async clickElementByRole(role: any, name?: string) {
        if (name) {
            await this.page.getByRole(role, { name }).click()
        } else {
            await this.page.getByRole(role).click()
        }
    }
    
    // Type methods
    async typeText(elementLocator: string, text: string) {
        await this.page.locator(elementLocator).fill(text)
    }
    
    async typeTextByPlaceholder(placeholder: string, text: string) {
        await this.page.getByPlaceholder(placeholder).fill(text)
    }
    
    async typeTextByLabel(label: string, text: string) {
        await this.page.getByLabel(label).fill(text)
    }
    
    // Get text methods
    async getText(elementLocator: string): Promise<string> {
        return await this.page.locator(elementLocator).textContent() || ''
    }
    
    async getTextByRole(role: any, name?: string): Promise<string> {
        if (name) {
            return await this.page.getByRole(role, { name }).textContent() || ''
        } else {
            return await this.page.getByRole(role).textContent() || ''
        }
    }
    
    // Wait methods
    async waitForElement(elementLocator: string, timeout?: number) {
        await this.page.locator(elementLocator).waitFor({ timeout })
    }
    
    async waitForElementToBeVisible(elementLocator: string, timeout?: number) {
        await this.page.locator(elementLocator).waitFor({ state: 'visible', timeout })
    }
    
    async waitForElementToBeHidden(elementLocator: string, timeout?: number) {
        await this.page.locator(elementLocator).waitFor({ state: 'hidden', timeout })
    }
    
    // Navigation methods
    async navigateTo(url: string) {
        await this.page.goto(url)
    }
    
    async goBack() {
        await this.page.goBack()
    }
    
    async goForward() {
        await this.page.goForward()
    }
    
    async reload() {
        await this.page.reload()
    }
    
    // Checkbox and Radio methods
    async checkCheckbox(elementLocator: string) {
        await this.page.locator(elementLocator).check()
    }
    
    async uncheckCheckbox(elementLocator: string) {
        await this.page.locator(elementLocator).uncheck()
    }
    
    async selectRadioButton(elementLocator: string) {
        await this.page.locator(elementLocator).check()
    }
    
    // Select dropdown methods
    async selectOptionByValue(elementLocator: string, value: string) {
        await this.page.locator(elementLocator).selectOption(value)
    }
    
    async selectOptionByLabel(elementLocator: string, label: string) {
        await this.page.locator(elementLocator).selectOption({ label })
    }
    
    async selectOptionByIndex(elementLocator: string, index: number) {
        await this.page.locator(elementLocator).selectOption({ index })
    }
    
    // Hover methods
    async hoverOverElement(elementLocator: string) {
        await this.page.locator(elementLocator).hover()
    }
    
    // Screenshot methods
    async takeScreenshot(path: string) {
        await this.page.screenshot({ path })
    }
    
    async takeScreenshotOfElement(elementLocator: string, path: string) {
        await this.page.locator(elementLocator).screenshot({ path })
    }
    
    // Assertion methods
    async assertElementIsVisible(elementLocator: string) {
        await this.page.locator(elementLocator).waitFor({ state: 'visible' })
    }
    
    async assertElementIsHidden(elementLocator: string) {
        await this.page.locator(elementLocator).waitFor({ state: 'hidden' })
    }
    
    async assertTextEquals(elementLocator: string, expectedText: string) {
        const actualText = await this.getText(elementLocator)
        if (actualText !== expectedText) {
            throw new Error(`Expected text "${expectedText}" but got "${actualText}"`)
        }
    }
    
    async assertElementExists(elementLocator: string) {
        const count = await this.page.locator(elementLocator).count()
        if (count === 0) {
            throw new Error(`Element with locator "${elementLocator}" not found`)
        }
    }
    
    // Keyboard methods
    async pressKey(key: string) {
        await this.page.keyboard.press(key)
    }
    
    async typeKeys(elementLocator: string, keys: string) {
        await this.page.locator(elementLocator).pressSequentially(keys)
    }
    
    // File upload methods
    async uploadFile(elementLocator: string, filePath: string) {
        await this.page.locator(elementLocator).setInputFiles(filePath)
    }
    
    // Multiple file upload
    async uploadMultipleFiles(elementLocator: string, filePaths: string[]) {
        await this.page.locator(elementLocator).setInputFiles(filePaths)
    }
    
    // Get element count
    async getElementCount(elementLocator: string): Promise<number> {
        return await this.page.locator(elementLocator).count()
    }
    
    // Get attribute value
    async getAttribute(elementLocator: string, attribute: string): Promise<string | null> {
        return await this.page.locator(elementLocator).getAttribute(attribute)
    }
    
    // Clear input field
    async clearInput(elementLocator: string) {
        await this.page.locator(elementLocator).clear()
    }
    
    // Wait for page load
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle')
    }
    
    // Get current URL
    async getCurrentUrl(): Promise<string> {
        return this.page.url()
    }
    
    // Get page title
    async getPageTitle(): Promise<string> {
        return await this.page.title()
    }
}