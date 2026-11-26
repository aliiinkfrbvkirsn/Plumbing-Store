const $ = (s, root=document) => root.querySelector(s);
const SUPABASE_URL = "https://etyynfojwjpclulncane.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_ZkDOwa4mtMunTO-_A4FvVQ_KAGA8jqA";
const db = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
const translations = {
  ru:{eyebrow:"НАДЁЖНЫЕ ДЕТАЛИ ДЛЯ ВАШЕГО ДОМА",heroTitle:"Всё для сантехники.<br><em>В одном месте.</em>",heroText:"Подберите нужные запчасти, добавьте их в корзину и оформите заказ онлайн.",shopNow:"Перейти в каталог",heroBottom:"ПРОСТО. БЫСТРО. УДОБНО.",catalogEyebrow:"НАШ АССОРТИМЕНТ",catalogTitle:"Популярные товары",searchPlaceholder:"Поиск по товарам...",allCategories:"Все категории",info1Title:"Удобный выбор",info1Text:"Найдите нужную деталь через поиск и каталог.",info2Title:"Корзина под рукой",info2Text:"Количество и общая сумма считаются автоматически.",info3Title:"Личный кабинет",info3Text:"Следите за своими заказами в одном месте.",footerText:"Магазин сантехнических запчастей",cartTitle:"Корзина",total:"Итого",yourName:"Ваше имя",yourPhone:"Телефон",checkout:"Оформить заказ",demoNote:"Демо-режим: заказ сохранится только в этом браузере.",sellerTitle:"Кабинет продавца",sellerWarning:"Это демонстрационный кабинет. Перед запуском нужно подключить защищённую авторизацию.",addProduct:"Добавить товар",productName:"Название",price:"Цена (сом)",stock:"Количество",category:"Категория",image:"Ссылка на фото",saveProduct:"Сохранить товар",manageProducts:"Управление товарами",orders:"Заказы",add:"Добавить",out:"Нет в наличии",inStock:"В наличии",emptyCart:"Корзина пока пуста",emptyOrders:"Заказов пока нет",delete:"Удалить",products:"товаров",items:"поз.",order:"Заказ",orderPlaced:"Заказ оформлен!",added:"Добавлено в корзину",deleted:"Товар удалён",saved:"Товар сохранён",noResults:"Ничего не найдено",customer:"Покупатель"},
  ky:{eyebrow:"ҮЙҮҢҮЗ ҮЧҮН ИШЕНИМДҮҮ ТЕТИКТЕР",heroTitle:"Сантехника үчүн баары.<br><em>Бир жерде.</em>",heroText:"Керектүү тетиктерди тандап, себетке кошуп, онлайн буйрутма бериңиз.",shopNow:"Каталогго өтүү",heroBottom:"ЖӨНӨКӨЙ. ТЕЗ. ЫҢГАЙЛУУ.",catalogEyebrow:"БИЗДИН ТОВАРЛАР",catalogTitle:"Популярдуу товарлар",searchPlaceholder:"Товарларды издөө...",allCategories:"Бардык категориялар",info1Title:"Ыңгайлуу тандоо",info1Text:"Керектүү тетикти издөө жана каталог аркылуу табыңыз.",info2Title:"Себет дайыма жаныңызда",info2Text:"Саны жана жалпы суммасы автоматтык эсептелет.",info3Title:"Жеке кабинет",info3Text:"Буйрутмаларыңызды бир жерден көзөмөлдөңүз.",footerText:"Сантехникалык тетиктер дүкөнү",cartTitle:"Себет",total:"Жалпысы",yourName:"Атыңыз",yourPhone:"Телефон",checkout:"Буйрутма берүү",demoNote:"Демо режим: буйрутма ушул браузерде гана сакталат.",sellerTitle:"Сатуучунун кабинети",sellerWarning:"Бул демо кабинет. Ишке киргизүүдөн мурун коопсуз авторизация кошулушу керек.",addProduct:"Товар кошуу",productName:"Аталышы",price:"Баасы (сом)",stock:"Саны",category:"Категория",image:"Сүрөт шилтемеси",saveProduct:"Товарды сактоо",manageProducts:"Товарларды башкаруу",orders:"Буйрутмалар",add:"Кошуу",out:"Калган жок",inStock:"Бар",emptyCart:"Себет азырынча бош",emptyOrders:"Азырынча буйрутма жок",delete:"Өчүрүү",products:"товар",items:"даана",order:"Буйрутма",orderPlaced:"Буйрутма кабыл алынды!",added:"Себетке кошулду",deleted:"Товар өчүрүлдү",saved:"Товар сакталды",noResults:"Эч нерсе табылган жок",customer:"Кардар"},
  en:{eyebrow:"RELIABLE PARTS FOR YOUR HOME",heroTitle:"Everything plumbing.<br><em>All in one place.</em>",heroText:"Find the parts you need, add them to your cart and place an order online.",shopNow:"Browse catalog",heroBottom:"SIMPLE. FAST. CONVENIENT.",catalogEyebrow:"OUR SELECTION",catalogTitle:"Popular products",searchPlaceholder:"Search products...",allCategories:"All categories",info1Title:"Easy discovery",info1Text:"Find the right part through search and the catalog.",info2Title:"Your cart, ready",info2Text:"Quantities and totals are calculated automatically.",info3Title:"Personal account",info3Text:"Keep track of your orders in one place.",footerText:"Plumbing parts store",cartTitle:"Your cart",total:"Total",yourName:"Your name",yourPhone:"Phone",checkout:"Place order",demoNote:"Demo mode: orders are stored only in this browser.",sellerTitle:"Seller dashboard",sellerWarning:"This is a demo dashboard. Secure authentication must be connected before launch.",addProduct:"Add product",productName:"Product name",price:"Price (KGS)",stock:"Quantity",category:"Category",image:"Image URL",saveProduct:"Save product",manageProducts:"Manage products",orders:"Orders",add:"Add",out:"Out of stock",inStock:"In stock",emptyCart:"Your cart is empty",emptyOrders:"No orders yet",delete:"Delete",products:"products",items:"items",order:"Order",orderPlaced:"Order placed!",added:"Added to cart",deleted:"Product deleted",saved:"Product saved",noResults:"No products found",customer:"Customer"}
};
let products = [];
let cart = JSON.parse(localStorage.getItem("plumb_cart") || "{}");
let orders = JSON.parse(localStorage.getItem("plumb_orders") || "[]");
let lang = localStorage.getItem("plumb_lang") || "ru";
const money = n => `${Number(n).toLocaleString("ru-RU")} сом`;
const t = key => translations[lang][key] || translations.ru[key] || key;
const save = () => {localStorage.setItem("plumb_products",JSON.stringify(products));localStorage.setItem("plumb_cart",JSON.stringify(cart));localStorage.setItem("plumb_orders",JSON.stringify(orders));};
const localized = (p, field) => { const value=p[field]; if(value && typeof value==="object" && !Array.isArray(value)) return value[lang] || value.ru || value.ky || value.en || ""; return p[field+(lang==="ky"?"Ky":lang==="en"?"En":"")] || value || ""; };
async function loadProducts(){
 try {
  const result=await db.from("products").select("id,sku,name,description,category,price,stock,image_path,is_active").eq("is_active",true).order("created_at",{ascending:false});
  if(result.error) throw result.error;
  products=(result.data||[]).map(p=>({id:p.id,sku:p.sku,name:p.name||{},description:p.description||{},category:p.category||"Other",price:Number(p.price)||0,stock:Number(p.stock)||0,image:p.image_path?SUPABASE_URL+"/storage/v1/object/public/product-images/"+p.image_path.split("/").map(encodeURIComponent).join("/"):"",emoji:"🔧"}));
  renderProducts(); renderCart(); renderSeller();
 } catch(error) {
  console.error("Supabase products load failed:",error);
  $("#product-grid").innerHTML="<div class=\"empty-state\">Не удалось загрузить товары. Проверь подключение к базе данных.</div>";
  toast("Ошибка загрузки каталога");
 }
}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2200);}
function applyLanguage(){
 document.documentElement.lang=lang;$("#language").value=lang;
 document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;el.innerHTML=t(key)});
 document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>el.placeholder=t(el.dataset.i18nPlaceholder));
 renderProducts();renderCart();renderSeller();
}
function renderProducts(){
 const query=$("#search").value.trim().toLowerCase(),category=$("#category-filter").value;
 const filtered=products.filter(p=>(localized(p,"name").toLowerCase().includes(query)||localized(p,"category").toLowerCase().includes(query))&&(category==="all"||p.category===category));
 $("#product-count").textContent=`${products.length} ${t("products")}`;
 $("#category-filter").innerHTML=`<option value="all">${t("allCategories")}</option>`+[...new Set(products.map(p=>p.category))].map(c=>`<option value="${esc(c)}">${esc(products.find(p=>p.category===c)?.[lang==="ky"?"categoryKy":lang==="en"?"categoryEn":"category"]||c)}</option>`).join("");
 $("#category-filter").value=category;
 $("#product-grid").innerHTML=filtered.length?filtered.map(p=>`<article class="product-card"><div class="product-image">${p.image?`<img src="${esc(p.image)}" alt="${esc(localized(p,"name"))}" onerror="this.remove()">`:`<span class="product-placeholder">${p.emoji||"🔧"}</span>`}<span class="stock-pill">${p.stock>0?t("inStock"):t("out")}</span></div><div class="product-info"><span class="product-category">${esc(localized(p,"category"))}</span><h3>${esc(localized(p,"name"))}</h3><div class="product-bottom"><span class="product-price">${money(p.price)}</span><button class="add-button" data-add="${p.id}" aria-label="${t("add")}" ${p.stock<=0?"disabled":""}>+</button></div></div></article>`).join(""):`<div class="empty-state">${t("noResults")}</div>`;
}
function renderCart(){
 const entries=Object.entries(cart).filter(([id,q])=>q>0&&products.some(p=>String(p.id)===String(id)));
 const count=entries.reduce((s,[,q])=>s+q,0),total=entries.reduce((s,[id,q])=>s+products.find(p=>String(p.id)===String(id)).price*q,0);
 $("#cart-count").textContent=count;$("#cart-total").textContent=money(total);
 $("#cart-items").innerHTML=entries.length?entries.map(([id,q])=>{const p=products.find(x=>String(x.id)===String(id));return `<div class="cart-row"><div class="cart-thumb">${p.image?`<img src="${esc(p.image)}" alt="">`:p.emoji||"🔧"}</div><div><h4>${esc(localized(p,"name"))}</h4><small>${money(p.price)}</small><div class="qty-controls"><button data-qty="${id}" data-delta="-1">−</button><b>${q}</b><button data-qty="${id}" data-delta="1">+</button></div></div><strong>${money(p.price*q)}</strong></div>`}).join(""):`<div class="empty-state">${t("emptyCart")}</div>`;
 save();
}
function renderSeller(){
 $("#seller-stats").innerHTML=`<div class="stat"><strong>${products.length}</strong><span>${t("products")}</span></div><div class="stat"><strong>${products.reduce((s,p)=>s+p.stock,0)}</strong><span>${t("items")}</span></div><div class="stat"><strong>${orders.length}</strong><span>${t("orders")}</span></div>`;
 $("#seller-products").innerHTML=products.map(p=>`<div class="seller-product"><span><b>${esc(localized(p,"name"))}</b><br><small>${money(p.price)} · ${p.stock} ${t("items")}</small></span><button data-delete="${p.id}">${t("delete")}</button></div>`).join("");
 $("#seller-orders").innerHTML=orders.length?orders.slice().reverse().map(o=>`<div class="seller-order"><span><b>${t("order")} #${o.id}</b><br><small>${esc(o.name)} · ${esc(o.phone)}</small></span><strong>${money(o.total)}</strong></div>`).join(""):`<div class="empty-state">${t("emptyOrders")}</div>`;
}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
$("#language").addEventListener("change",e=>{lang=e.target.value;localStorage.setItem("plumb_lang",lang);applyLanguage()});
$("#search").addEventListener("input",renderProducts);$("#category-filter").addEventListener("change",renderProducts);
$("#product-grid").addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;const id=b.dataset.add,p=products.find(x=>String(x.id)===String(id));if((cart[id]||0)<p.stock){cart[id]=(cart[id]||0)+1;renderCart();toast(t("added"));}});
$("#cart-open").addEventListener("click",()=>$("#cart-overlay").hidden=false);
$("#seller-open").addEventListener("click",()=>{$("#seller-overlay").hidden=false;renderSeller()});
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>$("#"+b.dataset.close+"-overlay").hidden=true));
document.querySelectorAll(".overlay").forEach(o=>o.addEventListener("click",e=>{if(e.target===o)o.hidden=true}));
$("#cart-items").addEventListener("click",e=>{const b=e.target.closest("[data-qty]");if(!b)return;const id=b.dataset.qty,delta=Number(b.dataset.delta),p=products.find(x=>String(x.id)===String(id));cart[id]=Math.max(0,Math.min(p.stock,(cart[id]||0)+delta));if(!cart[id])delete cart[id];renderCart()});
$("#checkout-form").addEventListener("submit",e=>{e.preventDefault();const entries=Object.entries(cart).filter(([id,q])=>q>0);if(!entries.length)return;const fd=new FormData(e.target),total=entries.reduce((s,[id,q])=>s+products.find(p=>String(p.id)===String(id)).price*q,0);const order={id:Date.now().toString().slice(-6),name:fd.get("name"),phone:fd.get("phone"),total,items:entries.map(([id,q])=>({id:Number(id),q})),date:new Date().toISOString()};entries.forEach(([id,q])=>{const p=products.find(x=>String(x.id)===String(id));p.stock=Math.max(0,p.stock-q)});orders.push(order);cart={};save();renderProducts();renderCart();renderSeller();e.target.reset();$("#cart-overlay").hidden=true;toast(t("orderPlaced"));});
$("#product-form").addEventListener("submit",e=>{e.preventDefault();const fd=new FormData(e.target),name=String(fd.get("name")).trim(),category=String(fd.get("category")).trim();const p={id:Date.now(),name,nameKy:name,nameEn:name,category,categoryKy:category,categoryEn:category,price:Number(fd.get("price")),stock:Number(fd.get("stock")),image:String(fd.get("image")).trim(),emoji:"🔧"};products.unshift(p);save();e.target.reset();renderProducts();renderSeller();toast(t("saved"));});
$("#seller-products").addEventListener("click",e=>{const b=e.target.closest("[data-delete]");if(!b)return;const id=Number(b.dataset.delete);products=products.filter(p=>String(p.id)!==String(id));delete cart[id];save();renderProducts();renderCart();renderSeller();toast(t("deleted"));});
$("#year").textContent=new Date().getFullYear();applyLanguage();loadProducts();