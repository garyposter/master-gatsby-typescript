import React, { useState, createContext } from "react";
import { sizeValues } from "../utils/calculatePizzaPrice";

export type Pizza = GatsbyTypes.OrderPizzasQuery["pizzas"]["nodes"][number];
export interface OrderedPizza {
  id: Pizza["id"];
  size: sizeValues;
}

type OrderState = [OrderedPizza[], (order: OrderedPizza[]) => void];

const OrderContext = createContext<OrderState>([
  [],
  () => {
    console.log("Bad!");
  },
]);
export default OrderContext;

export function OrderProvider({
  children,
}: {
  children: JSX.Element;
}): JSX.Element {
  const [order, setOrder] = useState<OrderedPizza[]>([]);
  return (
    <OrderContext.Provider value={[order, setOrder]}>
      {children}
    </OrderContext.Provider>
  );
}
