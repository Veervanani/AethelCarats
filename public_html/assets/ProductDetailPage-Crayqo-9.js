import{r as c,j as e,X as Ze,k as Te,l as Be,aU as Yt,aV as At,aa as Ht,R as Ne,t as Ue,ag as Vt,ao as Jt,u as _t,f as X,g as Ye,C as mt,H as qt,M as ht,P as ft,aW as Kt,ax as He,v as Ve,aS as Je,c as Xt,a as Zt}from"./react-vendor-BQZO0c5l.js";import{g as s}from"./ui-vendor-Bs2yixgz.js";import{S as bt,a as Z,R as Xe,u as Qt,b as ei,c as ti,s as ii,g as yt,d as ri}from"./admin-pages-BPLIEbyh.js";import{P as Et}from"./ProductCard-BhcnXyBz.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const oi=s.div`
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
`,ni=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
`,si=s.div`
  color: #fffdf9;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  letter-spacing: 0.05em;
`,ai=s.button`
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
`,li=s.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
`,ci=s.div`
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
`,wt=s.button`
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
`,di=s.div`
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
`,_e=s.button`
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
`,pi=s.span`
  color: #c9a45c;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 48px;
  text-anchor: middle;
  text-align: center;
`,xi=s.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  overflow-x: auto;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  z-index: 10;
  -webkit-overflow-scrolling: touch;
`,ui=s.button`
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
`,gi=({images:r,activeIndex:u,productName:i,isOpen:f,onClose:$,onSelectIndex:T})=>{const[h,v]=c.useState(1),[y,x]=c.useState({x:0,y:0}),[l,B]=c.useState(!1),[w,N]=c.useState({x:0,y:0}),[C,k]=c.useState(null),[L,R]=c.useState(0),P=c.useRef(null);if(c.useEffect(()=>{v(1),x({x:0,y:0})},[u,f]),c.useEffect(()=>{const p=A=>{A.key==="Escape"&&f&&$()};return window.addEventListener("keydown",p),()=>window.removeEventListener("keydown",p)},[f,$]),!f||r.length===0)return null;const ge=r[u]||r[0],d=()=>{v(p=>Math.min(p+.5,3.5))},g=()=>{v(p=>{const A=Math.max(p-.5,1);return A===1&&x({x:0,y:0}),A})},D=()=>{v(1),x({x:0,y:0})},F=p=>{p==null||p.stopPropagation(),D(),T(u===0?r.length-1:u-1)},ie=p=>{p==null||p.stopPropagation(),D(),T(u===r.length-1?0:u+1)},$e=p=>{p.preventDefault(),p.deltaY<0?v(A=>Math.min(A+.25,3.5)):v(A=>{const G=Math.max(A-.25,1);return G===1&&x({x:0,y:0}),G})},re=p=>{h<=1||(B(!0),N({x:p.clientX-y.x,y:p.clientY-y.y}))},Qe=p=>{if(!l||h<=1)return;const A=p.clientX-w.x,G=p.clientY-w.y,Y=(h-1)*300,oe=Math.max(-Y,Math.min(Y,A)),Ie=Math.max(-Y,Math.min(Y,G));x({x:oe,y:Ie})},et=()=>{B(!1)},we=p=>{if(p.touches.length===2){const G=Math.hypot(p.touches[0].clientX-p.touches[1].clientX,p.touches[0].clientY-p.touches[1].clientY);k(G);return}const A=Date.now();A-L<300&&(h>1?D():v(2)),R(A),h>1&&p.touches.length===1&&(B(!0),N({x:p.touches[0].clientX-y.x,y:p.touches[0].clientY-y.y}))},tt=p=>{if(p.touches.length===2&&C!==null){const A=Math.hypot(p.touches[0].clientX-p.touches[1].clientX,p.touches[0].clientY-p.touches[1].clientY),G=A-C;Math.abs(G)>4&&(v(Y=>{const oe=Math.min(Math.max(Y+(G>0?.08:-.08),1),3.5);return oe===1&&x({x:0,y:0}),oe}),k(A));return}if(l&&h>1&&p.touches.length===1){const A=p.touches[0].clientX-w.x,G=p.touches[0].clientY-w.y,Y=(h-1)*300;x({x:Math.max(-Y,Math.min(Y,A)),y:Math.max(-Y,Math.min(Y,G))})}},U=()=>{B(!1),k(null)};return e.jsxs(oi,{onClick:$,children:[e.jsxs(ni,{onClick:p=>p.stopPropagation(),children:[e.jsx(si,{children:i}),e.jsx(ai,{onClick:$,"aria-label":"Close Lightbox",children:e.jsx(Ze,{size:20})})]}),e.jsxs(li,{ref:P,onWheel:$e,onMouseDown:re,onMouseMove:Qe,onMouseUp:et,onTouchStart:we,onTouchMove:tt,onTouchEnd:U,onClick:p=>p.stopPropagation(),children:[e.jsx(ci,{$isDragging:l,style:{transform:`translate3d(${y.x}px, ${y.y}px, 0) scale(${h})`},children:e.jsx(bt,{src:ge,alt:i})}),r.length>1&&e.jsxs(e.Fragment,{children:[e.jsx(wt,{$direction:"left",onClick:F,"aria-label":"Previous Image",children:e.jsx(Te,{size:24})}),e.jsx(wt,{$direction:"right",onClick:ie,"aria-label":"Next Image",children:e.jsx(Be,{size:24})})]}),e.jsxs(di,{onClick:p=>p.stopPropagation(),children:[e.jsx(_e,{onClick:g,disabled:h<=1,title:"Zoom Out",children:e.jsx(Yt,{size:18})}),e.jsxs(pi,{children:[Math.round(h*100),"%"]}),e.jsx(_e,{onClick:d,disabled:h>=3.5,title:"Zoom In",children:e.jsx(At,{size:18})}),e.jsx(_e,{onClick:D,title:"Reset Zoom",children:e.jsx(Ht,{size:16})})]})]}),r.length>1&&e.jsx(xi,{onClick:p=>p.stopPropagation(),children:r.map((p,A)=>e.jsx(ui,{$active:u===A,onClick:()=>{D(),T(A)},"aria-label":`View image ${A+1}`,children:e.jsx(bt,{src:p,alt:`${i} thumbnail ${A+1}`})},A))})]})},a={white:"#151515",primaryText:"#F5F1E8",secondaryText:"#A8A8A8",gold:"#C9A96E",darkGold:"#8C744B",lightGold:"#DFCA9B",border:"rgba(140, 116, 75, 0.25)"},mi=s.section`
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
`,hi=s.div`
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
`,fi=s.div`
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
`,bi=s.div`
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
`,yi=s.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${a.border};
`,wi=s.div`
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
`,vi=s.div`
  display: ${({$isOpen:r})=>r?"block":"none"};
  padding: 0 0 16px 0;
  font-size: 0.88rem;
  color: ${a.secondaryText};
  line-height: 1.6;
`,ji=({content:r})=>{const[u,i]=c.useState(null);if(r&&r.showPackagingSection===!1)return null;const f=y=>y?y.replace(/FedEx\s+Priority\s+Air/gi,"Priority Air").replace(/FedEx\s+locations/gi,"express courier locations").replace(/FedEx/gi,"Priority Air").replace(/We\s+also\s+offer\s+a\s+30-day\s+return\s+policy,\s+subject\s+to\s+our\s+return\s+terms\s+and\s+conditions\./gi,"").replace(/30-day\s+return\s+policy\./gi,"").trim():"";let $=[{title:"Discreet Packaging",content:"Every order is shipped in plain, unbranded outer security boxes. There is no mention of AethelCarats or diamond jewelry on the package exterior for 100% privacy and security."},{title:"Secure and Convenient Pickup Option",content:"Hold your order for pick up at thousands of secure express courier locations or choose insured signature delivery directly to your doorstep."},{title:"SHIPPING & DELIVERY",content:"After order confirmation, your order will be dispatched within 7-10 working days. Once dispatched, delivery is estimated within an additional 7-10 working days. All shipments are sent via fully insured Priority Air for secure and reliable delivery."}];if(r&&r.packagingItemsJson)try{const y=typeof r.packagingItemsJson=="string"?JSON.parse(r.packagingItemsJson):r.packagingItemsJson;Array.isArray(y)&&y.length>0&&($=y.filter(x=>x.isActive!==!1).map(x=>({title:x.title,content:f(x.description||x.content)})))}catch{}const T=(r==null?void 0:r.packagingHeading)||"We're committed to making your entire experience a pleasant one, from shopping to shipping.",h=(r==null?void 0:r.packagingDescription)||"Every item we send comes in our signature AethelCarats packaging. Engagement rings arrive in a deluxe velvet ring box within an elegant presentation box ready for your proposal. The presentation box also secures your appraisal certificate and GIA/IGI diamond grading report. Loose diamonds are presented in a velvet lined diamond case that securely holds the stone.",v=(r==null?void 0:r.packagingImageUrl)||"";return e.jsx(Xe,{yOffset:35,children:e.jsx(mi,{children:e.jsxs(hi,{children:[!!v&&e.jsx(fi,{children:e.jsx("img",{src:v,alt:"AethelCarats Signature Packaging"})}),e.jsxs(bi,{children:[e.jsx("h2",{children:T}),e.jsx("p",{children:h}),e.jsx(yi,{children:$.map((y,x)=>e.jsxs(Ne.Fragment,{children:[e.jsxs(wi,{onClick:()=>i(u===x?null:x),children:[e.jsx("span",{children:y.title}),e.jsx("span",{style:{fontSize:"1.2rem",color:a.gold},children:u===x?"−":"+"})]}),e.jsx(vi,{$isOpen:u===x,children:y.content})]},x))})]})]})})})},Si=s.section`
  max-width: 1280px;
  margin: 80px auto 0;
  padding: 0 24px;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px;
  }
`,ki=s.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  text-align: center;
  color: ${a.primaryText};
  margin-bottom: 40px;
`,Ci=s.div`
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
`,Ai=s.div`
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
`,vt=s.button`
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
`,Ei=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid ${a.border};
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;
`,Ce=s.div`
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
`,zi=s.div`
  display: flex;
  gap: 24px;
  padding: 32px 0;
  border-bottom: 1px solid ${a.border};

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
  }
`,Ti=s.div`
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
`,Bi=s.div`
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
`,Ni=s.div`
  position: fixed;
  inset: 0;
  background: rgba(28, 28, 28, 0.6);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`,$i=s.div`
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
`,Ii=({productName:r="AethelCarats Creation",content:u,productId:i,reviews:f})=>{const[$,T]=c.useState(!1),[h,v]=c.useState(5),[y,x]=c.useState(""),[l,B]=c.useState(""),[w,N]=c.useState("");if(u&&(u.reviewsEnabled===!1||u.showReviews===!1))return null;const[C,k]=c.useState(()=>f&&Array.isArray(f)&&f.length>0?f.map((d,g)=>({id:d.id||`rev_${g}`,name:d.author||d.name||d.authorName||"Verified Buyer",verified:!0,rating:Number(d.rating)||5,title:d.title||(d.comment?d.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:d.date||(d.createdAt?new Date(d.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:d.text||d.comment||d.content||"",productReviewed:d.productReviewed||r,response:d.response||null})):[]);c.useEffect(()=>{let d=!0;return f&&Array.isArray(f)&&f.length>0?k(f.map((g,D)=>({id:g.id||`rev_${D}`,name:g.author||g.name||g.authorName||"Verified Buyer",verified:!0,rating:Number(g.rating)||5,title:g.title||(g.comment?g.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:g.date||(g.createdAt?new Date(g.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:g.text||g.comment||g.content||"",productReviewed:g.productReviewed||r,response:g.response||null}))):Z.get("/reviews"+(i?`?productId=${i}`:"")).then(g=>{if(!d)return;const D=Array.isArray(g.data)?g.data:Array.isArray(g)?g:[];D.length>0&&k(D.map((F,ie)=>({id:F.id||`rev_${ie}`,name:F.author||F.name||F.authorName||"Verified Buyer",verified:!0,rating:Number(F.rating)||5,title:F.title||(F.comment?F.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:F.date||(F.createdAt?new Date(F.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:F.text||F.comment||F.content||"",productReviewed:F.productReviewed||r,response:F.response||null})))}).catch(console.error),()=>{d=!1}},[i,f,r]);const L=async d=>{if(d.preventDefault(),!y||!l||!w){alert("Please fill in all required fields.");return}const g={id:`rev_${Date.now()}`,name:y,author:y,verified:!0,rating:h,title:l,date:new Date().toLocaleDateString("en-US"),text:w,comment:`${l}

${w}`,productReviewed:r,response:"Thank you for sharing your experience with AethelCarats!"};k([g,...C]),T(!1);try{await Z.post("/reviews",{productId:i,author:y,rating:h,title:l,comment:w,isApproved:!0})}catch(D){console.warn("Review API submission notice:",D)}x(""),B(""),N(""),alert("Thank you! Your review has been submitted successfully.")},R=(u==null?void 0:u.reviewsTitle)||"Item Reviews";u==null||u.reviewsVerifiedBadge;const P=(u==null?void 0:u.reviewsSubmissionEnabled)??!0,ge=C.length>0?(C.reduce((d,g)=>d+(Number(g.rating)||5),0)/C.length).toFixed(1):"0.0";return e.jsxs(Si,{children:[e.jsx(ki,{children:R}),e.jsxs(Ci,{children:[e.jsxs(Ai,{children:[e.jsx("div",{className:"score-num",children:ge}),e.jsxs("div",{className:"stars-col",children:[e.jsx("div",{className:"stars-row",children:[...Array(5)].map((d,g)=>e.jsx(Ue,{size:18,fill:C.length>0&&g<Math.round(Number(ge))?a.gold:"none",color:a.gold},g))}),e.jsx("div",{className:"rev-count",children:C.length>0?`${C.length} Verified ${C.length===1?"Review":"Reviews"}`:"No customer reviews yet"})]})]}),P&&e.jsx(vt,{onClick:()=>T(!0),children:"Write A Review"})]}),C.length>0&&e.jsxs(Ei,{children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:[e.jsxs(Ce,{children:[e.jsx("input",{type:"checkbox",id:"withMedia",defaultChecked:!0,style:{accentColor:a.gold}}),e.jsx("label",{htmlFor:"withMedia",children:"With media"})]}),e.jsx(Ce,{children:e.jsxs("select",{defaultValue:"all",children:[e.jsx("option",{value:"all",children:"Recommendation (All)"}),e.jsx("option",{value:"yes",children:"Recommends Product"})]})}),e.jsx(Ce,{children:e.jsxs("select",{defaultValue:"exceeds",children:[e.jsx("option",{value:"exceeds",children:"Expectations (Exceeds)"}),e.jsx("option",{value:"met",children:"Met Expectations"})]})})]}),e.jsxs(Ce,{children:[e.jsx("span",{children:"Sort by:"}),e.jsxs("select",{defaultValue:"relevant",children:[e.jsx("option",{value:"relevant",children:"Most relevant"}),e.jsx("option",{value:"newest",children:"Newest first"}),e.jsx("option",{value:"highest",children:"Highest rated"})]})]})]}),e.jsx("div",{children:C.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"48px 24px",color:"#666",background:"#FDFBF7",borderRadius:"4px",border:"1px dashed #E5DFD5"},children:[e.jsx("p",{style:{fontFamily:"Cinzel, serif",fontSize:"1.05rem",color:"#1A1815",marginBottom:"8px"},children:"No Customer Reviews Yet"}),e.jsx("p",{style:{fontSize:"0.88rem",color:"#777",marginBottom:"16px"},children:"Be the first to share your experience with this bespoke creation."}),P&&e.jsx(vt,{onClick:()=>T(!0),children:"Write The First Review"})]}):C.map(d=>e.jsxs(zi,{children:[e.jsxs(Ti,{children:[e.jsx("div",{className:"avatar-circle",children:d.name.charAt(0)}),e.jsx("div",{className:"user-name",children:d.name}),d.verified&&e.jsxs("div",{className:"verified-badge",children:[e.jsx(Vt,{size:12,color:a.darkGold})," Verified Buyer"]})]}),e.jsxs(Bi,{children:[e.jsxs("div",{className:"review-header",children:[e.jsxs("div",{className:"rating-and-title",children:[e.jsx("div",{className:"stars",children:[...Array(d.rating)].map((g,D)=>e.jsx(Ue,{size:14,fill:a.gold,color:a.gold},D))}),e.jsx("div",{className:"title",children:d.title})]}),e.jsx("div",{className:"date",children:d.date})]}),e.jsx("div",{className:"body-text",children:d.text}),e.jsxs("div",{className:"product-reviewed",children:["Product reviewed: ",d.productReviewed]}),d.response&&e.jsxs("div",{className:"atelier-response",children:[e.jsx("div",{className:"resp-title",children:"AethelCarats Atelier Team"}),e.jsx("div",{className:"resp-body",children:d.response})]})]})]},d.id))}),$&&e.jsx(Ni,{onClick:()=>T(!1),children:e.jsxs($i,{onClick:d=>d.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12},children:[e.jsx("h3",{children:"Write a Review"}),e.jsx(Ze,{size:20,style:{cursor:"pointer",color:a.secondaryText},onClick:()=>T(!1)})]}),e.jsxs("p",{children:["Share your authentic experience with ",r,"."]}),e.jsxs("form",{onSubmit:L,style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Rating"}),e.jsx("div",{style:{display:"flex",gap:6},children:[1,2,3,4,5].map(d=>e.jsx(Ue,{size:24,style:{cursor:"pointer"},fill:d<=h?a.gold:"none",color:a.gold,onClick:()=>v(d)},d))})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Your Name"}),e.jsx("input",{type:"text",required:!0,value:y,onChange:d=>x(d.target.value),placeholder:"e.g. Patty G.",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem",background:"#0B0B0B",color:"#F5F1E8"}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Headline / Title"}),e.jsx("input",{type:"text",required:!0,value:l,onChange:d=>B(d.target.value),placeholder:"e.g. Perfect description & exquisite craftsmanship",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem",background:"#0B0B0B",color:"#F5F1E8"}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Review Details"}),e.jsx("textarea",{required:!0,rows:4,value:w,onChange:d=>N(d.target.value),placeholder:"Write your review here...",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem",fontFamily:"inherit",background:"#0B0B0B",color:"#F5F1E8"}})]}),e.jsx("button",{type:"submit",style:{width:"100%",padding:14,backgroundColor:a.gold,color:"#0B0B0B",border:"none",borderRadius:4,fontWeight:700,fontSize:"0.85rem",cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase"},children:"Submit Verified Review"})]})]})})]})},zt=s.div`
  position: relative;
  width: 100%;
`,Tt=s.div`
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
`,ze=s.button`
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
`,Fi=s.section`
  width: 100%;
  max-width: 100%;
  margin: 80px 0 0;
  padding: 0 48px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px;
  }
`,Ri=s.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  color: ${a.primaryText};
  margin-bottom: 28px;
`,Li=({items:r=[],currentProductId:u,category:i,content:f})=>{const[$,T]=c.useState([]),h=Ne.useRef(null);if(f&&(f.similarItemsEnabled===!1||f.showSimilarItems===!1))return null;const v=(f==null?void 0:f.similarItemsTitle)||"Similar Items";c.useEffect(()=>{let l=Array.isArray(r)?r.filter(w=>w&&w.id!==u):[];if(l.length>0){T(l);return}const B={limit:16,status:"ACTIVE"};i&&(B.jewelleryType=i),Z.getProducts(B).then(w=>{const C=(Array.isArray(w)?w:(w==null?void 0:w.products)||[]).filter(k=>k&&k.id!==u);T(C)}).catch(()=>{T(l)})},[r,u,i]);const y=$.filter(l=>l&&l.id!==u);if(y.length===0)return null;const x=l=>{if(h.current){const B=l==="left"?-340:340;h.current.scrollBy({left:B,behavior:"smooth"})}};return e.jsxs(Fi,{children:[e.jsx(Ri,{children:v}),e.jsxs(zt,{children:[y.length>3&&e.jsx(ze,{$direction:"left",onClick:()=>x("left"),children:e.jsx(Te,{size:22})}),e.jsx(Tt,{ref:h,children:y.map((l,B)=>e.jsx(Et,{product:l},l.id||`sim_${B}`))}),y.length>3&&e.jsx(ze,{$direction:"right",onClick:()=>x("right"),children:e.jsx(Be,{size:22})})]})]})},Pi=s.section`
  width: 100%;
  max-width: 100%;
  margin: 80px 0 0;
  padding: 0 48px 80px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px 48px;
  }
`,Di=s.div`
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
`,Mi=({currentProductId:r,content:u})=>{const[i,f]=c.useState([]),$=Ne.useRef(null);if(u&&(u.recentlyViewedEnabled===!1||u.showRecentlyViewed===!1))return null;const T=(u==null?void 0:u.recentlyViewedTitle)||"Recently Viewed";c.useEffect(()=>{let x=[];try{const l=localStorage.getItem("app_recently_viewed");l&&(x=JSON.parse(l))}catch{}if(!Array.isArray(x)||x.length===0){f([]);return}Z.getProducts({status:"ACTIVE",limit:100}).then(l=>{const B=Array.isArray(l)?l:(l==null?void 0:l.products)||[],w=new Map;B.forEach(k=>{k.id&&w.set(String(k.id),k),k.slug&&w.set(String(k.slug).toLowerCase(),k)});const N=new Set;r&&N.add(String(r));const C=[];for(const k of x){if(!k)continue;const L=k.id?String(k.id):"",R=k.slug?String(k.slug).toLowerCase():"",P=L&&w.get(L)||R&&w.get(R);P&&(N.has(P.id)||(N.add(P.id),C.push(P)))}try{const k=x.filter(L=>{if(!L)return!1;const R=L.id?String(L.id):"",P=L.slug?String(L.slug).toLowerCase():"";return R&&w.has(R)||P&&w.has(P)});localStorage.setItem("app_recently_viewed",JSON.stringify(k))}catch{}f(C)}).catch(()=>{f([])})},[r]);const h=new Set,v=i.filter(x=>{if(!x||r&&x.id===r)return!1;const l=x.id?`id:${x.id}`:null,B=x.slug?`slug:${x.slug}`:null,w=(x.title||x.name||"").trim().toLowerCase(),N=w?`name:${w}`:null;return l&&h.has(l)||B&&h.has(B)||N&&h.has(N)?!1:(l&&h.add(l),B&&h.add(B),N&&h.add(N),!0)});if(v.length===0)return null;const y=x=>{if($.current){const l=x==="left"?-340:340;$.current.scrollBy({left:l,behavior:"smooth"})}};return e.jsx(Xe,{yOffset:35,children:e.jsxs(Pi,{children:[e.jsxs(Di,{children:[e.jsx("h2",{children:T}),e.jsx("a",{href:"/rings",className:"see-all",children:"See All ›"})]}),e.jsxs(zt,{children:[v.length>3&&e.jsx(ze,{$direction:"left",onClick:()=>y("left"),children:e.jsx(Te,{size:22})}),e.jsx(Tt,{ref:$,children:v.map((x,l)=>e.jsx(Xe,{staggerIndex:l,yOffset:25,style:{flexShrink:0},children:e.jsx(Et,{product:x})},x.id||`rec_${l}`))}),v.length>3&&e.jsx(ze,{$direction:"right",onClick:()=>y("right"),children:e.jsx(Be,{size:22})})]})]})})},qe=s.div`
  background-color: #0B0B0B;
  min-height: 100vh;
  width: 100%;
`,Ae=s.div`
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
`,Ke=s.div`
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
`,Oi=s.div`
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
`,Wi=s.div`
  width: 100%;
  min-width: 0;
  /* Removed fixed height, align-self, position sticky, and top */
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`,Gi=s.div`
  width: 100%;
  /* Removed height, overflow-y: scroll, and scrollbar hiding */
  /* Now it will just flow naturally with the window scroll */
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`,Ui=s.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`,Yi=s.div`
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
`,Hi=s.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: relative;
    width: 100%;
    margin-bottom: 24px;
  }
`,Vi=s.div`
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
`,Ji=s.div`
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
`,jt=s.button`
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
`,_i=s.div`
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
`,qi=s.div`
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
`,Ki=s.div`
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
`,Xi=s.div`
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
`,Zi=s.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: #A8A8A8;

  .stars {
    color: #C9A96E;
    letter-spacing: 2px;
  }
`,Qi=s.div`
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
`,Ee=s.div`
  padding-bottom: 14px;
  margin-bottom: 14px;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);
`,er=s.div`
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
`,tr=s.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`,ir=s.div`
  display: grid;
  grid-template-columns: ${({$count:r})=>r===3?"repeat(3, 1fr)":r===2?"repeat(2, 1fr)":"repeat(auto-fit, minmax(130px, 1fr))"};
  gap: 8px;

  @media (max-width: 480px) {
    grid-template-columns: ${({$count:r})=>r>=3?"repeat(3, 1fr)":"repeat(auto-fit, minmax(105px, 1fr))"};
    gap: 6px;
  }
`,rr=s.button`
  width: 100%;
  padding: 9px 8px;
  background: ${({$isSelected:r})=>r?"rgba(201, 169, 110, 0.14)":"#141414"};
  border: 1.5px solid ${({$isSelected:r})=>r?"#C9A96E":"rgba(140, 116, 75, 0.25)"};
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({$isSelected:r})=>r?"#F5F1E8":"#D8D2C5"};
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  letter-spacing: 0.02em;
  line-height: 1.25;

  &:hover {
    border-color: #C9A96E;
    color: #F5F1E8;
    background: ${({$isSelected:r})=>r?"rgba(201, 169, 110, 0.2)":"#1c1c1c"};
  }

  @media (max-width: 480px) {
    font-size: 0.74rem;
    padding: 7px 4px;
  }
`,or=s.div`
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
`,nr=s.div`
  position: relative;
  width: 155px;
`,sr=s.button`
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
`,ar=s.div`
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
`;s.div`
  margin-bottom: 0;
`;s.button`
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
`;s.input`
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
`;const lr=s.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,cr=s.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  color: #F5F1E8;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
`,dr=s.input`
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
`,pr=s.textarea`
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
`,xr=s.select`
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
`,ur=s.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
`,gr=s.button`
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
`,mr=s.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 18px 0;
`,hr=s.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  gap: 10px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    .qty-selector-col { display: none; }
  }
`,fr=s.div`
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
`,br=s.button`
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
`,yr=s.button`
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
`,wr=s.button`
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
`,vr=s.div`
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
`,jr=s.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(140, 116, 75, 0.2);
`,Sr=s.div`
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
`,kr=s.div`
  display: ${({$open:r})=>r?"block":"none"};
  padding: 0 0 16px 0;
  font-size: 0.88rem;
  color: #D8D2C5;
  line-height: 1.6;
`,Cr=s.div`
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
`,Ar=s.div`
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
`,Er=s.div`
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
`,St=s.div`
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
`,kt=({src:r,alt:u,style:i,onLoad:f})=>{const[$,T]=c.useState(r);return c.useEffect(()=>{T(r)},[r]),e.jsx("img",{src:$||"",alt:u,style:i,onLoad:f,onError:()=>{$!==""&&T("")}})},Ct=[{id:"exp",title:"YOUR AETHELCARATS EXPERIENCE",content:"Every creation is handcrafted in our Surat atelier using certified conflict-free materials and 100% recycled precious metals. Includes complimentary sizing, insured shipping, and lifetime cleaning.",enabled:!0,defaultOpen:!0},{id:"specs",title:"PRODUCT & DIAMOND SPECIFICATIONS",content:"Hand-selected center stone with optical precision cut. Crafted in solid 14k/18k gold with stamped hallmark verification.",enabled:!0,defaultOpen:!1},{id:"craft",title:"CRAFTSMANSHIP & SUSTAINABILITY",content:"Our Surat workshop directly sources lab-grown and natural diamonds, eliminating traditional markups and maintaining ethical standards.",enabled:!0,defaultOpen:!1},{id:"shipping",title:"SHIPPING & DELIVERY",content:"Free insured worldwide shipping with signature confirmation. Standard production time is 7 to 12 business days.",enabled:!0,defaultOpen:!1}],zr=({saleEndsAt:r})=>{const[u,i]=c.useState(null);return c.useEffect(()=>{const f=()=>{const T=new Date(r).getTime(),h=new Date().getTime(),v=T-h;if(isNaN(T)||v<=0){i(null);return}const y=Math.floor(v/(1e3*60*60*24)),x=Math.floor(v%(1e3*60*60*24)/(1e3*60*60)),l=Math.floor(v%(1e3*60*60)/(1e3*60)),B=Math.floor(v%(1e3*60)/1e3);i({days:y,hours:x,mins:l,secs:B})};f();const $=setInterval(f,1e3);return()=>clearInterval($)},[r]),u?e.jsxs(Er,{children:[e.jsx("div",{className:"timer-header",children:e.jsx("span",{children:"⏳ Limited Time Offer — Sale Ends In:"})}),e.jsxs("div",{className:"timer-units",children:[e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(u.days).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Days"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(u.hours).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Hours"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(u.mins).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Mins"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(u.secs).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Secs"})]})]})]}):null},Tr=(r,u)=>{const i=(r||"").trim();return i||(u||"").trim()||"AethelCarats Fine Jewellery Creation"},Pr=()=>{var pt,xt,ut;const{slug:r}=Jt(),u=_t(),[i,f]=c.useState(null),[$,T]=c.useState([]),[h,v]=c.useState(0),[y,x]=c.useState(!1),[l,B]=c.useState(null),[w,N]=c.useState("loading"),C=c.useRef(null),k=c.useRef(null),L=c.useRef(null),[R,P]=c.useState("14K Yellow Gold"),[ge,d]=c.useState("14k"),[g,D]=c.useState("Select"),[F,ie]=c.useState(!1),[$e,re]=c.useState(!1),[Qe,et]=c.useState(!1),[we,tt]=c.useState(""),[U,p]=c.useState(1),[A,G]=c.useState(!1),[Y,oe]=c.useState(!1),[Ie,it]=c.useState("exp"),[H,ce]=c.useState({}),[ne,q]=c.useState({}),[se,Bt]=c.useState(null),[de,Nt]=c.useState({show:!1,message:"",type:"success"}),[W,$t]=c.useState({enableConsultAtelierExpert:"true",consultTitle:"Consult an AethelCarats Atelier Expert",consultDescription:"Speak directly with our AethelCarats Fine Jewellery Atelier specialists regarding custom design, diamond selection, or sizing guidance.",consultPhone:"+91 79902 78892",consultPhoneLabel:"Call Atelier",consultEmail:"concierge@aethelcarats.com",consultEmailLabel:"Email Concierge",consultCloseLabel:"Close"}),{cartItems:ve,addToCart:rt,updateQuantity:It}=Qt(),{isInWishlist:Ft,toggleWishlist:Rt}=ei(),{showToast:Lt}=ti(),me=(t,o="success")=>{Lt(t,o)};c.useEffect(()=>{const t=()=>{window.scrollY>550?G(!0):G(!1)};return window.addEventListener("scroll",t,{passive:!0}),()=>window.removeEventListener("scroll",t)},[]),c.useEffect(()=>{const t=o=>{L.current&&!L.current.contains(o.target)&&ie(!1)};return document.addEventListener("mousedown",t),()=>document.removeEventListener("mousedown",t)},[]),c.useEffect(()=>{Z.getSiteSettings().then(t=>{t&&typeof t=="object"&&Object.keys(t).length>0&&$t(o=>({...o,...t}))}).catch(console.error),Z.getHolidayModeStatus().then(Bt).catch(console.error)},[]),c.useEffect(()=>{let t=!0;if(r){f(null),N("loading");const o=setTimeout(()=>{t&&(console.warn("Product request timed out after 10 seconds."),f(null),N("error"))},1e4);return Z.getProductBySlug(r).then(n=>{if(!t)return;clearTimeout(o);const b=(n==null?void 0:n.product)||(n!=null&&n.id?n:null);if(b&&b.id){f(b),T((n==null?void 0:n.relatedProducts)||[]),v(0),N("success");try{const E=localStorage.getItem("app_recently_viewed"),M=E?JSON.parse(E):[],ee=(b.title||b.name||"").trim().toLowerCase(),K=M.filter(j=>{if(!j||j.id&&b.id&&j.id===b.id||j.slug&&b.slug&&j.slug===b.slug)return!1;const z=(j.title||j.name||"").trim().toLowerCase();return!(ee&&z&&ee===z)}),S=[b,...K].slice(0,10);localStorage.setItem("app_recently_viewed",JSON.stringify(S))}catch{}if(b.metal){const E=b.metal;P(E);const M=E.toLowerCase();d(M.includes("18k")?"18k":M.includes("10k")?"10k":M.includes("9k")?"9k":M.includes("silver")?"silver":M.includes("platinum")?"platinum":"14k")}else if(b.metalsConfig){let E=b.metalsConfig;if(typeof E=="string")try{E=JSON.parse(E)}catch{}if(Array.isArray(E)&&E.length>0){const M=ii(E),K=M.find(j=>{const z=typeof j=="string"?j:j.label||j.name||"";return z.toLowerCase().includes("14k")&&z.toLowerCase().includes("yellow")})||M[0],S=typeof K=="string"?K:K.label||K.name;if(S){P(S);const j=String(S).toLowerCase();d(j.includes("18k")?"18k":j.includes("10k")?"10k":j.includes("9k")?"9k":j.includes("silver")?"silver":j.includes("platinum")?"platinum":"14k")}}}Z.get(`/product-page-content/${b.id}`).then(E=>{t&&E.data&&E.data.content&&B(E.data.content)}).catch(console.error);let m=[];try{b.accordionsConfig&&(m=typeof b.accordionsConfig=="string"?JSON.parse(b.accordionsConfig):b.accordionsConfig)}catch{}(!m||m.length===0)&&(m=Ct);const I=m.find(E=>E.enabled!==!1&&E.defaultOpen);I&&it(I.id||I.title)}else f(null),N("not_found")}).catch(n=>{var b;t&&(clearTimeout(o),console.error("Error fetching product by slug:",n),f(null),((b=n==null?void 0:n.response)==null?void 0:b.status)===404||(n==null?void 0:n.status)===404?N("not_found"):N("error"))}),()=>{t=!1,clearTimeout(o)}}else f(null),N("not_found")},[r]);const[pe,Fe]=c.useState(null),[ot,Re]=c.useState(null);c.useEffect(()=>{var t;if(i){const o=i.reviewCount??(((t=i.reviews)==null?void 0:t.length)||0),n=o>0?i.avgRating??5:0;Fe(o),Re(n);let b=!0;return Z.get(`/reviews?productId=${i.id}`).then(m=>{if(!b)return;const I=Array.isArray(m.data)?m.data:Array.isArray(m)?m:[];if(I.length>0){Fe(I.length);const E=I.reduce((M,ee)=>M+(Number(ee.rating)||5),0);Re(Math.round(E/I.length*10)/10)}else Fe(0),Re(0)}).catch(console.error),()=>{b=!1}}},[i==null?void 0:i.id]),c.useLayoutEffect(()=>{i&&window.scrollTo(0,0)},[i==null?void 0:i.id]);const he=c.useMemo(()=>!i||!ve?-1:ve.findIndex(t=>{var o;return(t.id===i.id||((o=t.product)==null?void 0:o.id)===i.id||t.productId===i.id)&&(!R||t.selectedMetal===R)}),[ve,i==null?void 0:i.id,R]),xe=he>=0?ve[he]:null;c.useEffect(()=>{xe&&xe.quantity&&p(xe.quantity)},[xe==null?void 0:xe.quantity,he]);const je=t=>{const o=Math.max(1,t),n=o-U;p(o),he>=0&&n!==0&&It(he,n)},Pt=t=>{it(o=>o===t?null:t)},Dt=()=>{if(!C.current)return;const t=C.current.scrollLeft,o=C.current.clientWidth;if(o>0){const n=Math.round(t/o);n!==h&&n>=0&&n<V.length&&v(n)}},Le=t=>{if(v(t),C.current){const o=C.current.clientWidth;C.current.scrollTo({left:t*o,behavior:"smooth"})}};if(w==="loading")return e.jsx(Ae,{style:{textAlign:"center",padding:80},children:e.jsx("div",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.6rem",color:"#c9a45c",letterSpacing:"0.08em"},children:"LOADING AETHELCARATS PRODUCT..."})});if(w==="not_found"||!i&&w!=="error")return e.jsx(qe,{children:e.jsxs(Ae,{style:{paddingBottom:60},children:[e.jsxs(Ke,{children:[e.jsx(X,{to:"/",children:"Home"})," / ",e.jsx(X,{to:"/collections",children:"Jewellery"})," / ",e.jsx("span",{className:"current",children:"Product Not Found"})]}),e.jsxs(St,{children:[e.jsx("div",{className:"not-found-icon",children:e.jsx(Ye,{size:28})}),e.jsx("h1",{children:"PRODUCT NOT FOUND"}),e.jsx("p",{children:"We're sorry, but this product is no longer available."}),e.jsx("div",{className:"cta-group",children:e.jsx(X,{to:"/collections",className:"btn-primary",children:"VIEW ALL JEWELLERY"})})]})]})});if(w==="error"||!i)return e.jsx(qe,{children:e.jsxs(Ae,{style:{paddingBottom:60},children:[e.jsxs(Ke,{children:[e.jsx(X,{to:"/",children:"Home"})," / ",e.jsx(X,{to:"/collections",children:"Jewellery"})," / ",e.jsx("span",{className:"current",children:"Error Loading Product"})]}),e.jsxs(St,{children:[e.jsx("div",{className:"not-found-icon",style:{color:"#c5221f",background:"#fdf2f2",borderColor:"#f8d7da"},children:e.jsx(mt,{size:28})}),e.jsx("h1",{children:"UNABLE TO LOAD PRODUCT"}),e.jsx("p",{children:"We encountered a temporary network or server error while loading this piece. Please try again."}),e.jsxs("div",{className:"cta-group",children:[e.jsx("button",{className:"btn-primary",onClick:()=>window.location.reload(),children:"RETRY"}),e.jsx(X,{to:"/collections",className:"btn-secondary",children:"VIEW ALL JEWELLERY"})]})]})]})});const nt=Ft(i.id),Mt=i.images&&Array.isArray(i.images)&&i.images.length>0?i.images.map(t=>typeof t=="string"?t:t==null?void 0:t.url):[i.primaryImage||i.mainImage,i.secondaryImage],V=Array.from(new Set(Mt.filter(Boolean))),Ot=V[h]||V[0]||"",fe=!!(((i.jewelleryType||"").toLowerCase()==="rings"||(i.jewelleryType||"").toLowerCase()==="engagement rings"||(i.jewelleryType||"").toLowerCase()==="wedding bands"||(((pt=i.category)==null?void 0:pt.name)||"").toLowerCase().includes("ring")||(i.name||"").toLowerCase().includes("ring")||i.enableRingSize===!0)&&!(i.jewelleryType||"").toLowerCase().includes("earring")&&!(i.jewelleryType||"").toLowerCase().includes("necklace")&&!(i.jewelleryType||"").toLowerCase().includes("bracelet")&&!(i.jewelleryType||"").toLowerCase().includes("pendant")),Q=!!(i.onSale===!0&&(i.comparePrice&&Number(i.comparePrice)>Number(i.price)||i.salePrice&&Number(i.salePrice)>0)),Pe=Q&&i.comparePrice&&Number(i.comparePrice)>Number(i.price)?Number(i.comparePrice):Q&&i.salePrice&&Number(i.price)>Number(i.salePrice)?Number(i.price):null;let ae=i.metalsConfig;if(typeof ae=="string")try{ae=JSON.parse(ae)}catch{ae=[]}const De=[...!Array.isArray(ae)||ae.length===0?[{label:"925 Sterling Silver",code:"silver",priceAdjustment:-1e3},{label:"9K Yellow Gold",code:"9k",priceAdjustment:-600},{label:"9K White Gold",code:"9k",priceAdjustment:-600},{label:"9K Rose Gold",code:"9k",priceAdjustment:-600},{label:"10K Yellow Gold",code:"10k",priceAdjustment:-400},{label:"10K White Gold",code:"10k",priceAdjustment:-400},{label:"10K Rose Gold",code:"10k",priceAdjustment:-400},{label:"14K Yellow Gold",code:"14k",priceAdjustment:0},{label:"14K White Gold",code:"14k",priceAdjustment:0},{label:"14K Rose Gold",code:"14k",priceAdjustment:0},{label:"18K Yellow Gold",code:"18k",priceAdjustment:250},{label:"18K White Gold",code:"18k",priceAdjustment:350},{label:"18K Rose Gold",code:"18k",priceAdjustment:350},{label:"Platinum",code:"platinum",priceAdjustment:600}]:ae.map(t=>{if(typeof t=="string"){const m=t.toLowerCase(),I=m.includes("18k")?"18k":m.includes("10k")?"10k":m.includes("9k")?"9k":m.includes("silver")?"silver":m.includes("platinum")?"platinum":"14k";return{label:t,code:I,priceAdjustment:0}}const o=t.label||t.name||String(t),n=String(o).toLowerCase(),b=t.code||(n.includes("18k")?"18k":n.includes("10k")?"10k":n.includes("9k")?"9k":n.includes("silver")?"silver":n.includes("platinum")?"platinum":"14k");return{label:o,code:b,priceAdjustment:typeof t.priceAdjustment=="number"?t.priceAdjustment:0,circleColor:t.circleColor}})].sort((t,o)=>yt(t.label)-yt(o.label)),st=[],Se={};for(const t of De){const o=ri(t.label);Se[o]||(Se[o]=[],st.push({key:o,items:Se[o]})),Se[o].push(t)}const Me=(i.variations||[]).find(t=>{const o=t.metal?t.metal.toLowerCase()===R.toLowerCase():!0,n=fe&&g!=="Select"&&t.ringSize?String(t.ringSize)===String(g):!0;return o&&n});let Oe=Me==null?void 0:Me.price;if(!Oe){const t=De.find(n=>n.label.toLowerCase()===R.toLowerCase());Oe=(Q&&i.salePrice&&Number(i.salePrice)>0?Number(i.salePrice):i.price||2500)+((t==null?void 0:t.priceAdjustment)||0)}const at=Object.values(H).reduce((t,o)=>t+(o.priceAdjustment||0),0),le=Oe+at;let ke=null;if(Q&&Pe&&Pe>le){const t=De.find(o=>o.label.toLowerCase()===R.toLowerCase());ke=Pe+((t==null?void 0:t.priceAdjustment)||0)+at}const Wt=["Select","US 4","US 4.5","US 5","US 5.5","US 6","US 6.5","US 7","US 7.5","US 8","US 8.5","US 9","US 9.5","US 10","US 10.5","US 11","US 11.5","US 12"];let ue=[];try{i.customOptions?ue=typeof i.customOptions=="string"?JSON.parse(i.customOptions):i.customOptions:i.customOptionsJson&&(ue=typeof i.customOptionsJson=="string"?JSON.parse(i.customOptionsJson):i.customOptionsJson)}catch{}let _=[];try{i.detailSections&&Array.isArray(i.detailSections)&&i.detailSections.length>0?_=[...i.detailSections]:i.accordionsConfig&&(_=typeof i.accordionsConfig=="string"?JSON.parse(i.accordionsConfig):[...i.accordionsConfig])}catch{}(!_||_.length===0)&&(_=[...Ct]);const Gt=i.fullDescription||i.description||i.shortDescription,be=Tr(Gt,i.title||i.name);if(be&&typeof be=="string"&&be.trim()!==""){const t=_.findIndex(o=>o.id==="overview"||(o.title||"").toUpperCase().includes("DESCRIPTION")||(o.title||"").toUpperCase().includes("OVERVIEW"));t!==-1?_[t]={..._[t],title:"PRODUCT OVERVIEW & DESCRIPTION",content:be.trim(),enabled:!0}:_.unshift({id:"overview",title:"PRODUCT OVERVIEW & DESCRIPTION",content:be.trim(),enabled:!0,defaultOpen:!0})}const lt=new Set,Ut=_.filter(t=>t.isActive!==!1&&t.enabled!==!1).filter(t=>{const o=(t.type||t.title||t.id||"").trim().toUpperCase();return o?lt.has(o)?!1:(lt.add(o),!0):!0}),We=fe&&i.isRingSizeRequired!==!1,ct=()=>{if(We&&(g==="Select"||!g)){re(!0),me("Please select a US Ring Size before adding to your bag.","warning");return}re(!1);const t={};if(i.enableCustomOptions){for(const o of ue)if(o.required){const n=H[o.title||o.name||o.label];(!n||!n.value||!n.value.trim())&&(t[o.title||o.name||o.label]=`Please complete required option: ${o.title||o.name||o.label}`)}}if(Object.keys(t).length>0){q(t),me(Object.values(t)[0],"warning");return}q({}),rt(i,U,R,fe?g==="Select"?"US 7":g:void 0,we,H,le),me("Product successfully added to your shopping bag!","success")},dt=()=>{if(We&&(g==="Select"||!g)){re(!0),me("Please select a US Ring Size before proceeding to checkout.","warning");return}re(!1);const t={};if(i.enableCustomOptions){for(const o of ue)if(o.required){const n=H[o.title||o.name||o.label];(!n||!n.value||!n.value.trim())&&(t[o.title||o.name||o.label]=`Please complete required option: ${o.title||o.name||o.label}`)}}if(Object.keys(t).length>0){q(t),me(Object.values(t)[0],"warning");return}q({}),rt(i,U,R,fe?g==="Select"?"US 7":g:void 0,we,H,le),u("/checkout")};return e.jsxs(qe,{children:[e.jsxs(Ae,{children:[e.jsxs(Ke,{children:[e.jsx(X,{to:"/",children:"Home"})," / ",e.jsx(X,{to:"/collections",children:((xt=i.category)==null?void 0:xt.name)||i.jewelleryType||"Jewellery"})," / ",e.jsx("span",{className:"current",children:i.title||i.name})]}),e.jsxs(Oi,{children:[e.jsx(Wi,{children:e.jsx(Gi,{ref:k,children:e.jsx(Ui,{className:"desktop-image-grid",children:V.map((t,o)=>e.jsxs(Yi,{onClick:()=>{v(o),x(!0)},children:[e.jsx(kt,{src:t,alt:`${i.title||i.name} view ${o+1}`}),e.jsxs("div",{className:"zoom-hint",children:[e.jsx(At,{size:12}),"Click to expand"]})]},`gallery_${t}_${o}`))})})}),e.jsxs(Hi,{children:[V.length>0&&e.jsxs(_i,{children:[h+1," / ",V.length]}),V.length>1&&h>0&&e.jsx(jt,{$dir:"left",onClick:()=>Le(h-1),"aria-label":"Previous Image",children:e.jsx(Te,{size:20})}),V.length>1&&h<V.length-1&&e.jsx(jt,{$dir:"right",onClick:()=>Le(h+1),"aria-label":"Next Image",children:e.jsx(Be,{size:20})}),e.jsx(Vi,{ref:C,onScroll:Dt,children:V.map((t,o)=>e.jsx(Ji,{onClick:()=>{v(o),x(!0)},children:e.jsx(kt,{src:t,alt:`${i.title||i.name} view ${o+1}`})},`mob_${o}`))}),e.jsx(qi,{children:V.map((t,o)=>e.jsx("span",{className:h===o?"active":"",onClick:()=>Le(o)},o))})]}),e.jsx(gi,{images:V,activeIndex:h,productName:i.title||i.name,isOpen:y,onClose:()=>x(!1),onSelectIndex:t=>v(t)}),e.jsxs(Ki,{children:[e.jsxs(Xi,{children:[e.jsxs("div",{children:[e.jsx("h1",{children:i.title||i.name}),e.jsxs(Zi,{children:[e.jsx("span",{className:"stars",children:pe&&pe>0?"★".repeat(Math.round(ot||5))+"☆".repeat(5-Math.round(ot||5)):"☆☆☆☆☆"}),e.jsx("span",{children:pe!==null&&pe>0?`(${pe} ${pe===1?"review":"reviews"})`:"(No reviews yet)"})]})]}),e.jsx("button",{className:`wishlist-btn ${nt?"active":""}`,onClick:()=>Rt(i),title:"Save to Wishlist",children:e.jsx(qt,{size:20,fill:nt?"#c00":"none"})})]}),e.jsxs(Ee,{children:[e.jsxs(Qi,{style:{marginTop:0,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"},children:[e.jsxs("span",{className:"current-price",style:{color:Q?"#E53E3E":"#C9A96E"},children:["$",le.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})]}),Q&&ke!==null&&ke>le&&e.jsxs("span",{className:"compare-price",children:["$",ke.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})]}),Q&&e.jsx("span",{style:{background:"#d93838",color:"#fff",fontSize:"0.75rem",fontWeight:700,padding:"4px 10px",borderRadius:4,letterSpacing:"0.04em"},children:"🏷️ ON SALE"})]}),!!(Q&&i.saleEndsAt)&&e.jsx(zr,{saleEndsAt:i.saleEndsAt})]}),i.enableMetalSelection!==!1&&e.jsxs(Ee,{children:[e.jsxs(er,{children:[e.jsx("span",{className:"label",children:"Metal Type:"}),e.jsx("span",{className:"value",children:R})]}),e.jsx(tr,{children:st.map(t=>e.jsx(ir,{$count:t.items.length,children:t.items.map((o,n)=>e.jsx(rr,{type:"button",$isSelected:R.toLowerCase()===o.label.toLowerCase(),onClick:()=>{P(o.label),d(o.code)},title:o.label,children:o.label},o.label||n))},t.key))})]}),fe&&e.jsxs(Ee,{children:[e.jsxs(or,{children:[e.jsxs("span",{className:"label-title",children:["Ring Size ",We?e.jsx("span",{style:{color:"#d9534f"},children:"*"}):e.jsx("span",{style:{color:"#888",fontWeight:400,fontSize:"0.75rem"},children:"(Optional)"}),":"]}),e.jsxs(nr,{ref:L,children:[e.jsxs(sr,{onClick:()=>ie(!F),children:[e.jsx("span",{className:g!=="Select"?"selected-val":"placeholder-val",children:g}),e.jsx("span",{className:"arrow-icon",children:e.jsx("svg",{width:"9",height:"6",viewBox:"0 0 9 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M4.5 6L0 0H9L4.5 6Z",fill:"#0c1938"})})})]}),F&&e.jsx(ar,{children:(i.availableRingSizes||Wt).map(t=>e.jsx("div",{className:`option-item ${g===t?"selected":""}`,onClick:()=>{D(t),ie(!1),re(!1)},children:t},t))})]}),e.jsx(X,{to:"/education/rings/find-your-ring-size",className:"guide-link",children:"Ring Size Guide"})]}),$e&&e.jsxs("div",{style:{color:"#d9534f",fontSize:"0.8rem",fontWeight:600,marginTop:8,display:"flex",alignItems:"center",gap:6},children:[e.jsx("span",{children:"⚠️"})," Please select a US Ring Size before adding this ring to your shopping bag."]})]}),!!i.enableCustomOptions&&ue.length>0&&e.jsx(Ee,{children:e.jsx(lr,{children:ue.map((t,o)=>{var E,M,ee,K;const n=t.title||t.name||t.label;if(!n)return null;const b=t.inputType||t.fieldType||"Text",m=!!ne[n],I=Number(t.priceAdjustment)||0;return e.jsxs("div",{children:[e.jsxs(cr,{children:[n,(E=H[n])!=null&&E.value?`: ${H[n].value}`:"",t.required&&e.jsx("span",{style:{color:"#c5221f"},children:"*"}),b!=="Checkbox"&&I>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600,marginLeft:6},children:["(+$",I,")"]})]}),b==="Text"&&e.jsx(dr,{type:"text",$hasError:m,maxLength:t.maxCharacterLength||t.maxLength||25,placeholder:t.placeholder||`Enter ${n}...`,value:((M=H[n])==null?void 0:M.value)||"",onChange:S=>{const j=S.target.value;ce(z=>({...z,[n]:{title:n,value:j,priceAdjustment:j.trim()?I:0}})),ne[n]&&q(z=>({...z,[n]:""}))}}),b==="Textarea"&&e.jsx(pr,{rows:2,$hasError:m,maxLength:t.maxCharacterLength||t.maxLength||100,placeholder:t.placeholder||`Enter ${n}...`,value:((ee=H[n])==null?void 0:ee.value)||"",onChange:S=>{const j=S.target.value;ce(z=>({...z,[n]:{title:n,value:j,priceAdjustment:j.trim()?I:0}})),ne[n]&&q(z=>({...z,[n]:""}))}}),b==="Dropdown"&&e.jsxs(xr,{$hasError:m,value:((K=H[n])==null?void 0:K.value)||"",onChange:S=>{const z=(t.choices||t.values||[]).find(J=>(J.label||J.value||J)===S.target.value),O=typeof z=="object"?Number(z.priceAdjustment)||0:I;ce(J=>({...J,[n]:{title:n,value:S.target.value,priceAdjustment:S.target.value?O:0}})),ne[n]&&q(J=>({...J,[n]:""}))},children:[e.jsxs("option",{value:"",children:["-- Select ",n," --"]}),(t.choices||t.values||[]).map((S,j)=>{const z=typeof S=="string"?S:S.label||S.value,O=typeof S=="object"&&Number(S.priceAdjustment)||0;return e.jsxs("option",{value:z,children:[z," ",O>0?`(+$${O})`:""]},j)})]}),b==="Radio"&&e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:(t.choices||t.values||[]).map((S,j)=>{var J;const z=typeof S=="string"?S:S.label||S.value,O=typeof S=="object"?Number(S.priceAdjustment)||0:I;return e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,fontSize:"0.88rem",cursor:"pointer",color:"#0c1938"},children:[e.jsx("input",{type:"radio",name:`opt_${n}`,checked:((J=H[n])==null?void 0:J.value)===z,onChange:()=>{ce(te=>({...te,[n]:{title:n,value:z,priceAdjustment:O}})),ne[n]&&q(te=>({...te,[n]:""}))},style:{accentColor:"#0c1938",cursor:"pointer"}}),z," ",O>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600},children:["(+$",O,")"]})]},j)})}),b==="Checkbox"&&(()=>{var z;const S=t.checkboxOptions&&Array.isArray(t.checkboxOptions)&&t.checkboxOptions.length>0?t.checkboxOptions:t.choices&&Array.isArray(t.choices)&&t.choices.length>0?t.choices:[{id:"cb_default",label:t.checkboxLabel!==void 0&&t.checkboxLabel!==""?t.checkboxLabel:n,priceAdjustment:I}],j=((z=H[n])==null?void 0:z.value)||"";return e.jsx("div",{children:e.jsx(ur,{children:S.map((O,J)=>{const te=typeof O=="string"?O:O.label||O.value;if(!te)return null;const Ge=typeof O=="object"&&Number(O.priceAdjustment)||0,gt=j===te;return e.jsxs(gr,{type:"button",$isSelected:gt,onClick:()=>{ce(gt?ye=>({...ye,[n]:{title:n,value:"",priceAdjustment:0}}):ye=>({...ye,[n]:{title:n,value:te,priceAdjustment:Ge}})),ne[n]&&q(ye=>({...ye,[n]:""}))},children:[e.jsx("span",{children:te}),Ge>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600,marginLeft:6},children:["(+$$",Ge,")"]})]},O.id||J)})})})})(),m&&e.jsx("div",{style:{fontSize:"0.78rem",color:"#c5221f",marginTop:4},children:ne[n]})]},t.id||o)})})}),e.jsxs(mr,{style:{marginTop:4},children:[se!=null&&se.active?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10,width:"100%"},children:[e.jsx("button",{disabled:!0,style:{width:"100%",padding:"16px 24px",background:"#e2e8f0",color:"#64748b",border:"1px solid #cbd5e1",borderRadius:4,fontWeight:700,fontSize:"0.85rem",letterSpacing:"0.08em",textTransform:"uppercase",cursor:"not-allowed"},children:"ORDERS TEMPORARILY UNAVAILABLE"}),e.jsx("div",{style:{fontSize:"0.82rem",color:"#c53030",background:"#fff5f5",border:"1px solid #feb2b2",padding:"10px 14px",borderRadius:4,textAlign:"center",lineHeight:1.5},children:se.message||"Orders are temporarily unavailable while Holiday Mode is active. Please check back soon."})]}):e.jsxs(hr,{children:[(l==null?void 0:l.showQuantitySelector)!==!1&&e.jsx("div",{className:"qty-selector-col",children:e.jsxs(fr,{children:[e.jsx("button",{type:"button",onClick:()=>je(U-1),"aria-label":"Decrease quantity",children:e.jsx(ht,{size:14})}),e.jsx("span",{children:U}),e.jsx("button",{type:"button",onClick:()=>je(U+1),"aria-label":"Increase quantity",children:e.jsx(ft,{size:14})})]})}),e.jsx("div",{className:"add-bag-col",children:e.jsxs(br,{onClick:ct,children:["ADD TO BAG • $",(le*U).toLocaleString()]})}),(l==null?void 0:l.showBuyNowButton)!==!1&&e.jsx("div",{className:"buy-now-col",children:e.jsxs(yr,{onClick:dt,children:[e.jsx(Kt,{size:16})," BUY IT NOW"]})})]}),W.enableConsultAtelierExpert!=="false"&&e.jsx(wr,{onClick:()=>oe(!0),children:"CONSULT AN ATELIER EXPERT"})]}),(l==null?void 0:l.showBenefits)!==!1&&e.jsx(vr,{children:l!=null&&l.benefitsJson?(()=>{try{return(typeof l.benefitsJson=="string"?JSON.parse(l.benefitsJson):l.benefitsJson).filter(o=>o.isActive!==!1).map((o,n)=>e.jsxs("div",{className:"benefit-item",children:[o.icon==="Truck"&&e.jsx(He,{size:16}),o.icon==="ShieldCheck"&&e.jsx(Ve,{size:16}),o.icon==="Award"&&e.jsx(Je,{size:16}),o.icon==="Sparkles"&&e.jsx(Ye,{size:16}),(!o.icon||!["Truck","ShieldCheck","Award","Sparkles"].includes(o.icon))&&e.jsx(Xt,{size:16}),o.title]},o.id||n))}catch{return null}})():e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"benefit-item",children:[e.jsx(He,{size:16})," Free Insured Delivery"]}),e.jsxs("div",{className:"benefit-item",children:[e.jsx(Ve,{size:16})," Lifetime Service Warranty"]}),e.jsxs("div",{className:"benefit-item",children:[e.jsx(Je,{size:16})," GIA / IGI Certification"]})]})}),e.jsx(jr,{style:{marginTop:24},children:Ut.map((t,o)=>{const n=t.id||t.title||`acc_${o}`,b=Ie===n;return e.jsxs(Ne.Fragment,{children:[e.jsxs(Sr,{onClick:()=>Pt(n),children:[e.jsx("span",{children:t.title}),e.jsx("span",{children:b?"−":"+"})]}),e.jsxs(kr,{$open:b,children:[t.description&&e.jsx("div",{style:{fontSize:"0.88rem",color:"#D8D2C5",marginBottom:t.items&&t.items.length>0?14:0,lineHeight:1.7},children:t.description}),t.items&&Array.isArray(t.items)&&t.items.length>0?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:t.type==="SPECIFICATIONS"||(t.title||"").toUpperCase().includes("SPECIFICATION")?e.jsxs("div",{style:{background:"#151515",border:"1px solid rgba(140, 116, 75, 0.25)",padding:18,borderRadius:6,boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4)"},children:[e.jsx("div",{style:{fontSize:"0.78rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#C9A96E",marginBottom:12},children:"SPECIFICATION DETAILS"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"12px 18px",fontSize:"0.85rem"},children:t.items.map((m,I)=>e.jsxs("div",{children:[m.title&&e.jsxs("strong",{style:{color:"#F5F1E8",fontWeight:600},children:[m.title,": "]}),e.jsx("span",{style:{color:"#D8D2C5"},children:m.value||m.description||"-"})]},m.id||I))})]}):t.items.map((m,I)=>e.jsxs("div",{style:{background:"#151515",border:"1px solid rgba(140, 116, 75, 0.25)",padding:16,borderRadius:6,display:"flex",flexDirection:"column",gap:6,boxShadow:"0 4px 16px rgba(0, 0, 0, 0.35)"},children:[m.imageUrl&&e.jsx("img",{src:m.imageUrl,alt:m.title||"Atelier Media",style:{width:"100%",maxHeight:220,objectFit:"cover",borderRadius:4,marginBottom:6}}),(m.title||m.icon)&&e.jsxs("div",{style:{fontSize:"0.92rem",fontWeight:700,color:"#F5F1E8",display:"flex",alignItems:"center",gap:8},children:[m.icon==="Truck"&&e.jsx(He,{size:16,color:"#C9A96E"}),m.icon==="ShieldCheck"&&e.jsx(Ve,{size:16,color:"#C9A96E"}),m.icon==="Award"&&e.jsx(Je,{size:16,color:"#C9A96E"}),m.icon==="Sparkles"&&e.jsx(Ye,{size:16,color:"#C9A96E"}),m.title]}),m.value&&e.jsx("div",{style:{fontSize:"0.88rem",fontWeight:600,color:"#C9A96E"},children:m.value}),m.description&&e.jsx("div",{style:{fontSize:"0.85rem",color:"#D8D2C5",lineHeight:1.6},children:m.description})]},m.id||I))}):!t.description&&e.jsx("div",{style:{whiteSpace:"pre-line",fontSize:"0.88rem",color:"#D8D2C5",lineHeight:1.7},children:t.content||"Information for this section."})]})]},n)})})]})]})]}),e.jsx(Li,{items:$,currentProductId:i.id,category:i.jewelleryType||((ut=i.category)==null?void 0:ut.name)||(typeof i.category=="string"?i.category:""),content:l}),e.jsx(ji,{content:l}),e.jsx(Ii,{productName:i.name||i.title,content:l,productId:i.id,reviews:i.reviews}),e.jsx(Mi,{currentProductId:i.id,content:l}),Y&&W.enableConsultAtelierExpert!=="false"&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsxs("div",{style:{background:"#151515",border:"1px solid rgba(140, 116, 75, 0.3)",padding:32,borderRadius:8,maxWidth:500,width:"90%",textAlign:"center",color:"#F5F1E8"},children:[e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",color:"#F5F1E8",marginBottom:12},children:W.consultTitle||"Consult an Atelier Expert"}),e.jsx("p",{style:{fontSize:"0.9rem",color:"#A8A8A8",marginBottom:20,whiteSpace:"pre-line"},children:W.consultDescription||"Speak directly with our AethelCarats specialists regarding custom design, diamond selection, or sizing guidance."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,marginBottom:20},children:[W.consultPhone&&W.consultPhone.trim()!==""&&e.jsxs("a",{href:`tel:${W.consultPhone.replace(/[^\d+]/g,"")}`,style:{padding:"12px",background:"#111111",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,textDecoration:"none",color:"#F5F1E8",fontWeight:600},children:["☎ ",W.consultPhoneLabel||"Call Atelier",": ",W.consultPhone]}),W.consultEmail&&W.consultEmail.trim()!==""&&e.jsxs("a",{href:`mailto:${W.consultEmail.trim()}`,style:{padding:"12px",background:"#111111",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,textDecoration:"none",color:"#F5F1E8",fontWeight:600},children:["✉ ",W.consultEmailLabel||"Email Concierge",": ",W.consultEmail]})]}),e.jsx("button",{onClick:()=>oe(!1),style:{padding:"10px 24px",background:"#C9A96E",color:"#0B0B0B",border:"none",borderRadius:4,cursor:"pointer",fontWeight:700},children:W.consultCloseLabel||"Close"})]})}),e.jsxs(Ar,{$show:de.show,$type:de.type,children:[e.jsx("div",{className:"toast-icon",children:de.type==="success"?e.jsx(Zt,{size:22}):e.jsx(mt,{size:22})}),e.jsx("div",{className:"toast-content",children:de.message}),e.jsx("button",{className:"toast-close",onClick:()=>Nt(t=>({...t,show:!1})),children:e.jsx(Ze,{size:16})}),de.show&&e.jsx("div",{className:"progress-bar"},de.message)]}),e.jsx(Cr,{$show:A&&!(se!=null&&se.active)&&(l==null?void 0:l.showStickyBar)!==!1,children:e.jsxs("div",{className:"sticky-inner",children:[e.jsxs("div",{className:"product-info",children:[e.jsx("img",{src:Ot,alt:(i==null?void 0:i.title)||(i==null?void 0:i.name)||"Jewellery"}),e.jsxs("div",{className:"title-price",children:[e.jsx("div",{className:"title",children:(i==null?void 0:i.title)||(i==null?void 0:i.name)}),e.jsxs("div",{className:"meta-price",children:["$",(le*U).toLocaleString()]})]})]}),e.jsxs("div",{className:"sticky-actions",children:[e.jsxs("div",{className:"sticky-qty",children:[e.jsx("button",{type:"button",onClick:()=>je(U-1),children:e.jsx(ht,{size:12})}),e.jsx("span",{children:U}),e.jsx("button",{type:"button",onClick:()=>je(U+1),children:e.jsx(ft,{size:12})})]}),e.jsx("button",{className:"sticky-btn add-bag",onClick:ct,children:"ADD TO BAG"}),e.jsx("button",{className:"sticky-btn buy-now",onClick:dt,children:"BUY IT NOW"})]})]})})]})};export{Pr as ProductDetailPage};
