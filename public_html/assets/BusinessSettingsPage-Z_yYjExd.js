import{r,j as e,S as y,aj as j}from"./react-vendor-BQZO0c5l.js";import{g as d}from"./ui-vendor-Bs2yixgz.js";import{e as v}from"./admin-pages-DCWy8I_r.js";import{b as h}from"./businessApi-BUo1KojG.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const R=d.div`
  margin-bottom: 20px;

  h1 {
    font-size: 1.35rem;
    font-weight: 800;
    color: #0f172a;
    margin: 0;

    @media (max-width: 640px) {
      font-size: 1.15rem;
    }
  }

  p {
    font-size: 0.78rem;
    color: #64748b;
    margin: 3px 0 0 0;

    @media (max-width: 640px) {
      font-size: 0.72rem;
    }
  }
`,b=d.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  max-width: 600px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  box-sizing: border-box;

  @media (max-width: 640px) {
    padding: 14px;
  }
`,l=d.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;

  label {
    font-size: 0.78rem;
    font-weight: 600;
    color: #334155;
  }

  input, select {
    padding: 8px 12px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 0.84rem;
    outline: none;
    box-sizing: border-box;
    width: 100%;

    &:focus {
      border-color: #0d1319;
    }
  }

  select {
    padding-right: 28px;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 10px center;
    background-size: 13px;
    cursor: pointer;
  }
`,_=()=>{const{user:a}=v(),s=(a==null?void 0:a.role)==="ADMIN"||(a==null?void 0:a.role)==="SUPER_ADMIN",[o,c]=r.useState(()=>localStorage.getItem("biz_fx_rate")||"94.55"),[n,g]=r.useState(()=>localStorage.getItem("biz_gst_rate")||"0.015"),[f,p]=r.useState("USD"),[w,u]=r.useState(!1);if(r.useEffect(()=>{s&&h.getSettings().then(t=>{t!=null&&t.settings&&(t.settings.dollarRate&&(c(String(t.settings.dollarRate)),localStorage.setItem("biz_fx_rate",String(t.settings.dollarRate))),t.settings.defaultGstRate&&(g(String(t.settings.defaultGstRate)),localStorage.setItem("biz_gst_rate",String(t.settings.defaultGstRate))),t.settings.baseCurrency&&p(t.settings.baseCurrency))}).catch(t=>console.error(t))},[s]),!s)return e.jsxs("div",{style:{maxWidth:"540px",margin:"40px auto",padding:"36px",background:"#fff",border:"1px solid #e2e8f0",borderRadius:"12px",textAlign:"center",boxShadow:"0 8px 24px rgba(15,23,42,0.06)"},children:[e.jsx(y,{size:42,color:"#dc2626",style:{marginBottom:12}}),e.jsx("h2",{style:{fontSize:"1.35rem",fontWeight:800,color:"#0f172a",margin:"0 0 8px 0"},children:"403 — Restricted Area"}),e.jsxs("p",{style:{color:"#64748b",fontSize:"0.86rem",lineHeight:"1.5",margin:0},children:["Business System Settings are reserved for Administrators. Your account (",a==null?void 0:a.email,") with role ",e.jsx("strong",{children:a==null?void 0:a.role})," is not authorized to modify system parameters."]})]});const S=async t=>{var x,m;t.preventDefault(),u(!0);try{await h.updateSettings({dollarRate:Number(o),defaultFxRate:Number(o),defaultGstRate:Number(n),baseCurrency:f}),localStorage.setItem("biz_fx_rate",o),localStorage.setItem("biz_gst_rate",n),alert("✅ Settings updated and saved to database successfully")}catch(i){alert(((m=(x=i==null?void 0:i.response)==null?void 0:x.data)==null?void 0:m.message)||"Failed to save settings to database")}finally{u(!1)}};return e.jsxs("div",{children:[e.jsxs(R,{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Business System Settings"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Configure exchange rates, default GST parameters, and company calculation rules"})]}),e.jsx(b,{children:e.jsxs("form",{onSubmit:S,children:[e.jsxs(l,{children:[e.jsx("label",{children:"Default Base Currency"}),e.jsxs("select",{value:f,onChange:t=>p(t.target.value),children:[e.jsx("option",{value:"USD",children:"USD ($) — United States Dollar"}),e.jsx("option",{value:"INR",children:"INR (₹) — Indian Rupee"}),e.jsx("option",{value:"THB",children:"THB (฿) — Thai Baht"})]})]}),e.jsxs(l,{children:[e.jsx("label",{children:"Default Dollar Exchange Rate (USD to INR)"}),e.jsx("input",{type:"number",step:"0.01",value:o,onChange:t=>c(t.target.value)}),e.jsx("span",{style:{fontSize:"0.7rem",color:"#64748b"},children:"Reference rate used across Sales and Performance Dashboards (From Excel Dashboard G20: 94.55)"})]}),e.jsxs(l,{children:[e.jsx("label",{children:"Default Diamond Purchase GST % (e.g. 0.015 for 1.5%)"}),e.jsx("input",{type:"number",step:"0.001",value:n,onChange:t=>g(t.target.value)})]}),e.jsxs("button",{type:"submit",style:{display:"flex",alignItems:"center",gap:8,padding:"10px 20px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:700,fontSize:"0.84rem",cursor:"pointer",marginTop:10},children:[e.jsx(j,{size:15})," Save Business Settings"]})]})}),e.jsxs(b,{style:{marginTop:24,borderColor:"#fca5a5",background:"#fff5f5"},children:[e.jsx("h3",{style:{fontSize:"1rem",fontWeight:700,color:"#991b1b",margin:"0 0 8px 0"},children:"Data Cleanup & Team Reset"}),e.jsxs("p",{style:{fontSize:"0.78rem",color:"#7f1d1d",margin:"0 0 16px 0"},children:["Removes all current sales records, commissions, and old staff, leaving only the fresh team: ",e.jsx("strong",{children:"Rutu (Sales Manager)"}),", ",e.jsx("strong",{children:"Jyoti"}),", and ",e.jsx("strong",{children:"Twinkle"}),"."]}),e.jsx("button",{type:"button",onClick:async()=>{if(window.confirm("⚠️ Are you sure you want to remove all sales and set employees to Rutu, Jyoti, and Twinkle?"))try{await fetch("/api/v1/business/reset",{method:"POST"}),alert("✅ All sales removed and staff reset to Rutu (Manager), Jyoti, and Twinkle."),window.location.reload()}catch{alert("Reset executed"),window.location.reload()}},style:{padding:"10px 20px",background:"#dc2626",color:"#ffffff",border:"none",borderRadius:6,fontWeight:700,fontSize:"0.84rem",cursor:"pointer"},children:"Remove All Sales & Reset Employees"})]})]})};export{_ as BusinessSettingsPage};
