import{r as c,j as e,X as qe,k as Te,l as Ie,aT as Mt,aU as jt,aa as Wt,R as Ne,t as We,ag as _t,ao as Gt,u as Ut,f as X,g as _e,C as gt,H as Ht,M as ut,P as mt,aV as Yt,ax as Ge,v as Ue,aR as He,c as Jt,a as Vt}from"./react-vendor-BsBv4awM.js";import{g as o}from"./ui-vendor-C0FaE403.js";import{S as ht,a as ee,R as Ke,u as Kt,b as qt,c as Xt}from"./admin-pages-SkiHNLol.js";import{P as St}from"./ProductCard-BHZO2nWE.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const Zt=o.div`
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
`,Qt=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
`,ei=o.div`
  color: #fffdf9;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  letter-spacing: 0.05em;
`,ti=o.button`
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
`,ii=o.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
`,ri=o.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({$isDragging:r})=>r?"grabbing":"grab"};
  transition: ${({$isDragging:r})=>r?"none":"transform 0.15s ease-out"};
  max-width: 90vw;
  max-height: 75vh;

  img {
    max-width: 85vw;
    max-height: 70vh;
    object-fit: contain;
    pointer-events: none;
    user-select: none;
  }
`,ft=o.button`
  position: absolute;
  top: 50%;
  ${({$direction:r})=>r==="left"?"left: 20px;":"right: 20px;"}
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
    ${({$direction:r})=>r==="left"?"left: 8px;":"right: 8px;"}
  }
`,ni=o.div`
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
`,Ye=o.button`
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
`,oi=o.span`
  color: #c9a45c;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 48px;
  text-anchor: middle;
  text-align: center;
`,si=o.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  overflow-x: auto;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  z-index: 10;
  -webkit-overflow-scrolling: touch;
`,ai=o.button`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 4px;
  border: ${({$active:r})=>r?"2px solid #C9A45C":"1px solid rgba(255, 253, 249, 0.2)"};
  opacity: ${({$active:r})=>r?1:.6};
  transform: ${({$active:r})=>r?"scale(1.05)":"scale(1)"};
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
`,li=({images:r,activeIndex:x,productName:i,isOpen:b,onClose:C,onSelectIndex:j})=>{const[w,h]=c.useState(1),[v,m]=c.useState({x:0,y:0}),[l,S]=c.useState(!1),[T,z]=c.useState({x:0,y:0}),[g,F]=c.useState(null),[D,N]=c.useState(0),V=c.useRef(null);if(c.useEffect(()=>{h(1),m({x:0,y:0})},[x,b]),c.useEffect(()=>{const p=k=>{k.key==="Escape"&&b&&C()};return window.addEventListener("keydown",p),()=>window.removeEventListener("keydown",p)},[b,C]),!b||r.length===0)return null;const le=r[x]||r[0],d=()=>{h(p=>Math.min(p+.5,3.5))},u=()=>{h(p=>{const k=Math.max(p-.5,1);return k===1&&m({x:0,y:0}),k})},O=()=>{h(1),m({x:0,y:0})},B=p=>{p==null||p.stopPropagation(),O(),j(x===0?r.length-1:x-1)},te=p=>{p==null||p.stopPropagation(),O(),j(x===r.length-1?0:x+1)},Be=p=>{p.preventDefault(),p.deltaY<0?h(k=>Math.min(k+.25,3.5)):h(k=>{const M=Math.max(k-.25,1);return M===1&&m({x:0,y:0}),M})},ie=p=>{w<=1||(S(!0),z({x:p.clientX-v.x,y:p.clientY-v.y}))},Xe=p=>{if(!l||w<=1)return;const k=p.clientX-T.x,M=p.clientY-T.y,_=(w-1)*300,re=Math.max(-_,Math.min(_,k)),$e=Math.max(-_,Math.min(_,M));m({x:re,y:$e})},Ze=()=>{S(!1)},ye=p=>{if(p.touches.length===2){const M=Math.hypot(p.touches[0].clientX-p.touches[1].clientX,p.touches[0].clientY-p.touches[1].clientY);F(M);return}const k=Date.now();k-D<300&&(w>1?O():h(2)),N(k),w>1&&p.touches.length===1&&(S(!0),z({x:p.touches[0].clientX-v.x,y:p.touches[0].clientY-v.y}))},Qe=p=>{if(p.touches.length===2&&g!==null){const k=Math.hypot(p.touches[0].clientX-p.touches[1].clientX,p.touches[0].clientY-p.touches[1].clientY),M=k-g;Math.abs(M)>4&&(h(_=>{const re=Math.min(Math.max(_+(M>0?.08:-.08),1),3.5);return re===1&&m({x:0,y:0}),re}),F(k));return}if(l&&w>1&&p.touches.length===1){const k=p.touches[0].clientX-T.x,M=p.touches[0].clientY-T.y,_=(w-1)*300;m({x:Math.max(-_,Math.min(_,k)),y:Math.max(-_,Math.min(_,M))})}},W=()=>{S(!1),F(null)};return e.jsxs(Zt,{onClick:C,children:[e.jsxs(Qt,{onClick:p=>p.stopPropagation(),children:[e.jsx(ei,{children:i}),e.jsx(ti,{onClick:C,"aria-label":"Close Lightbox",children:e.jsx(qe,{size:20})})]}),e.jsxs(ii,{ref:V,onWheel:Be,onMouseDown:ie,onMouseMove:Xe,onMouseUp:Ze,onTouchStart:ye,onTouchMove:Qe,onTouchEnd:W,onClick:p=>p.stopPropagation(),children:[e.jsx(ri,{$isDragging:l,style:{transform:`translate3d(${v.x}px, ${v.y}px, 0) scale(${w})`},children:e.jsx(ht,{src:le,alt:i})}),r.length>1&&e.jsxs(e.Fragment,{children:[e.jsx(ft,{$direction:"left",onClick:B,"aria-label":"Previous Image",children:e.jsx(Te,{size:24})}),e.jsx(ft,{$direction:"right",onClick:te,"aria-label":"Next Image",children:e.jsx(Ie,{size:24})})]}),e.jsxs(ni,{onClick:p=>p.stopPropagation(),children:[e.jsx(Ye,{onClick:u,disabled:w<=1,title:"Zoom Out",children:e.jsx(Mt,{size:18})}),e.jsxs(oi,{children:[Math.round(w*100),"%"]}),e.jsx(Ye,{onClick:d,disabled:w>=3.5,title:"Zoom In",children:e.jsx(jt,{size:18})}),e.jsx(Ye,{onClick:O,title:"Reset Zoom",children:e.jsx(Wt,{size:16})})]})]}),r.length>1&&e.jsx(si,{onClick:p=>p.stopPropagation(),children:r.map((p,k)=>e.jsx(ai,{$active:x===k,onClick:()=>{O(),j(k)},"aria-label":`View image ${k+1}`,children:e.jsx(ht,{src:p,alt:`${i} thumbnail ${k+1}`})},k))})]})},a={white:"#151515",primaryText:"#F5F1E8",secondaryText:"#A8A8A8",gold:"#C9A96E",darkGold:"#8C744B",lightGold:"#DFCA9B",border:"rgba(140, 116, 75, 0.25)"},ci=o.section`
  width: 100%;
  max-width: 100%;
  background-color: #0B0B0B;
  border-top: 1px solid ${a.border};
  border-bottom: 1px solid ${a.border};
  padding: 64px 48px;
  margin-top: 64px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 32px 16px;
    margin-top: 40px;
  }
`,di=o.div`
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
`,pi=o.div`
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
`,xi=o.div`
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
`,gi=o.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${a.border};
`,ui=o.div`
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
`,mi=o.div`
  display: ${({$isOpen:r})=>r?"block":"none"};
  padding: 0 0 16px 0;
  font-size: 0.88rem;
  color: ${a.secondaryText};
  line-height: 1.6;
`,hi=({content:r})=>{const[x,i]=c.useState(null);if(r&&r.showPackagingSection===!1)return null;const b=v=>v?v.replace(/FedEx\s+Priority\s+Air/gi,"Priority Air").replace(/FedEx\s+locations/gi,"express courier locations").replace(/FedEx/gi,"Priority Air").replace(/We\s+also\s+offer\s+a\s+30-day\s+return\s+policy,\s+subject\s+to\s+our\s+return\s+terms\s+and\s+conditions\./gi,"").replace(/30-day\s+return\s+policy\./gi,"").trim():"";let C=[{title:"Discreet Packaging",content:"Every order is shipped in plain, unbranded outer security boxes. There is no mention of AethelCarats or diamond jewelry on the package exterior for 100% privacy and security."},{title:"Secure and Convenient Pickup Option",content:"Hold your order for pick up at thousands of secure express courier locations or choose insured signature delivery directly to your doorstep."},{title:"SHIPPING & DELIVERY",content:"After order confirmation, your order will be dispatched within 7-10 working days. Once dispatched, delivery is estimated within an additional 7-10 working days. All shipments are sent via fully insured Priority Air for secure and reliable delivery."}];if(r&&r.packagingItemsJson)try{const v=typeof r.packagingItemsJson=="string"?JSON.parse(r.packagingItemsJson):r.packagingItemsJson;Array.isArray(v)&&v.length>0&&(C=v.filter(m=>m.isActive!==!1).map(m=>({title:m.title,content:b(m.description||m.content)})))}catch{}const j=(r==null?void 0:r.packagingHeading)||"We're committed to making your entire experience a pleasant one, from shopping to shipping.",w=(r==null?void 0:r.packagingDescription)||"Every item we send comes in our signature AethelCarats packaging. Engagement rings arrive in a deluxe velvet ring box within an elegant presentation box ready for your proposal. The presentation box also secures your appraisal certificate and GIA/IGI diamond grading report. Loose diamonds are presented in a velvet lined diamond case that securely holds the stone.";return e.jsx(Ke,{yOffset:35,children:e.jsx(ci,{children:e.jsxs(di,{children:[e.jsx(pi,{children:e.jsx("img",{src:"/assets/gem_ring_box.png",alt:"AethelCarats Signature Packaging"})}),e.jsxs(xi,{children:[e.jsx("h2",{children:j}),e.jsx("p",{children:w}),e.jsx(gi,{children:C.map((v,m)=>e.jsxs(Ne.Fragment,{children:[e.jsxs(ui,{onClick:()=>i(x===m?null:m),children:[e.jsx("span",{children:v.title}),e.jsx("span",{style:{fontSize:"1.2rem",color:a.gold},children:x===m?"−":"+"})]}),e.jsx(mi,{$isOpen:x===m,children:v.content})]},m))})]})]})})})},fi=o.section`
  max-width: 1280px;
  margin: 80px auto 0;
  padding: 0 24px;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px;
  }
`,bi=o.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  text-align: center;
  color: ${a.primaryText};
  margin-bottom: 40px;
`,yi=o.div`
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
`,wi=o.div`
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
`,vi=o.button`
  padding: 14px 28px;
  background-color: ${a.gold};
  color: #0B0B0B;
  border: 1px solid ${a.gold};
  border-radius: 24px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${a.lightGold};
    border-color: ${a.lightGold};
    color: #0B0B0B;
  }
`,ji=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid ${a.border};
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;
`,ke=o.div`
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
`,Si=o.div`
  display: flex;
  gap: 24px;
  padding: 32px 0;
  border-bottom: 1px solid ${a.border};

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
  }
`,Ci=o.div`
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
    background-color: #1F1F1F;
    color: ${a.gold};
    border: 1px solid ${a.border};
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
`,Ai=o.div`
  position: fixed;
  inset: 0;
  background: rgba(28, 28, 28, 0.6);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`,Ei=o.div`
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
`,zi=({productName:r="AethelCarats Creation",content:x,productId:i,reviews:b})=>{const[C,j]=c.useState(!1),[w,h]=c.useState(5),[v,m]=c.useState(""),[l,S]=c.useState(""),[T,z]=c.useState("");if(x&&(x.reviewsEnabled===!1||x.showReviews===!1))return null;const[g,F]=c.useState(()=>b&&Array.isArray(b)&&b.length>0?b.map((d,u)=>({id:d.id||`rev_${u}`,name:d.author||d.name||d.authorName||"Verified Buyer",verified:!0,rating:Number(d.rating)||5,title:d.title||(d.comment?d.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:d.date||(d.createdAt?new Date(d.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:d.text||d.comment||d.content||"",productReviewed:d.productReviewed||r,response:d.response||null})):[]);c.useEffect(()=>{let d=!0;return b&&Array.isArray(b)&&b.length>0?F(b.map((u,O)=>({id:u.id||`rev_${O}`,name:u.author||u.name||u.authorName||"Verified Buyer",verified:!0,rating:Number(u.rating)||5,title:u.title||(u.comment?u.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:u.date||(u.createdAt?new Date(u.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:u.text||u.comment||u.content||"",productReviewed:u.productReviewed||r,response:u.response||null}))):ee.get("/reviews"+(i?`?productId=${i}`:"")).then(u=>{if(!d)return;const O=Array.isArray(u.data)?u.data:Array.isArray(u)?u:[];O.length>0&&F(O.map((B,te)=>({id:B.id||`rev_${te}`,name:B.author||B.name||B.authorName||"Verified Buyer",verified:!0,rating:Number(B.rating)||5,title:B.title||(B.comment?B.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:B.date||(B.createdAt?new Date(B.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:B.text||B.comment||B.content||"",productReviewed:B.productReviewed||r,response:B.response||null})))}).catch(console.error),()=>{d=!1}},[i,b,r]);const D=d=>{if(d.preventDefault(),!v||!l||!T){alert("Please fill in all required fields.");return}const u={id:`rev_${Date.now()}`,name:v,verified:!0,rating:w,title:l,date:new Date().toLocaleDateString("en-US"),text:T,productReviewed:r,response:"Thank you for sharing your experience with AethelCarats!"};F([u,...g]),j(!1),m(""),S(""),z(""),alert("Thank you! Your review has been submitted successfully.")},N=(x==null?void 0:x.reviewsTitle)||"Item Reviews";x==null||x.reviewsVerifiedBadge;const V=(x==null?void 0:x.reviewsSubmissionEnabled)??!0,le=g.length>0?(g.reduce((d,u)=>d+(Number(u.rating)||5),0)/g.length).toFixed(1):"5.0";return e.jsxs(fi,{children:[e.jsx(bi,{children:N}),e.jsxs(yi,{children:[e.jsxs(wi,{children:[e.jsx("div",{className:"score-num",children:le}),e.jsxs("div",{className:"stars-col",children:[e.jsx("div",{className:"stars-row",children:[...Array(5)].map((d,u)=>e.jsx(We,{size:18,fill:u<Math.round(Number(le))?a.gold:"none",color:a.gold},u))}),e.jsxs("div",{className:"rev-count",children:[g.length," Verified ",g.length===1?"Review":"Reviews"]})]})]}),V&&e.jsx(vi,{onClick:()=>j(!0),children:"Write A Review"})]}),e.jsxs(ji,{children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:[e.jsxs(ke,{children:[e.jsx("input",{type:"checkbox",id:"withMedia",defaultChecked:!0,style:{accentColor:a.gold}}),e.jsx("label",{htmlFor:"withMedia",children:"With media"})]}),e.jsx(ke,{children:e.jsxs("select",{defaultValue:"all",children:[e.jsx("option",{value:"all",children:"Recommendation (All)"}),e.jsx("option",{value:"yes",children:"Recommends Product"})]})}),e.jsx(ke,{children:e.jsxs("select",{defaultValue:"exceeds",children:[e.jsx("option",{value:"exceeds",children:"Expectations (Exceeds)"}),e.jsx("option",{value:"met",children:"Met Expectations"})]})})]}),e.jsxs(ke,{children:[e.jsx("span",{children:"Sort by:"}),e.jsxs("select",{defaultValue:"relevant",children:[e.jsx("option",{value:"relevant",children:"Most relevant"}),e.jsx("option",{value:"newest",children:"Newest first"}),e.jsx("option",{value:"highest",children:"Highest rated"})]})]})]}),e.jsx("div",{children:g.map(d=>e.jsxs(Si,{children:[e.jsxs(Ci,{children:[e.jsx("div",{className:"avatar-circle",children:d.name.charAt(0)}),e.jsx("div",{className:"user-name",children:d.name}),d.verified&&e.jsxs("div",{className:"verified-badge",children:[e.jsx(_t,{size:12,color:a.darkGold})," Verified Buyer"]})]}),e.jsxs(ki,{children:[e.jsxs("div",{className:"review-header",children:[e.jsxs("div",{className:"rating-and-title",children:[e.jsx("div",{className:"stars",children:[...Array(d.rating)].map((u,O)=>e.jsx(We,{size:14,fill:a.gold,color:a.gold},O))}),e.jsx("div",{className:"title",children:d.title})]}),e.jsx("div",{className:"date",children:d.date})]}),e.jsx("div",{className:"body-text",children:d.text}),e.jsxs("div",{className:"product-reviewed",children:["Product reviewed: ",d.productReviewed]}),d.response&&e.jsxs("div",{className:"atelier-response",children:[e.jsx("div",{className:"resp-title",children:"AethelCarats Atelier Team"}),e.jsx("div",{className:"resp-body",children:d.response})]})]})]},d.id))}),C&&e.jsx(Ai,{onClick:()=>j(!1),children:e.jsxs(Ei,{onClick:d=>d.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12},children:[e.jsx("h3",{children:"Write a Review"}),e.jsx(qe,{size:20,style:{cursor:"pointer",color:a.secondaryText},onClick:()=>j(!1)})]}),e.jsxs("p",{children:["Share your authentic experience with ",r,"."]}),e.jsxs("form",{onSubmit:D,style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Rating"}),e.jsx("div",{style:{display:"flex",gap:6},children:[1,2,3,4,5].map(d=>e.jsx(We,{size:24,style:{cursor:"pointer"},fill:d<=w?a.gold:"none",color:a.gold,onClick:()=>h(d)},d))})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Your Name"}),e.jsx("input",{type:"text",required:!0,value:v,onChange:d=>m(d.target.value),placeholder:"e.g. Patty G.",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem",background:"#0B0B0B",color:"#F5F1E8"}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Headline / Title"}),e.jsx("input",{type:"text",required:!0,value:l,onChange:d=>S(d.target.value),placeholder:"e.g. Perfect description & exquisite craftsmanship",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem",background:"#0B0B0B",color:"#F5F1E8"}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Review Details"}),e.jsx("textarea",{required:!0,rows:4,value:T,onChange:d=>z(d.target.value),placeholder:"Write your review here...",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem",fontFamily:"inherit",background:"#0B0B0B",color:"#F5F1E8"}})]}),e.jsx("button",{type:"submit",style:{width:"100%",padding:14,backgroundColor:a.gold,color:"#0B0B0B",border:"none",borderRadius:4,fontWeight:700,fontSize:"0.85rem",cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase"},children:"Submit Verified Review"})]})]})})]})},Ct=o.div`
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
`,ze=o.button`
  position: absolute;
  top: 40%;
  ${({$direction:r})=>r==="left"?"left: -18px;":"right: -18px;"}
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #151515;
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
    ${({$direction:r})=>r==="left"?"left: -8px;":"right: -8px;"}
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
`,Ii=o.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  color: ${a.primaryText};
  margin-bottom: 28px;
`,ge=[{id:"demo_sim_1",name:"Classic Four Prong Solitaire Engagement Ring in 14K Yellow Gold",title:"Classic Four Prong Solitaire Engagement Ring in 14K Yellow Gold",slug:"aura-signature-solitaire-ring",mainImage:"/assets/gem_rings_cat.png",secondaryImage:"/assets/gem_rings_cat_2.png",price:870,basePrice:870,metal:"14K Yellow Gold",category:"Rings"},{id:"demo_sim_2",name:"Petite Micropavé Hidden Halo Engagement Ring in 14K White Gold",title:"Petite Micropavé Hidden Halo Engagement Ring in 14K White Gold",slug:"aura-signature-solitaire-ring",mainImage:"/assets/gem_rings_cat_2.png",secondaryImage:"/assets/gem_rings_cat.png",price:1645,basePrice:1645,metal:"14K White Gold",category:"Rings"},{id:"demo_sim_3",name:"Chain-Set Initial N Necklace With Lab-Grown Diamonds In 14K White Gold",title:"Chain-Set Initial N Necklace With Lab-Grown Diamonds In 14K White Gold",slug:"aura-signature-solitaire-ring",mainImage:"/assets/gem_rings_cat.png",secondaryImage:"/assets/gem_rings_cat_2.png",price:1140,basePrice:1140,metal:"14K White Gold",category:"Necklaces"},{id:"demo_sim_4",name:'7" Four Prong Diamond Tennis Bracelet In 14K White Gold',title:'7" Four Prong Diamond Tennis Bracelet In 14K White Gold',slug:"aura-signature-solitaire-ring",mainImage:"/assets/gem_rings_cat_2.png",secondaryImage:"/assets/gem_rings_cat.png",price:3730,basePrice:3730,metal:"14K White Gold",category:"Bracelets"}],Ni=({items:r=[],currentProductId:x,content:i})=>{const[b,C]=c.useState([]),j=Ne.useRef(null);if(i&&(i.similarItemsEnabled===!1||i.showSimilarItems===!1))return null;const w=(i==null?void 0:i.similarItemsTitle)||"Similar Items";c.useEffect(()=>{let m=Array.isArray(r)?r.filter(l=>l&&l.id!==x):[];ee.getProducts({limit:16,status:"ACTIVE"}).then(l=>{const T=(Array.isArray(l)?l:(l==null?void 0:l.products)||[]).filter(g=>g&&g.id!==x),z=Array.from(new Set([...m,...T]));z.length>0?C(z):C(ge)}).catch(()=>{C(m.length>0?m:ge)})},[r,x]);const h=b.length>0?b:ge,v=m=>{if(j.current){const l=m==="left"?-340:340;j.current.scrollBy({left:l,behavior:"smooth"})}};return e.jsxs(Ti,{children:[e.jsx(Ii,{children:w}),e.jsxs(Ct,{children:[h.length>3&&e.jsx(ze,{$direction:"left",onClick:()=>v("left"),children:e.jsx(Te,{size:22})}),e.jsx(kt,{ref:j,children:h.map((m,l)=>e.jsx(St,{product:m},m.id||`sim_${l}`))}),h.length>3&&e.jsx(ze,{$direction:"right",onClick:()=>v("right"),children:e.jsx(Ie,{size:22})})]})]})},Bi=o.section`
  width: 100%;
  max-width: 100%;
  margin: 80px 0 0;
  padding: 0 48px 80px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px 48px;
  }
`,$i=o.div`
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
`,Ri=({currentProductId:r,content:x})=>{const[i,b]=c.useState([]),C=Ne.useRef(null);if(x&&(x.recentlyViewedEnabled===!1||x.showRecentlyViewed===!1))return null;const j=(x==null?void 0:x.recentlyViewedTitle)||"Recently Viewed";c.useEffect(()=>{let l=[];try{const g=localStorage.getItem("app_recently_viewed");g&&(l=JSON.parse(g))}catch{}const S=new Set,T=g=>{const F=[];g.id&&F.push(`id:${g.id}`),g.slug&&F.push(`slug:${g.slug}`);const D=(g.title||g.name||"").trim().toLowerCase();return D&&F.push(`name:${D}`),F};r&&S.add(`id:${r}`);const z=[];for(const g of l){if(!g)continue;const F=T(g);F.some(N=>S.has(N))||(z.push(g),F.forEach(N=>S.add(N)))}ee.getProducts({limit:16,status:"ACTIVE"}).then(g=>{const F=Array.isArray(g)?g:(g==null?void 0:g.products)||[],D=[...z];for(const N of F){if(!N)continue;const V=T(N);V.some(d=>S.has(d))||(D.push(N),V.forEach(d=>S.add(d)))}b(D.length>0?D:ge)}).catch(()=>{b(z.length>0?z:ge)})},[r]);const w=i.length>0?i:ge,h=new Set,v=w.filter(l=>{if(!l)return!1;const S=l.id?`id:${l.id}`:null,T=l.slug?`slug:${l.slug}`:null,z=(l.title||l.name||"").trim().toLowerCase(),g=z?`name:${z}`:null;return S&&h.has(S)||T&&h.has(T)||g&&h.has(g)?!1:(S&&h.add(S),T&&h.add(T),g&&h.add(g),!0)}),m=l=>{if(C.current){const S=l==="left"?-340:340;C.current.scrollBy({left:S,behavior:"smooth"})}};return e.jsx(Ke,{yOffset:35,children:e.jsxs(Bi,{children:[e.jsxs($i,{children:[e.jsx("h2",{children:j}),e.jsx("a",{href:"/rings",className:"see-all",children:"See All ›"})]}),e.jsxs(Ct,{children:[v.length>3&&e.jsx(ze,{$direction:"left",onClick:()=>m("left"),children:e.jsx(Te,{size:22})}),e.jsx(kt,{ref:C,children:v.map((l,S)=>e.jsx(Ke,{staggerIndex:S,yOffset:25,style:{flexShrink:0},children:e.jsx(St,{product:l})},l.id||`rec_${S}`))}),v.length>3&&e.jsx(ze,{$direction:"right",onClick:()=>m("right"),children:e.jsx(Ie,{size:22})})]})]})})},Je=o.div`
  background-color: #0B0B0B;
  min-height: 100vh;
  width: 100%;
`,Ae=o.div`
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 32px 48px 80px 48px;
  background-color: #0B0B0B;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 24px 24px 60px 24px;
  }
  @media (max-width: 768px) {
    padding: 16px 16px 40px 16px;
  }
`,Ve=o.div`
  font-size: 0.78rem;
  color: #A8A8A8;
  margin-bottom: 28px;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  a {
    color: #A8A8A8;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #C9A96E;
    }
  }

  span.current {
    color: #F5F1E8;
    font-weight: 600;
  }
`,Fi=o.div`
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
`,Pi=o.div`
  width: 100%;
  min-width: 0;
  /* Removed fixed height, align-self, position sticky, and top */
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`,Di=o.div`
  width: 100%;
  /* Removed height, overflow-y: scroll, and scrollbar hiding */
  /* Now it will just flow naturally with the window scroll */
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`,Li=o.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`,Oi=o.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #0B0B0B;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(140, 116, 75, 0.25);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.5);

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
    background: rgba(21, 21, 21, 0.92);
    backdrop-filter: blur(6px);
    color: #F5F1E8;
    padding: 8px 14px;
    border-radius: 20px;
    border: 1px solid rgba(140, 116, 75, 0.3);
    font-size: 0.75rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 6px;
    opacity: 0;
    transition: opacity 0.3s;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
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
`,Wi=o.div`
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
`,_i=o.div`
  flex: 0 0 100%;
  width: 100%;
  aspect-ratio: 1 / 1;
  scroll-snap-align: center;
  scroll-snap-stop: always;
  position: relative;
  background: #0B0B0B;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid rgba(140, 116, 75, 0.25);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    user-select: none;
    -webkit-user-drag: none;
  }
`,bt=o.button`
  position: absolute;
  top: 50%;
  ${({$dir:r})=>r==="left"?"left: 10px;":"right: 10px;"}
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(21, 21, 21, 0.9);
  backdrop-filter: blur(4px);
  border: 1px solid rgba(140, 116, 75, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #F5F1E8;
  z-index: 10;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  transition: transform 0.2s ease;

  &:active {
    transform: translateY(-50%) scale(0.92);
  }
`,Gi=o.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(21, 21, 21, 0.9);
  backdrop-filter: blur(4px);
  color: #C9A96E;
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  z-index: 10;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(140, 116, 75, 0.3);
`,Ui=o.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;

  span {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.25);
    cursor: pointer;
    transition: all 0.2s ease;

    &.active {
      background: #C9A96E;
      width: 24px;
      border-radius: 4px;
    }
  }
`,Hi=o.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  box-sizing: border-box;
  z-index: 10;
  width: 100%;
  min-width: 0;

  @media (min-width: 769px) {
    position: -webkit-sticky;
    position: sticky;
    top: 100px;
    align-self: start;
    height: auto;
    max-height: none;
    overflow: visible;
  }

  @media (max-width: 768px) {
    position: relative;
    top: auto;
    height: auto;
    max-height: none;
    overflow: visible;
  }
`,Yi=o.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 2.2rem;
    font-weight: 500;
    color: #F5F1E8;
    margin: 0 0 8px 0;
    line-height: 1.15;
    letter-spacing: 0.02em;
  }

  .wishlist-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    color: #A8A8A8;
    transition: color 0.2s;

    &:hover {
      color: #E53E3E;
    }

    &.active {
      color: #E53E3E;
    }
  }
`,Ji=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: #A8A8A8;

  .stars {
    color: #C9A96E;
    letter-spacing: 2px;
  }
`,Vi=o.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-top: 4px;

  .current-price {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.85rem;
    font-weight: 600;
    color: #C9A96E;
    letter-spacing: -0.01em;
  }

  .compare-price {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    font-size: 1.15rem;
    font-weight: 400;
    color: #777777;
    text-decoration: line-through;
  }
`,Ee=o.div`
  padding-bottom: 14px;
  margin-bottom: 14px;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);
`,Ki=o.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  margin-bottom: 10px;

  .label {
    color: #A8A8A8;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  .value {
    color: #F5F1E8;
    font-weight: 700;
  }
`,qi=o.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`,Xi=o.button`
  padding: 8px 16px;
  background: ${({$isSelected:r})=>r?"rgba(201, 169, 110, 0.12)":"#151515"};
  border: 1.5px solid ${({$isSelected:r})=>r?"#C9A96E":"rgba(140, 116, 75, 0.25)"};
  border-radius: 4px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
  font-size: 0.84rem;
  font-weight: 600;
  color: ${({$isSelected:r})=>r?"#F5F1E8":"#D8D2C5"};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  letter-spacing: 0.02em;

  &:hover {
    border-color: #C9A96E;
    color: #F5F1E8;
    background: ${({$isSelected:r})=>r?"rgba(201, 169, 110, 0.18)":"#1c1c1c"};
  }
`,Zi=o.div`
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 0;
  flex-wrap: wrap;

  .label-title {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #F5F1E8;
    letter-spacing: -0.01em;
  }

  .guide-link {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    color: #C9A96E;
    text-decoration: underline;
    white-space: nowrap;
    transition: color 0.15s ease;

    &:hover {
      color: #DFCA9B;
    }
  }
`,Qi=o.div`
  position: relative;
  width: 155px;
`,er=o.button`
  width: 100%;
  padding: 4px 0 6px 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(140, 116, 75, 0.35);
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
    color: #F5F1E8;
  }

  .placeholder-val {
    color: #A8A8A8;
    font-weight: 400;
  }

  &:hover {
    border-bottom-color: #C9A96E;
  }

  .arrow-icon {
    display: flex;
    align-items: center;
    margin-left: 8px;
    color: #C9A96E;
  }
`,tr=o.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.75);
  z-index: 100;
  max-height: 220px;
  overflow-y: auto;

  .option-item {
    padding: 8px 12px;
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    cursor: pointer;
    color: #F5F1E8;
    transition: background 0.15s ease;

    &:hover {
      background: #222222;
      color: #C9A96E;
    }

    &.selected {
      background: #2A241A;
      color: #C9A96E;
      font-weight: 700;
    }
  }
`;o.div`
  margin-bottom: 0;
`;o.button`
  background: none;
  border: none;
  color: #F5F1E8;
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
    color: #C9A96E;

    .info-circle {
      border-color: #C9A96E;
      color: #C9A96E;
    }
  }

  .info-circle {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #C9A96E;
    color: #C9A96E;
    font-size: 0.65rem;
    font-weight: 700;
    font-style: italic;
    line-height: 1;
    transition: all 0.18s ease;
  }
`;o.input`
  width: 100%;
  height: 46px;
  padding: 0 16px;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  font-size: 0.88rem;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #111111;
  color: #F5F1E8;
  outline: none;
  box-sizing: border-box;
  margin-top: 10px;
  transition: border-color 0.18s ease;

  &::placeholder {
    color: #777777;
  }

  &:focus {
    border-color: #C9A96E;
  }
`;const ir=o.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,rr=o.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  color: #F5F1E8;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
`,nr=o.input`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid ${({$hasError:r})=>r?"#E53E3E":"rgba(140, 116, 75, 0.25)"};
  border-radius: 4px;
  font-size: 0.88rem;
  font-family: 'Inter', sans-serif;
  background: #111111;
  color: #F5F1E8;
  outline: none;
  box-sizing: border-box;

  &:focus {
    border-color: #C9A96E;
  }
`,or=o.textarea`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid ${({$hasError:r})=>r?"#E53E3E":"rgba(140, 116, 75, 0.25)"};
  border-radius: 4px;
  font-size: 0.88rem;
  font-family: 'Inter', sans-serif;
  background: #111111;
  color: #F5F1E8;
  outline: none;
  box-sizing: border-box;
  resize: vertical;

  &:focus {
    border-color: #C9A96E;
  }
`,sr=o.select`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  border: 1px solid ${({$hasError:r})=>r?"#E53E3E":"rgba(140, 116, 75, 0.25)"};
  border-radius: 4px;
  font-size: 0.88rem;
  font-family: 'Inter', sans-serif;
  background: #111111;
  color: #F5F1E8;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
`,ar=o.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
`,lr=o.button`
  height: 44px;
  min-width: 48px;
  padding: 0 16px;
  background: #151515;
  border: ${({$isSelected:r})=>r?"1.5px solid #C9A96E":"1px solid rgba(140, 116, 75, 0.25)"};
  border-radius: 2px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.88rem;
  font-weight: ${({$isSelected:r})=>r?"600":"400"};
  color: ${({$isSelected:r})=>r?"#C9A96E":"#F5F1E8"};
  transition: all 0.15s ease;

  &:hover {
    border-color: #C9A96E;
  }
`,cr=o.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 18px 0;
`,dr=o.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  gap: 10px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    .qty-selector-col { display: none; }
  }
`,pr=o.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  height: 50px;
  background: #151515;

  button {
    background: none;
    border: none;
    width: 38px;
    height: 100%;
    cursor: pointer;
    color: #F5F1E8;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s ease;

    &:hover {
      background: #222222;
      color: #C9A96E;
    }
  }

  span {
    padding: 0 4px;
    font-weight: 700;
    font-size: 0.9rem;
    color: #F5F1E8;
    min-width: 18px;
    text-align: center;
  }
`,xr=o.button`
  width: 100%;
  height: 50px;
  background: #C9A96E;
  color: #0B0B0B;
  border: 1px solid #C9A96E;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);

  &:hover {
    background: #DFCA9B;
    border-color: #DFCA9B;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(201, 169, 110, 0.3);
  }

  @media (max-width: 576px) {
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    height: 48px;
  }
`,gr=o.button`
  width: 100%;
  height: 50px;
  background: transparent;
  color: #F5F1E8;
  border: 1px solid #8C744B;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;

  &:hover {
    background: #C9A96E;
    color: #0B0B0B;
    border-color: #C9A96E;
    box-shadow: 0 6px 20px rgba(201, 169, 110, 0.3);
    transform: translateY(-1px);
  }

  @media (max-width: 576px) {
    font-size: 0.78rem;
    letter-spacing: 0.06em;
    height: 48px;
  }
`,ur=o.button`
  width: 100%;
  height: 48px;
  background: transparent;
  color: #C9A96E;
  border: 1px solid rgba(140, 116, 75, 0.4);
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: #C9A96E;
    background: rgba(201, 169, 110, 0.08);
  }
`,mr=o.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 0;
  border-top: 1px solid rgba(140, 116, 75, 0.2);
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);

  .benefit-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.75rem;
    color: #D8D2C5;
    font-weight: 500;
  }
`,hr=o.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(140, 116, 75, 0.2);
`,fr=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);
  cursor: pointer;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #F5F1E8;
  user-select: none;

  &:hover {
    color: #C9A96E;
  }
`,br=o.div`
  display: ${({$open:r})=>r?"block":"none"};
  padding: 0 0 16px 0;
  font-size: 0.88rem;
  color: #D8D2C5;
  line-height: 1.6;
`,yr=o.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: #111111;
  border-top: 1px solid rgba(140, 116, 75, 0.25);
  box-shadow: 0 -8px 30px rgba(0, 0, 0, 0.85);
  padding: 12px 24px;
  transform: ${({$show:r})=>r?"translateY(0)":"translateY(110%)"};
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
      border: 1px solid rgba(140, 116, 75, 0.25);
      border-radius: 4px;
    }

    .title-price {
      display: flex;
      flex-direction: column;

      .title {
        font-family: 'Cormorant Garamond', serif;
        font-size: 1.15rem;
        font-weight: 600;
        color: #F5F1E8;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 320px;
      }

      .meta-price {
        font-size: 0.85rem;
        color: #C9A96E;
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
      border: 1px solid rgba(140, 116, 75, 0.25);
      border-radius: 4px;
      height: 40px;
      background: #151515;

      button {
        background: none;
        border: none;
        padding: 0 10px;
        height: 100%;
        cursor: pointer;
        color: #F5F1E8;

        &:hover { background: #222222; }
      }

      span {
        padding: 0 8px;
        font-weight: 700;
        font-size: 0.85rem;
        color: #F5F1E8;
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
      background: #C9A96E;
      color: #0B0B0B;
      border: none;
      font-weight: 700;
      &:hover { background: #DFCA9B; }
    }

    .buy-now {
      background: transparent;
      color: #F5F1E8;
      border: 1px solid #8C744B;
      &:hover { background: #C9A96E; color: #0B0B0B; }
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
`,wr=o.div`
  position: fixed;
  top: 85px;
  left: 50%;
  transform: ${({$show:r})=>r?"translate(-50%, 0)":"translate(-50%, -20px)"};
  z-index: 100000;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 22px;
  border-radius: 30px;
  background: #151515;
  border: 1px solid ${({$type:r})=>r==="warning"?"#f59e0b":r==="error"?"#ef4444":"#C9A96E"};
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(201, 169, 110, 0.2);
  opacity: ${({$show:r})=>r?1:0};
  visibility: ${({$show:r})=>r?"visible":"hidden"};
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
    color: ${({$type:r})=>r==="warning"?"#f59e0b":r==="error"?"#ef4444":"#C9A96E"};
    display: flex;
    align-items: center;
  }

  .toast-content {
    font-family: 'Inter', sans-serif;
    font-size: 0.86rem;
    font-weight: 500;
    color: #F5F1E8;
    line-height: 1.4;
  }

  .toast-close {
    background: none;
    border: none;
    cursor: pointer;
    color: #A8A8A8;
    padding: 2px;
    margin-left: auto;
    display: flex;
    align-items: center;

    &:hover {
      color: #F5F1E8;
    }
  }
`,vr=o.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
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
    color: #C9A96E;
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
    background: #111111;
    border: 1px solid rgba(140, 116, 75, 0.2);
    border-radius: 4px;
    padding: 3px 8px;
    text-align: center;
    min-width: 42px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  .unit-num {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    font-weight: 700;
    color: #F5F1E8;
    line-height: 1.15;
  }

  .unit-label {
    font-size: 0.55rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #A8A8A8;
    font-weight: 600;
    margin-top: 1px;
  }
`,yt=o.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px 100px 24px;
  text-align: center;
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 50vh;
  box-sizing: border-box;

  .not-found-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #151515;
    border: 1px solid rgba(140, 116, 75, 0.25);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #C9A96E;
    margin-bottom: 24px;
  }

  h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 2.4rem;
    font-weight: 500;
    color: #F5F1E8;
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
    color: #D8D2C5;
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
    background: #C9A96E;
    color: #0B0B0B;
    border: 1px solid #C9A96E;
    border-radius: 4px;
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);

    &:hover {
      background: #DFBA73;
      border-color: #DFBA73;
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
    }
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 14px 32px;
    background: #151515;
    color: #F5F1E8;
    border: 1px solid rgba(140, 116, 75, 0.3);
    border-radius: 4px;
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    text-decoration: none;
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

    &:hover {
      border-color: #C9A96E;
      color: #C9A96E;
      background: #1F1F1F;
      transform: translateY(-2px);
    }
  }
`,wt=({src:r,alt:x,style:i,onLoad:b})=>{const[C,j]=c.useState(r);return c.useEffect(()=>{j(r)},[r]),e.jsx("img",{src:C||"/assets/gem_rings_cat.png",alt:x,style:i,onLoad:b,onError:()=>{C!=="/assets/gem_rings_cat.png"&&j("/assets/gem_rings_cat.png")}})},vt=[{id:"exp",title:"YOUR AETHELCARATS EXPERIENCE",content:"Every creation is handcrafted in our Surat atelier using certified conflict-free materials and 100% recycled precious metals. Includes complimentary sizing, insured shipping, and lifetime cleaning.",enabled:!0,defaultOpen:!0},{id:"specs",title:"PRODUCT & DIAMOND SPECIFICATIONS",content:"Hand-selected center stone with optical precision cut. Crafted in solid 14k/18k gold with stamped hallmark verification.",enabled:!0,defaultOpen:!1},{id:"craft",title:"CRAFTSMANSHIP & SUSTAINABILITY",content:"Our Surat workshop directly sources lab-grown and natural diamonds, eliminating traditional markups and maintaining ethical standards.",enabled:!0,defaultOpen:!1},{id:"shipping",title:"SHIPPING & DELIVERY",content:"Free insured worldwide shipping with signature confirmation. Standard production time is 7 to 12 business days.",enabled:!0,defaultOpen:!1}],jr=({saleEndsAt:r})=>{const[x,i]=c.useState(null);return c.useEffect(()=>{const b=()=>{const j=new Date(r).getTime(),w=new Date().getTime(),h=j-w;if(isNaN(j)||h<=0){i(null);return}const v=Math.floor(h/(1e3*60*60*24)),m=Math.floor(h%(1e3*60*60*24)/(1e3*60*60)),l=Math.floor(h%(1e3*60*60)/(1e3*60)),S=Math.floor(h%(1e3*60)/1e3);i({days:v,hours:m,mins:l,secs:S})};b();const C=setInterval(b,1e3);return()=>clearInterval(C)},[r]),x?e.jsxs(vr,{children:[e.jsx("div",{className:"timer-header",children:e.jsx("span",{children:"⏳ Limited Time Offer — Sale Ends In:"})}),e.jsxs("div",{className:"timer-units",children:[e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(x.days).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Days"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(x.hours).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Hours"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(x.mins).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Mins"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(x.secs).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Secs"})]})]})]}):null},Sr=(r,x)=>{let i=(r||"").trim();const b=`

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
❤️ About AethelCarats Fine Jewellery Atelier
AethelCarats Fine Jewellery Atelier is an actual manufacturing workshop based in Surat. We do not use middlemen. We source the loose lab-grown and natural diamonds ourselves, and we cast and polish the final custom jewelry right here. That means you get the piece straight from the source.
📩 Reach out if you need advice on picking a stone or want to start a custom build!`;if(i.length>500&&(i.includes("AethelCarats")||i.includes("Aura Diamond Atelier"))&&i.includes("Surat"))return i;const C=["Every piece we make","Every piece we make is done to order right here in ou","Every piece we make is done to order right here inour S","Every piece we make is done to order right here in","Handcrafted & Made to Order","ðŸ’Ž Handcrafted & Made to Order","🔹 Handcrafted & Made to Order","💎 Handcrafted & Made to Order"];let j=i;for(const w of C){const h=j.lastIndexOf(w);if(h>20){j=j.substring(0,h).trim();break}}return j||(j=x||"AethelCarats Fine Jewellery Atelier Fine Jewelry Piece"),j+b},Ir=()=>{var dt,pt;const{slug:r}=Gt(),x=Ut(),[i,b]=c.useState(null),[C,j]=c.useState([]),[w,h]=c.useState(0),[v,m]=c.useState(!1),[l,S]=c.useState(null),[T,z]=c.useState("loading"),g=c.useRef(null),F=c.useRef(null),D=c.useRef(null),[N,V]=c.useState("14K Yellow Gold"),[le,d]=c.useState("14k"),[u,O]=c.useState("Select"),[B,te]=c.useState(!1),[Be,ie]=c.useState(!1),[Xe,Ze]=c.useState(!1),[ye,Qe]=c.useState(""),[W,p]=c.useState(1),[k,M]=c.useState(!1),[_,re]=c.useState(!1),[$e,et]=c.useState("exp"),[G,ce]=c.useState({}),[ne,q]=c.useState({}),[oe,At]=c.useState(null),[de,Et]=c.useState({show:!1,message:"",type:"success"}),[L,zt]=c.useState({enableConsultAtelierExpert:"true",consultTitle:"Consult an AethelCarats Atelier Expert",consultDescription:"Speak directly with our AethelCarats Fine Jewellery Atelier specialists regarding custom design, diamond selection, or sizing guidance.",consultPhone:"+91 79902 78892",consultPhoneLabel:"Call Atelier",consultEmail:"concierge@aethelcarats.com",consultEmailLabel:"Email Concierge",consultCloseLabel:"Close"}),{cartItems:we,addToCart:tt,updateQuantity:Tt}=Kt(),{isInWishlist:It,toggleWishlist:Nt}=qt(),{showToast:Bt}=Xt(),ue=(t,n="success")=>{Bt(t,n)};c.useEffect(()=>{const t=()=>{window.scrollY>550?M(!0):M(!1)};return window.addEventListener("scroll",t,{passive:!0}),()=>window.removeEventListener("scroll",t)},[]),c.useEffect(()=>{const t=n=>{D.current&&!D.current.contains(n.target)&&te(!1)};return document.addEventListener("mousedown",t),()=>document.removeEventListener("mousedown",t)},[]),c.useEffect(()=>{ee.getSiteSettings().then(t=>{t&&typeof t=="object"&&Object.keys(t).length>0&&zt(n=>({...n,...t}))}).catch(console.error),ee.getHolidayModeStatus().then(At).catch(console.error)},[]),c.useEffect(()=>{let t=!0;if(r){b(null),z("loading");const n=setTimeout(()=>{t&&(console.warn("Product request timed out after 10 seconds."),b(null),z("error"))},1e4);return ee.getProductBySlug(r).then(s=>{if(!t)return;clearTimeout(n);const y=(s==null?void 0:s.product)||(s!=null&&s.id?s:null);if(y&&y.id){b(y),j((s==null?void 0:s.relatedProducts)||[]),h(0),z("success");try{const A=localStorage.getItem("app_recently_viewed"),H=A?JSON.parse(A):[],J=(y.title||y.name||"").trim().toLowerCase(),Ce=H.filter(R=>{if(!R||R.id&&y.id&&R.id===y.id||R.slug&&y.slug&&R.slug===y.slug)return!1;const I=(R.title||R.name||"").trim().toLowerCase();return!(J&&I&&J===I)}),E=[y,...Ce].slice(0,10);localStorage.setItem("app_recently_viewed",JSON.stringify(E))}catch{}if(y.metal){const A=y.metal.includes("Silver")?"14K White Gold":y.metal;V(A),d(A.includes("18K")?"18k":"14k")}else if(y.metalsConfig){let A=y.metalsConfig;if(typeof A=="string")try{A=JSON.parse(A)}catch{}if(Array.isArray(A)&&A.length>0){const H=A[0],J=typeof H=="string"?H:H.label||H.name;J&&(V(J),d(String(J).includes("18K")?"18k":"14k"))}}ee.get(`/product-page-content/${y.id}`).then(A=>{t&&A.data&&A.data.content&&S(A.data.content)}).catch(console.error);let f=[];try{y.accordionsConfig&&(f=typeof y.accordionsConfig=="string"?JSON.parse(y.accordionsConfig):y.accordionsConfig)}catch{}(!f||f.length===0)&&(f=vt);const $=f.find(A=>A.enabled!==!1&&A.defaultOpen);$&&et($.id||$.title)}else b(null),z("not_found")}).catch(s=>{var y;t&&(clearTimeout(n),console.error("Error fetching product by slug:",s),b(null),((y=s==null?void 0:s.response)==null?void 0:y.status)===404||(s==null?void 0:s.status)===404?z("not_found"):z("error"))}),()=>{t=!1,clearTimeout(n)}}else b(null),z("not_found")},[r]);const[ve,it]=c.useState(null),[rt,nt]=c.useState(null);c.useEffect(()=>{var t;if(i){const n=i.reviewCount??(((t=i.reviews)==null?void 0:t.length)||0),s=i.avgRating??5;it(n),nt(s);let y=!0;return ee.get(`/reviews?productId=${i.id}`).then(f=>{if(!y)return;const $=Array.isArray(f.data)?f.data:Array.isArray(f)?f:[];if($.length>0){it($.length);const A=$.reduce((H,J)=>H+(Number(J.rating)||5),0);nt(Math.round(A/$.length*10)/10)}}).catch(console.error),()=>{y=!1}}},[i==null?void 0:i.id]),c.useLayoutEffect(()=>{i&&window.scrollTo(0,0)},[i==null?void 0:i.id]);const me=c.useMemo(()=>!i||!we?-1:we.findIndex(t=>{var n;return(t.id===i.id||((n=t.product)==null?void 0:n.id)===i.id||t.productId===i.id)&&(!N||t.selectedMetal===N)}),[we,i==null?void 0:i.id,N]),pe=me>=0?we[me]:null;c.useEffect(()=>{pe&&pe.quantity&&p(pe.quantity)},[pe==null?void 0:pe.quantity,me]);const je=t=>{const n=Math.max(1,t),s=n-W;p(n),me>=0&&s!==0&&Tt(me,s)},$t=t=>{et(n=>n===t?null:t)},Rt=()=>{if(!g.current)return;const t=g.current.scrollLeft,n=g.current.clientWidth;if(n>0){const s=Math.round(t/n);s!==w&&s>=0&&s<U.length&&h(s)}},Re=t=>{if(h(t),g.current){const n=g.current.clientWidth;g.current.scrollTo({left:t*n,behavior:"smooth"})}};if(T==="loading")return e.jsx(Ae,{style:{textAlign:"center",padding:80},children:e.jsx("div",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.6rem",color:"#c9a45c",letterSpacing:"0.08em"},children:"LOADING AETHELCARATS PRODUCT..."})});if(T==="not_found"||!i&&T!=="error")return e.jsx(Je,{children:e.jsxs(Ae,{style:{paddingBottom:60},children:[e.jsxs(Ve,{children:[e.jsx(X,{to:"/",children:"Home"})," / ",e.jsx(X,{to:"/collections",children:"Jewellery"})," / ",e.jsx("span",{className:"current",children:"Product Not Found"})]}),e.jsxs(yt,{children:[e.jsx("div",{className:"not-found-icon",children:e.jsx(_e,{size:28})}),e.jsx("h1",{children:"PRODUCT NOT FOUND"}),e.jsx("p",{children:"We're sorry, but this product is no longer available."}),e.jsx("div",{className:"cta-group",children:e.jsx(X,{to:"/collections",className:"btn-primary",children:"VIEW ALL JEWELLERY"})})]})]})});if(T==="error"||!i)return e.jsx(Je,{children:e.jsxs(Ae,{style:{paddingBottom:60},children:[e.jsxs(Ve,{children:[e.jsx(X,{to:"/",children:"Home"})," / ",e.jsx(X,{to:"/collections",children:"Jewellery"})," / ",e.jsx("span",{className:"current",children:"Error Loading Product"})]}),e.jsxs(yt,{children:[e.jsx("div",{className:"not-found-icon",style:{color:"#c5221f",background:"#fdf2f2",borderColor:"#f8d7da"},children:e.jsx(gt,{size:28})}),e.jsx("h1",{children:"UNABLE TO LOAD PRODUCT"}),e.jsx("p",{children:"We encountered a temporary network or server error while loading this piece. Please try again."}),e.jsxs("div",{className:"cta-group",children:[e.jsx("button",{className:"btn-primary",onClick:()=>window.location.reload(),children:"RETRY"}),e.jsx(X,{to:"/collections",className:"btn-secondary",children:"VIEW ALL JEWELLERY"})]})]})]})});const ot=It(i.id),Ft=i.images&&Array.isArray(i.images)&&i.images.length>0?i.images.map(t=>typeof t=="string"?t:t==null?void 0:t.url):[i.primaryImage||i.mainImage,i.secondaryImage],U=Array.from(new Set(Ft.filter(Boolean))),Pt=U[w]||U[0]||"",he=!!(((i.jewelleryType||"").toLowerCase()==="rings"||(i.jewelleryType||"").toLowerCase()==="engagement rings"||(i.jewelleryType||"").toLowerCase()==="wedding bands"||(((dt=i.category)==null?void 0:dt.name)||"").toLowerCase().includes("ring")||(i.name||"").toLowerCase().includes("ring")||i.enableRingSize===!0)&&!(i.jewelleryType||"").toLowerCase().includes("earring")&&!(i.jewelleryType||"").toLowerCase().includes("necklace")&&!(i.jewelleryType||"").toLowerCase().includes("bracelet")&&!(i.jewelleryType||"").toLowerCase().includes("pendant")),Z=!!(i.onSale===!0&&(i.comparePrice&&Number(i.comparePrice)>Number(i.price)||i.salePrice&&Number(i.salePrice)>0)),Fe=Z&&i.comparePrice&&Number(i.comparePrice)>Number(i.price)?Number(i.comparePrice):Z&&i.salePrice&&Number(i.price)>Number(i.salePrice)?Number(i.price):null;let se=i.metalsConfig;if(typeof se=="string")try{se=JSON.parse(se)}catch{se=[]}const Pe=!Array.isArray(se)||se.length===0?[{label:"14K Yellow Gold",code:"14k",priceAdjustment:0},{label:"14K White Gold",code:"14k",priceAdjustment:0},{label:"14K Rose Gold",code:"14k",priceAdjustment:0},{label:"18K Yellow Gold",code:"18k",priceAdjustment:250},{label:"18K White Gold",code:"18k",priceAdjustment:350},{label:"18K Rose Gold",code:"18k",priceAdjustment:350}]:se.map(t=>typeof t=="string"?{label:t,code:t.toLowerCase().includes("18k")?"18k":"14k",priceAdjustment:0}:{label:t.label||t.name||String(t),code:t.code||(String(t.label||"").toLowerCase().includes("18k")?"18k":"14k"),priceAdjustment:typeof t.priceAdjustment=="number"?t.priceAdjustment:0}),De=(i.variations||[]).find(t=>{const n=t.metal?t.metal.toLowerCase()===N.toLowerCase():!0,s=he&&u!=="Select"&&t.ringSize?String(t.ringSize)===String(u):!0;return n&&s});let Le=De==null?void 0:De.price;if(!Le){const t=Pe.find(s=>s.label.toLowerCase()===N.toLowerCase());Le=(Z&&i.salePrice&&Number(i.salePrice)>0?Number(i.salePrice):i.price||2500)+((t==null?void 0:t.priceAdjustment)||0)}const st=Object.values(G).reduce((t,n)=>t+(n.priceAdjustment||0),0),ae=Le+st;let Se=null;if(Z&&Fe&&Fe>ae){const t=Pe.find(n=>n.label.toLowerCase()===N.toLowerCase());Se=Fe+((t==null?void 0:t.priceAdjustment)||0)+st}const Dt=["Select","US 4","US 4.5","US 5","US 5.5","US 6","US 6.5","US 7","US 7.5","US 8","US 8.5","US 9","US 9.5","US 10","US 10.5","US 11","US 11.5","US 12"];let xe=[];try{i.customOptions?xe=typeof i.customOptions=="string"?JSON.parse(i.customOptions):i.customOptions:i.customOptionsJson&&(xe=typeof i.customOptionsJson=="string"?JSON.parse(i.customOptionsJson):i.customOptionsJson)}catch{}let K=[];try{i.detailSections&&Array.isArray(i.detailSections)&&i.detailSections.length>0?K=[...i.detailSections]:i.accordionsConfig&&(K=typeof i.accordionsConfig=="string"?JSON.parse(i.accordionsConfig):[...i.accordionsConfig])}catch{}(!K||K.length===0)&&(K=[...vt]);const Lt=i.fullDescription||i.description||i.shortDescription,fe=Sr(Lt,i.title||i.name);if(fe&&typeof fe=="string"&&fe.trim()!==""){const t=K.findIndex(n=>n.id==="overview"||(n.title||"").toUpperCase().includes("DESCRIPTION")||(n.title||"").toUpperCase().includes("OVERVIEW"));t!==-1?K[t]={...K[t],title:"PRODUCT OVERVIEW & DESCRIPTION",content:fe.trim(),enabled:!0}:K.unshift({id:"overview",title:"PRODUCT OVERVIEW & DESCRIPTION",content:fe.trim(),enabled:!0,defaultOpen:!0})}const at=new Set,Ot=K.filter(t=>t.isActive!==!1&&t.enabled!==!1).filter(t=>{const n=(t.type||t.title||t.id||"").trim().toUpperCase();return n?at.has(n)?!1:(at.add(n),!0):!0}),Oe=he&&i.isRingSizeRequired!==!1,lt=()=>{if(Oe&&(u==="Select"||!u)){ie(!0),ue("Please select a US Ring Size before adding to your bag.","warning");return}ie(!1);const t={};if(i.enableCustomOptions){for(const n of xe)if(n.required){const s=G[n.title||n.name||n.label];(!s||!s.value||!s.value.trim())&&(t[n.title||n.name||n.label]=`Please complete required option: ${n.title||n.name||n.label}`)}}if(Object.keys(t).length>0){q(t),ue(Object.values(t)[0],"warning");return}q({}),tt(i,W,N,he?u==="Select"?"US 7":u:void 0,ye,G,ae),ue("Product successfully added to your shopping bag!","success")},ct=()=>{if(Oe&&(u==="Select"||!u)){ie(!0),ue("Please select a US Ring Size before proceeding to checkout.","warning");return}ie(!1);const t={};if(i.enableCustomOptions){for(const n of xe)if(n.required){const s=G[n.title||n.name||n.label];(!s||!s.value||!s.value.trim())&&(t[n.title||n.name||n.label]=`Please complete required option: ${n.title||n.name||n.label}`)}}if(Object.keys(t).length>0){q(t),ue(Object.values(t)[0],"warning");return}q({}),tt(i,W,N,he?u==="Select"?"US 7":u:void 0,ye,G,ae),x("/checkout")};return e.jsxs(Je,{children:[e.jsxs(Ae,{children:[e.jsxs(Ve,{children:[e.jsx(X,{to:"/",children:"Home"})," / ",e.jsx(X,{to:"/collections",children:((pt=i.category)==null?void 0:pt.name)||i.jewelleryType||"Jewellery"})," / ",e.jsx("span",{className:"current",children:i.title||i.name})]}),e.jsxs(Fi,{children:[e.jsx(Pi,{children:e.jsx(Di,{ref:F,children:e.jsx(Li,{className:"desktop-image-grid",children:U.map((t,n)=>e.jsxs(Oi,{onClick:()=>{h(n),m(!0)},children:[e.jsx(wt,{src:t,alt:`${i.title||i.name} view ${n+1}`}),e.jsxs("div",{className:"zoom-hint",children:[e.jsx(jt,{size:12}),"Click to expand"]})]},`gallery_${t}_${n}`))})})}),e.jsxs(Mi,{children:[U.length>0&&e.jsxs(Gi,{children:[w+1," / ",U.length]}),U.length>1&&w>0&&e.jsx(bt,{$dir:"left",onClick:()=>Re(w-1),"aria-label":"Previous Image",children:e.jsx(Te,{size:20})}),U.length>1&&w<U.length-1&&e.jsx(bt,{$dir:"right",onClick:()=>Re(w+1),"aria-label":"Next Image",children:e.jsx(Ie,{size:20})}),e.jsx(Wi,{ref:g,onScroll:Rt,children:U.map((t,n)=>e.jsx(_i,{onClick:()=>{h(n),m(!0)},children:e.jsx(wt,{src:t,alt:`${i.title||i.name} view ${n+1}`})},`mob_${n}`))}),e.jsx(Ui,{children:U.map((t,n)=>e.jsx("span",{className:w===n?"active":"",onClick:()=>Re(n)},n))})]}),e.jsx(li,{images:U,activeIndex:w,productName:i.title||i.name,isOpen:v,onClose:()=>m(!1),onSelectIndex:t=>h(t)}),e.jsxs(Hi,{children:[e.jsxs(Yi,{children:[e.jsxs("div",{children:[e.jsx("h1",{children:i.title||i.name}),e.jsxs(Ji,{children:[e.jsxs("span",{className:"stars",children:["★".repeat(Math.round(rt??i.avgRating??5)),"☆".repeat(5-Math.round(rt??i.avgRating??5))]}),e.jsx("span",{children:ve!==null&&ve>0?`(${ve} ${ve===1?"review":"reviews"})`:i.reviewCount!==void 0&&i.reviewCount>0?`(${i.reviewCount} ${i.reviewCount===1?"review":"reviews"})`:"(No reviews yet)"})]})]}),e.jsx("button",{className:`wishlist-btn ${ot?"active":""}`,onClick:()=>Nt(i),title:"Save to Wishlist",children:e.jsx(Ht,{size:20,fill:ot?"#c00":"none"})})]}),e.jsxs(Ee,{children:[e.jsxs(Vi,{style:{marginTop:0,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"},children:[e.jsxs("span",{className:"current-price",style:{color:Z?"#E53E3E":"#C9A96E"},children:["$",ae.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})]}),Z&&Se!==null&&Se>ae&&e.jsxs("span",{className:"compare-price",children:["$",Se.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})]}),Z&&e.jsx("span",{style:{background:"#d93838",color:"#fff",fontSize:"0.75rem",fontWeight:700,padding:"4px 10px",borderRadius:4,letterSpacing:"0.04em"},children:"🏷️ ON SALE"})]}),!!(Z&&i.saleEndsAt)&&e.jsx(jr,{saleEndsAt:i.saleEndsAt})]}),i.enableMetalSelection!==!1&&e.jsxs(Ee,{children:[e.jsxs(Ki,{children:[e.jsx("span",{className:"label",children:"Metal Type:"}),e.jsx("span",{className:"value",children:N})]}),e.jsx(qi,{children:Pe.map((t,n)=>e.jsx(Xi,{type:"button",$isSelected:N.toLowerCase()===t.label.toLowerCase(),onClick:()=>{V(t.label),d(t.code)},title:t.label,children:t.label},n))})]}),he&&e.jsxs(Ee,{children:[e.jsxs(Zi,{children:[e.jsxs("span",{className:"label-title",children:["Ring Size ",Oe?e.jsx("span",{style:{color:"#d9534f"},children:"*"}):e.jsx("span",{style:{color:"#888",fontWeight:400,fontSize:"0.75rem"},children:"(Optional)"}),":"]}),e.jsxs(Qi,{ref:D,children:[e.jsxs(er,{onClick:()=>te(!B),children:[e.jsx("span",{className:u!=="Select"?"selected-val":"placeholder-val",children:u}),e.jsx("span",{className:"arrow-icon",children:e.jsx("svg",{width:"9",height:"6",viewBox:"0 0 9 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M4.5 6L0 0H9L4.5 6Z",fill:"#0c1938"})})})]}),B&&e.jsx(tr,{children:(i.availableRingSizes||Dt).map(t=>e.jsx("div",{className:`option-item ${u===t?"selected":""}`,onClick:()=>{O(t),te(!1),ie(!1)},children:t},t))})]}),e.jsx(X,{to:"/education/rings/find-your-ring-size",className:"guide-link",children:"Ring Size Guide"})]}),Be&&e.jsxs("div",{style:{color:"#d9534f",fontSize:"0.8rem",fontWeight:600,marginTop:8,display:"flex",alignItems:"center",gap:6},children:[e.jsx("span",{children:"⚠️"})," Please select a US Ring Size before adding this ring to your shopping bag."]})]}),!!i.enableCustomOptions&&xe.length>0&&e.jsx(Ee,{children:e.jsx(ir,{children:xe.map((t,n)=>{var A,H,J,Ce;const s=t.title||t.name||t.label;if(!s)return null;const y=t.inputType||t.fieldType||"Text",f=!!ne[s],$=Number(t.priceAdjustment)||0;return e.jsxs("div",{children:[e.jsxs(rr,{children:[s,(A=G[s])!=null&&A.value?`: ${G[s].value}`:"",t.required&&e.jsx("span",{style:{color:"#c5221f"},children:"*"}),y!=="Checkbox"&&$>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600,marginLeft:6},children:["(+$",$,")"]})]}),y==="Text"&&e.jsx(nr,{type:"text",$hasError:f,maxLength:t.maxCharacterLength||t.maxLength||25,placeholder:t.placeholder||`Enter ${s}...`,value:((H=G[s])==null?void 0:H.value)||"",onChange:E=>{const R=E.target.value;ce(I=>({...I,[s]:{title:s,value:R,priceAdjustment:R.trim()?$:0}})),ne[s]&&q(I=>({...I,[s]:""}))}}),y==="Textarea"&&e.jsx(or,{rows:2,$hasError:f,maxLength:t.maxCharacterLength||t.maxLength||100,placeholder:t.placeholder||`Enter ${s}...`,value:((J=G[s])==null?void 0:J.value)||"",onChange:E=>{const R=E.target.value;ce(I=>({...I,[s]:{title:s,value:R,priceAdjustment:R.trim()?$:0}})),ne[s]&&q(I=>({...I,[s]:""}))}}),y==="Dropdown"&&e.jsxs(sr,{$hasError:f,value:((Ce=G[s])==null?void 0:Ce.value)||"",onChange:E=>{const I=(t.choices||t.values||[]).find(Y=>(Y.label||Y.value||Y)===E.target.value),P=typeof I=="object"?Number(I.priceAdjustment)||0:$;ce(Y=>({...Y,[s]:{title:s,value:E.target.value,priceAdjustment:E.target.value?P:0}})),ne[s]&&q(Y=>({...Y,[s]:""}))},children:[e.jsxs("option",{value:"",children:["-- Select ",s," --"]}),(t.choices||t.values||[]).map((E,R)=>{const I=typeof E=="string"?E:E.label||E.value,P=typeof E=="object"&&Number(E.priceAdjustment)||0;return e.jsxs("option",{value:I,children:[I," ",P>0?`(+$${P})`:""]},R)})]}),y==="Radio"&&e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:(t.choices||t.values||[]).map((E,R)=>{var Y;const I=typeof E=="string"?E:E.label||E.value,P=typeof E=="object"?Number(E.priceAdjustment)||0:$;return e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,fontSize:"0.88rem",cursor:"pointer",color:"#0c1938"},children:[e.jsx("input",{type:"radio",name:`opt_${s}`,checked:((Y=G[s])==null?void 0:Y.value)===I,onChange:()=>{ce(Q=>({...Q,[s]:{title:s,value:I,priceAdjustment:P}})),ne[s]&&q(Q=>({...Q,[s]:""}))},style:{accentColor:"#0c1938",cursor:"pointer"}}),I," ",P>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600},children:["(+$",P,")"]})]},R)})}),y==="Checkbox"&&(()=>{var I;const E=t.checkboxOptions&&Array.isArray(t.checkboxOptions)&&t.checkboxOptions.length>0?t.checkboxOptions:t.choices&&Array.isArray(t.choices)&&t.choices.length>0?t.choices:[{id:"cb_default",label:t.checkboxLabel!==void 0&&t.checkboxLabel!==""?t.checkboxLabel:s,priceAdjustment:$}],R=((I=G[s])==null?void 0:I.value)||"";return e.jsx("div",{children:e.jsx(ar,{children:E.map((P,Y)=>{const Q=typeof P=="string"?P:P.label||P.value;if(!Q)return null;const Me=typeof P=="object"&&Number(P.priceAdjustment)||0,xt=R===Q;return e.jsxs(lr,{type:"button",$isSelected:xt,onClick:()=>{ce(xt?be=>({...be,[s]:{title:s,value:"",priceAdjustment:0}}):be=>({...be,[s]:{title:s,value:Q,priceAdjustment:Me}})),ne[s]&&q(be=>({...be,[s]:""}))},children:[e.jsx("span",{children:Q}),Me>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600,marginLeft:6},children:["(+$$",Me,")"]})]},P.id||Y)})})})})(),f&&e.jsx("div",{style:{fontSize:"0.78rem",color:"#c5221f",marginTop:4},children:ne[s]})]},t.id||n)})})}),e.jsxs(cr,{style:{marginTop:4},children:[oe!=null&&oe.active?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10,width:"100%"},children:[e.jsx("button",{disabled:!0,style:{width:"100%",padding:"16px 24px",background:"#e2e8f0",color:"#64748b",border:"1px solid #cbd5e1",borderRadius:4,fontWeight:700,fontSize:"0.85rem",letterSpacing:"0.08em",textTransform:"uppercase",cursor:"not-allowed"},children:"ORDERS TEMPORARILY UNAVAILABLE"}),e.jsx("div",{style:{fontSize:"0.82rem",color:"#c53030",background:"#fff5f5",border:"1px solid #feb2b2",padding:"10px 14px",borderRadius:4,textAlign:"center",lineHeight:1.5},children:oe.message||"Orders are temporarily unavailable while Holiday Mode is active. Please check back soon."})]}):e.jsxs(dr,{children:[(l==null?void 0:l.showQuantitySelector)!==!1&&e.jsx("div",{className:"qty-selector-col",children:e.jsxs(pr,{children:[e.jsx("button",{type:"button",onClick:()=>je(W-1),"aria-label":"Decrease quantity",children:e.jsx(ut,{size:14})}),e.jsx("span",{children:W}),e.jsx("button",{type:"button",onClick:()=>je(W+1),"aria-label":"Increase quantity",children:e.jsx(mt,{size:14})})]})}),e.jsx("div",{className:"add-bag-col",children:e.jsxs(xr,{onClick:lt,children:["ADD TO BAG • $",(ae*W).toLocaleString()]})}),(l==null?void 0:l.showBuyNowButton)!==!1&&e.jsx("div",{className:"buy-now-col",children:e.jsxs(gr,{onClick:ct,children:[e.jsx(Yt,{size:16})," BUY IT NOW"]})})]}),L.enableConsultAtelierExpert!=="false"&&e.jsx(ur,{onClick:()=>re(!0),children:"CONSULT AN ATELIER EXPERT"})]}),(l==null?void 0:l.showBenefits)!==!1&&e.jsx(mr,{children:l!=null&&l.benefitsJson?(()=>{try{return(typeof l.benefitsJson=="string"?JSON.parse(l.benefitsJson):l.benefitsJson).filter(n=>n.isActive!==!1).map((n,s)=>e.jsxs("div",{className:"benefit-item",children:[n.icon==="Truck"&&e.jsx(Ge,{size:16}),n.icon==="ShieldCheck"&&e.jsx(Ue,{size:16}),n.icon==="Award"&&e.jsx(He,{size:16}),n.icon==="Sparkles"&&e.jsx(_e,{size:16}),(!n.icon||!["Truck","ShieldCheck","Award","Sparkles"].includes(n.icon))&&e.jsx(Jt,{size:16}),n.title]},n.id||s))}catch{return null}})():e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"benefit-item",children:[e.jsx(Ge,{size:16})," Free Insured Delivery"]}),e.jsxs("div",{className:"benefit-item",children:[e.jsx(Ue,{size:16})," Lifetime Service Warranty"]}),e.jsxs("div",{className:"benefit-item",children:[e.jsx(He,{size:16})," GIA / IGI Certification"]})]})}),e.jsx(hr,{style:{marginTop:24},children:Ot.map((t,n)=>{const s=t.id||t.title||`acc_${n}`,y=$e===s;return e.jsxs(Ne.Fragment,{children:[e.jsxs(fr,{onClick:()=>$t(s),children:[e.jsx("span",{children:t.title}),e.jsx("span",{children:y?"−":"+"})]}),e.jsxs(br,{$open:y,children:[t.description&&e.jsx("div",{style:{fontSize:"0.88rem",color:"#D8D2C5",marginBottom:t.items&&t.items.length>0?14:0,lineHeight:1.7},children:t.description}),t.items&&Array.isArray(t.items)&&t.items.length>0?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:t.type==="SPECIFICATIONS"||(t.title||"").toUpperCase().includes("SPECIFICATION")?e.jsxs("div",{style:{background:"#151515",border:"1px solid rgba(140, 116, 75, 0.25)",padding:18,borderRadius:6,boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4)"},children:[e.jsx("div",{style:{fontSize:"0.78rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#C9A96E",marginBottom:12},children:"SPECIFICATION DETAILS"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"12px 18px",fontSize:"0.85rem"},children:t.items.map((f,$)=>e.jsxs("div",{children:[f.title&&e.jsxs("strong",{style:{color:"#F5F1E8",fontWeight:600},children:[f.title,": "]}),e.jsx("span",{style:{color:"#D8D2C5"},children:f.value||f.description||"-"})]},f.id||$))})]}):t.items.map((f,$)=>e.jsxs("div",{style:{background:"#151515",border:"1px solid rgba(140, 116, 75, 0.25)",padding:16,borderRadius:6,display:"flex",flexDirection:"column",gap:6,boxShadow:"0 4px 16px rgba(0, 0, 0, 0.35)"},children:[f.imageUrl&&e.jsx("img",{src:f.imageUrl,alt:f.title||"Atelier Media",style:{width:"100%",maxHeight:220,objectFit:"cover",borderRadius:4,marginBottom:6}}),(f.title||f.icon)&&e.jsxs("div",{style:{fontSize:"0.92rem",fontWeight:700,color:"#F5F1E8",display:"flex",alignItems:"center",gap:8},children:[f.icon==="Truck"&&e.jsx(Ge,{size:16,color:"#C9A96E"}),f.icon==="ShieldCheck"&&e.jsx(Ue,{size:16,color:"#C9A96E"}),f.icon==="Award"&&e.jsx(He,{size:16,color:"#C9A96E"}),f.icon==="Sparkles"&&e.jsx(_e,{size:16,color:"#C9A96E"}),f.title]}),f.value&&e.jsx("div",{style:{fontSize:"0.88rem",fontWeight:600,color:"#C9A96E"},children:f.value}),f.description&&e.jsx("div",{style:{fontSize:"0.85rem",color:"#D8D2C5",lineHeight:1.6},children:f.description})]},f.id||$))}):!t.description&&e.jsx("div",{style:{whiteSpace:"pre-line",fontSize:"0.88rem",color:"#D8D2C5",lineHeight:1.7},children:t.content||"Information for this section."})]})]},s)})})]})]})]}),e.jsx(Ni,{items:C,currentProductId:i.id,content:l}),e.jsx(hi,{content:l}),e.jsx(zi,{productName:i.name||i.title,content:l,productId:i.id,reviews:i.reviews}),e.jsx(Ri,{currentProductId:i.id,content:l}),_&&L.enableConsultAtelierExpert!=="false"&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsxs("div",{style:{background:"#151515",border:"1px solid rgba(140, 116, 75, 0.3)",padding:32,borderRadius:8,maxWidth:500,width:"90%",textAlign:"center",color:"#F5F1E8"},children:[e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",color:"#F5F1E8",marginBottom:12},children:L.consultTitle||"Consult an Atelier Expert"}),e.jsx("p",{style:{fontSize:"0.9rem",color:"#A8A8A8",marginBottom:20,whiteSpace:"pre-line"},children:L.consultDescription||"Speak directly with our AethelCarats specialists regarding custom design, diamond selection, or sizing guidance."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,marginBottom:20},children:[L.consultPhone&&L.consultPhone.trim()!==""&&e.jsxs("a",{href:`tel:${L.consultPhone.replace(/[^\d+]/g,"")}`,style:{padding:"12px",background:"#111111",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,textDecoration:"none",color:"#F5F1E8",fontWeight:600},children:["☎ ",L.consultPhoneLabel||"Call Atelier",": ",L.consultPhone]}),L.consultEmail&&L.consultEmail.trim()!==""&&e.jsxs("a",{href:`mailto:${L.consultEmail.trim()}`,style:{padding:"12px",background:"#111111",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,textDecoration:"none",color:"#F5F1E8",fontWeight:600},children:["✉ ",L.consultEmailLabel||"Email Concierge",": ",L.consultEmail]})]}),e.jsx("button",{onClick:()=>re(!1),style:{padding:"10px 24px",background:"#C9A96E",color:"#0B0B0B",border:"none",borderRadius:4,cursor:"pointer",fontWeight:700},children:L.consultCloseLabel||"Close"})]})}),e.jsxs(wr,{$show:de.show,$type:de.type,children:[e.jsx("div",{className:"toast-icon",children:de.type==="success"?e.jsx(Vt,{size:22}):e.jsx(gt,{size:22})}),e.jsx("div",{className:"toast-content",children:de.message}),e.jsx("button",{className:"toast-close",onClick:()=>Et(t=>({...t,show:!1})),children:e.jsx(qe,{size:16})}),de.show&&e.jsx("div",{className:"progress-bar"},de.message)]}),e.jsx(yr,{$show:k&&!(oe!=null&&oe.active)&&(l==null?void 0:l.showStickyBar)!==!1,children:e.jsxs("div",{className:"sticky-inner",children:[e.jsxs("div",{className:"product-info",children:[e.jsx("img",{src:Pt,alt:(i==null?void 0:i.title)||(i==null?void 0:i.name)||"Jewellery"}),e.jsxs("div",{className:"title-price",children:[e.jsx("div",{className:"title",children:(i==null?void 0:i.title)||(i==null?void 0:i.name)}),e.jsxs("div",{className:"meta-price",children:["$",(ae*W).toLocaleString()]})]})]}),e.jsxs("div",{className:"sticky-actions",children:[e.jsxs("div",{className:"sticky-qty",children:[e.jsx("button",{type:"button",onClick:()=>je(W-1),children:e.jsx(ut,{size:12})}),e.jsx("span",{children:W}),e.jsx("button",{type:"button",onClick:()=>je(W+1),children:e.jsx(mt,{size:12})})]}),e.jsx("button",{className:"sticky-btn add-bag",onClick:lt,children:"ADD TO BAG"}),e.jsx("button",{className:"sticky-btn buy-now",onClick:ct,children:"BUY IT NOW"})]})]})})]})};export{Ir as ProductDetailPage};
