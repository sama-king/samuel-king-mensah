import { chromium } from 'playwright-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const browser = await chromium.launch({headless:true,executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'});
const report={layouts:[],interactions:[],contrast:[],errors:[],failedRequests:[]};
const url=process.env.PORTFOLIO_URL || 'http://127.0.0.1:4500';
const out=process.env.QA_OUT || 'lab/qa';fs.mkdirSync(out,{recursive:true});
async function contextFor(options){
 const context=await browser.newContext(options);
 await context.addInitScript(()=>{
  Element.prototype.requestPointerLock=()=>Promise.reject(new Error('Disabled in visual QA'));
  Element.prototype.setPointerCapture=()=>{};Element.prototype.releasePointerCapture=()=>{};Document.prototype.exitPointerLock=()=>{};
 });
 return context;
}
async function checkContrast(page,name){
 const result=await page.evaluate(()=>{
  const rgb=s=>(s.match(/[\d.]+/g)||[]).map(Number);
  const lum=c=>c.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((v,c,i)=>v+c*[.2126,.7152,.0722][i],0);
  const tested=[];
  for(const el of document.querySelectorAll('body *')){
   if(['SCRIPT','STYLE','NOSCRIPT','OPTION'].includes(el.tagName))continue;
   const direct=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join(' ');if(!direct)continue;
   const r=el.getBoundingClientRect(),s=getComputedStyle(el);if(!r.width||!r.height||r.bottom<0||r.top>innerHeight||s.visibility!=='visible')continue;
   let opacity=1,p=el,bg=null;
   while(p){const ps=getComputedStyle(p);opacity*=Number(ps.opacity);const color=rgb(ps.backgroundColor);if(!bg&&(color[3]===undefined||color[3]>.98))bg=color;p=p.parentElement;}
   if(opacity<.97||!bg)continue;
   const fg=rgb(s.color),a=lum(fg),b=lum(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);
   const threshold=parseFloat(s.fontSize)>=24||(parseFloat(s.fontSize)>=18.66&&Number(s.fontWeight)>=700)?3:4.5;
   tested.push({text:direct.slice(0,65),ratio:+ratio.toFixed(2),threshold});
  }
  return {count:tested.length,minimum:Math.min(...tested.map(x=>x.ratio)),failures:tested.filter(x=>x.ratio+.01<x.threshold)};
 });
 report.contrast.push({name,...result});assert.equal(result.failures.length,0,`${name}: text contrast failures ${JSON.stringify(result.failures)}`);
}
try {
 for(const [name,width,height,reducedMotion] of [['desktop',1440,900,'no-preference'],['laptop',1280,720,'no-preference'],['tablet',768,1024,'no-preference'],['phone',390,844,'no-preference'],['compact',360,640,'no-preference'],['reduced',1440,900,'reduce']]){
  const context=await contextFor({viewport:{width,height},deviceScaleFactor:1,reducedMotion});const page=await context.newPage();
  page.on('pageerror',e=>report.errors.push(`${name}: ${e.message}`));
  page.on('requestfailed',r=>report.failedRequests.push(`${name}: ${r.url()}`));
  await page.goto(url);await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(450);
  await page.screenshot({path:`${out}/${name}-hero.png`});
  await checkContrast(page,`${name}-hero`);
  const layout=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.body.scrollHeight,brokenImages:[...document.images].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src)}));
  report.layouts.push({name,...layout});assert(layout.scrollWidth<=width,`${name}: horizontal overflow`);assert.equal(layout.brokenImages.length,0);
  for(const section of ['work','about','contact']){
   await page.evaluate(id=>{const y=document.getElementById(id).getBoundingClientRect().top+scrollY;window.scrollTo({top:y,behavior:'instant'})},section);
   await page.waitForTimeout(450);await page.screenshot({path:`${out}/${name}-${section}.png`});
   await checkContrast(page,`${name}-${section}`);
  }
  if(name==='desktop'){
   await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
   await page.mouse.move(200,200);await page.screenshot({path:`${out}/pointer-left.png`});
   await page.mouse.move(1320,300);await page.screenshot({path:`${out}/pointer-right.png`});
   await page.evaluate(()=>window.scrollTo({top:document.getElementById('work').offsetTop+450,behavior:'instant'}));await page.waitForTimeout(350);
   await page.screenshot({path:`${out}/desktop-work-middle.png`});
   for(const key of ['security','rabah','lumos','employed','frontdesk']){
    await page.locator(`[data-project="${key}"]`).click();
    assert.equal(await page.locator(`[data-project="${key}"]`).getAttribute('aria-selected'),'true');
    for(let i=0;i<4;i++){await page.locator(`[data-node="${i}"]`).click();assert.equal(await page.locator(`[data-node="${i}"]`).getAttribute('aria-pressed'),'true');}
    await page.locator('#open-project').click();assert(await page.locator('dialog').evaluate(d=>d.open));
    const heading=await page.locator('#dialog-title').textContent();assert(heading.length>0);
    await page.screenshot({path:`${out}/notes-${key}.png`});
    await page.keyboard.press('Escape');assert.equal(await page.locator('dialog').evaluate(d=>d.open),false);
    assert.equal(await page.evaluate(()=>document.activeElement.id),'open-project');
    report.interactions.push(`${key}: selection, four stage controls, notes, Escape, focus restored`);
   }
   await page.locator('#tab-security').focus();await page.keyboard.press('ArrowDown');assert.equal(await page.evaluate(()=>document.activeElement.id),'tab-rabah');
   await page.keyboard.press('End');assert.equal(await page.evaluate(()=>document.activeElement.id),'tab-frontdesk');
   await page.locator('#inquiry-project').selectOption('lumos');assert.match(await page.locator('#project-inquiry').getAttribute('href'),/LumosCast/);
   report.interactions.push('Keyboard project navigation and email subject carry-over passed');
  }
  if(name==='phone'){
   await page.locator('#tab-frontdesk').focus();await page.keyboard.press('Home');
   assert.equal(await page.evaluate(()=>document.activeElement.id),'tab-security');
   await page.keyboard.press('End');assert.equal(await page.evaluate(()=>document.activeElement.id),'tab-frontdesk');
   const box=await page.locator('#tab-frontdesk').boundingBox();assert(box.x>=0&&box.x+box.width<=width+1);
   report.interactions.push('Phone keyboard navigation brings project tabs into view');
   await page.screenshot({path:`${out}/phone-full.png`,fullPage:true});
  }
  await context.close();
 }
 const noJs=await contextFor({javaScriptEnabled:false,viewport:{width:390,height:844}});const page=await noJs.newPage();await page.goto(url);
 assert.match(await page.locator('main noscript').innerText(),/FrontDesk/);
 assert.match(await page.locator('.contact-email').getAttribute('href'),/^mailto:/);
 await page.screenshot({path:`${out}/no-javascript.png`,fullPage:true});
 report.interactions.push('No-JavaScript fallback lists all projects and keeps contact links usable');await noJs.close();
 assert.equal(report.errors.length,0);assert.equal(report.failedRequests.length,0);
 console.log(JSON.stringify(report,null,2));
} finally {fs.writeFileSync(`${out}/report.json`,JSON.stringify(report,null,2));await browser.close();}
