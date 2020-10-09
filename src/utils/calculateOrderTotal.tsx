import calculatePizzaPrice from "./calculatePizzaPrice";
import { OrderedPizza, Pizza } from "../components/OrderContext";

export default function calculateOrderTotal(
  order: OrderedPizza[],
  pizzas: readonly Pizza[]
): number {
  return order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find((pizza) => pizza.id === singleOrder.id);
    if (!pizza) return runningTotal;
    return (
      runningTotal + calculatePizzaPrice(pizza.price || 0, singleOrder.size)
    );
  }, 0);
}
