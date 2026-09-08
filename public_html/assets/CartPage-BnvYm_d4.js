import{r as S,u as I,j as e,d as L,A as s,f as c,M as T,P as M,ac as G,y as P}from"./react-vendor-BsBv4awM.js";import{g as t}from"./ui-vendor-C0FaE403.js";import{u as D,a as N,R as l}from"./admin-pages-BYybl7sm.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const U=t.div`
  max-width: 1400px;
  min-height: 80vh;
  margin: 0 auto;
  padding: 48px 24px 80px;
  background-color: #0B0B0B;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 16px 60px;
  }
`,W=t.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.8rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #A8A8A8;
    letter-spacing: 0.04em;
  }
`,H=t.div`
  max-width: 650px;
  margin: 40px auto;
  text-align: center;
  padding: 56px 32px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);

  .icon-wrapper {
    width: 72px;
    height: 72px;
    margin: 0 auto 24px;
    border-radius: 50%;
    background-color: rgba(201, 169, 110, 0.1);
    border: 1px solid rgba(140, 116, 75, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #C9A96E;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #A8A8A8;
    line-height: 1.6;
    margin-bottom: 32px;
  }
`,$=t.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`,n=t(c)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  background-color: #111111;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 2px;
  color: #F5F1E8;
  text-decoration: none;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  transition: all 0.25s ease;

  &:hover {
    border-color: #C9A96E;
    color: #0B0B0B;
    background-color: #C9A96E;
    transform: translateY(-2px);
  }
`,Y=t.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`,q=t.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,K=t.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &:hover {
    border-color: rgba(201, 169, 110, 0.45);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 95px 1fr;
    gap: 14px;
    padding: 14px;
  }

  .img-box-link {
    width: 105px;
    height: 105px;
    background: #0B0B0B;
    border: 1px solid rgba(140, 116, 75, 0.2);
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
    text-decoration: none;
    transition: border-color 0.2s ease, transform 0.2s ease;

    &:hover {
      border-color: #C9A96E;
      transform: scale(1.03);
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
    gap: 4px;
    min-width: 0;

    .name-link {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 1.15rem;
      font-weight: 600;
      color: #F5F1E8;
      text-decoration: none;
      line-height: 1.3;
      transition: color 0.2s ease;
      margin-bottom: 2px;

      &:hover {
        color: #C9A96E;
      }

      @media (max-width: 600px) {
        font-size: 1.0rem;
        line-height: 1.25;
      }
    }

    .meta-text {
      font-size: 0.78rem;
      color: #A8A8A8;
      line-height: 1.35;

      @media (max-width: 600px) {
        font-size: 0.72rem;
      }
    }

    .price {
      font-size: 1.12rem;
      font-weight: 700;
      color: #C9A96E;
      letter-spacing: 0.04em;
      margin-top: 4px;

      @media (max-width: 600px) {
        font-size: 1.0rem;
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
      border-top: 1px solid rgba(140, 116, 75, 0.2);
      padding-top: 10px;
      margin-top: 2px;
      margin-left: 0;
    }
  }

  .quantity-controls {
    display: flex;
    align-items: center;
    border: 1px solid rgba(140, 116, 75, 0.3);
    background: #111111;
    border-radius: 2px;

    button {
      background: none;
      border: none;
      padding: 8px 12px;
      min-width: 36px;
      height: 36px;
      cursor: pointer;
      color: #F5F1E8;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;

      &:hover {
        background: rgba(201, 169, 110, 0.15);
        color: #C9A96E;
      }
    }

    span {
      padding: 0 12px;
      font-weight: 700;
      font-size: 0.95rem;
      color: #F5F1E8;
      min-width: 24px;
      text-align: center;
    }
  }

  .delete-btn {
    background: none;
    border: none;
    color: #A8A8A8;
    cursor: pointer;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;

    &:hover {
      color: #E53E3E;
    }
  }
`,V=t.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 28px;
  height: fit-content;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    letter-spacing: 0.12em;
    color: #F5F1E8;
    margin: 0 0 20px 0;
    border-bottom: 1px solid rgba(140, 116, 75, 0.2);
    padding-bottom: 12px;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    margin-bottom: 12px;
    color: #D8D2C5;

    &.total {
      border-top: 1px solid rgba(140, 116, 75, 0.2);
      padding-top: 16px;
      margin-top: 16px;
      font-weight: 700;
      font-size: 1.15rem;
      color: #F5F1E8;

      .amount {
        color: #C9A96E;
        font-size: 1.25rem;
      }
    }
  }

  .shipping-note {
    font-size: 0.78rem;
    color: #A8A8A8;
    margin-bottom: 20px;
    line-height: 1.4;
  }
`,_=t.button`
  width: 100%;
  padding: 15px;
  background: #C9A96E;
  color: #0B0B0B;
  border: 1px solid #C9A96E;
  border-radius: 2px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.25s ease;

  &:hover {
    background: #DFBA73;
    border-color: #DFBA73;
    box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
  }
`,O=t(c)`
  display: block;
  text-align: center;
  margin-top: 14px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: #A8A8A8;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: #C9A96E;
  }
`,re=()=>{const o=D(),p=(o==null?void 0:o.cartItems)||[],g=(o==null?void 0:o.updateQuantity)||(()=>{}),R=(o==null?void 0:o.removeFromCart)||(()=>{}),[d,B]=S.useState(null);S.useEffect(()=>{N.getHolidayModeStatus().then(B).catch(console.error)},[]);const m=p.reduce((r,i)=>{var a;return r+(i.unitPrice||((a=i.product)==null?void 0:a.price)||0)*(i.quantity||1)},0),h=I(),F=async()=>{try{const r=await N.getHolidayModeStatus();if(r.active){alert(r.message||"Orders are temporarily unavailable while Holiday Mode is active.");return}h("/checkout")}catch{h("/checkout")}};return e.jsxs(U,{children:[e.jsx(l,{yOffset:35,children:e.jsxs(W,{children:[e.jsx("h1",{children:"YOUR SHOPPING BAG"}),e.jsx("p",{children:"Review your curated selection of handcrafted fine jewellery"})]})}),p.length===0?e.jsx(l,{yOffset:35,children:e.jsxs(H,{children:[e.jsx("div",{className:"icon-wrapper",children:e.jsx(L,{size:32,color:"#C9A96E"})}),e.jsx("h2",{children:"YOUR BAG IS EMPTY"}),e.jsx("p",{children:"Explore our timeless collections of solitaire rings, necklaces, bracelets, and certified loose diamonds."}),e.jsxs($,{children:[e.jsxs(n,{to:"/rings",children:["RINGS ",e.jsx(s,{size:14})]}),e.jsxs(n,{to:"/earrings",children:["EARRINGS ",e.jsx(s,{size:14})]}),e.jsxs(n,{to:"/necklaces",children:["NECKLACES ",e.jsx(s,{size:14})]}),e.jsxs(n,{to:"/bracelets",children:["BRACELETS ",e.jsx(s,{size:14})]}),e.jsxs(n,{to:"/diamonds?type=NATURAL",children:["DIAMONDS ",e.jsx(s,{size:14})]}),e.jsxs(n,{to:"/diamonds?type=LAB_GROWN",children:["LAB-GROWN DIAMONDS ",e.jsx(s,{size:14})]})]}),e.jsxs("div",{style:{marginTop:28,background:"#111111",border:"1px solid rgba(140, 116, 75, 0.25)",padding:"16px 20px",borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",gap:12,flexWrap:"wrap"},children:[e.jsx("span",{style:{fontSize:"0.88rem",color:"#F5F1E8",fontWeight:600},children:"Already placed an order?"}),e.jsx(c,{to:"/account",style:{color:"#C9A96E",fontWeight:700,textDecoration:"none",fontSize:"0.85rem"},children:"View My Orders & Track Live Shipments →"})]})]})}):e.jsxs(Y,{children:[e.jsx(q,{children:p.map((r,i)=>{var a,u,f,b,j,y,A,w,v,E,C,k;return e.jsx(l,{staggerIndex:i,yOffset:25,children:e.jsxs(K,{children:[e.jsx(c,{to:`/product/${((a=r.product)==null?void 0:a.slug)||((u=r.product)==null?void 0:u.id)||""}`,className:"img-box-link",title:`View ${((f=r.product)==null?void 0:f.name)||"Product"} details`,children:e.jsx("img",{src:((b=r.product)==null?void 0:b.primaryImage)||((j=r.product)==null?void 0:j.mainImage)||((y=r.product)!=null&&y.images&&r.product.images[0]?r.product.images[0].url:"/assets/gem_rings_cat.png"),alt:((A=r.product)==null?void 0:A.name)||"Product image"})}),e.jsxs("div",{className:"details",children:[e.jsx(c,{to:`/product/${((w=r.product)==null?void 0:w.slug)||((v=r.product)==null?void 0:v.id)||""}`,className:"name-link",children:(E=r.product)==null?void 0:E.name}),e.jsxs("div",{className:"meta-text",children:["SKU: ",((C=r.product)==null?void 0:C.sku)||"FJ-JW-001"]}),r.selectedMetal&&e.jsxs("div",{className:"meta-text",children:["Metal: ",r.selectedMetal]}),r.selectedSize&&r.selectedSize!=="Select"&&e.jsxs("div",{className:"meta-text",children:["Ring Size: ",r.selectedSize]}),r.engravingText&&e.jsxs("div",{className:"meta-text",children:['Engraving: "',r.engravingText,'"']}),r.customOptions&&Object.keys(r.customOptions).length>0&&e.jsx("div",{className:"meta-text",style:{marginTop:2},children:Object.entries(r.customOptions).map(([z,x])=>e.jsxs("div",{children:[e.jsxs("strong",{children:[z,":"]})," ",x.value," ",x.priceAdjustment>0?`(+$${x.priceAdjustment})`:""]},z))}),e.jsxs("div",{className:"price",children:["$",(r.unitPrice||((k=r.product)==null?void 0:k.price)||0).toLocaleString()]})]}),e.jsxs("div",{className:"cart-item-actions",children:[e.jsxs("div",{className:"quantity-controls",children:[e.jsx("button",{type:"button",onClick:()=>g(i,-1),"aria-label":"Decrease quantity",children:e.jsx(T,{size:14})}),e.jsx("span",{children:r.quantity}),e.jsx("button",{type:"button",onClick:()=>g(i,1),"aria-label":"Increase quantity",children:e.jsx(M,{size:14})})]}),e.jsx("button",{type:"button",className:"delete-btn",onClick:()=>R(i),title:"Remove item",children:e.jsx(G,{size:18})})]})]})},r.id||i)})}),e.jsx(l,{yOffset:35,children:e.jsxs(V,{children:[e.jsx("h3",{children:"ORDER SUMMARY"}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Subtotal"}),e.jsxs("span",{children:["$",m.toLocaleString()]})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Insured Express Shipping"}),e.jsx("span",{style:{color:"#C9A96E",fontWeight:600},children:"COMPLIMENTARY"})]}),e.jsx("p",{className:"shipping-note",children:"Includes signature presentation packaging & full transit insurance."}),e.jsxs("div",{className:"summary-row total",children:[e.jsx("span",{children:"Estimated Total"}),e.jsxs("span",{className:"amount",children:["$",m.toLocaleString()]})]}),d!=null&&d.active?e.jsxs("div",{style:{background:"rgba(229, 62, 62, 0.1)",border:"1px solid rgba(229, 62, 62, 0.4)",padding:16,marginTop:16,textAlign:"center"},children:[e.jsx("h4",{style:{margin:"0 0 8px 0",fontSize:"0.9rem",color:"#FC8181",letterSpacing:"0.08em"},children:"ORDERS TEMPORARILY UNAVAILABLE"}),e.jsx("p",{style:{fontSize:"0.78rem",color:"#A8A8A8",lineHeight:1.5,margin:"0 0 12px 0"},children:d.message||"We are currently taking a short holiday break. Checkout and ordering services are temporarily unavailable."}),e.jsx(O,{to:"/rings",children:"CONTINUE BROWSING CATALOG"})]}):e.jsxs(e.Fragment,{children:[e.jsxs(_,{onClick:F,children:[e.jsx(P,{size:16})," SECURE CHECKOUT"]}),e.jsx(O,{to:"/rings",children:"CONTINUE SHOPPING"})]})]})})]})]})};export{re as CartPage};
