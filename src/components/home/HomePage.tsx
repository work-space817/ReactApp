import { useEffect, useState } from "react";
import Slider from "./Slider";
// import { ICategoryItem } from "./types";
import product from "../../assets/product/product_1.jpg";
import CardItem from "../product/Cards";
import { ICardItem } from "../product/types";
import axios from "axios";
import CardList from "../card/CardList";
import { ICard } from "../card/types";
import { APP_ENV } from "../../env";
import http from "../../http_common";

const HomePage = () => {
  // const [list, setList] = useState<ICategoryItem[]>([
  // {
  //   id: 1,
  //   name: "Ноутбуки",
  //   image:
  //     "https://cdn.thewirecutter.com/wp-content/media/2022/10/laptopstopicpage-2048px-2029.jpg",
  // },
  // {
  //   id: 1,
  // },
  // ]);
  // const viewList = list.map((item) => (
  //   <tr key={item.id}>
  //     <th scope="row">{item.id}</th>
  //     <td>
  //       <img src={item.image} alt="Якась фотка" width="75" />
  //     </td>
  //     <td>{item.name}</td>
  //   </tr>
  // ));

  const [items, setitems] = useState<ICard[]>([
    // {
    //   id: 1,
    //   img: product,
    //   name: "Asus Rog",
    //   price: 12354,
    //   title:
    //     "Lorem, ipsum dolor sit amet consectetur adipisicin Veniam quidem eaque ut eveniet aut quis rerum. Asperiores accusamus harum ducimus velit odit ut. Saepe, iste optio laudantium sed aliquam sequi.",
    // },
  ]);

  useEffect(() => {
    fetchItem();
  }, []);

  async function fetchItem() {
    try {
      const response = await http.get<ICard[]>("api/Categories/list");
      setitems(response.data);
    } catch (error) {
      alert(error);
    }
  }
  console.log("render", APP_ENV);

  return (
    <>
      {/* <Slider /> */}
      {/* <h1 classNameName="text-center">Головна сторінка</h1>
      <table classNameName="table text-white-50">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Фото</th>
            <th scope="col">Назва</th>
          </tr>
        </thead>
        <tbody>{viewList}</tbody>
      </table> */}

      <CardList cards={items} />
    </>
  );
};

export default HomePage;
