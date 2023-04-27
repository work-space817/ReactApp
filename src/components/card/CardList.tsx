import React, { FC } from "react";
import { ICard } from "./types";
import CardItem from "./CardItem";

interface ICardProps {
  cards: ICard[];
}

const CardList: FC<ICardProps> = ({ cards }) => {
  return (
    <>
      {cards.map((card) => (
        <CardItem key={card.id} card={card} />
      ))}
    </>
  );
};

export default CardList;
