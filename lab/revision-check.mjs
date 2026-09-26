import {chromium} from 'playwright-core';
import fs from 'node:fs/promises';
const out=process.env.QA_OUT||'lab/revision';await fs.mkdir(out,{recursive:true});
const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
const reports=[];
for(const v of [{name:'desktop',width:1440,height:900},{name:'laptop',width:1280,height:720},{name:'tablet',width:768,height:1024},{name:'phone',width:390,height:844},{name:'compact',width:360,height:640},{name:'reduced',width:1440,height:900,reducedMotion:'reduce'}]){
 const c=await b.newContext({viewport:{width:v.width,height:v.height},reducedMotion:v.reducedMotion||'no-preference'});
 await c.addInitScript(()=>{Element.prototype.requestPointerLock=()=>Promise.reject();Element.prototype.setPointerCapture=()=>{};Element.prototype.releasePointerCapture=()=>{};Document.prototype.exitPointerLock=()=>{}});
 const p=await c.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));
 await p.goto(process.env.PORTFOLIO_URL||'http://127.0.0.1:4500/',{waitUntil:'networkidle'});
 await p.screenshot({path:`${out}/${v.name}-hero.png`});
 const measures=[];
 for(let i=0;i<5;i++){
  await p.evaluate(i=>{const work=document.querySelector('#work');const stage=document.querySelector('.collection-stage');window.scrollTo({top:work.offsetTop+i/4*(work.offsetHeight-stage.offsetHeight),behavior:'instant'});},i);
  if(v.reducedMotion) await p.locator('.project-slide').nth(i).scrollIntoViewIfNeeded();
  await p.waitForTimeout(220);
  if(i===0||i===2||i===4)await p.screenshot({path:`${out}/${v.name}-project-${i}.png`});
  measures.push(await p.evaluate(i=>{const slide=document.querySelectorAll('.project-slide')[i],r=slide.getBoundingClientRect(),copy=slide.querySelector('.project-copy').getBoundingClientRect(),vis=slide.querySelector('.project-visual').getBoundingClientRect();return {i,active:document.querySelector('[data-jump][aria-current=true]').dataset.jump,overflow:document.documentElement.scrollWidth>innerWidth+1,slide:{left:r.left,top:r.top,bottom:r.bottom},copyBottom:copy.bottom,imageHeight:vis.height,rail:getComputedStyle(document.querySelector('.project-rail')).transform};},i));
 }
 await p.locator('#languages').scrollIntoViewIfNeeded();await p.waitForTimeout(350);await p.screenshot({path:`${out}/${v.name}-languages.png`});
 reports.push({viewport:v,errors,measures,images:await p.locator('img').evaluateAll(imgs=>imgs.filter(i=>!i.complete||i.naturalWidth===0).map(i=>i.src))});await c.close();
}
await fs.writeFile(`${out}/report.json`,JSON.stringify(reports,null,2));console.log(JSON.stringify(reports,null,2));await b.close();
