import React from "react";

export default function Footer(): JSX.Element {
  return (
    <footer>
      <p>&copy; Slick&apos;s Slices {new Date().getFullYear()}</p>
    </footer>
  );
}
