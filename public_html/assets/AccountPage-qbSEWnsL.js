import{r as i,u as $,e as U,j as e,L as M,k as G,C as W,w as C,d as B,f as F}from"./react-vendor-DSaFutMS.js";import{g as n}from"./ui-vendor-DguFyjS7.js";import{a as u}from"./admin-pages-CD1vrA8d.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const H=n.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  background-color: #f9f7f2;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 16px 60px;
  }
`,q=n.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
  padding-bottom: 20px;
  border-bottom: 1px solid #d9d3c7;

  .welcome {
    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.4rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #1f1f1f;
      margin-bottom: 4px;
    }

    p {
      font-size: 0.95rem;
      color: #6b6b6b;
    }
  }

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`,V=n.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background-color: #ffffff;
  color: #1f1f1f;
  border: 1px solid #d9d3c7;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #1f1f1f;
    color: #ffffff;
    border-color: #1f1f1f;
  }
`,Y=n.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.8rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #1f1f1f;
  margin: 40px 0 20px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`,J=n.div`
  background: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 16px rgba(31, 31, 31, 0.03);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #1f1f1f;
    margin-bottom: 12px;
  }

  .form-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    input {
      flex: 1;
      min-width: 220px;
      padding: 12px 14px;
      border: 1px solid #d9d3c7;
      background: #faf8f5;
      font-size: 0.88rem;
      outline: none;

      &:focus {
        border-color: #c9a45c;
        background: #ffffff;
      }
    }

    button {
      padding: 12px 24px;
      background: #1f1f1f;
      color: #ffffff;
      border: none;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;

      &:hover {
        background: #c9a45c;
      }
    }
  }
`,D=n.div`
  background: #ffffff;
  border: 1px solid #d9d3c7;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 16px rgba(31, 31, 31, 0.03);

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f2ede4;
    padding-bottom: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;

    .no {
      font-family: monospace;
      font-weight: 700;
      font-size: 1.1rem;
      color: #1f1f1f;
    }

    .date {
      font-size: 0.82rem;
      color: #777;
    }

    .status-badge {
      padding: 4px 12px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-radius: 12px;
      background: #faf5eb;
      color: #c9a45c;
      border: 1px solid #e8e3d9;

      &.delivered {
        background: #e6f4ea;
        color: #137333;
        border-color: #ceead6;
      }
      &.manufacturing {
        background: #e8f0fe;
        color: #1a73e8;
        border-color: #d2e3fc;
      }
      &.dispatched {
        background: #feefc3;
        color: #b06000;
        border-color: #fce8e6;
      }
    }
  }
`,I=n.div`
  background: #faf8f5;
  border: 1px solid #e8e3d9;
  border-left: 4px solid #c9a45c;
  padding: 16px 20px;
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;

  .courier-info {
    display: flex;
    align-items: center;
    gap: 14px;

    .icon-wrap {
      width: 42px;
      height: 42px;
      background: #ffffff;
      border: 1px solid #d9d3c7;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #c9a45c;
      flex-shrink: 0;
    }

    .carrier {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #77736c;
    }

    .tracking-no {
      font-family: monospace;
      font-size: 1.05rem;
      font-weight: 700;
      color: #1f1f1f;
      margin-top: 2px;
    }
  }
`,K=n.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin: 24px 0 28px;
  position: relative;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`,d=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;

  .step-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${({$completed:a})=>a?"#1f1f1f":"#faf8f5"};
    color: ${({$completed:a})=>a?"#c9a45c":"#a39e93"};
    border: 2px solid ${({$completed:a})=>a?"#1f1f1f":"#d9d3c7"};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    font-weight: 700;
  }

  .step-label {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: ${({$completed:a})=>a?"#1f1f1f":"#8c877d"};
  }

  @media (max-width: 640px) {
    flex-direction: row;
    text-align: left;
  }
`,L=n.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.88rem;
    color: #33312e;
    padding: 8px 0;
    border-bottom: 1px dashed #f2ede4;

    .name {
      font-weight: 600;
    }
    .price {
      font-weight: 700;
      color: #c9a45c;
    }
  }
`,se=()=>{const[a,h]=i.useState(null),[m,O]=i.useState([]),[T,b]=i.useState(!1),[x,R]=i.useState(""),[j,A]=i.useState(""),[o,y]=i.useState(null),[v,N]=i.useState(!1),[k,S]=i.useState(""),p=$(),f=U();i.useEffect(()=>{try{const r=localStorage.getItem("fj_customer_user"),s=localStorage.getItem("floksy_token")||localStorage.getItem("fj_admin_token");if(r){const t=JSON.parse(r);h(t),w(t.email)}else if(s){const t={email:"client@floksyjewel.com",name:"Valued Client"};h(t),w(t.email)}else p("/login")}catch{p("/login")}},[p]),i.useEffect(()=>{if(f.hash==="#my-orders"||f.hash==="#orders"){const r=document.getElementById("my-orders");r&&setTimeout(()=>{r.scrollIntoView({behavior:"smooth",block:"start"})},150)}},[f.hash,f.pathname]);const w=async r=>{b(!0);try{const s=localStorage.getItem("fj_last_order_email");let t=await u.getMyOrders(r);if((!t||t.length===0)&&s&&s!==r){const c=await u.getMyOrders(s);Array.isArray(c)&&c.length>0&&(t=c)}O(Array.isArray(t)?t:[])}catch(s){console.error(s)}finally{b(!1)}},z=async r=>{var s,t,c;if(r.preventDefault(),!!x){N(!0),S(""),y(null);try{const l=j||((s=a==null?void 0:a.email)!=null&&s.includes("@")?a.email:localStorage.getItem("fj_last_order_email")||""),g=await u.trackPublicOrder(x,l);y(g)}catch(l){S(((c=(t=l.response)==null?void 0:t.data)==null?void 0:c.message)||"Order not found. Please check your order number.")}finally{N(!1)}}},P=()=>{localStorage.removeItem("floksy_token"),localStorage.removeItem("fj_customer_user"),localStorage.removeItem("fj_admin_token"),p("/login")};if(!a)return null;const E=r=>{const s=(r||"CONFIRMED").toUpperCase(),t=!0,c=s!=="PENDING"&&s!=="REJECTED"&&s!=="CANCELLED",l=["MANUFACTURING","IN_PRODUCTION","DISPATCHED","READY_TO_SHIP","SHIPPED","DELIVERED"].includes(s),g=["DISPATCHED","SHIPPED","DELIVERED"].includes(s),_=s==="DELIVERED";return e.jsxs(K,{children:[e.jsxs(d,{$completed:t,children:[e.jsx("div",{className:"step-icon",children:"1"}),e.jsx("div",{className:"step-label",children:"Order Placed"})]}),e.jsxs(d,{$completed:c,children:[e.jsx("div",{className:"step-icon",children:"2"}),e.jsx("div",{className:"step-label",children:"Confirmed"})]}),e.jsxs(d,{$completed:l,children:[e.jsx("div",{className:"step-icon",children:"3"}),e.jsx("div",{className:"step-label",children:"In Manufacturing"})]}),e.jsxs(d,{$completed:g,children:[e.jsx("div",{className:"step-icon",children:"4"}),e.jsx("div",{className:"step-label",children:"Dispatched"})]}),e.jsxs(d,{$completed:_,children:[e.jsx("div",{className:"step-icon",children:"5"}),e.jsx("div",{className:"step-label",children:"Delivered"})]})]})};return e.jsxs(H,{children:[e.jsxs(q,{children:[e.jsxs("div",{className:"welcome",children:[e.jsx("h1",{children:"MY ACCOUNT"}),e.jsxs("p",{children:["Welcome back, ",a.name," (",a.email,")"]})]}),e.jsxs(V,{onClick:P,children:[e.jsx(M,{size:16})," LOGOUT"]})]}),e.jsxs(J,{children:[e.jsxs("h3",{children:[e.jsx(G,{size:18,color:"#C9A45C",style:{marginRight:8}})," INSTANT ORDER TRACKING"]}),e.jsx("form",{onSubmit:z,children:e.jsxs("div",{className:"form-row",children:[e.jsx("input",{type:"text",placeholder:"Enter Order Number (e.g. FJ-10028)",value:x,onChange:r=>R(r.target.value),required:!0}),e.jsx("input",{type:"email",placeholder:"Email Address (Optional)",value:j,onChange:r=>A(r.target.value)}),e.jsx("button",{type:"submit",disabled:v,children:v?"LOOKING UP...":"TRACK STATUS"})]})}),k&&e.jsxs("div",{style:{color:"#c53030",fontSize:"0.85rem",marginTop:12,display:"flex",alignItems:"center",gap:6},children:[e.jsx(W,{size:16})," ",k]}),o&&e.jsx("div",{style:{marginTop:24,paddingTop:20,borderTop:"1px solid #e8e3d9"},children:e.jsxs(D,{style:{margin:0},children:[e.jsxs("div",{className:"order-header",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"no",children:["ORDER #",o.orderNumber]}),e.jsxs("span",{className:"date",style:{marginLeft:12},children:["Placed ",new Date(o.createdAt||o.orderDate).toLocaleDateString()]})]}),e.jsxs("div",{className:`status-badge ${String(o.orderStatus).toLowerCase()}`,children:["STATUS: ",o.orderStatus||"CONFIRMED"]})]}),E(o.orderStatus),o.shipments&&o.shipments.length>0&&e.jsxs(I,{children:[e.jsxs("div",{className:"courier-info",children:[e.jsx("div",{className:"icon-wrap",children:e.jsx(C,{size:20})}),e.jsxs("div",{children:[e.jsxs("div",{className:"carrier",children:["Courier Carrier: ",o.shipments[o.shipments.length-1].carrier]}),e.jsxs("div",{className:"tracking-no",children:["Waybill / Tracking ID: ",o.shipments[o.shipments.length-1].trackingNumber]})]})]}),e.jsx("div",{style:{fontSize:"0.8rem",fontWeight:600,color:"#388E3C",background:"#e6f4ea",border:"1px solid #ceead6",padding:"6px 14px",borderRadius:4},children:"✓ Insured Transit in Progress"})]}),e.jsx(L,{children:(o.items||[]).map((r,s)=>e.jsxs("div",{className:"item-row",children:[e.jsxs("span",{className:"name",children:[r.productName," (x",r.quantity,")"]}),e.jsxs("span",{className:"price",children:["$",(r.unitPrice*r.quantity).toLocaleString()]})]},s))})]})})]}),e.jsxs(Y,{id:"my-orders",children:[e.jsx(B,{size:24,color:"#C9A45C"})," MY RECENT ORDERS (",m.length,")"]}),T?e.jsx("div",{style:{padding:"32px",textAlign:"center",color:"#777"},children:"Loading order history..."}):m.length===0?e.jsxs("div",{style:{background:"#ffffff",border:"1px solid #d9d3c7",padding:"40px 24px",textAlign:"center"},children:[e.jsx("p",{style:{color:"#777",marginBottom:16},children:"You have no placed orders yet."}),e.jsx(F,{to:"/rings",style:{padding:"12px 24px",background:"#1f1f1f",color:"#fff",textDecoration:"none",fontSize:"0.8rem",fontWeight:600,letterSpacing:"0.1em"},children:"EXPLORE FINE JEWELLERY"})]}):m.map(r=>e.jsxs(D,{children:[e.jsxs("div",{className:"order-header",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"no",children:["ORDER #",r.orderNumber]}),e.jsxs("span",{className:"date",style:{marginLeft:12},children:["Placed ",new Date(r.createdAt||r.orderDate).toLocaleDateString()]})]}),e.jsxs("div",{className:`status-badge ${String(r.orderStatus).toLowerCase()}`,children:["STATUS: ",r.orderStatus||"CONFIRMED"]})]}),E(r.orderStatus),r.shipments&&r.shipments.length>0&&e.jsxs(I,{children:[e.jsxs("div",{className:"courier-info",children:[e.jsx("div",{className:"icon-wrap",children:e.jsx(C,{size:20})}),e.jsxs("div",{children:[e.jsxs("div",{className:"carrier",children:["Courier Carrier: ",r.shipments[r.shipments.length-1].carrier]}),e.jsxs("div",{className:"tracking-no",children:["Waybill / Tracking ID: ",r.shipments[r.shipments.length-1].trackingNumber]})]})]}),e.jsx("div",{style:{fontSize:"0.8rem",fontWeight:600,color:"#388E3C",background:"#e6f4ea",border:"1px solid #ceead6",padding:"6px 14px",borderRadius:4},children:"✓ Insured Transit in Progress"})]}),e.jsx(L,{children:(r.items||[]).map((s,t)=>e.jsxs("div",{className:"item-row",children:[e.jsxs("span",{className:"name",children:[s.productName," (Qty: ",s.quantity,")"]}),e.jsxs("span",{className:"price",children:["$",(s.unitPrice*s.quantity).toLocaleString()]})]},t))})]},r.id))]})};export{se as AccountPage};
