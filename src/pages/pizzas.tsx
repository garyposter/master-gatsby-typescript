import { graphql, PageProps } from "gatsby";
import React from "react";
import PizzaList from "../components/PizzaList";
import SEO from "../components/SEO";
import ToppingsFilter from "../components/ToppingsFilter";

interface PageContext {
  name: string | undefined;
}

export default function PizzasPage({
  data,
  pageContext,
  location,
}: PageProps<GatsbyTypes.PizzasQuery, PageContext>): JSX.Element {
  const pizzas = data.pizzas.nodes;
  return (
    <>
      <SEO
        title={pageContext.name ? `Pizzas with ${name}` : "All Pizzas"}
        location={location}
      />
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
