import { graphql, PageProps } from "gatsby";
import React from "react";
import Img from "gatsby-image";

export default function SingleSlicemasterPage(
  props: PageProps<GatsbyTypes.SlicemasterQuery>
): JSX.Element {
  const person = props.data.person;
  const imgData = person?.image?.asset?.fluid;
  return (
    <div className="center">
      {imgData ? (
        <div>
          <Img fluid={imgData} alt={person?.name || ""} />
        </div>
      ) : (
        ""
      )}
      <h2>
        <span className="mark">{person?.name}</span>
      </h2>
      <p>{person?.description}</p>
    </div>
  );
}

export const query = graphql`
  query Slicemaster($slug: String!) {
    person: sanityPerson(slug: { current: { eq: $slug } }) {
      description
      slug {
        current
      }
      image {
        asset {
          fluid(maxWidth: 960, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
      name
    }
  }
`;
