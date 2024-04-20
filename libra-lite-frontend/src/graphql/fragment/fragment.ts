import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { createFragmentRegistry } from "@apollo/client/cache";
import { AUTHOR_FRAGMENT } from "../fragment/authorFragment";
import { BOOK_FRAGMENT } from "../fragment/bookFragment";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(gql`
        ${AUTHOR_FRAGMENT},
        ${BOOK_FRAGMENT},
        `),
  }),
});
