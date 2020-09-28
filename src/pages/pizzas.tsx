import { graphql, PageProps } from "gatsby";
import React from "react";
import PizzaList from "../components/PizzaList";
import ToppingsFilter from "../components/ToppingsFilter";

interface PageContext {
  name: string | undefined;
}

export default function PizzasPage({
  data,
}: PageProps<GatsbyTypes.PizzasQuery, PageContext>): JSX.Element {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <ToppingsFilter />
      <PizzaList pizzas={pizzas} />
    </>
  );
}

export const query = graphql`
  query Pizzas($name: String) {
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { eq: $name } } } }
    ) {
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
