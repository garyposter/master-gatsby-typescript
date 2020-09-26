import { Link } from "gatsby";
import React from "react";
import Img from "gatsby-image";

type Pizzas = GatsbyTypes.PizzasQuery["pizzas"]["nodes"];

type Pizza = Pizzas[number];

interface PizzaProps {
  pizza: Pizza;
}

function Pizza({ pizza }: PizzaProps): JSX.Element {
  const imgData = pizza.image?.asset?.fluid;
  return (
    <Link to={`/pizza/${pizza.slug?.current}`}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
      <p>{pizza.toppings?.map((topping) => topping?.name).join(", ")}</p>
      {imgData ? <Img fluid={imgData} alt={pizza.name} /> : ""}
    </Link>
  );
}

interface PizzaListProps {
  pizzas: Pizzas;
}

export default function PizzaList({ pizzas }: PizzaListProps): JSX.Element {
  return (
    <>
      {pizzas.map((pizza) => (
        <Pizza key={pizza.id} pizza={pizza} />
      ))}
    </>
  );
}
