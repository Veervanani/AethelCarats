import{r as c,j as e,X as Xe,k as Ee,l as Ie,aQ as Mt,aR as wt,ax as Bt,R as Ne,x as _e,ag as Ft,ao as Wt,u as _t,e as K,g as Ge,C as pt,H as Gt,M as xt,P as ft,aS as Ut,v as Ue,w as Ye,aN as Je,c as Yt,a as Jt}from"./react-vendor-BSubOYpr.js";import{g as o}from"./ui-vendor-C-kywwZi.js";import{S as gt,a as X,R as qe,u as Ht,b as Vt,c as Kt}from"./admin-pages-BV0BYq0y.js";import{P as vt}from"./ProductCard-DLHXbmAe.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const qt=o.div`
  position: fixed;
  inset: 0;
  background: rgba(10, 9, 8, 0.95);
  backdrop-filter: blur(8px);
  z-index: 99999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  user-select: none;
  overflow: hidden;
`,Xt=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
`,Zt=o.div`
  color: #fffdf9;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  letter-spacing: 0.05em;
`,Qt=o.button`
  background: rgba(255, 253, 249, 0.15);
  border: 1px solid rgba(255, 253, 249, 0.2);
  color: #fffdf9;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c9a45c;
    color: #1a1918;
    border-color: #c9a45c;
  }
`,ei=o.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
`,ti=o.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({$isDragging:n})=>n?"grabbing":"grab"};
  transition: ${({$isDragging:n})=>n?"none":"transform 0.15s ease-out"};
  max-width: 90vw;
  max-height: 75vh;

  img {
    max-width: 85vw;
    max-height: 70vh;
    object-fit: contain;
    pointer-events: none;
    user-select: none;
  }
`,ut=o.button`
  position: absolute;
  top: 50%;
  ${({$direction:n})=>n==="left"?"left: 20px;":"right: 20px;"}
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(26, 25, 24, 0.7);
  border: 1px solid rgba(201, 164, 92, 0.4);
  color: #fffdf9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  transition: all 0.2s ease;

  &:hover {
    background: #c9a45c;
    color: #1a1918;
    border-color: #c9a45c;
  }

  @media (max-width: 767px) {
    width: 38px;
    height: 38px;
    ${({$direction:n})=>n==="left"?"left: 8px;":"right: 8px;"}
  }
`,ii=o.div`
  position: absolute;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(26, 25, 24, 0.85);
  border: 1px solid rgba(201, 164, 92, 0.3);
  border-radius: 30px;
  padding: 6px 16px;
  z-index: 20;
  backdrop-filter: blur(4px);
`,He=o.button`
  background: none;
  border: none;
  color: #fffdf9;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 4px;
  transition: color 0.2s ease;

  &:hover {
    color: #c9a45c;
  }
`,ni=o.span`
  color: #c9a45c;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 48px;
  text-anchor: middle;
  text-align: center;
`,ri=o.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  overflow-x: auto;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  z-index: 10;
  -webkit-overflow-scrolling: touch;
`,oi=o.button`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 4px;
  border: ${({$active:n})=>n?"2px solid #C9A45C":"1px solid rgba(255, 253, 249, 0.2)"};
  opacity: ${({$active:n})=>n?1:.6};
  transform: ${({$active:n})=>n?"scale(1.05)":"scale(1)"};
  transition: all 0.2s ease;
  cursor: pointer;
  padding: 0;
  overflow: hidden;
  background: #1a1918;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:hover {
    opacity: 1;
    border-color: #c9a45c;
  }
`,si=({images:n,activeIndex:x,productName:t,isOpen:y,onClose:S,onSelectIndex:j})=>{const[w,m]=c.useState(1),[v,u]=c.useState({x:0,y:0}),[l,k]=c.useState(!1),[A,T]=c.useState({x:0,y:0}),[f,L]=c.useState(null),[D,I]=c.useState(0),H=c.useRef(null);if(c.useEffect(()=>{m(1),u({x:0,y:0})},[x,y]),c.useEffect(()=>{const p=C=>{C.key==="Escape"&&y&&S()};return window.addEventListener("keydown",p),()=>window.removeEventListener("keydown",p)},[y,S]),!y||n.length===0)return null;const re=n[x]||n[0],d=()=>{m(p=>Math.min(p+.5,3.5))},g=()=>{m(p=>{const C=Math.max(p-.5,1);return C===1&&u({x:0,y:0}),C})},B=()=>{m(1),u({x:0,y:0})},N=p=>{p==null||p.stopPropagation(),B(),j(x===0?n.length-1:x-1)},Z=p=>{p==null||p.stopPropagation(),B(),j(x===n.length-1?0:x+1)},$e=p=>{p.preventDefault(),p.deltaY<0?m(C=>Math.min(C+.25,3.5)):m(C=>{const F=Math.max(C-.25,1);return F===1&&u({x:0,y:0}),F})},Q=p=>{w<=1||(k(!0),T({x:p.clientX-v.x,y:p.clientY-v.y}))},xe=p=>{if(!l||w<=1)return;const C=p.clientX-A.x,F=p.clientY-A.y,_=(w-1)*300,ee=Math.max(-_,Math.min(_,C)),Pe=Math.max(-_,Math.min(_,F));u({x:ee,y:Pe})},Re=()=>{k(!1)},fe=p=>{if(p.touches.length===2){const F=Math.hypot(p.touches[0].clientX-p.touches[1].clientX,p.touches[0].clientY-p.touches[1].clientY);L(F);return}const C=Date.now();C-D<300&&(w>1?B():m(2)),I(C),w>1&&p.touches.length===1&&(k(!0),T({x:p.touches[0].clientX-v.x,y:p.touches[0].clientY-v.y}))},Le=p=>{if(p.touches.length===2&&f!==null){const C=Math.hypot(p.touches[0].clientX-p.touches[1].clientX,p.touches[0].clientY-p.touches[1].clientY),F=C-f;Math.abs(F)>4&&(m(_=>{const ee=Math.min(Math.max(_+(F>0?.08:-.08),1),3.5);return ee===1&&u({x:0,y:0}),ee}),L(C));return}if(l&&w>1&&p.touches.length===1){const C=p.touches[0].clientX-A.x,F=p.touches[0].clientY-A.y,_=(w-1)*300;u({x:Math.max(-_,Math.min(_,C)),y:Math.max(-_,Math.min(_,F))})}},W=()=>{k(!1),L(null)};return e.jsxs(qt,{onClick:S,children:[e.jsxs(Xt,{onClick:p=>p.stopPropagation(),children:[e.jsx(Zt,{children:t}),e.jsx(Qt,{onClick:S,"aria-label":"Close Lightbox",children:e.jsx(Xe,{size:20})})]}),e.jsxs(ei,{ref:H,onWheel:$e,onMouseDown:Q,onMouseMove:xe,onMouseUp:Re,onTouchStart:fe,onTouchMove:Le,onTouchEnd:W,onClick:p=>p.stopPropagation(),children:[e.jsx(ti,{$isDragging:l,style:{transform:`translate3d(${v.x}px, ${v.y}px, 0) scale(${w})`},children:e.jsx(gt,{src:re,alt:t})}),n.length>1&&e.jsxs(e.Fragment,{children:[e.jsx(ut,{$direction:"left",onClick:N,"aria-label":"Previous Image",children:e.jsx(Ee,{size:24})}),e.jsx(ut,{$direction:"right",onClick:Z,"aria-label":"Next Image",children:e.jsx(Ie,{size:24})})]}),e.jsxs(ii,{onClick:p=>p.stopPropagation(),children:[e.jsx(He,{onClick:g,disabled:w<=1,title:"Zoom Out",children:e.jsx(Mt,{size:18})}),e.jsxs(ni,{children:[Math.round(w*100),"%"]}),e.jsx(He,{onClick:d,disabled:w>=3.5,title:"Zoom In",children:e.jsx(wt,{size:18})}),e.jsx(He,{onClick:B,title:"Reset Zoom",children:e.jsx(Bt,{size:16})})]})]}),n.length>1&&e.jsx(ri,{onClick:p=>p.stopPropagation(),children:n.map((p,C)=>e.jsx(oi,{$active:x===C,onClick:()=>{B(),j(C)},"aria-label":`View image ${C+1}`,children:e.jsx(gt,{src:p,alt:`${t} thumbnail ${C+1}`})},C))})]})},a={white:"#FFFFFF",primaryText:"#1C1C1C",secondaryText:"#6B665E",gold:"#C9A24A",darkGold:"#B38A32",lightGold:"#E6D3A0",border:"#E3DED4"},ai=o.section`
  width: 100%;
  max-width: 100%;
  background-color: #F9F7F2;
  border-top: 1px solid ${a.border};
  border-bottom: 1px solid ${a.border};
  padding: 64px 48px;
  margin-top: 64px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 32px 16px;
    margin-top: 40px;
  }
`,li=o.div`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: start;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`,ci=o.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(28, 28, 28, 0.08);
  border: 1px solid ${a.border};
  background-color: ${a.white};
  align-self: start;

  img {
    width: 100%;
    height: auto;
    max-height: 480px;
    object-fit: cover;
    display: block;
  }
`,di=o.div`
  display: flex;
  flex-direction: column;

  h2 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.5rem;
    font-weight: 600;
    color: ${a.primaryText};
    line-height: 1.25;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 1.9rem;
    }
  }

  p {
    font-size: 0.95rem;
    color: ${a.secondaryText};
    line-height: 1.7;
    margin-bottom: 32px;
  }
`,pi=o.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${a.border};
`,xi=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid ${a.border};
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${a.primaryText};
  transition: color 0.2s ease;

  &:hover {
    color: ${a.gold};
  }
`,fi=o.div`
  display: ${({$isOpen:n})=>n?"block":"none"};
  padding: 0 0 16px 0;
  font-size: 0.88rem;
  color: ${a.secondaryText};
  line-height: 1.6;
`,gi=({content:n})=>{const[x,t]=c.useState(null);if(n&&n.showPackagingSection===!1)return null;const y=v=>v?v.replace(/FedEx\s+Priority\s+Air/gi,"Priority Air").replace(/FedEx\s+locations/gi,"express courier locations").replace(/FedEx/gi,"Priority Air").replace(/We\s+also\s+offer\s+a\s+30-day\s+return\s+policy,\s+subject\s+to\s+our\s+return\s+terms\s+and\s+conditions\./gi,"").replace(/30-day\s+return\s+policy\./gi,"").trim():"";let S=[{title:"Discreet Packaging",content:"Every order is shipped in plain, unbranded outer security boxes. There is no mention of Floksy Jewel or diamond jewelry on the package exterior for 100% privacy and security."},{title:"Secure and Convenient Pickup Option",content:"Hold your order for pick up at thousands of secure express courier locations or choose insured signature delivery directly to your doorstep."},{title:"SHIPPING & DELIVERY",content:"After order confirmation, your order will be dispatched within 7-10 working days. Once dispatched, delivery is estimated within an additional 7-10 working days. All shipments are sent via fully insured Priority Air for secure and reliable delivery."}];if(n&&n.packagingItemsJson)try{const v=typeof n.packagingItemsJson=="string"?JSON.parse(n.packagingItemsJson):n.packagingItemsJson;Array.isArray(v)&&v.length>0&&(S=v.filter(u=>u.isActive!==!1).map(u=>({title:u.title,content:y(u.description||u.content)})))}catch{}const j=(n==null?void 0:n.packagingHeading)||"We're committed to making your entire experience a pleasant one, from shopping to shipping.",w=(n==null?void 0:n.packagingDescription)||"Every item we send comes in our signature Floksy Jewel packaging. Engagement rings arrive in a deluxe velvet ring box within an elegant presentation box ready for your proposal. The presentation box also secures your appraisal certificate and GIA/IGI diamond grading report. Loose diamonds are presented in a velvet lined diamond case that securely holds the stone.";return e.jsx(qe,{yOffset:35,children:e.jsx(ai,{children:e.jsxs(li,{children:[e.jsx(ci,{children:e.jsx("img",{src:"/assets/floksy_ring_box.png",alt:"Floksy Jewel Signature Packaging"})}),e.jsxs(di,{children:[e.jsx("h2",{children:j}),e.jsx("p",{children:w}),e.jsx(pi,{children:S.map((v,u)=>e.jsxs(Ne.Fragment,{children:[e.jsxs(xi,{onClick:()=>t(x===u?null:u),children:[e.jsx("span",{children:v.title}),e.jsx("span",{style:{fontSize:"1.2rem",color:a.gold},children:x===u?"−":"+"})]}),e.jsx(fi,{$isOpen:x===u,children:v.content})]},u))})]})]})})})},ui=o.section`
  max-width: 1280px;
  margin: 80px auto 0;
  padding: 0 24px;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px;
  }
`,mi=o.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  text-align: center;
  color: ${a.primaryText};
  margin-bottom: 40px;
`,hi=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 40px;
  background-color: ${a.white};
  border: 1px solid ${a.border};
  border-radius: 4px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    text-align: center;
    padding: 24px 20px;
  }
`,bi=o.div`
  display: flex;
  align-items: center;
  gap: 20px;

  .score-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 4rem;
    font-weight: 700;
    color: ${a.primaryText};
    line-height: 1;
  }

  .stars-col {
    display: flex;
    flex-direction: column;
    gap: 6px;

    .stars-row {
      display: flex;
      gap: 4px;
      color: ${a.gold};
    }

    .rev-count {
      font-size: 0.85rem;
      color: ${a.secondaryText};
    }
  }
`,yi=o.button`
  padding: 14px 28px;
  background-color: ${a.primaryText};
  color: ${a.white};
  border: 1px solid ${a.primaryText};
  border-radius: 24px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${a.gold};
    border-color: ${a.gold};
    color: ${a.primaryText};
  }
`,wi=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid ${a.border};
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;
`,ze=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${a.white};
  border: 1px solid ${a.border};
  border-radius: 20px;
  font-size: 0.82rem;
  color: ${a.primaryText};
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:hover {
    border-color: ${a.gold};
  }

  select {
    border: none;
    background: transparent;
    font-size: 0.82rem;
    color: ${a.primaryText};
    outline: none;
    cursor: pointer;
  }
`,vi=o.div`
  display: flex;
  gap: 24px;
  padding: 32px 0;
  border-bottom: 1px solid ${a.border};

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
  }
`,ji=o.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  width: 140px;
  flex-shrink: 0;

  .avatar-circle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: ${a.lightGold};
    color: ${a.darkGold};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.1rem;
  }

  .user-name {
    font-size: 0.88rem;
    font-weight: 600;
    color: ${a.primaryText};
  }

  .verified-badge {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.72rem;
    color: ${a.darkGold};
    font-weight: 600;
  }
`,ki=o.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;

    .rating-and-title {
      display: flex;
      align-items: center;
      gap: 12px;

      .stars {
        display: flex;
        gap: 2px;
        color: ${a.gold};
      }

      .title {
        font-size: 1.05rem;
        font-weight: 700;
        color: ${a.primaryText};
      }
    }

    .date {
      font-size: 0.8rem;
      color: ${a.secondaryText};
    }
  }

  .body-text {
    font-size: 0.92rem;
    color: ${a.secondaryText};
    line-height: 1.6;
    margin-bottom: 14px;
  }

  .product-reviewed {
    font-size: 0.78rem;
    color: ${a.secondaryText};
    margin-bottom: 16px;
    font-style: italic;
  }

  .atelier-response {
    background-color: ${a.white};
    border-left: 3px solid ${a.gold};
    padding: 14px 18px;
    border-radius: 0 4px 4px 0;
    margin-top: 8px;

    .resp-title {
      font-size: 0.82rem;
      font-weight: 700;
      color: ${a.primaryText};
      margin-bottom: 4px;
    }

    .resp-body {
      font-size: 0.85rem;
      color: ${a.secondaryText};
      line-height: 1.5;
    }
  }
`,Si=o.div`
  position: fixed;
  inset: 0;
  background: rgba(28, 28, 28, 0.6);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`,Ci=o.div`
  background: ${a.white};
  border: 1px solid ${a.border};
  border-radius: 6px;
  width: 100%;
  max-width: 520px;
  padding: 32px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    color: ${a.primaryText};
    margin-bottom: 8px;
  }

  p {
    font-size: 0.85rem;
    color: ${a.secondaryText};
    margin-bottom: 24px;
  }
`,zi=({productName:n="Floksy Jewel Creation",content:x,productId:t,reviews:y})=>{const[S,j]=c.useState(!1),[w,m]=c.useState(5),[v,u]=c.useState(""),[l,k]=c.useState(""),[A,T]=c.useState("");if(x&&(x.reviewsEnabled===!1||x.showReviews===!1))return null;const[f,L]=c.useState(()=>y&&Array.isArray(y)&&y.length>0?y.map((d,g)=>({id:d.id||`rev_${g}`,name:d.author||d.name||d.authorName||"Verified Buyer",verified:!0,rating:Number(d.rating)||5,title:d.title||(d.comment?d.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:d.date||(d.createdAt?new Date(d.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:d.text||d.comment||d.content||"",productReviewed:d.productReviewed||n,response:d.response||null})):[]);c.useEffect(()=>{let d=!0;return y&&Array.isArray(y)&&y.length>0?L(y.map((g,B)=>({id:g.id||`rev_${B}`,name:g.author||g.name||g.authorName||"Verified Buyer",verified:!0,rating:Number(g.rating)||5,title:g.title||(g.comment?g.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:g.date||(g.createdAt?new Date(g.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:g.text||g.comment||g.content||"",productReviewed:g.productReviewed||n,response:g.response||null}))):X.get("/reviews"+(t?`?productId=${t}`:"")).then(g=>{if(!d)return;const B=Array.isArray(g.data)?g.data:Array.isArray(g)?g:[];B.length>0&&L(B.map((N,Z)=>({id:N.id||`rev_${Z}`,name:N.author||N.name||N.authorName||"Verified Buyer",verified:!0,rating:Number(N.rating)||5,title:N.title||(N.comment?N.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:N.date||(N.createdAt?new Date(N.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:N.text||N.comment||N.content||"",productReviewed:N.productReviewed||n,response:N.response||null})))}).catch(console.error),()=>{d=!1}},[t,y,n]);const D=d=>{if(d.preventDefault(),!v||!l||!A){alert("Please fill in all required fields.");return}const g={id:`rev_${Date.now()}`,name:v,verified:!0,rating:w,title:l,date:new Date().toLocaleDateString("en-US"),text:A,productReviewed:n,response:"Thank you for sharing your experience with Floksy Jewel Atelier!"};L([g,...f]),j(!1),u(""),k(""),T(""),alert("Thank you! Your review has been submitted successfully.")},I=(x==null?void 0:x.reviewsTitle)||"Item Reviews";x==null||x.reviewsVerifiedBadge;const H=(x==null?void 0:x.reviewsSubmissionEnabled)??!0,re=f.length>0?(f.reduce((d,g)=>d+(Number(g.rating)||5),0)/f.length).toFixed(1):"5.0";return e.jsxs(ui,{children:[e.jsx(mi,{children:I}),e.jsxs(hi,{children:[e.jsxs(bi,{children:[e.jsx("div",{className:"score-num",children:re}),e.jsxs("div",{className:"stars-col",children:[e.jsx("div",{className:"stars-row",children:[...Array(5)].map((d,g)=>e.jsx(_e,{size:18,fill:g<Math.round(Number(re))?a.gold:"none",color:a.gold},g))}),e.jsxs("div",{className:"rev-count",children:[f.length," Verified ",f.length===1?"Review":"Reviews"]})]})]}),H&&e.jsx(yi,{onClick:()=>j(!0),children:"Write A Review"})]}),e.jsxs(wi,{children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:[e.jsxs(ze,{children:[e.jsx("input",{type:"checkbox",id:"withMedia",defaultChecked:!0,style:{accentColor:a.gold}}),e.jsx("label",{htmlFor:"withMedia",children:"With media"})]}),e.jsx(ze,{children:e.jsxs("select",{defaultValue:"all",children:[e.jsx("option",{value:"all",children:"Recommendation (All)"}),e.jsx("option",{value:"yes",children:"Recommends Product"})]})}),e.jsx(ze,{children:e.jsxs("select",{defaultValue:"exceeds",children:[e.jsx("option",{value:"exceeds",children:"Expectations (Exceeds)"}),e.jsx("option",{value:"met",children:"Met Expectations"})]})})]}),e.jsxs(ze,{children:[e.jsx("span",{children:"Sort by:"}),e.jsxs("select",{defaultValue:"relevant",children:[e.jsx("option",{value:"relevant",children:"Most relevant"}),e.jsx("option",{value:"newest",children:"Newest first"}),e.jsx("option",{value:"highest",children:"Highest rated"})]})]})]}),e.jsx("div",{children:f.map(d=>e.jsxs(vi,{children:[e.jsxs(ji,{children:[e.jsx("div",{className:"avatar-circle",children:d.name.charAt(0)}),e.jsx("div",{className:"user-name",children:d.name}),d.verified&&e.jsxs("div",{className:"verified-badge",children:[e.jsx(Ft,{size:12,color:a.darkGold})," Verified Buyer"]})]}),e.jsxs(ki,{children:[e.jsxs("div",{className:"review-header",children:[e.jsxs("div",{className:"rating-and-title",children:[e.jsx("div",{className:"stars",children:[...Array(d.rating)].map((g,B)=>e.jsx(_e,{size:14,fill:a.gold,color:a.gold},B))}),e.jsx("div",{className:"title",children:d.title})]}),e.jsx("div",{className:"date",children:d.date})]}),e.jsx("div",{className:"body-text",children:d.text}),e.jsxs("div",{className:"product-reviewed",children:["Product reviewed: ",d.productReviewed]}),d.response&&e.jsxs("div",{className:"atelier-response",children:[e.jsx("div",{className:"resp-title",children:"Floksy Jewel Team"}),e.jsx("div",{className:"resp-body",children:d.response})]})]})]},d.id))}),S&&e.jsx(Si,{onClick:()=>j(!1),children:e.jsxs(Ci,{onClick:d=>d.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12},children:[e.jsx("h3",{children:"Write a Review"}),e.jsx(Xe,{size:20,style:{cursor:"pointer",color:a.secondaryText},onClick:()=>j(!1)})]}),e.jsxs("p",{children:["Share your authentic experience with ",n,"."]}),e.jsxs("form",{onSubmit:D,style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Rating"}),e.jsx("div",{style:{display:"flex",gap:6},children:[1,2,3,4,5].map(d=>e.jsx(_e,{size:24,style:{cursor:"pointer"},fill:d<=w?a.gold:"none",color:a.gold,onClick:()=>m(d)},d))})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Your Name"}),e.jsx("input",{type:"text",required:!0,value:v,onChange:d=>u(d.target.value),placeholder:"e.g. Patty G.",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem"}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Headline / Title"}),e.jsx("input",{type:"text",required:!0,value:l,onChange:d=>k(d.target.value),placeholder:"e.g. Perfect description & exquisite craftsmanship",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem"}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Review Details"}),e.jsx("textarea",{required:!0,rows:4,value:A,onChange:d=>T(d.target.value),placeholder:"Write your review here...",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem",fontFamily:"inherit"}})]}),e.jsx("button",{type:"submit",style:{width:"100%",padding:14,backgroundColor:a.primaryText,color:a.white,border:"none",borderRadius:4,fontWeight:700,fontSize:"0.85rem",cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase"},children:"Submit Verified Review"})]})]})})]})},jt=o.div`
  position: relative;
  width: 100%;
`,kt=o.div`
  display: flex;
  gap: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scroll-snap-type: x proximity;
  touch-action: pan-x pan-y;
  padding: 12px 4px 28px 4px;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  > a, > div, > * {
    flex: 0 0 calc(25% - 18px);
    width: calc(25% - 18px);
    min-width: 280px;
    height: 100%;
    display: flex;
    flex-direction: column;
    scroll-snap-align: start;

    @media (max-width: 1200px) {
      flex: 0 0 280px;
      min-width: 260px;
    }

    @media (max-width: 768px) {
      flex: 0 0 240px;
      min-width: 220px;
    }
  }
`,Ae=o.button`
  position: absolute;
  top: 40%;
  ${({$direction:n})=>n==="left"?"left: -18px;":"right: -18px;"}
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid ${a.border};
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.2s ease;
  color: ${a.primaryText};

  &:hover {
    background: ${a.primaryText};
    color: #ffffff;
    border-color: ${a.primaryText};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    ${({$direction:n})=>n==="left"?"left: -8px;":"right: -8px;"}
  }
`,Ti=o.section`
  width: 100%;
  max-width: 100%;
  margin: 80px 0 0;
  padding: 0 48px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px;
  }
`,Ai=o.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  color: ${a.primaryText};
  margin-bottom: 28px;
`,pe=[{id:"demo_sim_1",name:"Classic Four Prong Solitaire Engagement Ring in 14K Yellow Gold",title:"Classic Four Prong Solitaire Engagement Ring in 14K Yellow Gold",slug:"floksy-jewel-signature-solitaire-ring",mainImage:"/assets/floksy_rings_cat.png",secondaryImage:"/assets/floksy_rings_cat_2.png",price:870,basePrice:870,metal:"14K Yellow Gold",category:"Rings"},{id:"demo_sim_2",name:"Petite Micropavé Hidden Halo Engagement Ring in 14K White Gold",title:"Petite Micropavé Hidden Halo Engagement Ring in 14K White Gold",slug:"floksy-jewel-signature-solitaire-ring",mainImage:"/assets/floksy_rings_cat_2.png",secondaryImage:"/assets/floksy_rings_cat.png",price:1645,basePrice:1645,metal:"14K White Gold",category:"Rings"},{id:"demo_sim_3",name:"Chain-Set Initial N Necklace With Lab-Grown Diamonds In 14K White Gold",title:"Chain-Set Initial N Necklace With Lab-Grown Diamonds In 14K White Gold",slug:"floksy-jewel-signature-solitaire-ring",mainImage:"/assets/floksy_rings_cat.png",secondaryImage:"/assets/floksy_rings_cat_2.png",price:1140,basePrice:1140,metal:"14K White Gold",category:"Necklaces"},{id:"demo_sim_4",name:'7" Four Prong Diamond Tennis Bracelet In 14K White Gold',title:'7" Four Prong Diamond Tennis Bracelet In 14K White Gold',slug:"floksy-jewel-signature-solitaire-ring",mainImage:"/assets/floksy_rings_cat_2.png",secondaryImage:"/assets/floksy_rings_cat.png",price:3730,basePrice:3730,metal:"14K White Gold",category:"Bracelets"}],Ei=({items:n=[],currentProductId:x,content:t})=>{const[y,S]=c.useState([]),j=Ne.useRef(null);if(t&&(t.similarItemsEnabled===!1||t.showSimilarItems===!1))return null;const w=(t==null?void 0:t.similarItemsTitle)||"Similar Items";c.useEffect(()=>{let u=Array.isArray(n)?n.filter(l=>l&&l.id!==x):[];X.getProducts({limit:16,status:"ACTIVE"}).then(l=>{const A=(Array.isArray(l)?l:(l==null?void 0:l.products)||[]).filter(f=>f&&f.id!==x),T=Array.from(new Set([...u,...A]));T.length>0?S(T):S(pe)}).catch(()=>{S(u.length>0?u:pe)})},[n,x]);const m=y.length>0?y:pe,v=u=>{if(j.current){const l=u==="left"?-340:340;j.current.scrollBy({left:l,behavior:"smooth"})}};return e.jsxs(Ti,{children:[e.jsx(Ai,{children:w}),e.jsxs(jt,{children:[m.length>3&&e.jsx(Ae,{$direction:"left",onClick:()=>v("left"),children:e.jsx(Ee,{size:22})}),e.jsx(kt,{ref:j,children:m.map((u,l)=>e.jsx(vt,{product:u},u.id||`sim_${l}`))}),m.length>3&&e.jsx(Ae,{$direction:"right",onClick:()=>v("right"),children:e.jsx(Ie,{size:22})})]})]})},Ii=o.section`
  width: 100%;
  max-width: 100%;
  margin: 80px 0 0;
  padding: 0 48px 80px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px 48px;
  }
`,Ni=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;

  h2 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.2rem;
    font-weight: 600;
    color: ${a.primaryText};
    margin: 0;
  }

  .see-all {
    font-size: 0.85rem;
    font-weight: 600;
    color: ${a.primaryText};
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 4px;
    cursor: pointer;

    &:hover {
      color: ${a.gold};
    }
  }
`,$i=({currentProductId:n,content:x})=>{const[t,y]=c.useState([]),S=Ne.useRef(null);if(x&&(x.recentlyViewedEnabled===!1||x.showRecentlyViewed===!1))return null;const j=(x==null?void 0:x.recentlyViewedTitle)||"Recently Viewed";c.useEffect(()=>{let l=[];try{const f=localStorage.getItem("fj_recently_viewed");f&&(l=JSON.parse(f))}catch{}const k=new Set,A=f=>{const L=[];f.id&&L.push(`id:${f.id}`),f.slug&&L.push(`slug:${f.slug}`);const D=(f.title||f.name||"").trim().toLowerCase();return D&&L.push(`name:${D}`),L};n&&k.add(`id:${n}`);const T=[];for(const f of l){if(!f)continue;const L=A(f);L.some(I=>k.has(I))||(T.push(f),L.forEach(I=>k.add(I)))}X.getProducts({limit:16,status:"ACTIVE"}).then(f=>{const L=Array.isArray(f)?f:(f==null?void 0:f.products)||[],D=[...T];for(const I of L){if(!I)continue;const H=A(I);H.some(d=>k.has(d))||(D.push(I),H.forEach(d=>k.add(d)))}y(D.length>0?D:pe)}).catch(()=>{y(T.length>0?T:pe)})},[n]);const w=t.length>0?t:pe,m=new Set,v=w.filter(l=>{if(!l)return!1;const k=l.id?`id:${l.id}`:null,A=l.slug?`slug:${l.slug}`:null,T=(l.title||l.name||"").trim().toLowerCase(),f=T?`name:${T}`:null;return k&&m.has(k)||A&&m.has(A)||f&&m.has(f)?!1:(k&&m.add(k),A&&m.add(A),f&&m.add(f),!0)}),u=l=>{if(S.current){const k=l==="left"?-340:340;S.current.scrollBy({left:k,behavior:"smooth"})}};return e.jsx(qe,{yOffset:35,children:e.jsxs(Ii,{children:[e.jsxs(Ni,{children:[e.jsx("h2",{children:j}),e.jsx("a",{href:"/rings",className:"see-all",children:"See All ›"})]}),e.jsxs(jt,{children:[v.length>3&&e.jsx(Ae,{$direction:"left",onClick:()=>u("left"),children:e.jsx(Ee,{size:22})}),e.jsx(kt,{ref:S,children:v.map((l,k)=>e.jsx(qe,{staggerIndex:k,yOffset:25,style:{flexShrink:0},children:e.jsx(vt,{product:l})},l.id||`rec_${k}`))}),v.length>3&&e.jsx(Ae,{$direction:"right",onClick:()=>u("right"),children:e.jsx(Ie,{size:22})})]})]})})},Ve=o.div`
  background-color: #F9F7F2;
  min-height: 100vh;
  width: 100%;
`,Te=o.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px 48px 80px 48px;
  background-color: #F9F7F2;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 24px 24px 60px 24px;
  }
  @media (max-width: 768px) {
    padding: 16px 16px 40px 16px;
  }
`,Ke=o.div`
  font-size: 0.78rem;
  color: #77736c;
  margin-bottom: 28px;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  a {
    color: #77736c;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #19202a;
    }
  }

  span.current {
    color: #19202a;
    font-weight: 600;
  }
`,Ri=o.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 48px;
  align-items: start;
  position: relative;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    gap: 36px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`,Li=o.div`
  width: 100%;
  min-width: 0;
  /* Removed fixed height, align-self, position sticky, and top */
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`,Pi=o.div`
  width: 100%;
  /* Removed height, overflow-y: scroll, and scrollbar hiding */
  /* Now it will just flow naturally with the window scroll */
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`,Oi=o.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`,Di=o.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #faf8f5;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid #f2ede4;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
  }

  &:hover img {
    transform: scale(1.03);
  }

  .zoom-hint {
    position: absolute;
    bottom: 16px;
    right: 16px;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(4px);
    color: #19202a;
    padding: 8px 14px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    opacity: 0;
    transition: opacity 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }

  &:hover .zoom-hint {
    opacity: 1;
  }
`,Mi=o.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: relative;
    width: 100%;
    margin-bottom: 24px;
  }
`,Bi=o.div`
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  border-radius: 6px;
  width: 100%;
  scrollbar-width: none;
  touch-action: pan-x pan-y;

  &::-webkit-scrollbar {
    display: none;
  }
`,Fi=o.div`
  flex: 0 0 100%;
  width: 100%;
  aspect-ratio: 1 / 1;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  position: relative;
  background: #faf8f5;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #f2ede4;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
  }
`,mt=o.button`
  position: absolute;
  top: 50%;
  ${({$dir:n})=>n==="left"?"left: 10px;":"right: 10px;"}
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  border: 1px solid #e8e3d9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #19202a;
  z-index: 10;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  transition: transform 0.2s ease;

  &:active {
    transform: translateY(-50%) scale(0.92);
  }
`,Wi=o.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  color: #19202a;
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e3d9;
`,_i=o.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d9d3c7;
    cursor: pointer;
    transition: all 0.2s ease;

    &.active {
      background: #19202a;
      width: 24px;
      border-radius: 4px;
    }
  }
`,Gi=o.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  box-sizing: border-box;
  z-index: 10;

  @media (min-width: 769px) {
    position: -webkit-sticky; /* Added for Safari support */
    position: sticky;
    top: 120px; /* Increased slightly to ensure it clears your top navigation bar */
    align-self: start;

    height: fit-content; /* CRITICAL FIX: Stops the column from stretching to the image gallery height */
    
    max-height: calc(100vh - 130px); 
    min-height: 0;

    overflow-y: auto;
    /* Removed overflow-x: hidden as it can sometimes conflict with sticky */

    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    height: auto;
    max-height: none;
    overflow-y: visible;
  }
`,Ui=o.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    font-weight: 500;
    color: #19202a;
    margin: 0 0 8px 0;
    line-height: 1.15;
  }

  .wishlist-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: #77736c;
    transition: color 0.2s;

    &:hover {
      color: #c5221f;
    }

    &.active {
      color: #c5221f;
    }
  }
`,Yi=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: #77736c;

  .stars {
    color: #c9a45c;
    letter-spacing: 2px;
  }
`,Ji=o.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-top: 4px;

  .current-price {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.1rem;
    font-weight: 600;
    color: #19202a;
  }

  .compare-price {
    font-size: 1.1rem;
    color: #a39e93;
    text-decoration: line-through;
  }
`,ye=o.div`
  padding-bottom: 14px;
  margin-bottom: 14px;
  border-bottom: 1px solid #f2ede4;
`,Hi=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  margin-bottom: 10px;

  .label {
    color: #77736c;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .value {
    color: #19202a;
    font-weight: 700;
  }
`,Vi=o.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`,Ki=o.button`
  height: 44px;
  min-width: 52px;
  padding: 0 14px;
  background: #ffffff;
  border: 1.5px solid ${({$isSelected:n})=>n?"#19202a":"#e8e3d9"};
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  .circle-ring {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 2px solid ${({$circleBorderColor:n})=>n||"#cbd5e1"};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    color: #19202a;
    letter-spacing: 0.02em;
  }

  &:hover {
    border-color: #19202a;
  }
`,qi=o.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 0;
  flex-wrap: wrap;

  .label-title {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #0c1938;
    letter-spacing: -0.01em;
  }

  .guide-link {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: #0c1938;
    text-decoration: underline;
    white-space: nowrap;
    transition: color 0.15s ease;

    &:hover {
      color: #c9a45c;
    }
  }
`,Xi=o.div`
  position: relative;
  width: 155px;
`,Zi=o.button`
  width: 100%;
  padding: 4px 0 6px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid #b0b8c4;
  border-radius: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.9rem;
  transition: border-color 0.15s ease;

  .selected-val {
    font-weight: 600;
    color: #0c1938;
  }

  .placeholder-val {
    color: #6b7280;
    font-weight: 400;
  }

  &:hover {
    border-bottom-color: #0c1938;
  }

  .arrow-icon {
    display: flex;
    align-items: center;
    margin-left: 8px;
  }
`,Qi=o.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: #ffffff;
  border: 1px solid #d9d3c7;
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  z-index: 100;
  max-height: 220px;
  overflow-y: auto;

  .option-item {
    padding: 8px 12px;
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    cursor: pointer;
    color: #0c1938;
    transition: background 0.15s ease;

    &:hover {
      background: #f3f4f6;
    }

    &.selected {
      background: #e5e7eb;
      font-weight: 700;
    }
  }
`,en=o.div`
  margin-bottom: 0;
`,tn=o.button`
  background: none;
  border: none;
  color: #0c1938;
  font-weight: 600;
  font-size: 0.88rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0;
  transition: color 0.18s ease;

  &:hover {
    color: #c9a45c;

    .info-circle {
      border-color: #c9a45c;
      color: #c9a45c;
    }
  }

  .info-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #0c1938;
    font-size: 0.65rem;
    font-weight: 700;
    font-style: italic;
    line-height: 1;
    transition: all 0.18s ease;
  }
`,nn=o.input`
  width: 100%;
  height: 46px;
  padding: 0 16px;
  border: 1px solid #d9d3c7;
  border-radius: 4px;
  font-size: 0.88rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #ffffff;
  color: #0c1938;
  outline: none;
  box-sizing: border-box;
  margin-top: 10px;
  transition: border-color 0.18s ease;

  &::placeholder {
    color: #999388;
  }

  &:focus {
    border-color: #0c1938;
  }
`,rn=o.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,on=o.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  color: #0c1938;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
`,sn=o.input`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid ${({$hasError:n})=>n?"#c5221f":"#d9d3c7"};
  border-radius: 4px;
  font-size: 0.88rem;
  font-family: 'Inter', sans-serif;
  background: #ffffff;
  color: #0c1938;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #0c1938;
  }
`,an=o.textarea`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({$hasError:n})=>n?"#c5221f":"#d9d3c7"};
  border-radius: 4px;
  font-size: 0.88rem;
  font-family: 'Inter', sans-serif;
  background: #ffffff;
  color: #0c1938;
  outline: none;
  box-sizing: border-box;
  resize: vertical;

  &:focus {
    border-color: #0c1938;
  }
`,ln=o.select`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid ${({$hasError:n})=>n?"#c5221f":"#d9d3c7"};
  border-radius: 4px;
  font-size: 0.88rem;
  font-family: 'Inter', sans-serif;
  background: #ffffff;
  color: #0c1938;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
`,cn=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
`,dn=o.button`
  height: 44px;
  min-width: 48px;
  padding: 0 16px;
  background: #ffffff;
  border: ${({$isSelected:n})=>n?"1.5px solid #0c1938":"1px solid #d9d3c7"};
  border-radius: 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.88rem;
  font-weight: ${({$isSelected:n})=>n?"600":"400"};
  color: #0c1938;
  transition: all 0.15s ease;

  &:hover {
    border-color: #0c1938;
  }
`,pn=o.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 18px 0;
`,xn=o.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  gap: 10px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    .qty-selector-col { display: none; }
  }
`,fn=o.div`
  display: flex;
  align-items: center;
  border: 1px solid #d9d3c7;
  border-radius: 4px;
  height: 50px;
  background: #faf8f5;

  button {
    background: none;
    border: none;
    width: 38px;
    height: 100%;
    cursor: pointer;
    color: #1f1f1f;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease;

    &:hover {
      background: #faf5eb;
    }
  }

  span {
    padding: 0 4px;
    font-weight: 700;
    font-size: 0.9rem;
    color: #1f1f1f;
    min-width: 18px;
    text-align: center;
  }
`,gn=o.button`
  width: 100%;
  height: 50px;
  background: #1f1f1f;
  color: #ffffff;
  border: 1px solid #1f1f1f;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

  &:hover {
    background: #333333;
    border-color: #333333;
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 576px) {
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    height: 48px;
  }
`,un=o.button`
  width: 100%;
  height: 50px;
  background: #c9a45c;
  color: #ffffff;
  border: 1px solid #c9a45c;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 16px rgba(201, 164, 92, 0.25);
  box-sizing: border-box;

  &:hover {
    background: #b59048;
    border-color: #b59048;
    box-shadow: 0 6px 20px rgba(201, 164, 92, 0.4);
    transform: translateY(-1px);
  }

  @media (max-width: 576px) {
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    height: 48px;
  }
`,mn=o.button`
  width: 100%;
  height: 48px;
  background: transparent;
  color: #19202a;
  border: 1px solid #d9d3c7;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: #19202a;
    background: #faf8f5;
  }
`,hn=o.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 0;
  border-top: 1px solid #f2ede4;
  border-bottom: 1px solid #f2ede4;

  .benefit-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: #55524d;
    font-weight: 500;
  }
`,bn=o.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #f2ede4;
`,yn=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f2ede4;
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #19202a;
  user-select: none;

  &:hover {
    color: #c9a45c;
  }
`,wn=o.div`
  display: ${({$open:n})=>n?"block":"none"};
  padding: 0 0 16px 0;
  font-size: 0.88rem;
  color: #55524d;
  line-height: 1.6;
`,vn=o.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: #ffffff;
  border-top: 1px solid #e8e3d9;
  box-shadow: 0 -6px 28px rgba(0, 0, 0, 0.12);
  padding: 12px 24px;
  transform: ${({$show:n})=>n?"translateY(0)":"translateY(110%)"};
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  .sticky-inner {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .product-info {
    display: flex;
    align-items: center;
    gap: 14px;

    img {
      width: 48px;
      height: 48px;
      object-fit: cover;
      border: 1px solid #e8e3d9;
      border-radius: 4px;
    }

    .title-price {
      display: flex;
      flex-direction: column;

      .title {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.15rem;
        font-weight: 600;
        color: #1f1f1f;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 320px;
      }

      .meta-price {
        font-size: 0.85rem;
        color: #c9a45c;
        font-weight: 700;
      }
    }
  }

  .sticky-actions {
    display: flex;
    align-items: center;
    gap: 10px;

    .sticky-qty {
      display: flex;
      align-items: center;
      border: 1px solid #d9d3c7;
      border-radius: 4px;
      height: 40px;
      background: #faf8f5;

      button {
        background: none;
        border: none;
        padding: 0 10px;
        height: 100%;
        cursor: pointer;
        color: #1f1f1f;

        &:hover { background: #f0e9dc; }
      }

      span {
        padding: 0 8px;
        font-weight: 700;
        font-size: 0.85rem;
      }
    }

    button.sticky-btn {
      height: 40px;
      padding: 0 20px;
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-radius: 4px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s ease;
    }

    .add-bag {
      background: #1f1f1f;
      color: #ffffff;
      border: 1px solid #1f1f1f;
      &:hover { background: #333; }
    }

    .buy-now {
      background: #c9a45c;
      color: #ffffff;
      border: 1px solid #c9a45c;
      &:hover { background: #b59048; }
    }
  }

  @media (max-width: 768px) {
    padding: 10px 14px max(10px, env(safe-area-inset-bottom));

    .sticky-inner {
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
    }

    .product-info {
      justify-content: space-between;
      img { display: none; }
      .title-price {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;

        .title { max-width: 220px; font-size: 0.88rem; }
        .meta-price { font-size: 0.85rem; font-weight: 700; }
      }
    }

    .sticky-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      width: 100%;

      .sticky-qty { display: none; }
      button.sticky-btn {
        width: 100%;
        padding: 0 8px;
        font-size: 0.75rem;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`,jn=o.div`
  position: fixed;
  top: 85px;
  left: 50%;
  transform: ${({$show:n})=>n?"translate(-50%, 0)":"translate(-50%, -20px)"};
  z-index: 100000;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 22px;
  border-radius: 30px;
  background: #ffffff;
  border: 1px solid ${({$type:n})=>n==="warning"?"#f59e0b":n==="error"?"#ef4444":"#10b981"};
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(201, 164, 92, 0.2);
  opacity: ${({$show:n})=>n?1:0};
  visibility: ${({$show:n})=>n?"visible":"hidden"};
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  width: 90%;
  max-width: 440px;
  box-sizing: border-box;

  @media (max-width: 576px) {
    top: 74px;
    padding: 10px 16px;
    font-size: 0.82rem;
  }

  .toast-icon {
    color: ${({$type:n})=>n==="warning"?"#f59e0b":n==="error"?"#ef4444":"#10b981"};
    display: flex;
    align-items: center;
  }

  .toast-content {
    font-family: 'Inter', sans-serif;
    font-size: 0.86rem;
    font-weight: 500;
    color: #19202a;
    line-height: 1.4;
  }

  .toast-close {
    background: none;
    border: none;
    cursor: pointer;
    color: #999388;
    padding: 2px;
    margin-left: auto;
    display: flex;
    align-items: center;

    &:hover {
      color: #19202a;
    }
  }
`,kn=o.div`
  background: #FAF7F2;
  border: 1px solid #E6DEC2;
  border-radius: 6px;
  padding: 10px 14px;
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  box-sizing: border-box;

  @media (max-width: 540px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .timer-header {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 0.95rem;
    font-weight: 600;
    color: #7E6325;
    letter-spacing: 0.02em;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .timer-units {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .unit-card {
    background: #ffffff;
    border: 1px solid #DFD5C2;
    border-radius: 4px;
    padding: 3px 8px;
    text-align: center;
    min-width: 42px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  }

  .unit-num {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #1a1a1a;
    line-height: 1.15;
  }

  .unit-label {
    font-size: 0.55rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #8C7E6A;
    font-weight: 600;
    margin-top: 1px;
  }
`,ht=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 100px 24px;
  text-align: center;
  background-color: #F9F7F2;
  min-height: 50vh;
  box-sizing: border-box;

  .not-found-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #faf5eb;
    border: 1px solid #e8e3d9;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #c9a45c;
    margin-bottom: 24px;
  }

  h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 2.4rem;
    font-weight: 500;
    color: #19202a;
    letter-spacing: 0.06em;
    margin: 0 0 16px 0;
    text-transform: uppercase;

    @media (max-width: 768px) {
      font-size: 1.9rem;
    }
  }

  p {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.98rem;
    color: #55524d;
    max-width: 480px;
    line-height: 1.6;
    margin: 0 0 32px 0;
  }

  .cta-group {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 32px;
    background: #1f1f1f;
    color: #ffffff;
    border: 1px solid #1f1f1f;
    border-radius: 4px;
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);

    &:hover {
      background: #333333;
      border-color: #333333;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    }
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 32px;
    background: transparent;
    color: #1f1f1f;
    border: 1px solid #d9d3c7;
    border-radius: 4px;
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      border-color: #c9a45c;
      color: #c9a45c;
      background: #faf5eb;
      transform: translateY(-2px);
    }
  }
`,bt=({src:n,alt:x,style:t,onLoad:y})=>{const[S,j]=c.useState(n);return c.useEffect(()=>{j(n)},[n]),e.jsx("img",{src:S||"/assets/floksy_rings_cat.png",alt:x,style:t,onLoad:y,onError:()=>{S!=="/assets/floksy_rings_cat.png"&&j("/assets/floksy_rings_cat.png")}})},yt=[{id:"exp",title:"YOUR FLOKSY JEWEL EXPERIENCE",content:"Every creation is handcrafted in our Surat atelier using certified conflict-free materials and 100% recycled precious metals. Includes complimentary sizing, insured shipping, and lifetime cleaning.",enabled:!0,defaultOpen:!0},{id:"specs",title:"PRODUCT & DIAMOND SPECIFICATIONS",content:"Hand-selected center stone with optical precision cut. Crafted in solid 14k/18k gold or silver with stamped hallmark verification.",enabled:!0,defaultOpen:!1},{id:"craft",title:"CRAFTSMANSHIP & SUSTAINABILITY",content:"Our Surat workshop directly sources lab-grown and natural diamonds, eliminating traditional markups and maintaining ethical standards.",enabled:!0,defaultOpen:!1},{id:"shipping",title:"SHIPPING & DELIVERY",content:"Free insured worldwide shipping with signature confirmation. Standard production time is 7 to 12 business days.",enabled:!0,defaultOpen:!1}],Sn=({saleEndsAt:n})=>{const[x,t]=c.useState(null);return c.useEffect(()=>{const y=()=>{const j=new Date(n).getTime(),w=new Date().getTime(),m=j-w;if(isNaN(j)||m<=0){t(null);return}const v=Math.floor(m/(1e3*60*60*24)),u=Math.floor(m%(1e3*60*60*24)/(1e3*60*60)),l=Math.floor(m%(1e3*60*60)/(1e3*60)),k=Math.floor(m%(1e3*60)/1e3);t({days:v,hours:u,mins:l,secs:k})};y();const S=setInterval(y,1e3);return()=>clearInterval(S)},[n]),x?e.jsxs(kn,{children:[e.jsx("div",{className:"timer-header",children:e.jsx("span",{children:"⏳ Limited Time Offer — Sale Ends In:"})}),e.jsxs("div",{className:"timer-units",children:[e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(x.days).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Days"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(x.hours).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Hours"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(x.mins).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Mins"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(x.secs).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Secs"})]})]})]}):null},Cn=(n,x)=>{let t=(n||"").trim();const y=`

💎 Handcrafted & Made to Order
Every piece we make is done to order right here in our Surat workshop. We never grab pre-made items off a shelf. Our team casts the metal and sets your stones one by one, which means your jewelry gets a proper, secure setting that can handle everyday life. If you need an engagement ring or just want a new piece for yourself, we put it together the right way.
━━━━━━━━━━━━━━━━━━
🎨 Customize Your Design
We handle both loose diamond sourcing and finished custom jewelry in-house, so changing up a design is no problem at all.
✔️ Want a bigger center stone?
✔️ Need a different prong style?
✔️ Looking for a matching band?
✔️ Need help sourcing a specific stone?
✔️ Want a totally new custom design?
Send over a message and we can work out the details.
━━━━━━━━━━━━━━━━━━
🚚 Production & Delivery
⏱️ Crafting Time: Give us 7 to 12 business days to make it.
🌐 Delivery: Secure shipping anywhere in the world.
🎁 Packaging: Arrives packed and ready to gift.
━━━━━━━━━━━━━━━━━━
📋 Cancellations & Returns
* Canceled within 3 hours: 10% fee applies.
* Canceled after 6 hours: 20% fee applies.
* Returns: Let us know within 7 days of delivery. Keep in mind that anything custom-made, personalized, or engraved is a final sale.
━━━━━━━━━━━━━━━━━━
❤️ About Floksy Jewel
Floksy Jewel is an actual manufacturing workshop based in Surat. We do not use middlemen. We source the loose lab-grown and natural diamonds ourselves, and we cast and polish the final custom jewelry right here. That means you get the piece straight from the source.
📩 Reach out if you need advice on picking a stone or want to start a custom build!`;if(t.length>500&&t.includes("Floksy Jewel")&&t.includes("Surat"))return t;const S=["Every piece we make","Every piece we make is done to order right here in ou","Every piece we make is done to order right here inour S","Every piece we make is done to order right here in","Handcrafted & Made to Order","ðŸ’Ž Handcrafted & Made to Order","🔹 Handcrafted & Made to Order","💎 Handcrafted & Made to Order"];let j=t;for(const w of S){const m=j.lastIndexOf(w);if(m>20){j=j.substring(0,m).trim();break}}return j||(j=x||"Floksy Jewel Fine Jewelry Piece"),j+y},Rn=()=>{var lt,ct;const{slug:n}=Wt(),x=_t(),[t,y]=c.useState(null),[S,j]=c.useState([]),[w,m]=c.useState(0),[v,u]=c.useState(!1),[l,k]=c.useState(null),[A,T]=c.useState("loading"),f=c.useRef(null),L=c.useRef(null),D=c.useRef(null),[I,H]=c.useState("14K Yellow Gold"),[re,d]=c.useState("14k"),[g,B]=c.useState("Select"),[N,Z]=c.useState(!1),[$e,Q]=c.useState(!1),[xe,Re]=c.useState(!1),[fe,Le]=c.useState(""),[W,p]=c.useState(1),[C,F]=c.useState(!1),[_,ee]=c.useState(!1),[Pe,Ze]=c.useState("exp"),[G,oe]=c.useState({}),[te,V]=c.useState({}),[ie,St]=c.useState(null),[se,Ct]=c.useState({show:!1,message:"",type:"success"}),[M,zt]=c.useState({enableConsultAtelierExpert:"true",consultTitle:"Consult a Floksy Atelier Expert",consultDescription:"Speak directly with our Floksy Jewel specialists regarding custom design, diamond selection, or sizing guidance.",consultPhone:"+91973785306",consultPhoneLabel:"Call Atelier",consultEmail:"contact@floksyjewel.com",consultEmailLabel:"Email Concierge",consultCloseLabel:"Close"}),{cartItems:we,addToCart:Qe,updateQuantity:Tt}=Ht(),{isInWishlist:At,toggleWishlist:Et}=Vt(),{showToast:It}=Kt(),ge=(i,r="success")=>{It(i,r)};c.useEffect(()=>{const i=()=>{window.scrollY>550?F(!0):F(!1)};return window.addEventListener("scroll",i,{passive:!0}),()=>window.removeEventListener("scroll",i)},[]),c.useEffect(()=>{const i=r=>{D.current&&!D.current.contains(r.target)&&Z(!1)};return document.addEventListener("mousedown",i),()=>document.removeEventListener("mousedown",i)},[]),c.useEffect(()=>{X.getSiteSettings().then(i=>{i&&typeof i=="object"&&Object.keys(i).length>0&&zt(r=>({...r,...i}))}).catch(console.error),X.getHolidayModeStatus().then(St).catch(console.error)},[]),c.useEffect(()=>{let i=!0;if(n){y(null),T("loading");const r=setTimeout(()=>{i&&(console.warn("Product request timed out after 10 seconds."),y(null),T("error"))},1e4);return X.getProductBySlug(n).then(s=>{if(!i)return;clearTimeout(r);const h=(s==null?void 0:s.product)||(s!=null&&s.id?s:null);if(h&&h.id){y(h),j((s==null?void 0:s.relatedProducts)||[]),m(0),T("success");try{const P=localStorage.getItem("fj_recently_viewed"),de=P?JSON.parse(P):[],ne=(h.title||h.name||"").trim().toLowerCase(),Ce=de.filter(R=>{if(!R||R.id&&h.id&&R.id===h.id||R.slug&&h.slug&&R.slug===h.slug)return!1;const E=(R.title||R.name||"").trim().toLowerCase();return!(ne&&E&&ne===E)}),z=[h,...Ce].slice(0,10);localStorage.setItem("fj_recently_viewed",JSON.stringify(z))}catch{}h.metal&&(H(h.metal.includes("Platinum")?"Silver":h.metal),d(h.metal.includes("18K")?"18k":h.metal.includes("Silver")||h.metal.includes("Platinum")?"Ag":"14k")),X.get(`/product-page-content/${h.id}`).then(P=>{i&&P.data&&P.data.content&&k(P.data.content)}).catch(console.error);let b=[];try{h.accordionsConfig&&(b=typeof h.accordionsConfig=="string"?JSON.parse(h.accordionsConfig):h.accordionsConfig)}catch{}(!b||b.length===0)&&(b=yt);const $=b.find(P=>P.enabled!==!1&&P.defaultOpen);$&&Ze($.id||$.title)}else y(null),T("not_found")}).catch(s=>{var h;i&&(clearTimeout(r),console.error("Error fetching product by slug:",s),y(null),((h=s==null?void 0:s.response)==null?void 0:h.status)===404||(s==null?void 0:s.status)===404?T("not_found"):T("error"))}),()=>{i=!1,clearTimeout(r)}}else y(null),T("not_found")},[n]);const[ve,et]=c.useState(null),[tt,it]=c.useState(null);c.useEffect(()=>{var i;if(t){const r=t.reviewCount??(((i=t.reviews)==null?void 0:i.length)||0),s=t.avgRating??5;et(r),it(s);let h=!0;return X.get(`/reviews?productId=${t.id}`).then(b=>{if(!h)return;const $=Array.isArray(b.data)?b.data:Array.isArray(b)?b:[];if($.length>0){et($.length);const P=$.reduce((de,ne)=>de+(Number(ne.rating)||5),0);it(Math.round(P/$.length*10)/10)}}).catch(console.error),()=>{h=!1}}},[t==null?void 0:t.id]),c.useLayoutEffect(()=>{t&&window.scrollTo(0,0)},[t==null?void 0:t.id]);const ue=c.useMemo(()=>!t||!we?-1:we.findIndex(i=>{var r;return(i.id===t.id||((r=i.product)==null?void 0:r.id)===t.id||i.productId===t.id)&&(!I||i.selectedMetal===I)}),[we,t==null?void 0:t.id,I]),ae=ue>=0?we[ue]:null;c.useEffect(()=>{ae&&ae.quantity&&p(ae.quantity)},[ae==null?void 0:ae.quantity,ue]);const je=i=>{const r=Math.max(1,i),s=r-W;p(r),ue>=0&&s!==0&&Tt(ue,s)},Nt=i=>{Ze(r=>r===i?null:i)},$t=()=>{if(!f.current)return;const i=f.current.scrollLeft,r=f.current.clientWidth;if(r>0){const s=Math.round(i/r);s!==w&&s>=0&&s<U.length&&m(s)}},Oe=i=>{if(m(i),f.current){const r=f.current.clientWidth;f.current.scrollTo({left:i*r,behavior:"smooth"})}};if(A==="loading")return e.jsx(Te,{style:{textAlign:"center",padding:80},children:e.jsx("div",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.6rem",color:"#c9a45c",letterSpacing:"0.08em"},children:"LOADING FLOKSY JEWEL ATELIER PRODUCT..."})});if(A==="not_found"||!t&&A!=="error")return e.jsx(Ve,{children:e.jsxs(Te,{style:{paddingBottom:60},children:[e.jsxs(Ke,{children:[e.jsx(K,{to:"/",children:"Home"})," / ",e.jsx(K,{to:"/collections",children:"Jewellery"})," / ",e.jsx("span",{className:"current",children:"Product Not Found"})]}),e.jsxs(ht,{children:[e.jsx("div",{className:"not-found-icon",children:e.jsx(Ge,{size:28})}),e.jsx("h1",{children:"PRODUCT NOT FOUND"}),e.jsx("p",{children:"We're sorry, but this product is no longer available."}),e.jsx("div",{className:"cta-group",children:e.jsx(K,{to:"/collections",className:"btn-primary",children:"VIEW ALL JEWELLERY"})})]})]})});if(A==="error"||!t)return e.jsx(Ve,{children:e.jsxs(Te,{style:{paddingBottom:60},children:[e.jsxs(Ke,{children:[e.jsx(K,{to:"/",children:"Home"})," / ",e.jsx(K,{to:"/collections",children:"Jewellery"})," / ",e.jsx("span",{className:"current",children:"Error Loading Product"})]}),e.jsxs(ht,{children:[e.jsx("div",{className:"not-found-icon",style:{color:"#c5221f",background:"#fdf2f2",borderColor:"#f8d7da"},children:e.jsx(pt,{size:28})}),e.jsx("h1",{children:"UNABLE TO LOAD PRODUCT"}),e.jsx("p",{children:"We encountered a temporary network or server error while loading this piece. Please try again."}),e.jsxs("div",{className:"cta-group",children:[e.jsx("button",{className:"btn-primary",onClick:()=>window.location.reload(),children:"RETRY"}),e.jsx(K,{to:"/collections",className:"btn-secondary",children:"VIEW ALL JEWELLERY"})]})]})]})});const nt=At(t.id),Rt=t.images&&Array.isArray(t.images)&&t.images.length>0?t.images.map(i=>typeof i=="string"?i:i==null?void 0:i.url):[t.primaryImage||t.mainImage,t.secondaryImage],U=Array.from(new Set(Rt.filter(Boolean))),Lt=U[w]||U[0]||"",me=!!(((t.jewelleryType||"").toLowerCase()==="rings"||(t.jewelleryType||"").toLowerCase()==="engagement rings"||(t.jewelleryType||"").toLowerCase()==="wedding bands"||(((lt=t.category)==null?void 0:lt.name)||"").toLowerCase().includes("ring")||(t.name||"").toLowerCase().includes("ring")||t.enableRingSize===!0)&&!(t.jewelleryType||"").toLowerCase().includes("earring")&&!(t.jewelleryType||"").toLowerCase().includes("necklace")&&!(t.jewelleryType||"").toLowerCase().includes("bracelet")&&!(t.jewelleryType||"").toLowerCase().includes("pendant")),De=(t.variations||[]).find(i=>{const r=i.metal?i.metal.toLowerCase()===I.toLowerCase():!0,s=me&&g!=="Select"&&i.ringSize?String(i.ringSize)===String(g):!0;return r&&s}),ke=!!(t.onSale||t.salePrice&&Number(t.salePrice)>0),Me=t.comparePrice?Number(t.comparePrice):ke&&t.salePrice?Number(t.originalPublicPrice||t.price):null;let Be=De==null?void 0:De.price;if(!Be){const i=(t.metalsConfig||[]).find(r=>r.label===I);Be=(t.price||2500)+((i==null?void 0:i.priceAdjustment)||0)}const rt=Object.values(G).reduce((i,r)=>i+(r.priceAdjustment||0),0),le=Be+rt;let Se=null;if(Me&&Me>t.price){const i=(t.metalsConfig||[]).find(r=>r.label===I);Se=Me+((i==null?void 0:i.priceAdjustment)||0)+rt}const ot=(t.metalsConfig&&t.metalsConfig.length>0?t.metalsConfig.filter(i=>!String(i.label||"").toLowerCase().includes("platinum")):[{label:"14K Yellow Gold",code:"14k",circleColor:"#E8C872"},{label:"14K White Gold",code:"14k",circleColor:"#CBD5E1"},{label:"14K Rose Gold",code:"14k",circleColor:"#E4A8A5"},{label:"18K Yellow Gold",code:"18k",circleColor:"#E8C872"},{label:"18K White Gold",code:"18k",circleColor:"#CBD5E1"},{label:"18K Rose Gold",code:"18k",circleColor:"#E4A8A5"},{label:"Silver",code:"Ag",circleColor:"#E2E8F0"}]).filter(i=>{const r=String(i.label||"").toLowerCase();return!r.includes("9k")&&!r.includes("10k")&&!r.includes("platinum")}),Pt=["Select","US 4","US 4.5","US 5","US 5.5","US 6","US 6.5","US 7","US 7.5","US 8","US 8.5","US 9","US 9.5","US 10","US 10.5","US 11","US 11.5","US 12"];let ce=[];try{t.customOptions?ce=typeof t.customOptions=="string"?JSON.parse(t.customOptions):t.customOptions:t.customOptionsJson&&(ce=typeof t.customOptionsJson=="string"?JSON.parse(t.customOptionsJson):t.customOptionsJson)}catch{}let J=[];try{t.detailSections&&Array.isArray(t.detailSections)&&t.detailSections.length>0?J=[...t.detailSections]:t.accordionsConfig&&(J=typeof t.accordionsConfig=="string"?JSON.parse(t.accordionsConfig):[...t.accordionsConfig])}catch{}(!J||J.length===0)&&(J=[...yt]);const Ot=t.fullDescription||t.description||t.shortDescription,he=Cn(Ot,t.title||t.name);if(he&&typeof he=="string"&&he.trim()!==""){const i=J.findIndex(r=>r.id==="overview"||(r.title||"").toUpperCase().includes("DESCRIPTION")||(r.title||"").toUpperCase().includes("OVERVIEW"));i!==-1?J[i]={...J[i],title:"PRODUCT OVERVIEW & DESCRIPTION",content:he.trim(),enabled:!0}:J.unshift({id:"overview",title:"PRODUCT OVERVIEW & DESCRIPTION",content:he.trim(),enabled:!0,defaultOpen:!0})}const Dt=J.filter(i=>i.isActive!==!1&&i.enabled!==!1),Fe=me&&t.isRingSizeRequired!==!1,st=()=>{if(Fe&&(g==="Select"||!g)){Q(!0),ge("Please select a US Ring Size before adding to your bag.","warning");return}Q(!1);const i={};if(t.enableCustomOptions){for(const r of ce)if(r.required){const s=G[r.title||r.name||r.label];(!s||!s.value||!s.value.trim())&&(i[r.title||r.name||r.label]=`Please complete required option: ${r.title||r.name||r.label}`)}}if(Object.keys(i).length>0){V(i),ge(Object.values(i)[0],"warning");return}V({}),Qe(t,W,I,me?g==="Select"?"US 7":g:void 0,fe,G,le),ge("Product successfully added to your shopping bag!","success")},at=()=>{if(Fe&&(g==="Select"||!g)){Q(!0),ge("Please select a US Ring Size before proceeding to checkout.","warning");return}Q(!1);const i={};if(t.enableCustomOptions){for(const r of ce)if(r.required){const s=G[r.title||r.name||r.label];(!s||!s.value||!s.value.trim())&&(i[r.title||r.name||r.label]=`Please complete required option: ${r.title||r.name||r.label}`)}}if(Object.keys(i).length>0){V(i),ge(Object.values(i)[0],"warning");return}V({}),Qe(t,W,I,me?g==="Select"?"US 7":g:void 0,fe,G,le),x("/checkout")};return e.jsxs(Ve,{children:[e.jsxs(Te,{children:[e.jsxs(Ke,{children:[e.jsx(K,{to:"/",children:"Home"})," / ",e.jsx(K,{to:"/collections",children:((ct=t.category)==null?void 0:ct.name)||t.jewelleryType||"Jewellery"})," / ",e.jsx("span",{className:"current",children:t.title||t.name})]}),e.jsxs(Ri,{children:[e.jsx(Li,{children:e.jsx(Pi,{ref:L,children:e.jsx(Oi,{className:"desktop-image-grid",children:U.map((i,r)=>e.jsxs(Di,{onClick:()=>{m(r),u(!0)},children:[e.jsx(bt,{src:i,alt:`${t.title||t.name} view ${r+1}`}),e.jsxs("div",{className:"zoom-hint",children:[e.jsx(wt,{size:12}),"Click to expand"]})]},`gallery_${i}_${r}`))})})}),e.jsxs(Mi,{children:[U.length>0&&e.jsxs(Wi,{children:[w+1," / ",U.length]}),U.length>1&&w>0&&e.jsx(mt,{$dir:"left",onClick:()=>Oe(w-1),"aria-label":"Previous Image",children:e.jsx(Ee,{size:20})}),U.length>1&&w<U.length-1&&e.jsx(mt,{$dir:"right",onClick:()=>Oe(w+1),"aria-label":"Next Image",children:e.jsx(Ie,{size:20})}),e.jsx(Bi,{ref:f,onScroll:$t,children:U.map((i,r)=>e.jsx(Fi,{onClick:()=>{m(r),u(!0)},children:e.jsx(bt,{src:i,alt:`${t.title||t.name} view ${r+1}`})},`mob_${r}`))}),e.jsx(_i,{children:U.map((i,r)=>e.jsx("span",{className:w===r?"active":"",onClick:()=>Oe(r)},r))})]}),e.jsx(si,{images:U,activeIndex:w,productName:t.title||t.name,isOpen:v,onClose:()=>u(!1),onSelectIndex:i=>m(i)}),e.jsxs(Gi,{children:[e.jsxs(Ui,{children:[e.jsxs("div",{children:[e.jsx("h1",{children:t.title||t.name}),e.jsxs(Yi,{children:[e.jsxs("span",{className:"stars",children:["★".repeat(Math.round(tt??t.avgRating??5)),"☆".repeat(5-Math.round(tt??t.avgRating??5))]}),e.jsx("span",{children:ve!==null&&ve>0?`(${ve} ${ve===1?"review":"reviews"})`:t.reviewCount!==void 0&&t.reviewCount>0?`(${t.reviewCount} ${t.reviewCount===1?"review":"reviews"})`:"(No reviews yet)"})]})]}),e.jsx("button",{className:`wishlist-btn ${nt?"active":""}`,onClick:()=>Et(t),title:"Save to Wishlist",children:e.jsx(Gt,{size:20,fill:nt?"#c00":"none"})})]}),e.jsxs(ye,{children:[e.jsxs(Ji,{style:{marginTop:0,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"},children:[e.jsxs("span",{className:"current-price",style:{color:ke?"#d93838":"#1f1f1f",fontWeight:700},children:["$",le.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})]}),Se&&Se>le&&e.jsxs("span",{className:"compare-price",style:{fontSize:"1.2rem",color:"#999388",textDecoration:"line-through"},children:["$",Se.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})]}),ke&&e.jsx("span",{style:{background:"#d93838",color:"#fff",fontSize:"0.75rem",fontWeight:700,padding:"4px 10px",borderRadius:4,letterSpacing:"0.04em"},children:"🏷️ ON SALE"})]}),!!(ke&&t.saleEndsAt)&&e.jsx(Sn,{saleEndsAt:t.saleEndsAt})]}),t.enableMetalSelection!==!1&&e.jsxs(ye,{children:[e.jsxs(Hi,{children:[e.jsx("span",{className:"label",children:"Metal Type:"}),e.jsx("span",{className:"value",children:I})]}),e.jsx(Vi,{children:(t.metalsConfig&&Array.isArray(t.metalsConfig)&&t.metalsConfig.length>0?ot.filter(i=>t.metalsConfig.some(r=>(r.label||r.name||String(r)).toLowerCase()===i.label.toLowerCase()||(r.code||String(r)).toLowerCase()===i.code.toLowerCase())):ot).map((i,r)=>e.jsx(Ki,{$isSelected:I===i.label,$circleBorderColor:i.circleColor,onClick:()=>{H(i.label),d(i.code)},title:i.label,children:e.jsx("div",{className:"circle-ring",children:i.code})},r))})]}),me&&e.jsxs(ye,{children:[e.jsxs(qi,{children:[e.jsxs("span",{className:"label-title",children:["Ring Size ",Fe?e.jsx("span",{style:{color:"#d9534f"},children:"*"}):e.jsx("span",{style:{color:"#888",fontWeight:400,fontSize:"0.75rem"},children:"(Optional)"}),":"]}),e.jsxs(Xi,{ref:D,children:[e.jsxs(Zi,{onClick:()=>Z(!N),children:[e.jsx("span",{className:g!=="Select"?"selected-val":"placeholder-val",children:g}),e.jsx("span",{className:"arrow-icon",children:e.jsx("svg",{width:"9",height:"6",viewBox:"0 0 9 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M4.5 6L0 0H9L4.5 6Z",fill:"#0c1938"})})})]}),N&&e.jsx(Qi,{children:(t.availableRingSizes||Pt).map(i=>e.jsx("div",{className:`option-item ${g===i?"selected":""}`,onClick:()=>{B(i),Z(!1),Q(!1)},children:i},i))})]}),e.jsx(K,{to:"/education/rings/find-your-ring-size",className:"guide-link",children:"Ring Size Guide"})]}),$e&&e.jsxs("div",{style:{color:"#d9534f",fontSize:"0.8rem",fontWeight:600,marginTop:8,display:"flex",alignItems:"center",gap:6},children:[e.jsx("span",{children:"⚠️"})," Please select a US Ring Size before adding this ring to your shopping bag."]})]}),e.jsx(ye,{children:e.jsxs(en,{children:[e.jsxs(tn,{type:"button",onClick:()=>Re(!xe),children:[e.jsxs("span",{children:[xe?"−":"+"," Add Free Engraving"]}),e.jsx("span",{className:"info-circle",children:"i"})]}),xe&&e.jsx(nn,{type:"text",maxLength:25,placeholder:"Enter custom laser text (Max 25 characters)",value:fe,onChange:i=>Le(i.target.value.slice(0,25))})]})}),!!t.enableCustomOptions&&ce.length>0&&e.jsx(ye,{children:e.jsx(rn,{children:ce.map((i,r)=>{var P,de,ne,Ce;const s=i.title||i.name||i.label;if(!s)return null;const h=i.inputType||i.fieldType||"Text",b=!!te[s],$=Number(i.priceAdjustment)||0;return e.jsxs("div",{children:[e.jsxs(on,{children:[s,(P=G[s])!=null&&P.value?`: ${G[s].value}`:"",i.required&&e.jsx("span",{style:{color:"#c5221f"},children:"*"}),h!=="Checkbox"&&$>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600,marginLeft:6},children:["(+$",$,")"]})]}),h==="Text"&&e.jsx(sn,{type:"text",$hasError:b,maxLength:i.maxCharacterLength||i.maxLength||25,placeholder:i.placeholder||`Enter ${s}...`,value:((de=G[s])==null?void 0:de.value)||"",onChange:z=>{const R=z.target.value;oe(E=>({...E,[s]:{title:s,value:R,priceAdjustment:R.trim()?$:0}})),te[s]&&V(E=>({...E,[s]:""}))}}),h==="Textarea"&&e.jsx(an,{rows:2,$hasError:b,maxLength:i.maxCharacterLength||i.maxLength||100,placeholder:i.placeholder||`Enter ${s}...`,value:((ne=G[s])==null?void 0:ne.value)||"",onChange:z=>{const R=z.target.value;oe(E=>({...E,[s]:{title:s,value:R,priceAdjustment:R.trim()?$:0}})),te[s]&&V(E=>({...E,[s]:""}))}}),h==="Dropdown"&&e.jsxs(ln,{$hasError:b,value:((Ce=G[s])==null?void 0:Ce.value)||"",onChange:z=>{const E=(i.choices||i.values||[]).find(Y=>(Y.label||Y.value||Y)===z.target.value),O=typeof E=="object"?Number(E.priceAdjustment)||0:$;oe(Y=>({...Y,[s]:{title:s,value:z.target.value,priceAdjustment:z.target.value?O:0}})),te[s]&&V(Y=>({...Y,[s]:""}))},children:[e.jsxs("option",{value:"",children:["-- Select ",s," --"]}),(i.choices||i.values||[]).map((z,R)=>{const E=typeof z=="string"?z:z.label||z.value,O=typeof z=="object"&&Number(z.priceAdjustment)||0;return e.jsxs("option",{value:E,children:[E," ",O>0?`(+$${O})`:""]},R)})]}),h==="Radio"&&e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:(i.choices||i.values||[]).map((z,R)=>{var Y;const E=typeof z=="string"?z:z.label||z.value,O=typeof z=="object"?Number(z.priceAdjustment)||0:$;return e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,fontSize:"0.88rem",cursor:"pointer",color:"#0c1938"},children:[e.jsx("input",{type:"radio",name:`opt_${s}`,checked:((Y=G[s])==null?void 0:Y.value)===E,onChange:()=>{oe(q=>({...q,[s]:{title:s,value:E,priceAdjustment:O}})),te[s]&&V(q=>({...q,[s]:""}))},style:{accentColor:"#0c1938",cursor:"pointer"}}),E," ",O>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600},children:["(+$",O,")"]})]},R)})}),h==="Checkbox"&&(()=>{var E;const z=i.checkboxOptions&&Array.isArray(i.checkboxOptions)&&i.checkboxOptions.length>0?i.checkboxOptions:i.choices&&Array.isArray(i.choices)&&i.choices.length>0?i.choices:[{id:"cb_default",label:i.checkboxLabel!==void 0&&i.checkboxLabel!==""?i.checkboxLabel:s,priceAdjustment:$}],R=((E=G[s])==null?void 0:E.value)||"";return e.jsx("div",{children:e.jsx(cn,{children:z.map((O,Y)=>{const q=typeof O=="string"?O:O.label||O.value;if(!q)return null;const We=typeof O=="object"&&Number(O.priceAdjustment)||0,dt=R===q;return e.jsxs(dn,{type:"button",$isSelected:dt,onClick:()=>{oe(dt?be=>({...be,[s]:{title:s,value:"",priceAdjustment:0}}):be=>({...be,[s]:{title:s,value:q,priceAdjustment:We}})),te[s]&&V(be=>({...be,[s]:""}))},children:[e.jsx("span",{children:q}),We>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600,marginLeft:6},children:["(+$$",We,")"]})]},O.id||Y)})})})})(),b&&e.jsx("div",{style:{fontSize:"0.78rem",color:"#c5221f",marginTop:4},children:te[s]})]},i.id||r)})})}),e.jsxs(pn,{style:{marginTop:4},children:[ie!=null&&ie.active?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10,width:"100%"},children:[e.jsx("button",{disabled:!0,style:{width:"100%",padding:"16px 24px",background:"#e2e8f0",color:"#64748b",border:"1px solid #cbd5e1",borderRadius:4,fontWeight:700,fontSize:"0.85rem",letterSpacing:"0.08em",textTransform:"uppercase",cursor:"not-allowed"},children:"ORDERS TEMPORARILY UNAVAILABLE"}),e.jsx("div",{style:{fontSize:"0.82rem",color:"#c53030",background:"#fff5f5",border:"1px solid #feb2b2",padding:"10px 14px",borderRadius:4,textAlign:"center",lineHeight:1.5},children:ie.message||"Orders are temporarily unavailable while Holiday Mode is active. Please check back soon."})]}):e.jsxs(xn,{children:[(l==null?void 0:l.showQuantitySelector)!==!1&&e.jsx("div",{className:"qty-selector-col",children:e.jsxs(fn,{children:[e.jsx("button",{type:"button",onClick:()=>je(W-1),"aria-label":"Decrease quantity",children:e.jsx(xt,{size:14})}),e.jsx("span",{children:W}),e.jsx("button",{type:"button",onClick:()=>je(W+1),"aria-label":"Increase quantity",children:e.jsx(ft,{size:14})})]})}),e.jsx("div",{className:"add-bag-col",children:e.jsxs(gn,{onClick:st,children:["ADD TO BAG • $",(le*W).toLocaleString()]})}),(l==null?void 0:l.showBuyNowButton)!==!1&&e.jsx("div",{className:"buy-now-col",children:e.jsxs(un,{onClick:at,children:[e.jsx(Ut,{size:16})," BUY IT NOW"]})})]}),M.enableConsultAtelierExpert!=="false"&&e.jsx(mn,{onClick:()=>ee(!0),children:"CONSULT AN ATELIER EXPERT"})]}),(l==null?void 0:l.showBenefits)!==!1&&e.jsx(hn,{children:l!=null&&l.benefitsJson?(()=>{try{return(typeof l.benefitsJson=="string"?JSON.parse(l.benefitsJson):l.benefitsJson).filter(r=>r.isActive!==!1).map((r,s)=>e.jsxs("div",{className:"benefit-item",children:[r.icon==="Truck"&&e.jsx(Ue,{size:16}),r.icon==="ShieldCheck"&&e.jsx(Ye,{size:16}),r.icon==="Award"&&e.jsx(Je,{size:16}),r.icon==="Sparkles"&&e.jsx(Ge,{size:16}),(!r.icon||!["Truck","ShieldCheck","Award","Sparkles"].includes(r.icon))&&e.jsx(Yt,{size:16}),r.title]},r.id||s))}catch{return null}})():e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"benefit-item",children:[e.jsx(Ue,{size:16})," Free Insured Delivery"]}),e.jsxs("div",{className:"benefit-item",children:[e.jsx(Ye,{size:16})," Lifetime Service Warranty"]}),e.jsxs("div",{className:"benefit-item",children:[e.jsx(Je,{size:16})," GIA / IGI Certification"]})]})}),e.jsx(bn,{style:{marginTop:24},children:Dt.map((i,r)=>{const s=i.id||i.title||`acc_${r}`,h=Pe===s;return e.jsxs(Ne.Fragment,{children:[e.jsxs(yn,{onClick:()=>Nt(s),children:[e.jsx("span",{children:i.title}),e.jsx("span",{children:h?"−":"+"})]}),e.jsxs(wn,{$open:h,children:[i.description&&e.jsx("div",{style:{fontSize:"0.85rem",color:"#55524d",marginBottom:i.items&&i.items.length>0?12:0,lineHeight:1.6},children:i.description}),i.items&&Array.isArray(i.items)&&i.items.length>0?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:i.type==="SPECIFICATIONS"||(i.title||"").toUpperCase().includes("SPECIFICATION")?e.jsxs("div",{style:{background:"#faf8f5",border:"1px solid #e8e3d9",padding:16,borderRadius:6},children:[e.jsx("div",{style:{fontSize:"0.78rem",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#c9a45c",marginBottom:10},children:"SPECIFICATION DETAILS"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"10px 16px",fontSize:"0.85rem"},children:i.items.map((b,$)=>e.jsxs("div",{children:[b.title&&e.jsxs("strong",{style:{color:"#19202a"},children:[b.title,": "]}),e.jsx("span",{children:b.value||b.description||"-"})]},b.id||$))})]}):i.items.map((b,$)=>e.jsxs("div",{style:{background:"#faf8f5",border:"1px solid #e8e3d9",padding:14,borderRadius:6,display:"flex",flexDirection:"column",gap:6},children:[b.imageUrl&&e.jsx("img",{src:b.imageUrl,alt:b.title||"Atelier Media",style:{width:"100%",maxHeight:220,objectFit:"cover",borderRadius:4,marginBottom:6}}),(b.title||b.icon)&&e.jsxs("div",{style:{fontSize:"0.92rem",fontWeight:700,color:"#19202a",display:"flex",alignItems:"center",gap:8},children:[b.icon==="Truck"&&e.jsx(Ue,{size:16,color:"#c9a45c"}),b.icon==="ShieldCheck"&&e.jsx(Ye,{size:16,color:"#c9a45c"}),b.icon==="Award"&&e.jsx(Je,{size:16,color:"#c9a45c"}),b.icon==="Sparkles"&&e.jsx(Ge,{size:16,color:"#c9a45c"}),b.title]}),b.value&&e.jsx("div",{style:{fontSize:"0.88rem",fontWeight:600,color:"#c9a45c"},children:b.value}),b.description&&e.jsx("div",{style:{fontSize:"0.85rem",color:"#555",lineHeight:1.5},children:b.description})]},b.id||$))}):!i.description&&e.jsx("div",{style:{whiteSpace:"pre-line",fontSize:"0.88rem",color:"#4a4843",lineHeight:1.7},children:i.content||"Information for this section."})]})]},s)})})]})]})]}),e.jsx(Ei,{items:S,currentProductId:t.id,content:l}),e.jsx(gi,{content:l}),e.jsx(zi,{productName:t.name||t.title,content:l,productId:t.id,reviews:t.reviews}),e.jsx($i,{currentProductId:t.id,content:l}),_&&M.enableConsultAtelierExpert!=="false"&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsxs("div",{style:{background:"#fff",padding:32,borderRadius:8,maxWidth:500,width:"90%",textAlign:"center"},children:[e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",marginBottom:12},children:M.consultTitle||"Consult a Floksy Atelier Expert"}),e.jsx("p",{style:{fontSize:"0.9rem",color:"#666",marginBottom:20,whiteSpace:"pre-line"},children:M.consultDescription||"Speak directly with our Floksy Jewel specialists regarding custom design, diamond selection, or sizing guidance."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,marginBottom:20},children:[M.consultPhone&&M.consultPhone.trim()!==""&&e.jsxs("a",{href:`tel:${M.consultPhone.replace(/[^\d+]/g,"")}`,style:{padding:"12px",background:"#faf8f5",border:"1px solid #e8e3d9",borderRadius:4,textDecoration:"none",color:"#19202a",fontWeight:600},children:["☎ ",M.consultPhoneLabel||"Call Atelier",": ",M.consultPhone]}),M.consultEmail&&M.consultEmail.trim()!==""&&e.jsxs("a",{href:`mailto:${M.consultEmail.trim()}`,style:{padding:"12px",background:"#faf8f5",border:"1px solid #e8e3d9",borderRadius:4,textDecoration:"none",color:"#19202a",fontWeight:600},children:["✉ ",M.consultEmailLabel||"Email Concierge",": ",M.consultEmail]})]}),e.jsx("button",{onClick:()=>ee(!1),style:{padding:"10px 24px",background:"#19202a",color:"#fff",border:"none",borderRadius:4,cursor:"pointer",fontWeight:600},children:M.consultCloseLabel||"Close"})]})}),e.jsxs(jn,{$show:se.show,$type:se.type,children:[e.jsx("div",{className:"toast-icon",children:se.type==="success"?e.jsx(Jt,{size:22}):e.jsx(pt,{size:22})}),e.jsx("div",{className:"toast-content",children:se.message}),e.jsx("button",{className:"toast-close",onClick:()=>Ct(i=>({...i,show:!1})),children:e.jsx(Xe,{size:16})}),se.show&&e.jsx("div",{className:"progress-bar"},se.message)]}),e.jsx(vn,{$show:C&&!(ie!=null&&ie.active)&&(l==null?void 0:l.showStickyBar)!==!1,children:e.jsxs("div",{className:"sticky-inner",children:[e.jsxs("div",{className:"product-info",children:[e.jsx("img",{src:Lt,alt:(t==null?void 0:t.title)||(t==null?void 0:t.name)||"Jewellery"}),e.jsxs("div",{className:"title-price",children:[e.jsx("div",{className:"title",children:(t==null?void 0:t.title)||(t==null?void 0:t.name)}),e.jsxs("div",{className:"meta-price",children:["$",(le*W).toLocaleString()]})]})]}),e.jsxs("div",{className:"sticky-actions",children:[e.jsxs("div",{className:"sticky-qty",children:[e.jsx("button",{type:"button",onClick:()=>je(W-1),children:e.jsx(xt,{size:12})}),e.jsx("span",{children:W}),e.jsx("button",{type:"button",onClick:()=>je(W+1),children:e.jsx(ft,{size:12})})]}),e.jsx("button",{className:"sticky-btn add-bag",onClick:st,children:"ADD TO BAG"}),e.jsx("button",{className:"sticky-btn buy-now",onClick:at,children:"BUY IT NOW"})]})]})})]})};export{Rn as ProductDetailPage};
