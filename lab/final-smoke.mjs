import {chromium} from 'playwright-core';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const browser=await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
try{
 const context=await browser.newContext({viewport:{width:1440,height:900}});
 await context.addInitScript(()=>{Element.prototype.requestPointerLock=()=>Promise.reject();Element.prototype.setPointerCapture=()=>{};Element.prototype.releasePointerCapture=()=>{};Document.prototype.exitPointerLock=()=>{}});
 const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4501');await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(300);
 assert.equal(await page.locator('[role=tab]').count(),5);
 assert.match(await page.locator('.hero-foot').innerText(),/Selected projects/);
 await page.screenshot({path:'lab/final-preview.png'});
 await page.locator('#tab-frontdesk').click();await page.locator('#open-project').click();
 assert.match(await page.locator('.scope-note').innerText(),/Architecture focus/);
 await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').evaluate(d=>d.open),false);
 assert.match(await page.locator('#project-inquiry').getAttribute('href'),/FrontDesk/);
 assert.equal(errors.length,0);
 await page.setViewportSize({width:390,height:844});await page.locator('#contact').scrollIntoViewIfNeeded();
 assert.equal(await page.locator('#contact-title').innerText(),'A good system starts with a conversation.');
 await page.screenshot({path:'lab/final-phone-contact.png'});
 fs.writeFileSync('lab/final-smoke.json',JSON.stringify({packageRoot:'http://127.0.0.1:4501',fiveProjects:true,finalCopy:true,notes:true,contextEmail:true,phoneSpacing:true,errors},null,2));
 console.log('Final package smoke check passed.');
}finally{await browser.close();}
