import { useState } from "react";
import { sizeValues } from "./calculatePizzaPrice";

export type Pizza = GatsbyTypes.OrderPizzasQuery["pizzas"]["nodes"][number];
export interface OrderedPizza {
  id: Pizza["id"];
  size: sizeValues;
}

export interface Inputs {
  name: string;
  email: string;
}

interface usePizzaProps {
  pizzas: readonly Pizza[];
  inputs: Inputs;
}

export default function usePizza({}: // pizzas, inputs,
usePizzaProps): {
  order: OrderedPizza[];
  addToOrder: (pizza: OrderedPizza) => void;
  removeFromOrder: (ix: number) => void;
} {
  const [order, setOrder] = useState<OrderedPizza[]>([]);
  function addToOrder(orderedPizza: OrderedPizza): void {
    setOrder([...order, orderedPizza]);
  }
  function removeFromOrder(index: number): void {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }
  return { order, addToOrder, removeFromOrder };
}
