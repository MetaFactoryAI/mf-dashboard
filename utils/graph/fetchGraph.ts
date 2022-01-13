import {
  ApolloClient,
  InMemoryCache,
  gql,
  ApolloQueryResult,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const httpLink = (endpoint: string) =>
  createHttpLink({
    uri: endpoint,
  });

const authLink = (authBearer: string | undefined) =>
  setContext((_, { headers }) =>
    // return the headers to the context so httpLink can read them
    ({
      headers: {
        ...headers,
        // authorization: authBearer ? `Bearer ${authBearer}` : "",
        authorization: "Basic xxxxx",
      },
    }),
  );

const fetchGraph = async <T, V>(
  endpoint: string,
  query: string,
  variables?: V,
  authBearer?: string,
): Promise<ApolloQueryResult<T>> => {
  const client = new ApolloClient({
    link: authLink(authBearer).concat(httpLink(endpoint)),
    cache: new InMemoryCache(),
  });

  return client.query<T, V>({
    query: gql(query),
    variables,
  });
};

export default fetchGraph;
