import React from "react";
import MenuItemStyles from "../styles/MenuItemStyles";
import { OrderedPizza, Pizza } from "../utils/usePizza";
import Img from "gatsby-image";
import formatMoney from "../utils/formatMoney";
import calculatePizzaPrice from "../utils/calculatePizzaPrice";

interface PizzaOrderProps {
  order: OrderedPizza[];
  pizzas: readonly Pizza[];
  removeFromOrder: (ix: number) => void;
}

export default function PizzaOrder({
  order,
  pizzas,
  removeFromOrder,
}: PizzaOrderProps): JSX.Element {
  return (
    <>
      {order.map((singleOrder, index) => {
        const pizza = pizzas.find(
          (candidate) => candidate.id === singleOrder.id
        );
        if (!pizza) return;
        const imageData = pizza.image?.asset?.fluid;
        return (
          // singleOrder.id is not a good key
          <MenuItemStyles key={`${singleOrder.id} ${singleOrder.size}`}>
            {imageData && <Img fluid={imageData} />}
            <h2>
              {singleOrder.size}: {pizza.name}
            </h2>
            <p>
              {formatMoney(
                calculatePizzaPrice(pizza.price || NaN, singleOrder.size)
              )}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.size} ${pizza.name} from order`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
