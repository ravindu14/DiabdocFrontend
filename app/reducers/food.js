import { ASYNC_STATUS } from "@app/constants/async";
import { type AsyncStatusType } from "@app/types/async";

import {
  FOOD_INIT,
  FOOD_INITIATE,
  PREDICT_FOOD_SUCCESS,
  FOOD_FAILURE,
  RESET_NOTIFICATION,
  MEAL_PLAN_SUCCESS,
} from "@app/actionTypes/food";

// @flow
export type Action = {
  type: string,
  payload: Object,
};

export type FoodStateType = {
  status: AsyncStatusType,
  notification: null,
  predictedResult: string | null,
  mealPlan: number | null,
};

const initialState: FoodStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  predictedResult: null,
  mealPlan: null,
};

function foodInit(state) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function foodFailure(state, { message }) {
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
  state: FoodStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case FOOD_INIT:
      return foodInit(state);
    case FOOD_FAILURE:
      return foodFailure(state, payload);
    case RESET_NOTIFICATION:
      return resetNotification(state);
    case FOOD_INITIATE:
      return {
        ...state,
        notification: null,
        status: ASYNC_STATUS.INIT,
        predictedResult: null,
      };
    case PREDICT_FOOD_SUCCESS:
      return {
        ...state,
        notification: null,
        status: ASYNC_STATUS.SUCCESS,
        predictedResult: payload,
      };
    case MEAL_PLAN_SUCCESS:
      return {
        ...state,
        notification: null,
        status: ASYNC_STATUS.SUCCESS,
        mealPlan: payload,
      };
    default:
      return state;
  }
};

export default reducer;
