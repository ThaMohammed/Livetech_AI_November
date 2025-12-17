import {test} from "@playwright/test"
import { uiHelpers } from "../azkasurvey_core/uiHelpers"

test('verify the frames in the application',async({page})=>{
    let uiHelper=new uiHelpers(page)
    await uiHelper.navigateToUrl("http://localhost/QATesting/index.html")
    let personalDetails=page.frameLocator("#personalFrame")
    await personalDetails.locator("[name='name']").fill('LiveTech')
    let professionalDetails=page.frameLocator("#professionalFrame")
    await professionalDetails.locator("[name='jobTitle']").fill("QA engineer")
    await personalDetails.locator("[name='email']").fill("LiveTech@hyd.com")
    await page.waitForTimeout(3000)
})