import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";
import Pagination from "../components/Pagination";

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

interface PageContext {
  skip: number;
  limit: number;
  currentPage: number;
}

export default function SlicemastersPage({
  data,
  pageContext: { skip, limit, currentPage },
}: PageProps<GatsbyTypes.SlicemastersQuery, PageContext>): JSX.Element {
  const people = data.people.nodes;
  return (
    <>
      <Pagination
        base="slicemasters"
        skip={skip || 0}
        limit={limit || parseInt(process.env.GATSBY_PAGE_SIZE || "")}
        currentPage={currentPage || 1}
        totalCount={data.people.totalCount}
      />
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
  query Slicemasters($skip: Int = 0, $limit: Int = 4) {
    people: allSanityPerson(skip: $skip, limit: $limit) {
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
