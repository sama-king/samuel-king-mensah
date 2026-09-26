import {chromium} from 'playwright-core';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const report={contrast:[]};
async function checkContrast(page,name){
 const result=await page.evaluate(()=>{
  const rgb=s=>(s.match(/[\d.]+/g)||[]).map(Number);
  const lum=c=>c.slice(0,3).map(v=>{v/=255;return v<=.04045?v/12.92:((v+.055)/1.055)**2.4}).reduce((v,c,i)=>v+c*[.2126,.7152,.0722][i],0);
  const tested=[];
  for(const el of document.querySelectorAll('body *')){
   if(['SCRIPT','STYLE','NOSCRIPT','OPTION'].includes(el.tagName))continue;
   const direct=[...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.trim()).join(' ');if(!direct)continue;
   const r=el.getBoundingClientRect(),s=getComputedStyle(el);if(!r.width||!r.height||r.bottom<0||r.top>innerHeight||r.right<0||r.left>innerWidth||s.visibility!=='visible')continue;
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
const b=await chromium.launch({executablePath:'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',headless:true});
for(const width of [1440,390]){
const c=await b.newContext({viewport:{width,height:900}});await c.addInitScript(()=>{Element.prototype.requestPointerLock=()=>Promise.reject();Element.prototype.setPointerCapture=()=>{};Element.prototype.releasePointerCapture=()=>{};Document.prototype.exitPointerLock=()=>{}});
const p=await c.newPage();await p.goto(process.env.PORTFOLIO_URL||'http://127.0.0.1:4501/');
for(const id of ['top','work','languages','about','contact']){await p.evaluate(id=>window.scrollTo({top:document.getElementById(id).offsetTop,behavior:'instant'}),id);await p.waitForTimeout(250);await checkContrast(p,`${width}-${id}`)}
await c.close();}
console.log(report);fs.writeFileSync('lab/revision/contrast.json',JSON.stringify(report,null,2));await b.close();
