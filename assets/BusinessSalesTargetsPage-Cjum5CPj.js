import{r as o,j as e,P as E,bg as O,Z as B,h as F,aP as G,af as H,ad as q}from"./react-vendor-DxLkccZ0.js";import{g as f}from"./ui-vendor-BuBsKREC.js";import{b as C}from"./businessApi-0Bl2RMl6.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-BsXizCU8.js";import"./admin-tools-vendor-CKN5doRT.js";const J=f.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,L=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 14px;
  margin-bottom: 24px;
`,h=f.div`
  background: #ffffff;
  border: 1px solid ${({$highlight:n})=>n?"#0d1319":"#e2e8f0"};
  border-radius: 10px;
  padding: 18px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);

  .label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
    letter-spacing: 0.04em;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .val {
    font-size: 1.45rem;
    font-weight: 800;
    color: #0f172a;
    margin-top: 6px;
  }

  .sub {
    font-size: 0.72rem;
    color: #64748b;
    margin-top: 4px;
  }
`,Q=f.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
`,U=f.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 14px;
  }

  .month-title {
    font-size: 1.15rem;
    font-weight: 800;
    color: #0f172a;
  }

  .period-badge {
    font-size: 0.7rem;
    font-weight: 700;
    padding: 3px 8px;
    background: #f1f5f9;
    color: #334155;
    border-radius: 6px;
  }

  .progress-bar-container {
    height: 10px;
    background: #f1f5f9;
    border-radius: 5px;
    overflow: hidden;
    margin: 14px 0;
  }

  .progress-fill {
    height: 100%;
    transition: width 0.4s ease;
  }
`,M=["January","February","March","April","May","June","July","August","September","October","November","December"],p=n=>(Number(n)||0).toLocaleString(),te=()=>{const[n,m]=o.useState([]),[A,w]=o.useState(!0),[R,c]=o.useState(!1),[b,y]=o.useState(null),[i,x]=o.useState("2026"),[N,j]=o.useState("8"),[z,v]=o.useState("50000"),[k,S]=o.useState("Company Monthly Sales Target"),u=async()=>{w(!0);try{const t=await C.getTargets({year:i}),r=Array.isArray(t)?t:(t==null?void 0:t.targets)||[];m(r)}catch(t){console.error(t),m([])}finally{w(!1)}};o.useEffect(()=>{u()},[i]);const P=()=>{y(null),x(i||"2026"),j(String(new Date().getMonth()+1)),v(""),S("Company Monthly Sales Target"),c(!0)},W=t=>{y(t),x(String(t.periodYear||i)),j(String(t.periodMonth||8)),v(String(t.targetAmount||"")),S(t.notes||"Company Monthly Sales Target"),c(!0)},$=async t=>{var r,s;t.preventDefault();try{await C.createTarget({periodType:"MONTHLY",periodYear:Number(i),periodMonth:Number(N),targetAmount:Number(z),notes:k}),c(!1),y(null),await u(),alert(b?"✅ Company monthly target updated successfully.":"✅ Company monthly target saved successfully.")}catch(a){alert(((s=(r=a==null?void 0:a.response)==null?void 0:r.data)==null?void 0:s.message)||"Failed to save target")}},Y=async(t,r)=>{var s,a;if(window.confirm(`⚠️ Are you sure you want to remove target for ${r}?`))try{m(l=>l.filter(d=>d.id!==t)),await C.deleteTarget(t),await u(),alert("✅ Target removed.")}catch(l){alert(((a=(s=l==null?void 0:l.response)==null?void 0:s.data)==null?void 0:a.message)||"Failed to delete target"),u()}},g=n.reduce((t,r)=>t+(Number(r.targetAmount)||0),0),T=n.reduce((t,r)=>t+(Number(r.actualRevenue||r.actualSales)||0),0),D=n.reduce((t,r)=>t+(Number(r.netProfit)||0),0),I=n.reduce((t,r)=>t+(Number(r.orderCount)||0),0);return e.jsxs("div",{children:[e.jsxs(J,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Company Monthly Sales Targets"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Set monthly business revenue targets and track organization-wide fulfillment across closed deals"})]}),e.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[e.jsxs("select",{value:i,onChange:t=>x(t.target.value),style:{padding:"8px 12px",borderRadius:6,border:"1px solid #cbd5e1",fontSize:"0.82rem",fontWeight:600,background:"#ffffff",cursor:"pointer"},children:[e.jsx("option",{value:"2025",children:"Year 2025"}),e.jsx("option",{value:"2026",children:"Year 2026"}),e.jsx("option",{value:"2027",children:"Year 2027"})]}),e.jsxs("button",{onClick:P,style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[e.jsx(E,{size:16})," Set Monthly Target"]})]})]}),e.jsxs(L,{children:[e.jsxs(h,{children:[e.jsxs("div",{className:"label",children:[e.jsx("span",{children:"Configured Targets"}),e.jsx(O,{size:15,color:"#2563eb"})]}),e.jsxs("div",{className:"val",children:["$",p(g)]}),e.jsxs("div",{className:"sub",children:[n.length," monthly quotas"]})]}),e.jsxs(h,{$highlight:!0,children:[e.jsxs("div",{className:"label",children:[e.jsx("span",{children:"Billed Revenue"}),e.jsx(B,{size:15,color:"#0f172a"})]}),e.jsxs("div",{className:"val",children:["$",p(T)]}),e.jsxs("div",{className:"sub",children:[I," invoiced transactions"]})]}),e.jsxs(h,{children:[e.jsxs("div",{className:"label",children:[e.jsx("span",{children:"Net Profit Generated"}),e.jsx(F,{size:15,color:"#16a34a"})]}),e.jsxs("div",{className:"val",style:{color:"#16a34a"},children:["$",p(D)]}),e.jsx("div",{className:"sub",children:"Company gross margin"})]}),e.jsxs(h,{children:[e.jsxs("div",{className:"label",children:[e.jsx("span",{children:"Overall Fulfillment"}),e.jsx(G,{size:15,color:"#d97706"})]}),e.jsxs("div",{className:"val",style:{color:g>0&&T>=g?"#16a34a":"#2563eb"},children:[g>0?(T/g*100).toFixed(1):0,"%"]}),e.jsx("div",{className:"sub",children:"Progress toward annual quota"})]})]}),e.jsxs(Q,{children:[n.map(t=>{const r=t.monthName||M[(t.periodMonth||8)-1]||"Month",s=Number(t.actualRevenue||t.actualSales)||0,a=Number(t.targetAmount)||0,l=a>0?Math.min(100,Math.round(s/a*100)):0,d=s>=a&&a>0;return e.jsxs(U,{children:[e.jsxs("div",{children:[e.jsxs("div",{className:"header",children:[e.jsxs("div",{children:[e.jsxs("div",{className:"month-title",children:[r," ",t.periodYear]}),e.jsx("div",{style:{fontSize:"0.72rem",color:"#64748b",marginTop:2},children:t.notes||"Company Target"})]}),e.jsxs("div",{style:{display:"flex",gap:6,alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"0.7rem",fontWeight:700,padding:"3px 8px",borderRadius:6,background:d?"#ebfbee":s>0?"#eff6ff":"#f8fafc",color:d?"#2b8a3e":s>0?"#1d4ed8":"#64748b",border:d?"1px solid #b2f2bb":s>0?"1px solid #bfdbfe":"1px solid #e2e8f0"},children:d?"🟢 Achieved":s>0?"🔵 In Progress":"🟡 Pending"}),e.jsx("button",{onClick:()=>W(t),style:{background:"#f8fafc",border:"1px solid #cbd5e1",color:"#334155",borderRadius:5,padding:"4px 6px",cursor:"pointer",display:"inline-flex",alignItems:"center"},title:"Edit Target",children:e.jsx(H,{size:13})}),e.jsx("button",{onClick:()=>Y(t.id,`${r} ${t.periodYear}`),style:{background:"#fff1f2",border:"1px solid #fecdd3",color:"#e11d48",borderRadius:5,padding:"4px 6px",cursor:"pointer",display:"inline-flex",alignItems:"center"},title:"Delete Target",children:e.jsx(q,{size:13})})]})]}),e.jsx("div",{className:"progress-bar-container",children:e.jsx("div",{className:"progress-fill",style:{width:`${l}%`,background:d?"#16a34a":"#2563eb"}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.86rem",fontWeight:800},children:[e.jsxs("span",{style:{color:"#0f172a"},children:["Achieved: $",p(s)]}),e.jsxs("span",{style:{color:"#64748b"},children:["Target: $",p(a)]})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.74rem",color:"#64748b",marginTop:16,paddingTop:12,borderTop:"1px solid #f1f5f9"},children:[e.jsxs("span",{children:["Fulfillment: ",e.jsxs("strong",{style:{color:d?"#16a34a":"#0f172a"},children:[l,"%"]})]}),e.jsxs("span",{children:[t.orderCount||0," Orders"]}),e.jsxs("span",{children:["Remaining: ",e.jsxs("strong",{children:["$",p(Math.max(0,a-s))]})]})]})]},t.id)}),n.length===0&&!A&&e.jsxs("div",{style:{gridColumn:"1 / -1",textAlign:"center",padding:"48px 24px",background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:12,color:"#94a3b8"},children:["No company monthly targets configured for ",i,'. Click "Set Monthly Target" to establish goals.']})]}),R&&e.jsx("div",{style:{position:"fixed",inset:0,background:"rgba(15, 23, 42, 0.7)",backdropFilter:"blur(3px)",zIndex:1e4,display:"flex",justifyContent:"center",alignItems:"center",padding:16},onClick:()=>c(!1),children:e.jsxs("div",{style:{background:"#ffffff",borderRadius:12,width:"100%",maxWidth:480,padding:24,boxShadow:"0 20px 25px -5px rgba(0,0,0,0.1)"},onClick:t=>t.stopPropagation(),children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16},children:[e.jsx("h2",{style:{fontSize:"1.15rem",fontWeight:800,color:"#0f172a",margin:0},children:b?"Edit Company Monthly Target":"Set Company Monthly Target"}),e.jsx("button",{onClick:()=>c(!1),style:{background:"none",border:"none",cursor:"pointer",fontSize:"1.1rem"},children:"✕"})]}),e.jsxs("form",{onSubmit:$,children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600,color:"#334155",display:"block",marginBottom:4},children:"Target Year"}),e.jsxs("select",{value:i,onChange:t=>x(t.target.value),style:{width:"100%",padding:"8px 10px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.84rem"},children:[e.jsx("option",{value:"2025",children:"2025"}),e.jsx("option",{value:"2026",children:"2026"}),e.jsx("option",{value:"2027",children:"2027"})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600,color:"#334155",display:"block",marginBottom:4},children:"Target Month"}),e.jsx("select",{value:N,onChange:t=>j(t.target.value),style:{width:"100%",padding:"8px 10px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.84rem"},children:M.map((t,r)=>e.jsx("option",{value:r+1,children:t},r+1))})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600,color:"#334155",display:"block",marginBottom:4},children:"Company Revenue Target ($ USD) *"}),e.jsx("input",{type:"number",value:z,onChange:t=>v(t.target.value),style:{width:"100%",padding:"8px 10px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.84rem",boxSizing:"border-box"},required:!0,placeholder:"e.g. 50000"})]}),e.jsxs("div",{children:[e.jsx("label",{style:{fontSize:"0.78rem",fontWeight:600,color:"#334155",display:"block",marginBottom:4},children:"Target Description / Goal Notes"}),e.jsx("input",{type:"text",value:k,onChange:t=>S(t.target.value),style:{width:"100%",padding:"8px 10px",border:"1px solid #cbd5e1",borderRadius:6,fontSize:"0.84rem",boxSizing:"border-box"},placeholder:"e.g. Q3 High Atelier & Diamond Sales Quota"})]})]}),e.jsxs("div",{style:{display:"flex",justifyContent:"flex-end",gap:10,marginTop:24},children:[e.jsx("button",{type:"button",onClick:()=>c(!1),style:{padding:"8px 16px",border:"1px solid #cbd5e1",background:"#ffffff",borderRadius:6,fontWeight:600,cursor:"pointer"},children:"Cancel"}),e.jsx("button",{type:"submit",style:{padding:"8px 20px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:700,cursor:"pointer"},children:b?"Update Company Target":"Save Company Target"})]})]})]})})]})};export{te as BusinessSalesTargetsPage};
