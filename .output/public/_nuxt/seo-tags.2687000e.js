import{d as a,f as m,r as y,o as _,c as h,b as s,w as c,a as b,t as u,u as d,F as v,e as g}from"./entry.d5ea619f.js";const B=r=>Object.fromEntries(Object.entries(r).filter(([,t])=>t!==void 0)),p=(r,t)=>(n,e)=>(m(()=>r({...B(n),...e.attrs},e)),()=>{var i,o;return t?(o=(i=e.slots).default)==null?void 0:o.call(i):null}),S={accesskey:String,autocapitalize:String,autofocus:{type:Boolean,default:void 0},class:[String,Object,Array],contenteditable:{type:Boolean,default:void 0},contextmenu:String,dir:String,draggable:{type:Boolean,default:void 0},enterkeyhint:String,exportparts:String,hidden:{type:Boolean,default:void 0},id:String,inputmode:String,is:String,itemid:String,itemprop:String,itemref:String,itemscope:String,itemtype:String,lang:String,nonce:String,part:String,slot:String,spellcheck:{type:Boolean,default:void 0},style:String,tabindex:String,title:String,translate:String},x=a({name:"Title",inheritAttrs:!1,setup:p((r,{slots:t})=>{var n,e,i;return{title:((i=(e=(n=t.default)==null?void 0:n.call(t))==null?void 0:e[0])==null?void 0:i.children)||null}})}),E=a({name:"Meta",inheritAttrs:!1,props:{...S,charset:String,content:String,httpEquiv:String,name:String,body:Boolean,renderPriority:[String,Number]},setup:p(r=>{const t={...r};return t.httpEquiv&&(t["http-equiv"]=t.httpEquiv,delete t.httpEquiv),{meta:[t]}})}),k=a({name:"Style",inheritAttrs:!1,props:{...S,type:String,media:String,nonce:String,title:String,scoped:{type:Boolean,default:void 0},body:Boolean,renderPriority:[String,Number]},setup:p((r,{slots:t})=>{var i,o,l;const n={...r},e=(l=(o=(i=t.default)==null?void 0:i.call(t))==null?void 0:o[0])==null?void 0:l.children;return e&&(n.children=e),{style:[n]}})}),q=a({name:"Head",inheritAttrs:!1,setup:(r,t)=>()=>{var n,e;return(e=(n=t.slots).default)==null?void 0:e.call(n)}}),N=a({__name:"seo-tags",setup(r){const t=y("SEO теги");return(n,e)=>{const i=x,o=E,l=k,f=q;return _(),h(v,null,[s(f,null,{default:c(()=>[s(i,null,{default:c(()=>[g(u(d(t)),1)]),_:1}),s(o,{name:"description",content:d(t)},null,8,["content"]),s(l,{type:"text/css"},{default:c(()=>[g(`
            body {
                background: #eeeeee;
            }
        `)]),_:1})]),_:1}),b("h1",null,u(d(t)),1)],64)}}});export{N as default};
