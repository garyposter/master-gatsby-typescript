import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import styled from "styled-components";

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    padding: 5px;
    background: var(--grey);
    align-items: center;
    border-radius: 5px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    .active {
      background: var(--yellow);
    }
  }
`;

type CountedTopping = GatsbyTypes.AllToppingsDataQuery["toppings"]["nodes"][number] & {
  count: number;
};

// this includes toppings with 0 pizzas, which is different than what Wes Bos did.
function countPizzasForToppings({
  toppings,
  pizzas,
}: GatsbyTypes.AllToppingsDataQuery): CountedTopping[] {
  const resultToppings = toppings.nodes.map((node) => ({ ...node, count: 0 }));
  const toppingsMap = new Map<CountedTopping["id"], CountedTopping>();
  resultToppings.forEach((topping) => {
    toppingsMap.set(topping.id, topping);
  });
  pizzas.nodes.forEach((pizza) => {
    pizza.toppings?.forEach((topping) => {
      if (!topping) return;
      const record = toppingsMap.get(topping.id);
      if (record) record.count++;
    });
  });
  resultToppings.sort((t1, t2) => t2.count - t1.count);
  // resultToppings.sort((t1, t2) => (t1.name || "").localeCompare(t2.name || ""));
  return resultToppings;
}

export default function ToppingsFilter(): JSX.Element {
  // Get all the toppings
  // Get all pizzas with their toppings
  const { toppings, pizzas } = useStaticQuery<
    GatsbyTypes.AllToppingsDataQuery
  >(graphql`
    query AllToppingsData {
      toppings: allSanityTopping {
        nodes {
          name
          vegetarian
          id
        }
      }
      pizzas: allSanityPizza {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);
  // Count pizzas for each topping
  const countedToppings = countPizzasForToppings({ toppings, pizzas });
  // Loop over reach topping and display name and pizza count
  // link it up...
  return (
    <ToppingsStyles>
      {countedToppings.map((topping) => (
        <Link to={`/topping/${topping.name}`} key={topping.id}>
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  );
}
