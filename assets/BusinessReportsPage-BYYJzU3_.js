import{r as o,j as t,ae as Y}from"./react-vendor-BXyx942q.js";import{g as s}from"./ui-vendor-VHkRGmvp.js";import{b as Z}from"./businessApi--A-SxsaW.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-DwNSPdti.js";import"./admin-tools-vendor-CKN5doRT.js";const _=s.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
`,ee=s.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 18px;
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
`,l=s.button`
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  border: 1px solid ${({$active:r})=>r?"#0d1319":"#cbd5e1"};
  background: ${({$active:r})=>r?"#0d1319":"#ffffff"};
  color: ${({$active:r})=>r?"#ffffff":"#334155"};
  cursor: pointer;
`,c=s.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #e2e8f0;

  th {
    text-align: left;
    padding: 12px 16px;
    background: #0d1319;
    color: #ffffff;
    font-weight: 600;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid #f1f5f9;
    color: #1e293b;
  }

  tr:hover td {
    background: #f8fafc;
  }
`,ce=()=>{var f,h,x,j,p,g,a,u,m,y,b,S,P,R,W,v,D,C,L,w,$,k,N,I,T,z,U,B,E,A,F,M,O,V,G,H,J,q;const[r,n]=o.useState("sales"),[e,K]=o.useState(null),[te,d]=o.useState(!0);o.useEffect(()=>{d(!0),Z.getDashboardMetrics({period:"all"}).then(i=>K(i)).finally(()=>d(!1))},[]);const Q=()=>{alert("Report downloaded in CSV format.")};return t.jsxs("div",{children:[t.jsxs(_,{children:[t.jsxs("div",{children:[t.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Business & Profit Intelligence Reports"}),t.jsx("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:"Consolidated financial auditing, salesperson profitability analysis, and margins"})]}),t.jsxs("button",{onClick:Q,style:{display:"flex",alignItems:"center",gap:8,padding:"8px 18px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:600,fontSize:"0.82rem",cursor:"pointer"},children:[t.jsx(Y,{size:15})," Export Audit Report"]})]}),t.jsx(ee,{children:t.jsxs("div",{style:{display:"flex",gap:8},children:[t.jsx(l,{$active:r==="sales",onClick:()=>n("sales"),children:"Sales Breakdown"}),t.jsx(l,{$active:r==="staff",onClick:()=>n("staff"),children:"Staff Performance"}),t.jsx(l,{$active:r==="profit",onClick:()=>n("profit"),children:"Margin & Retained Profit"})]})}),r==="sales"&&t.jsxs(c,{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Category"}),t.jsx("th",{children:"Orders"}),t.jsx("th",{children:"Total Revenue"}),t.jsx("th",{children:"Net Profit"}),t.jsx("th",{children:"Profit Margin"})]})}),t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:600},children:"Loose Diamonds"}),t.jsx("td",{children:((h=(f=e==null?void 0:e.productDistribution)==null?void 0:f.diamond)==null?void 0:h.orders)||0}),t.jsxs("td",{style:{fontWeight:700},children:["$",(((j=(x=e==null?void 0:e.productDistribution)==null?void 0:x.diamond)==null?void 0:j.revenue)||0).toLocaleString()]}),t.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",(((g=(p=e==null?void 0:e.productDistribution)==null?void 0:p.diamond)==null?void 0:g.netProfit)||0).toLocaleString()]}),t.jsxs("td",{children:[(((u=(a=e==null?void 0:e.productDistribution)==null?void 0:a.diamond)==null?void 0:u.revenue)||0)>0?((((y=(m=e==null?void 0:e.productDistribution)==null?void 0:m.diamond)==null?void 0:y.netProfit)||0)/(((S=(b=e==null?void 0:e.productDistribution)==null?void 0:b.diamond)==null?void 0:S.revenue)||1)*100).toFixed(1):0,"%"]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:600},children:"Finished Jewelry"}),t.jsx("td",{children:((R=(P=e==null?void 0:e.productDistribution)==null?void 0:P.jewelry)==null?void 0:R.orders)||0}),t.jsxs("td",{style:{fontWeight:700},children:["$",(((v=(W=e==null?void 0:e.productDistribution)==null?void 0:W.jewelry)==null?void 0:v.revenue)||0).toLocaleString()]}),t.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",(((C=(D=e==null?void 0:e.productDistribution)==null?void 0:D.jewelry)==null?void 0:C.netProfit)||0).toLocaleString()]}),t.jsxs("td",{children:[(((w=(L=e==null?void 0:e.productDistribution)==null?void 0:L.jewelry)==null?void 0:w.revenue)||0)>0?((((k=($=e==null?void 0:e.productDistribution)==null?void 0:$.jewelry)==null?void 0:k.netProfit)||0)/(((I=(N=e==null?void 0:e.productDistribution)==null?void 0:N.jewelry)==null?void 0:I.revenue)||1)*100).toFixed(1):0,"%"]})]})]})]}),r==="staff"&&t.jsxs(c,{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Sales Representative"}),t.jsx("th",{children:"Total Orders"}),t.jsx("th",{children:"Sales Volume (USD)"}),t.jsx("th",{children:"Net Profit (USD)"}),t.jsx("th",{children:"Commission (USD)"}),t.jsx("th",{children:"Net Profit (INR)"})]})}),t.jsx("tbody",{children:(T=e==null?void 0:e.salesPersonPerformance)==null?void 0:T.map((i,X)=>t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:600},children:i.name}),t.jsx("td",{children:i.orders}),t.jsxs("td",{style:{fontWeight:700},children:["$",i.revenue.toLocaleString()]}),t.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",i.netProfitUSD.toLocaleString()]}),t.jsxs("td",{style:{color:"#d97706"},children:["$",i.commissionUSD.toLocaleString()]}),t.jsxs("td",{children:["₹",i.netProfitINR.toLocaleString()]})]},X))})]}),r==="profit"&&t.jsxs(c,{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Financial Metric"}),t.jsx("th",{children:"Value (USD)"}),t.jsxs("th",{children:["Value (INR @ ",(z=e==null?void 0:e.metrics)==null?void 0:z.dollarRate,")"]})]})}),t.jsxs("tbody",{children:[t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:600},children:"Total Billed Revenue"}),t.jsxs("td",{style:{fontWeight:700},children:["$",(((U=e==null?void 0:e.metrics)==null?void 0:U.totalRevenue)||0).toLocaleString()]}),t.jsxs("td",{children:["₹",((((B=e==null?void 0:e.metrics)==null?void 0:B.totalRevenue)||0)*(((E=e==null?void 0:e.metrics)==null?void 0:E.dollarRate)||94.55)).toLocaleString()]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:600},children:"Procurement Cost (COGS)"}),t.jsxs("td",{children:["$",(((A=e==null?void 0:e.metrics)==null?void 0:A.totalPurchaseCost)||0).toLocaleString()]}),t.jsxs("td",{children:["₹",((((F=e==null?void 0:e.metrics)==null?void 0:F.totalPurchaseCost)||0)*(((M=e==null?void 0:e.metrics)==null?void 0:M.dollarRate)||94.55)).toLocaleString()]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:600},children:"Net Operational Profit"}),t.jsxs("td",{style:{color:"#16a34a",fontWeight:700},children:["$",(((O=e==null?void 0:e.metrics)==null?void 0:O.totalNetProfit)||0).toLocaleString()]}),t.jsxs("td",{style:{color:"#16a34a",fontWeight:700},children:["₹",(((V=e==null?void 0:e.metrics)==null?void 0:V.totalNetProfitINR)||0).toLocaleString()]})]}),t.jsxs("tr",{children:[t.jsx("td",{style:{fontWeight:600},children:"Total Sales Commission"}),t.jsxs("td",{style:{color:"#d97706",fontWeight:700},children:["$",(((G=e==null?void 0:e.metrics)==null?void 0:G.totalCommission)||0).toLocaleString()]}),t.jsxs("td",{style:{color:"#d97706",fontWeight:700},children:["₹",(((H=e==null?void 0:e.metrics)==null?void 0:H.totalCommissionINR)||0).toLocaleString()]})]}),t.jsxs("tr",{style:{background:"#f8fafc"},children:[t.jsx("td",{style:{fontWeight:800},children:"Retained Company Profit"}),t.jsxs("td",{style:{color:"#0d1319",fontWeight:800},children:["$",(((J=e==null?void 0:e.metrics)==null?void 0:J.totalProfitAfterCommission)||0).toLocaleString()]}),t.jsxs("td",{style:{color:"#0d1319",fontWeight:800},children:["₹",(((q=e==null?void 0:e.metrics)==null?void 0:q.profitAfterCommissionINR)||0).toLocaleString()]})]})]})]})]})};export{ce as BusinessReportsPage};
