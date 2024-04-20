import { NextUIProvider } from "@nextui-org/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ReactDOM from "react-dom/client";
import "./styles.css";
import { createFragmentRegistry } from "@apollo/client/cache";
import { AUTHOR_FRAGMENT, BOOK_FRAGMENT } from "./graphql/fragment";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache({
    fragments: createFragmentRegistry(AUTHOR_FRAGMENT, BOOK_FRAGMENT),
  }),
});

const root = ReactDOM.createRoot(document.getElementById("root") as Element);

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </BrowserRouter>
  </ApolloProvider>
);

export default client;
