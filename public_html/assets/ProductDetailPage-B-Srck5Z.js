import{r as c,j as e,X as qe,k as ze,l as Te,aU as Mt,aV as jt,aa as Wt,R as Ne,t as Me,ag as Ut,ao as Gt,u as Yt,f as X,g as We,C as gt,H as _t,M as ut,P as mt,aW as Ht,ax as Ue,v as Ge,aS as Ye,c as Vt,a as Jt}from"./react-vendor-BQZO0c5l.js";import{g as n}from"./ui-vendor-Bs2yixgz.js";import{S as ht,a as ee,R as Je,u as qt,b as Kt,c as Xt}from"./admin-pages-CFpKmMlb.js";import{P as St}from"./ProductCard-CRECB98E.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const Zt=n.div`
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
`,Qt=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  z-index: 10;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.6), transparent);
`,ei=n.div`
  color: #fffdf9;
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.2rem;
  letter-spacing: 0.05em;
`,ti=n.button`
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
`,ii=n.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  touch-action: none;
`,ri=n.div`
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
`,oi=n.div`
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
`,_e=n.button`
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
`,ni=n.span`
  color: #c9a45c;
  font-size: 0.85rem;
  font-weight: 600;
  min-width: 48px;
  text-anchor: middle;
  text-align: center;
`,si=n.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 16px 24px;
  overflow-x: auto;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
  z-index: 10;
  -webkit-overflow-scrolling: touch;
`,ai=n.button`
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
`,li=({images:r,activeIndex:g,productName:i,isOpen:m,onClose:B,onSelectIndex:E})=>{const[h,v]=c.useState(1),[y,x]=c.useState({x:0,y:0}),[l,k]=c.useState(!1),[w,z]=c.useState({x:0,y:0}),[T,j]=c.useState(null),[L,I]=c.useState(0),D=c.useRef(null);if(c.useEffect(()=>{v(1),x({x:0,y:0})},[g,m]),c.useEffect(()=>{const p=S=>{S.key==="Escape"&&m&&B()};return window.addEventListener("keydown",p),()=>window.removeEventListener("keydown",p)},[m,B]),!m||r.length===0)return null;const xe=r[g]||r[0],d=()=>{v(p=>Math.min(p+.5,3.5))},u=()=>{v(p=>{const S=Math.max(p-.5,1);return S===1&&x({x:0,y:0}),S})},M=()=>{v(1),x({x:0,y:0})},$=p=>{p==null||p.stopPropagation(),M(),E(g===0?r.length-1:g-1)},te=p=>{p==null||p.stopPropagation(),M(),E(g===r.length-1?0:g+1)},Be=p=>{p.preventDefault(),p.deltaY<0?v(S=>Math.min(S+.25,3.5)):v(S=>{const W=Math.max(S-.25,1);return W===1&&x({x:0,y:0}),W})},ie=p=>{h<=1||(k(!0),z({x:p.clientX-y.x,y:p.clientY-y.y}))},Ke=p=>{if(!l||h<=1)return;const S=p.clientX-w.x,W=p.clientY-w.y,G=(h-1)*300,re=Math.max(-G,Math.min(G,S)),$e=Math.max(-G,Math.min(G,W));x({x:re,y:$e})},Xe=()=>{k(!1)},be=p=>{if(p.touches.length===2){const W=Math.hypot(p.touches[0].clientX-p.touches[1].clientX,p.touches[0].clientY-p.touches[1].clientY);j(W);return}const S=Date.now();S-L<300&&(h>1?M():v(2)),I(S),h>1&&p.touches.length===1&&(k(!0),z({x:p.touches[0].clientX-y.x,y:p.touches[0].clientY-y.y}))},Ze=p=>{if(p.touches.length===2&&T!==null){const S=Math.hypot(p.touches[0].clientX-p.touches[1].clientX,p.touches[0].clientY-p.touches[1].clientY),W=S-T;Math.abs(W)>4&&(v(G=>{const re=Math.min(Math.max(G+(W>0?.08:-.08),1),3.5);return re===1&&x({x:0,y:0}),re}),j(S));return}if(l&&h>1&&p.touches.length===1){const S=p.touches[0].clientX-w.x,W=p.touches[0].clientY-w.y,G=(h-1)*300;x({x:Math.max(-G,Math.min(G,S)),y:Math.max(-G,Math.min(G,W))})}},U=()=>{k(!1),j(null)};return e.jsxs(Zt,{onClick:B,children:[e.jsxs(Qt,{onClick:p=>p.stopPropagation(),children:[e.jsx(ei,{children:i}),e.jsx(ti,{onClick:B,"aria-label":"Close Lightbox",children:e.jsx(qe,{size:20})})]}),e.jsxs(ii,{ref:D,onWheel:Be,onMouseDown:ie,onMouseMove:Ke,onMouseUp:Xe,onTouchStart:be,onTouchMove:Ze,onTouchEnd:U,onClick:p=>p.stopPropagation(),children:[e.jsx(ri,{$isDragging:l,style:{transform:`translate3d(${y.x}px, ${y.y}px, 0) scale(${h})`},children:e.jsx(ht,{src:xe,alt:i})}),r.length>1&&e.jsxs(e.Fragment,{children:[e.jsx(ft,{$direction:"left",onClick:$,"aria-label":"Previous Image",children:e.jsx(ze,{size:24})}),e.jsx(ft,{$direction:"right",onClick:te,"aria-label":"Next Image",children:e.jsx(Te,{size:24})})]}),e.jsxs(oi,{onClick:p=>p.stopPropagation(),children:[e.jsx(_e,{onClick:u,disabled:h<=1,title:"Zoom Out",children:e.jsx(Mt,{size:18})}),e.jsxs(ni,{children:[Math.round(h*100),"%"]}),e.jsx(_e,{onClick:d,disabled:h>=3.5,title:"Zoom In",children:e.jsx(jt,{size:18})}),e.jsx(_e,{onClick:M,title:"Reset Zoom",children:e.jsx(Wt,{size:16})})]})]}),r.length>1&&e.jsx(si,{onClick:p=>p.stopPropagation(),children:r.map((p,S)=>e.jsx(ai,{$active:g===S,onClick:()=>{M(),E(S)},"aria-label":`View image ${S+1}`,children:e.jsx(ht,{src:p,alt:`${i} thumbnail ${S+1}`})},S))})]})},a={white:"#151515",primaryText:"#F5F1E8",secondaryText:"#A8A8A8",gold:"#C9A96E",darkGold:"#8C744B",lightGold:"#DFCA9B",border:"rgba(140, 116, 75, 0.25)"},ci=n.section`
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
`,di=n.div`
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
`,pi=n.div`
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
`,xi=n.div`
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
`,ui=n.div`
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
`,mi=n.div`
  display: ${({$isOpen:r})=>r?"block":"none"};
  padding: 0 0 16px 0;
  font-size: 0.88rem;
  color: ${a.secondaryText};
  line-height: 1.6;
`,hi=({content:r})=>{const[g,i]=c.useState(null);if(r&&r.showPackagingSection===!1)return null;const m=y=>y?y.replace(/FedEx\s+Priority\s+Air/gi,"Priority Air").replace(/FedEx\s+locations/gi,"express courier locations").replace(/FedEx/gi,"Priority Air").replace(/We\s+also\s+offer\s+a\s+30-day\s+return\s+policy,\s+subject\s+to\s+our\s+return\s+terms\s+and\s+conditions\./gi,"").replace(/30-day\s+return\s+policy\./gi,"").trim():"";let B=[{title:"Discreet Packaging",content:"Every order is shipped in plain, unbranded outer security boxes. There is no mention of AethelCarats or diamond jewelry on the package exterior for 100% privacy and security."},{title:"Secure and Convenient Pickup Option",content:"Hold your order for pick up at thousands of secure express courier locations or choose insured signature delivery directly to your doorstep."},{title:"SHIPPING & DELIVERY",content:"After order confirmation, your order will be dispatched within 7-10 working days. Once dispatched, delivery is estimated within an additional 7-10 working days. All shipments are sent via fully insured Priority Air for secure and reliable delivery."}];if(r&&r.packagingItemsJson)try{const y=typeof r.packagingItemsJson=="string"?JSON.parse(r.packagingItemsJson):r.packagingItemsJson;Array.isArray(y)&&y.length>0&&(B=y.filter(x=>x.isActive!==!1).map(x=>({title:x.title,content:m(x.description||x.content)})))}catch{}const E=(r==null?void 0:r.packagingHeading)||"We're committed to making your entire experience a pleasant one, from shopping to shipping.",h=(r==null?void 0:r.packagingDescription)||"Every item we send comes in our signature AethelCarats packaging. Engagement rings arrive in a deluxe velvet ring box within an elegant presentation box ready for your proposal. The presentation box also secures your appraisal certificate and GIA/IGI diamond grading report. Loose diamonds are presented in a velvet lined diamond case that securely holds the stone.";return e.jsx(Je,{yOffset:35,children:e.jsx(ci,{children:e.jsxs(di,{children:[e.jsx(pi,{children:e.jsx("img",{src:"/assets/gem_ring_box.png",alt:"AethelCarats Signature Packaging"})}),e.jsxs(xi,{children:[e.jsx("h2",{children:E}),e.jsx("p",{children:h}),e.jsx(gi,{children:B.map((y,x)=>e.jsxs(Ne.Fragment,{children:[e.jsxs(ui,{onClick:()=>i(g===x?null:x),children:[e.jsx("span",{children:y.title}),e.jsx("span",{style:{fontSize:"1.2rem",color:a.gold},children:g===x?"−":"+"})]}),e.jsx(mi,{$isOpen:g===x,children:y.content})]},x))})]})]})})})},fi=n.section`
  max-width: 1280px;
  margin: 80px auto 0;
  padding: 0 24px;

  @media (max-width: 768px) {
    margin-top: 48px;
    padding: 0 16px;
  }
`,bi=n.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  text-align: center;
  color: ${a.primaryText};
  margin-bottom: 40px;
`,yi=n.div`
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
`,wi=n.div`
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
`,vi=n.button`
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
`,zi=({productName:r="AethelCarats Creation",content:g,productId:i,reviews:m})=>{const[B,E]=c.useState(!1),[h,v]=c.useState(5),[y,x]=c.useState(""),[l,k]=c.useState(""),[w,z]=c.useState("");if(g&&(g.reviewsEnabled===!1||g.showReviews===!1))return null;const[T,j]=c.useState(()=>m&&Array.isArray(m)&&m.length>0?m.map((d,u)=>({id:d.id||`rev_${u}`,name:d.author||d.name||d.authorName||"Verified Buyer",verified:!0,rating:Number(d.rating)||5,title:d.title||(d.comment?d.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:d.date||(d.createdAt?new Date(d.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:d.text||d.comment||d.content||"",productReviewed:d.productReviewed||r,response:d.response||null})):[]);c.useEffect(()=>{let d=!0;return m&&Array.isArray(m)&&m.length>0?j(m.map((u,M)=>({id:u.id||`rev_${M}`,name:u.author||u.name||u.authorName||"Verified Buyer",verified:!0,rating:Number(u.rating)||5,title:u.title||(u.comment?u.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:u.date||(u.createdAt?new Date(u.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:u.text||u.comment||u.content||"",productReviewed:u.productReviewed||r,response:u.response||null}))):ee.get("/reviews"+(i?`?productId=${i}`:"")).then(u=>{if(!d)return;const M=Array.isArray(u.data)?u.data:Array.isArray(u)?u:[];M.length>0&&j(M.map(($,te)=>({id:$.id||`rev_${te}`,name:$.author||$.name||$.authorName||"Verified Buyer",verified:!0,rating:Number($.rating)||5,title:$.title||($.comment?$.comment.split(`
`)[0]:"Exceeded Every Expectation!"),date:$.date||($.createdAt?new Date($.createdAt).toLocaleDateString("en-US"):"18/08/2026"),text:$.text||$.comment||$.content||"",productReviewed:$.productReviewed||r,response:$.response||null})))}).catch(console.error),()=>{d=!1}},[i,m,r]);const L=d=>{if(d.preventDefault(),!y||!l||!w){alert("Please fill in all required fields.");return}const u={id:`rev_${Date.now()}`,name:y,verified:!0,rating:h,title:l,date:new Date().toLocaleDateString("en-US"),text:w,productReviewed:r,response:"Thank you for sharing your experience with AethelCarats!"};j([u,...T]),E(!1),x(""),k(""),z(""),alert("Thank you! Your review has been submitted successfully.")},I=(g==null?void 0:g.reviewsTitle)||"Item Reviews";g==null||g.reviewsVerifiedBadge;const D=(g==null?void 0:g.reviewsSubmissionEnabled)??!0,xe=T.length>0?(T.reduce((d,u)=>d+(Number(u.rating)||5),0)/T.length).toFixed(1):"5.0";return e.jsxs(fi,{children:[e.jsx(bi,{children:I}),e.jsxs(yi,{children:[e.jsxs(wi,{children:[e.jsx("div",{className:"score-num",children:xe}),e.jsxs("div",{className:"stars-col",children:[e.jsx("div",{className:"stars-row",children:[...Array(5)].map((d,u)=>e.jsx(Me,{size:18,fill:u<Math.round(Number(xe))?a.gold:"none",color:a.gold},u))}),e.jsxs("div",{className:"rev-count",children:[T.length," Verified ",T.length===1?"Review":"Reviews"]})]})]}),D&&e.jsx(vi,{onClick:()=>E(!0),children:"Write A Review"})]}),e.jsxs(ji,{children:[e.jsxs("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:[e.jsxs(Ce,{children:[e.jsx("input",{type:"checkbox",id:"withMedia",defaultChecked:!0,style:{accentColor:a.gold}}),e.jsx("label",{htmlFor:"withMedia",children:"With media"})]}),e.jsx(Ce,{children:e.jsxs("select",{defaultValue:"all",children:[e.jsx("option",{value:"all",children:"Recommendation (All)"}),e.jsx("option",{value:"yes",children:"Recommends Product"})]})}),e.jsx(Ce,{children:e.jsxs("select",{defaultValue:"exceeds",children:[e.jsx("option",{value:"exceeds",children:"Expectations (Exceeds)"}),e.jsx("option",{value:"met",children:"Met Expectations"})]})})]}),e.jsxs(Ce,{children:[e.jsx("span",{children:"Sort by:"}),e.jsxs("select",{defaultValue:"relevant",children:[e.jsx("option",{value:"relevant",children:"Most relevant"}),e.jsx("option",{value:"newest",children:"Newest first"}),e.jsx("option",{value:"highest",children:"Highest rated"})]})]})]}),e.jsx("div",{children:T.map(d=>e.jsxs(Si,{children:[e.jsxs(Ci,{children:[e.jsx("div",{className:"avatar-circle",children:d.name.charAt(0)}),e.jsx("div",{className:"user-name",children:d.name}),d.verified&&e.jsxs("div",{className:"verified-badge",children:[e.jsx(Ut,{size:12,color:a.darkGold})," Verified Buyer"]})]}),e.jsxs(ki,{children:[e.jsxs("div",{className:"review-header",children:[e.jsxs("div",{className:"rating-and-title",children:[e.jsx("div",{className:"stars",children:[...Array(d.rating)].map((u,M)=>e.jsx(Me,{size:14,fill:a.gold,color:a.gold},M))}),e.jsx("div",{className:"title",children:d.title})]}),e.jsx("div",{className:"date",children:d.date})]}),e.jsx("div",{className:"body-text",children:d.text}),e.jsxs("div",{className:"product-reviewed",children:["Product reviewed: ",d.productReviewed]}),d.response&&e.jsxs("div",{className:"atelier-response",children:[e.jsx("div",{className:"resp-title",children:"AethelCarats Atelier Team"}),e.jsx("div",{className:"resp-body",children:d.response})]})]})]},d.id))}),B&&e.jsx(Ai,{onClick:()=>E(!1),children:e.jsxs(Ei,{onClick:d=>d.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12},children:[e.jsx("h3",{children:"Write a Review"}),e.jsx(qe,{size:20,style:{cursor:"pointer",color:a.secondaryText},onClick:()=>E(!1)})]}),e.jsxs("p",{children:["Share your authentic experience with ",r,"."]}),e.jsxs("form",{onSubmit:L,style:{display:"flex",flexDirection:"column",gap:16},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Rating"}),e.jsx("div",{style:{display:"flex",gap:6},children:[1,2,3,4,5].map(d=>e.jsx(Me,{size:24,style:{cursor:"pointer"},fill:d<=h?a.gold:"none",color:a.gold,onClick:()=>v(d)},d))})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Your Name"}),e.jsx("input",{type:"text",required:!0,value:y,onChange:d=>x(d.target.value),placeholder:"e.g. Patty G.",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem",background:"#0B0B0B",color:"#F5F1E8"}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Headline / Title"}),e.jsx("input",{type:"text",required:!0,value:l,onChange:d=>k(d.target.value),placeholder:"e.g. Perfect description & exquisite craftsmanship",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem",background:"#0B0B0B",color:"#F5F1E8"}})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.82rem",fontWeight:600,color:a.primaryText,display:"block",marginBottom:6},children:"Review Details"}),e.jsx("textarea",{required:!0,rows:4,value:w,onChange:d=>z(d.target.value),placeholder:"Write your review here...",style:{width:"100%",padding:"10px 14px",border:`1px solid ${a.border}`,borderRadius:4,outline:"none",fontSize:"0.88rem",fontFamily:"inherit",background:"#0B0B0B",color:"#F5F1E8"}})]}),e.jsx("button",{type:"submit",style:{width:"100%",padding:14,backgroundColor:a.gold,color:"#0B0B0B",border:"none",borderRadius:4,fontWeight:700,fontSize:"0.85rem",cursor:"pointer",letterSpacing:"0.08em",textTransform:"uppercase"},children:"Submit Verified Review"})]})]})})]})},Ct=n.div`
  position: relative;
  width: 100%;
`,kt=n.div`
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
`,Ni=n.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 600;
  color: ${a.primaryText};
  margin-bottom: 28px;
`,Bi=({items:r=[],currentProductId:g,category:i,content:m})=>{const[B,E]=c.useState([]),h=Ne.useRef(null);if(m&&(m.similarItemsEnabled===!1||m.showSimilarItems===!1))return null;const v=(m==null?void 0:m.similarItemsTitle)||"Similar Items";c.useEffect(()=>{let l=Array.isArray(r)?r.filter(w=>w&&w.id!==g):[];if(l.length>0){E(l);return}const k={limit:16,status:"ACTIVE"};i&&(k.jewelleryType=i),ee.getProducts(k).then(w=>{const T=(Array.isArray(w)?w:(w==null?void 0:w.products)||[]).filter(j=>j&&j.id!==g);E(T)}).catch(()=>{E(l)})},[r,g,i]);const y=B.filter(l=>l&&l.id!==g);if(y.length===0)return null;const x=l=>{if(h.current){const k=l==="left"?-340:340;h.current.scrollBy({left:k,behavior:"smooth"})}};return e.jsxs(Ti,{children:[e.jsx(Ni,{children:v}),e.jsxs(Ct,{children:[y.length>3&&e.jsx(Ee,{$direction:"left",onClick:()=>x("left"),children:e.jsx(ze,{size:22})}),e.jsx(kt,{ref:h,children:y.map((l,k)=>e.jsx(St,{product:l},l.id||`sim_${k}`))}),y.length>3&&e.jsx(Ee,{$direction:"right",onClick:()=>x("right"),children:e.jsx(Te,{size:22})})]})]})},$i=n.section`
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
`,Ri=({currentProductId:r,content:g})=>{const[i,m]=c.useState([]),B=Ne.useRef(null);if(g&&(g.recentlyViewedEnabled===!1||g.showRecentlyViewed===!1))return null;const E=(g==null?void 0:g.recentlyViewedTitle)||"Recently Viewed";c.useEffect(()=>{let x=[];try{const l=localStorage.getItem("app_recently_viewed");l&&(x=JSON.parse(l))}catch{}if(!Array.isArray(x)||x.length===0){m([]);return}ee.getProducts({status:"ACTIVE",limit:100}).then(l=>{const k=Array.isArray(l)?l:(l==null?void 0:l.products)||[],w=new Map;k.forEach(j=>{j.id&&w.set(String(j.id),j),j.slug&&w.set(String(j.slug).toLowerCase(),j)});const z=new Set;r&&z.add(String(r));const T=[];for(const j of x){if(!j)continue;const L=j.id?String(j.id):"",I=j.slug?String(j.slug).toLowerCase():"",D=L&&w.get(L)||I&&w.get(I);D&&(z.has(D.id)||(z.add(D.id),T.push(D)))}try{const j=x.filter(L=>{if(!L)return!1;const I=L.id?String(L.id):"",D=L.slug?String(L.slug).toLowerCase():"";return I&&w.has(I)||D&&w.has(D)});localStorage.setItem("app_recently_viewed",JSON.stringify(j))}catch{}m(T)}).catch(()=>{m([])})},[r]);const h=new Set,v=i.filter(x=>{if(!x||r&&x.id===r)return!1;const l=x.id?`id:${x.id}`:null,k=x.slug?`slug:${x.slug}`:null,w=(x.title||x.name||"").trim().toLowerCase(),z=w?`name:${w}`:null;return l&&h.has(l)||k&&h.has(k)||z&&h.has(z)?!1:(l&&h.add(l),k&&h.add(k),z&&h.add(z),!0)});if(v.length===0)return null;const y=x=>{if(B.current){const l=x==="left"?-340:340;B.current.scrollBy({left:l,behavior:"smooth"})}};return e.jsx(Je,{yOffset:35,children:e.jsxs($i,{children:[e.jsxs(Ii,{children:[e.jsx("h2",{children:E}),e.jsx("a",{href:"/rings",className:"see-all",children:"See All ›"})]}),e.jsxs(Ct,{children:[v.length>3&&e.jsx(Ee,{$direction:"left",onClick:()=>y("left"),children:e.jsx(ze,{size:22})}),e.jsx(kt,{ref:B,children:v.map((x,l)=>e.jsx(Je,{staggerIndex:l,yOffset:25,style:{flexShrink:0},children:e.jsx(St,{product:x})},x.id||`rec_${l}`))}),v.length>3&&e.jsx(Ee,{$direction:"right",onClick:()=>y("right"),children:e.jsx(Te,{size:22})})]})]})})},He=n.div`
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
`,Ve=n.div`
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
`,Fi=n.div`
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
`,bt=n.button`
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
`,_i=n.div`
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
`,Hi=n.div`
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
`,Vi=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  color: #A8A8A8;

  .stars {
    color: #C9A96E;
    letter-spacing: 2px;
  }
`,Ji=n.div`
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
`,gr=n.button`
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
`,ur=n.button`
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
`,yt=n.div`
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
`,wt=({src:r,alt:g,style:i,onLoad:m})=>{const[B,E]=c.useState(r);return c.useEffect(()=>{E(r)},[r]),e.jsx("img",{src:B||"/assets/gem_rings_cat.png",alt:g,style:i,onLoad:m,onError:()=>{B!=="/assets/gem_rings_cat.png"&&E("/assets/gem_rings_cat.png")}})},vt=[{id:"exp",title:"YOUR AETHELCARATS EXPERIENCE",content:"Every creation is handcrafted in our Surat atelier using certified conflict-free materials and 100% recycled precious metals. Includes complimentary sizing, insured shipping, and lifetime cleaning.",enabled:!0,defaultOpen:!0},{id:"specs",title:"PRODUCT & DIAMOND SPECIFICATIONS",content:"Hand-selected center stone with optical precision cut. Crafted in solid 14k/18k gold with stamped hallmark verification.",enabled:!0,defaultOpen:!1},{id:"craft",title:"CRAFTSMANSHIP & SUSTAINABILITY",content:"Our Surat workshop directly sources lab-grown and natural diamonds, eliminating traditional markups and maintaining ethical standards.",enabled:!0,defaultOpen:!1},{id:"shipping",title:"SHIPPING & DELIVERY",content:"Free insured worldwide shipping with signature confirmation. Standard production time is 7 to 12 business days.",enabled:!0,defaultOpen:!1}],jr=({saleEndsAt:r})=>{const[g,i]=c.useState(null);return c.useEffect(()=>{const m=()=>{const E=new Date(r).getTime(),h=new Date().getTime(),v=E-h;if(isNaN(E)||v<=0){i(null);return}const y=Math.floor(v/(1e3*60*60*24)),x=Math.floor(v%(1e3*60*60*24)/(1e3*60*60)),l=Math.floor(v%(1e3*60*60)/(1e3*60)),k=Math.floor(v%(1e3*60)/1e3);i({days:y,hours:x,mins:l,secs:k})};m();const B=setInterval(m,1e3);return()=>clearInterval(B)},[r]),g?e.jsxs(vr,{children:[e.jsx("div",{className:"timer-header",children:e.jsx("span",{children:"⏳ Limited Time Offer — Sale Ends In:"})}),e.jsxs("div",{className:"timer-units",children:[e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(g.days).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Days"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(g.hours).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Hours"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(g.mins).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Mins"})]}),e.jsxs("div",{className:"unit-card",children:[e.jsx("div",{className:"unit-num",children:String(g.secs).padStart(2,"0")}),e.jsx("div",{className:"unit-label",children:"Secs"})]})]})]}):null},Sr=(r,g)=>{const i=(r||"").trim();return i||(g||"").trim()||"AethelCarats Fine Jewellery Creation"},Nr=()=>{var ct,dt,pt;const{slug:r}=Gt(),g=Yt(),[i,m]=c.useState(null),[B,E]=c.useState([]),[h,v]=c.useState(0),[y,x]=c.useState(!1),[l,k]=c.useState(null),[w,z]=c.useState("loading"),T=c.useRef(null),j=c.useRef(null),L=c.useRef(null),[I,D]=c.useState("14K Yellow Gold"),[xe,d]=c.useState("14k"),[u,M]=c.useState("Select"),[$,te]=c.useState(!1),[Be,ie]=c.useState(!1),[Ke,Xe]=c.useState(!1),[be,Ze]=c.useState(""),[U,p]=c.useState(1),[S,W]=c.useState(!1),[G,re]=c.useState(!1),[$e,Qe]=c.useState("exp"),[Y,le]=c.useState({}),[oe,K]=c.useState({}),[ne,At]=c.useState(null),[ce,Et]=c.useState({show:!1,message:"",type:"success"}),[O,zt]=c.useState({enableConsultAtelierExpert:"true",consultTitle:"Consult an AethelCarats Atelier Expert",consultDescription:"Speak directly with our AethelCarats Fine Jewellery Atelier specialists regarding custom design, diamond selection, or sizing guidance.",consultPhone:"+91 79902 78892",consultPhoneLabel:"Call Atelier",consultEmail:"concierge@aethelcarats.com",consultEmailLabel:"Email Concierge",consultCloseLabel:"Close"}),{cartItems:ye,addToCart:et,updateQuantity:Tt}=qt(),{isInWishlist:Nt,toggleWishlist:Bt}=Kt(),{showToast:$t}=Xt(),ge=(t,o="success")=>{$t(t,o)};c.useEffect(()=>{const t=()=>{window.scrollY>550?W(!0):W(!1)};return window.addEventListener("scroll",t,{passive:!0}),()=>window.removeEventListener("scroll",t)},[]),c.useEffect(()=>{const t=o=>{L.current&&!L.current.contains(o.target)&&te(!1)};return document.addEventListener("mousedown",t),()=>document.removeEventListener("mousedown",t)},[]),c.useEffect(()=>{ee.getSiteSettings().then(t=>{t&&typeof t=="object"&&Object.keys(t).length>0&&zt(o=>({...o,...t}))}).catch(console.error),ee.getHolidayModeStatus().then(At).catch(console.error)},[]),c.useEffect(()=>{let t=!0;if(r){m(null),z("loading");const o=setTimeout(()=>{t&&(console.warn("Product request timed out after 10 seconds."),m(null),z("error"))},1e4);return ee.getProductBySlug(r).then(s=>{if(!t)return;clearTimeout(o);const b=(s==null?void 0:s.product)||(s!=null&&s.id?s:null);if(b&&b.id){m(b),E((s==null?void 0:s.relatedProducts)||[]),v(0),z("success");try{const C=localStorage.getItem("app_recently_viewed"),H=C?JSON.parse(C):[],J=(b.title||b.name||"").trim().toLowerCase(),Se=H.filter(F=>{if(!F||F.id&&b.id&&F.id===b.id||F.slug&&b.slug&&F.slug===b.slug)return!1;const N=(F.title||F.name||"").trim().toLowerCase();return!(J&&N&&J===N)}),A=[b,...Se].slice(0,10);localStorage.setItem("app_recently_viewed",JSON.stringify(A))}catch{}if(b.metal){const C=b.metal.includes("Silver")?"14K White Gold":b.metal;D(C),d(C.includes("18K")?"18k":"14k")}else if(b.metalsConfig){let C=b.metalsConfig;if(typeof C=="string")try{C=JSON.parse(C)}catch{}if(Array.isArray(C)&&C.length>0){const H=C[0],J=typeof H=="string"?H:H.label||H.name;J&&(D(J),d(String(J).includes("18K")?"18k":"14k"))}}ee.get(`/product-page-content/${b.id}`).then(C=>{t&&C.data&&C.data.content&&k(C.data.content)}).catch(console.error);let f=[];try{b.accordionsConfig&&(f=typeof b.accordionsConfig=="string"?JSON.parse(b.accordionsConfig):b.accordionsConfig)}catch{}(!f||f.length===0)&&(f=vt);const R=f.find(C=>C.enabled!==!1&&C.defaultOpen);R&&Qe(R.id||R.title)}else m(null),z("not_found")}).catch(s=>{var b;t&&(clearTimeout(o),console.error("Error fetching product by slug:",s),m(null),((b=s==null?void 0:s.response)==null?void 0:b.status)===404||(s==null?void 0:s.status)===404?z("not_found"):z("error"))}),()=>{t=!1,clearTimeout(o)}}else m(null),z("not_found")},[r]);const[we,tt]=c.useState(null),[it,rt]=c.useState(null);c.useEffect(()=>{var t;if(i){const o=i.reviewCount??(((t=i.reviews)==null?void 0:t.length)||0),s=i.avgRating??5;tt(o),rt(s);let b=!0;return ee.get(`/reviews?productId=${i.id}`).then(f=>{if(!b)return;const R=Array.isArray(f.data)?f.data:Array.isArray(f)?f:[];if(R.length>0){tt(R.length);const C=R.reduce((H,J)=>H+(Number(J.rating)||5),0);rt(Math.round(C/R.length*10)/10)}}).catch(console.error),()=>{b=!1}}},[i==null?void 0:i.id]),c.useLayoutEffect(()=>{i&&window.scrollTo(0,0)},[i==null?void 0:i.id]);const ue=c.useMemo(()=>!i||!ye?-1:ye.findIndex(t=>{var o;return(t.id===i.id||((o=t.product)==null?void 0:o.id)===i.id||t.productId===i.id)&&(!I||t.selectedMetal===I)}),[ye,i==null?void 0:i.id,I]),de=ue>=0?ye[ue]:null;c.useEffect(()=>{de&&de.quantity&&p(de.quantity)},[de==null?void 0:de.quantity,ue]);const ve=t=>{const o=Math.max(1,t),s=o-U;p(o),ue>=0&&s!==0&&Tt(ue,s)},It=t=>{Qe(o=>o===t?null:t)},Rt=()=>{if(!T.current)return;const t=T.current.scrollLeft,o=T.current.clientWidth;if(o>0){const s=Math.round(t/o);s!==h&&s>=0&&s<_.length&&v(s)}},Ie=t=>{if(v(t),T.current){const o=T.current.clientWidth;T.current.scrollTo({left:t*o,behavior:"smooth"})}};if(w==="loading")return e.jsx(ke,{style:{textAlign:"center",padding:80},children:e.jsx("div",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.6rem",color:"#c9a45c",letterSpacing:"0.08em"},children:"LOADING AETHELCARATS PRODUCT..."})});if(w==="not_found"||!i&&w!=="error")return e.jsx(He,{children:e.jsxs(ke,{style:{paddingBottom:60},children:[e.jsxs(Ve,{children:[e.jsx(X,{to:"/",children:"Home"})," / ",e.jsx(X,{to:"/collections",children:"Jewellery"})," / ",e.jsx("span",{className:"current",children:"Product Not Found"})]}),e.jsxs(yt,{children:[e.jsx("div",{className:"not-found-icon",children:e.jsx(We,{size:28})}),e.jsx("h1",{children:"PRODUCT NOT FOUND"}),e.jsx("p",{children:"We're sorry, but this product is no longer available."}),e.jsx("div",{className:"cta-group",children:e.jsx(X,{to:"/collections",className:"btn-primary",children:"VIEW ALL JEWELLERY"})})]})]})});if(w==="error"||!i)return e.jsx(He,{children:e.jsxs(ke,{style:{paddingBottom:60},children:[e.jsxs(Ve,{children:[e.jsx(X,{to:"/",children:"Home"})," / ",e.jsx(X,{to:"/collections",children:"Jewellery"})," / ",e.jsx("span",{className:"current",children:"Error Loading Product"})]}),e.jsxs(yt,{children:[e.jsx("div",{className:"not-found-icon",style:{color:"#c5221f",background:"#fdf2f2",borderColor:"#f8d7da"},children:e.jsx(gt,{size:28})}),e.jsx("h1",{children:"UNABLE TO LOAD PRODUCT"}),e.jsx("p",{children:"We encountered a temporary network or server error while loading this piece. Please try again."}),e.jsxs("div",{className:"cta-group",children:[e.jsx("button",{className:"btn-primary",onClick:()=>window.location.reload(),children:"RETRY"}),e.jsx(X,{to:"/collections",className:"btn-secondary",children:"VIEW ALL JEWELLERY"})]})]})]})});const ot=Nt(i.id),Ft=i.images&&Array.isArray(i.images)&&i.images.length>0?i.images.map(t=>typeof t=="string"?t:t==null?void 0:t.url):[i.primaryImage||i.mainImage,i.secondaryImage],_=Array.from(new Set(Ft.filter(Boolean))),Lt=_[h]||_[0]||"",me=!!(((i.jewelleryType||"").toLowerCase()==="rings"||(i.jewelleryType||"").toLowerCase()==="engagement rings"||(i.jewelleryType||"").toLowerCase()==="wedding bands"||(((ct=i.category)==null?void 0:ct.name)||"").toLowerCase().includes("ring")||(i.name||"").toLowerCase().includes("ring")||i.enableRingSize===!0)&&!(i.jewelleryType||"").toLowerCase().includes("earring")&&!(i.jewelleryType||"").toLowerCase().includes("necklace")&&!(i.jewelleryType||"").toLowerCase().includes("bracelet")&&!(i.jewelleryType||"").toLowerCase().includes("pendant")),Z=!!(i.onSale===!0&&(i.comparePrice&&Number(i.comparePrice)>Number(i.price)||i.salePrice&&Number(i.salePrice)>0)),Re=Z&&i.comparePrice&&Number(i.comparePrice)>Number(i.price)?Number(i.comparePrice):Z&&i.salePrice&&Number(i.price)>Number(i.salePrice)?Number(i.price):null;let se=i.metalsConfig;if(typeof se=="string")try{se=JSON.parse(se)}catch{se=[]}const Fe=!Array.isArray(se)||se.length===0?[{label:"14K Yellow Gold",code:"14k",priceAdjustment:0},{label:"14K White Gold",code:"14k",priceAdjustment:0},{label:"14K Rose Gold",code:"14k",priceAdjustment:0},{label:"18K Yellow Gold",code:"18k",priceAdjustment:250},{label:"18K White Gold",code:"18k",priceAdjustment:350},{label:"18K Rose Gold",code:"18k",priceAdjustment:350}]:se.map(t=>typeof t=="string"?{label:t,code:t.toLowerCase().includes("18k")?"18k":"14k",priceAdjustment:0}:{label:t.label||t.name||String(t),code:t.code||(String(t.label||"").toLowerCase().includes("18k")?"18k":"14k"),priceAdjustment:typeof t.priceAdjustment=="number"?t.priceAdjustment:0}),Le=(i.variations||[]).find(t=>{const o=t.metal?t.metal.toLowerCase()===I.toLowerCase():!0,s=me&&u!=="Select"&&t.ringSize?String(t.ringSize)===String(u):!0;return o&&s});let Pe=Le==null?void 0:Le.price;if(!Pe){const t=Fe.find(s=>s.label.toLowerCase()===I.toLowerCase());Pe=(Z&&i.salePrice&&Number(i.salePrice)>0?Number(i.salePrice):i.price||2500)+((t==null?void 0:t.priceAdjustment)||0)}const nt=Object.values(Y).reduce((t,o)=>t+(o.priceAdjustment||0),0),ae=Pe+nt;let je=null;if(Z&&Re&&Re>ae){const t=Fe.find(o=>o.label.toLowerCase()===I.toLowerCase());je=Re+((t==null?void 0:t.priceAdjustment)||0)+nt}const Pt=["Select","US 4","US 4.5","US 5","US 5.5","US 6","US 6.5","US 7","US 7.5","US 8","US 8.5","US 9","US 9.5","US 10","US 10.5","US 11","US 11.5","US 12"];let pe=[];try{i.customOptions?pe=typeof i.customOptions=="string"?JSON.parse(i.customOptions):i.customOptions:i.customOptionsJson&&(pe=typeof i.customOptionsJson=="string"?JSON.parse(i.customOptionsJson):i.customOptionsJson)}catch{}let q=[];try{i.detailSections&&Array.isArray(i.detailSections)&&i.detailSections.length>0?q=[...i.detailSections]:i.accordionsConfig&&(q=typeof i.accordionsConfig=="string"?JSON.parse(i.accordionsConfig):[...i.accordionsConfig])}catch{}(!q||q.length===0)&&(q=[...vt]);const Dt=i.fullDescription||i.description||i.shortDescription,he=Sr(Dt,i.title||i.name);if(he&&typeof he=="string"&&he.trim()!==""){const t=q.findIndex(o=>o.id==="overview"||(o.title||"").toUpperCase().includes("DESCRIPTION")||(o.title||"").toUpperCase().includes("OVERVIEW"));t!==-1?q[t]={...q[t],title:"PRODUCT OVERVIEW & DESCRIPTION",content:he.trim(),enabled:!0}:q.unshift({id:"overview",title:"PRODUCT OVERVIEW & DESCRIPTION",content:he.trim(),enabled:!0,defaultOpen:!0})}const st=new Set,Ot=q.filter(t=>t.isActive!==!1&&t.enabled!==!1).filter(t=>{const o=(t.type||t.title||t.id||"").trim().toUpperCase();return o?st.has(o)?!1:(st.add(o),!0):!0}),De=me&&i.isRingSizeRequired!==!1,at=()=>{if(De&&(u==="Select"||!u)){ie(!0),ge("Please select a US Ring Size before adding to your bag.","warning");return}ie(!1);const t={};if(i.enableCustomOptions){for(const o of pe)if(o.required){const s=Y[o.title||o.name||o.label];(!s||!s.value||!s.value.trim())&&(t[o.title||o.name||o.label]=`Please complete required option: ${o.title||o.name||o.label}`)}}if(Object.keys(t).length>0){K(t),ge(Object.values(t)[0],"warning");return}K({}),et(i,U,I,me?u==="Select"?"US 7":u:void 0,be,Y,ae),ge("Product successfully added to your shopping bag!","success")},lt=()=>{if(De&&(u==="Select"||!u)){ie(!0),ge("Please select a US Ring Size before proceeding to checkout.","warning");return}ie(!1);const t={};if(i.enableCustomOptions){for(const o of pe)if(o.required){const s=Y[o.title||o.name||o.label];(!s||!s.value||!s.value.trim())&&(t[o.title||o.name||o.label]=`Please complete required option: ${o.title||o.name||o.label}`)}}if(Object.keys(t).length>0){K(t),ge(Object.values(t)[0],"warning");return}K({}),et(i,U,I,me?u==="Select"?"US 7":u:void 0,be,Y,ae),g("/checkout")};return e.jsxs(He,{children:[e.jsxs(ke,{children:[e.jsxs(Ve,{children:[e.jsx(X,{to:"/",children:"Home"})," / ",e.jsx(X,{to:"/collections",children:((dt=i.category)==null?void 0:dt.name)||i.jewelleryType||"Jewellery"})," / ",e.jsx("span",{className:"current",children:i.title||i.name})]}),e.jsxs(Fi,{children:[e.jsx(Li,{children:e.jsx(Pi,{ref:j,children:e.jsx(Di,{className:"desktop-image-grid",children:_.map((t,o)=>e.jsxs(Oi,{onClick:()=>{v(o),x(!0)},children:[e.jsx(wt,{src:t,alt:`${i.title||i.name} view ${o+1}`}),e.jsxs("div",{className:"zoom-hint",children:[e.jsx(jt,{size:12}),"Click to expand"]})]},`gallery_${t}_${o}`))})})}),e.jsxs(Mi,{children:[_.length>0&&e.jsxs(Gi,{children:[h+1," / ",_.length]}),_.length>1&&h>0&&e.jsx(bt,{$dir:"left",onClick:()=>Ie(h-1),"aria-label":"Previous Image",children:e.jsx(ze,{size:20})}),_.length>1&&h<_.length-1&&e.jsx(bt,{$dir:"right",onClick:()=>Ie(h+1),"aria-label":"Next Image",children:e.jsx(Te,{size:20})}),e.jsx(Wi,{ref:T,onScroll:Rt,children:_.map((t,o)=>e.jsx(Ui,{onClick:()=>{v(o),x(!0)},children:e.jsx(wt,{src:t,alt:`${i.title||i.name} view ${o+1}`})},`mob_${o}`))}),e.jsx(Yi,{children:_.map((t,o)=>e.jsx("span",{className:h===o?"active":"",onClick:()=>Ie(o)},o))})]}),e.jsx(li,{images:_,activeIndex:h,productName:i.title||i.name,isOpen:y,onClose:()=>x(!1),onSelectIndex:t=>v(t)}),e.jsxs(_i,{children:[e.jsxs(Hi,{children:[e.jsxs("div",{children:[e.jsx("h1",{children:i.title||i.name}),e.jsxs(Vi,{children:[e.jsxs("span",{className:"stars",children:["★".repeat(Math.round(it??i.avgRating??5)),"☆".repeat(5-Math.round(it??i.avgRating??5))]}),e.jsx("span",{children:we!==null&&we>0?`(${we} ${we===1?"review":"reviews"})`:i.reviewCount!==void 0&&i.reviewCount>0?`(${i.reviewCount} ${i.reviewCount===1?"review":"reviews"})`:"(No reviews yet)"})]})]}),e.jsx("button",{className:`wishlist-btn ${ot?"active":""}`,onClick:()=>Bt(i),title:"Save to Wishlist",children:e.jsx(_t,{size:20,fill:ot?"#c00":"none"})})]}),e.jsxs(Ae,{children:[e.jsxs(Ji,{style:{marginTop:0,display:"flex",alignItems:"center",gap:14,flexWrap:"wrap"},children:[e.jsxs("span",{className:"current-price",style:{color:Z?"#E53E3E":"#C9A96E"},children:["$",ae.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})]}),Z&&je!==null&&je>ae&&e.jsxs("span",{className:"compare-price",children:["$",je.toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})]}),Z&&e.jsx("span",{style:{background:"#d93838",color:"#fff",fontSize:"0.75rem",fontWeight:700,padding:"4px 10px",borderRadius:4,letterSpacing:"0.04em"},children:"🏷️ ON SALE"})]}),!!(Z&&i.saleEndsAt)&&e.jsx(jr,{saleEndsAt:i.saleEndsAt})]}),i.enableMetalSelection!==!1&&e.jsxs(Ae,{children:[e.jsxs(qi,{children:[e.jsx("span",{className:"label",children:"Metal Type:"}),e.jsx("span",{className:"value",children:I})]}),e.jsx(Ki,{children:Fe.map((t,o)=>e.jsx(Xi,{type:"button",$isSelected:I.toLowerCase()===t.label.toLowerCase(),onClick:()=>{D(t.label),d(t.code)},title:t.label,children:t.label},o))})]}),me&&e.jsxs(Ae,{children:[e.jsxs(Zi,{children:[e.jsxs("span",{className:"label-title",children:["Ring Size ",De?e.jsx("span",{style:{color:"#d9534f"},children:"*"}):e.jsx("span",{style:{color:"#888",fontWeight:400,fontSize:"0.75rem"},children:"(Optional)"}),":"]}),e.jsxs(Qi,{ref:L,children:[e.jsxs(er,{onClick:()=>te(!$),children:[e.jsx("span",{className:u!=="Select"?"selected-val":"placeholder-val",children:u}),e.jsx("span",{className:"arrow-icon",children:e.jsx("svg",{width:"9",height:"6",viewBox:"0 0 9 6",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M4.5 6L0 0H9L4.5 6Z",fill:"#0c1938"})})})]}),$&&e.jsx(tr,{children:(i.availableRingSizes||Pt).map(t=>e.jsx("div",{className:`option-item ${u===t?"selected":""}`,onClick:()=>{M(t),te(!1),ie(!1)},children:t},t))})]}),e.jsx(X,{to:"/education/rings/find-your-ring-size",className:"guide-link",children:"Ring Size Guide"})]}),Be&&e.jsxs("div",{style:{color:"#d9534f",fontSize:"0.8rem",fontWeight:600,marginTop:8,display:"flex",alignItems:"center",gap:6},children:[e.jsx("span",{children:"⚠️"})," Please select a US Ring Size before adding this ring to your shopping bag."]})]}),!!i.enableCustomOptions&&pe.length>0&&e.jsx(Ae,{children:e.jsx(ir,{children:pe.map((t,o)=>{var C,H,J,Se;const s=t.title||t.name||t.label;if(!s)return null;const b=t.inputType||t.fieldType||"Text",f=!!oe[s],R=Number(t.priceAdjustment)||0;return e.jsxs("div",{children:[e.jsxs(rr,{children:[s,(C=Y[s])!=null&&C.value?`: ${Y[s].value}`:"",t.required&&e.jsx("span",{style:{color:"#c5221f"},children:"*"}),b!=="Checkbox"&&R>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600,marginLeft:6},children:["(+$",R,")"]})]}),b==="Text"&&e.jsx(or,{type:"text",$hasError:f,maxLength:t.maxCharacterLength||t.maxLength||25,placeholder:t.placeholder||`Enter ${s}...`,value:((H=Y[s])==null?void 0:H.value)||"",onChange:A=>{const F=A.target.value;le(N=>({...N,[s]:{title:s,value:F,priceAdjustment:F.trim()?R:0}})),oe[s]&&K(N=>({...N,[s]:""}))}}),b==="Textarea"&&e.jsx(nr,{rows:2,$hasError:f,maxLength:t.maxCharacterLength||t.maxLength||100,placeholder:t.placeholder||`Enter ${s}...`,value:((J=Y[s])==null?void 0:J.value)||"",onChange:A=>{const F=A.target.value;le(N=>({...N,[s]:{title:s,value:F,priceAdjustment:F.trim()?R:0}})),oe[s]&&K(N=>({...N,[s]:""}))}}),b==="Dropdown"&&e.jsxs(sr,{$hasError:f,value:((Se=Y[s])==null?void 0:Se.value)||"",onChange:A=>{const N=(t.choices||t.values||[]).find(V=>(V.label||V.value||V)===A.target.value),P=typeof N=="object"?Number(N.priceAdjustment)||0:R;le(V=>({...V,[s]:{title:s,value:A.target.value,priceAdjustment:A.target.value?P:0}})),oe[s]&&K(V=>({...V,[s]:""}))},children:[e.jsxs("option",{value:"",children:["-- Select ",s," --"]}),(t.choices||t.values||[]).map((A,F)=>{const N=typeof A=="string"?A:A.label||A.value,P=typeof A=="object"&&Number(A.priceAdjustment)||0;return e.jsxs("option",{value:N,children:[N," ",P>0?`(+$${P})`:""]},F)})]}),b==="Radio"&&e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8},children:(t.choices||t.values||[]).map((A,F)=>{var V;const N=typeof A=="string"?A:A.label||A.value,P=typeof A=="object"?Number(A.priceAdjustment)||0:R;return e.jsxs("label",{style:{display:"flex",alignItems:"center",gap:8,fontSize:"0.88rem",cursor:"pointer",color:"#0c1938"},children:[e.jsx("input",{type:"radio",name:`opt_${s}`,checked:((V=Y[s])==null?void 0:V.value)===N,onChange:()=>{le(Q=>({...Q,[s]:{title:s,value:N,priceAdjustment:P}})),oe[s]&&K(Q=>({...Q,[s]:""}))},style:{accentColor:"#0c1938",cursor:"pointer"}}),N," ",P>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600},children:["(+$",P,")"]})]},F)})}),b==="Checkbox"&&(()=>{var N;const A=t.checkboxOptions&&Array.isArray(t.checkboxOptions)&&t.checkboxOptions.length>0?t.checkboxOptions:t.choices&&Array.isArray(t.choices)&&t.choices.length>0?t.choices:[{id:"cb_default",label:t.checkboxLabel!==void 0&&t.checkboxLabel!==""?t.checkboxLabel:s,priceAdjustment:R}],F=((N=Y[s])==null?void 0:N.value)||"";return e.jsx("div",{children:e.jsx(ar,{children:A.map((P,V)=>{const Q=typeof P=="string"?P:P.label||P.value;if(!Q)return null;const Oe=typeof P=="object"&&Number(P.priceAdjustment)||0,xt=F===Q;return e.jsxs(lr,{type:"button",$isSelected:xt,onClick:()=>{le(xt?fe=>({...fe,[s]:{title:s,value:"",priceAdjustment:0}}):fe=>({...fe,[s]:{title:s,value:Q,priceAdjustment:Oe}})),oe[s]&&K(fe=>({...fe,[s]:""}))},children:[e.jsx("span",{children:Q}),Oe>0&&e.jsxs("span",{style:{color:"#137333",fontWeight:600,marginLeft:6},children:["(+$$",Oe,")"]})]},P.id||V)})})})})(),f&&e.jsx("div",{style:{fontSize:"0.78rem",color:"#c5221f",marginTop:4},children:oe[s]})]},t.id||o)})})}),e.jsxs(cr,{style:{marginTop:4},children:[ne!=null&&ne.active?e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10,width:"100%"},children:[e.jsx("button",{disabled:!0,style:{width:"100%",padding:"16px 24px",background:"#e2e8f0",color:"#64748b",border:"1px solid #cbd5e1",borderRadius:4,fontWeight:700,fontSize:"0.85rem",letterSpacing:"0.08em",textTransform:"uppercase",cursor:"not-allowed"},children:"ORDERS TEMPORARILY UNAVAILABLE"}),e.jsx("div",{style:{fontSize:"0.82rem",color:"#c53030",background:"#fff5f5",border:"1px solid #feb2b2",padding:"10px 14px",borderRadius:4,textAlign:"center",lineHeight:1.5},children:ne.message||"Orders are temporarily unavailable while Holiday Mode is active. Please check back soon."})]}):e.jsxs(dr,{children:[(l==null?void 0:l.showQuantitySelector)!==!1&&e.jsx("div",{className:"qty-selector-col",children:e.jsxs(pr,{children:[e.jsx("button",{type:"button",onClick:()=>ve(U-1),"aria-label":"Decrease quantity",children:e.jsx(ut,{size:14})}),e.jsx("span",{children:U}),e.jsx("button",{type:"button",onClick:()=>ve(U+1),"aria-label":"Increase quantity",children:e.jsx(mt,{size:14})})]})}),e.jsx("div",{className:"add-bag-col",children:e.jsxs(xr,{onClick:at,children:["ADD TO BAG • $",(ae*U).toLocaleString()]})}),(l==null?void 0:l.showBuyNowButton)!==!1&&e.jsx("div",{className:"buy-now-col",children:e.jsxs(gr,{onClick:lt,children:[e.jsx(Ht,{size:16})," BUY IT NOW"]})})]}),O.enableConsultAtelierExpert!=="false"&&e.jsx(ur,{onClick:()=>re(!0),children:"CONSULT AN ATELIER EXPERT"})]}),(l==null?void 0:l.showBenefits)!==!1&&e.jsx(mr,{children:l!=null&&l.benefitsJson?(()=>{try{return(typeof l.benefitsJson=="string"?JSON.parse(l.benefitsJson):l.benefitsJson).filter(o=>o.isActive!==!1).map((o,s)=>e.jsxs("div",{className:"benefit-item",children:[o.icon==="Truck"&&e.jsx(Ue,{size:16}),o.icon==="ShieldCheck"&&e.jsx(Ge,{size:16}),o.icon==="Award"&&e.jsx(Ye,{size:16}),o.icon==="Sparkles"&&e.jsx(We,{size:16}),(!o.icon||!["Truck","ShieldCheck","Award","Sparkles"].includes(o.icon))&&e.jsx(Vt,{size:16}),o.title]},o.id||s))}catch{return null}})():e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"benefit-item",children:[e.jsx(Ue,{size:16})," Free Insured Delivery"]}),e.jsxs("div",{className:"benefit-item",children:[e.jsx(Ge,{size:16})," Lifetime Service Warranty"]}),e.jsxs("div",{className:"benefit-item",children:[e.jsx(Ye,{size:16})," GIA / IGI Certification"]})]})}),e.jsx(hr,{style:{marginTop:24},children:Ot.map((t,o)=>{const s=t.id||t.title||`acc_${o}`,b=$e===s;return e.jsxs(Ne.Fragment,{children:[e.jsxs(fr,{onClick:()=>It(s),children:[e.jsx("span",{children:t.title}),e.jsx("span",{children:b?"−":"+"})]}),e.jsxs(br,{$open:b,children:[t.description&&e.jsx("div",{style:{fontSize:"0.88rem",color:"#D8D2C5",marginBottom:t.items&&t.items.length>0?14:0,lineHeight:1.7},children:t.description}),t.items&&Array.isArray(t.items)&&t.items.length>0?e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:14},children:t.type==="SPECIFICATIONS"||(t.title||"").toUpperCase().includes("SPECIFICATION")?e.jsxs("div",{style:{background:"#151515",border:"1px solid rgba(140, 116, 75, 0.25)",padding:18,borderRadius:6,boxShadow:"0 4px 16px rgba(0, 0, 0, 0.4)"},children:[e.jsx("div",{style:{fontSize:"0.78rem",fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#C9A96E",marginBottom:12},children:"SPECIFICATION DETAILS"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"12px 18px",fontSize:"0.85rem"},children:t.items.map((f,R)=>e.jsxs("div",{children:[f.title&&e.jsxs("strong",{style:{color:"#F5F1E8",fontWeight:600},children:[f.title,": "]}),e.jsx("span",{style:{color:"#D8D2C5"},children:f.value||f.description||"-"})]},f.id||R))})]}):t.items.map((f,R)=>e.jsxs("div",{style:{background:"#151515",border:"1px solid rgba(140, 116, 75, 0.25)",padding:16,borderRadius:6,display:"flex",flexDirection:"column",gap:6,boxShadow:"0 4px 16px rgba(0, 0, 0, 0.35)"},children:[f.imageUrl&&e.jsx("img",{src:f.imageUrl,alt:f.title||"Atelier Media",style:{width:"100%",maxHeight:220,objectFit:"cover",borderRadius:4,marginBottom:6}}),(f.title||f.icon)&&e.jsxs("div",{style:{fontSize:"0.92rem",fontWeight:700,color:"#F5F1E8",display:"flex",alignItems:"center",gap:8},children:[f.icon==="Truck"&&e.jsx(Ue,{size:16,color:"#C9A96E"}),f.icon==="ShieldCheck"&&e.jsx(Ge,{size:16,color:"#C9A96E"}),f.icon==="Award"&&e.jsx(Ye,{size:16,color:"#C9A96E"}),f.icon==="Sparkles"&&e.jsx(We,{size:16,color:"#C9A96E"}),f.title]}),f.value&&e.jsx("div",{style:{fontSize:"0.88rem",fontWeight:600,color:"#C9A96E"},children:f.value}),f.description&&e.jsx("div",{style:{fontSize:"0.85rem",color:"#D8D2C5",lineHeight:1.6},children:f.description})]},f.id||R))}):!t.description&&e.jsx("div",{style:{whiteSpace:"pre-line",fontSize:"0.88rem",color:"#D8D2C5",lineHeight:1.7},children:t.content||"Information for this section."})]})]},s)})})]})]})]}),e.jsx(Bi,{items:B,currentProductId:i.id,category:i.jewelleryType||((pt=i.category)==null?void 0:pt.name)||(typeof i.category=="string"?i.category:""),content:l}),e.jsx(hi,{content:l}),e.jsx(zi,{productName:i.name||i.title,content:l,productId:i.id,reviews:i.reviews}),e.jsx(Ri,{currentProductId:i.id,content:l}),G&&O.enableConsultAtelierExpert!=="false"&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:9999,display:"flex",justifyContent:"center",alignItems:"center"},children:e.jsxs("div",{style:{background:"#151515",border:"1px solid rgba(140, 116, 75, 0.3)",padding:32,borderRadius:8,maxWidth:500,width:"90%",textAlign:"center",color:"#F5F1E8"},children:[e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",color:"#F5F1E8",marginBottom:12},children:O.consultTitle||"Consult an Atelier Expert"}),e.jsx("p",{style:{fontSize:"0.9rem",color:"#A8A8A8",marginBottom:20,whiteSpace:"pre-line"},children:O.consultDescription||"Speak directly with our AethelCarats specialists regarding custom design, diamond selection, or sizing guidance."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12,marginBottom:20},children:[O.consultPhone&&O.consultPhone.trim()!==""&&e.jsxs("a",{href:`tel:${O.consultPhone.replace(/[^\d+]/g,"")}`,style:{padding:"12px",background:"#111111",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,textDecoration:"none",color:"#F5F1E8",fontWeight:600},children:["☎ ",O.consultPhoneLabel||"Call Atelier",": ",O.consultPhone]}),O.consultEmail&&O.consultEmail.trim()!==""&&e.jsxs("a",{href:`mailto:${O.consultEmail.trim()}`,style:{padding:"12px",background:"#111111",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,textDecoration:"none",color:"#F5F1E8",fontWeight:600},children:["✉ ",O.consultEmailLabel||"Email Concierge",": ",O.consultEmail]})]}),e.jsx("button",{onClick:()=>re(!1),style:{padding:"10px 24px",background:"#C9A96E",color:"#0B0B0B",border:"none",borderRadius:4,cursor:"pointer",fontWeight:700},children:O.consultCloseLabel||"Close"})]})}),e.jsxs(wr,{$show:ce.show,$type:ce.type,children:[e.jsx("div",{className:"toast-icon",children:ce.type==="success"?e.jsx(Jt,{size:22}):e.jsx(gt,{size:22})}),e.jsx("div",{className:"toast-content",children:ce.message}),e.jsx("button",{className:"toast-close",onClick:()=>Et(t=>({...t,show:!1})),children:e.jsx(qe,{size:16})}),ce.show&&e.jsx("div",{className:"progress-bar"},ce.message)]}),e.jsx(yr,{$show:S&&!(ne!=null&&ne.active)&&(l==null?void 0:l.showStickyBar)!==!1,children:e.jsxs("div",{className:"sticky-inner",children:[e.jsxs("div",{className:"product-info",children:[e.jsx("img",{src:Lt,alt:(i==null?void 0:i.title)||(i==null?void 0:i.name)||"Jewellery"}),e.jsxs("div",{className:"title-price",children:[e.jsx("div",{className:"title",children:(i==null?void 0:i.title)||(i==null?void 0:i.name)}),e.jsxs("div",{className:"meta-price",children:["$",(ae*U).toLocaleString()]})]})]}),e.jsxs("div",{className:"sticky-actions",children:[e.jsxs("div",{className:"sticky-qty",children:[e.jsx("button",{type:"button",onClick:()=>ve(U-1),children:e.jsx(ut,{size:12})}),e.jsx("span",{children:U}),e.jsx("button",{type:"button",onClick:()=>ve(U+1),children:e.jsx(mt,{size:12})})]}),e.jsx("button",{className:"sticky-btn add-bag",onClick:at,children:"ADD TO BAG"}),e.jsx("button",{className:"sticky-btn buy-now",onClick:lt,children:"BUY IT NOW"})]})]})})]})};export{Nr as ProductDetailPage};
