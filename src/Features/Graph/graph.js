import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Provider, createClient, useQuery } from 'urql';
import { actions } from './sliceReducer';
import Metrics from '../Metrics/metricList';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const graphQuery = `
  query {
    graph                                                                                                              
  }
  `;

export default () => {
  return (
    <Provider value={client}>
      <Graph />
    </Provider>
  );
};

const Graph = () => {
  const dispatch = useDispatch();
  const timeStamp = useSelector(state => state.graphData.current);

  const [graphRes] = useQuery({
    query: graphQuery,
  });
  const { data, error } = graphRes;
  useEffect(() => {
    if (error) {
      console.log(error.message);
      return;
    }
    if (!data) return;

    dispatch(actions.timestamp(data.graph));
  });

  return <Metrics />;
};
