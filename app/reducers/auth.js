import { ASYNC_STATUS } from "@app/constants/async";
import { type AsyncStatusType } from "@app/types/async";
import {
  AUTH_INIT,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  RESET_NOTIFICATION,
  GET_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  GET_COMPLICATIONS_SUCCESS,
} from "@app/actionTypes/auth";
import { GENDER_TYPES } from "@app/constants/auth";

// @flow
export type Action = {
  type: string,
  payload: Object,
};

export type AuthStateType = {
  status: AsyncStatusType,
  notification: null,
  complications: {
    result_foot_ulcer: number,
    result_nephropathy: number,
    result_neuropathy: number,
    result_retinopathy: number,
  },
  user: {
    isUserInitiated: Boolean,
    gender: null | typeof GENDER_TYPES.MALE | typeof GENDER_TYPES.FEMALE,
    risk: null | string,
  },
  userDetails: null | Object,
};

const initialState: AuthStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  complications: {
    result_foot_ulcer: 0.0,
    result_nephropathy: 0.0,
    result_neuropathy: 0.0,
    result_retinopathy: 0.0,
  },
  user: {
    isUserInitiated: false,
    gender: null,
    risk: null,
  },
  userDetails: null,
};

function authInit(state) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function authSuccess(state, { gender, risk }) {
  return {
    ...state,
    status: ASYNC_STATUS.SUCCESS,
    user: {
      isUserInitiated: true,
      gender,
      risk,
    },
  };
}

function authFailure(state, { message }) {
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
  state: AuthStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case AUTH_INIT:
      return authInit(state);
    case AUTH_SUCCESS:
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        user: {
          isUserInitiated: true,
          gender: payload.gender,
          risk: payload.risk,
        },
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        userDetails: payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        user: {
          ...state.user,
          risk: payload,
        },
      };
    case GET_COMPLICATIONS_SUCCESS:
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        complications: payload,
      };
    case AUTH_FAILURE:
      return authFailure(state, payload);
    case RESET_NOTIFICATION:
      return resetNotification(state);
    default:
      return state;
  }
};

export default reducer;
