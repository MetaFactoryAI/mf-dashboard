import { useState, useCallback } from "react";
import fetchGraph from "./fetchGraph";

const SUBGRAPH_ENDPOINTS: { [network: string]: string } = {
  metafactory: "https://metafactory.hasura.app/v1/graphql",
  test: "https://countries.trevorblades.com",
};

const useFetchGraph = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(true);

  const fetchMetafactory = (query: string, accountAuthToken: string) => {
    setLoading(true);

    return (
      fetchGraph(SUBGRAPH_ENDPOINTS.test, query, null, accountAuthToken)
        // @ts-ignore
        .then(({ data: currentData }) => setData(currentData))
        .catch((error) => setErrors(error))
        .finally(() => setLoading(false))
    );
  };

  return {
    data,
    fetchMetafactory: useCallback(fetchMetafactory, []),
    loading,
    errors,
  };
};

export default useFetchGraph;
