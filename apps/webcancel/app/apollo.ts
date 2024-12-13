import { ApolloClient, InMemoryCache } from "@apollo/client/index.js";

export const client =  new ApolloClient({
    uri: "http://localhost:5000/graphql",
    cache: new InMemoryCache(),
  })