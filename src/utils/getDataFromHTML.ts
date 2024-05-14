const DomParser = require('react-native-html-parser').DOMParser;

const getItemsFromMusinsa = (doc: any) => {
  const scripts = doc.getElementsByTagName('script');
  let targetScript = null;
  for (let i = 0; i < scripts.length; i++) {
    if (scripts[i].textContent.includes("'original_price':")) {
      targetScript = scripts[i].textContent;
      break;
    }
  }
  var itemsStringMatch = targetScript.match(
    /'items': (\[(?:\s*{[\s\S]*?}\s*,?\s*)+\])/,
  );
  if (itemsStringMatch && itemsStringMatch[1]) {
    // 추출된 배열 문자열이 JSON 형식에 맞도록 작은따옴표를 큰따옴표로 변환
    var itemsArrayString = itemsStringMatch[1].replace(/'/g, '"');
    try {
      var items = JSON.parse(itemsArrayString);
      return {
        img: items[0].img,
        name: items[0].name,
        originalPrice: items[0].original_price,
        price: items[0].price,
      };
    } catch (e) {
      console.error('JSON parsing error:', e);
    }
  }
};

const getDataFromHTML = (html: string, siteName: string) => {
  const parser = new DomParser();
  const doc = parser.parseFromString(html, 'text/html');
  if (siteName === 'musinsa') {
    getItemsFromMusinsa(doc);
  }
};

export default getDataFromHTML;
