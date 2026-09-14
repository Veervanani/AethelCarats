import{r as c,j as e,X as Xe,k as ze,l as Te,aU as Wt,aV as St,aa as Ut,R as Be,t as Ue,ag as Gt,ao as Yt,u as Ht,f as X,g as Ge,C as ut,H as Vt,M as gt,P as mt,aW as Jt,ax as Ye,v as He,aS as Ve,c as _t,a as qt}from"./react-vendor-BQZO0c5l.js";import{g as n}from"./ui-vendor-Bs2yixgz.js";import{S as ht,a as Z,R as Ke,u as Kt,b as Xt,c as Zt}from"./admin-pages-JuMAyK69.js";import{P as Ct}from"./ProductCard-DovFqmLH.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const Qt=n.div`
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
`,ei=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
`,ti=n.div`
  color: #fffdf9;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  letter-spacing: 0.05em;
`,ii=n.button`
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
`,ri=n.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
`,oi=n.div`
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
`,ft=n.button`
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
`,ni=n.div`
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
`,Je=n.button`
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
`,si=n.span`
  color: #c9a45c;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 48px;
  text-anchor: middle;
  text-align: center;
`,ai=n.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  overflow-x: auto;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  z-index: 10;
  -webkit-overflow-scrolling: touch;
`,li=n.button`
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
`,ci=({images:r,activeIndex:u,productName:i,isOpen:h,onClose:N,onSelectIndex:A})=>{const[m,v]=c.useState(1),[y,x]=c.useState({x:0,y:0}),[l,E]=c.useState(!1),[w,T]=c.useState({x:0,y:0}),[S,j]=c.useState(null),[L,I]=c.useState(0),P=c.useRef(null);if(c.useEffect(()=>{v(1),x({x:0,y:0})},[u,h]),c.useEffect(()=>{const p=C=>{C.key==="Escape"&&h&&N()};return window.addEventListener("keydown",p),()=>window.removeEventListener("keydown",p)},[h,N]),!h||r.length===0)return null;const ue=r[u]||r[0],d=()=>{v(p=>Math.min(p+.5,3.5))},g=()=>{v(p=>{const C=Math.max(p-.5,1);return C===1&&x({x:0,y:0}),C})},D=()=>{v(1),x({x:0,y:0})},$=p=>{p==null||p.stopPropagation(),D(),A(u===0?r.length-1:u-1)},te=p=>{p==null||p.stopPropagation(),D(),A(u===r.length-1?0:u+1)},Ne=p=>{p.preventDefault(),p.deltaY<0?v(C=>Math.min(C+.25,3.5)):v(C=>{const W=Math.max(C-.25,1);return W===1&&x({x:0,y:0}),W})},ie=p=>{m<=1||(E(!0),T({x:p.clientX-y.x,y:p.clientY-y.y}))},Ze=p=>{if(!l||m<=1)return;const C=p.clientX-w.x,W=p.clientY-w.y,G=(m-1)*300,re=Math.max(-G,Math.min(G,C)),$e=Math.max(-G,Math.min(G,W));x({x:re,y:$e})},Qe=()=>{E(!1)},ye=p=>{if(p.touches.length===2){const W=Math.hypot(p.touches[0].clientX-p.touches[1].clientX,p.touches[0].clientY-p.touches[1].clientY);j(W);return}const C=Date.now();C-L<300&&(m>1?D():v(2)),I(C),m>1&&p.touches.length===1&&(E(!0),T({x:p.touches[0].clientX-y.x,y:p.touches[0].clientY-y.y}))},et=p=>{if(p.touches.length===2&&S!==null){const C=Math.hypot(p.touches[0].clientX-p.touches[1].clientX,p.touches[0].clientY-p.touches[1].clientY),W=C-S;Math.abs(W)>4&&(v(G=>{const re=Math.min(Math.max(G+(W>0?.08:-.08),1),3.5);return re===1&&x({x:0,y:0}),re}),j(C));return}if(l&&m>1&&p.touches.length===1){const C=p.touches[0].clientX-w.x,W=p.touches[0].clientY-w.y,G=(m-1)*300;x({x:Math.max(-G,Math.min(G,C)),y:Math.max(-G,Math.min(G,W))})}},U=()=>{E(!1),j(null)};return e.jsxs(Qt,{onClick:N,children:[e.jsxs(ei,{onClick:p=>p.stopPropagation(),children:[e.jsx(ti,{children:i}),e.jsx(ii,{onClick:N,"aria-label":"Close Lightbox",children:e.jsx(Xe,{size:20})})]}),e.jsxs(ri,{ref:P,onWheel:Ne,onMouseDown:ie,onMouseMove:Ze,onMouseUp:Qe,onTouchStart:ye,onTouchMove:et,onTouchEnd:U,onClick:p=>p.stopPropagation(),children:[e.jsx(oi,{$isDragging:l,style:{transform:`translate3d(${y.x}px, ${y.y}px, 0) scale(${m})`},children:e.jsx(ht,{src:ue,alt:i})}),r.length>1&&e.jsxs(e.Fragment,{children:[e.jsx(ft,{$direction:"left",onClick:$,"aria-label":"Previous Image",children:e.jsx(ze,{size:24})}),e.jsx(ft,{$direction:"right",onClick:te,"aria-label":"Next Image",children:e.jsx(Te,{size:24})})]}),e.jsxs(ni,{onClick:p=>p.stopPropagation(),children:[e.jsx(Je,{onClick:g,disabled:m<=1,title:"Zoom Out",children:e.jsx(Wt,{size:18})}),e.jsxs(si,{children:[Math.round(m*100),"%"]}),e.jsx(Je,{onClick:d,disabled:m>=3.5,title:"Zoom In",children:e.jsx(St,{size:18})}),e.jsx(Je,{onClick:D,title:"Reset Zoom",children:e.jsx(Ut,{size:16})})]})]}),r.length>1&&e.jsx(ai,{onClick:p=>p.stopPropagation(),children:r.map((p,C)=>e.jsx(li,{$active:u===C,onClick:()=>{D(),A(C)},"aria-label":`View image ${C+1}`,children:e.jsx(ht,{src:p,alt:`${i} thumbnail ${C+1}`})},C))})]})},a={white:"#151515",primaryText:"#F5F1E8",secondaryText:"#A8A8A8",gold:"#C9A96E",darkGold:"#8C744B",lightGold:"#DFCA9B",border:"rgba(140, 116, 75, 0.25)"},di=n.section`
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
`,pi=n.div`
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
`,xi=n.div`
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
`,ui=n.div`
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
`,gi=n.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${a.border};
`,mi=n.div`
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
`,hi=n.div`
  display: ${({$isOpen:r})=>r?"block":"none"};
  padding: 0 0 16px 0;
  font-size: 0.88rem;
  color: ${a.secondaryText};
  line-height: 1.6;
`,fi=({content:r})=>{const[u,i]=c.useState(null);if(r&&r.showPackagingSection===!1)return null;const h=y=>y?y.replace(/FedEx\s+Priority\s+Air/gi,"Priority Air").replace(/FedEx\s+locations/gi,"express courier locations").replace(/FedEx/gi,"Priority Air").replace(/We\s+also\s+offer\s+a\s+30-day\s+return\s+policy,\s+subject\s+to\s+our\s+return\s+terms\s+and\s+conditions\./gi,"").replace(/30-day\s+return\s+policy\./gi,"").trim():"";let N=[{title:"Discreet Packaging",content:"Every order is shipped in plain, unbranded outer security boxes. There is no mention of AethelCarats or diamond jewelry on the package exterior for 100% privacy and security."},{title:"Secure and Convenient Pickup Option",content:"Hold your order for pick up at thousands of secure express courier locations or choose insured signature delivery directly to your doorstep."},{title:"SHIPPING & DELIVERY",content:"After order confirmation, your order will be dispatched within 7-10 working days. Once dispatched, delivery is estimated within an additional 7-10 working days. All shipments are sent via fully insured Priority Air for secure and reliable delivery."}];if(r&&r.packagingItemsJson)try{const y=typeof r.packagingItemsJson=="string"?JSON.parse(r.packagingItemsJson):r.packagingItemsJson;Array.isArray(y)&&y.length>0&&(N=y.filter(x=>x.isActive!==!1).map(x=>({title:x.title,content:h(x.description||x.content)})))}catch{}const A=(r==null?void 0:r.packagingHeading)||"We're committed to making your entire experience a pleasant one, from shopping to shipping.",m=(r==null?void 0:r.packagingDescription)||"Every item we send comes in our signature AethelCarats packaging. Engagement rings arrive in a deluxe velvet ring box within an elegant presentation box ready for your proposal. The presentation box also secures your appraisal certificate and GIA/IGI diamond grading report. Loose diamonds are presented in a velvet lined diamond case that securely holds the stone.",v=(r==null?void 0:r.packagingImageUrl)||"";return e.jsx(Ke,{yOffset:35,children:e.jsx(di,{children:e.jsxs(pi,{children:[!!v&&e.jsx(xi,{children:e.jsx("img",{src:v,alt:"AethelCarats Signature Packaging"})}),e.jsxs(ui,{children:[e.jsx("h2",{children:A}),e.jsx("p",{children:m}),e.jsx(gi,{children:N.map((y,x)=>e.jsxs(Be.Fragment,{children:[e.jsxs(mi,{onClick:()=>i(u===x?null:x),children:[e.jsx("span",{children:y.title}),e.jsx("span",{style:{fontSize:"1.2rem",color:a.gold},children:u===x?"−":"+"})]}),e.jsx(hi,{$isOpen:u===x,children:y.content})]},x))})]})]})})})},bi=n.section`
  max-width: 1280px;
  margin: 80px auto 0;
  padding: 0 24px;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px;
  }
`,yi=n.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  text-align: center;
  color: ${a.primaryText};
  margin-bottom: 40px;
`,wi=n.div`
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
`,vi=n.div`
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
`,bt=n.button`
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
`,ji=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 24px;
  border-bottom: 1px solid ${a.border};
  margin-bottom: 32px;
  gap: 16px;
  flex-wrap: wrap;
`,Ce=n.div`
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
`,Si=n.div`
  display: flex;
  gap: 24px;
  padding: 32px 0;
  border-bottom: 1px solid ${a.border};

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 16px;
  }
`,Ci=n.div`
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
`,ki=n.div`
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
`,Ai=n.div`
  position: fixed;
  inset: 0;
  background: rgba(28, 28, 28, 0.6);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`,Ei=n.div`
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
`,zi=({productName:r="AethelCarats Creation",content:u,productId:i,reviews:h})=>{const[N,A]=c.useState(!1),[m,v]=c.useState(5),[y,x]=c.useState(""),[l,E]=c.useState(""),[w,T]=c.useState("");if(u&&(u.reviewsEnabled===!1||u.showReviews===!1))return null;const[S,j]=c.useState(()=>h&&Array.isArray(h)&&h.length>0?h.map((d,g)=>({id:d.id||`rev_${g}`,name:d.author||d.name||d.authorName||"Verified Buyer",verified:!0,rating:Number(d.rating)||5,title:d.title||(d.comment?d.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:d.date||(d.createdAt?new Date(d.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:d.text||d.comment||d.content||"",productReviewed:d.productReviewed||r,response:d.response||null})):[]);c.useEffect(()=>{let d=!0;return h&&Array.isArray(h)&&h.length>0?j(h.map((g,D)=>({id:g.id||`rev_${D}`,name:g.author||g.name||g.authorName||"Verified Buyer",verified:!0,rating:Number(g.rating)||5,title:g.title||(g.comment?g.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:g.date||(g.createdAt?new Date(g.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:g.text||g.comment||g.content||"",productReviewed:g.productReviewed||r,response:g.response||null}))):Z.get("/reviews"+(i?`?productId=${i}`:"")).then(g=>{if(!d)return;const D=Array.isArray(g.data)?g.data:Array.isArray(g)?g:[];D.length>0&&j(D.map(($,te)=>({id:$.id||`rev_${te}`,name:$.author||$.name||$.authorName||"Verified Buyer",verified:!0,rating:Number($.rating)||5,title:$.title||($.comment?$.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:$.date||($.createdAt?new Date($.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:$.text||$.comment||$.content||"",productReviewed:$.productReviewed||r,response:$.response||null})))}).catch(console.error),()=>{d=!1}},[i,h,r]);const L=async d=>{if(d.preventDefault(),!y||!l||!w){alert("Please fill in all required fields.");return}const g={id:`rev_${Date.now()}`,name:y,author:y,verified:!0,rating:m,title:l,date:new Date().toLocaleDateString("en-US"),text:w,comment:`${l}

${w}`,productReviewed:r,response:"Thank you for sharing your experience with AethelCarats!"};j([g,...S]),A(!1);try{await Z.post("/reviews",{productId:i,author:y,rating:m,title:l,comment:w,isApproved:!0})}catch(D){console.warn("Review API submission notice:",D)}x(""),E(""),T(""),alert("Thank you! Your review has been submitted successfully.")},I=(u==null?void 0:u.reviewsTitle)||"Item Reviews";u==null||u.reviewsVerifiedBadge;const P=(u==null?void 0:u.reviewsSubmissionEnabled)??!0,ue=S.length>0?(S.reduce((d,g)=>d+(Number(g.rating)||5),0)/S.length).toFixed(1):"0.0";return e.jsxs(bi,{children:[e.jsx(yi,{children:I}),e.jsxs(wi,{children:[e.jsxs(vi,{children:[e.jsx("div",{className:"score-num",children:ue}),e.jsxs("div",{className:"stars-col",children:[e.jsx("div",{className:"stars-row",children:[...Array(5)].map((d,g)=>e.jsx(Ue,{size:18,fill:S.length>0&&g<Math.round(Number(ue))?a.gold:"none",color:a.gold},g))}),e.jsx("div",{className:"rev-count",children:S.length>0?`${S.length} Verified ${S.length===1?"Review":"Reviews"}`:"No customer reviews yet"})]})]}),P&&e.jsx(bt,{onClick:()=>A(!0),children:"Write A Review"})]}),S.length>0&&e.jsxs(ji,{children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:[e.jsxs(Ce,{children:[e.jsx("input",{type:"checkbox",id:"withMedia",defaultChecked:!0,style:{accentColor:a.gold}}),e.jsx("label",{htmlFor:"withMedia",children:"With media"})]}),e.jsx(Ce,{children:e.jsxs("select",{defaultValue:"all",children:[e.jsx("option",{value:"all",children:"Recommendation (All)"}),e.jsx("option",{value:"yes",children:"Recommends Product"})]})}),e.jsx(Ce,{children:e.jsxs("select",{defaultValue:"exceeds",children:[e.jsx("option",{value:"exceeds",children:"Expectations (Exceeds)"}),e.jsx("option",{value:"met",children:"Met Expectations"})]})})]}),e.jsxs(Ce,{children:[e.jsx("span",{children:"Sort by:"}),e.jsxs("select",{defaultValue:"relevant",children:[e.jsx("option",{value:"relevant",children:"Most relevant"}),e.jsx("option",{value:"newest",children:"Newest first"}),e.jsx("option",{value:"highest",children:"Highest rated"})]})]})]}),e.jsx("div",{children:S.length===0?e.jsxs("div",{style:{textAlign:"center",padding:"48px 24px",color:"#666",background:"#FDFBF7",borderRadius:"4px",border:"1px dashed #E5DFD5"},children:[e.jsx("p",{style:{fontFamily:"Cinzel, serif",fontSize:"1.05rem",color:"#1A1815",marginBottom:"8px"},children:"No Customer Reviews Yet"}),e.jsx("p",{style:{fontSize:"0.88rem",color:"#777",marginBottom:"16px"},children:"Be the first to share your experience with this bespoke creation."}),P&&e.jsx(bt,{onClick:()=>A(!0),children:"Write The First Review"})]}):S.map(d=>e.jsxs(Si,{children:[e.jsxs(Ci,{children:[e.jsx("div",{className:"avatar-circle",children:d.name.charAt(0)}),e.jsx("div",{className:"user-name",children:d.name}),d.verified&&e.jsxs("div",{className:"verified-badge",children:[e.jsx(Gt,{size:12,color:a.darkGold})," Verified Buyer"]})]}),e.jsxs(ki,{children:[e.jsxs("div",{className:"review-header",children:[e.jsxs("div",{className:"rating-and-title",children:[e.jsx("div",{className:"stars",children:[...Array(d.rating)].map((g,D)=>e.jsx(Ue,{size:14,fill:a.gold,color:a.gold},D))}),e.jsx("div",{className:"title",children:d.title})]}),e.jsx("div",{className:"date",children:d.date})]}),e.jsx("div",{className:"body-text",children:d.text}),e.jsxs("div",{className:"product-reviewed",children:["Product reviewed: ",d.productReviewed]}),d.response&&e.jsxs("div",{className:"atelier-response",children:[e.jsx("div",{className:"resp-title",children:"AethelCarats Atelier Team"}),e.jsx("div",{className:"resp-body",children:d.response})]})]})]},d.id))}),N&&e.jsx(Ai,{onClick:()=>A(!1),children:e.jsxs(Ei,{onClick:d=>d.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12},children:[e.jsx("h3",{children:"Write a Review"}),e.jsx(Xe,{size:20,style:{cursor:"pointer",color:a.secondaryText},onClick:()=>A(!1)})]}),e.jsxs("p",{children:["Share your authentic experience with ",r,"."]}),e.jsxs("form",{onSubmit:L,style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Rating"}),e.jsx("div",{style:{display:"flex",gap:6},children:[1,2,3,4,5].map(d=>e.jsx(Ue,{size:24,style:{cursor:"pointer"},fill:d<=m?a.gold:"none",color:a.gold,onClick:()=>v(d)},d))})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Your Name"}),e.jsx("input",{type:"text",required:!0,value:y,onChange:d=>x(d.target.value),placeholder:"e.g. Patty G.",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem",background:"#0B0B0B",color:"#F5F1E8"}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Headline / Title"}),e.jsx("input",{type:"text",required:!0,value:l,onChange:d=>E(d.target.value),placeholder:"e.g. Perfect description & exquisite craftsmanship",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem",background:"#0B0B0B",color:"#F5F1E8"}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Review Details"}),e.jsx("textarea",{required:!0,rows:4,value:w,onChange:d=>T(d.target.value),placeholder:"Write your review here...",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem",fontFamily:"inherit",background:"#0B0B0B",color:"#F5F1E8"}})]}),e.jsx("button",{type:"submit",style:{width:"100%",padding:14,backgroundColor:a.gold,color:"#0B0B0B",border:"none",borderRadius:4,fontWeight:700,fontSize:"0.85rem",cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase"},children:"Submit Verified Review"})]})]})})]})},kt=n.div`
  position: relative;
  width: 100%;
`,At=n.div`
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
`,Ee=n.button`
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
`,Ti=n.section`
  width: 100%;
  max-width: 100%;
  margin: 80px 0 0;
  padding: 0 48px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px;
  }
`,Bi=n.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  color: ${a.primaryText};
  margin-bottom: 28px;
`,Ni=({items:r=[],currentProductId:u,category:i,content:h})=>{const[N,A]=c.useState([]),m=Be.useRef(null);if(h&&(h.similarItemsEnabled===!1||h.showSimilarItems===!1))return null;const v=(h==null?void 0:h.similarItemsTitle)||"Similar Items";c.useEffect(()=>{let l=Array.isArray(r)?r.filter(w=>w&&w.id!==u):[];if(l.length>0){A(l);return}const E={limit:16,status:"ACTIVE"};i&&(E.jewelleryType=i),Z.getProducts(E).then(w=>{const S=(Array.isArray(w)?w:(w==null?void 0:w.products)||[]).filter(j=>j&&j.id!==u);A(S)}).catch(()=>{A(l)})},[r,u,i]);const y=N.filter(l=>l&&l.id!==u);if(y.length===0)return null;const x=l=>{if(m.current){const E=l==="left"?-340:340;m.current.scrollBy({left:E,behavior:"smooth"})}};return e.jsxs(Ti,{children:[e.jsx(Bi,{children:v}),e.jsxs(kt,{children:[y.length>3&&e.jsx(Ee,{$direction:"left",onClick:()=>x("left"),children:e.jsx(ze,{size:22})}),e.jsx(At,{ref:m,children:y.map((l,E)=>e.jsx(Ct,{product:l},l.id||`sim_${E}`))}),y.length>3&&e.jsx(Ee,{$direction:"right",onClick:()=>x("right"),children:e.jsx(Te,{size:22})})]})]})},$i=n.section`
  width: 100%;
  max-width: 100%;
  margin: 80px 0 0;
  padding: 0 48px 80px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px 48px;
  }
`,Ii=n.div`
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
`,Fi=({currentProductId:r,content:u})=>{const[i,h]=c.useState([]),N=Be.useRef(null);if(u&&(u.recentlyViewedEnabled===!1||u.showRecentlyViewed===!1))return null;const A=(u==null?void 0:u.recentlyViewedTitle)||"Recently Viewed";c.useEffect(()=>{let x=[];try{const l=localStorage.getItem("app_recently_viewed");l&&(x=JSON.parse(l))}catch{}if(!Array.isArray(x)||x.length===0){h([]);return}Z.getProducts({status:"ACTIVE",limit:100}).then(l=>{const E=Array.isArray(l)?l:(l==null?void 0:l.products)||[],w=new Map;E.forEach(j=>{j.id&&w.set(String(j.id),j),j.slug&&w.set(String(j.slug).toLowerCase(),j)});const T=new Set;r&&T.add(String(r));const S=[];for(const j of x){if(!j)continue;const L=j.id?String(j.id):"",I=j.slug?String(j.slug).toLowerCase():"",P=L&&w.get(L)||I&&w.get(I);P&&(T.has(P.id)||(T.add(P.id),S.push(P)))}try{const j=x.filter(L=>{if(!L)return!1;const I=L.id?String(L.id):"",P=L.slug?String(L.slug).toLowerCase():"";return I&&w.has(I)||P&&w.has(P)});localStorage.setItem("app_recently_viewed",JSON.stringify(j))}catch{}h(S)}).catch(()=>{h([])})},[r]);const m=new Set,v=i.filter(x=>{if(!x||r&&x.id===r)return!1;const l=x.id?`id:${x.id}`:null,E=x.slug?`slug:${x.slug}`:null,w=(x.title||x.name||"").trim().toLowerCase(),T=w?`name:${w}`:null;return l&&m.has(l)||E&&m.has(E)||T&&m.has(T)?!1:(l&&m.add(l),E&&m.add(E),T&&m.add(T),!0)});if(v.length===0)return null;const y=x=>{if(N.current){const l=x==="left"?-340:340;N.current.scrollBy({left:l,behavior:"smooth"})}};return e.jsx(Ke,{yOffset:35,children:e.jsxs($i,{children:[e.jsxs(Ii,{children:[e.jsx("h2",{children:A}),e.jsx("a",{href:"/rings",className:"see-all",children:"See All ›"})]}),e.jsxs(kt,{children:[v.length>3&&e.jsx(Ee,{$direction:"left",onClick:()=>y("left"),children:e.jsx(ze,{size:22})}),e.jsx(At,{ref:N,children:v.map((x,l)=>e.jsx(Ke,{staggerIndex:l,yOffset:25,style:{flexShrink:0},children:e.jsx(Ct,{product:x})},x.id||`rec_${l}`))}),v.length>3&&e.jsx(Ee,{$direction:"right",onClick:()=>y("right"),children:e.jsx(Te,{size:22})})]})]})})},_e=n.div`
  background-color: #0B0B0B;
  min-height: 100vh;
  width: 100%;
`,ke=n.div`
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
`,qe=n.div`
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
`,Ri=n.div`
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
`,Li=n.div`
  width: 100%;
  min-width: 0;
  /* Removed fixed height, align-self, position sticky, and top */
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`,Pi=n.div`
  width: 100%;
  /* Removed height, overflow-y: scroll, and scrollbar hiding */
  /* Now it will just flow naturally with the window scroll */
  box-sizing: border-box;

  @media (max-width: 768px) {
    display: none;
  }
`,Di=n.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  width: 100%;
  min-width: 0;
  box-sizing: border-box;
`,Oi=n.div`
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
`,Mi=n.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    position: relative;
    width: 100%;
    margin-bottom: 24px;
  }
`,Wi=n.div`
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
`,Ui=n.div`
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
`,yt=n.button`
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
`,Gi=n.div`
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
`,Yi=n.div`
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
`,Hi=n.div`
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
`,Vi=n.div`
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
`,Ji=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: #A8A8A8;

  .stars {
    color: #C9A96E;
    letter-spacing: 2px;
  }
`,_i=n.div`
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
`,Ae=n.div`
  padding-bottom: 14px;
  margin-bottom: 14px;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);
`,qi=n.div`
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
`,Ki=n.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`,Xi=n.button`
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
`,Zi=n.div`
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
`,Qi=n.div`
  position: relative;
  width: 155px;
`,er=n.button`
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
`,tr=n.div`
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
`;n.div`
  margin-bottom: 0;
`;n.button`
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
`;n.input`
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
`;const ir=n.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,rr=n.div`
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  color: #F5F1E8;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
`,or=n.input`
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
`,nr=n.textarea`
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
`,sr=n.select`
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
`,ar=n.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 6px;
`,lr=n.button`
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
`,cr=n.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 18px 0;
`,dr=n.div`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  gap: 10px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    .qty-selector-col { display: none; }
  }
`,pr=n.div`
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
`,xr=n.button`
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
`,ur=n.button`
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
`,gr=n.button`
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
`,mr=n.div`
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
`,hr=n.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(140, 116, 75, 0.2);
`,fr=n.div`
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
`,br=n.div`
  display: ${({$open:r})=>r?"block":"none"};
  padding: 0 0 16px 0;
  font-size: 0.88rem;
  color: #D8D2C5;
  line-height: 1.6;
`,yr=n.div`
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
`,wr=n.div`
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
`,vr=n.div`
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
`,wt=n.div`
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
`,vt=({src:r,alt:u,style:i,onLoad:h})=>{const[N,A]=c.useState(r);return c.useEffect(()=>{A(r)},[r]),e.jsx("img",{src:N||"",alt:u,style:i,onLoad:h,onError:()=>{N!==""&&A("")}})},jt=[{id:"exp",title:"YOUR AETHELCARATS EXPERIENCE",content:"Every creation is handcrafted in our Surat atelier using certified conflict-free materials and 100% recycled precious metals. Includes complimentary sizing, insured shipping, and lifetime cleaning.",enabled:!0,defaultOpen:!0},{id:"specs",title:"PRODUCT & DIAMOND SPECIFICATIONS",content:"Hand-selected center stone with optical precision cut. Crafted in solid 14k/18k gold with stamped hallmark verification.",enabled:!0,defaultOpen:!1},{id:"craft",title:"CRAFTSMANSHIP & SUSTAINABILITY",content:"Our Surat workshop directly sources lab-grown and natural diamonds, eliminating traditional markups and maintaining ethical standards.",enabled:!0,defaultOpen:!1},{id:"shipping",title:"SHIPPING & DELIVERY",content:"Free insured worldwide shipping with signature confirmation. Standard production time is 7 to 12 business days.",enabled:!0,defaultOpen:!1}],jr=({saleEndsAt:r})=>{const[u,i]=c.useState(null);return c.useEffect(()=>{const h=()=>{const A=new Date(r).getTime(),m=new Date().getTime(),v=A-m;if(isNaN(A)||v<=0){i(null);return}const y=Math.floor(v/(1e3*60*60*24)),x=Math.floor(v%(1e3*60*60*24)/(1e3*60*60)),l=Math.floor(v%(1e3*60*60)/(1e3*60)),E=Math.floor(v%(1e3*60)/1e3);i({days:y,hours:x,mins:l,secs:E})};h();const N=setInterval(h,1e3);return()=>clearInterval(N)},[r]),u?e.jsxs(vr,{children:[e.jsx("div",{className:"timer-header",children:e.jsx("span",{children:"⏳ Limited Time Offer — Sale Ends In:"})}),e.jsxs("div",{className:"timer-units",children:[e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(u.days).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Days"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(u.hours).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Hours"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(u.mins).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Mins"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(u.secs).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Secs"})]})]})]}):null},Sr=(r,u)=>{const i=(r||"").trim();return i||(u||"").trim()||"AethelCarats Fine Jewellery Creation"},Br=()=>{var ct,dt,pt;const{slug:r}=Yt(),u=Ht(),[i,h]=c.useState(null),[N,A]=c.useState([]),[m,v]=c.useState(0),[y,x]=c.useState(!1),[l,E]=c.useState(null),[w,T]=c.useState("loading"),S=c.useRef(null),j=c.useRef(null),L=c.useRef(null),[I,P]=c.useState("14K Yellow Gold"),[ue,d]=c.useState("14k"),[g,D]=c.useState("Select"),[$,te]=c.useState(!1),[Ne,ie]=c.useState(!1),[Ze,Qe]=c.useState(!1),[ye,et]=c.useState(""),[U,p]=c.useState(1),[C,W]=c.useState(!1),[G,re]=c.useState(!1),[$e,tt]=c.useState("exp"),[Y,le]=c.useState({}),[oe,K]=c.useState({}),[ne,Et]=c.useState(null),[ce,zt]=c.useState({show:!1,message:"",type:"success"}),[M,Tt]=c.useState({enableConsultAtelierExpert:"true",consultTitle:"Consult an AethelCarats Atelier Expert",consultDescription:"Speak directly with our AethelCarats Fine Jewellery Atelier specialists regarding custom design, diamond selection, or sizing guidance.",consultPhone:"+91 79902 78892",consultPhoneLabel:"Call Atelier",consultEmail:"concierge@aethelcarats.com",consultEmailLabel:"Email Concierge",consultCloseLabel:"Close"}),{cartItems:we,addToCart:it,updateQuantity:Bt}=Kt(),{isInWishlist:Nt,toggleWishlist:$t}=Xt(),{showToast:It}=Zt(),ge=(t,o="success")=>{It(t,o)};c.useEffect(()=>{const t=()=>{window.scrollY>550?W(!0):W(!1)};return window.addEventListener("scroll",t,{passive:!0}),()=>window.removeEventListener("scroll",t)},[]),c.useEffect(()=>{const t=o=>{L.current&&!L.current.contains(o.target)&&te(!1)};return document.addEventListener("mousedown",t),()=>document.removeEventListener("mousedown",t)},[]),c.useEffect(()=>{Z.getSiteSettings().then(t=>{t&&typeof t=="object"&&Object.keys(t).length>0&&Tt(o=>({...o,...t}))}).catch(console.error),Z.getHolidayModeStatus().then(Et).catch(console.error)},[]),c.useEffect(()=>{let t=!0;if(r){h(null),T("loading");const o=setTimeout(()=>{t&&(console.warn("Product request timed out after 10 seconds."),h(null),T("error"))},1e4);return Z.getProductBySlug(r).then(s=>{if(!t)return;clearTimeout(o);const b=(s==null?void 0:s.product)||(s!=null&&s.id?s:null);if(b&&b.id){h(b),A((s==null?void 0:s.relatedProducts)||[]),v(0),T("success");try{const k=localStorage.getItem("app_recently_viewed"),V=k?JSON.parse(k):[],_=(b.title||b.name||"").trim().toLowerCase(),Se=V.filter(R=>{if(!R||R.id&&b.id&&R.id===b.id||R.slug&&b.slug&&R.slug===b.slug)return!1;const B=(R.title||R.name||"").trim().toLowerCase();return!(_&&B&&_===B)}),z=[b,...Se].slice(0,10);localStorage.setItem("app_recently_viewed",JSON.stringify(z))}catch{}if(b.metal){const k=b.metal.includes("Silver")?"14K White Gold":b.metal;P(k),d(k.includes("18K")?"18k":"14k")}else if(b.metalsConfig){let k=b.metalsConfig;if(typeof k=="string")try{k=JSON.parse(k)}catch{}if(Array.isArray(k)&&k.length>0){const V=k[0],_=typeof V=="string"?V:V.label||V.name;_&&(P(_),d(String(_).includes("18K")?"18k":"14k"))}}Z.get(`/product-page-content/${b.id}`).then(k=>{t&&k.data&&k.data.content&&E(k.data.content)}).catch(console.error);let f=[];try{b.accordionsConfig&&(f=typeof b.accordionsConfig=="string"?JSON.parse(b.accordionsConfig):b.accordionsConfig)}catch{}(!f||f.length===0)&&(f=jt);const F=f.find(k=>k.enabled!==!1&&k.defaultOpen);F&&tt(F.id||F.title)}else h(null),T("not_found")}).catch(s=>{var b;t&&(clearTimeout(o),console.error("Error fetching product by slug:",s),h(null),((b=s==null?void 0:s.response)==null?void 0:b.status)===404||(s==null?void 0:s.status)===404?T("not_found"):T("error"))}),()=>{t=!1,clearTimeout(o)}}else h(null),T("not_found")},[r]);const[de,Ie]=c.useState(null),[rt,Fe]=c.useState(null);c.useEffect(()=>{var t;if(i){const o=i.reviewCount??(((t=i.reviews)==null?void 0:t.length)||0),s=o>0?i.avgRating??5:0;Ie(o),Fe(s);let b=!0;return Z.get(`/reviews?productId=${i.id}`).then(f=>{if(!b)return;const F=Array.isArray(f.data)?f.data:Array.isArray(f)?f:[];if(F.length>0){Ie(F.length);const k=F.reduce((V,_)=>V+(Number(_.rating)||5),0);Fe(Math.round(k/F.length*10)/10)}else Ie(0),Fe(0)}).catch(console.error),()=>{b=!1}}},[i==null?void 0:i.id]),c.useLayoutEffect(()=>{i&&window.scrollTo(0,0)},[i==null?void 0:i.id]);const me=c.useMemo(()=>!i||!we?-1:we.findIndex(t=>{var o;return(t.id===i.id||((o=t.product)==null?void 0:o.id)===i.id||t.productId===i.id)&&(!I||t.selectedMetal===I)}),[we,i==null?void 0:i.id,I]),pe=me>=0?we[me]:null;c.useEffect(()=>{pe&&pe.quantity&&p(pe.quantity)},[pe==null?void 0:pe.quantity,me]);const ve=t=>{const o=Math.max(1,t),s=o-U;p(o),me>=0&&s!==0&&Bt(me,s)},Ft=t=>{tt(o=>o===t?null:t)},Rt=()=>{if(!S.current)return;const t=S.current.scrollLeft,o=S.current.clientWidth;if(o>0){const s=Math.round(t/o);s!==m&&s>=0&&s<H.length&&v(s)}},Re=t=>{if(v(t),S.current){const o=S.current.clientWidth;S.current.scrollTo({left:t*o,behavior:"smooth"})}};if(w==="loading")return e.jsx(ke,{style:{textAlign:"center",padding:80},children:e.jsx("div",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.6rem",color:"#c9a45c",letterSpacing:"0.08em"},children:"LOADING AETHELCARATS PRODUCT..."})});if(w==="not_found"||!i&&w!=="error")return e.jsx(_e,{children:e.jsxs(ke,{style:{paddingBottom:60},children:[e.jsxs(qe,{children:[e.jsx(X,{to:"/",children:"Home"})," / ",e.jsx(X,{to:"/collections",children:"Jewellery"})," / ",e.jsx("span",{className:"current",children:"Product Not Found"})]}),e.jsxs(wt,{children:[e.jsx("div",{className:"not-found-icon",children:e.jsx(Ge,{size:28})}),e.jsx("h1",{children:"PRODUCT NOT FOUND"}),e.jsx("p",{children:"We're sorry, but this product is no longer available."}),e.jsx("div",{className:"cta-group",children:e.jsx(X,{to:"/collections",className:"btn-primary",children:"VIEW ALL JEWELLERY"})})]})]})});if(w==="error"||!i)return e.jsx(_e,{children:e.jsxs(ke,{style:{paddingBottom:60},children:[e.jsxs(qe,{children:[e.jsx(X,{to:"/",children:"Home"})," / ",e.jsx(X,{to:"/collections",children:"Jewellery"})," / ",e.jsx("span",{className:"current",children:"Error Loading Product"})]}),e.jsxs(wt,{children:[e.jsx("div",{className:"not-found-icon",style:{color:"#c5221f",background:"#fdf2f2",borderColor:"#f8d7da"},children:e.jsx(ut,{size:28})}),e.jsx("h1",{children:"UNABLE TO LOAD PRODUCT"}),e.jsx("p",{children:"We encountered a temporary network or server error while loading this piece. Please try again."}),e.jsxs("div",{className:"cta-group",children:[e.jsx("button",{className:"btn-primary",onClick:()=>window.location.reload(),children:"RETRY"}),e.jsx(X,{to:"/collections",className:"btn-secondary",children:"VIEW ALL JEWELLERY"})]})]})]})});const ot=Nt(i.id),Lt=i.images&&Array.isArray(i.images)&&i.images.length>0?i.images.map(t=>typeof t=="string"?t:t==null?void 0:t.url):[i.primaryImage||i.mainImage,i.secondaryImage],H=Array.from(new Set(Lt.filter(Boolean))),Pt=H[m]||H[0]||"",he=!!(((i.jewelleryType||"").toLowerCase()==="rings"||(i.jewelleryType||"").toLowerCase()==="engagement rings"||(i.jewelleryType||"").toLowerCase()==="wedding bands"||(((ct=i.category)==null?void 0:ct.name)||"").toLowerCase().includes("ring")||(i.name||"").toLowerCase().includes("ring")||i.enableRingSize===!0)&&!(i.jewelleryType||"").toLowerCase().includes("earring")&&!(i.jewelleryType||"").toLowerCase().includes("necklace")&&!(i.jewelleryType||"").toLowerCase().includes("bracelet")&&!(i.jewelleryType||"").toLowerCase().includes("pendant")),Q=!!(i.onSale===!0&&(i.comparePrice&&Number(i.comparePrice)>Number(i.price)||i.salePrice&&Number(i.salePrice)>0)),Le=Q&&i.comparePrice&&Number(i.comparePrice)>Number(i.price)?Number(i.comparePrice):Q&&i.salePrice&&Number(i.price)>Number(i.salePrice)?Number(i.price):null;let se=i.metalsConfig;if(typeof se=="string")try{se=JSON.parse(se)}catch{se=[]}const Pe=!Array.isArray(se)||se.length===0?[{label:"14K Yellow Gold",code:"14k",priceAdjustment:0},{label:"14K White Gold",code:"14k",priceAdjustment:0},{label:"14K Rose Gold",code:"14k",priceAdjustment:0},{label:"18K Yellow Gold",code:"18k",priceAdjustment:250},{label:"18K White Gold",code:"18k",priceAdjustment:350},{label:"18K Rose Gold",code:"18k",priceAdjustment:350}]:se.map(t=>typeof t=="string"?{label:t,code:t.toLowerCase().includes("18k")?"18k":"14k",priceAdjustment:0}:{label:t.label||t.name||String(t),code:t.code||(String(t.label||"").toLowerCase().includes("18k")?"18k":"14k"),priceAdjustment:typeof t.priceAdjustment=="number"?t.priceAdjustment:0}),De=(i.variations||[]).find(t=>{const o=t.metal?t.metal.toLowerCase()===I.toLowerCase():!0,s=he&&g!=="Select"&&t.ringSize?String(t.ringSize)===String(g):!0;return o&&s});let Oe=De==null?void 0:De.price;if(!Oe){const t=Pe.find(s=>s.label.toLowerCase()===I.toLowerCase());Oe=(Q&&i.salePrice&&Number(i.salePrice)>0?Number(i.salePrice):i.price||2500)+((t==null?void 0:t.priceAdjustment)||0)}const nt=Object.values(Y).reduce((t,o)=>t+(o.priceAdjustment||0),0),ae=Oe+nt;let je=null;if(Q&&Le&&Le>ae){const t=Pe.find(o=>o.label.toLowerCase()===I.toLowerCase());je=Le+((t==null?void 0:t.priceAdjustment)||0)+nt}const Dt=["Select","US 4","US 4.5","US 5","US 5.5","US 6","US 6.5","US 7","US 7.5","US 8","US 8.5","US 9","US 9.5","US 10","US 10.5","US 11","US 11.5","US 12"];let xe=[];try{i.customOptions?xe=typeof i.customOptions=="string"?JSON.parse(i.customOptions):i.customOptions:i.customOptionsJson&&(xe=typeof i.customOptionsJson=="string"?JSON.parse(i.customOptionsJson):i.customOptionsJson)}catch{}let q=[];try{i.detailSections&&Array.isArray(i.detailSections)&&i.detailSections.length>0?q=[...i.detailSections]:i.accordionsConfig&&(q=typeof i.accordionsConfig=="string"?JSON.parse(i.accordionsConfig):[...i.accordionsConfig])}catch{}(!q||q.length===0)&&(q=[...jt]);const Ot=i.fullDescription||i.description||i.shortDescription,fe=Sr(Ot,i.title||i.name);if(fe&&typeof fe=="string"&&fe.trim()!==""){const t=q.findIndex(o=>o.id==="overview"||(o.title||"").toUpperCase().includes("DESCRIPTION")||(o.title||"").toUpperCase().includes("OVERVIEW"));t!==-1?q[t]={...q[t],title:"PRODUCT OVERVIEW & DESCRIPTION",content:fe.trim(),enabled:!0}:q.unshift({id:"overview",title:"PRODUCT OVERVIEW & DESCRIPTION",content:fe.trim(),enabled:!0,defaultOpen:!0})}const st=new Set,Mt=q.filter(t=>t.isActive!==!1&&t.enabled!==!1).filter(t=>{const o=(t.type||t.title||t.id||"").trim().toUpperCase();return o?st.has(o)?!1:(st.add(o),!0):!0}),Me=he&&i.isRingSizeRequired!==!1,at=()=>{if(Me&&(g==="Select"||!g)){ie(!0),ge("Please select a US Ring Size before adding to your bag.","warning");return}ie(!1);const t={};if(i.enableCustomOptions){for(const o of xe)if(o.required){const s=Y[o.title||o.name||o.label];(!s||!s.value||!s.value.trim())&&(t[o.title||o.name||o.label]=`Please complete required option: ${o.title||o.name||o.label}`)}}if(Object.keys(t).length>0){K(t),ge(Object.values(t)[0],"warning");return}K({}),it(i,U,I,he?g==="Select"?"US 7":g:void 0,ye,Y,ae),ge("Product successfully added to your shopping bag!","success")},lt=()=>{if(Me&&(g==="Select"||!g)){ie(!0),ge("Please select a US Ring Size before proceeding to checkout.","warning");return}ie(!1);const t={};if(i.enableCustomOptions){for(const o of xe)if(o.required){const s=Y[o.title||o.name||o.label];(!s||!s.value||!s.value.trim())&&(t[o.title||o.name||o.label]=`Please complete required option: ${o.title||o.name||o.label}`)}}if(Object.keys(t).length>0){K(t),ge(Object.values(t)[0],"warning");return}K({}),it(i,U,I,he?g==="Select"?"US 7":g:void 0,ye,Y,ae),u("/checkout")};return e.jsxs(_e,{children:[e.jsxs(ke,{children:[e.jsxs(qe,{children:[e.jsx(X,{to:"/",children:"Home"})," / ",e.jsx(X,{to:"/collections",children:((dt=i.category)==null?void 0:dt.name)||i.jewelleryType||"Jewellery"})," / ",e.jsx("span",{className:"current",children:i.title||i.name})]}),e.jsxs(Ri,{children:[e.jsx(Li,{children:e.jsx(Pi,{ref:j,children:e.jsx(Di,{className:"desktop-image-grid",children:H.map((t,o)=>e.jsxs(Oi,{onClick:()=>{v(o),x(!0)},children:[e.jsx(vt,{src:t,alt:`${i.title||i.name} view ${o+1}`}),e.jsxs("div",{className:"zoom-hint",children:[e.jsx(St,{size:12}),"Click to expand"]})]},`gallery_${t}_${o}`))})})}),e.jsxs(Mi,{children:[H.length>0&&e.jsxs(Gi,{children:[m+1," / ",H.length]}),H.length>1&&m>0&&e.jsx(yt,{$dir:"left",onClick:()=>Re(m-1),"aria-label":"Previous Image",children:e.jsx(ze,{size:20})}),H.length>1&&m<H.length-1&&e.jsx(yt,{$dir:"right",onClick:()=>Re(m+1),"aria-label":"Next Image",children:e.jsx(Te,{size:20})}),e.jsx(Wi,{ref:S,onScroll:Rt,children:H.map((t,o)=>e.jsx(Ui,{onClick:()=>{v(o),x(!0)},children:e.jsx(vt,{src:t,alt:`${i.title||i.name} view ${o+1}`})},`mob_${o}`))}),e.jsx(Yi,{children:H.map((t,o)=>e.jsx("span",{className:m===o?"active":"",onClick:()=>Re(o)},o))})]}),e.jsx(ci,{images:H,activeIndex:m,productName:i.title||i.name,isOpen:y,onClose:()=>x(!1),onSelectIndex:t=>v(t)}),e.jsxs(Hi,{children:[e.jsxs(Vi,{children:[e.jsxs("div",{children:[e.jsx("h1",{children:i.title||i.name}),e.jsxs(Ji,{children:[e.jsx("span",{className:"stars",children:de&&de>0?"★".repeat(Math.round(rt||5))+"☆".repeat(5-Math.round(rt||5)):"☆☆☆☆☆"}),e.jsx("span",{children:de!==null&&de>0?`(${de} ${de===1?"review":"reviews"})`:"(No reviews yet)"})]})]}),e.jsx("button",{className:`wishlist-btn ${ot?"active":""}`,onClick:()=>$t(i),title:"Save to Wishlist",children:e.jsx(Vt,{size:20,fill:ot?"#c00":"none"})})]}),e.jsxs(Ae,{children:[e.jsxs(_i,{style:{marginTop:0,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"},children:[e.jsxs("span",{className:"current-price",style:{color:Q?"#E53E3E":"#C9A96E"},children:["$",ae.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})]}),Q&&je!==null&&je>ae&&e.jsxs("span",{className:"compare-price",children:["$",je.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})]}),Q&&e.jsx("span",{style:{background:"#d93838",color:"#fff",fontSize:"0.75rem",fontWeight:700,padding:"4px 10px",borderRadius:4,letterSpacing:"0.04em"},children:"🏷️ ON SALE"})]}),!!(Q&&i.saleEndsAt)&&e.jsx(jr,{saleEndsAt:i.saleEndsAt})]}),i.enableMetalSelection!==!1&&e.jsxs(Ae,{children:[e.jsxs(qi,{children:[e.jsx("span",{className:"label",children:"Metal Type:"}),e.jsx("span",{className:"value",children:I})]}),e.jsx(Ki,{children:Pe.map((t,o)=>e.jsx(Xi,{type:"button",$isSelected:I.toLowerCase()===t.label.toLowerCase(),onClick:()=>{P(t.label),d(t.code)},title:t.label,children:t.label},o))})]}),he&&e.jsxs(Ae,{children:[e.jsxs(Zi,{children:[e.jsxs("span",{className:"label-title",children:["Ring Size ",Me?e.jsx("span",{style:{color:"#d9534f"},children:"*"}):e.jsx("span",{style:{color:"#888",fontWeight:400,fontSize:"0.75rem"},children:"(Optional)"}),":"]}),e.jsxs(Qi,{ref:L,children:[e.jsxs(er,{onClick:()=>te(!$),children:[e.jsx("span",{className:g!=="Select"?"selected-val":"placeholder-val",children:g}),e.jsx("span",{className:"arrow-icon",children:e.jsx("svg",{width:"9",height:"6",viewBox:"0 0 9 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M4.5 6L0 0H9L4.5 6Z",fill:"#0c1938"})})})]}),$&&e.jsx(tr,{children:(i.availableRingSizes||Dt).map(t=>e.jsx("div",{className:`option-item ${g===t?"selected":""}`,onClick:()=>{D(t),te(!1),ie(!1)},children:t},t))})]}),e.jsx(X,{to:"/education/rings/find-your-ring-size",className:"guide-link",children:"Ring Size Guide"})]}),Ne&&e.jsxs("div",{style:{color:"#d9534f",fontSize:"0.8rem",fontWeight:600,marginTop:8,display:"flex",alignItems:"center",gap:6},children:[e.jsx("span",{children:"⚠️"})," Please select a US Ring Size before adding this ring to your shopping bag."]})]}),!!i.enableCustomOptions&&xe.length>0&&e.jsx(Ae,{children:e.jsx(ir,{children:xe.map((t,o)=>{var k,V,_,Se;const s=t.title||t.name||t.label;if(!s)return null;const b=t.inputType||t.fieldType||"Text",f=!!oe[s],F=Number(t.priceAdjustment)||0;return e.jsxs("div",{children:[e.jsxs(rr,{children:[s,(k=Y[s])!=null&&k.value?`: ${Y[s].value}`:"",t.required&&e.jsx("span",{style:{color:"#c5221f"},children:"*"}),b!=="Checkbox"&&F>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600,marginLeft:6},children:["(+$",F,")"]})]}),b==="Text"&&e.jsx(or,{type:"text",$hasError:f,maxLength:t.maxCharacterLength||t.maxLength||25,placeholder:t.placeholder||`Enter ${s}...`,value:((V=Y[s])==null?void 0:V.value)||"",onChange:z=>{const R=z.target.value;le(B=>({...B,[s]:{title:s,value:R,priceAdjustment:R.trim()?F:0}})),oe[s]&&K(B=>({...B,[s]:""}))}}),b==="Textarea"&&e.jsx(nr,{rows:2,$hasError:f,maxLength:t.maxCharacterLength||t.maxLength||100,placeholder:t.placeholder||`Enter ${s}...`,value:((_=Y[s])==null?void 0:_.value)||"",onChange:z=>{const R=z.target.value;le(B=>({...B,[s]:{title:s,value:R,priceAdjustment:R.trim()?F:0}})),oe[s]&&K(B=>({...B,[s]:""}))}}),b==="Dropdown"&&e.jsxs(sr,{$hasError:f,value:((Se=Y[s])==null?void 0:Se.value)||"",onChange:z=>{const B=(t.choices||t.values||[]).find(J=>(J.label||J.value||J)===z.target.value),O=typeof B=="object"?Number(B.priceAdjustment)||0:F;le(J=>({...J,[s]:{title:s,value:z.target.value,priceAdjustment:z.target.value?O:0}})),oe[s]&&K(J=>({...J,[s]:""}))},children:[e.jsxs("option",{value:"",children:["-- Select ",s," --"]}),(t.choices||t.values||[]).map((z,R)=>{const B=typeof z=="string"?z:z.label||z.value,O=typeof z=="object"&&Number(z.priceAdjustment)||0;return e.jsxs("option",{value:B,children:[B," ",O>0?`(+$${O})`:""]},R)})]}),b==="Radio"&&e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:(t.choices||t.values||[]).map((z,R)=>{var J;const B=typeof z=="string"?z:z.label||z.value,O=typeof z=="object"?Number(z.priceAdjustment)||0:F;return e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,fontSize:"0.88rem",cursor:"pointer",color:"#0c1938"},children:[e.jsx("input",{type:"radio",name:`opt_${s}`,checked:((J=Y[s])==null?void 0:J.value)===B,onChange:()=>{le(ee=>({...ee,[s]:{title:s,value:B,priceAdjustment:O}})),oe[s]&&K(ee=>({...ee,[s]:""}))},style:{accentColor:"#0c1938",cursor:"pointer"}}),B," ",O>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600},children:["(+$",O,")"]})]},R)})}),b==="Checkbox"&&(()=>{var B;const z=t.checkboxOptions&&Array.isArray(t.checkboxOptions)&&t.checkboxOptions.length>0?t.checkboxOptions:t.choices&&Array.isArray(t.choices)&&t.choices.length>0?t.choices:[{id:"cb_default",label:t.checkboxLabel!==void 0&&t.checkboxLabel!==""?t.checkboxLabel:s,priceAdjustment:F}],R=((B=Y[s])==null?void 0:B.value)||"";return e.jsx("div",{children:e.jsx(ar,{children:z.map((O,J)=>{const ee=typeof O=="string"?O:O.label||O.value;if(!ee)return null;const We=typeof O=="object"&&Number(O.priceAdjustment)||0,xt=R===ee;return e.jsxs(lr,{type:"button",$isSelected:xt,onClick:()=>{le(xt?be=>({...be,[s]:{title:s,value:"",priceAdjustment:0}}):be=>({...be,[s]:{title:s,value:ee,priceAdjustment:We}})),oe[s]&&K(be=>({...be,[s]:""}))},children:[e.jsx("span",{children:ee}),We>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600,marginLeft:6},children:["(+$$",We,")"]})]},O.id||J)})})})})(),f&&e.jsx("div",{style:{fontSize:"0.78rem",color:"#c5221f",marginTop:4},children:oe[s]})]},t.id||o)})})}),e.jsxs(cr,{style:{marginTop:4},children:[ne!=null&&ne.active?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10,width:"100%"},children:[e.jsx("button",{disabled:!0,style:{width:"100%",padding:"16px 24px",background:"#e2e8f0",color:"#64748b",border:"1px solid #cbd5e1",borderRadius:4,fontWeight:700,fontSize:"0.85rem",letterSpacing:"0.08em",textTransform:"uppercase",cursor:"not-allowed"},children:"ORDERS TEMPORARILY UNAVAILABLE"}),e.jsx("div",{style:{fontSize:"0.82rem",color:"#c53030",background:"#fff5f5",border:"1px solid #feb2b2",padding:"10px 14px",borderRadius:4,textAlign:"center",lineHeight:1.5},children:ne.message||"Orders are temporarily unavailable while Holiday Mode is active. Please check back soon."})]}):e.jsxs(dr,{children:[(l==null?void 0:l.showQuantitySelector)!==!1&&e.jsx("div",{className:"qty-selector-col",children:e.jsxs(pr,{children:[e.jsx("button",{type:"button",onClick:()=>ve(U-1),"aria-label":"Decrease quantity",children:e.jsx(gt,{size:14})}),e.jsx("span",{children:U}),e.jsx("button",{type:"button",onClick:()=>ve(U+1),"aria-label":"Increase quantity",children:e.jsx(mt,{size:14})})]})}),e.jsx("div",{className:"add-bag-col",children:e.jsxs(xr,{onClick:at,children:["ADD TO BAG • $",(ae*U).toLocaleString()]})}),(l==null?void 0:l.showBuyNowButton)!==!1&&e.jsx("div",{className:"buy-now-col",children:e.jsxs(ur,{onClick:lt,children:[e.jsx(Jt,{size:16})," BUY IT NOW"]})})]}),M.enableConsultAtelierExpert!=="false"&&e.jsx(gr,{onClick:()=>re(!0),children:"CONSULT AN ATELIER EXPERT"})]}),(l==null?void 0:l.showBenefits)!==!1&&e.jsx(mr,{children:l!=null&&l.benefitsJson?(()=>{try{return(typeof l.benefitsJson=="string"?JSON.parse(l.benefitsJson):l.benefitsJson).filter(o=>o.isActive!==!1).map((o,s)=>e.jsxs("div",{className:"benefit-item",children:[o.icon==="Truck"&&e.jsx(Ye,{size:16}),o.icon==="ShieldCheck"&&e.jsx(He,{size:16}),o.icon==="Award"&&e.jsx(Ve,{size:16}),o.icon==="Sparkles"&&e.jsx(Ge,{size:16}),(!o.icon||!["Truck","ShieldCheck","Award","Sparkles"].includes(o.icon))&&e.jsx(_t,{size:16}),o.title]},o.id||s))}catch{return null}})():e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"benefit-item",children:[e.jsx(Ye,{size:16})," Free Insured Delivery"]}),e.jsxs("div",{className:"benefit-item",children:[e.jsx(He,{size:16})," Lifetime Service Warranty"]}),e.jsxs("div",{className:"benefit-item",children:[e.jsx(Ve,{size:16})," GIA / IGI Certification"]})]})}),e.jsx(hr,{style:{marginTop:24},children:Mt.map((t,o)=>{const s=t.id||t.title||`acc_${o}`,b=$e===s;return e.jsxs(Be.Fragment,{children:[e.jsxs(fr,{onClick:()=>Ft(s),children:[e.jsx("span",{children:t.title}),e.jsx("span",{children:b?"−":"+"})]}),e.jsxs(br,{$open:b,children:[t.description&&e.jsx("div",{style:{fontSize:"0.88rem",color:"#D8D2C5",marginBottom:t.items&&t.items.length>0?14:0,lineHeight:1.7},children:t.description}),t.items&&Array.isArray(t.items)&&t.items.length>0?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:t.type==="SPECIFICATIONS"||(t.title||"").toUpperCase().includes("SPECIFICATION")?e.jsxs("div",{style:{background:"#151515",border:"1px solid rgba(140, 116, 75, 0.25)",padding:18,borderRadius:6,boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4)"},children:[e.jsx("div",{style:{fontSize:"0.78rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#C9A96E",marginBottom:12},children:"SPECIFICATION DETAILS"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"12px 18px",fontSize:"0.85rem"},children:t.items.map((f,F)=>e.jsxs("div",{children:[f.title&&e.jsxs("strong",{style:{color:"#F5F1E8",fontWeight:600},children:[f.title,": "]}),e.jsx("span",{style:{color:"#D8D2C5"},children:f.value||f.description||"-"})]},f.id||F))})]}):t.items.map((f,F)=>e.jsxs("div",{style:{background:"#151515",border:"1px solid rgba(140, 116, 75, 0.25)",padding:16,borderRadius:6,display:"flex",flexDirection:"column",gap:6,boxShadow:"0 4px 16px rgba(0, 0, 0, 0.35)"},children:[f.imageUrl&&e.jsx("img",{src:f.imageUrl,alt:f.title||"Atelier Media",style:{width:"100%",maxHeight:220,objectFit:"cover",borderRadius:4,marginBottom:6}}),(f.title||f.icon)&&e.jsxs("div",{style:{fontSize:"0.92rem",fontWeight:700,color:"#F5F1E8",display:"flex",alignItems:"center",gap:8},children:[f.icon==="Truck"&&e.jsx(Ye,{size:16,color:"#C9A96E"}),f.icon==="ShieldCheck"&&e.jsx(He,{size:16,color:"#C9A96E"}),f.icon==="Award"&&e.jsx(Ve,{size:16,color:"#C9A96E"}),f.icon==="Sparkles"&&e.jsx(Ge,{size:16,color:"#C9A96E"}),f.title]}),f.value&&e.jsx("div",{style:{fontSize:"0.88rem",fontWeight:600,color:"#C9A96E"},children:f.value}),f.description&&e.jsx("div",{style:{fontSize:"0.85rem",color:"#D8D2C5",lineHeight:1.6},children:f.description})]},f.id||F))}):!t.description&&e.jsx("div",{style:{whiteSpace:"pre-line",fontSize:"0.88rem",color:"#D8D2C5",lineHeight:1.7},children:t.content||"Information for this section."})]})]},s)})})]})]})]}),e.jsx(Ni,{items:N,currentProductId:i.id,category:i.jewelleryType||((pt=i.category)==null?void 0:pt.name)||(typeof i.category=="string"?i.category:""),content:l}),e.jsx(fi,{content:l}),e.jsx(zi,{productName:i.name||i.title,content:l,productId:i.id,reviews:i.reviews}),e.jsx(Fi,{currentProductId:i.id,content:l}),G&&M.enableConsultAtelierExpert!=="false"&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsxs("div",{style:{background:"#151515",border:"1px solid rgba(140, 116, 75, 0.3)",padding:32,borderRadius:8,maxWidth:500,width:"90%",textAlign:"center",color:"#F5F1E8"},children:[e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",color:"#F5F1E8",marginBottom:12},children:M.consultTitle||"Consult an Atelier Expert"}),e.jsx("p",{style:{fontSize:"0.9rem",color:"#A8A8A8",marginBottom:20,whiteSpace:"pre-line"},children:M.consultDescription||"Speak directly with our AethelCarats specialists regarding custom design, diamond selection, or sizing guidance."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,marginBottom:20},children:[M.consultPhone&&M.consultPhone.trim()!==""&&e.jsxs("a",{href:`tel:${M.consultPhone.replace(/[^\d+]/g,"")}`,style:{padding:"12px",background:"#111111",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,textDecoration:"none",color:"#F5F1E8",fontWeight:600},children:["☎ ",M.consultPhoneLabel||"Call Atelier",": ",M.consultPhone]}),M.consultEmail&&M.consultEmail.trim()!==""&&e.jsxs("a",{href:`mailto:${M.consultEmail.trim()}`,style:{padding:"12px",background:"#111111",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,textDecoration:"none",color:"#F5F1E8",fontWeight:600},children:["✉ ",M.consultEmailLabel||"Email Concierge",": ",M.consultEmail]})]}),e.jsx("button",{onClick:()=>re(!1),style:{padding:"10px 24px",background:"#C9A96E",color:"#0B0B0B",border:"none",borderRadius:4,cursor:"pointer",fontWeight:700},children:M.consultCloseLabel||"Close"})]})}),e.jsxs(wr,{$show:ce.show,$type:ce.type,children:[e.jsx("div",{className:"toast-icon",children:ce.type==="success"?e.jsx(qt,{size:22}):e.jsx(ut,{size:22})}),e.jsx("div",{className:"toast-content",children:ce.message}),e.jsx("button",{className:"toast-close",onClick:()=>zt(t=>({...t,show:!1})),children:e.jsx(Xe,{size:16})}),ce.show&&e.jsx("div",{className:"progress-bar"},ce.message)]}),e.jsx(yr,{$show:C&&!(ne!=null&&ne.active)&&(l==null?void 0:l.showStickyBar)!==!1,children:e.jsxs("div",{className:"sticky-inner",children:[e.jsxs("div",{className:"product-info",children:[e.jsx("img",{src:Pt,alt:(i==null?void 0:i.title)||(i==null?void 0:i.name)||"Jewellery"}),e.jsxs("div",{className:"title-price",children:[e.jsx("div",{className:"title",children:(i==null?void 0:i.title)||(i==null?void 0:i.name)}),e.jsxs("div",{className:"meta-price",children:["$",(ae*U).toLocaleString()]})]})]}),e.jsxs("div",{className:"sticky-actions",children:[e.jsxs("div",{className:"sticky-qty",children:[e.jsx("button",{type:"button",onClick:()=>ve(U-1),children:e.jsx(gt,{size:12})}),e.jsx("span",{children:U}),e.jsx("button",{type:"button",onClick:()=>ve(U+1),children:e.jsx(mt,{size:12})})]}),e.jsx("button",{className:"sticky-btn add-bag",onClick:at,children:"ADD TO BAG"}),e.jsx("button",{className:"sticky-btn buy-now",onClick:lt,children:"BUY IT NOW"})]})]})})]})};export{Br as ProductDetailPage};
