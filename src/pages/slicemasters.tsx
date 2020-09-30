import { graphql, Link, PageProps } from "gatsby";
import React from "react";
import Img from "gatsby-image";
import styled from "styled-components";

const SlicemasterNav = styled.div`
  display: flex;
  justify-content: space-between;
`;

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
  const count = data.people.totalCount;
  let previousHref, nextHref;
  if (currentPage > 1) {
    previousHref = `/slicemasters/${currentPage - 1}`;
  }
  if (skip + limit < count) {
    nextHref = `/slicemasters/${currentPage + 1}`;
  }
  const people = data.people.nodes;
  return (
    <>
      {previousHref || nextHref ? (
        <SlicemasterNav>
          <div>
            {previousHref ? <Link to={previousHref}>Previous page</Link> : null}
          </div>
          <div>{nextHref ? <Link to={nextHref}>Next page</Link> : null}</div>
        </SlicemasterNav>
      ) : null}
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
  query Slicemasters($limit: Int, $skip: Int) {
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
