import{r as l,j as e,f as p,X as Q,ag as V}from"./react-vendor-BsBv4awM.js";import{g as t}from"./ui-vendor-C0FaE403.js";import{a as j,S,R as u}from"./admin-pages-SkiHNLol.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const Z=t.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 32px 24px 80px;
  color: #F5F1E8;

  @media (max-width: 768px) {
    padding: 16px 16px 60px;
  }
`,X=t.nav`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: #A8A8A8;
  margin-bottom: 32px;

  a {
    color: #A8A8A8;
    text-decoration: none;
    &:hover {
      color: #C9A96E;
    }
  }

  span.current {
    color: #F5F1E8;
    font-weight: 600;
  }
`,$=t.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-bottom: 64px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`,D=t.div`
  h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 3rem;
    color: #F5F1E8;
    line-height: 1.15;
    margin-bottom: 16px;
  }

  p.subtitle {
    font-size: 1.15rem;
    color: #C9A96E;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  p.desc {
    font-size: 1rem;
    color: #D8D2C5;
    line-height: 1.8;
  }
`,ee=t.div`
  aspect-ratio: 4 / 3;
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`,x=t.div`
  max-width: 800px;
  margin: 0 auto 64px;
  text-align: center;

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    color: #F5F1E8;
    margin-bottom: 16px;
  }

  p {
    font-size: 1rem;
    color: #D8D2C5;
    line-height: 1.8;
  }
`,re=t.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  color: #F5F1E8;
  padding: 48px 32px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 80px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 24px;
  }

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    color: #F5F1E8;
    margin: 0;
  }

  a.cta-btn {
    padding: 14px 28px;
    background: #C9A96E;
    color: #0B0B0B;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.85rem;
    transition: all 0.2s ease;

    &:hover {
      background: #DFBA73;
      transform: translateY(-2px);
    }
  }
`,C=t.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  margin-bottom: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .content-side {
    h3 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.2rem;
      color: #F5F1E8;
      margin-bottom: 16px;
    }

    p {
      font-size: 0.95rem;
      color: #D8D2C5;
      line-height: 1.8;
      margin-bottom: 24px;
    }

    button.action-btn {
      padding: 14px 24px;
      background: #C9A96E;
      color: #0B0B0B;
      border: none;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-size: 0.82rem;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #DFBA73;
        transform: translateY(-2px);
      }
    }
  }

  .media-side {
    background: #151515;
    border: 1px solid rgba(140, 116, 75, 0.25);
    border-radius: 6px;
    overflow: hidden;
    padding: 24px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);

    img {
      max-width: 100%;
      height: auto;
      object-fit: contain;
    }
  }
`,ie=t.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`,te=t.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 6px;
  padding: 32px 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: #C9A96E;
  }

  .num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.5rem;
    color: #C9A96E;
    font-weight: 700;
    margin-bottom: 12px;
  }

  h4 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.4rem;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.88rem;
    color: #D8D2C5;
    line-height: 1.7;
  }
`,ne=t.div`
  margin-bottom: 80px;
  overflow-x: auto;
  max-width: 100%;
  -webkit-overflow-scrolling: touch;

  h3 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    color: #F5F1E8;
    margin-bottom: 20px;
    text-align: center;
  }
`,oe=t.table`
  width: 100%;
  min-width: 600px;
  border-collapse: collapse;
  font-size: 0.85rem;
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  color: #D8D2C5;

  th,
  td {
    padding: 12px 16px;
    text-align: center;
    border: 1px solid rgba(140, 116, 75, 0.2);
  }

  th {
    background: #1F1F1F;
    color: #F5F1E8;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-size: 0.78rem;
    border-bottom: 1px solid rgba(140, 116, 75, 0.35);
  }

  tr:nth-child(even) {
    background: #111111;
  }
`,se=t.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,ae=t.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  border-radius: 8px;
  padding: 36px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  color: #F5F1E8;
`,ue=()=>{var b,y;const[F,g]=l.useState(!1),[z,v]=l.useState(!1),[o,c]=l.useState({name:"",email:"",address:"",city:"",postalCode:""}),[r,k]=l.useState(null),[a,E]=l.useState(null);l.useEffect(()=>{window.scrollTo(0,0),j.getRingSizeGuide().then(i=>{if(i){if(typeof i.conversionsJson=="string")try{i.conversions=JSON.parse(i.conversionsJson)}catch{}if(typeof i.measureStepsJson=="string")try{i.measureSteps=JSON.parse(i.measureStepsJson)}catch{}k(i),i.seoTitle&&(document.title=i.seoTitle)}}).catch(i=>console.error("Failed to fetch CMS ring size guide:",i)),j.getPageBySlug("ring-size-guide").then(i=>{var s;if(i){let n={};const m=i.draftContent||i.content;if(m)try{n=typeof m=="string"?JSON.parse(m):m}catch{n={content:m}}E({...i,parsedContent:n}),!(r!=null&&r.seoTitle)&&((s=i.seoMetadata)!=null&&s.seoTitle)&&(document.title=i.seoMetadata.seoTitle)}}).catch(console.warn)},[]);const w=()=>{window.print()},R=i=>{i.preventDefault(),v(!0)},d=(a==null?void 0:a.parsedContent)||{},A=r!=null&&r.conversions&&r.conversions.length>0?r.conversions:[{us:"3",uk:"F",eu:"44",diameter:"14.1 mm",circumference:"44.2 mm"},{us:"3.5",uk:"G",eu:"45",diameter:"14.5 mm",circumference:"45.5 mm"},{us:"4",uk:"H 1/2",eu:"47",diameter:"14.9 mm",circumference:"46.8 mm"},{us:"4.5",uk:"I 1/2",eu:"48",diameter:"15.3 mm",circumference:"48.0 mm"},{us:"5",uk:"J 1/2",eu:"49",diameter:"15.7 mm",circumference:"49.3 mm"},{us:"5.5",uk:"K 1/2",eu:"51",diameter:"16.1 mm",circumference:"50.6 mm"},{us:"6",uk:"L 1/2",eu:"52",diameter:"16.5 mm",circumference:"51.9 mm"},{us:"6.5",uk:"M 1/2",eu:"53",diameter:"16.9 mm",circumference:"53.1 mm"},{us:"7",uk:"N 1/2",eu:"54",diameter:"17.3 mm",circumference:"54.4 mm"},{us:"7.5",uk:"O 1/2",eu:"56",diameter:"17.7 mm",circumference:"55.7 mm"},{us:"8",uk:"P 1/2",eu:"57",diameter:"18.1 mm",circumference:"57.0 mm"},{us:"8.5",uk:"Q 1/2",eu:"58",diameter:"18.5 mm",circumference:"58.3 mm"},{us:"9",uk:"R 1/2",eu:"59",diameter:"18.9 mm",circumference:"59.5 mm"},{us:"9.5",uk:"S 1/2",eu:"61",diameter:"19.4 mm",circumference:"60.8 mm"},{us:"10",uk:"T 1/2",eu:"62",diameter:"19.8 mm",circumference:"62.1 mm"},{us:"10.5",uk:"U 1/2",eu:"63",diameter:"20.2 mm",circumference:"63.4 mm"},{us:"11",uk:"V 1/2",eu:"65",diameter:"20.6 mm",circumference:"64.6 mm"},{us:"11.5",uk:"W 1/2",eu:"66",diameter:"21.0 mm",circumference:"65.9 mm"},{us:"12",uk:"Y",eu:"67",diameter:"21.4 mm",circumference:"67.2 mm"}],B=[{step:1,title:"Measure an Existing Ring",description:"Place an existing ring that fits the target finger over our printable sizing circles until the inside of the ring aligns exactly with the circle perimeter."},{step:2,title:"Measure Your Finger",description:"Wrap a flexible measuring tape or strip of paper snugly around the knuckle base. Mark the overlap point and measure length in millimeters to find circumference."},{step:3,title:"Use Our Free Ring Sizer",description:"Thread the end of our plastic sizer through the buckle. Adjust until it slides comfortably over the knuckle for exact US ring size reading."}],T=r!=null&&r.measureSteps&&r.measureSteps.length>0?r.measureSteps:B,h=(r==null?void 0:r.heroTitle)||d.heading||"How To Measure Your Ring Size",I=(r==null?void 0:r.heroSubtitle)||d.subheading||"Ring Sizer & Conversion Guide",N=(r==null?void 0:r.introParagraphs)||d.introduction||"Discovering your ideal ring size ensures maximum comfort and security for your bespoke AethelCarats creation. Follow our complimentary guide, printable sizer, and international conversion matrix.",G=(r==null?void 0:r.heroImage)||d.desktopImage||((b=d.pageImages)==null?void 0:b.desktopImage)||"/assets/gem_solitaire_ring_perfect.png",H=(r==null?void 0:r.introHeading)||"Finding Your Ring Size",M=(r==null?void 0:r.introContent)||(r==null?void 0:r.introParagraphs)||d.introduction||"Finding the right ring size is one of the most essential steps when choosing an engagement ring or wedding band. AethelCarats provides complimentary resizing within 30 days for all non-custom creation orders.",f=(r==null?void 0:r.sizerHeading)||"Complimentary Plastic Ring Sizer",O=(r==null?void 0:r.sizerDescription)||"Receive a free AethelCarats belt-style plastic ring sizer delivered directly to your doorstep. It works like a belt around your finger for easy, accurate measurements at home.",U=(r==null?void 0:r.sizerButtonText)||"REQUEST FREE RING SIZER",P=(r==null?void 0:r.sizerImage)||"/assets/why-aura/craftsmanship-hero.jpg",W=(r==null?void 0:r.chartTitle)||"Printable Ring Size Chart",Y=(r==null?void 0:r.chartDescription)||"Print our 1:1 scale ring size chart to measure an existing ring or match your finger diameter directly on paper. Ensure page scaling is set to 100% when printing.",J=(r==null?void 0:r.measureHeading)||"How To Measure At Home",q=(r==null?void 0:r.ctaHeading)||"Find Your Perfect AethelCarats Ring",L=(r==null?void 0:r.ctaDescription)||"Explore our certified GIA natural and lab diamond solitaire engagement rings and eternity bands.",_=(r==null?void 0:r.ctaButtonText)||"SHOP RINGS CATALOGUE",K=(r==null?void 0:r.ctaButtonUrl)||"/rings";return e.jsxs(Z,{children:[e.jsxs(X,{children:[e.jsx(p,{to:"/",children:"Home"})," / ",e.jsx(p,{to:"/education",children:"Education"})," / ",e.jsx(p,{to:"/rings",children:"Rings"})," / ",e.jsx("span",{className:"current",children:"Find Your Ring Size"})]}),e.jsxs($,{children:[e.jsxs(D,{children:[e.jsx("p",{className:"subtitle",children:I}),e.jsx("h1",{children:h}),e.jsx("p",{className:"desc",children:N})]}),e.jsx(ee,{children:e.jsx(S,{src:G,alt:h})})]}),e.jsxs(x,{children:[e.jsx("h2",{children:H}),e.jsx("p",{children:M})]}),e.jsx(u,{yOffset:35,children:e.jsxs(re,{children:[e.jsxs("div",{children:[e.jsx("h3",{children:"Browse Our Selection of Fine Rings"}),e.jsx("p",{style:{margin:"8px 0 0",color:"#A8A8A8",fontSize:"0.9rem"},children:"Handcrafted 18K Gold & Platinum Solitaires"})]}),e.jsx(p,{to:"/rings",className:"cta-btn",children:"FIND YOUR RING"})]})}),e.jsx(u,{yOffset:35,children:e.jsxs(C,{children:[e.jsxs("div",{className:"content-side",children:[e.jsx("h3",{children:f}),e.jsx("p",{children:O}),e.jsx("button",{className:"action-btn",onClick:()=>g(!0),children:U})]}),e.jsx("div",{className:"media-side",children:e.jsx(S,{src:P,alt:f,style:{borderRadius:4}})})]})}),e.jsx(u,{yOffset:35,children:e.jsxs(C,{children:[e.jsx("div",{className:"media-side",children:e.jsxs("div",{style:{padding:20,background:"#111111",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:6},children:[e.jsx("div",{style:{fontWeight:700,fontSize:"1.2rem",marginBottom:12,color:"#F5F1E8"},children:"US Standard Diameter Circles"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:12},children:["5","6","7","8","9","10","11","12"].map(i=>e.jsxs("div",{style:{padding:12,border:"1.5px dashed #C9A96E",color:"#F5F1E8",borderRadius:"50%",aspectRatio:"1/1",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:"0.85rem"},children:["US ",i]},i))})]})}),e.jsxs("div",{className:"content-side",children:[e.jsx("h3",{children:W}),e.jsx("p",{children:Y}),e.jsx("button",{className:"action-btn",onClick:w,children:"PRINT RING SIZE CHART"})]})]})}),e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"2.2rem",textAlign:"center",color:"#F5F1E8",marginBottom:32},children:J}),e.jsx(ie,{children:T.map((i,s)=>e.jsxs(te,{children:[e.jsxs("div",{className:"num",children:["0",s+1]}),e.jsx("h4",{children:i.title}),e.jsx("p",{children:i.description})]},s))}),e.jsxs(ne,{children:[e.jsx("h3",{children:"International Ring Size Conversion Chart"}),e.jsxs(oe,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"US Size"}),e.jsx("th",{children:"UK & Australia"}),e.jsx("th",{children:"EU & Japan"}),e.jsx("th",{children:"Inside Diameter (mm)"}),e.jsx("th",{children:"Inside Circumference (mm)"})]})}),e.jsx("tbody",{children:A.map((i,s)=>e.jsxs("tr",{children:[e.jsxs("td",{style:{fontWeight:700,color:"#C9A96E"},children:["US ",i.us]}),e.jsx("td",{children:i.uk}),e.jsx("td",{children:i.eu}),e.jsx("td",{children:i.diameter}),e.jsx("td",{children:i.circumference})]},i.us||s))})]})]}),e.jsxs(x,{style:{background:"#151515",padding:"40px 32px",borderRadius:6,border:"1px solid rgba(140, 116, 75, 0.25)",boxShadow:"0 8px 24px rgba(0,0,0,0.3)"},children:[e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",color:"#F5F1E8",marginBottom:12},children:"Between Two Sizes?"}),e.jsx("p",{style:{fontSize:"0.92rem",color:"#D8D2C5",lineHeight:1.8},children:"If you fall between two sizes, we always recommend sizing up. Fingers fluctuate in size depending on temperature, humidity, and time of day (typically slightly larger in the evening). Wider band styles (above 4mm) also feel tighter than slim solitaire bands."})]}),(y=a==null?void 0:a.sections)==null?void 0:y.map((i,s)=>{if(i.isVisible===!1)return null;let n={};try{n=typeof i.content=="string"?JSON.parse(i.content):i.content||{}}catch{n={text:i.content}}return e.jsx(u,{yOffset:35,children:e.jsxs(x,{style:{background:"#151515",padding:"36px 28px",borderRadius:6,border:"1px solid rgba(140, 116, 75, 0.25)",marginTop:40},children:[e.jsx("h2",{style:{fontFamily:"Cormorant Garamond, serif",color:"#F5F1E8"},children:i.title||n.title||n.heading}),n.subtitle&&e.jsx("h4",{style:{color:"#C9A96E",margin:"8px 0 16px"},children:n.subtitle}),e.jsx("p",{style:{color:"#D8D2C5",lineHeight:1.7,whiteSpace:"pre-line"},children:n.description||n.text||n.content||""})]})},i.id||s)}),e.jsxs("div",{style:{textAlign:"center",marginTop:80,paddingTop:48,borderTop:"1px solid rgba(140, 116, 75, 0.25)"},children:[e.jsx("h2",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"2.5rem",color:"#F5F1E8",marginBottom:16},children:q}),e.jsx("p",{style:{color:"#D8D2C5",fontSize:"1rem",maxWidth:600,margin:"0 auto 28px"},children:L}),e.jsx(p,{to:K,style:{padding:"16px 36px",background:"#C9A96E",color:"#0B0B0B",textDecoration:"none",fontWeight:700,letterSpacing:"0.1em",borderRadius:4,display:"inline-block"},children:_})]}),F&&e.jsx(se,{onClick:()=>g(!1),children:e.jsxs(ae,{onClick:i=>i.stopPropagation(),children:[e.jsx("button",{onClick:()=>g(!1),style:{position:"absolute",top:16,right:16,background:"none",border:"none",cursor:"pointer",color:"#A8A8A8"},children:e.jsx(Q,{size:20})}),z?e.jsxs("div",{style:{textAlign:"center",padding:"24px 0"},children:[e.jsx(V,{size:48,color:"#C9A96E",style:{marginBottom:16}}),e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",color:"#F5F1E8",marginBottom:8},children:"Free Sizer Requested!"}),e.jsx("p",{style:{color:"#D8D2C5",fontSize:"0.9rem"},children:"We are mailing your complimentary AethelCarats Ring Sizer to your address. Estimated arrival: 3-5 business days."})]}):e.jsxs("form",{onSubmit:R,children:[e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",color:"#F5F1E8",marginBottom:12},children:"Request Free Ring Sizer"}),e.jsx("p",{style:{color:"#D8D2C5",fontSize:"0.85rem",marginBottom:20},children:"We will mail a free plastic belt sizer directly to your home."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx("input",{type:"text",required:!0,placeholder:"Full Name",value:o.name,onChange:i=>c({...o,name:i.target.value}),style:{padding:12,background:"#111111",color:"#F5F1E8",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,outline:"none"}}),e.jsx("input",{type:"email",required:!0,placeholder:"Email Address",value:o.email,onChange:i=>c({...o,email:i.target.value}),style:{padding:12,background:"#111111",color:"#F5F1E8",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,outline:"none"}}),e.jsx("input",{type:"text",required:!0,placeholder:"Shipping Street Address",value:o.address,onChange:i=>c({...o,address:i.target.value}),style:{padding:12,background:"#111111",color:"#F5F1E8",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,outline:"none"}}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[e.jsx("input",{type:"text",required:!0,placeholder:"City",value:o.city,onChange:i=>c({...o,city:i.target.value}),style:{padding:12,background:"#111111",color:"#F5F1E8",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,outline:"none"}}),e.jsx("input",{type:"text",required:!0,placeholder:"Postal Code",value:o.postalCode,onChange:i=>c({...o,postalCode:i.target.value}),style:{padding:12,background:"#111111",color:"#F5F1E8",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,outline:"none"}})]}),e.jsx("button",{type:"submit",style:{marginTop:12,padding:14,background:"#C9A96E",color:"#0B0B0B",border:"none",borderRadius:4,fontWeight:700,cursor:"pointer",letterSpacing:"0.08em"},children:"SUBMIT MAILING REQUEST"})]})]})]})})]})};export{ue as FindYourRingSizePage};
