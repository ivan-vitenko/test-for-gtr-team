import s from "./ProductList.module.css";

const ProductList = ({ data }) => (
  <ol>
    {data.map((item, index) => (
      <li key={index} className={s.listItem}>
        {Object.keys(item)}
        <ol>
          {item.group.map((item) => (
            <li key={item.id[0].text}>
              Product
              <ol>
                <li>id: {item.id[0].text}</li>

                <li>
                  productUrl:{" "}
                  <a href={item.productUrl[0].text}>
                    {item.productUrl[0].text}
                  </a>
                </li>

                {item.price && <li>price: {item.price[0]?.text}</li>}
                <li>rank: {item.rank[0].text}</li>
              </ol>
            </li>
          ))}
        </ol>
      </li>
    ))}
  </ol>
);

export default ProductList;
