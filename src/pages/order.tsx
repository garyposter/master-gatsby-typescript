import { PageProps } from "gatsby";
import React from "react";
import SEO from "../components/SEO";

export default function OrderPage({ location }: PageProps): JSX.Element {
  return (
    <>
      <SEO title="Orders" location={location} />
      <p>Make an order.</p>
    </>
  );
}
