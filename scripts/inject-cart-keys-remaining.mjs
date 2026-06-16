import { readFileSync, writeFileSync, statSync } from 'fs';

const filePath = 'src/lib/translations.ts';
let src = readFileSync(filePath, 'utf8');

const cartKeys = {
  ru: { cart_title: 'Корзина', cart_clear: 'Очистить всё', cart_empty: 'Ваша корзина пуста', cart_browse: 'Просмотр товаров', cart_request_quote: 'Запросить предложение', cart_continue: 'Продолжить покупки', cart_total: 'Итого', cart_items: 'товаров', cart_item: 'товар' },
  cs: { cart_title: 'Košík', cart_clear: 'Vymazat vše', cart_empty: 'Váš košík je prázdný', cart_browse: 'Procházet produkty', cart_request_quote: 'Vyžádat nabídku', cart_continue: 'Pokračovat v nákupu', cart_total: 'Celkem', cart_items: 'položek', cart_item: 'položka' },
  et: { cart_title: 'Ostukorv', cart_clear: 'Tühjenda kõik', cart_empty: 'Teie ostukorv on tühi', cart_browse: 'Sirvi tooteid', cart_request_quote: 'Küsi pakkumist', cart_continue: 'Jätka ostmist', cart_total: 'Kokku', cart_items: 'toodet', cart_item: 'toode' },
  ga: { cart_title: 'Ciseán', cart_clear: 'Glan gach rud', cart_empty: 'Tá do chiseán folamh', cart_browse: 'Féach ar tháirgí', cart_request_quote: 'Iarr luacháil', cart_continue: 'Lean ar aghaidh ag siopadóireacht', cart_total: 'Iomlán', cart_items: 'míreanna', cart_item: 'mír' },
  lt: { cart_title: 'Krepšelis', cart_clear: 'Išvalyti viską', cart_empty: 'Jūsų krepšelis tuščias', cart_browse: 'Naršyti produktus', cart_request_quote: 'Prašyti pasiūlymo', cart_continue: 'Tęsti apsipirkimą', cart_total: 'Iš viso', cart_items: 'prekių', cart_item: 'prekė' },
  mt: { cart_title: 'Basket', cart_clear: 'Ħassar kollox', cart_empty: 'Il-basket tiegħek huwa vojt', cart_browse: 'Fittex prodotti', cart_request_quote: 'Itlob kwotazzjoni', cart_continue: 'Kompli tixtri', cart_total: 'Total', cart_items: 'oġġetti', cart_item: 'oġġett' },
  sk: { cart_title: 'Košík', cart_clear: 'Vymazať všetko', cart_empty: 'Váš košík je prázdny', cart_browse: 'Prechádzať produkty', cart_request_quote: 'Požiadať o ponuku', cart_continue: 'Pokračovať v nákupe', cart_total: 'Spolu', cart_items: 'položiek', cart_item: 'položka' },
};

const anchors = {
  ru: '"products_shipping_warranty_text": "Все продукты MikroTik имеют стандартную заводскую гарантию.',
  cs: '"products_shipping_warranty_text": "Všechny produkty MikroTik jsou opatřeny standardní zárukou výrobce.',
  et: '"products_shipping_warranty_text": "Kõigil MikroTik toodetel on standardne tootjagarantii.',
  ga: '"products_shipping_warranty_text": "Iompraíonn gach táirge MikroTik baránta caighdeánach',
  lt: '"products_shipping_warranty_text": "Visiems MikroTik produktams yra standartinė gamintojo garantija.',
  mt: '"products_shipping_warranty_text": "Il-prodotti kollha MikroTik iġorru garanzija standard tal-manifattur.',
  sk: '"products_shipping_warranty_text": "Všetky produkty MikroTik majú štandardnú záruku výrobcu.',
};

// Check actual text in file for lt since it didn't match
const ltIdx = src.indexOf('"products_shipping_warranty_text": "Visiems MikroTik');
console.log('lt anchor search result index:', ltIdx);
if (ltIdx !== -1) {
  console.log('lt context:', src.slice(ltIdx, ltIdx + 100));
}

for (const [langCode, anchor] of Object.entries(anchors)) {
  const keys = cartKeys[langCode];
  const idx = src.indexOf(anchor);
  if (idx === -1) {
    // Try to find the lt one differently
    const altSearch = src.indexOf('"products_shipping_warranty_text"', src.indexOf(`translationLt`));
    console.log(`Anchor not found for ${langCode}. Trying nearby...`);
    // Grep for the line
    const lines = src.split('\n');
    const found = lines.filter(l => l.includes('products_shipping_warranty_text') && l.includes('MikroTik'));
    console.log('Found lines:', found.slice(0, 3));
    continue;
  }

  const lineEnd = src.indexOf('\n', idx);
  const insertBlock = '\n' + Object.entries(keys).map(([k, v]) => `  "${k}": "${v}",`).join('\n');
  src = src.slice(0, lineEnd) + insertBlock + src.slice(lineEnd);
  console.log('Injected cart keys for', langCode);
}

writeFileSync(filePath, src);
console.log('Done. New size:', statSync(filePath).size);
