import{e as l,j as a,h as c,b as p,w as d,b2 as m,y as h,x,K as u,b3 as g,W as f,aF as b,f as A}from"./react-vendor-I9PV_paW.js";import{g as r}from"./ui-vendor-D75S3wy_.js";import{R as i}from"./admin-pages-DeXXMrNX.js";const C=r.section`
  max-width: 1200px;
  margin: 64px auto 0;
  padding: 0 24px;
`,y=r.div`
  text-align: center;
  margin-bottom: 32px;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    font-weight: 500;
    color: #F5F1E8;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  p {
    font-size: 0.95rem;
    color: #A8A8A8;
    margin-top: 8px;
    letter-spacing: 0.04em;
  }
`,w=r.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,j=r(A)`
  background: #151515;
  border: 1px solid ${({$active:e})=>e?"#C9A96E":"rgba(140, 116, 75, 0.25)"};
  padding: 24px 16px;
  border-radius: 4px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  transition: all 0.25s ease;
  box-shadow: ${({$active:e})=>e?"0 4px 20px rgba(201, 169, 110, 0.2)":"none"};

  .icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: ${({$active:e})=>e?"#C9A96E":"#111111"};
    color: ${({$active:e})=>e?"#0B0B0B":"#C9A96E"};
    border: 1px solid ${({$active:e})=>e?"#C9A96E":"rgba(140, 116, 75, 0.3)"};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.25s ease;
  }

  span {
    font-size: 0.82rem;
    letter-spacing: 0.08em;
    font-weight: 600;
    text-transform: uppercase;
    color: ${({$active:e})=>e?"#C9A96E":"#F5F1E8"};
    line-height: 1.4;
    transition: color 0.2s ease;
  }

  &:hover {
    border-color: #C9A96E;
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);

    .icon-wrapper {
      background: #C9A96E;
      color: #0B0B0B;
    }

    span {
      color: #C9A96E;
    }
  }
`,v=[{label:"Quality & Value",path:"/about-us",icon:c},{label:"Return Policy",path:"/returns-refunds",icon:p},{label:"Conflict Free Diamonds",path:"/sustainability",icon:d},{label:"Diamond Price Matching",path:"/price-match",icon:m},{label:"Lifetime Warranty",path:"/lifetime-warranty",icon:h},{label:"Free Insured Shipping",path:"/shipping-delivery",icon:x},{label:"Jewellery Insurance",path:"/insurance",icon:u},{label:"AethelCarats Journal",path:"/blog",icon:g},{label:"Sale Exclusions",path:"/sale-exclusions",icon:f},{label:"Contact Concierge",path:"/contact-us",icon:b}],B=()=>{const e=l();return a.jsx(i,{yOffset:35,children:a.jsxs(C,{children:[a.jsxs(y,{children:[a.jsx("h2",{children:"Why AethelCarats Atelier"}),a.jsx("p",{children:"Discover our commitments to master craftsmanship, certified diamonds, and lifetime value."})]}),a.jsx(w,{children:v.map((t,n)=>{const o=t.icon,s=e.pathname===t.path;return a.jsx(i,{staggerIndex:n,yOffset:20,children:a.jsxs(j,{to:t.path,$active:s,children:[a.jsx("div",{className:"icon-wrapper",children:a.jsx(o,{size:20})}),a.jsx("span",{children:t.label})]})},t.path)})})]})})};export{B as W};
