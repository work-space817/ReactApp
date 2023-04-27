import product from "../../assets/product/product_1.jpg";
import { useState } from "react";
import { ICardItem } from "./types";
import "./Card.css";

const Cards = () => {
  const [items, setitems] = useState<ICardItem[]>([
    {
      id: 1,
      img: product,
      name: "Asus Rog",
      price: 12354,
      title:
        "Lorem, ipsum dolor sit amet consectetur adipisicin Veniam quidem eaque ut eveniet aut quis rerum. Asperiores accusamus harum ducimus velit odit ut. Saepe, iste optio laudantium sed aliquam sequi.",
    },
  ]);
  return (
    <>
      <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-4 g-3">
        {items.map((item) => (
          <div key={item.id} className="col">
            <div className="card h-100 shadow-sm">
              <img src={item.img} alt="" style={{ scale: "0.8" }} />
              <div className="label-top shadow-sm">{item.name}</div>
              <div className="card-body">
                <div className="clearfix mb-3">
                  <span className="float-start badge rounded-pill bg-success">
                    {item.price}&euro;
                  </span>
                  <span className="float-end">
                    <a href="#" className="small text-muted">
                      Reviews
                    </a>
                  </span>
                </div>
                <h5 className="card-title">{item.title}</h5>
                <div className="text-center my-4">
                  <a href="#" className="btn btn-warning">
                    Check offer
                  </a>
                </div>
                <div className="clearfix mb-1">
                  <span className="float-start">
                    <i className="far fa-question-circle"></i>
                  </span>
                  <span className="float-end">
                    <i className="fas fa-plus"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Cards;
