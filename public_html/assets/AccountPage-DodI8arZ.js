import{r as i,u as F,e as _,j as e,L as $,i as U,C as M,ax as w,d as G,f as W}from"./react-vendor-BsBv4awM.js";import{g as n}from"./ui-vendor-C0FaE403.js";import{a as h}from"./admin-pages-DbiNBOOH.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const H=n.div`
  max-width: 1200px;
  min-height: 80vh;
  margin: 0 auto;
  padding: 48px 24px 80px;
  background-color: #0B0B0B;
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
  border-bottom: 1px solid rgba(140, 116, 75, 0.25);

  .welcome {
    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.4rem;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #F5F1E8;
      margin-bottom: 4px;
    }

    p {
      font-size: 0.95rem;
      color: #A8A8A8;
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
  background-color: #111111;
  color: #F5F1E8;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.25s ease;

  &:hover {
    background-color: rgba(229, 62, 62, 0.15);
    color: #FC8181;
    border-color: rgba(229, 62, 62, 0.4);
  }
`,Y=n.h2`
  font-family: 'Cormorant Garamond', 'Playfair Display', serif;
  font-size: 1.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #F5F1E8;
  margin: 40px 0 20px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`,J=n.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.3rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
  }

  .form-row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

    input {
      flex: 1;
      min-width: 220px;
      padding: 12px 14px;
      border: 1px solid rgba(140, 116, 75, 0.25);
      background: #111111;
      color: #F5F1E8;
      border-radius: 2px;
      font-size: 0.88rem;
      outline: none;
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

    button {
      padding: 12px 24px;
      background: #C9A96E;
      color: #0B0B0B;
      border: 1px solid #C9A96E;
      border-radius: 2px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.25s ease;

      &:hover {
        background: #DFBA73;
        border-color: #DFBA73;
        box-shadow: 0 4px 14px rgba(201, 169, 110, 0.3);
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
`,C=n.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);

  .order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(140, 116, 75, 0.2);
    padding-bottom: 16px;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;

    .no {
      font-family: monospace;
      font-weight: 700;
      font-size: 1.1rem;
      color: #C9A96E;
    }

    .date {
      font-size: 0.82rem;
      color: #A8A8A8;
    }

    .status-badge {
      padding: 5px 14px;
      font-size: 0.72rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      border-radius: 12px;
      background: rgba(201, 169, 110, 0.15);
      color: #C9A96E;
      border: 1px solid rgba(201, 169, 110, 0.35);

      &.delivered {
        background: rgba(56, 161, 105, 0.15);
        color: #68D391;
        border-color: rgba(56, 161, 105, 0.35);
      }
      &.manufacturing {
        background: rgba(49, 130, 206, 0.15);
        color: #63B3ED;
        border-color: rgba(49, 130, 206, 0.35);
      }
      &.dispatched {
        background: rgba(221, 107, 32, 0.15);
        color: #F6AD55;
        border-color: rgba(221, 107, 32, 0.35);
      }
    }
  }
`,D=n.div`
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.3);
  border-left: 4px solid #C9A96E;
  border-radius: 4px;
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
      background: #151515;
      border: 1px solid rgba(140, 116, 75, 0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #C9A96E;
      flex-shrink: 0;
    }

    .carrier {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: #A8A8A8;
    }

    .tracking-no {
      font-family: monospace;
      font-size: 1.05rem;
      font-weight: 700;
      color: #F5F1E8;
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
`,c=n.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;

  .step-icon {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${({$completed:a})=>a?"#C9A96E":"#111111"};
    color: ${({$completed:a})=>a?"#0B0B0B":"#666666"};
    border: 2px solid ${({$completed:a})=>a?"#C9A96E":"rgba(140, 116, 75, 0.25)"};
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
    color: ${({$completed:a})=>a?"#F5F1E8":"#666666"};
  }

  @media (max-width: 640px) {
    flex-direction: row;
    text-align: left;
  }
`,I=n.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  .item-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.88rem;
    color: #D8D2C5;
    padding: 8px 0;
    border-bottom: 1px dashed rgba(140, 116, 75, 0.2);

    .name {
      font-weight: 600;
    }
    .price {
      font-weight: 700;
      color: #C9A96E;
    }
  }
`,se=()=>{const[a,b]=i.useState(null),[x,L]=i.useState([]),[O,f]=i.useState(!1),[g,R]=i.useState(""),[j,T]=i.useState(""),[o,y]=i.useState(null),[E,v]=i.useState(!1),[N,A]=i.useState(""),p=F(),m=_();i.useEffect(()=>{try{const r=localStorage.getItem("app_user_profile"),s=localStorage.getItem("app_auth_token")||localStorage.getItem("admin_session_token");if(r){const t=JSON.parse(r);b(t),S(t.email)}else if(s){const t={email:"client@aethelcarats.com",name:"Valued Client"};b(t),S(t.email)}else p("/login")}catch{p("/login")}},[p]),i.useEffect(()=>{if(m.hash==="#my-orders"||m.hash==="#orders"){const r=document.getElementById("my-orders");r&&setTimeout(()=>{r.scrollIntoView({behavior:"smooth",block:"start"})},150)}},[m.hash,m.pathname]);const S=async r=>{f(!0);try{const s=localStorage.getItem("app_last_order_email");let t=await h.getMyOrders(r);if((!t||t.length===0)&&s&&s!==r){const l=await h.getMyOrders(s);Array.isArray(l)&&l.length>0&&(t=l)}L(Array.isArray(t)?t:[])}catch(s){console.error(s)}finally{f(!1)}},z=async r=>{var s,t,l;if(r.preventDefault(),!!g){v(!0),A(""),y(null);try{const d=j||((s=a==null?void 0:a.email)!=null&&s.includes("@")?a.email:localStorage.getItem("app_last_order_email")||""),u=await h.trackPublicOrder(g,d);y(u)}catch(d){A(((l=(t=d.response)==null?void 0:t.data)==null?void 0:l.message)||"Order not found. Please check your order number.")}finally{v(!1)}}},P=()=>{localStorage.removeItem("app_auth_token"),localStorage.removeItem("app_user_profile"),localStorage.removeItem("admin_session_token"),p("/login")};if(!a)return null;const k=r=>{const s=(r||"CONFIRMED").toUpperCase(),t=!0,l=s!=="PENDING"&&s!=="REJECTED"&&s!=="CANCELLED",d=["MANUFACTURING","IN_PRODUCTION","DISPATCHED","READY_TO_SHIP","SHIPPED","DELIVERED"].includes(s),u=["DISPATCHED","SHIPPED","DELIVERED"].includes(s),B=s==="DELIVERED";return e.jsxs(K,{children:[e.jsxs(c,{$completed:t,children:[e.jsx("div",{className:"step-icon",children:"1"}),e.jsx("div",{className:"step-label",children:"Order Placed"})]}),e.jsxs(c,{$completed:l,children:[e.jsx("div",{className:"step-icon",children:"2"}),e.jsx("div",{className:"step-label",children:"Confirmed"})]}),e.jsxs(c,{$completed:d,children:[e.jsx("div",{className:"step-icon",children:"3"}),e.jsx("div",{className:"step-label",children:"In Manufacturing"})]}),e.jsxs(c,{$completed:u,children:[e.jsx("div",{className:"step-icon",children:"4"}),e.jsx("div",{className:"step-label",children:"Dispatched"})]}),e.jsxs(c,{$completed:B,children:[e.jsx("div",{className:"step-icon",children:"5"}),e.jsx("div",{className:"step-label",children:"Delivered"})]})]})};return e.jsxs(H,{children:[e.jsxs(q,{children:[e.jsxs("div",{className:"welcome",children:[e.jsx("h1",{children:"MY ACCOUNT"}),e.jsxs("p",{children:["Welcome back, ",a.name," (",a.email,")"]})]}),e.jsxs(V,{onClick:P,children:[e.jsx($,{size:16})," LOGOUT"]})]}),e.jsxs(J,{children:[e.jsxs("h3",{children:[e.jsx(U,{size:18,color:"#C9A96E",style:{marginRight:8}})," INSTANT ORDER TRACKING"]}),e.jsx("form",{onSubmit:z,children:e.jsxs("div",{className:"form-row",children:[e.jsx("input",{type:"text",placeholder:"Enter Order Number (e.g. AC-10028)",value:g,onChange:r=>R(r.target.value),required:!0}),e.jsx("input",{type:"email",placeholder:"Email Address (Optional)",value:j,onChange:r=>T(r.target.value)}),e.jsx("button",{type:"submit",disabled:E,children:E?"LOOKING UP...":"TRACK STATUS"})]})}),N&&e.jsxs("div",{style:{color:"#FC8181",fontSize:"0.85rem",marginTop:12,display:"flex",alignItems:"center",gap:6},children:[e.jsx(M,{size:16})," ",N]}),o&&e.jsx("div",{style:{marginTop:24,paddingTop:20,borderTop:"1px solid rgba(140, 116, 75, 0.2)"},children:e.jsxs(C,{style:{margin:0},children:[e.jsxs("div",{className:"order-header",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"no",children:["ORDER #",o.orderNumber]}),e.jsxs("span",{className:"date",style:{marginLeft:12},children:["Placed ",new Date(o.createdAt||o.orderDate).toLocaleDateString()]})]}),e.jsxs("div",{className:`status-badge ${String(o.orderStatus).toLowerCase()}`,children:["STATUS: ",o.orderStatus||"CONFIRMED"]})]}),k(o.orderStatus),o.shipments&&o.shipments.length>0&&e.jsxs(D,{children:[e.jsxs("div",{className:"courier-info",children:[e.jsx("div",{className:"icon-wrap",children:e.jsx(w,{size:20})}),e.jsxs("div",{children:[e.jsxs("div",{className:"carrier",children:["Courier Carrier: ",o.shipments[o.shipments.length-1].carrier]}),e.jsxs("div",{className:"tracking-no",children:["Waybill / Tracking ID: ",o.shipments[o.shipments.length-1].trackingNumber]})]})]}),e.jsx("div",{style:{fontSize:"0.8rem",fontWeight:600,color:"#68D391",background:"rgba(56, 161, 105, 0.15)",border:"1px solid rgba(56, 161, 105, 0.35)",padding:"6px 14px",borderRadius:4},children:"✓ Insured Transit in Progress"})]}),e.jsx(I,{children:(o.items||[]).map((r,s)=>e.jsxs("div",{className:"item-row",children:[e.jsxs("span",{className:"name",children:[r.productName," (x",r.quantity,")"]}),e.jsxs("span",{className:"price",children:["$",(r.unitPrice*r.quantity).toLocaleString()]})]},s))})]})})]}),e.jsxs(Y,{id:"my-orders",children:[e.jsx(G,{size:24,color:"#C9A96E"})," MY RECENT ORDERS (",x.length,")"]}),O?e.jsx("div",{style:{padding:"32px",textAlign:"center",color:"#A8A8A8"},children:"Loading order history..."}):x.length===0?e.jsxs("div",{style:{background:"#151515",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,padding:"40px 24px",textAlign:"center"},children:[e.jsx("p",{style:{color:"#A8A8A8",marginBottom:16},children:"You have no placed orders yet."}),e.jsx(W,{to:"/rings",style:{padding:"12px 24px",background:"#C9A96E",color:"#0B0B0B",textDecoration:"none",fontSize:"0.8rem",fontWeight:700,letterSpacing:"0.12em",borderRadius:2},children:"EXPLORE FINE JEWELLERY"})]}):x.map(r=>e.jsxs(C,{children:[e.jsxs("div",{className:"order-header",children:[e.jsxs("div",{children:[e.jsxs("span",{className:"no",children:["ORDER #",r.orderNumber]}),e.jsxs("span",{className:"date",style:{marginLeft:12},children:["Placed ",new Date(r.createdAt||r.orderDate).toLocaleDateString()]})]}),e.jsxs("div",{className:`status-badge ${String(r.orderStatus).toLowerCase()}`,children:["STATUS: ",r.orderStatus||"CONFIRMED"]})]}),k(r.orderStatus),r.shipments&&r.shipments.length>0&&e.jsxs(D,{children:[e.jsxs("div",{className:"courier-info",children:[e.jsx("div",{className:"icon-wrap",children:e.jsx(w,{size:20})}),e.jsxs("div",{children:[e.jsxs("div",{className:"carrier",children:["Courier Carrier: ",r.shipments[r.shipments.length-1].carrier]}),e.jsxs("div",{className:"tracking-no",children:["Waybill / Tracking ID: ",r.shipments[r.shipments.length-1].trackingNumber]})]})]}),e.jsx("div",{style:{fontSize:"0.8rem",fontWeight:600,color:"#68D391",background:"rgba(56, 161, 105, 0.15)",border:"1px solid rgba(56, 161, 105, 0.35)",padding:"6px 14px",borderRadius:4},children:"✓ Insured Transit in Progress"})]}),e.jsx(I,{children:(r.items||[]).map((s,t)=>e.jsxs("div",{className:"item-row",children:[e.jsxs("span",{className:"name",children:[s.productName," (Qty: ",s.quantity,")"]}),e.jsxs("span",{className:"price",children:["$",(s.unitPrice*s.quantity).toLocaleString()]})]},t))})]},r.id))]})};export{se as AccountPage};
