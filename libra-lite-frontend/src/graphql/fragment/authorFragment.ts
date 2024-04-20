import { gql } from '@apollo/client';

export const AUTHOR_FRAGMENT = gql`
  fragment AuthorFragment on Author {
    id
    name
  }
`;