import React from "react";
import Footer from "./Footer";
import Nav from "./Nav";

import "normalize.css"; // in packages
import GlobalStyles from "../styles/GlobalStyles";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  return (
    <div>
      <GlobalStyles />
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
