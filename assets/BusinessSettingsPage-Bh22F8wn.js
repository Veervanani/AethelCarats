import{r as a,j as e,ak as x}from"./react-vendor-BQh5Swqi.js";import{g as s}from"./ui-vendor-DAVddLg0.js";import"./swiper-vendor-B7SuwHD8.js";const p=s.div`
  margin-bottom: 24px;
`,l=s.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 24px;
  max-width: 600px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
`,r=s.div`
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
  }
`,b=()=>{const[o,i]=a.useState(()=>localStorage.getItem("fj_biz_fx_rate")||"94.55"),[n,d]=a.useState(()=>localStorage.getItem("fj_biz_gst_rate")||"0.015"),[c,f]=a.useState("USD"),u=t=>{t.preventDefault(),localStorage.setItem("fj_biz_fx_rate",o),localStorage.setItem("fj_biz_gst_rate",n),alert("✅ Settings updated successfully")};return e.jsxs("div",{children:[e.jsxs(p,{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Business System Settings"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Configure exchange rates, default GST parameters, and company calculation rules"})]}),e.jsx(l,{children:e.jsxs("form",{onSubmit:u,children:[e.jsxs(r,{children:[e.jsx("label",{children:"Default Base Currency"}),e.jsxs("select",{value:c,onChange:t=>f(t.target.value),children:[e.jsx("option",{value:"USD",children:"USD ($) — United States Dollar"}),e.jsx("option",{value:"INR",children:"INR (₹) — Indian Rupee"}),e.jsx("option",{value:"THB",children:"THB (฿) — Thai Baht"})]})]}),e.jsxs(r,{children:[e.jsx("label",{children:"Default Dollar Exchange Rate (USD to INR)"}),e.jsx("input",{type:"number",step:"0.01",value:o,onChange:t=>i(t.target.value)}),e.jsx("span",{style:{fontSize:"0.7rem",color:"#64748b"},children:"Reference rate used across Sales and Performance Dashboards (From Excel Dashboard G20: 94.55)"})]}),e.jsxs(r,{children:[e.jsx("label",{children:"Default Diamond Purchase GST % (e.g. 0.015 for 1.5%)"}),e.jsx("input",{type:"number",step:"0.001",value:n,onChange:t=>d(t.target.value)})]}),e.jsxs("button",{type:"submit",style:{display:"flex",alignItems:"center",gap:8,padding:"10px 20px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:700,fontSize:"0.84rem",cursor:"pointer",marginTop:10},children:[e.jsx(x,{size:15})," Save Business Settings"]})]})}),e.jsxs(l,{style:{marginTop:24,borderColor:"#fca5a5",background:"#fff5f5"},children:[e.jsx("h3",{style:{fontSize:"1rem",fontWeight:700,color:"#991b1b",margin:"0 0 8px 0"},children:"Data Cleanup & Team Reset"}),e.jsxs("p",{style:{fontSize:"0.78rem",color:"#7f1d1d",margin:"0 0 16px 0"},children:["Removes all current sales records, commissions, and old staff, leaving only the fresh team: ",e.jsx("strong",{children:"Rutu (Sales Manager)"}),", ",e.jsx("strong",{children:"Jyoti"}),", and ",e.jsx("strong",{children:"Twinkle"}),"."]}),e.jsx("button",{type:"button",onClick:async()=>{if(window.confirm("⚠️ Are you sure you want to remove all sales and set employees to Rutu, Jyoti, and Twinkle?"))try{await fetch("/api/v1/business/reset",{method:"POST"}),alert("✅ All sales removed and staff reset to Rutu (Manager), Jyoti, and Twinkle."),window.location.reload()}catch{alert("Reset executed"),window.location.reload()}},style:{padding:"10px 20px",background:"#dc2626",color:"#ffffff",border:"none",borderRadius:6,fontWeight:700,fontSize:"0.84rem",cursor:"pointer"},children:"Remove All Sales & Reset Employees"})]})]})};export{b as BusinessSettingsPage};
