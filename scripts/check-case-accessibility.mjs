import {chromium} from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
const b=await chromium.launch({headless:true,channel:'msedge'}),c=await b.newContext({viewport:{width:1440,height:1000}}),p=await c.newPage();await p.goto('http://127.0.0.1:4173');await p.getByRole('button',{name:'Proof / Case study'}).nth(1).click();await p.locator('.project-dossier').evaluate(d=>d.scrollTop=0);await p.locator('.project-dossier').screenshot({path:'verification/case-study-header.png'});console.log('axe:',JSON.stringify((await new AxeBuilder({page:p}).analyze()).violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),null,2));await b.close()

