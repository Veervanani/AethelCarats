import{r as o,j as e,f as s,X as C,ag as F}from"./react-vendor-BsBv4awM.js";import{g as i}from"./ui-vendor-C0FaE403.js";import{S as m,R as l}from"./admin-pages-Ry4OMD_D.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const S=i.div`
  max-width: 1300px;
  margin: 0 auto;
  padding: 32px 24px 80px;
  color: #F5F1E8;

  @media (max-width: 768px) {
    padding: 16px 16px 60px;
  }
`,v=i.nav`
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
`,z=i.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  align-items: center;
  margin-bottom: 64px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`,k=i.div`
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
`,E=i.div`
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
`,p=i.div`
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
`,w=i.div`
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
`,u=i.div`
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
`,R=i.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 80px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`,c=i.div`
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
`,A=i.div`
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
`,B=i.table`
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
`,D=i.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`,N=i.div`
  background: #151515;
  border: 1px solid rgba(140, 116, 75, 0.3);
  border-radius: 8px;
  padding: 36px;
  max-width: 500px;
  width: 100%;
  position: relative;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
  color: #F5F1E8;
`,P=()=>{const[g,a]=o.useState(!1),[x,h]=o.useState(!1),[t,n]=o.useState({name:"",email:"",address:"",city:"",postalCode:""}),[d,f]=o.useState(null);o.useEffect(()=>{fetch("/api/v1/ring-size-guide").then(r=>r.json()).then(r=>{if(r){if(typeof r.conversionsJson=="string")try{r.conversions=JSON.parse(r.conversionsJson)}catch{}if(typeof r.measureStepsJson=="string")try{r.measureSteps=JSON.parse(r.measureStepsJson)}catch{}f(r)}}).catch(r=>console.error("Failed to fetch CMS ring size guide:",r))},[]);const b=()=>{window.print()},j=r=>{r.preventDefault(),h(!0)},y=(d==null?void 0:d.conversions)||[{us:"3",uk:"F",eu:"44",diameter:"14.1 mm",circumference:"44.2 mm"},{us:"3.5",uk:"G",eu:"45",diameter:"14.5 mm",circumference:"45.5 mm"},{us:"4",uk:"H 1/2",eu:"47",diameter:"14.9 mm",circumference:"46.8 mm"},{us:"4.5",uk:"I 1/2",eu:"48",diameter:"15.3 mm",circumference:"48.0 mm"},{us:"5",uk:"J 1/2",eu:"49",diameter:"15.7 mm",circumference:"49.3 mm"},{us:"5.5",uk:"K 1/2",eu:"51",diameter:"16.1 mm",circumference:"50.6 mm"},{us:"6",uk:"L 1/2",eu:"52",diameter:"16.5 mm",circumference:"51.9 mm"},{us:"6.5",uk:"M 1/2",eu:"53",diameter:"16.9 mm",circumference:"53.1 mm"},{us:"7",uk:"N 1/2",eu:"54",diameter:"17.3 mm",circumference:"54.4 mm"},{us:"7.5",uk:"O 1/2",eu:"56",diameter:"17.7 mm",circumference:"55.7 mm"},{us:"8",uk:"P 1/2",eu:"57",diameter:"18.1 mm",circumference:"57.0 mm"},{us:"8.5",uk:"Q 1/2",eu:"58",diameter:"18.5 mm",circumference:"58.3 mm"},{us:"9",uk:"R 1/2",eu:"59",diameter:"18.9 mm",circumference:"59.5 mm"},{us:"9.5",uk:"S 1/2",eu:"61",diameter:"19.4 mm",circumference:"60.8 mm"},{us:"10",uk:"T 1/2",eu:"62",diameter:"19.8 mm",circumference:"62.1 mm"},{us:"10.5",uk:"U 1/2",eu:"63",diameter:"20.2 mm",circumference:"63.4 mm"},{us:"11",uk:"V 1/2",eu:"65",diameter:"20.6 mm",circumference:"64.6 mm"},{us:"11.5",uk:"W 1/2",eu:"66",diameter:"21.0 mm",circumference:"65.9 mm"},{us:"12",uk:"Y",eu:"67",diameter:"21.4 mm",circumference:"67.2 mm"}];return e.jsxs(S,{children:[e.jsxs(v,{children:[e.jsx(s,{to:"/",children:"Home"})," / ",e.jsx(s,{to:"/education",children:"Education"})," / ",e.jsx(s,{to:"/rings",children:"Rings"})," / ",e.jsx("span",{className:"current",children:"Find Your Ring Size"})]}),e.jsxs(z,{children:[e.jsxs(k,{children:[e.jsx("p",{className:"subtitle",children:"Ring Sizer & Conversion Guide"}),e.jsx("h1",{children:"How To Measure Your Ring Size"}),e.jsx("p",{className:"desc",children:"Discovering your ideal ring size ensures maximum comfort and security for your bespoke AethelCarats creation. Follow our complimentary guide, printable sizer, and international conversion matrix."})]}),e.jsx(E,{children:e.jsx(m,{src:"/assets/gem_solitaire_ring_perfect.png",alt:"AethelCarats Ring Sizing"})})]}),e.jsxs(p,{children:[e.jsx("h2",{children:"Finding Your Ring Size"}),e.jsx("p",{children:"Finding the right ring size is one of the most essential steps when choosing an engagement ring or wedding band. AethelCarats provides complimentary resizing within 30 days for all non-custom creation orders."})]}),e.jsx(l,{yOffset:35,children:e.jsxs(w,{children:[e.jsxs("div",{children:[e.jsx("h3",{children:"Browse Our Selection of Fine Rings"}),e.jsx("p",{style:{margin:"8px 0 0",color:"#A8A8A8",fontSize:"0.9rem"},children:"Handcrafted 18K Gold & Platinum Solitaires"})]}),e.jsx(s,{to:"/rings",className:"cta-btn",children:"FIND YOUR RING"})]})}),e.jsx(l,{yOffset:35,children:e.jsxs(u,{children:[e.jsxs("div",{className:"content-side",children:[e.jsx("h3",{children:"Complimentary Plastic Ring Sizer"}),e.jsx("p",{children:"Receive a free AethelCarats belt-style plastic ring sizer delivered directly to your doorstep. It works like a belt around your finger for easy, accurate measurements at home."}),e.jsx("button",{className:"action-btn",onClick:()=>a(!0),children:"REQUEST FREE RING SIZER"})]}),e.jsx("div",{className:"media-side",children:e.jsx(m,{src:"/assets/why-aura/craftsmanship-hero.jpg",alt:"Free Ring Sizer",style:{borderRadius:4}})})]})}),e.jsx(l,{yOffset:35,children:e.jsxs(u,{children:[e.jsx("div",{className:"media-side",children:e.jsxs("div",{style:{padding:20,background:"#111111",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:6},children:[e.jsx("div",{style:{fontWeight:700,fontSize:"1.2rem",marginBottom:12,color:"#F5F1E8"},children:"US Standard Diameter Circles"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:12},children:["5","6","7","8","9","10","11","12"].map(r=>e.jsxs("div",{style:{padding:12,border:"1.5px dashed #C9A96E",color:"#F5F1E8",borderRadius:"50%",aspectRatio:"1/1",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:"0.85rem"},children:["US ",r]},r))})]})}),e.jsxs("div",{className:"content-side",children:[e.jsx("h3",{children:"Printable Ring Size Chart"}),e.jsx("p",{children:"Print our 1:1 scale ring size chart to measure an existing ring or match your finger diameter directly on paper. Ensure page scaling is set to 100% when printing."}),e.jsx("button",{className:"action-btn",onClick:b,children:"PRINT RING SIZE CHART"})]})]})}),e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"2.2rem",textAlign:"center",color:"#F5F1E8",marginBottom:32},children:"How To Measure At Home"}),e.jsxs(R,{children:[e.jsxs(c,{children:[e.jsx("div",{className:"num",children:"01"}),e.jsx("h4",{children:"Measure an Existing Ring"}),e.jsx("p",{children:"Place an existing ring that fits the target finger over our printable sizing circles until the inside of the ring aligns exactly with the circle perimeter."})]}),e.jsxs(c,{children:[e.jsx("div",{className:"num",children:"02"}),e.jsx("h4",{children:"Measure Your Finger"}),e.jsx("p",{children:"Wrap a flexible measuring tape or strip of paper snugly around the knuckle base. Mark the overlap point and measure length in millimeters to find circumference."})]}),e.jsxs(c,{children:[e.jsx("div",{className:"num",children:"03"}),e.jsx("h4",{children:"Use Our Free Ring Sizer"}),e.jsx("p",{children:"Thread the end of our plastic sizer through the buckle. Adjust until it slides comfortably over the knuckle for exact US ring size reading."})]})]}),e.jsxs(A,{children:[e.jsx("h3",{children:"International Ring Size Conversion Chart"}),e.jsxs(B,{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"US Size"}),e.jsx("th",{children:"UK & Australia"}),e.jsx("th",{children:"EU & Japan"}),e.jsx("th",{children:"Inside Diameter (mm)"}),e.jsx("th",{children:"Inside Circumference (mm)"})]})}),e.jsx("tbody",{children:y.map(r=>e.jsxs("tr",{children:[e.jsxs("td",{style:{fontWeight:700,color:"#C9A96E"},children:["US ",r.us]}),e.jsx("td",{children:r.uk}),e.jsx("td",{children:r.eu}),e.jsx("td",{children:r.diameter}),e.jsx("td",{children:r.circumference})]},r.us))})]})]}),e.jsxs(p,{style:{background:"#151515",padding:"40px 32px",borderRadius:6,border:"1px solid rgba(140, 116, 75, 0.25)",boxShadow:"0 8px 24px rgba(0,0,0,0.3)"},children:[e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",color:"#F5F1E8",marginBottom:12},children:"Between Two Sizes?"}),e.jsx("p",{style:{fontSize:"0.92rem",color:"#D8D2C5",lineHeight:1.8},children:"If you fall between two sizes, we always recommend sizing up. Fingers fluctuate in size depending on temperature, humidity, and time of day (typically slightly larger in the evening). Wider band styles (above 4mm) also feel tighter than slim solitaire bands."})]}),e.jsxs("div",{style:{textAlign:"center",marginTop:80,paddingTop:48,borderTop:"1px solid rgba(140, 116, 75, 0.25)"},children:[e.jsx("h2",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"2.5rem",color:"#F5F1E8",marginBottom:16},children:"Find Your Perfect AethelCarats Ring"}),e.jsx("p",{style:{color:"#D8D2C5",fontSize:"1rem",maxWidth:600,margin:"0 auto 28px"},children:"Explore our certified GIA natural and lab diamond solitaire engagement rings and eternity bands."}),e.jsx(s,{to:"/rings",style:{padding:"16px 36px",background:"#C9A96E",color:"#0B0B0B",textDecoration:"none",fontWeight:700,letterSpacing:"0.1em",borderRadius:4,display:"inline-block"},children:"SHOP RINGS CATALOGUE"})]}),g&&e.jsx(D,{onClick:()=>a(!1),children:e.jsxs(N,{onClick:r=>r.stopPropagation(),children:[e.jsx("button",{onClick:()=>a(!1),style:{position:"absolute",top:16,right:16,background:"none",border:"none",cursor:"pointer",color:"#A8A8A8"},children:e.jsx(C,{size:20})}),x?e.jsxs("div",{style:{textAlign:"center",padding:"24px 0"},children:[e.jsx(F,{size:48,color:"#C9A96E",style:{marginBottom:16}}),e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",color:"#F5F1E8",marginBottom:8},children:"Free Sizer Requested!"}),e.jsx("p",{style:{color:"#D8D2C5",fontSize:"0.9rem"},children:"We are mailing your complimentary AethelCarats Ring Sizer to your address. Estimated arrival: 3-5 business days."})]}):e.jsxs("form",{onSubmit:j,children:[e.jsx("h3",{style:{fontFamily:"Cormorant Garamond, serif",fontSize:"1.8rem",color:"#F5F1E8",marginBottom:12},children:"Request Free Ring Sizer"}),e.jsx("p",{style:{color:"#D8D2C5",fontSize:"0.85rem",marginBottom:20},children:"We will mail a free plastic belt sizer directly to your home."}),e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx("input",{type:"text",required:!0,placeholder:"Full Name",value:t.name,onChange:r=>n({...t,name:r.target.value}),style:{padding:12,background:"#111111",color:"#F5F1E8",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,outline:"none"}}),e.jsx("input",{type:"email",required:!0,placeholder:"Email Address",value:t.email,onChange:r=>n({...t,email:r.target.value}),style:{padding:12,background:"#111111",color:"#F5F1E8",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,outline:"none"}}),e.jsx("input",{type:"text",required:!0,placeholder:"Shipping Street Address",value:t.address,onChange:r=>n({...t,address:r.target.value}),style:{padding:12,background:"#111111",color:"#F5F1E8",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,outline:"none"}}),e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12},children:[e.jsx("input",{type:"text",required:!0,placeholder:"City",value:t.city,onChange:r=>n({...t,city:r.target.value}),style:{padding:12,background:"#111111",color:"#F5F1E8",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,outline:"none"}}),e.jsx("input",{type:"text",required:!0,placeholder:"Postal Code",value:t.postalCode,onChange:r=>n({...t,postalCode:r.target.value}),style:{padding:12,background:"#111111",color:"#F5F1E8",border:"1px solid rgba(140, 116, 75, 0.25)",borderRadius:4,outline:"none"}})]}),e.jsx("button",{type:"submit",style:{marginTop:12,padding:14,background:"#C9A96E",color:"#0B0B0B",border:"none",borderRadius:4,fontWeight:700,cursor:"pointer",letterSpacing:"0.08em"},children:"SUBMIT MAILING REQUEST"})]})]})]})})]})};export{P as FindYourRingSizePage};
