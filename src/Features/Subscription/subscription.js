import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Provider, useSubscription, createClient, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { actions as wtActions } from '../WaterTemp/reducer';
import { actions as otActions} from '../OilTemp/reducer';

const subscriptionClient = new SubscriptionClient('wss://react.eogresources.com/graphql', {
  reconnect: true,
  timeout: 20000,
});

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});

const newMessages = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

export default () => {
  return (
    <Provider value={client}>
      <Receiver/>
    </Provider>
  );
};

const Receiver = () => {
  const reducerSwitch = measurement => {
     
    if (measurement.metric === 'waterTemp') {
      return dispatch(wtActions.waterTempData(measurement));
    } else if (measurement.metric === 'oilTemp') {
      return dispatch(otActions.oilTempData(measurement));
    }
    
  };

  const dispatch = useDispatch();
  const receiveMeasurement = useCallback(measurement => reducerSwitch(measurement), [reducerSwitch]);
  const [subscriptionResponse] = useSubscription({ query: newMessages });
  const { data: subscriptionData } = subscriptionResponse;

  useEffect(() => {
    if (!subscriptionData) return;
    receiveMeasurement(subscriptionData.newMeasurement);
  }, [subscriptionData, receiveMeasurement]);

  return null;
};
