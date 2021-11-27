/* eslint-disable no-unused-vars */
import { useEffect } from 'react';

import createSocketConnection from './socketService';

export function listen(callBack: (payload: any) => void, channel: string, event: string) {
  window.Echo.private(channel).listen(event, (payload: any) => {
    callBack(payload);
  });

  return function cleanUp() {
    window.Echo.leaveChannel(`private-${channel}`);
  };
}

type Options = {
  type: 'ORDER_UPDATED' | 'ORDER_UPDATED_NOTICE' | 'NEW_ORDER';
  callBack: (payload: any) => void;
};

export const useSocket = ({ type, callBack }: Options) => {
  return undefined;
};
