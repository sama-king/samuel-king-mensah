import {chromium} from 'playwright-core';
const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const c=await b.newContext({viewport:{width:1440,height:1050},deviceScaleFactor:1});
await c.addInitScript(()=>{Element.prototype.requestPointerLock=()=>Promise.reject();Element.prototype.setPointerCapture=()=>{};Element.prototype.releasePointerCapture=()=>{};Document.prototype.exitPointerLock=()=>{}});
const p=await c.newPage();await p.goto('https://rabahfoods.com',{waitUntil:'domcontentloaded',timeout:45000});await p.waitForTimeout(2000);await p.getByRole('button',{name:'Enter',exact:true}).click();await p.waitForTimeout(2000);await p.screenshot({path:'lab/rabah-live.png'});await p.mouse.wheel(0,950);await p.waitForTimeout(900);await p.screenshot({path:'lab/rabah-shop-screen.png'});console.log(JSON.stringify({url:p.url(),title:await p.title(),text:(await p.locator('body').innerText()).slice(0,6500)}));await b.close();
