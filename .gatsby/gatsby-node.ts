import { CreatePagesArgs, SourceNodesArgs } from "gatsby";
import path from "path";
import fetch from "isomorphic-fetch";

async function fetchBeverages({
  actions,
  createNodeId,
  createContentDigest,
}: SourceNodesArgs) {
  // fetch list of beverages
  const res = await fetch("https://sampleapis.com/beers/api/ale");
  const beers = await res.json();
  // loop; for each, create Node
  for (const beer of beers) {
    const nodeData = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: {},
      internal: {
        type: "Beer",
        mediaType: "application/json",
        contentDigest: createContentDigest(beer),
      },
    };
    actions.createNode({
      ...beer,
      ...nodeData,
    });
  }
}

export async function sourceNodes(params: SourceNodesArgs) {
  // fetch a list of beers and source them into Gatsby API
  await Promise.all([fetchBeverages(params)]);
}

async function turnPizzasIntoPages({ graphql, actions }: CreatePagesArgs) {
  // 1. get template
  const pizzaTemplate = path.resolve("./src/templates/Pizza.tsx");
  // 2. query all pizzas
  const { data } = await graphql<any>(`
    query ListAllPizzas {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // 3. Loop over each pizza and create a page for each
  const { createPage } = actions;
  data.pizzas.nodes.forEach(
    (pizza: { name: string; slug: { current: string } }) => {
      createPage({
        path: `pizza/${pizza.slug.current}`,
        component: pizzaTemplate,
        context: { slug: pizza.slug.current },
      });
    }
  );
}

async function turnToppingsIntoPages({ graphql, actions }: CreatePagesArgs) {
  // 1. get template
  const toppingTemplate = path.resolve("./src/pages/pizzas.tsx");
  // 2. query all toppings
  const { data } = await graphql<any>(`
    query ListAllToppings {
      toppings: allSanityTopping {
        nodes {
          name
        }
      }
    }
  `);
  // 3. Loop over each topping and create a page for each
  const { createPage } = actions;
  data.toppings.nodes.forEach((topping: { name: string }) => {
    createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: { name: topping.name },
    });
  });
}

export async function createPages(params: CreatePagesArgs) {
  // create pages dynamically
  await Promise.all([
    // 1. pizzas
    turnPizzasIntoPages(params),
    // 2. toppings
    turnToppingsIntoPages(params),
    // 3. Slicemasters
  ]);
}
