import{j as r,H as h,A as a,f as d,ac as b}from"./react-vendor-BsBv4awM.js";import{g as o}from"./ui-vendor-C0FaE403.js";import{b as f,u,c as w,R as j}from"./admin-pages-Dyn6Mexs.js";import"./swiper-vendor-X0C8N8nm.js";import"./admin-tools-vendor-CKN5doRT.js";const A=o.div`
  max-width: 1400px;
  min-height: 80vh;
  margin: 0 auto;
  padding: 48px 24px 80px;
  background-color: #0B0B0B;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 24px 16px 60px;
  }
`,y=o.div`
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-family: 'Cormorant Garamond', 'Playfair Display', serif;
    font-size: 2.8rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #A8A8A8;
    letter-spacing: 0.04em;
  }
`,v=o.div`
  max-width: 650px;
  margin: 40px auto;
  text-align: center;
  padding: 56px 32px;
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6);

  .icon-wrapper {
    width: 72px;
    height: 72px;
    margin: 0 auto 24px;
    border-radius: 50%;
    background-color: rgba(201, 169, 110, 0.1);
    border: 1px solid rgba(140, 116, 75, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #C9A96E;
  }

  h2 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.8rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #F5F1E8;
    margin-bottom: 12px;
  }

  p {
    font-size: 0.95rem;
    color: #A8A8A8;
    margin-bottom: 32px;
    line-height: 1.6;
  }
`,E=o.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`,i=o(d)`
  padding: 12px 22px;
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background-color: #111111;
  color: #F5F1E8;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 2px;
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;

  &:hover {
    background-color: #C9A96E;
    color: #0B0B0B;
    border-color: #C9A96E;
    transform: translateY(-2px);
  }
`,k=o.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`,C=o.div`
  background-color: #151515;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 4px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
    border-color: rgba(201, 169, 110, 0.6);
    transform: translateY(-2px);
  }

  .img-box-link {
    width: 100%;
    aspect-ratio: 1;
    overflow: hidden;
    background-color: #0B0B0B;
    margin-bottom: 14px;
    border-radius: 2px;
    display: block;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.4s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  .name-link {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: 1.1rem;
    font-weight: 600;
    color: #F5F1E8;
    margin-bottom: 8px;
    line-height: 1.35;
    text-decoration: none;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.2s ease;

    &:hover {
      color: #C9A96E;
    }
  }

  .price {
    font-size: 1.1rem;
    font-weight: 700;
    color: #C9A96E;
    letter-spacing: 0.05em;
    margin-bottom: 16px;
  }

  .btn-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: auto;
    width: 100%;
  }
`,B=o.button`
  flex: 1;
  padding: 12px 14px;
  text-align: center;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background-color: #C9A96E;
  color: #0B0B0B;
  border: 1px solid #C9A96E;
  border-radius: 2px;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;

  &:hover {
    background-color: #DFBA73;
    border-color: #DFBA73;
    box-shadow: 0 4px 15px rgba(201, 169, 110, 0.35);
  }
`,z=o.button`
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  background: #111111;
  border: 1px solid rgba(140, 116, 75, 0.25);
  border-radius: 2px;
  color: #A8A8A8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.25s ease;

  &:hover {
    color: #E53E3E;
    background: rgba(229, 62, 62, 0.1);
    border-color: rgba(229, 62, 62, 0.5);
  }
`,T=()=>{const{wishlistItems:l,toggleWishlist:c}=f(),s=u(),{showToast:p}=w(),x=e=>{const t=l.find(n=>n.id===e);t&&c(t)},g=(e,t)=>{e.preventDefault(),e.stopPropagation(),s!=null&&s.addToCart&&s.addToCart(t,1,t.metal||"14K Yellow Gold","US 6.5"),p(`"${t.name}" added to your shopping bag!`)};return r.jsxs(A,{children:[r.jsxs(y,{children:[r.jsx("h1",{children:"MY WISHLIST"}),r.jsx("p",{children:"Your curated collection of AethelCarats fine jewellery & rare diamonds."})]}),l.length===0?r.jsxs(v,{children:[r.jsx("div",{className:"icon-wrapper",children:r.jsx(h,{size:36,color:"#C9A96E"})}),r.jsx("h2",{children:"YOUR WISHLIST IS EMPTY"}),r.jsx("p",{children:"Save your favorite pieces here so you can easily find them later."}),r.jsxs(E,{children:[r.jsxs(i,{to:"/rings?category=engagement",children:["ENGAGEMENT RINGS ",r.jsx(a,{size:14})]}),r.jsxs(i,{to:"/rings?category=wedding",children:["WEDDING RINGS ",r.jsx(a,{size:14})]}),r.jsxs(i,{to:"/rings",children:["FINE JEWELRY ",r.jsx(a,{size:14})]}),r.jsxs(i,{to:"/diamonds?type=NATURAL",children:["DIAMONDS ",r.jsx(a,{size:14})]}),r.jsxs(i,{to:"/diamonds?type=LAB_GROWN",children:["LAB-GROWN DIAMONDS ",r.jsx(a,{size:14})]})]})]}):r.jsx(k,{children:l.map((e,t)=>{const n=e.slug||e.id;return r.jsx(j,{staggerIndex:t,yOffset:25,children:r.jsxs(C,{children:[r.jsx(d,{to:`/product/${n}`,className:"img-box-link",title:`View ${e.name} details`,children:r.jsx("img",{src:e.primaryImage||e.mainImage||(e.images&&e.images[0]?e.images[0].url:"/assets/gem_rings_cat.png"),alt:e.name})}),r.jsx(d,{to:`/product/${n}`,className:"name-link",children:e.name}),r.jsxs("div",{className:"price",children:["$",(e.price||0).toLocaleString()]}),r.jsxs("div",{className:"btn-row",children:[r.jsx(B,{onClick:m=>g(m,e),children:"ADD TO BAG"}),r.jsx(z,{onClick:()=>x(e.id),title:"Remove from wishlist","aria-label":"Remove item",children:r.jsx(b,{size:18})})]})]})},e.id)})})]})};export{T as WishlistPage};
