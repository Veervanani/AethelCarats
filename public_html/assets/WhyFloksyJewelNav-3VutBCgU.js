import{e as c,j as a,h as l,b as p,x as d,b1 as m,aP as h,w as x,aG as f,b2 as u,Y as g,aD as b,f as y}from"./react-vendor-Jc2qAOIG.js";import{g as i}from"./ui-vendor-Bp1vOpov.js";import{R as n}from"./admin-pages-DhzENjQN.js";const w=i.section`
  max-width: 1200px;
  margin: 64px auto 0;
  padding: 0 24px;
`,j=i.div`
  text-align: center;
  margin-bottom: 32px;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 500;
    color: #1a1918;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  p {
    font-size: 0.9rem;
    color: #77736c;
    margin-top: 6px;
  }
`,v=i.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`,k=i(y)`
  background: #fffdf9;
  border: 1px solid ${({$active:e})=>e?"#c9a45c":"#e8e3d9"};
  padding: 24px 16px;
  border-radius: 4px;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
  transition: all 0.2s ease;
  box-shadow: ${({$active:e})=>e?"0 4px 16px rgba(201, 164, 92, 0.15)":"none"};

  .icon-wrapper {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: ${({$active:e})=>e?"#1a1918":"#f5f2ea"};
    color: ${({$active:e})=>e?"#c9a45c":"#1a1918"};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  span {
    font-size: 0.82rem;
    letter-spacing: 0.05em;
    font-weight: 600;
    color: ${({$active:e})=>e?"#c9a45c":"#1a1918"};
    line-height: 1.4;
  }

  &:hover {
    border-color: #c9a45c;
    transform: translateY(-2px);

    .icon-wrapper {
      background: #c9a45c;
      color: #1a1918;
    }

    span {
      color: #c9a45c;
    }
  }
`,S=[{label:"Quality & Value",path:"/about-us",icon:l},{label:"Return Policy",path:"/returns-refunds",icon:p},{label:"Conflict Free Diamonds",path:"/sustainability",icon:d},{label:"Diamond Price Matching",path:"/price-match",icon:m},{label:"Limited Lifetime Warranty",path:"/lifetime-warranty",icon:h},{label:"Free Secure Shipping",path:"/shipping-delivery",icon:x},{label:"Jewelry Insurance",path:"/insurance",icon:f},{label:"Floksy Jewel Journal",path:"/blog",icon:u},{label:"Sale Exclusions",path:"/sale-exclusions",icon:g},{label:"Contact Concierge",path:"/contact-us",icon:b}],F=()=>{const e=c();return a.jsx(n,{yOffset:35,children:a.jsxs(w,{children:[a.jsxs(j,{children:[a.jsx("h2",{children:"Why Floksy Jewel"}),a.jsx("p",{children:"Discover our uncompromising commitments to ethical sourcing, security, and lifetime value."})]}),a.jsx(v,{children:S.map((t,r)=>{const o=t.icon,s=e.pathname===t.path;return a.jsx(n,{staggerIndex:r,yOffset:20,children:a.jsxs(k,{to:t.path,$active:s,children:[a.jsx("div",{className:"icon-wrapper",children:a.jsx(o,{size:20})}),a.jsx("span",{children:t.label})]})},t.path)})})]})})};export{F as W};
