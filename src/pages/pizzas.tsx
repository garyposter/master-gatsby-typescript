import { graphql } from "gatsby";
import React from "react";
import PizzaList from "../components/PizzaList";

export default function PizzasPage({
  data,
}: {
  data: GatsbyTypes.PizzasQuery;
}) {
  const pizzas = data.pizzas.nodes;
  return <PizzaList pizzas={pizzas} />;
}

export const query = graphql`
  query Pizzas {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
