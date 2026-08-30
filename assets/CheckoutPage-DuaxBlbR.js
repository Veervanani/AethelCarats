import{r as f,j as e,aG as E,a as q,aW as U,f as v,m as A,x as $,aX as D,aY as R}from"./react-vendor-Jc2qAOIG.js";import{g as i}from"./ui-vendor-Bp1vOpov.js";import{u as W,e as Y,a as x}from"./admin-pages-C2SByVUX.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const y={},H=i.div`
  background: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 48px 32px;
  text-align: center;
  max-width: 680px;
  margin: 40px auto;
  box-shadow: 0 12px 36px rgba(31, 31, 31, 0.06);

  .lock-icon {
    width: 64px;
    height: 64px;
    background: #faf5eb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: #c9a45c;
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

  button {
    padding: 16px 36px;
    background: #1f1f1f;
    color: #ffffff;
    border: none;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #c9a45c;
    }
  }
`,I=i.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px 80px;
  background-color: #f9f7f2;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px 16px 60px;
  }
`,V=i.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #77736c;
  margin-bottom: 24px;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  a {
    color: #1f1f1f;
    text-decoration: none;
    &:hover {
      color: #c9a45c;
    }
  }
`,J=i.div`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 36px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`,Q=i.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  padding: 36px;
  box-shadow: 0 4px 20px rgba(31, 31, 31, 0.03);

  @media (max-width: 576px) {
    padding: 20px 16px;
  }
`,L=i.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1f1f1f;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f2ede4;
  padding-bottom: 12px;

  span.step {
    font-size: 0.85rem;
    font-family: 'Inter', sans-serif;
    color: #c9a45c;
    font-weight: 600;
  }
`,X=i.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`,m=i.div`
  grid-column: ${({$fullWidth:s})=>s?"1 / -1":"span 1"};
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #33312e;
  }

  input, select, textarea {
    padding: 12px 14px;
    font-size: 0.9rem;
    color: #1f1f1f;
    background: #faf8f5;
    border: 1px solid #d9d3c7;
    outline: none;
    box-sizing: border-box;
    transition: all 0.2s ease;

    &:focus {
      border-color: #c9a45c;
      background: #ffffff;
      box-shadow: 0 0 0 3px rgba(201, 164, 92, 0.12);
    }
  }
`;i.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;i.button`
  padding: 14px 12px;
  background: ${({$active:s})=>s?"#faf5eb":"#ffffff"};
  border: 1.5px solid ${({$active:s})=>s?"#c9a45c":"#e8e3d9"};
  color: ${({$active:s})=>s?"#1f1f1f":"#6b6b6b"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.2s ease;

  svg {
    color: ${({$active:s})=>s?"#c9a45c":"#77736c"};
  }

  &:hover {
    border-color: #c9a45c;
  }
`;const K=i.div`
  background: #ffffff;
  border: 1px solid #e8e3d9;
  padding: 32px 24px;
  height: fit-content;
  box-shadow: 0 4px 20px rgba(31, 31, 31, 0.03);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 20px;
    border-bottom: 1px solid #f2ede4;
    padding-bottom: 12px;
  }
`,Z=i.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 320px;
  overflow-y: auto;
  margin-bottom: 24px;
  padding-right: 4px;
`,_=i.div`
  display: flex;
  gap: 14px;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    background: #faf8f5;
    border: 1px solid #e8e3d9;
  }

  .info {
    flex: 1;
    .title {
      font-size: 0.85rem;
      font-weight: 600;
      color: #1f1f1f;
      line-height: 1.3;
    }
    .meta {
      font-size: 0.75rem;
      color: #77736c;
      margin-top: 2px;
    }
  }

  .price {
    font-size: 0.9rem;
    font-weight: 600;
    color: #1f1f1f;
  }
`,ee=i.div`
  border-top: 1px solid #f2ede4;
  padding-top: 16px;

  .row {
    display: flex;
    justify-content: space-between;
    font-size: 0.88rem;
    color: #55524d;
    margin-bottom: 10px;

    &.total {
      border-top: 1px dashed #d9d3c7;
      padding-top: 14px;
      margin-top: 14px;
      font-size: 1.15rem;
      font-weight: 700;
      color: #1f1f1f;

      .amount {
        color: #c9a45c;
      }
    }
  }
`;i.button`
  width: 100%;
  padding: 16px;
  background: #1f1f1f;
  color: #ffffff;
  border: none;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 24px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c9a45c;
  }

  &:disabled {
    background: #a39e93;
    cursor: not-allowed;
  }
`;const re=i.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 0.78rem;
  color: #77736c;

  svg {
    color: #388e3c;
  }
`,B=i.div`
  background: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 48px 32px;
  text-align: center;
  max-width: 680px;
  margin: 40px auto;
  box-shadow: 0 12px 36px rgba(31, 31, 31, 0.06);

  .check-icon {
    width: 64px;
    height: 64px;
    background: #faf5eb;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: #c9a45c;
  }

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem;
    letter-spacing: 0.08em;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  .order-no {
    font-family: monospace;
    font-size: 1.1rem;
    background: #faf8f5;
    border: 1px solid #e8e3d9;
    padding: 6px 16px;
    display: inline-block;
    color: #1f1f1f;
    font-weight: 700;
    margin-bottom: 24px;
  }

  p {
    font-size: 0.95rem;
    color: #6b6b6b;
    line-height: 1.6;
    margin-bottom: 32px;
  }

  .actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
`,le=()=>{const s=W(),b=(s==null?void 0:s.cartItems)||[],N=(s==null?void 0:s.clearCart)||(()=>{}),{isAuthenticated:F,user:n,openAuthModal:G}=Y(),[te]=f.useState("PAYPAL"),[z,S]=f.useState(!1),[C,O]=f.useState(null),[w,k]=f.useState(""),[a,T]=f.useState({firstName:"",lastName:"",email:"",phone:"",address:"",city:"",postalCode:"",country:"United States",notes:""});f.useEffect(()=>{x.getPayPalClientId().then(t=>{t!=null&&t.clientId?k(t.clientId):k((y==null?void 0:y.VITE_PAYPAL_CLIENT_ID)||"")}).catch(()=>{k((y==null?void 0:y.VITE_PAYPAL_CLIENT_ID)||"")})},[]),f.useEffect(()=>{if(n){const t=(n.name||"").split(" ");T(r=>({...r,firstName:r.firstName||t[0]||"",lastName:r.lastName||t.slice(1).join(" ")||"",email:r.email||n.email||""}))}},[n]);const u=b.reduce((t,r)=>{var l;return t+(r.unitPrice||((l=r.product)==null?void 0:l.price)||0)*(r.quantity||1)},0),p=t=>{T({...a,[t.target.name]:t.target.value})};if(!F)return e.jsx(I,{children:e.jsxs(H,{children:[e.jsx("div",{className:"lock-icon",children:e.jsx(E,{size:32})}),e.jsx("h2",{children:"CLIENT SIGN-IN REQUIRED TO PLACE ORDER"}),e.jsx("p",{children:"To ensure lifetime warranty coverage, GIA diamond authentication certificates, and secure white-glove order tracking, please sign in to your Floksy account or create one before proceeding."}),e.jsx("button",{type:"button",onClick:()=>G("signin"),children:"SIGN IN / REGISTER TO CHECKOUT"})]})});const M=t=>{t.preventDefault();const r=document.getElementById("paypal-button-container");r&&r.scrollIntoView({behavior:"smooth"})};return C?e.jsx(I,{children:e.jsxs(B,{children:[e.jsx("div",{className:"check-icon",children:e.jsx(q,{size:36})}),e.jsx("h1",{children:"ORDER CONFIRMED"}),e.jsxs("div",{className:"order-no",children:["ORDER #",C.orderNumber||"FJ-10028"]}),e.jsxs("p",{children:["Thank you for choosing ",e.jsx("strong",{children:"Floksy Jewel"}),". Your order has been registered and assigned to our master jewelers. A formal white-glove invoice and tracking schedule have been dispatched to ",e.jsx("strong",{children:C.customerEmail||a.email}),"."]}),e.jsxs("div",{className:"actions",children:[e.jsxs("button",{onClick:()=>window.print(),style:{padding:"14px 24px",background:"#faf8f5",border:"1px solid #d9d3c7",color:"#1f1f1f",fontWeight:600,fontSize:"0.8rem",letterSpacing:"0.1em",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(U,{size:16})," PRINT INVOICE"]}),e.jsx(v,{to:"/rings",style:{padding:"14px 28px",background:"#1f1f1f",color:"#ffffff",textDecoration:"none",fontWeight:600,fontSize:"0.8rem",letterSpacing:"0.1em",textTransform:"uppercase"},children:"CONTINUE SHOPPING"})]})]})}):b.length===0?e.jsx(I,{children:e.jsxs(B,{children:[e.jsx("h1",{children:"YOUR SHOPPING BAG IS EMPTY"}),e.jsx("p",{children:"Please add items to your cart before proceeding to secure white-glove checkout."}),e.jsx(v,{to:"/rings",style:{padding:"14px 28px",background:"#1f1f1f",color:"#ffffff",textDecoration:"none",fontWeight:600,fontSize:"0.8rem",letterSpacing:"0.1em",textTransform:"uppercase"},children:"EXPLORE COLLECTIONS"})]})}):e.jsxs(I,{children:[e.jsxs(V,{children:[e.jsx(v,{to:"/",children:"Home"}),e.jsx(A,{size:12}),e.jsx(v,{to:"/cart",children:"Shopping Bag"}),e.jsx(A,{size:12}),e.jsx("span",{children:"Secure Checkout"})]}),e.jsx("form",{onSubmit:M,children:e.jsxs(J,{children:[e.jsxs(Q,{children:[e.jsxs(L,{children:["SHIPPING & CLIENT DETAILS",e.jsx("span",{className:"step",children:"STEP 1 OF 2"})]}),e.jsxs(X,{children:[e.jsxs(m,{children:[e.jsx("label",{children:"First Name *"}),e.jsx("input",{type:"text",name:"firstName",required:!0,value:a.firstName,onChange:p,placeholder:"e.g. Victoria"})]}),e.jsxs(m,{children:[e.jsx("label",{children:"Last Name *"}),e.jsx("input",{type:"text",name:"lastName",required:!0,value:a.lastName,onChange:p,placeholder:"e.g. Sterling"})]}),e.jsxs(m,{$fullWidth:!0,children:[e.jsx("label",{children:"Email Address (For Certificate & Tracking) *"}),e.jsx("input",{type:"email",name:"email",required:!0,value:a.email,onChange:p,placeholder:"concierge@example.com"})]}),e.jsxs(m,{$fullWidth:!0,children:[e.jsx("label",{children:"Phone Number *"}),e.jsx("input",{type:"tel",name:"phone",required:!0,value:a.phone,onChange:p,placeholder:"+1 (555) 000-0000"})]}),e.jsxs(m,{$fullWidth:!0,children:[e.jsx("label",{children:"Street Address *"}),e.jsx("input",{type:"text",name:"address",required:!0,value:a.address,onChange:p,placeholder:"123 Ring Road, Suite 400"})]}),e.jsxs(m,{children:[e.jsx("label",{children:"City *"}),e.jsx("input",{type:"text",name:"city",required:!0,value:a.city,onChange:p,placeholder:"Surat / Mumbai / New York"})]}),e.jsxs(m,{children:[e.jsx("label",{children:"Postal / Zip Code *"}),e.jsx("input",{type:"text",name:"postalCode",required:!0,value:a.postalCode,onChange:p,placeholder:"395006 / 10001"})]})]}),e.jsxs(L,{style:{marginTop:"36px"},children:["PAYMENT METHOD",e.jsx("span",{className:"step",children:"STEP 2 OF 2"})]}),e.jsxs("div",{id:"paypal-button-container",style:{background:"#faf8f5",border:"1.5px solid #c9a45c",padding:"24px",borderRadius:"4px",marginBottom:"20px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px",flexWrap:"wrap",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsxs("div",{style:{background:"#003087",color:"#ffffff",fontWeight:800,fontStyle:"italic",padding:"6px 14px",borderRadius:"4px",fontSize:"1.1rem",letterSpacing:"0.05em"},children:["Pay",e.jsx("span",{style:{color:"#0079C1"},children:"Pal"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.95rem",color:"#1f1f1f"},children:"PayPal Express Checkout"}),e.jsx("div",{style:{fontSize:"0.78rem",color:"#77736c"},children:"Official Buyer Protection & 256-Bit SSL Encrypted"})]})]}),e.jsx($,{size:24,color:"#388E3C"})]}),e.jsxs("p",{style:{fontSize:"0.85rem",color:"#55524d",lineHeight:"1.5",marginBottom:"16px"},children:["You will complete your order securely via ",e.jsx("strong",{children:"PayPal Express Checkout"}),". Accepts PayPal Balance, Debit Cards, and Credit Cards worldwide."]}),w?e.jsx("div",{style:{marginTop:12},children:e.jsx(D,{options:{clientId:w,currency:"USD"},children:e.jsx(R,{style:{layout:"vertical",color:"gold",shape:"rect",label:"pay"},disabled:z,createOrder:async()=>{const t=a.email||(n==null?void 0:n.email)||"client@floksyjewel.com";try{const r=await x.createPayPalOrder({amount:u,currency:"USD",description:`Floksy Jewel Order for ${t}`});if(!(r!=null&&r.id))throw new Error("PayPal payment initialization failed. Please try again.");return r.id}catch(r){throw console.error("createPayPalOrder error:",r),r}},onApprove:async t=>{S(!0);try{const r=`${a.firstName} ${a.lastName}`.trim()||(n==null?void 0:n.name)||"Valued Client",l=a.email||(n==null?void 0:n.email)||"client@floksyjewel.com",g=a.address?`${a.address}, ${a.city||""}, ${a.postalCode||""}, ${a.country||"USA"}`:"PayPal Verified Shipping Address",h={customerName:r,customerEmail:l,customerPhone:a.phone||"",shippingAddress:g,items:b.map(o=>{var d,P,j;return{productId:o.id||o.productId,productName:o.productName||((d=o.product)==null?void 0:d.title)||o.title||"Handcrafted Jewellery Piece",sku:o.sku||((P=o.product)==null?void 0:P.sku)||"FJ-PIECE",variantInfo:o.selectedMetal?`${o.selectedMetal} | Size: ${o.selectedSize||"Standard"}`:null,unitPrice:o.unitPrice||((j=o.product)==null?void 0:j.price)||0,quantity:o.quantity||1}}),subtotal:u,shippingFee:0,tax:0,discount:0,currency:"USD",notes:`Paid via PayPal Express (PayPal Order ID: ${t.orderID}). ${a.notes||""}`.trim()},c=await x.createPublicOrder(h);await x.capturePayPalOrder({paypalOrderId:t.orderID,dbOrderId:c.id}),O(c),N()}catch(r){console.error("PayPal processing error:",r),alert((r==null?void 0:r.message)||"Payment approval succeeded but order recording encountered an issue.")}finally{S(!1)}},onError:t=>{console.error("PayPal Button Error:",t),alert("PayPal Payment Error: Please check that your Live PayPal Client ID & Secret are valid in Admin Settings.")}})})}):e.jsxs("div",{style:{marginTop:12,padding:14,background:"#fff",border:"1px solid #c9a45c",borderRadius:4,textAlign:"center",fontSize:"0.82rem",color:"#55524d"},children:[e.jsx(E,{size:18,color:"#c9a45c",style:{marginBottom:4}}),e.jsx("div",{style:{fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em"},children:"PayPal Payment Gateway Loading"})]})]})]}),e.jsxs(K,{children:[e.jsx("h3",{children:"ORDER SUMMARY"}),e.jsx(Z,{children:b.map((t,r)=>{var l,g,h,c,o,d;return e.jsxs(_,{children:[e.jsx("img",{src:t.image||((h=(g=(l=t.product)==null?void 0:l.images)==null?void 0:g[0])==null?void 0:h.url)||((c=t.diamond)==null?void 0:c.imageUrl)||"/assets/diamonds/Round.svg",alt:t.productName}),e.jsxs("div",{className:"info",children:[e.jsx("div",{className:"title",children:t.productName||((o=t.product)==null?void 0:o.title)||"Handcrafted Ring"}),e.jsxs("div",{className:"meta",children:["Qty: ",t.quantity||1," ",t.selectedMetal?`• ${t.selectedMetal}`:""]})]}),e.jsxs("div",{className:"price",children:["$",((t.unitPrice||((d=t.product)==null?void 0:d.price)||0)*(t.quantity||1)).toLocaleString()]})]},r)})}),e.jsxs(ee,{children:[e.jsxs("div",{className:"row",children:[e.jsx("span",{children:"Subtotal"}),e.jsxs("span",{children:["$",u.toLocaleString()]})]}),e.jsxs("div",{className:"row",children:[e.jsx("span",{children:"Insured Express Shipping"}),e.jsx("span",{style:{color:"#388E3C",fontWeight:600},children:"COMPLIMENTARY"})]}),e.jsxs("div",{className:"row total",children:[e.jsx("span",{children:"Total Due"}),e.jsxs("span",{className:"amount",children:["$",u.toLocaleString()]})]})]}),w?e.jsx("div",{style:{marginTop:20},children:e.jsx(D,{options:{clientId:w,currency:"USD"},children:e.jsx(R,{style:{layout:"vertical",color:"gold",shape:"rect",label:"pay"},disabled:z,createOrder:async()=>{const t=a.email||(n==null?void 0:n.email)||"client@floksyjewel.com";try{const r=await x.createPayPalOrder({amount:u,currency:"USD",description:`Floksy Jewel Order for ${t}`});if(!(r!=null&&r.id))throw new Error("PayPal payment initialization failed. Please try again.");return r.id}catch(r){throw console.error("createPayPalOrder error:",r),r}},onApprove:async t=>{S(!0);try{const r=`${a.firstName} ${a.lastName}`.trim()||(n==null?void 0:n.name)||"Valued Client",l=a.email||(n==null?void 0:n.email)||"client@floksyjewel.com",g=a.address?`${a.address}, ${a.city||""}, ${a.postalCode||""}, ${a.country||"USA"}`:"PayPal Verified Shipping Address",h={customerName:r,customerEmail:l,customerPhone:a.phone||"",shippingAddress:g,items:b.map(o=>{var d,P,j;return{productId:o.id||o.productId,productName:o.productName||((d=o.product)==null?void 0:d.title)||o.title||"Handcrafted Jewellery Piece",sku:o.sku||((P=o.product)==null?void 0:P.sku)||"FJ-PIECE",variantInfo:o.selectedMetal?`${o.selectedMetal} | Size: ${o.selectedSize||"Standard"}`:null,unitPrice:o.unitPrice||((j=o.product)==null?void 0:j.price)||0,quantity:o.quantity||1}}),subtotal:u,shippingFee:0,tax:0,discount:0,currency:"USD",notes:`Paid via PayPal Express (PayPal Order ID: ${t.orderID}). ${a.notes||""}`.trim()},c=await x.createPublicOrder(h);await x.capturePayPalOrder({paypalOrderId:t.orderID,dbOrderId:c.id}),O(c),N()}catch(r){console.error("PayPal processing error:",r),alert((r==null?void 0:r.message)||"Payment approval succeeded but order recording encountered an issue.")}finally{S(!1)}},onError:t=>{console.error("PayPal Button Error:",t),alert("PayPal Payment Error: Please check that your Live PayPal Client ID & Secret are valid in Admin Settings.")}})})}):e.jsxs("div",{style:{marginTop:20,padding:16,background:"#faf5eb",border:"1px solid #c9a45c",borderRadius:4,textAlign:"center",fontSize:"0.82rem",color:"#55524d"},children:[e.jsx(E,{size:18,color:"#c9a45c",style:{marginBottom:6}}),e.jsx("div",{style:{fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em"},children:"PayPal Payment Required"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"#777",marginTop:4},children:"Please ensure PayPal Credentials are configured in Admin Panel (PayPal & Settings)."})]}),e.jsxs(re,{children:[e.jsx($,{size:16})," 256-Bit SSL Encrypted & Fully Insured Transit"]})]})]})})]})};export{le as CheckoutPage};
