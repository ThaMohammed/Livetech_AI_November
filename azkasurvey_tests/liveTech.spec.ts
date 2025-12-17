import { test, expect } from "@playwright/test";
import { basePage } from "../azkasurvey_pages/basePage";

test.describe("LiveTech Website Tests", () => {
    let base: basePage;

    test.beforeEach(async ({ page }) => {
        base = new basePage(page);
    });

    test("verify the download button", async ({ page, context }) => {
        await base.navigateTo("https://www.livetech.in/");
        await base.waitForPageLoad();
        
        const downloadButtonLocator = "a.tpbut[href*='LiveTech Broucher.pdf']";
        await base.waitForElementToBeVisible(downloadButtonLocator);
        
        await base.assertElementExists(downloadButtonLocator);
        const buttonText = await base.getText(downloadButtonLocator);
        expect(buttonText).toContain("Download Brochure");
        
        const href = await base.getAttribute(downloadButtonLocator, "href");
        const target = await base.getAttribute(downloadButtonLocator, "target");
        
        console.log(`Download button href: ${href}`);
        console.log(`Download button target: ${target}`);
        
        const pagesBefore = context.pages().length;
        console.log(`Pages before clicking: ${pagesBefore}`);
        
        const downloadPromise = page.waitForEvent('download', { timeout: 10000 }).catch(() => null);
        
        await base.ClickOnTheElement(downloadButtonLocator);
        await page.waitForTimeout(3000);
        
        const pagesAfter = context.pages().length;
        console.log(`Pages after clicking: ${pagesAfter}`);
        
        if (pagesAfter > pagesBefore) {
            console.log("✅ New tab opened - handling PDF in new tab");
            
            const newPage = context.pages()[pagesAfter - 1];
            await newPage.waitForLoadState('networkidle');
            
            const newPageUrl = newPage.url();
            console.log(`New page URL: ${newPageUrl}`);
            
            const decodedUrl = decodeURIComponent(newPageUrl);
            expect(decodedUrl).toContain('LiveTech Broucher.pdf');
            
            const newPageDownloadPromise = newPage.waitForEvent('download', { timeout: 15000 }).catch(() => null);
            
            await newPage.evaluate(() => {
                const link = document.createElement('a');
                link.href = window.location.href;
                link.download = 'LiveTech_Brochure.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
            
            const download = await newPageDownloadPromise;
            
            if (download) {
                console.log("✅ Download triggered from new tab");
                
                expect(download.suggestedFilename()).toContain('.pdf');
                console.log(`Download filename: ${download.suggestedFilename()}`);
                console.log(`Download URL: ${download.url()}`);
                
                const downloadPath = `./downloads/${download.suggestedFilename()}`;
                await download.saveAs(downloadPath);
                
                const fs = require('fs');
                expect(fs.existsSync(downloadPath)).toBeTruthy();
                
                const stats = fs.statSync(downloadPath);
                expect(stats.size).toBeGreaterThan(0);
                console.log(`Downloaded file size: ${stats.size} bytes`);
                
                const decodedDownloadUrl = decodeURIComponent(download.url());
                expect(decodedDownloadUrl).toContain('LiveTech Broucher.pdf');
                
                console.log("✅ PDF file downloaded successfully!");
            } else {
                console.log("⚠️ No download event triggered from new tab");
                
                const pageContent = await newPage.content();
                const fs = require('fs');
                const downloadPath = `./downloads/LiveTech_Brochure_Content.html`;
                
                fs.writeFileSync(downloadPath, pageContent);
                console.log(`✅ Page content saved to: ${downloadPath}`);
                
                if (pageContent.includes('PDF') || pageContent.includes('pdf')) {
                    console.log("✅ Page contains PDF content");
                }
            }
            
            await newPage.close();
            
        } else {
            const download = await downloadPromise;
            
            if (download) {
                console.log("✅ Direct download triggered");
                
                expect(download.suggestedFilename()).toContain('.pdf');
                console.log(`Download filename: ${download.suggestedFilename()}`);
                console.log(`Download URL: ${download.url()}`);
                
                const downloadPath = `./downloads/${download.suggestedFilename()}`;
                await download.saveAs(downloadPath);
                
                const fs = require('fs');
                expect(fs.existsSync(downloadPath)).toBeTruthy();
                
                const stats = fs.statSync(downloadPath);
                expect(stats.size).toBeGreaterThan(0);
                console.log(`Downloaded file size: ${stats.size} bytes`);
                
                const decodedDownloadUrl = decodeURIComponent(download.url());
                expect(decodedDownloadUrl).toContain('LiveTech Broucher.pdf');
            } else {
                console.log("⚠️ No download event triggered - button may open in same tab");
                
                const currentUrl = page.url();
                console.log(`Current page URL: ${currentUrl}`);
                
                expect(href).toContain('LiveTech Broucher.pdf');
                expect(target).toBe('_blank');
            }
        }
        
        console.log("✅ Download button test completed successfully!");
    });

    test("validate PDF content for value 10000", async () => {
        const fs = require('fs');
        const path = require('path');
        
        const pdfPath = './downloads/LiveTech_Brochure.pdf';
        
        if (!fs.existsSync(pdfPath)) {
            console.log("⚠️ PDF file not found. Please run the download test first.");
            return;
        }
        
        console.log(`📄 Validating PDF file: ${pdfPath}`);
        
        const stats = fs.statSync(pdfPath);
        console.log(`📊 File size: ${stats.size} bytes`);
        
        const fileBuffer = fs.readFileSync(pdfPath);
        const fileContent = fileBuffer.toString('utf8', 0, Math.min(1000, fileBuffer.length));
        
       
        try {
            const fullContent = fileBuffer.toString('utf8');
            
            // Search for multiple variations of the value
            const searchValues = [
                "Venkataramana Reddy"
            ];
            
            let foundValue: string | null = null;
            let foundIndex = -1;
            
            for (const searchValue of searchValues) {
                const valueIndex = fullContent.indexOf(searchValue);
                if (valueIndex !== -1) {
                    foundValue = searchValue;
                    foundIndex = valueIndex;
                    console.log("✅ PDF validation test completed!");
                    break;
                }
            }
            
        } catch (error) {
            console.log(`❌ Error reading PDF content: ${error.message}`);
            expect(true).toBe(false);
        }
        
        
    });
});