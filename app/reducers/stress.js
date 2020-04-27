import { ASYNC_STATUS } from "@app/constants/async";
import { type AsyncStatusType } from "@app/types/async";

import {
  STRESS_INIT,
  STRESS_INITIATE,
  PREDICT_STRESS_SUCCESS,
  STRESS_FAILURE,
  RESET_NOTIFICATION,
  STRESS_PLAN_SUCCESS,
} from "@app/actionTypes/stress";

// @flow
export type Action = {
  type: string,
  payload: Object,
};

export type StressStateType = {
  status: AsyncStatusType,
  notification: null,
  predictedResult: string | null,
  activityPlan: number | null,
};

const initialState: StressStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  predictedResult: null,
  activityPlan: null,
};

function stressInit(state) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function stressFailure(state, { message }) {
  return {
    ...state,
    status: ASYNC_STATUS.FAILURE,
    notification: message,
  };
}

function resetNotification(state) {
  return {
    ...state,
    notification: null,
  };
}

const reducer = (
  state: StressStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case STRESS_INIT:
      return stressInit(state);
    case STRESS_FAILURE:
      return stressFailure(state, payload);
    case RESET_NOTIFICATION:
      return resetNotification(state);
    case STRESS_INITIATE:
      return {
        ...state,
        notification: null,
        status: ASYNC_STATUS.INIT,
        predictedResult: null,
      };
    case PREDICT_STRESS_SUCCESS:
      return {
        ...state,
        notification: null,
        status: ASYNC_STATUS.SUCCESS,
        predictedResult: payload,
      };
    case STRESS_PLAN_SUCCESS:
      return {
        ...state,
        notification: null,
        status: ASYNC_STATUS.SUCCESS,
        activityPlan: payload,
      };
    default:
      return state;
  }
};

export default reducer;
