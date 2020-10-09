import { ProxyHandler } from "aws-lambda";

// This would be found in the browser at
// /.netlify/functions/placeOrder

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const handler: ProxyHandler = async (_event, _context) => {
  return {
    statusCode: 200,
    body: "Hello from placeOrder!!!",
  };
};
