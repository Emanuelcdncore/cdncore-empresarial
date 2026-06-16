import { readFileSync, writeFileSync, statSync } from 'fs';

const filePath = 'src/lib/translations.ts';
let src = readFileSync(filePath, 'utf8');

const cartKeys = {
  en: { cart_title: 'Cart', cart_clear: 'Clear all', cart_empty: 'Your cart is empty', cart_browse: 'Browse products', cart_request_quote: 'Request quote', cart_continue: 'Continue shopping', cart_total: 'Total', cart_items: 'items', cart_item: 'item' },
  pt: { cart_title: 'Carrinho', cart_clear: 'Limpar tudo', cart_empty: 'O teu carrinho está vazio', cart_browse: 'Ver produtos', cart_request_quote: 'Pedir orçamento', cart_continue: 'Continuar a comprar', cart_total: 'Total', cart_items: 'itens', cart_item: 'item' },
  de: { cart_title: 'Warenkorb', cart_clear: 'Alles löschen', cart_empty: 'Ihr Warenkorb ist leer', cart_browse: 'Produkte ansehen', cart_request_quote: 'Angebot anfordern', cart_continue: 'Einkauf fortsetzen', cart_total: 'Gesamt', cart_items: 'Artikel', cart_item: 'Artikel' },
  fr: { cart_title: 'Panier', cart_clear: 'Tout effacer', cart_empty: 'Votre panier est vide', cart_browse: 'Voir les produits', cart_request_quote: 'Demander un devis', cart_continue: 'Continuer les achats', cart_total: 'Total', cart_items: 'articles', cart_item: 'article' },
  es: { cart_title: 'Carrito', cart_clear: 'Borrar todo', cart_empty: 'Tu carrito está vacío', cart_browse: 'Ver productos', cart_request_quote: 'Solicitar presupuesto', cart_continue: 'Continuar comprando', cart_total: 'Total', cart_items: 'artículos', cart_item: 'artículo' },
  it: { cart_title: 'Carrello', cart_clear: 'Cancella tutto', cart_empty: 'Il tuo carrello è vuoto', cart_browse: 'Sfoglia prodotti', cart_request_quote: 'Richiedi preventivo', cart_continue: 'Continua lo shopping', cart_total: 'Totale', cart_items: 'articoli', cart_item: 'articolo' },
  ru: { cart_title: 'Корзина', cart_clear: 'Очистить всё', cart_empty: 'Ваша корзина пуста', cart_browse: 'Просмотр товаров', cart_request_quote: 'Запросить предложение', cart_continue: 'Продолжить покупки', cart_total: 'Итого', cart_items: 'товаров', cart_item: 'товар' },
  bg: { cart_title: 'Количка', cart_clear: 'Изчисти всичко', cart_empty: 'Вашата количка е празна', cart_browse: 'Разгледайте продукти', cart_request_quote: 'Заявете оферта', cart_continue: 'Продължете пазаруването', cart_total: 'Общо', cart_items: 'артикула', cart_item: 'артикул' },
  hr: { cart_title: 'Košarica', cart_clear: 'Obriši sve', cart_empty: 'Vaša košarica je prazna', cart_browse: 'Pregledajte proizvode', cart_request_quote: 'Zatražite ponudu', cart_continue: 'Nastavite kupovinu', cart_total: 'Ukupno', cart_items: 'stavki', cart_item: 'stavka' },
  cs: { cart_title: 'Košík', cart_clear: 'Vymazat vše', cart_empty: 'Váš košík je prázdný', cart_browse: 'Procházet produkty', cart_request_quote: 'Vyžádat nabídku', cart_continue: 'Pokračovat v nákupu', cart_total: 'Celkem', cart_items: 'položek', cart_item: 'položka' },
  da: { cart_title: 'Indkøbskurv', cart_clear: 'Ryd alt', cart_empty: 'Din kurv er tom', cart_browse: 'Gennemse produkter', cart_request_quote: 'Anmod om tilbud', cart_continue: 'Fortsæt med at handle', cart_total: 'Total', cart_items: 'varer', cart_item: 'vare' },
  nl: { cart_title: 'Winkelwagen', cart_clear: 'Alles wissen', cart_empty: 'Uw winkelwagen is leeg', cart_browse: 'Producten bekijken', cart_request_quote: 'Offerte aanvragen', cart_continue: 'Doorgaan met winkelen', cart_total: 'Totaal', cart_items: 'artikelen', cart_item: 'artikel' },
  et: { cart_title: 'Ostukorv', cart_clear: 'Tühjenda kõik', cart_empty: 'Teie ostukorv on tühi', cart_browse: 'Sirvi tooteid', cart_request_quote: 'Küsi pakkumist', cart_continue: 'Jätka ostmist', cart_total: 'Kokku', cart_items: 'toodet', cart_item: 'toode' },
  fi: { cart_title: 'Ostoskori', cart_clear: 'Tyhjennä kaikki', cart_empty: 'Ostoskorisi on tyhjä', cart_browse: 'Selaa tuotteita', cart_request_quote: 'Pyydä tarjous', cart_continue: 'Jatka ostoksia', cart_total: 'Yhteensä', cart_items: 'tuotetta', cart_item: 'tuote' },
  el: { cart_title: 'Καλάθι', cart_clear: 'Εκκαθάριση όλων', cart_empty: 'Το καλάθι σας είναι άδειο', cart_browse: 'Περιήγηση προϊόντων', cart_request_quote: 'Αίτηση προσφοράς', cart_continue: 'Συνέχεια αγορών', cart_total: 'Σύνολο', cart_items: 'αντικείμενα', cart_item: 'αντικείμενο' },
  hu: { cart_title: 'Kosár', cart_clear: 'Mindet töröl', cart_empty: 'A kosara üres', cart_browse: 'Termékek böngészése', cart_request_quote: 'Ajánlat kérése', cart_continue: 'Vásárlás folytatása', cart_total: 'Összesen', cart_items: 'termék', cart_item: 'termék' },
  ga: { cart_title: 'Ciseán', cart_clear: 'Glan gach rud', cart_empty: 'Tá do chiseán folamh', cart_browse: 'Féach ar tháirgí', cart_request_quote: 'Iarr luacháil', cart_continue: 'Lean ar aghaidh ag siopadóireacht', cart_total: 'Iomlán', cart_items: 'míreanna', cart_item: 'mír' },
  lv: { cart_title: 'Grozs', cart_clear: 'Notīrīt visu', cart_empty: 'Jūsu grozs ir tukšs', cart_browse: 'Pārlūkot produktus', cart_request_quote: 'Pieprasīt piedāvājumu', cart_continue: 'Turpināt iepirkšanos', cart_total: 'Kopā', cart_items: 'preces', cart_item: 'prece' },
  lt: { cart_title: 'Krepšelis', cart_clear: 'Išvalyti viską', cart_empty: 'Jūsų krepšelis tuščias', cart_browse: 'Naršyti produktus', cart_request_quote: 'Prašyti pasiūlymo', cart_continue: 'Tęsti apsipirkimą', cart_total: 'Iš viso', cart_items: 'prekių', cart_item: 'prekė' },
  mt: { cart_title: 'Basket', cart_clear: 'Ħassar kollox', cart_empty: 'Il-basket tiegħek huwa vojt', cart_browse: 'Fittex prodotti', cart_request_quote: 'Itlob kwotazzjoni', cart_continue: 'Kompli tixtri', cart_total: 'Total', cart_items: 'oġġetti', cart_item: 'oġġett' },
  pl: { cart_title: 'Koszyk', cart_clear: 'Wyczyść wszystko', cart_empty: 'Twój koszyk jest pusty', cart_browse: 'Przeglądaj produkty', cart_request_quote: 'Poproś o ofertę', cart_continue: 'Kontynuuj zakupy', cart_total: 'Łącznie', cart_items: 'produktów', cart_item: 'produkt' },
  ro: { cart_title: 'Coș', cart_clear: 'Șterge tot', cart_empty: 'Coșul dvs. este gol', cart_browse: 'Răsfoiți produse', cart_request_quote: 'Solicitați ofertă', cart_continue: 'Continuați cumpărăturile', cart_total: 'Total', cart_items: 'articole', cart_item: 'articol' },
  sk: { cart_title: 'Košík', cart_clear: 'Vymazať všetko', cart_empty: 'Váš košík je prázdny', cart_browse: 'Prechádzať produkty', cart_request_quote: 'Požiadať o ponuku', cart_continue: 'Pokračovať v nákupe', cart_total: 'Spolu', cart_items: 'položiek', cart_item: 'položka' },
  sl: { cart_title: 'Košarica', cart_clear: 'Počisti vse', cart_empty: 'Vaša košarica je prazna', cart_browse: 'Prebrskajte izdelke', cart_request_quote: 'Zahtevajte ponudbo', cart_continue: 'Nadaljujte z nakupom', cart_total: 'Skupaj', cart_items: 'artiklov', cart_item: 'artikel' },
  sv: { cart_title: 'Kundvagn', cart_clear: 'Rensa allt', cart_empty: 'Din varukorg är tom', cart_browse: 'Bläddra bland produkter', cart_request_quote: 'Begär offert', cart_continue: 'Fortsätt handla', cart_total: 'Totalt', cart_items: 'varor', cart_item: 'vara' },
  zh: { cart_title: '购物车', cart_clear: '清空全部', cart_empty: '您的购物车是空的', cart_browse: '浏览产品', cart_request_quote: '请求报价', cart_continue: '继续购物', cart_total: '总计', cart_items: '件商品', cart_item: '件商品' },
};

// Each language block has a unique warranty text we can anchor to
const anchors = {
  en: '"products_shipping_warranty_text": "All MikroTik',
  pt: '"products_shipping_warranty_text": "Todos os produtos MikroTik',
  de: '"products_shipping_warranty_text": "Alle MikroTik',
  fr: '"products_shipping_warranty_text": "Tous les produits MikroTik',
  es: '"products_shipping_warranty_text": "Todos los productos MikroTik',
  it: '"products_shipping_warranty_text": "Tutti i prodotti MikroTik',
  ru: '"products_shipping_warranty_text": "На все продукты MikroTik',
  bg: '"products_shipping_warranty_text": "Всички продукти MikroTik',
  hr: '"products_shipping_warranty_text": "Svi MikroTik',
  cs: '"products_shipping_warranty_text": "Na všechny produkty MikroTik',
  da: '"products_shipping_warranty_text": "Alle MikroTik-produkter',
  nl: '"products_shipping_warranty_text": "Alle MikroTik',
  et: '"products_shipping_warranty_text": "Kõikidel MikroTik',
  fi: '"products_shipping_warranty_text": "Kaikilla MikroTik',
  el: '"products_shipping_warranty_text": "Όλα τα προϊόντα MikroTik',
  hu: '"products_shipping_warranty_text": "Minden MikroTik',
  ga: '"products_shipping_warranty_text": "Tá barántas caighdeánach',
  lv: '"products_shipping_warranty_text": "Visiem MikroTik',
  lt: '"products_shipping_warranty_text": "Visiems MikroTik',
  mt: '"products_shipping_warranty_text": "Il-prodotti kollha tal-MikroTik',
  pl: '"products_shipping_warranty_text": "Wszystkie produkty MikroTik',
  ro: '"products_shipping_warranty_text": "Toate produsele MikroTik',
  sk: '"products_shipping_warranty_text": "Na všetky produkty MikroTik',
  sl: '"products_shipping_warranty_text": "Vsi izdelki MikroTik',
  sv: '"products_shipping_warranty_text": "Alla MikroTik',
  zh: '"products_shipping_warranty_text": "所有 MikroTik',
};

// Process in reverse order to not mess up indices
const entries = Object.entries(anchors).reverse();

for (const [langCode, anchor] of entries) {
  const keys = cartKeys[langCode];
  if (!keys) { console.log('Missing keys for', langCode); continue; }

  const idx = src.indexOf(anchor);
  if (idx === -1) { console.log('Anchor not found for', langCode, '- anchor:', anchor); continue; }

  // Find end of the anchor line
  const lineEnd = src.indexOf('\n', idx);
  if (lineEnd === -1) { console.log('No newline after anchor for', langCode); continue; }

  const insertBlock = '\n' + Object.entries(keys).map(([k, v]) => `  "${k}": "${v}",`).join('\n');
  src = src.slice(0, lineEnd) + insertBlock + src.slice(lineEnd);
  console.log('Injected cart keys for', langCode);
}

writeFileSync(filePath, src);
console.log('Done. New size:', statSync(filePath).size);
