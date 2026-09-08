import{r as f,j as e,J as w,a as q,aV as U,f as A,l as B,v as D,aW as F,aX as T}from"./react-vendor-CKfE40gi.js";import{g as n}from"./ui-vendor-5voluciG.js";import{u as W,e as H,a as x}from"./admin-pages-CjL1b0Kp.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const y={},V=n.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 48px 32px;
  text-align: center;
  max-width: 680px;
  margin: 40px auto;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.6);

  .lock-icon {
    width: 64px;
    height: 64px;
    background: rgba(201, 169, 110, 0.1);
    border: 1px solid rgba(140, 116, 75, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
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

  button {
    padding: 16px 36px;
    background: #C9A96E;
    color: #0B0B0B;
    border: 1px solid #C9A96E;
    border-radius: 2px;
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.25s ease;

    &:hover {
      background: #DFBA73;
      border-color: #DFBA73;
      box-shadow: 0 4px 18px rgba(201, 169, 110, 0.35);
    }
  }
`,S=n.div`
  max-width: 1200px;
  min-height: 80vh;
  margin: 0 auto;
  padding: 40px 24px 80px;
  background-color: #0B0B0B;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px 16px 60px;
  }
`,Y=n.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #A8A8A8;
  margin-bottom: 24px;
  letter-spacing: 0.05em;
  text-transform: uppercase;

  a {
    color: #D8D2C5;
    text-decoration: none;
    transition: color 0.2s ease;
    &:hover {
      color: #C9A96E;
    }
  }

  span {
    color: #C9A96E;
    font-weight: 600;
  }
`,J=n.div`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 36px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`,Q=n.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 36px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

  @media (max-width: 576px) {
    padding: 20px 16px;
  }
`,$=n.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #F5F1E8;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(140, 116, 75, 0.2);
  padding-bottom: 12px;

  span.step {
    font-size: 0.85rem;
    font-family: 'Inter', sans-serif;
    color: #C9A96E;
    font-weight: 600;
    letter-spacing: 0.08em;
  }
`,X=n.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`,m=n.div`
  grid-column: ${({$fullWidth:l})=>l?"1 / -1":"span 1"};
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
  }

  input, select, textarea {
    padding: 12px 14px;
    font-size: 0.9rem;
    color: #F5F1E8;
    background: #111111;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 2px;
    outline: none;
    box-sizing: border-box;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s ease;

    &::placeholder {
      color: #666666;
    }

    &:focus {
      border-color: #C9A96E;
      background: #0B0B0B;
      box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.2);
    }
  }
`,K=n.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 32px 24px;
  height: fit-content;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.5rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(140, 116, 75, 0.2);
    padding-bottom: 12px;
  }
`,Z=n.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 320px;
  overflow-y: auto;
  margin-bottom: 24px;
  padding-right: 4px;
`,_=n.div`
  display: flex;
  gap: 14px;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    background: #0B0B0B;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 2px;
  }

  .info {
    flex: 1;
    .title {
      font-size: 0.88rem;
      font-weight: 600;
      color: #F5F1E8;
      line-height: 1.3;
    }
    .meta {
      font-size: 0.75rem;
      color: #A8A8A8;
      margin-top: 2px;
    }
  }

  .price {
    font-size: 0.95rem;
    font-weight: 700;
    color: #C9A96E;
  }
`,ee=n.div`
  border-top: 1px solid rgba(140, 116, 75, 0.2);
  padding-top: 16px;

  .row {
    display: flex;
    justify-content: space-between;
    font-size: 0.88rem;
    color: #D8D2C5;
    margin-bottom: 10px;

    &.total {
      border-top: 1px dashed rgba(140, 116, 75, 0.3);
      padding-top: 14px;
      margin-top: 14px;
      font-size: 1.15rem;
      font-weight: 700;
      color: #F5F1E8;

      .amount {
        color: #C9A96E;
        font-size: 1.25rem;
      }
    }
  }
`,re=n.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 0.78rem;
  color: #A8A8A8;

  svg {
    color: #C9A96E;
  }
`,R=n.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 48px 32px;
  text-align: center;
  max-width: 680px;
  margin: 40px auto;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.6);

  .check-icon {
    width: 64px;
    height: 64px;
    background: rgba(201, 169, 110, 0.1);
    border: 1px solid rgba(140, 116, 75, 0.3);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 20px;
    color: #C9A96E;
  }

  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.4rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  .order-no {
    font-family: monospace;
    font-size: 1.1rem;
    background: #111111;
    border: 1px solid rgba(140, 116, 75, 0.3);
    border-radius: 2px;
    padding: 6px 16px;
    display: inline-block;
    color: #C9A96E;
    font-weight: 700;
    margin-bottom: 24px;
  }

  p {
    font-size: 0.95rem;
    color: #A8A8A8;
    line-height: 1.6;
    margin-bottom: 32px;
  }

  .actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }
`,se=()=>{const l=W(),b=(l==null?void 0:l.cartItems)||[],N=(l==null?void 0:l.clearCart)||(()=>{}),{isAuthenticated:L,user:i,openAuthModal:G}=H(),[k,C]=f.useState(!1),[v,z]=f.useState(null),[E,I]=f.useState(""),[a,O]=f.useState({firstName:"",lastName:"",email:"",phone:"",address:"",city:"",postalCode:"",country:"United States",notes:""});f.useEffect(()=>{x.getPayPalClientId().then(t=>{t!=null&&t.clientId?I(t.clientId):I((y==null?void 0:y.VITE_PAYPAL_CLIENT_ID)||"")}).catch(()=>{I((y==null?void 0:y.VITE_PAYPAL_CLIENT_ID)||"")})},[]),f.useEffect(()=>{if(i){const t=(i.name||"").split(" ");O(r=>({...r,firstName:r.firstName||t[0]||"",lastName:r.lastName||t.slice(1).join(" ")||"",email:r.email||i.email||""}))}},[i]);const u=b.reduce((t,r)=>{var s;return t+(r.unitPrice||((s=r.product)==null?void 0:s.price)||0)*(r.quantity||1)},0),p=t=>{O({...a,[t.target.name]:t.target.value})};if(!L)return e.jsx(S,{children:e.jsxs(V,{children:[e.jsx("div",{className:"lock-icon",children:e.jsx(w,{size:32})}),e.jsx("h2",{children:"CLIENT SIGN-IN REQUIRED TO PLACE ORDER"}),e.jsx("p",{children:"To ensure lifetime warranty coverage, diamond authenticity certificates, and secure white-glove order tracking, please sign in to your AethelCarats account or create one before proceeding."}),e.jsx("button",{type:"button",onClick:()=>G("signin"),children:"SIGN IN / REGISTER TO CHECKOUT"})]})});const M=t=>{t.preventDefault();const r=document.getElementById("paypal-button-container");r&&r.scrollIntoView({behavior:"smooth"})};return v?e.jsx(S,{children:e.jsxs(R,{children:[e.jsx("div",{className:"check-icon",children:e.jsx(q,{size:36})}),e.jsx("h1",{children:"ORDER CONFIRMED"}),e.jsxs("div",{className:"order-no",children:["ORDER #",v.orderNumber||"AC-10028"]}),e.jsxs("p",{children:["Thank you for choosing ",e.jsx("strong",{children:"AethelCarats Fine Jewellery Atelier"}),". Your order has been registered and assigned to our master jewelers. A formal invoice and tracking schedule have been dispatched to ",e.jsx("strong",{children:v.customerEmail||a.email}),"."]}),e.jsxs("div",{className:"actions",children:[e.jsxs("button",{onClick:()=>window.print(),style:{padding:"14px 24px",background:"#111111",border:"1px solid rgba(140, 116, 75, 0.3)",color:"#F5F1E8",fontWeight:600,fontSize:"0.8rem",letterSpacing:"0.1em",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",borderRadius:"2px"},children:[e.jsx(U,{size:16})," PRINT INVOICE"]}),e.jsx(A,{to:"/rings",style:{padding:"14px 28px",background:"#C9A96E",color:"#0B0B0B",textDecoration:"none",fontWeight:700,fontSize:"0.8rem",letterSpacing:"0.12em",textTransform:"uppercase",borderRadius:"2px"},children:"CONTINUE SHOPPING"})]})]})}):b.length===0?e.jsx(S,{children:e.jsxs(R,{children:[e.jsx("h1",{children:"YOUR SHOPPING BAG IS EMPTY"}),e.jsx("p",{children:"Please add items to your cart before proceeding to secure white-glove checkout."}),e.jsx(A,{to:"/rings",style:{padding:"14px 28px",background:"#C9A96E",color:"#0B0B0B",textDecoration:"none",fontWeight:700,fontSize:"0.8rem",letterSpacing:"0.12em",textTransform:"uppercase",borderRadius:"2px"},children:"EXPLORE COLLECTIONS"})]})}):e.jsxs(S,{children:[e.jsxs(Y,{children:[e.jsx(A,{to:"/",children:"Home"}),e.jsx(B,{size:12}),e.jsx(A,{to:"/cart",children:"Shopping Bag"}),e.jsx(B,{size:12}),e.jsx("span",{children:"Secure Checkout"})]}),e.jsx("form",{onSubmit:M,children:e.jsxs(J,{children:[e.jsxs(Q,{children:[e.jsxs($,{children:["SHIPPING & CLIENT DETAILS",e.jsx("span",{className:"step",children:"STEP 1 OF 2"})]}),e.jsxs(X,{children:[e.jsxs(m,{children:[e.jsx("label",{children:"First Name *"}),e.jsx("input",{type:"text",name:"firstName",required:!0,value:a.firstName,onChange:p,placeholder:"e.g. Victoria"})]}),e.jsxs(m,{children:[e.jsx("label",{children:"Last Name *"}),e.jsx("input",{type:"text",name:"lastName",required:!0,value:a.lastName,onChange:p,placeholder:"e.g. Sterling"})]}),e.jsxs(m,{$fullWidth:!0,children:[e.jsx("label",{children:"Email Address (For Certificate & Tracking) *"}),e.jsx("input",{type:"email",name:"email",required:!0,value:a.email,onChange:p,placeholder:"concierge@example.com"})]}),e.jsxs(m,{$fullWidth:!0,children:[e.jsx("label",{children:"Phone Number *"}),e.jsx("input",{type:"tel",name:"phone",required:!0,value:a.phone,onChange:p,placeholder:"+1 (555) 000-0000"})]}),e.jsxs(m,{$fullWidth:!0,children:[e.jsx("label",{children:"Street Address *"}),e.jsx("input",{type:"text",name:"address",required:!0,value:a.address,onChange:p,placeholder:"123 Luxury Way, Suite 400"})]}),e.jsxs(m,{children:[e.jsx("label",{children:"City *"}),e.jsx("input",{type:"text",name:"city",required:!0,value:a.city,onChange:p,placeholder:"New York / London / Surat"})]}),e.jsxs(m,{children:[e.jsx("label",{children:"Postal / Zip Code *"}),e.jsx("input",{type:"text",name:"postalCode",required:!0,value:a.postalCode,onChange:p,placeholder:"10001 / 395006"})]})]}),e.jsxs($,{style:{marginTop:"36px"},children:["PAYMENT METHOD",e.jsx("span",{className:"step",children:"STEP 2 OF 2"})]}),e.jsxs("div",{id:"paypal-button-container",style:{background:"#111111",border:"1px solid rgba(140, 116, 75, 0.35)",padding:"24px",borderRadius:"4px",marginBottom:"20px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px",flexWrap:"wrap",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsxs("div",{style:{background:"#003087",color:"#ffffff",fontWeight:800,fontStyle:"italic",padding:"6px 14px",borderRadius:"4px",fontSize:"1.1rem",letterSpacing:"0.05em"},children:["Pay",e.jsx("span",{style:{color:"#0079C1"},children:"Pal"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.95rem",color:"#F5F1E8"},children:"PayPal Express Checkout"}),e.jsx("div",{style:{fontSize:"0.78rem",color:"#A8A8A8"},children:"Buyer Protection & 256-Bit SSL Encrypted"})]})]}),e.jsx(D,{size:24,color:"#C9A96E"})]}),e.jsxs("p",{style:{fontSize:"0.85rem",color:"#D8D2C5",lineHeight:"1.5",marginBottom:"16px"},children:["Complete your order securely via ",e.jsx("strong",{children:"PayPal Express Checkout"}),". Accepts PayPal Balance, Debit Cards, and Credit Cards worldwide."]}),E?e.jsx("div",{style:{marginTop:12},children:e.jsx(F,{options:{clientId:E,currency:"USD"},children:e.jsx(T,{style:{layout:"vertical",color:"gold",shape:"rect",label:"pay"},disabled:k,createOrder:async()=>{const t=a.email||(i==null?void 0:i.email)||"client@aethelcarats.com";try{const r=await x.createPayPalOrder({amount:u,currency:"USD",description:`AethelCarats Order for ${t}`});if(!(r!=null&&r.id))throw new Error("PayPal payment initialization failed. Please try again.");return r.id}catch(r){throw console.error("createPayPalOrder error:",r),r}},onApprove:async t=>{C(!0);try{const r=`${a.firstName} ${a.lastName}`.trim()||(i==null?void 0:i.name)||"Valued Client",s=a.email||(i==null?void 0:i.email)||"client@aethelcarats.com",g=a.address?`${a.address}, ${a.city||""}, ${a.postalCode||""}, ${a.country||"USA"}`:"PayPal Verified Shipping Address",h={customerName:r,customerEmail:s,customerPhone:a.phone||"",shippingAddress:g,items:b.map(o=>{var c,P,j;return{productId:o.id||o.productId,productName:o.productName||((c=o.product)==null?void 0:c.title)||o.title||"Handcrafted Jewellery Piece",sku:o.sku||((P=o.product)==null?void 0:P.sku)||"AC-PIECE",variantInfo:o.selectedMetal?`${o.selectedMetal} | Size: ${o.selectedSize||"Standard"}`:null,unitPrice:o.unitPrice||((j=o.product)==null?void 0:j.price)||0,quantity:o.quantity||1}}),subtotal:u,shippingFee:0,tax:0,discount:0,currency:"USD",notes:`Paid via PayPal Express (PayPal Order ID: ${t.orderID}). ${a.notes||""}`.trim()},d=await x.createPublicOrder(h);await x.capturePayPalOrder({paypalOrderId:t.orderID,dbOrderId:d.id}),z(d),N()}catch(r){console.error("PayPal processing error:",r),alert((r==null?void 0:r.message)||"Payment approval succeeded but order recording encountered an issue.")}finally{C(!1)}},onError:t=>{console.error("PayPal Button Error:",t),alert("PayPal Payment Error: Please check that your Live PayPal Client ID & Secret are valid in Admin Settings.")}})})}):e.jsxs("div",{style:{marginTop:12,padding:14,background:"#151515",border:"1px solid rgba(140, 116, 75, 0.3)",borderRadius:4,textAlign:"center",fontSize:"0.82rem",color:"#A8A8A8"},children:[e.jsx(w,{size:18,color:"#C9A96E",style:{marginBottom:4}}),e.jsx("div",{style:{fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#F5F1E8"},children:"PayPal Payment Gateway Loading"})]})]})]}),e.jsxs(K,{children:[e.jsx("h3",{children:"ORDER SUMMARY"}),e.jsx(Z,{children:b.map((t,r)=>{var s,g,h,d,o,c;return e.jsxs(_,{children:[e.jsx("img",{src:t.image||((h=(g=(s=t.product)==null?void 0:s.images)==null?void 0:g[0])==null?void 0:h.url)||((d=t.diamond)==null?void 0:d.imageUrl)||"/assets/diamonds/Round.svg",alt:t.productName}),e.jsxs("div",{className:"info",children:[e.jsx("div",{className:"title",children:t.productName||((o=t.product)==null?void 0:o.title)||"Handcrafted Ring"}),e.jsxs("div",{className:"meta",children:["Qty: ",t.quantity||1," ",t.selectedMetal?`• ${t.selectedMetal}`:""]})]}),e.jsxs("div",{className:"price",children:["$",((t.unitPrice||((c=t.product)==null?void 0:c.price)||0)*(t.quantity||1)).toLocaleString()]})]},r)})}),e.jsxs(ee,{children:[e.jsxs("div",{className:"row",children:[e.jsx("span",{children:"Subtotal"}),e.jsxs("span",{children:["$",u.toLocaleString()]})]}),e.jsxs("div",{className:"row",children:[e.jsx("span",{children:"Insured Express Shipping"}),e.jsx("span",{style:{color:"#C9A96E",fontWeight:600},children:"COMPLIMENTARY"})]}),e.jsxs("div",{className:"row total",children:[e.jsx("span",{children:"Total Due"}),e.jsxs("span",{className:"amount",children:["$",u.toLocaleString()]})]})]}),E?e.jsx("div",{style:{marginTop:20},children:e.jsx(F,{options:{clientId:E,currency:"USD"},children:e.jsx(T,{style:{layout:"vertical",color:"gold",shape:"rect",label:"pay"},disabled:k,createOrder:async()=>{const t=a.email||(i==null?void 0:i.email)||"client@aethelcarats.com";try{const r=await x.createPayPalOrder({amount:u,currency:"USD",description:`AethelCarats Order for ${t}`});if(!(r!=null&&r.id))throw new Error("PayPal payment initialization failed. Please try again.");return r.id}catch(r){throw console.error("createPayPalOrder error:",r),r}},onApprove:async t=>{C(!0);try{const r=`${a.firstName} ${a.lastName}`.trim()||(i==null?void 0:i.name)||"Valued Client",s=a.email||(i==null?void 0:i.email)||"client@aethelcarats.com",g=a.address?`${a.address}, ${a.city||""}, ${a.postalCode||""}, ${a.country||"USA"}`:"PayPal Verified Shipping Address",h={customerName:r,customerEmail:s,customerPhone:a.phone||"",shippingAddress:g,items:b.map(o=>{var c,P,j;return{productId:o.id||o.productId,productName:o.productName||((c=o.product)==null?void 0:c.title)||o.title||"Handcrafted Jewellery Piece",sku:o.sku||((P=o.product)==null?void 0:P.sku)||"AC-PIECE",variantInfo:o.selectedMetal?`${o.selectedMetal} | Size: ${o.selectedSize||"Standard"}`:null,unitPrice:o.unitPrice||((j=o.product)==null?void 0:j.price)||0,quantity:o.quantity||1}}),subtotal:u,shippingFee:0,tax:0,discount:0,currency:"USD",notes:`Paid via PayPal Express (PayPal Order ID: ${t.orderID}). ${a.notes||""}`.trim()},d=await x.createPublicOrder(h);await x.capturePayPalOrder({paypalOrderId:t.orderID,dbOrderId:d.id}),z(d),N()}catch(r){console.error("PayPal processing error:",r),alert((r==null?void 0:r.message)||"Payment approval succeeded but order recording encountered an issue.")}finally{C(!1)}},onError:t=>{console.error("PayPal Button Error:",t),alert("PayPal Payment Error: Please check that your Live PayPal Client ID & Secret are valid in Admin Settings.")}})})}):e.jsxs("div",{style:{marginTop:20,padding:16,background:"#111111",border:"1px solid rgba(140, 116, 75, 0.3)",borderRadius:4,textAlign:"center",fontSize:"0.82rem",color:"#A8A8A8"},children:[e.jsx(w,{size:18,color:"#C9A96E",style:{marginBottom:6}}),e.jsx("div",{style:{fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#F5F1E8"},children:"PayPal Payment Gateway"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"#A8A8A8",marginTop:4},children:"Please configure PayPal credentials in Admin Settings."})]}),e.jsxs(re,{children:[e.jsx(D,{size:16})," 256-Bit SSL Encrypted & Fully Insured Transit"]})]})]})})]})};export{se as CheckoutPage};
