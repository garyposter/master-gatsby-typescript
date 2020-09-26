import { Link } from "gatsby";
import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";

const PizzaGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const PizzaStyles = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    grid-template-rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

type Pizzas = GatsbyTypes.PizzasQuery["pizzas"]["nodes"];

type Pizza = Pizzas[number];

interface PizzaProps {
  pizza: Pizza;
}

function Pizza({ pizza }: PizzaProps): JSX.Element {
  const imgData = pizza.image?.asset?.fluid;
  return (
    <PizzaStyles>
      <Link to={`/pizza/${pizza.slug?.current}`}>
        <h2>
          <span className="mark">{pizza.name}</span>
        </h2>
      </Link>
      <p>{pizza.toppings?.map((topping) => topping?.name).join(", ")}</p>
      {imgData ? <Img fluid={imgData} alt={pizza.name} /> : ""}
    </PizzaStyles>
  );
}

interface PizzaListProps {
  pizzas: Pizzas;
}

export default function PizzaList({ pizzas }: PizzaListProps): JSX.Element {
  return (
    <PizzaGridStyles>
      {pizzas.map((pizza) => (
        <Pizza key={pizza.id} pizza={pizza} />
      ))}
    </PizzaGridStyles>
  );
}
