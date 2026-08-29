import{r as n,j as e,b as oe,Z as le,al as de,aP as ce,a4 as ae,a1 as he,bb as xe}from"./react-vendor-BXyx942q.js";import{g as o}from"./ui-vendor-VHkRGmvp.js";import{b as fe}from"./businessApi--A-SxsaW.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-DwNSPdti.js";import"./admin-tools-vendor-CKN5doRT.js";const pe=o.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,je=o.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  background: #ffffff;
  padding: 10px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
`,p=o.select`
  padding: 6px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.82rem;
  background: #ffffff;
  color: #0f172a;
  outline: none;
`,ue=o.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`,x=o.div`
  background: ${({$highlight:s})=>s?"linear-gradient(135deg, #0d1319 0%, #1a2530 100%)":"#ffffff"};
  color: ${({$highlight:s})=>s?"#ffffff":"#0f172a"};
  border: 1px solid ${({$highlight:s})=>s?"#0d1319":"#e2e8f0"};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;

  .kpi-title {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: ${({$highlight:s})=>s?"#e2b96f":"#64748b"};
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .kpi-value {
    font-size: 1.6rem;
    font-weight: 700;
    font-family: 'Inter', sans-serif;
  }
  .kpi-sub {
    font-size: 0.75rem;
    color: ${({$highlight:s})=>s?"#9bb0bf":"#64748b"};
    margin-top: 6px;
  }
`,ee=o.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin-bottom: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`,c=o.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f1f5f9;
  }
  .card-title {
    font-size: 0.95rem;
    font-weight: 700;
    color: #0f172a;
  }
`,j=o.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;

  th {
    text-align: left;
    padding: 10px 12px;
    background: #f8fafc;
    color: #475569;
    font-weight: 600;
    border-bottom: 1px solid #e2e8f0;
  }

  td {
    padding: 10px 12px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
  }

  tr:hover td {
    background: #f8fafc;
  }
`,Ne=()=>{var b,v,y,S,w,N,$,R,k,D,C,P,L,z,A,M,T,U,W,I,O,B,E,Y,F,G,J,K,V,H,Q,X,Z,q,_;const[s,se]=n.useState(null),[ge,u]=n.useState(!0),[f,re]=n.useState("all"),[a,ie]=n.useState("2026"),[h,te]=n.useState("All Months"),[t,g]=n.useState("USD"),[l,ne]=n.useState(94.55),m=async()=>{u(!0);try{const i=await fe.getDashboardMetrics({period:f,year:a!=="All Years"?a:void 0,month:h!=="All Months"?h:void 0,dollarRate:l});se(i)}catch(i){console.error(i)}finally{u(!1)}};n.useEffect(()=>{m()},[f,a,h,l]);const r=s==null?void 0:s.metrics;return e.jsxs("div",{children:[e.jsxs(pe,{children:[e.jsxs("div",{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Executive Business Dashboard"}),e.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Real-time Sales, Profits, Commissions, and Employee Operations Overview"})]}),e.jsxs(je,{children:[e.jsxs(p,{value:f,onChange:i=>re(i.target.value),children:[e.jsx("option",{value:"all",children:"All Time"}),e.jsx("option",{value:"today",children:"Today"}),e.jsx("option",{value:"month",children:"This Month"}),e.jsx("option",{value:"year",children:"This Year"})]}),e.jsxs(p,{value:a,onChange:i=>ie(i.target.value),children:[e.jsx("option",{value:"All Years",children:"All Years"}),e.jsx("option",{value:"2026",children:"2026"}),e.jsx("option",{value:"2025",children:"2025"})]}),e.jsxs(p,{value:h,onChange:i=>te(i.target.value),children:[e.jsx("option",{value:"All Months",children:"All Months"}),["January","February","March","April","May","June","July","August","September","October","November","December"].map(i=>e.jsx("option",{value:i,children:i},i))]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:6,borderLeft:"1px solid #e2e8f0",paddingLeft:10},children:[e.jsx("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"#475569"},children:"Currency:"}),e.jsx("button",{onClick:()=>g("USD"),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:t==="USD"?"#0d1319":"#f1f5f9",color:t==="USD"?"#fff":"#475569",border:"none",borderRadius:4,cursor:"pointer"},children:"USD ($)"}),e.jsx("button",{onClick:()=>g("INR"),style:{padding:"4px 8px",fontSize:"0.72rem",fontWeight:700,background:t==="INR"?"#0d1319":"#f1f5f9",color:t==="INR"?"#fff":"#475569",border:"none",borderRadius:4,cursor:"pointer"},children:"INR (₹)"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:4},children:[e.jsx("span",{style:{fontSize:"0.72rem",color:"#64748b"},children:"Rate:"}),e.jsx("input",{type:"number",value:l,onChange:i=>ne(Number(i.target.value)),style:{width:60,padding:"4px 6px",fontSize:"0.75rem",border:"1px solid #cbd5e1",borderRadius:4}})]}),e.jsx("button",{onClick:m,style:{background:"none",border:"none",cursor:"pointer",color:"#64748b",display:"flex",alignItems:"center"},title:"Refresh Metrics",children:e.jsx(oe,{size:16})})]})]}),e.jsxs(ue,{children:[e.jsxs(x,{$highlight:!0,children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Total Revenue"}),e.jsx(le,{size:16})]}),e.jsx("div",{className:"kpi-value",children:t==="USD"?`$${((r==null?void 0:r.totalRevenue)||0).toLocaleString()}`:`₹${(((r==null?void 0:r.totalRevenue)||0)*l).toLocaleString()}`}),e.jsxs("div",{className:"kpi-sub",children:[(r==null?void 0:r.totalOrders)||0," Invoiced Orders"]})]}),e.jsxs(x,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Net Profit"}),e.jsx(de,{size:16,color:"#16a34a"})]}),e.jsx("div",{className:"kpi-value",style:{color:"#16a34a"},children:t==="USD"?`$${((r==null?void 0:r.totalNetProfit)||0).toLocaleString()}`:`₹${((r==null?void 0:r.totalNetProfitINR)||0).toLocaleString()}`}),e.jsxs("div",{className:"kpi-sub",children:["Avg Markup: ",(((r==null?void 0:r.averageMarkupPercent)||0)*100).toFixed(1),"%"]})]}),e.jsxs(x,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Commission Paid/Due"}),e.jsx(ce,{size:16,color:"#d97706"})]}),e.jsx("div",{className:"kpi-value",style:{color:"#d97706"},children:t==="USD"?`$${((r==null?void 0:r.totalCommission)||0).toLocaleString()}`:`₹${((r==null?void 0:r.totalCommissionINR)||0).toLocaleString()}`}),e.jsxs("div",{className:"kpi-sub",children:["Retained Profit: ",t==="USD"?`$${((r==null?void 0:r.totalProfitAfterCommission)||0).toLocaleString()}`:`₹${((r==null?void 0:r.profitAfterCommissionINR)||0).toLocaleString()}`]})]}),e.jsxs(x,{children:[e.jsxs("div",{className:"kpi-title",children:[e.jsx("span",{children:"Attendance Today"}),e.jsx(ae,{size:16,color:"#2563eb"})]}),e.jsxs("div",{className:"kpi-value",style:{color:"#2563eb"},children:[((b=s==null?void 0:s.attendance)==null?void 0:b.present)||0," / ",((v=s==null?void 0:s.attendance)==null?void 0:v.totalEmployees)||0]}),e.jsxs("div",{className:"kpi-sub",children:[((y=s==null?void 0:s.attendance)==null?void 0:y.late)||0," Late | ",((S=s==null?void 0:s.attendance)==null?void 0:S.absent)||0," Absent | ",((w=s==null?void 0:s.attendance)==null?void 0:w.onLeave)||0," Leave"]})]})]}),e.jsxs(ee,{children:[e.jsxs(c,{children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"card-title",children:"Sales Person Performance & Commission"}),e.jsxs("span",{style:{fontSize:"0.75rem",fontWeight:600,color:"#64748b"},children:["Showing ",((N=s==null?void 0:s.salesPersonPerformance)==null?void 0:N.length)||0," Staff Members"]})]}),e.jsx("div",{style:{overflowX:"auto"},children:e.jsxs(j,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Sales Person"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Revenue"}),e.jsxs("th",{children:["Net Profit (",t,")"]}),e.jsxs("th",{children:["Commission (",t,")"]}),e.jsxs("th",{children:["Profit Retained (",t,")"]})]})}),e.jsxs("tbody",{children:[($=s==null?void 0:s.salesPersonPerformance)==null?void 0:$.map((i,d)=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:i.name}),e.jsx("td",{children:i.orders}),e.jsxs("td",{children:["$",i.revenue.toLocaleString()]}),e.jsx("td",{style:{color:"#16a34a",fontWeight:600},children:t==="USD"?`$${i.netProfitUSD.toLocaleString()}`:`₹${i.netProfitINR.toLocaleString()}`}),e.jsx("td",{style:{color:"#d97706",fontWeight:600},children:t==="USD"?`$${i.commissionUSD.toLocaleString()}`:`₹${i.commissionINR.toLocaleString()}`}),e.jsx("td",{style:{fontWeight:600},children:t==="USD"?`$${i.profitAfterCommission.toLocaleString()}`:`₹${(i.profitAfterCommission*l).toLocaleString()}`})]},d)),(!(s!=null&&s.salesPersonPerformance)||s.salesPersonPerformance.length===0)&&e.jsx("tr",{children:e.jsx("td",{colSpan:6,style:{textAlign:"center",padding:"24px",color:"#94a3b8"},children:"No sales data recorded for this period."})})]})]})})]}),e.jsxs("div",{children:[e.jsxs(c,{style:{marginBottom:20},children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"card-title",children:"Product Distribution"}),e.jsx(he,{size:16,color:"#e2b96f"})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:14},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",fontWeight:600,marginBottom:4},children:[e.jsx("span",{children:"Loose Diamonds"}),e.jsxs("span",{children:["$",((D=(k=(R=s==null?void 0:s.productDistribution)==null?void 0:R.diamond)==null?void 0:k.revenue)==null?void 0:D.toLocaleString())||0]})]}),e.jsx("div",{style:{height:8,background:"#f1f5f9",borderRadius:4,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",background:"#e2b96f",width:`${((r==null?void 0:r.totalRevenue)||0)>0?Math.min(100,(((P=(C=s==null?void 0:s.productDistribution)==null?void 0:C.diamond)==null?void 0:P.revenue)||0)/((r==null?void 0:r.totalRevenue)||1)*100):0}%`}})}),e.jsxs("div",{style:{fontSize:"0.7rem",color:"#64748b",marginTop:2},children:[((z=(L=s==null?void 0:s.productDistribution)==null?void 0:L.diamond)==null?void 0:z.orders)||0," Orders | Net: $",((M=(A=s==null?void 0:s.productDistribution)==null?void 0:A.diamond)==null?void 0:M.netProfit)||0]})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.8rem",fontWeight:600,marginBottom:4},children:[e.jsx("span",{children:"Finished Jewelry"}),e.jsxs("span",{children:["$",((W=(U=(T=s==null?void 0:s.productDistribution)==null?void 0:T.jewelry)==null?void 0:U.revenue)==null?void 0:W.toLocaleString())||0]})]}),e.jsx("div",{style:{height:8,background:"#f1f5f9",borderRadius:4,overflow:"hidden"},children:e.jsx("div",{style:{height:"100%",background:"#0d1319",width:`${((r==null?void 0:r.totalRevenue)||0)>0?Math.min(100,(((O=(I=s==null?void 0:s.productDistribution)==null?void 0:I.jewelry)==null?void 0:O.revenue)||0)/((r==null?void 0:r.totalRevenue)||1)*100):0}%`}})}),e.jsxs("div",{style:{fontSize:"0.7rem",color:"#64748b",marginTop:2},children:[((E=(B=s==null?void 0:s.productDistribution)==null?void 0:B.jewelry)==null?void 0:E.orders)||0," Orders | Net: $",((F=(Y=s==null?void 0:s.productDistribution)==null?void 0:Y.jewelry)==null?void 0:F.netProfit)||0]})]})]})]}),e.jsxs(c,{children:[e.jsxs("div",{className:"card-header",children:[e.jsx("div",{className:"card-title",children:"Sales Target Quota"}),e.jsx(xe,{size:16,color:"#2563eb"})]}),e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.82rem",fontWeight:700},children:[e.jsxs("span",{children:["Achieved: $",((J=(G=s==null?void 0:s.targets)==null?void 0:G.actualSales)==null?void 0:J.toLocaleString())||0]}),e.jsxs("span",{children:["Target: $",((V=(K=s==null?void 0:s.targets)==null?void 0:K.totalTarget)==null?void 0:V.toLocaleString())||0]})]}),e.jsx("div",{style:{height:10,background:"#f1f5f9",borderRadius:5,overflow:"hidden",margin:"8px 0"},children:e.jsx("div",{style:{height:"100%",background:"#2563eb",width:`${Math.min(100,((H=s==null?void 0:s.targets)==null?void 0:H.achievementPercent)||0)}%`}})}),e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",fontSize:"0.72rem",color:"#64748b"},children:[e.jsxs("span",{children:["Achievement: ",((Q=s==null?void 0:s.targets)==null?void 0:Q.achievementPercent)||0,"%"]}),e.jsxs("span",{children:["Remaining: $",((Z=(X=s==null?void 0:s.targets)==null?void 0:X.remaining)==null?void 0:Z.toLocaleString())||0]})]})]})]})]})]}),e.jsxs(ee,{children:[e.jsxs(c,{children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"card-title",children:"Top Clients by Revenue"})}),e.jsxs(j,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Client Name"}),e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Total Revenue"})]})}),e.jsx("tbody",{children:(q=s==null?void 0:s.topCustomers)==null?void 0:q.map((i,d)=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:i.name}),e.jsx("td",{children:i.country||"-"}),e.jsx("td",{children:i.orders}),e.jsxs("td",{style:{fontWeight:700},children:["$",i.revenue.toLocaleString()]})]},d))})]})]}),e.jsxs(c,{children:[e.jsx("div",{className:"card-header",children:e.jsx("div",{className:"card-title",children:"Geographic Sales"})}),e.jsxs(j,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Country"}),e.jsx("th",{children:"Orders"}),e.jsx("th",{children:"Revenue"})]})}),e.jsx("tbody",{children:(_=s==null?void 0:s.countryDistribution)==null?void 0:_.map((i,d)=>e.jsxs("tr",{children:[e.jsx("td",{style:{fontWeight:600},children:i.country}),e.jsx("td",{children:i.orders}),e.jsxs("td",{style:{fontWeight:700},children:["$",i.revenue.toLocaleString()]})]},d))})]})]})]})]})};export{Ne as BusinessDashboardPage};
