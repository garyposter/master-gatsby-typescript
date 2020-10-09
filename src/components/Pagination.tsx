import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";

interface Props {
  limit: number;
  totalCount: number;
  currentPage: number;
  skip: number;
  base: string;
}

const Nav = styled.div`
  display: flex;
  border: 1px solid var(--grey);
  border-radius: 5px;
  margin: 2rem 0;
  > * {
    flex: 1;
  }
  > a:last-child {
    text-align: right;
  }
  div {
    display: flexbox;
    justify-content: space-between;
    a {
      display: block;
    }
    a[aria-current],
    a.current {
      color: var(--red);
    }
  }
  a {
    text-decoration: none;
  }
  a[aria-disabled="true"] {
    color: var(--grey);
    pointer-events: none;
  }
`;

export default function Pagination({
  limit,
  totalCount,
  currentPage,
  // skip,
  base,
}: Props): JSX.Element | null {
  const pageCount = Math.ceil(totalCount / limit),
    previous = currentPage > 2 ? currentPage - 1 : "",
    hasPrevious = currentPage > 1,
    next = currentPage + 1,
    hasNext = next <= pageCount;
  return (
    <Nav>
      <Link aria-disabled={!hasPrevious} to={`/${base}/${previous}`}>
        ⬅ Previous
      </Link>
      <div>
        {Array.from({ length: pageCount }, (_, ix) => (
          <Link
            key={ix}
            className={currentPage === ix + 1 ? "current" : undefined}
            to={`/${base}/${ix > 0 ? ix + 1 : ""}`}
          >
            {ix + 1}
          </Link>
        ))}
      </div>
      <Link aria-disabled={!hasNext} to={`/${base}/${next}`}>
        Next ➡
      </Link>
    </Nav>
  );
}
