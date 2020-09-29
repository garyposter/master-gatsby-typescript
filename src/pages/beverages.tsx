import { graphql, PageProps } from "gatsby";
import React, { SyntheticEvent, HTMLAttributes } from "react";
import styled from "styled-components";

const BeerListing = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 5px;
  padding: 1rem;
  margin: 1rem 0;
`;

const BeerInfo = styled.div``;

// https://css-tricks.com/five-methods-for-five-star-ratings/
const Stars = styled.span`
  --star-size: 20px;
  --star-color: #ddd;
  --star-background: #fc0;
  --percent: calc(var(--rating) / 5 * 100%);
  display: inline-block;
  font-size: var(--star-size);
  font-family: Times;
  line-height: 1;
  &::before {
    content: "★★★★★";
    letter-spacing: 3px;
    background: linear-gradient(
      90deg,
      var(--star-background) var(--percent),
      var(--star-color) var(--percent)
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

type BeerQuery = GatsbyTypes.BeveragesQuery["beers"]["nodes"][number];

function Rating({ average, reviews }: GatsbyTypes.BeerRating): JSX.Element {
  const rating = average || 0;
  const starStyle = { "--rating": rating };
  // we have to force-assert that starStyle can be used because the --rating
  // var is not in the typed attributes
  const stars = (
    <Stars
      style={starStyle as HTMLAttributes<HTMLSpanElement>}
      title={`${rating.toFixed(2)} out of 5 stars`}
    />
  );
  return (
    <div>
      {stars} from {reviews} reviews.
    </div>
  );
}

function missingImage(ev: SyntheticEvent<HTMLImageElement, Event>) {
  // it's a red dot. Because it was easy.
  ev.currentTarget.src =
    "data:image/png;base64, iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==";
}

function Beer({ name, price, rating, image }: BeerQuery): JSX.Element {
  return (
    <BeerListing>
      <BeerInfo>
        <h3>{name}</h3>
        <h4>{price}</h4>
        {rating && <Rating {...rating} />}
      </BeerInfo>
      <img src={image} title={name} alt="packaging" onError={missingImage} />
    </BeerListing>
  );
}

export default function BeveragesPage({
  data,
}: PageProps<GatsbyTypes.BeveragesQuery>): JSX.Element {
  const beers = data.beers.nodes;
  return (
    <>
      <h2>View our {beers.length} available beverages! Dine-in only.</h2>
      {beers.map((beer) => (
        <Beer key={beer.id} {...beer} />
      ))}
    </>
  );
}

export const query = graphql`
  query Beverages {
    beers: allBeer {
      nodes {
        name
        price
        rating {
          average
          reviews
        }
        image
        id
      }
    }
  }
`;
