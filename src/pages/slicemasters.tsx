import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";

const SlicemasterGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`;

const SlicemasterStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 1;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 1;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

export default function SlicemastersPage({
  data,
}: PageProps<GatsbyTypes.SlicemastersQuery>): JSX.Element {
  const count = data.people.totalCount;
  const people = data.people.nodes;
  return (
    <>
      <SlicemasterGrid>
        {people.map((person) => {
          const image = person.image?.asset?.fluid;
          return (
            <SlicemasterStyles key={person.id}>
              <Link to={`/slicemasters/${person.slug?.current}`}>
                <h2>
                  <span className="mark">{person.name}</span>
                </h2>
              </Link>
              {image && <Img fluid={image} />}
              <p className="description">{person.description}</p>
            </SlicemasterStyles>
          );
        })}
      </SlicemasterGrid>
    </>
  );
}

export const query = graphql`
  query Slicemasters {
    people: allSanityPerson {
      totalCount
      nodes {
        id
        description
        name
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
