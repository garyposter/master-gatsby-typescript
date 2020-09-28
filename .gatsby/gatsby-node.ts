import { CreatePagesArgs } from "gatsby";
import path from "path";

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
  const toppingTemplate = path.resolve("./src/templates/Topping.tsx");
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
  // 1. pizzas
  await turnPizzasIntoPages(params);
  // 2. toppings
  await turnToppingsIntoPages(params);
  // 3. Slicemasters
}
