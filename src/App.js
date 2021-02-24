import { mainData } from "./data/data";
import ProductList from "./components/ProductList/ProductList";
import "./App.css";

function App() {
  const mainDataClone = JSON.parse(JSON.stringify(mainData));

  const result = transfromData(mainDataClone);

  return (
    <div className="App">
      <ProductList data={result}></ProductList>
    </div>
  );
}

function transfromData(data) {
  return data.map((item) => {
    item.group.map((item) => {
      // Видаляємо зайві властивості
      delete item.brand;
      delete item.category;
      delete item.name;
      delete item.nameExtended;
      delete item.rankOrganic;
      delete item.thumbnail;

      const productUrl = item.productUrl[0].text;

      // Додаємо id
      item.id = [{ text: getId(productUrl) }];

      //  Модифікуємо price
      const price = item.price;
      if (price) {
        item.price = getPrice(price) ? [{ text: getPrice(price) }] : price;
      }

      //  Модифікуємо productUrl
      item.productUrl[0].text = "https://www.metro.ca" + productUrl;

      //  Модифікуємо rank
      const rank = item.rank[0].text;
      item.rank[0].text = rank[rank.length - 1];

      return item;
    });

    return item;
  });
}

function getId(text) {
  const firstIndexForId = text.lastIndexOf("/") + 1;
  return text.slice(firstIndexForId);
}

function getPrice(price) {
  const priceText = price[0]?.text;
  let priceNumber = "";

  for (const i in priceText) {
    if (
      parseInt(priceText[i]) ||
      priceText[i] === "." ||
      priceText[i] === ","
    ) {
      priceNumber += priceText[i];
    }
  }

  return (priceNumber = priceNumber.replace(",", "."));
}

export default App;
