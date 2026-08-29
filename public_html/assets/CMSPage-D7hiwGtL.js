import{e as g,r as p,j as e,f as u,m as x}from"./react-vendor-BXyx942q.js";import{g as a}from"./ui-vendor-VHkRGmvp.js";import{a as f,R as j}from"./admin-pages-Bh8Atj7w.js";import{W as y}from"./WhyFloksyJewelNav-Cvx06bJT.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const h=a.div`
  background-color: #f7f6f2;
  color: #1a1918;
  min-height: 100vh;
  padding-bottom: 80px;
`,v=a.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 24px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #77736c;

  a {
    color: #77736c;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #c9a45c;
    }
  }

  span.current {
    color: #1a1918;
    font-weight: 500;
  }
`,m=a.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 48px 24px 64px;
`,b=a.h1`
  font-family: 'Cormorant Garamond', serif;
  font-size: 3rem;
  text-align: center;
  color: #1a1918;
  margin-bottom: 12px;
  letter-spacing: -0.01em;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`,S=a.p`
  font-size: 1.1rem;
  color: #55524d;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 36px;
  line-height: 1.6;
`,C=a.div`
  background: #fffdf9;
  border: 1px solid #e8e3d9;
  padding: 40px;
  border-radius: 4px;
  font-size: 0.95rem;
  color: #55524d;
  line-height: 1.8;
  margin-bottom: 32px;

  h2, h3 {
    font-family: 'Cormorant Garamond', serif;
    color: #1a1918;
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
`,L=()=>{const c=(g().pathname.replace("/pages/","").replace("/policies/","").replace("/","")||"about-us").trim(),[o,l]=p.useState(null);if(p.useEffect(()=>{const n=c.split("-").map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join(" ");document.title=`${n} | Floksy Jewel`,f.getPageBySlug(c).then(r=>{var d;let i={};const s=r.draftContent||r.content;if(s)try{i=typeof s=="string"?JSON.parse(s):s}catch{i={content:s}}l({...r,parsedContent:i}),(d=r.seoMetadata)!=null&&d.seoTitle&&(document.title=r.seoMetadata.seoTitle)}).catch(()=>{l({title:n,parsedContent:{}})})},[c]),!o)return e.jsx(h,{children:e.jsx(m,{children:"Loading..."})});const t=o.parsedContent||{};return e.jsxs(h,{children:[e.jsxs(v,{children:[e.jsx(u,{to:"/",children:"Home"}),e.jsx(x,{size:12}),e.jsx("span",{children:"Policies"}),e.jsx(x,{size:12}),e.jsx("span",{className:"current",children:o.title})]}),e.jsx(j,{yOffset:35,children:e.jsxs(m,{children:[e.jsx(b,{children:t.heading||o.title}),t.subheading&&e.jsx(S,{children:t.subheading}),e.jsxs(C,{children:[t.introduction&&e.jsx("p",{style:{fontSize:"1.05rem",fontWeight:500,color:"#1a1918"},children:t.introduction}),t.brandStory&&e.jsxs("div",{children:[e.jsx("h2",{children:"Brand Story & Heritage"}),e.jsx("p",{children:t.brandStory})]}),t.ourValues&&e.jsxs("div",{children:[e.jsx("h2",{children:"Our Values"}),e.jsx("p",{children:t.ourValues})]}),t.craftsmanship&&e.jsxs("div",{children:[e.jsx("h2",{children:"Master Craftsmanship"}),e.jsx("p",{children:t.craftsmanship})]}),t.conflictFreePolicy&&e.jsxs("div",{children:[e.jsx("h2",{children:"Kimberley Process & Conflict-Free Guarantee"}),e.jsx("p",{children:t.conflictFreePolicy})]}),t.returnEligibility&&e.jsxs("div",{children:[e.jsx("h2",{children:"Return Eligibility & Terms"}),e.jsx("p",{children:t.returnEligibility})]}),t.returnProcess&&e.jsxs("div",{children:[e.jsx("h2",{children:"Step-by-Step Return Process"}),e.jsx("p",{children:t.returnProcess})]}),t.coverage&&e.jsxs("div",{children:[e.jsx("h2",{children:"Coverage Overview"}),e.jsx("p",{children:t.coverage})]}),t.content&&e.jsx("div",{dangerouslySetInnerHTML:{__html:t.content}}),o.sections&&o.sections.map((n,r)=>{let i={};try{i=typeof n.content=="string"?JSON.parse(n.content):n.content}catch{}return e.jsx("div",{dangerouslySetInnerHTML:{__html:i.text||i.description||""}},n.id||r)})]})]})}),e.jsx(y,{})]})};export{L as CMSPage};
