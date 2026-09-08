import{r as f,j as e,y as T,a as J,aA as D,aY as K,f as w,l as _,a6 as Q,v as O,aZ as W,a_ as L}from"./react-vendor-BsBv4awM.js";import{g as l}from"./ui-vendor-C0FaE403.js";import{u as Z,e as X,a as x}from"./admin-pages-COWs66LI.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const m={},ee=l.div`
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
`,N=l.div`
  max-width: 1200px;
  min-height: 80vh;
  margin: 0 auto;
  padding: 40px 24px 80px;
  background-color: #0B0B0B;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px 16px 60px;
  }
`,re=l.div`
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
`,te=l.div`
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 36px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`,ae=l.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 36px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

  @media (max-width: 576px) {
    padding: 20px 16px;
  }
`,M=l.h2`
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
`,ne=l.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`,P=l.div`
  grid-column: ${({$fullWidth:u})=>u?"1 / -1":"span 1"};
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
`,ie=l.div`
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
`,oe=l.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 320px;
  overflow-y: auto;
  margin-bottom: 24px;
  padding-right: 4px;
`,se=l.div`
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
`,le=l.div`
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
`,de=l.div`
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
`,G=l.div`
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
`,ge=()=>{var $;const u=Z(),C=(u==null?void 0:u.cartItems)||[],z=(u==null?void 0:u.clearCart)||(()=>{}),{isAuthenticated:U,user:o,openAuthModal:q}=X(),[S,E]=f.useState(!1),[A,B]=f.useState(null),[I,k]=f.useState(""),[i,H]=f.useState({}),[b,F]=f.useState("paypal"),[a,R]=f.useState({firstName:"",lastName:"",email:"",phone:"",address:"",city:"",postalCode:"",country:"United States",notes:""});f.useEffect(()=>{x.getPublicPaymentConfig().then(r=>{r&&(H(r),r.paypal_client_id?k(r.paypal_client_id):k((m==null?void 0:m.VITE_PAYPAL_CLIENT_ID)||""),r.paypal_enabled==="false"&&r.bank_transfer_enabled!=="false"&&F("bank_wire"))}).catch(()=>{x.getPayPalClientId().then(r=>{r!=null&&r.clientId?k(r.clientId):k((m==null?void 0:m.VITE_PAYPAL_CLIENT_ID)||"")}).catch(()=>{k((m==null?void 0:m.VITE_PAYPAL_CLIENT_ID)||"")})})},[]),f.useEffect(()=>{if(o){const r=(o.name||"").split(" ");R(t=>({...t,firstName:t.firstName||r[0]||"",lastName:t.lastName||r.slice(1).join(" ")||"",email:t.email||o.email||""}))}},[o]);const p=C.reduce((r,t)=>{var d;return r+(t.unitPrice||((d=t.product)==null?void 0:d.price)||0)*(t.quantity||1)},0),V=async()=>{if(!a.firstName||!a.email||!a.address){alert("Please fill in your shipping details (First Name, Email, and Address) before completing your order.");return}E(!0);try{const r=`${a.firstName} ${a.lastName}`.trim()||(o==null?void 0:o.name)||"Valued Client",t=a.email||(o==null?void 0:o.email)||"client@aethelcarats.com",d=`${a.address}, ${a.city||""}, ${a.postalCode||""}, ${a.country||"USA"}`,g={customerName:r,customerEmail:t,customerPhone:a.phone||"",shippingAddress:d,items:C.map(s=>{var n,c,y;return{productId:s.id||s.productId,productName:s.productName||((n=s.product)==null?void 0:n.title)||s.title||"Handcrafted Jewellery Piece",sku:s.sku||((c=s.product)==null?void 0:c.sku)||"AC-PIECE",variantInfo:s.selectedMetal?`${s.selectedMetal} | Size: ${s.selectedSize||"Standard"}`:null,unitPrice:s.unitPrice||((y=s.product)==null?void 0:y.price)||0,quantity:s.quantity||1}}),subtotal:p,shippingFee:0,tax:0,discount:0,currency:i.default_currency||"USD",notes:`Selected Payment Method: Direct Bank Wire Transfer. ${a.notes||""}`.trim()},h=await x.createPublicOrder(g);B(h),z()}catch(r){console.error("Bank wire order error:",r),alert((r==null?void 0:r.message)||"Failed to create order via bank wire. Please try again.")}finally{E(!1)}},j=r=>{R({...a,[r.target.name]:r.target.value})};if(!U)return e.jsx(N,{children:e.jsxs(ee,{children:[e.jsx("div",{className:"lock-icon",children:e.jsx(T,{size:32})}),e.jsx("h2",{children:"CLIENT SIGN-IN REQUIRED TO PLACE ORDER"}),e.jsx("p",{children:"To ensure lifetime warranty coverage, diamond authenticity certificates, and secure white-glove order tracking, please sign in to your AethelCarats account or create one before proceeding."}),e.jsx("button",{type:"button",onClick:()=>q("signin"),children:"SIGN IN / REGISTER TO CHECKOUT"})]})});const Y=r=>{r.preventDefault();const t=document.getElementById("paypal-button-container");t&&t.scrollIntoView({behavior:"smooth"})};return A?e.jsx(N,{children:e.jsxs(G,{children:[e.jsx("div",{className:"check-icon",children:e.jsx(J,{size:36})}),e.jsx("h1",{children:"ORDER CONFIRMED"}),e.jsxs("div",{className:"order-no",children:["ORDER #",A.orderNumber||"AC-10028"]}),e.jsxs("p",{children:["Thank you for choosing ",e.jsx("strong",{children:"AethelCarats Fine Jewellery Atelier"}),". Your order has been registered and assigned to our master jewelers. A formal invoice and tracking schedule have been dispatched to ",e.jsx("strong",{children:A.customerEmail||a.email}),"."]}),(($=A.notes)==null?void 0:$.includes("Bank Wire"))&&e.jsxs("div",{style:{background:"#141414",border:"1px solid rgba(201, 169, 110, 0.4)",borderRadius:"4px",padding:"24px",margin:"24px 0",textAlign:"left"},children:[e.jsxs("div",{style:{color:"#C9A96E",fontWeight:700,fontSize:"0.95rem",marginBottom:"12px",display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx(D,{size:18})," WIRE REMITTANCE INSTRUCTIONS"]}),e.jsxs("p",{style:{fontSize:"0.82rem",color:"#D8D2C5",marginBottom:"16px",lineHeight:"1.5"},children:["Please transfer the amount of ",e.jsxs("strong",{children:["$",(A.totalAmount||p).toLocaleString()]})," referencing Order ",e.jsxs("strong",{children:["#",A.orderNumber]})," in your wire remarks:"]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(220px, 1fr))",gap:"12px",fontSize:"0.85rem",color:"#F5F1E8"},children:[i.bank_name&&e.jsxs("div",{children:[e.jsx("span",{style:{color:"#888"},children:"Bank Name:"}),e.jsx("br",{}),e.jsx("strong",{children:i.bank_name})]}),i.bank_account_name&&e.jsxs("div",{children:[e.jsx("span",{style:{color:"#888"},children:"Beneficiary:"}),e.jsx("br",{}),e.jsx("strong",{children:i.bank_account_name})]}),i.bank_account_number&&e.jsxs("div",{children:[e.jsx("span",{style:{color:"#888"},children:"Account / IBAN:"}),e.jsx("br",{}),e.jsx("strong",{children:i.bank_account_number})]}),i.bank_swift_bic&&e.jsxs("div",{children:[e.jsx("span",{style:{color:"#888"},children:"SWIFT / BIC:"}),e.jsx("br",{}),e.jsx("strong",{children:i.bank_swift_bic})]}),i.bank_routing_code&&e.jsxs("div",{children:[e.jsx("span",{style:{color:"#888"},children:"IFSC / Routing:"}),e.jsx("br",{}),e.jsx("strong",{children:i.bank_routing_code})]}),i.bank_branch_address&&e.jsxs("div",{children:[e.jsx("span",{style:{color:"#888"},children:"Branch:"}),e.jsx("br",{}),e.jsx("strong",{children:i.bank_branch_address})]})]}),i.bank_payment_instructions&&e.jsx("div",{style:{marginTop:"16px",paddingTop:"12px",borderTop:"1px solid rgba(255,255,255,0.08)",fontSize:"0.8rem",color:"#B0A898"},children:i.bank_payment_instructions})]}),e.jsxs("div",{className:"actions",children:[e.jsxs("button",{onClick:()=>window.print(),style:{padding:"14px 24px",background:"#111111",border:"1px solid rgba(140, 116, 75, 0.3)",color:"#F5F1E8",fontWeight:600,fontSize:"0.8rem",letterSpacing:"0.1em",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px",borderRadius:"2px"},children:[e.jsx(K,{size:16})," PRINT INVOICE"]}),e.jsx(w,{to:"/rings",style:{padding:"14px 28px",background:"#C9A96E",color:"#0B0B0B",textDecoration:"none",fontWeight:700,fontSize:"0.8rem",letterSpacing:"0.12em",textTransform:"uppercase",borderRadius:"2px"},children:"CONTINUE SHOPPING"})]})]})}):C.length===0?e.jsx(N,{children:e.jsxs(G,{children:[e.jsx("h1",{children:"YOUR SHOPPING BAG IS EMPTY"}),e.jsx("p",{children:"Please add items to your cart before proceeding to secure white-glove checkout."}),e.jsx(w,{to:"/rings",style:{padding:"14px 28px",background:"#C9A96E",color:"#0B0B0B",textDecoration:"none",fontWeight:700,fontSize:"0.8rem",letterSpacing:"0.12em",textTransform:"uppercase",borderRadius:"2px"},children:"EXPLORE COLLECTIONS"})]})}):e.jsxs(N,{children:[e.jsxs(re,{children:[e.jsx(w,{to:"/",children:"Home"}),e.jsx(_,{size:12}),e.jsx(w,{to:"/cart",children:"Shopping Bag"}),e.jsx(_,{size:12}),e.jsx("span",{children:"Secure Checkout"})]}),e.jsx("form",{onSubmit:Y,children:e.jsxs(te,{children:[e.jsxs(ae,{children:[e.jsxs(M,{children:["SHIPPING & CLIENT DETAILS",e.jsx("span",{className:"step",children:"STEP 1 OF 2"})]}),e.jsxs(ne,{children:[e.jsxs(P,{children:[e.jsx("label",{children:"First Name *"}),e.jsx("input",{type:"text",name:"firstName",required:!0,value:a.firstName,onChange:j,placeholder:"e.g. Victoria"})]}),e.jsxs(P,{children:[e.jsx("label",{children:"Last Name *"}),e.jsx("input",{type:"text",name:"lastName",required:!0,value:a.lastName,onChange:j,placeholder:"e.g. Sterling"})]}),e.jsxs(P,{$fullWidth:!0,children:[e.jsx("label",{children:"Email Address (For Certificate & Tracking) *"}),e.jsx("input",{type:"email",name:"email",required:!0,value:a.email,onChange:j,placeholder:"concierge@example.com"})]}),e.jsxs(P,{$fullWidth:!0,children:[e.jsx("label",{children:"Phone Number *"}),e.jsx("input",{type:"tel",name:"phone",required:!0,value:a.phone,onChange:j,placeholder:"+1 (555) 000-0000"})]}),e.jsxs(P,{$fullWidth:!0,children:[e.jsx("label",{children:"Street Address *"}),e.jsx("input",{type:"text",name:"address",required:!0,value:a.address,onChange:j,placeholder:"123 Luxury Way, Suite 400"})]}),e.jsxs(P,{children:[e.jsx("label",{children:"City *"}),e.jsx("input",{type:"text",name:"city",required:!0,value:a.city,onChange:j,placeholder:"New York / London / Surat"})]}),e.jsxs(P,{children:[e.jsx("label",{children:"Postal / Zip Code *"}),e.jsx("input",{type:"text",name:"postalCode",required:!0,value:a.postalCode,onChange:j,placeholder:"10001 / 395006"})]})]}),e.jsxs(M,{style:{marginTop:"36px"},children:["PAYMENT METHOD",e.jsx("span",{className:"step",children:"STEP 2 OF 2"})]}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:i.bank_transfer_enabled!=="false"?"1fr 1fr":"1fr",gap:"14px",marginBottom:"20px"},children:[e.jsxs("div",{onClick:()=>F("paypal"),style:{background:b==="paypal"?"rgba(201, 169, 110, 0.15)":"#111111",border:b==="paypal"?"1.5px solid #C9A96E":"1px solid rgba(140, 116, 75, 0.25)",borderRadius:"4px",padding:"16px",cursor:"pointer",display:"flex",alignItems:"center",gap:"12px",transition:"all 0.2s"},children:[e.jsx(Q,{size:20,color:b==="paypal"?"#C9A96E":"#888"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.88rem",fontWeight:700,color:"#F5F1E8"},children:"PayPal & Cards"}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#999"},children:"Debit, Credit, PayPal Balance"})]})]}),i.bank_transfer_enabled!=="false"&&e.jsxs("div",{onClick:()=>F("bank_wire"),style:{background:b==="bank_wire"?"rgba(201, 169, 110, 0.15)":"#111111",border:b==="bank_wire"?"1.5px solid #C9A96E":"1px solid rgba(140, 116, 75, 0.25)",borderRadius:"4px",padding:"16px",cursor:"pointer",display:"flex",alignItems:"center",gap:"12px",transition:"all 0.2s"},children:[e.jsx(D,{size:20,color:b==="bank_wire"?"#C9A96E":"#888"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:"0.88rem",fontWeight:700,color:"#F5F1E8"},children:"Direct Bank Wire"}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#999"},children:"Direct Atelier Wire / SWIFT"})]})]})]}),b==="bank_wire"?e.jsxs("div",{style:{background:"#111111",border:"1px solid rgba(140, 116, 75, 0.35)",padding:"24px",borderRadius:"4px",marginBottom:"20px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx(D,{size:22,color:"#C9A96E"}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.95rem",color:"#F5F1E8"},children:"Direct Bank Wire Remittance"}),e.jsx("div",{style:{fontSize:"0.78rem",color:"#A8A8A8"},children:"Safe & Verified Wire Transfer for Fine Jewellery"})]})]}),e.jsx(O,{size:22,color:"#C9A96E"})]}),e.jsx("p",{style:{fontSize:"0.82rem",color:"#D8D2C5",lineHeight:"1.5",marginBottom:"16px"},children:"Place your order now. You will receive an official Atelier invoice with these banking details to initiate payment directly from your bank:"}),e.jsxs("div",{style:{background:"#151515",border:"1px solid rgba(201, 169, 110, 0.25)",borderRadius:"4px",padding:"16px",marginBottom:"20px",display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(200px, 1fr))",gap:"12px",fontSize:"0.82rem"},children:[i.bank_name&&e.jsxs("div",{children:[e.jsx("span",{style:{color:"#888",fontSize:"0.72rem",textTransform:"uppercase"},children:"Bank Name"}),e.jsx("div",{style:{color:"#F5F1E8",fontWeight:600},children:i.bank_name})]}),i.bank_account_name&&e.jsxs("div",{children:[e.jsx("span",{style:{color:"#888",fontSize:"0.72rem",textTransform:"uppercase"},children:"Beneficiary"}),e.jsx("div",{style:{color:"#F5F1E8",fontWeight:600},children:i.bank_account_name})]}),i.bank_account_number&&e.jsxs("div",{children:[e.jsx("span",{style:{color:"#888",fontSize:"0.72rem",textTransform:"uppercase"},children:"Account / IBAN"}),e.jsx("div",{style:{color:"#F5F1E8",fontWeight:600},children:i.bank_account_number})]}),i.bank_swift_bic&&e.jsxs("div",{children:[e.jsx("span",{style:{color:"#888",fontSize:"0.72rem",textTransform:"uppercase"},children:"SWIFT / BIC"}),e.jsx("div",{style:{color:"#F5F1E8",fontWeight:600},children:i.bank_swift_bic})]}),i.bank_routing_code&&e.jsxs("div",{children:[e.jsx("span",{style:{color:"#888",fontSize:"0.72rem",textTransform:"uppercase"},children:"IFSC / Routing"}),e.jsx("div",{style:{color:"#F5F1E8",fontWeight:600},children:i.bank_routing_code})]})]}),i.bank_payment_instructions&&e.jsxs("p",{style:{fontSize:"0.78rem",color:"#B0A898",marginBottom:"20px",fontStyle:"italic"},children:["Note: ",i.bank_payment_instructions]}),e.jsx("button",{type:"button",onClick:V,disabled:S,style:{width:"100%",padding:"16px",background:"#C9A96E",color:"#0B0B0B",border:"none",borderRadius:"2px",fontWeight:700,fontSize:"0.85rem",letterSpacing:"0.1em",textTransform:"uppercase",cursor:S?"not-allowed":"pointer",opacity:S?.7:1,transition:"all 0.2s"},children:S?"PROCESSING ORDER...":`CONFIRM ORDER VIA BANK WIRE ($${p.toLocaleString()})`})]}):e.jsxs("div",{id:"paypal-button-container",style:{background:"#111111",border:"1px solid rgba(140, 116, 75, 0.35)",padding:"24px",borderRadius:"4px",marginBottom:"20px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"16px",flexWrap:"wrap",gap:"12px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[e.jsxs("div",{style:{background:"#003087",color:"#ffffff",fontWeight:800,fontStyle:"italic",padding:"6px 14px",borderRadius:"4px",fontSize:"1.1rem",letterSpacing:"0.05em"},children:["Pay",e.jsx("span",{style:{color:"#0079C1"},children:"Pal"})]}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:700,fontSize:"0.95rem",color:"#F5F1E8"},children:"PayPal Express Checkout"}),e.jsx("div",{style:{fontSize:"0.78rem",color:"#A8A8A8"},children:"Buyer Protection & 256-Bit SSL Encrypted"})]})]}),e.jsx(O,{size:24,color:"#C9A96E"})]}),e.jsxs("p",{style:{fontSize:"0.85rem",color:"#D8D2C5",lineHeight:"1.5",marginBottom:"16px"},children:["Complete your order securely via ",e.jsx("strong",{children:"PayPal Express Checkout"}),". Accepts PayPal Balance, Debit Cards, and Credit Cards worldwide."]}),I?e.jsx("div",{style:{marginTop:12},children:e.jsx(W,{options:{clientId:I,currency:"USD"},children:e.jsx(L,{style:{layout:"vertical",color:"gold",shape:"rect",label:"pay"},disabled:S,createOrder:async()=>{const r=a.email||(o==null?void 0:o.email)||"client@aethelcarats.com";try{const t=await x.createPayPalOrder({amount:p,currency:"USD",description:`AethelCarats Order for ${r}`});if(!(t!=null&&t.id))throw new Error("PayPal payment initialization failed. Please try again.");return t.id}catch(t){throw console.error("createPayPalOrder error:",t),t}},onApprove:async r=>{E(!0);try{const t=`${a.firstName} ${a.lastName}`.trim()||(o==null?void 0:o.name)||"Valued Client",d=a.email||(o==null?void 0:o.email)||"client@aethelcarats.com",g=a.address?`${a.address}, ${a.city||""}, ${a.postalCode||""}, ${a.country||"USA"}`:"PayPal Verified Shipping Address",h={customerName:t,customerEmail:d,customerPhone:a.phone||"",shippingAddress:g,items:C.map(n=>{var c,y,v;return{productId:n.id||n.productId,productName:n.productName||((c=n.product)==null?void 0:c.title)||n.title||"Handcrafted Jewellery Piece",sku:n.sku||((y=n.product)==null?void 0:y.sku)||"AC-PIECE",variantInfo:n.selectedMetal?`${n.selectedMetal} | Size: ${n.selectedSize||"Standard"}`:null,unitPrice:n.unitPrice||((v=n.product)==null?void 0:v.price)||0,quantity:n.quantity||1}}),subtotal:p,shippingFee:0,tax:0,discount:0,currency:"USD",notes:`Paid via PayPal Express (PayPal Order ID: ${r.orderID}). ${a.notes||""}`.trim()},s=await x.createPublicOrder(h);await x.capturePayPalOrder({paypalOrderId:r.orderID,dbOrderId:s.id}),B(s),z()}catch(t){console.error("PayPal processing error:",t),alert((t==null?void 0:t.message)||"Payment approval succeeded but order recording encountered an issue.")}finally{E(!1)}},onError:r=>{console.error("PayPal Button Error:",r),alert("PayPal Payment Error: Please check that your Live PayPal Client ID & Secret are valid in Admin Settings.")}})})}):e.jsxs("div",{style:{marginTop:12,padding:14,background:"#151515",border:"1px solid rgba(140, 116, 75, 0.3)",borderRadius:4,textAlign:"center",fontSize:"0.82rem",color:"#A8A8A8"},children:[e.jsx(T,{size:18,color:"#C9A96E",style:{marginBottom:4}}),e.jsx("div",{style:{fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#F5F1E8"},children:"PayPal Payment Gateway Loading"})]})]})]}),e.jsxs(ie,{children:[e.jsx("h3",{children:"ORDER SUMMARY"}),e.jsx(oe,{children:C.map((r,t)=>{var d,g,h,s,n,c;return e.jsxs(se,{children:[e.jsx("img",{src:r.image||((h=(g=(d=r.product)==null?void 0:d.images)==null?void 0:g[0])==null?void 0:h.url)||((s=r.diamond)==null?void 0:s.imageUrl)||"/assets/diamonds/Round.svg",alt:r.productName}),e.jsxs("div",{className:"info",children:[e.jsx("div",{className:"title",children:r.productName||((n=r.product)==null?void 0:n.title)||"Handcrafted Ring"}),e.jsxs("div",{className:"meta",children:["Qty: ",r.quantity||1," ",r.selectedMetal?`• ${r.selectedMetal}`:""]})]}),e.jsxs("div",{className:"price",children:["$",((r.unitPrice||((c=r.product)==null?void 0:c.price)||0)*(r.quantity||1)).toLocaleString()]})]},t)})}),e.jsxs(le,{children:[e.jsxs("div",{className:"row",children:[e.jsx("span",{children:"Subtotal"}),e.jsxs("span",{children:["$",p.toLocaleString()]})]}),e.jsxs("div",{className:"row",children:[e.jsx("span",{children:"Insured Express Shipping"}),e.jsx("span",{style:{color:"#C9A96E",fontWeight:600},children:"COMPLIMENTARY"})]}),e.jsxs("div",{className:"row total",children:[e.jsx("span",{children:"Total Due"}),e.jsxs("span",{className:"amount",children:["$",p.toLocaleString()]})]})]}),I?e.jsx("div",{style:{marginTop:20},children:e.jsx(W,{options:{clientId:I,currency:"USD"},children:e.jsx(L,{style:{layout:"vertical",color:"gold",shape:"rect",label:"pay"},disabled:S,createOrder:async()=>{const r=a.email||(o==null?void 0:o.email)||"client@aethelcarats.com";try{const t=await x.createPayPalOrder({amount:p,currency:"USD",description:`AethelCarats Order for ${r}`});if(!(t!=null&&t.id))throw new Error("PayPal payment initialization failed. Please try again.");return t.id}catch(t){throw console.error("createPayPalOrder error:",t),t}},onApprove:async r=>{E(!0);try{const t=`${a.firstName} ${a.lastName}`.trim()||(o==null?void 0:o.name)||"Valued Client",d=a.email||(o==null?void 0:o.email)||"client@aethelcarats.com",g=a.address?`${a.address}, ${a.city||""}, ${a.postalCode||""}, ${a.country||"USA"}`:"PayPal Verified Shipping Address",h={customerName:t,customerEmail:d,customerPhone:a.phone||"",shippingAddress:g,items:C.map(n=>{var c,y,v;return{productId:n.id||n.productId,productName:n.productName||((c=n.product)==null?void 0:c.title)||n.title||"Handcrafted Jewellery Piece",sku:n.sku||((y=n.product)==null?void 0:y.sku)||"AC-PIECE",variantInfo:n.selectedMetal?`${n.selectedMetal} | Size: ${n.selectedSize||"Standard"}`:null,unitPrice:n.unitPrice||((v=n.product)==null?void 0:v.price)||0,quantity:n.quantity||1}}),subtotal:p,shippingFee:0,tax:0,discount:0,currency:"USD",notes:`Paid via PayPal Express (PayPal Order ID: ${r.orderID}). ${a.notes||""}`.trim()},s=await x.createPublicOrder(h);await x.capturePayPalOrder({paypalOrderId:r.orderID,dbOrderId:s.id}),B(s),z()}catch(t){console.error("PayPal processing error:",t),alert((t==null?void 0:t.message)||"Payment approval succeeded but order recording encountered an issue.")}finally{E(!1)}},onError:r=>{console.error("PayPal Button Error:",r),alert("PayPal Payment Error: Please check that your Live PayPal Client ID & Secret are valid in Admin Settings.")}})})}):e.jsxs("div",{style:{marginTop:20,padding:16,background:"#111111",border:"1px solid rgba(140, 116, 75, 0.3)",borderRadius:4,textAlign:"center",fontSize:"0.82rem",color:"#A8A8A8"},children:[e.jsx(T,{size:18,color:"#C9A96E",style:{marginBottom:6}}),e.jsx("div",{style:{fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#F5F1E8"},children:"PayPal Payment Gateway"}),e.jsx("div",{style:{fontSize:"0.75rem",color:"#A8A8A8",marginTop:4},children:"Please configure PayPal credentials in Admin Settings."})]}),e.jsxs(de,{children:[e.jsx(O,{size:16})," 256-Bit SSL Encrypted & Fully Insured Transit"]})]})]})})]})};export{ge as CheckoutPage};
