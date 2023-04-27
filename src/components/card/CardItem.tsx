import React, { FC } from "react";
import { ICard } from "./types";
import "./Card.css";

interface ICardProps {
  card: ICard;
}

const CardItem: FC<ICardProps> = ({ card }) => {
  return (
    <div className="col">
      <div className="card h-100 shadow-sm">
        <img src={card.image} alt="" style={{ scale: "0.8" }} />
        <div className="label-top shadow-sm">{card.priority}</div>
        <div className="card-body">
          <div className="clearfix mb-3">
            <span className="float-start badge rounded-pill bg-success">
              {card.urlSlug} &euro;
            </span>
            <span className="float-end">
              <a href="#" className="small text-muted">
                Reviews
              </a>
            </span>
          </div>
          <h5 className="card-title">{card.title}</h5>
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
  );
};

export default CardItem;
