import{e as v,r as m,j as o,f as g,m as y}from"./react-vendor-I9PV_paW.js";import{g as s}from"./ui-vendor-D75S3wy_.js";import{a as j,R as b}from"./admin-pages-DeXXMrNX.js";import{W as f}from"./WhyAuraDiamondNav-BcXcmcNP.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const u=s.div`
  background-color: #0B0B0B;
  color: #F5F1E8;
  min-height: 100vh;
  padding-bottom: 80px;
`,T=s.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 24px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #A8A8A8;

  a {
    color: #A8A8A8;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #C9A96E;
    }
  }

  span.current {
    color: #F5F1E8;
    font-weight: 500;
  }
`,C=s.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 48px 24px 64px;
`,S=s.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  text-align: center;
  color: #F5F1E8;
  margin-bottom: 12px;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`,k=s.p`
  font-size: 1.1rem;
  color: #D8D2C5;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 36px;
  line-height: 1.6;
`,F=s.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  padding: 40px;
  border-radius: 6px;
  font-size: 0.95rem;
  color: #D8D2C5;
  line-height: 1.8;
  margin-bottom: 32px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  h2, h3 {
    font-family: 'Cormorant Garamond', serif;
    color: #F5F1E8;
    margin: 32px 0 16px;
  }

  p {
    margin-bottom: 20px;
  }

  ul {
    margin: 12px 0 20px 20px;
    li {
      margin-bottom: 8px;
    }
  }

  @media (max-width: 576px) {
    padding: 24px;
  }
`,R=()=>{var a,p,x;const d=(v().pathname.replace("/pages/","").replace("/policies/","").replace("/","")||"about-us").trim(),[l,c]=m.useState(null);if(m.useEffect(()=>{const i=d.split("-").map(t=>t.charAt(0).toUpperCase()+t.slice(1)).join(" ");document.title=`${i} | AethelCarats`,j.getPageBySlug(d).then(t=>{var h;let r={};const n=t.draftContent||t.content;if(n)try{r=typeof n=="string"?JSON.parse(n):n}catch{r={content:n}}c({...t,parsedContent:r}),(h=t.seoMetadata)!=null&&h.seoTitle&&(document.title=t.seoMetadata.seoTitle)}).catch(()=>{c({title:i,parsedContent:{}})})},[d]),!l)return o.jsx(u,{children:o.jsx(C,{children:"Loading..."})});const e=l.parsedContent||{};return o.jsxs(u,{children:[o.jsxs(T,{children:[o.jsx(g,{to:"/",children:"Home"}),o.jsx(y,{size:12}),o.jsx("span",{children:"Policies"}),o.jsx(y,{size:12}),o.jsx("span",{className:"current",children:l.title})]}),o.jsx(b,{yOffset:35,children:o.jsxs(C,{children:[o.jsx(S,{style:{color:e.headingColor||void 0},children:e.heading||l.title}),e.subheading&&o.jsx(k,{style:{color:e.subheadingColor||void 0},children:e.subheading}),(e.desktopImage||((a=e.pageImages)==null?void 0:a.desktopImage))&&o.jsx("div",{style:{marginBottom:32,borderRadius:6,overflow:"hidden",border:"1px solid rgba(140, 116, 75, 0.25)",maxHeight:440},children:o.jsx("img",{src:e.desktopImage||((p=e.pageImages)==null?void 0:p.desktopImage),alt:e.altText||((x=e.pageImages)==null?void 0:x.altText)||l.title,style:{width:"100%",height:"100%",maxHeight:440,objectFit:"cover",display:"block"}})}),o.jsxs(F,{style:{color:e.bodyTextColor||void 0},children:[e.introduction&&o.jsx("p",{style:{fontSize:"1.05rem",fontWeight:500,color:e.introColor||"#F5F1E8"},children:e.introduction}),e.brandStory&&o.jsxs("div",{children:[o.jsx("h2",{style:{color:e.brandStoryColor||void 0},children:"Brand Story & Heritage"}),o.jsx("p",{style:{color:e.brandStoryColor||void 0},children:e.brandStory})]}),e.ourValues&&o.jsxs("div",{children:[o.jsx("h2",{style:{color:e.valuesColor||void 0},children:"Our Values"}),o.jsx("p",{style:{color:e.valuesColor||void 0},children:e.ourValues})]}),e.craftsmanship&&o.jsxs("div",{children:[o.jsx("h2",{style:{color:e.craftsmanshipColor||void 0},children:"Master Craftsmanship"}),o.jsx("p",{style:{color:e.craftsmanshipColor||void 0},children:e.craftsmanship})]}),e.conflictFreePolicy&&o.jsxs("div",{children:[o.jsx("h2",{style:{color:e.kimberleyColor||void 0},children:"Kimberley Process & Conflict-Free Guarantee"}),o.jsx("p",{style:{color:e.kimberleyColor||void 0},children:e.conflictFreePolicy})]}),e.returnEligibility&&o.jsxs("div",{children:[o.jsx("h2",{style:{color:e.eligibilityColor||void 0},children:"Return Eligibility & Terms"}),o.jsx("p",{style:{color:e.eligibilityColor||void 0},children:e.returnEligibility})]}),e.returnProcess&&o.jsxs("div",{children:[o.jsx("h2",{style:{color:e.inspectionColor||void 0},children:"Step-by-Step Return Process"}),o.jsx("p",{style:{color:e.inspectionColor||void 0},children:e.returnProcess})]}),e.coverage&&o.jsxs("div",{children:[o.jsx("h2",{style:{color:e.coverageColor||void 0},children:"Coverage Overview"}),o.jsx("p",{style:{color:e.coverageColor||void 0},children:e.coverage})]}),e.shippingProcessing&&o.jsxs("div",{children:[o.jsx("h2",{style:{color:e.processingColor||void 0},children:"Order Processing"}),o.jsx("p",{style:{color:e.processingColor||void 0},children:e.shippingProcessing})]}),e.shippingDelivery&&o.jsxs("div",{children:[o.jsx("h2",{style:{color:e.deliveryColor||void 0},children:"Delivery Timelines"}),o.jsx("p",{style:{color:e.deliveryColor||void 0},children:e.shippingDelivery})]}),e.warrantyIncluded&&o.jsxs("div",{children:[o.jsx("h2",{style:{color:e.includedColor||void 0},children:"What Is Included"}),o.jsx("p",{style:{color:e.includedColor||void 0},children:e.warrantyIncluded})]}),e.warrantyExcluded&&o.jsxs("div",{children:[o.jsx("h2",{style:{color:e.excludedColor||void 0},children:"What Is Excluded"}),o.jsx("p",{style:{color:e.excludedColor||void 0},children:e.warrantyExcluded})]}),e.priceMatchRequirements&&o.jsxs("div",{children:[o.jsx("h2",{style:{color:e.requirementsColor||void 0},children:"Price Match Requirements"}),o.jsx("p",{style:{color:e.requirementsColor||void 0},children:e.priceMatchRequirements})]}),e.seoCopy&&o.jsx("div",{children:o.jsx("p",{style:{color:e.seoCopyColor||void 0},children:e.seoCopy})}),e.content&&o.jsx("div",{style:{color:e.bodyTextColor||void 0},dangerouslySetInnerHTML:{__html:e.content}}),l.sections&&l.sections.map((i,t)=>{if(i.isVisible===!1)return null;let r={};try{r=typeof i.content=="string"?JSON.parse(i.content):i.content||{}}catch{r={text:i.content}}return o.jsxs("div",{style:{marginTop:32,padding:r.backgroundColor?"28px 24px":"0",backgroundColor:r.backgroundColor||"transparent",borderRadius:r.backgroundColor?6:0,borderTop:r.backgroundColor?"none":"1px solid rgba(140, 116, 75, 0.25)",paddingTop:(r.backgroundColor,"28px")},children:[r.eyebrow&&o.jsx("span",{style:{display:"block",fontSize:"0.72rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:r.eyebrowColor||"#C9A45C",marginBottom:8},children:r.eyebrow}),r.title&&o.jsx("h2",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",fontWeight:500,color:r.titleColor||"#F5F1E8",margin:"0 0 10px 0"},children:r.title}),r.subtitle&&o.jsx("h4",{style:{fontSize:"0.95rem",fontWeight:600,color:r.subtitleColor||"#C5BEAF",margin:"0 0 12px 0"},children:r.subtitle}),r.description&&o.jsx("p",{style:{fontSize:"0.95rem",lineHeight:1.7,color:r.descriptionColor||"#D8D2C5",marginBottom:16},children:r.description}),r.bodyHtml&&o.jsx("div",{style:{color:r.textColor||r.bodyTextColor||"#D8D2C5",lineHeight:1.7,marginBottom:16},dangerouslySetInnerHTML:{__html:r.bodyHtml}}),r.text&&!r.bodyHtml&&o.jsx("div",{style:{color:r.textColor||r.bodyTextColor||"#D8D2C5",lineHeight:1.7,marginBottom:16},dangerouslySetInnerHTML:{__html:r.text}}),(r.primaryBtnText||r.buttonText)&&o.jsx("div",{style:{marginTop:16},children:o.jsx(g,{to:r.primaryBtnLink||r.buttonLink||"/collections",style:{display:"inline-flex",alignItems:"center",padding:"10px 22px",background:"#151515",border:"1px solid #C9A45C",borderRadius:3,color:r.primaryBtnTextColor||r.buttonTextColor||"#F5F1E8",textDecoration:"none",fontSize:"0.78rem",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase"},children:r.primaryBtnText||r.buttonText})})]},i.id||t)})]})]})}),o.jsx(f,{})]})};export{R as CMSPage};
