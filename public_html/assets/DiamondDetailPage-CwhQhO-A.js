import{ao as u,r as n,j as e,ap as j,aX as b,a3 as y,f as v}from"./react-vendor-BsBv4awM.js";import{g as r}from"./ui-vendor-C0FaE403.js";import{a as c,R as p,S as w}from"./admin-pages-BYybl7sm.js";import{g as N}from"./diamondImageHelper-BFWwNb-k.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const x=r.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 48px 24px 80px;
  color: #F5F1E8;
`,A=r(v)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #A8A8A8;
  margin-bottom: 32px;
  text-decoration: none;
  transition: color 0.2s ease;
  &:hover {
    color: #C9A96E;
  }
`,C=r.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 64px;

  @media (max-width: ${({theme:i})=>i.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`,E=r.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`,I=r.div`
  aspect-ratio: 1 / 1;
  background-color: #111111;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 6px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img, video {
    width: 90%;
    height: 90%;
    object-fit: contain;
  }
`,k=r.h1`
  font-family: ${({theme:i})=>i.fonts.heading};
  font-size: 2.4rem;
  color: #F5F1E8;
  margin-bottom: 12px;
`,D=r.div`
  font-size: 2rem;
  font-weight: 700;
  color: #C9A96E;
  margin-bottom: 24px;
`,$=r.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 24px;
  padding: 24px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 6px;
  margin-bottom: 32px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding: 16px;
  }
`,s=r.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .label {
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #A8A8A8;
  }

  .val {
    font-size: 0.95rem;
    font-weight: 600;
    color: #F5F1E8;
  }
`,F=r.button`
  width: 100%;
  padding: 16px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 16px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.25s ease;

  background-color: ${({$isWhatsapp:i})=>i?"#25D366":"#C9A96E"};
  color: ${({$isWhatsapp:i})=>i?"#ffffff":"#0B0B0B"};
  border: none;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
`,L=()=>{const{id:i}=u(),[a,m]=n.useState(null),[l,d]=n.useState("image"),[h,g]=n.useState("917990278892");if(n.useEffect(()=>{c.getSiteSettings().then(t=>{if(t&&t.whatsappNumber){const o=t.whatsappNumber.replace(/[^\d]/g,"");o&&g(o)}}).catch(console.error),i&&c.getDiamondById(i).then(m).catch(console.error)},[i]),n.useLayoutEffect(()=>{a&&(window.scrollTo(0,0),document.documentElement.scrollTop=0,document.body.scrollTop=0)},[a==null?void 0:a.id]),!a)return e.jsx(x,{children:"Loading diamond details..."});const f=async()=>{try{const t=await c.getWhatsAppInquiryMessage(a.diamondId);window.open(t.whatsappUrl,"_blank")}catch{const o=`Hello AethelCarats Fine Jewellery Atelier,

I am interested in Diamond ${a.diamondId} (${a.carat}ct ${a.shape}, Color ${a.color}, Clarity ${a.clarity}).

Link: ${window.location.href}`;window.open(`https://wa.me/${h}?text=${encodeURIComponent(o)}`,"_blank")}};return e.jsxs(x,{children:[e.jsxs(A,{to:"/diamonds",children:[e.jsx(j,{size:16})," Back to The Diamond Vault"]}),e.jsxs(C,{children:[e.jsx(p,{yOffset:35,children:e.jsxs(E,{children:[e.jsx(I,{children:l==="video"&&a.videoUrl?a.videoUrl.endsWith(".mp4")||a.videoUrl.endsWith(".webm")?e.jsx("video",{src:a.videoUrl,autoPlay:!0,loop:!0,muted:!0,controls:!0,style:{width:"100%",height:"100%",objectFit:"contain"}}):e.jsx("iframe",{src:a.videoUrl,title:`${a.diamondId} 360 View`,style:{width:"100%",height:"100%",minHeight:"400px",border:"none"},allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowFullScreen:!0}):e.jsx(w,{src:N(a),alt:`${a.carat}ct ${a.shape}`})}),a.videoUrl&&e.jsxs("div",{style:{display:"flex",gap:12,marginTop:16},children:[e.jsx("button",{onClick:()=>d("image"),style:{padding:"8px 16px",border:"1px solid rgba(140, 116, 75, 0.3)",background:l==="image"?"#C9A96E":"#151515",color:l==="image"?"#0B0B0B":"#F5F1E8",fontWeight:600,borderRadius:4,cursor:"pointer"},children:"IMAGE"}),e.jsx("button",{onClick:()=>d("video"),style:{padding:"8px 16px",border:"1px solid rgba(140, 116, 75, 0.3)",background:l==="video"?"#C9A96E":"#151515",color:l==="video"?"#0B0B0B":"#F5F1E8",fontWeight:600,borderRadius:4,cursor:"pointer"},children:"360° VIDEO"})]})]})}),e.jsx(p,{yOffset:35,children:e.jsxs("div",{children:[e.jsxs(k,{children:[a.carat.toFixed(2)," Carat ",a.shape," Diamond"]}),e.jsxs(D,{children:["$",a.price.toLocaleString()," USD"]}),e.jsxs(F,{$isWhatsapp:!0,onClick:f,children:[e.jsx(b,{size:20})," INQUIRE ON WHATSAPP"]}),e.jsxs($,{children:[e.jsxs(s,{children:[e.jsx("span",{className:"label",children:"Diamond ID"}),e.jsx("span",{className:"val",children:a.diamondId})]}),e.jsxs(s,{children:[e.jsx("span",{className:"label",children:"Type"}),e.jsx("span",{className:"val",children:a.diamondType==="LAB_GROWN"?"Lab-Grown":"Natural"})]}),e.jsxs(s,{children:[e.jsx("span",{className:"label",children:"Shape"}),e.jsx("span",{className:"val",children:a.shape})]}),e.jsxs(s,{children:[e.jsx("span",{className:"label",children:"Carat Weight"}),e.jsxs("span",{className:"val",children:[a.carat,"ct"]})]}),e.jsxs(s,{children:[e.jsx("span",{className:"label",children:"Color Grade"}),e.jsx("span",{className:"val",children:a.color})]}),e.jsxs(s,{children:[e.jsx("span",{className:"label",children:"Clarity Grade"}),e.jsx("span",{className:"val",children:a.clarity})]}),e.jsxs(s,{children:[e.jsx("span",{className:"label",children:"Cut Grade"}),e.jsx("span",{className:"val",children:a.cut||"Excellent"})]}),e.jsxs(s,{children:[e.jsx("span",{className:"label",children:"Polish"}),e.jsx("span",{className:"val",children:a.polish||"Excellent"})]}),e.jsxs(s,{children:[e.jsx("span",{className:"label",children:"Symmetry"}),e.jsx("span",{className:"val",children:a.symmetry||"Excellent"})]}),e.jsxs(s,{children:[e.jsx("span",{className:"label",children:"Fluorescence"}),e.jsx("span",{className:"val",children:a.fluorescence||"None"})]}),e.jsxs(s,{children:[e.jsx("span",{className:"label",children:"Lab Grading"}),e.jsx("span",{className:"val",children:a.lab||"GIA"})]}),e.jsxs(s,{children:[e.jsx("span",{className:"label",children:"Certificate No."}),e.jsx("span",{className:"val",children:a.certificateNumber||"Verified"})]})]}),a.certificateUrl&&e.jsxs("a",{href:a.certificateUrl,target:"_blank",rel:"noopener noreferrer",style:{display:"inline-flex",alignItems:"center",gap:8,fontSize:"0.85rem",color:"#C9A96E",fontWeight:600,textDecoration:"none"},children:[e.jsx(y,{size:16})," View Official ",a.lab||"GIA"," Digital Grading Report"]})]})})]})]})};export{L as DiamondDetailPage};
