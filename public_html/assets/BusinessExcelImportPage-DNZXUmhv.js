import{r as o,j as e,b8 as C,A as z,a as D}from"./react-vendor-BXyx942q.js";import{g as a}from"./ui-vendor-VHkRGmvp.js";import{b as v}from"./businessApi-k95MMcEU.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-pages-BTB8K7Fd.js";import"./admin-tools-vendor-CKN5doRT.js";const N=a.div`
  margin-bottom: 24px;
`,P=a.div`
  background: #ffffff;
  border: 2px dashed #cbd5e1;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  margin-bottom: 24px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #0d1319;
    background: #f8fafc;
  }
`,W=a.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 14px;
  margin-bottom: 20px;
`,p=a.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-left: 4px solid ${({$color:c})=>c||"#0d1319"};
  border-radius: 8px;
  padding: 16px;

  .label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #64748b;
  }
  .val {
    font-size: 1.4rem;
    font-weight: 800;
    color: #0f172a;
    margin-top: 4px;
  }
`,$=a.div`
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  overflow-x: auto;
  margin-bottom: 24px;
`,T=a.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.78rem;
  white-space: nowrap;

  th {
    background: #0d1319;
    color: #ffffff;
    padding: 10px 12px;
    text-align: left;
  }

  td {
    padding: 8px 12px;
    border-bottom: 1px solid #f1f5f9;
  }
`,B=()=>{var b;const[c,S]=o.useState(null),[w,h]=o.useState(!1),[i,f]=o.useState(null),[m,g]=o.useState(!1),[x,u]=o.useState(null),[j,k]=o.useState(!0),R=async t=>{var n,d;if(!t.target.files||t.target.files.length===0)return;const r=t.target.files[0];S(r),f(null),u(null),h(!0);const s=new FormData;s.append("file",r);try{const l=await v.validateSalesImport(s);f(l)}catch(l){alert(((d=(n=l==null?void 0:l.response)==null?void 0:n.data)==null?void 0:d.message)||"Validation failed")}finally{h(!1)}},I=async()=>{var t,r;if(!(!i||!i.allRows)){g(!0);try{const s=await v.executeSalesImport({rows:i.allRows,skipDuplicates:j});u(s),alert(`✅ Migration Complete! ${s.importedCount} sales imported.`)}catch(s){alert(((r=(t=s==null?void 0:s.response)==null?void 0:t.data)==null?void 0:r.message)||"Import execution failed")}finally{g(!1)}}};return e.jsxs("div",{children:[e.jsxs(N,{children:[e.jsx("h1",{style:{fontSize:"1.4rem",fontWeight:800,color:"#0f172a",margin:0},children:"Excel Sales Tracker Migration & Importer"}),e.jsxs("p",{style:{fontSize:"0.8rem",color:"#64748b",margin:"4px 0 0 0"},children:["Upload ",e.jsx("code",{style:{background:"#f1f5f9",padding:"2px 4px"},children:"Sales Tracker Final.xlsx"})," to migrate all historical records without altering calculations"]})]}),e.jsxs(P,{onClick:()=>{var t;return(t=document.getElementById("excelFileInput"))==null?void 0:t.click()},children:[e.jsx("input",{type:"file",id:"excelFileInput",accept:".xlsx, .xls, .csv",onChange:R,style:{display:"none"}}),e.jsx(C,{size:44,color:"#0d1319",style:{margin:"0 auto 12px auto"}}),e.jsx("div",{style:{fontSize:"1rem",fontWeight:700,color:"#0f172a"},children:c?c.name:"Click or Drag & Drop Excel Spreadsheet"}),e.jsx("div",{style:{fontSize:"0.78rem",color:"#64748b",marginTop:4},children:"Supports .xlsx, .xls, and .csv with automatic 46-column header detection"}),w&&e.jsx("div",{style:{marginTop:12,color:"#2563eb",fontWeight:600},children:"Validating spreadsheet rows..."})]}),i&&e.jsxs("div",{children:[e.jsxs(W,{children:[e.jsxs(p,{$color:"#2563eb",children:[e.jsx("div",{className:"label",children:"Total Rows Detected"}),e.jsx("div",{className:"val",children:i.totalRows})]}),e.jsxs(p,{$color:"#16a34a",children:[e.jsx("div",{className:"label",children:"Valid New Invoices"}),e.jsx("div",{className:"val",style:{color:"#16a34a"},children:i.validRows})]}),e.jsxs(p,{$color:"#d97706",children:[e.jsx("div",{className:"label",children:"Existing Duplicates"}),e.jsx("div",{className:"val",style:{color:"#d97706"},children:i.duplicateRows})]}),e.jsxs(p,{$color:"#dc2626",children:[e.jsx("div",{className:"label",children:"Invalid Rows"}),e.jsx("div",{className:"val",style:{color:"#dc2626"},children:i.invalidRows})]})]}),e.jsxs("div",{style:{background:"#ffffff",border:"1px solid #e2e8f0",borderRadius:8,padding:"12px 18px",marginBottom:16,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8},children:[e.jsx("input",{type:"checkbox",id:"skipDupCheck",checked:j,onChange:t=>k(t.target.checked)}),e.jsx("label",{htmlFor:"skipDupCheck",style:{fontSize:"0.82rem",fontWeight:600,cursor:"pointer"},children:"Skip already imported invoice numbers (Recommended to avoid duplicates)"})]}),e.jsxs("button",{onClick:I,disabled:m,style:{display:"flex",alignItems:"center",gap:8,padding:"10px 22px",background:"#0d1319",color:"#ffffff",border:"none",borderRadius:6,fontWeight:700,fontSize:"0.85rem",cursor:"pointer"},children:[m?"Importing Rows...":"Execute Database Migration"," ",e.jsx(z,{size:15})]})]}),e.jsx("h3",{style:{fontSize:"0.92rem",fontWeight:700,margin:"20px 0 10px 0"},children:"Data Preview (First 20 Rows)"}),e.jsx($,{children:e.jsxs(T,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Row #"}),e.jsx("th",{children:"Invoice No"}),e.jsx("th",{children:"Date"}),e.jsx("th",{children:"Customer"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Shape / Item"}),e.jsx("th",{children:"Carat"}),e.jsx("th",{children:"Selling Price"}),e.jsx("th",{children:"Final Sale"}),e.jsx("th",{children:"Purchase Price"}),e.jsx("th",{children:"Gross Profit"}),e.jsx("th",{children:"Net Profit"}),e.jsx("th",{children:"Sales Person"}),e.jsx("th",{children:"Commission"}),e.jsx("th",{children:"Status"})]})}),e.jsx("tbody",{children:(b=i.preview)==null?void 0:b.map(t=>{var r,s,n,d,l,y;return e.jsxs("tr",{children:[e.jsx("td",{children:t.rowIndex}),e.jsx("td",{style:{fontWeight:700},children:t.invoiceNo}),e.jsx("td",{children:t.saleDate}),e.jsx("td",{children:t.customerName}),e.jsx("td",{children:t.productType}),e.jsx("td",{children:t.shape||t.productDescription||"-"}),e.jsx("td",{children:t.caratWeight||"-"}),e.jsxs("td",{children:["$",(r=t.sellingPrice)==null?void 0:r.toLocaleString()]}),e.jsxs("td",{style:{fontWeight:700},children:["$",(s=t.finalSaleAmount)==null?void 0:s.toLocaleString()]}),e.jsxs("td",{children:["$",(n=t.purchasePrice)==null?void 0:n.toLocaleString()]}),e.jsxs("td",{children:["$",(d=t.grossProfit)==null?void 0:d.toLocaleString()]}),e.jsxs("td",{style:{color:"#16a34a",fontWeight:600},children:["$",(l=t.netProfit)==null?void 0:l.toLocaleString()]}),e.jsx("td",{children:t.salesPersonName}),e.jsxs("td",{style:{color:"#d97706"},children:["$",(y=t.commissionAmount)==null?void 0:y.toLocaleString()]}),e.jsx("td",{children:t.isDuplicate?e.jsx("span",{style:{fontSize:"0.7rem",padding:"2px 6px",background:"#fff9db",color:"#f59f00",borderRadius:4,fontWeight:700},children:"Duplicate"}):e.jsx("span",{style:{fontSize:"0.7rem",padding:"2px 6px",background:"#ebfbee",color:"#2b8a3e",borderRadius:4,fontWeight:700},children:"Ready"})})]},t.rowIndex)})})]})})]}),x&&e.jsxs("div",{style:{background:"#ebfbee",border:"1px solid #b2f2bb",borderRadius:8,padding:20,color:"#2b8a3e"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:8,fontSize:"1.1rem",fontWeight:700},children:[e.jsx(D,{size:20})," Migration Successful"]}),e.jsxs("div",{style:{marginTop:8,fontSize:"0.85rem"},children:["Successfully imported ",e.jsx("strong",{children:x.importedCount})," records. Skipped ",x.skippedCount," duplicates."]})]})]})};export{B as BusinessExcelImportPage};
