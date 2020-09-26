import { Link } from "gatsby";
import React from "react";

type Pizzas = GatsbyTypes.PizzasQuery["pizzas"]["nodes"];

type Pizza = Pizzas[number];

interface PizzaProps {
  pizza: Pizza;
}

function Pizza({ pizza }: PizzaProps): JSX.Element {
  return (
    <Link to={`/pizza/${pizza.slug?.current}`}>
      <h2>
        <span className="mark">{pizza.name}</span>
      </h2>
      <p>{pizza.toppings?.map((topping) => topping?.name).join(", ")}</p>
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
