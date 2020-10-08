import { graphql, PageProps } from "gatsby";
import React from "react";
import SEO from "../components/SEO";
import useForm from "../utils/useForm";
import Img from "gatsby-image";
import calculatePizzaPrice, { sizes } from "../utils/calculatePizzaPrice";
import formatMoney from "../utils/formatMoney";
import OrderStyles from "../styles/OrderStyles";
import MenuItemStyles from "../styles/MenuItemStyles";
import usePizza, { Inputs } from "../utils/usePizza";
import PizzaOrder from "../components/PizzaOrder";

// formik is popular, who knew.

export default function OrderPage({
  data,
  location,
}: PageProps<GatsbyTypes.OrderPizzasQuery>): JSX.Element {
  const [values, updateValue] = useForm<Inputs>({ name: "", email: "" });
  const pizzas = data.pizzas.nodes;
  const { order, addToOrder, removeFromOrder } = usePizza({
    pizzas,
    inputs: values,
  });
  return (
    <>
      <SEO title="Orders" location={location} />
      <OrderStyles>
        <fieldset>
          <legend>Your info</legend>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={updateValue}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={updateValue}
          />
        </fieldset>
        <fieldset className="menu">
          <legend>Menu</legend>
          {pizzas.map((pizza) => {
            const imgData = pizza?.image?.asset?.fluid;
            return (
              <MenuItemStyles key={pizza.id}>
                {imgData && <Img fluid={imgData} alt={pizza?.name || ""} />}
                <div>
                  <h2>{pizza.name}</h2>
                </div>
                <div>
                  {sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => addToOrder({ id: pizza.id, size })}
                    >
                      {size}{" "}
                      {formatMoney(
                        calculatePizzaPrice(pizza.price || NaN, size)
                      )}
                    </button>
                  ))}
                </div>
              </MenuItemStyles>
            );
          })}
        </fieldset>
        <fieldset className="order">
          <legend>Order</legend>
          <PizzaOrder
            pizzas={pizzas}
            order={order}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query OrderPizzas {
    pizzas: allSanityPizza {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
