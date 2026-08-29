import{r as a,j as e,ak as x}from"./react-vendor-BXyx942q.js";import{g as s}from"./ui-vendor-VHkRGmvp.js";import"./swiper-vendor-B7SuwHD8.js";const p=s.div`
  margin-bottom: 24px;
`,f=s.div`
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
`,b=()=>{const[n,l]=a.useState(()=>localStorage.getItem("fj_biz_fx_rate")||"94.55"),[o,i]=a.useState(()=>localStorage.getItem("fj_biz_gst_rate")||"0.015"),[d,c]=a.useState("USD"),u=t=>{t.preventDefault(),localStorage.setItem("fj_biz_fx_rate",n),localStorage.setItem("fj_biz_gst_rate",o),alert("✅ Settings updated successfully")};return e.jsxs("div",{children:[e.jsxs(p,{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Business System Settings"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Configure exchange rates, default GST parameters, and company calculation rules"})]}),e.jsx(f,{children:e.jsxs("form",{onSubmit:u,children:[e.jsxs(r,{children:[e.jsx("label",{children:"Default Base Currency"}),e.jsxs("select",{value:d,onChange:t=>c(t.target.value),children:[e.jsx("option",{value:"USD",children:"USD ($) — United States Dollar"}),e.jsx("option",{value:"INR",children:"INR (₹) — Indian Rupee"}),e.jsx("option",{value:"THB",children:"THB (฿) — Thai Baht"})]})]}),e.jsxs(r,{children:[e.jsx("label",{children:"Default Dollar Exchange Rate (USD to INR)"}),e.jsx("input",{type:"number",step:"0.01",value:n,onChange:t=>l(t.target.value)}),e.jsx("span",{style:{fontSize:"0.7rem",color:"#64748b"},children:"Reference rate used across Sales and Performance Dashboards (From Excel Dashboard G20: 94.55)"})]}),e.jsxs(r,{children:[e.jsx("label",{children:"Default Diamond Purchase GST % (e.g. 0.015 for 1.5%)"}),e.jsx("input",{type:"number",step:"0.001",value:o,onChange:t=>i(t.target.value)})]}),e.jsxs("button",{type:"submit",style:{display:"flex",alignItems:"center",gap:8,padding:"10px 20px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:700,fontSize:"0.84rem",cursor:"pointer",marginTop:10},children:[e.jsx(x,{size:15})," Save Business Settings"]})]})})]})};export{b as BusinessSettingsPage};
