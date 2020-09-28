import React from "react";
import { graphql, Link, PageProps } from "gatsby";
import Img from "gatsby-image";
import Dinero from "dinero.js";
import styled from "styled-components";

interface PageContext {
  name: string;
  slug: string;
}

const ToppingsStyles = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: solid black 1px;
  border-radius: 5px;
  padding: 1rem;
  align-items: center;
  justify-content: center;
  a {
    display: block;
    background: var(--grey);
    border-radius: 5px;
    padding: 5px;
    &:hover {
      background: var(--yellow);
    }
  }
`;

export default function SinglePizzaPage(
  props: PageProps<GatsbyTypes.SinglePizzaQuery, PageContext>
): JSX.Element {
  const pizza = props.data.pizza;
  const imgData = pizza?.image?.asset?.fluid;
  let price;
  if (pizza?.price) {
    price = Dinero({ amount: pizza.price, currency: "USD" }).setLocale("en-US");
  }
  return (
    <>
      <h2>
        Look! It&apos;s {pizza?.name}!{" "}
        {price ? <span>It&apos;s only {price.toFormat()}.</span> : ""}
      </h2>

      {pizza?.toppings?.length ? (
        <ToppingsStyles>
          Featuring...{" "}
          {pizza.toppings.map((topping) =>
            topping ? (
              <Link to={`/topping/${topping.name}`} key={topping.id}>
                <span className="name">{topping.name}</span>
              </Link>
            ) : (
              ""
            )
          )}
        </ToppingsStyles>
      ) : (
        <div>It&apos;s all cheese!</div>
      )}

      {imgData ? (
        <div>
          <Img fluid={imgData} alt={pizza?.name || ""} />
        </div>
      ) : (
        ""
      )}
    </>
  );
}

// $slug is passed in from gatsby-node.ts createPage context.
export const query = graphql`
  query SinglePizza($slug: String!) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetarian
      }
      price
    }
  }
`;
