import { graphql, Link, PageProps } from "gatsby";
import React from "react";

interface PageContext {
  name: string;
}

export default function SingleToppingPage(
  props: PageProps<GatsbyTypes.SingleToppingQuery, PageContext>
): JSX.Element {
  const { topping, pizzas } = props.data;
  return (
    <>
      <h2>
        {topping?.name} {topping?.vegetarian ? `🌱` : `🍖`}
      </h2>
      {pizzas.nodes.length ? (
        <>
          <p>Want some pizzas with that topping? Try these!</p>
          <ul>
            {pizzas.nodes.map((pizza) => (
              <Link to={`/pizza/${pizza.slug?.current}`} key={pizza.id}>
                {pizza.name}
              </Link>
            ))}
          </ul>
        </>
      ) : (
        <p>There&apos;s no pizzas with this topping! Propose one!</p>
      )}
    </>
  );
}

export const query = graphql`
  query SingleTopping($name: String!) {
    topping: sanityTopping(name: { eq: $name }) {
      name
      vegetarian
      id
    }
    pizzas: allSanityPizza(
      filter: { toppings: { elemMatch: { name: { eq: $name } } } }
    ) {
      nodes {
        id
        name
        slug {
          current
        }
      }
    }
  }
`;
