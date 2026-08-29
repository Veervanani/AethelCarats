import{ap as j,r as o,j as e,aq as u,s as b,O as y,f as w}from"./react-vendor-BRIbQ1pk.js";import{g as r}from"./ui-vendor-B_xwrEci.js";import{a as c,R as p,S as v}from"./admin-pages-BLrzeU5I.js";import{g as N}from"./diamondImageHelper-BFWwNb-k.js";import"./swiper-vendor-B7SuwHD8.js";import"./admin-tools-vendor-CKN5doRT.js";const m=r.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 48px 24px 80px;
`,$=r(w)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: ${({theme:s})=>s.colors.textSecondary};
  margin-bottom: 32px;
  &:hover {
    color: ${({theme:s})=>s.colors.gold};
  }
`,k=r.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 64px;

  @media (max-width: ${({theme:s})=>s.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`,I=r.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,S=r.div`
  aspect-ratio: 1 / 1;
  background-color: #f5f2ea;
  border: 1px solid ${({theme:s})=>s.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img, video {
    width: 90%;
    height: 90%;
    object-fit: contain;
  }
`,D=r.h1`
  font-family: ${({theme:s})=>s.fonts.heading};
  font-size: 2.4rem;
  color: ${({theme:s})=>s.colors.textPrimary};
  margin-bottom: 12px;
`,C=r.div`
  font-size: 2rem;
  font-weight: 600;
  color: ${({theme:s})=>s.colors.textPrimary};
  margin-bottom: 24px;
`,U=r.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 24px;
  padding: 24px;
  background-color: ${({theme:s})=>s.colors.white};
  border: 1px solid ${({theme:s})=>s.colors.border};
  margin-bottom: 32px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }
`,i=r.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .label {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({theme:s})=>s.colors.textSecondary};
  }

  .val {
    font-size: 0.95rem;
    font-weight: 600;
    color: ${({theme:s})=>s.colors.textPrimary};
  }
`,A=r.button`
  width: 100%;
  padding: 16px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
  transition: all 0.25s ease;

  background-color: ${({$isWhatsapp:s,theme:a})=>s?"#25D366":a.colors.textPrimary};
  color: ${({theme:s})=>s.colors.white};
  border: none;

  &:hover {
    opacity: 0.9;
  }
`,W=()=>{const{id:s}=j(),[a,x]=o.useState(null),[t,d]=o.useState("image"),[h,g]=o.useState("447900123456");if(o.useEffect(()=>{c.getSiteSettings().then(l=>{if(l&&l.whatsappNumber){const n=l.whatsappNumber.replace(/[^\d]/g,"");n&&g(n)}}).catch(console.error),s&&c.getDiamondById(s).then(x).catch(console.error)},[s]),o.useLayoutEffect(()=>{a&&(window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0)},[a==null?void 0:a.id]),!a)return e.jsx(m,{children:"Loading diamond details..."});const f=async()=>{try{const l=await c.getWhatsAppInquiryMessage(a.diamondId);window.open(l.whatsappUrl,"_blank")}catch{const n=`Hello Floksy Jewel Atelier,

I am interested in Diamond ${a.diamondId} (${a.carat}ct ${a.shape}, Color ${a.color}, Clarity ${a.clarity}).

Link: ${window.location.href}`;window.open(`https://wa.me/${h}?text=${encodeURIComponent(n)}`,"_blank")}};return e.jsxs(m,{children:[e.jsxs($,{to:"/diamonds",children:[e.jsx(u,{size:16})," Back to The Diamond Vault"]}),e.jsxs(k,{children:[e.jsx(p,{yOffset:35,children:e.jsxs(I,{children:[e.jsx(S,{children:t==="video"&&a.videoUrl?a.videoUrl.endsWith(".mp4")||a.videoUrl.endsWith(".webm")?e.jsx("video",{src:a.videoUrl,autoPlay:!0,loop:!0,muted:!0,controls:!0,style:{width:"100%",height:"100%",objectFit:"contain"}}):e.jsx("iframe",{src:a.videoUrl,title:`${a.diamondId} 360 View`,style:{width:"100%",height:"100%",minHeight:"400px",border:"none"},allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}):e.jsx(v,{src:N(a),alt:`${a.carat}ct ${a.shape}`})}),a.videoUrl&&e.jsxs("div",{style:{display:"flex",gap:12,marginTop:16},children:[e.jsx("button",{onClick:()=>d("image"),style:{padding:"8px 16px",border:"1px solid #ccc",background:t==="image"?"#242321":"white",color:t==="image"?"white":"black",cursor:"pointer"},children:"IMAGE"}),e.jsx("button",{onClick:()=>d("video"),style:{padding:"8px 16px",border:"1px solid #ccc",background:t==="video"?"#242321":"white",color:t==="video"?"white":"black",cursor:"pointer"},children:"360° VIDEO"})]})]})}),e.jsx(p,{yOffset:35,children:e.jsxs("div",{children:[e.jsxs(D,{children:[a.carat.toFixed(2)," Carat ",a.shape," Diamond"]}),e.jsxs(C,{children:["$",a.price.toLocaleString()," USD"]}),e.jsxs(A,{$isWhatsapp:!0,onClick:f,children:[e.jsx(b,{size:20})," INQUIRE ON WHATSAPP"]}),e.jsxs(U,{children:[e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Diamond ID"}),e.jsx("span",{className:"val",children:a.diamondId})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Type"}),e.jsx("span",{className:"val",children:a.diamondType==="LAB_GROWN"?"Lab-Grown":"Natural"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Shape"}),e.jsx("span",{className:"val",children:a.shape})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Carat Weight"}),e.jsxs("span",{className:"val",children:[a.carat,"ct"]})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Color Grade"}),e.jsx("span",{className:"val",children:a.color})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Clarity Grade"}),e.jsx("span",{className:"val",children:a.clarity})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Cut Grade"}),e.jsx("span",{className:"val",children:a.cut||"Excellent"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Polish"}),e.jsx("span",{className:"val",children:a.polish||"Excellent"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Symmetry"}),e.jsx("span",{className:"val",children:a.symmetry||"Excellent"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Fluorescence"}),e.jsx("span",{className:"val",children:a.fluorescence||"None"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Lab Grading"}),e.jsx("span",{className:"val",children:a.lab||"GIA"})]}),e.jsxs(i,{children:[e.jsx("span",{className:"label",children:"Certificate No."}),e.jsx("span",{className:"val",children:a.certificateNumber||"Verified"})]})]}),a.certificateUrl&&e.jsxs("a",{href:a.certificateUrl,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:8,fontSize:"0.85rem",color:"#B8944D",fontWeight:600},children:[e.jsx(y,{size:16})," View Official ",a.lab||"GIA"," Digital Grading Report"]})]})})]})]})};export{W as DiamondDetailPage};
