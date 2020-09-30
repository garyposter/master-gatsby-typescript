import { CreatePagesArgs, SourceNodesArgs } from "gatsby";
import path from "path";
import fetch from "isomorphic-fetch";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

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

async function turnSlicemastersIntoPages({
  graphql,
  actions,
}: CreatePagesArgs) {
  // query Slicemasters
  const { data } = await graphql<any>(`
    query ListAllSlicemasters {
      people: allSanityPerson {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // TODO turn Slicemaster into their own page
  // figure out how many pages there are based on slicemaster count and GATSBY_PAGE_SIZE
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.people.totalCount / pageSize);
  // create the pages (with slicemasters.tsx that can be filtered)
  Array.from({ length: pageCount }).forEach((_, i) => {
    const index = i + 1;
    const fromPerson = i * pageSize;
    const toPerson = Math.min(index * pageSize, data.people.totalCount);
    actions.createPage({
      path: `slicemasters/${i + 1}`,
      component: path.resolve("./src/pages/slicemasters.tsx"),
      context: { from: fromPerson, to: toPerson, currentPage: index },
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
    turnSlicemastersIntoPages(params),
  ]);
}
