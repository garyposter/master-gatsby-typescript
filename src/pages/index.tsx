import { PageProps } from "gatsby";
import React from "react";
import SEO from "../components/SEO";

export default function HomePage({ location }: PageProps): JSX.Element {
  return (
    <>
      <SEO title="Home" location={location} />
      <p>The home page is homey.</p>
      <hr />
      <p>yeah.</p>
    </>
  );
}
