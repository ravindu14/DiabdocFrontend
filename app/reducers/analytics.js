import { ASYNC_STATUS } from "@app/constants/async";
import { type AsyncStatusType } from "@app/types/async";

import {
  ANALYTICS_INIT,
  RESET_NOTIFICATION,
  ANALYTICS_FAILURE,
  GET_ANALYTICS_SUCCESS,
} from "@app/actionTypes/analytics";

// @flow
export type Action = {
  type: string,
  payload: Object,
};

export type AnalyticsStateType = {
  status: AsyncStatusType,
  notification: null,
  analytics: Array<any>,
};

const initialState: AnalyticsStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  analytics: [],
};

function analyticsFailure(state, { message }) {
  return {
    ...state,
    status: ASYNC_STATUS.FAILURE,
    notification: message,
  };
}

function analyticsInit(state) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function resetNotification(state) {
  return {
    ...state,
    notification: null,
  };
}

const reducer = (
  state: AnalyticsStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case ANALYTICS_INIT:
      return analyticsInit(state);
    case ANALYTICS_FAILURE:
      return analyticsFailure(state, payload);
    case RESET_NOTIFICATION:
      return resetNotification(state);
    case GET_ANALYTICS_SUCCESS:
      return {
        ...state,
        notification: null,
        status: ASYNC_STATUS.FAILURE,
        analytics: payload,
      };
    default:
      return state;
  }
};

export default reducer;
