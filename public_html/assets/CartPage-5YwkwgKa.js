import{r as O,u as T,j as e,d as M,A as n,e as c,M as G,P,ac as B,aE as U}from"./react-vendor-BSubOYpr.js";import{g as r}from"./ui-vendor-C-kywwZi.js";import{u as W,a as R,R as l}from"./admin-pages-D6Our18J.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const D=r.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  background-color: #f9f7f2;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 16px 60px;
  }
`,H=r.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.8rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  p {
    font-size: 1rem;
    color: #6b6b6b;
  }
`,$=r.div`
  max-width: 650px;
  margin: 40px auto;
  text-align: center;
  padding: 56px 32px;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  border-radius: 2px;
  box-shadow: 0 4px 20px rgba(31, 31, 31, 0.04);

  .icon-wrapper {
    width: 72px;
    height: 72px;
    margin: 0 auto 24px;
    border-radius: 50%;
    background-color: #faf5eb;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    letter-spacing: 0.08em;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #6b6b6b;
    line-height: 1.6;
    margin-bottom: 32px;
  }
`,q=r.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,s=r(c)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background-color: #ffffff;
  border: 1px solid #d9d3c7;
  color: #1f1f1f;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.1em;

  &:hover {
    border-color: #c9a45c;
    color: #c9a45c;
  }
`,Y=r.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`,F=r.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,K=r.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  border-radius: 6px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 95px 1fr;
    gap: 14px;
    padding: 14px;
  }

  .img-box-link {
    width: 105px;
    height: 105px;
    background: #faf8f5;
    border: 1px solid #f0eae1;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
    text-decoration: none;
    transition: border-color 0.2s ease, transform 0.2s ease;

    &:hover {
      border-color: #c9a45c;
      transform: scale(1.02);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 600px) {
      width: 95px;
      height: 95px;
    }
  }

  .details {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;

    .name-link {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.15rem;
      font-weight: 600;
      color: #1f1f1f;
      text-decoration: none;
      line-height: 1.3;
      transition: color 0.2s ease;
      margin-bottom: 2px;

      &:hover {
        color: #c9a45c;
      }

      @media (max-width: 600px) {
        font-size: 1.0rem;
        line-height: 1.25;
      }
    }

    .meta-text {
      font-size: 0.76rem;
      color: #66635d;
      line-height: 1.35;

      @media (max-width: 600px) {
        font-size: 0.72rem;
      }
    }

    .price {
      font-size: 1.08rem;
      font-weight: 700;
      color: #1f1f1f;
      margin-top: 4px;

      @media (max-width: 600px) {
        font-size: 0.98rem;
      }
    }
  }

  .cart-item-actions {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-left: auto;

    @media (max-width: 600px) {
      grid-column: 1 / -1;
      width: 100%;
      justify-content: space-between;
      border-top: 1px solid #f2ede4;
      padding-top: 10px;
      margin-top: 2px;
      margin-left: 0;
    }
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    border: 1px solid #d9d3c7;
    background: #faf8f5;
    border-radius: 4px;

    button {
      background: none;
      border: none;
      padding: 8px 12px;
      min-width: 36px;
      height: 36px;
      cursor: pointer;
      color: #1f1f1f;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s ease;

      &:hover {
        background: #f0e9dc;
      }
    }

    span {
      padding: 0 12px;
      font-weight: 700;
      font-size: 0.95rem;
      color: #1f1f1f;
      min-width: 24px;
      text-align: center;
    }
  }

  .delete-btn {
    background: none;
    border: none;
    color: #888;
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.15s ease;

    &:hover {
      color: #d9534f;
    }
  }
`,V=r.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  padding: 28px;
  height: fit-content;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    margin: 0 0 20px 0;
    border-bottom: 1px solid #f2ede4;
    padding-bottom: 12px;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    margin-bottom: 12px;
    color: #4a4741;

    &.total {
      border-top: 1px solid #f2ede4;
      padding-top: 16px;
      margin-top: 16px;
      font-weight: 700;
      font-size: 1.1rem;
      color: #1f1f1f;

      .amount {
        color: #c9a45c;
      }
    }
  }

  .shipping-note {
    font-size: 0.78rem;
    color: #777;
    margin-bottom: 20px;
  }
`,_=r.button`
  width: 100%;
  padding: 14px;
  background: #1f1f1f;
  color: #ffffff;
  border: 1px solid #1f1f1f;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #c9a45c;
    border-color: #c9a45c;
    color: #1f1f1f;
  }
`,A=r(c)`
  display: block;
  text-align: center;
  margin-top: 12px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #1f1f1f;
  text-decoration: none;

  &:hover {
    color: #c9a45c;
  }
`,te=()=>{const o=W(),p=(o==null?void 0:o.cartItems)||[],f=(o==null?void 0:o.updateQuantity)||(()=>{}),E=(o==null?void 0:o.removeFromCart)||(()=>{}),[d,I]=O.useState(null);O.useEffect(()=>{R.getHolidayModeStatus().then(I).catch(console.error)},[]);const m=p.reduce((t,i)=>{var a;return t+(i.unitPrice||((a=i.product)==null?void 0:a.price)||0)*(i.quantity||1)},0),g=T(),L=async()=>{try{const t=await R.getHolidayModeStatus();if(t.active){alert(t.message||"Orders are temporarily unavailable while Holiday Mode is active.");return}g("/checkout")}catch{g("/checkout")}};return e.jsxs(D,{children:[e.jsx(l,{yOffset:35,children:e.jsxs(H,{children:[e.jsx("h1",{children:"YOUR SHOPPING BAG"}),e.jsx("p",{children:"Review your curated selection of handcrafted fine jewellery"})]})}),p.length===0?e.jsx(l,{yOffset:35,children:e.jsxs($,{children:[e.jsx("div",{className:"icon-wrapper",children:e.jsx(M,{size:32,color:"#C9A45C"})}),e.jsx("h2",{children:"YOUR BAG IS EMPTY"}),e.jsx("p",{children:"Explore our timeless collections of solitaire rings, necklaces, bracelets, and certified loose diamonds."}),e.jsxs(q,{children:[e.jsxs(s,{to:"/rings",children:["RINGS ",e.jsx(n,{size:14})]}),e.jsxs(s,{to:"/earrings",children:["EARRINGS ",e.jsx(n,{size:14})]}),e.jsxs(s,{to:"/necklaces",children:["NECKLACES ",e.jsx(n,{size:14})]}),e.jsxs(s,{to:"/bracelets",children:["BRACELETS ",e.jsx(n,{size:14})]}),e.jsxs(s,{to:"/diamonds?type=NATURAL",children:["DIAMONDS ",e.jsx(n,{size:14})]}),e.jsxs(s,{to:"/diamonds?type=LAB_GROWN",children:["LAB-GROWN DIAMONDS ",e.jsx(n,{size:14})]})]}),e.jsxs("div",{style:{marginTop:28,background:"#faf5eb",border:"1px solid #c9a45c",padding:"16px 20px",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",gap:12,flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:"0.88rem",color:"#1f1f1f",fontWeight:600},children:"Already placed an order?"}),e.jsx(c,{to:"/account",style:{color:"#c9a45c",fontWeight:700,textDecoration:"none",fontSize:"0.85rem"},children:"View My Orders & Track Live Shipments →"})]})]})}):e.jsxs(Y,{children:[e.jsx(F,{children:p.map((t,i)=>{var a,h,u,b,j,y,v,w,k,z,S,N;return e.jsx(l,{staggerIndex:i,yOffset:25,children:e.jsxs(K,{children:[e.jsx(c,{to:`/product/${((a=t.product)==null?void 0:a.slug)||((h=t.product)==null?void 0:h.id)||""}`,className:"img-box-link",title:`View ${((u=t.product)==null?void 0:u.name)||"Product"} details`,children:e.jsx("img",{src:((b=t.product)==null?void 0:b.primaryImage)||((j=t.product)==null?void 0:j.mainImage)||((y=t.product)!=null&&y.images&&t.product.images[0]?t.product.images[0].url:"/assets/floksy_rings_cat.png"),alt:((v=t.product)==null?void 0:v.name)||"Product image"})}),e.jsxs("div",{className:"details",children:[e.jsx(c,{to:`/product/${((w=t.product)==null?void 0:w.slug)||((k=t.product)==null?void 0:k.id)||""}`,className:"name-link",children:(z=t.product)==null?void 0:z.name}),e.jsxs("div",{className:"meta-text",children:["SKU: ",((S=t.product)==null?void 0:S.sku)||"FJ-JW-001"]}),t.selectedMetal&&e.jsxs("div",{className:"meta-text",children:["Metal: ",t.selectedMetal]}),t.selectedSize&&t.selectedSize!=="Select"&&e.jsxs("div",{className:"meta-text",children:["Ring Size: ",t.selectedSize]}),t.engravingText&&e.jsxs("div",{className:"meta-text",children:['Engraving: "',t.engravingText,'"']}),t.customOptions&&Object.keys(t.customOptions).length>0&&e.jsx("div",{className:"meta-text",style:{marginTop:2},children:Object.entries(t.customOptions).map(([C,x])=>e.jsxs("div",{children:[e.jsxs("strong",{children:[C,":"]})," ",x.value," ",x.priceAdjustment>0?`(+$${x.priceAdjustment})`:""]},C))}),e.jsxs("div",{className:"price",children:["$",(t.unitPrice||((N=t.product)==null?void 0:N.price)||0).toLocaleString()]})]}),e.jsxs("div",{className:"cart-item-actions",children:[e.jsxs("div",{className:"quantity-controls",children:[e.jsx("button",{type:"button",onClick:()=>f(i,-1),"aria-label":"Decrease quantity",children:e.jsx(G,{size:14})}),e.jsx("span",{children:t.quantity}),e.jsx("button",{type:"button",onClick:()=>f(i,1),"aria-label":"Increase quantity",children:e.jsx(P,{size:14})})]}),e.jsx("button",{type:"button",className:"delete-btn",onClick:()=>E(i),title:"Remove item",children:e.jsx(B,{size:18})})]})]})},t.id||i)})}),e.jsx(l,{yOffset:35,children:e.jsxs(V,{children:[e.jsx("h3",{children:"ORDER SUMMARY"}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Subtotal"}),e.jsxs("span",{children:["$",m.toLocaleString()]})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Insured Express Shipping"}),e.jsx("span",{style:{color:"#388E3C",fontWeight:600},children:"COMPLIMENTARY"})]}),e.jsx("p",{className:"shipping-note",children:"Includes white-glove packaging & full transit insurance."}),e.jsxs("div",{className:"summary-row total",children:[e.jsx("span",{children:"Estimated Total"}),e.jsxs("span",{className:"amount",children:["$",m.toLocaleString()]})]}),d!=null&&d.active?e.jsxs("div",{style:{background:"#fff5f5",border:"1px solid #feb2b2",padding:16,marginTop:16,textAlign:"center"},children:[e.jsx("h4",{style:{margin:"0 0 8px 0",fontSize:"0.9rem",color:"#9b2c2c",letterSpacing:"0.08em"},children:"ORDERS TEMPORARILY UNAVAILABLE"}),e.jsx("p",{style:{fontSize:"0.78rem",color:"#666",lineHeight:1.5,margin:"0 0 12px 0"},children:d.message||"We are currently taking a short holiday break. Checkout and ordering services are temporarily unavailable."}),e.jsx(A,{to:"/rings",children:"CONTINUE BROWSING CATALOG"})]}):e.jsxs(e.Fragment,{children:[e.jsxs(_,{onClick:L,children:[e.jsx(U,{size:16})," SECURE CHECKOUT"]}),e.jsx(A,{to:"/rings",children:"CONTINUE SHOPPING"})]})]})})]})]})};export{te as CartPage};
