import { graphql } from "gatsby";
import React from "react";

export default function PizzasPage({
  data,
}: {
  data: GatsbyTypes.PizzasQuery;
}) {
  console.log(data);
  return (
    <>
      <p>The many, many pizzas.</p>
    </>
  );
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
