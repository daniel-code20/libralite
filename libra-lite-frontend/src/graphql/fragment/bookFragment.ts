import { gql } from '@apollo/client';

export const BOOK_FRAGMENT = gql`
  fragment BookFragment on Book {
    id
    title
    edition
    author {
      ...AuthorFragment
    }
    quantity
    price
  }
`;