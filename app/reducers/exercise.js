import { ASYNC_STATUS } from "@app/constants/async";
import { type AsyncStatusType } from "@app/types/async";

import {
  EXERCISE_INIT,
  RESET_NOTIFICATION,
  EXERCISE_INITIATE,
  GET_EXERCISES_SUCCESS,
  GET_EXERCISES_FAIL,
  EXERCISE_FAILURE,
  GET_LEG_EXERCISES_SUCCESS,
  GET_ARM_EXERCISES_SUCCESS,
  GET_ABS_EXERCISES_SUCCESS,
  GET_API_EXERCISES_SUCCESS,
  GET_API_EXERCISES_FAILURE,
  SAVE_API_EXERCISES_SUCCESS,
  GET_ANALYTICS_SUCCESS,
} from "@app/actionTypes/exercise";

// @flow
export type Action = {
  type: string,
  payload: Object,
};

export type ExerciseStateType = {
  status: AsyncStatusType,
  notification: null,
  exercises: Object,
  analytics: Array<any>,
};

const initialState: ExerciseStateType = {
  status: ASYNC_STATUS.INIT,
  notification: null,
  exercises: {},
  analytics: [],
};

function getLegsExercises(state, payload) {
  let exercises = state.exercises;

  exercises.legExercises = payload;

  return {
    ...state,
    status: ASYNC_STATUS.SUCCESS,
    exercises,
  };
}

function getArmsExercises(state, payload) {
  let exercises = state.exercises;

  exercises.armExercises = payload;

  return {
    ...state,
    status: ASYNC_STATUS.SUCCESS,
    exercises,
  };
}

function getAbsExercises(state, payload) {
  let exercises = state.exercises;

  exercises.absExercises = payload;

  return {
    ...state,
    status: ASYNC_STATUS.SUCCESS,
    exercises,
  };
}

function exerciseInit(state) {
  return {
    ...state,
    status: ASYNC_STATUS.LOADING,
    notification: null,
  };
}

function exerciseFailure(state, { message }) {
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
  state: ExerciseStateType = initialState,
  { type, payload = {} }: Action
) => {
  switch (type) {
    case EXERCISE_INIT:
      return exerciseInit(state);
    case EXERCISE_FAILURE:
      return exerciseFailure(state, payload);
    case RESET_NOTIFICATION:
      return resetNotification(state);
    case EXERCISE_INITIATE:
      return {
        ...state,
        notification: null,
        status: ASYNC_STATUS.INIT,
      };
    case GET_LEG_EXERCISES_SUCCESS:
      return getLegsExercises(state, payload);
    case GET_ARM_EXERCISES_SUCCESS:
      return getArmsExercises(state, payload);
    case GET_ABS_EXERCISES_SUCCESS:
      return getAbsExercises(state, payload);
    case GET_API_EXERCISES_SUCCESS:
      return {
        ...state,
        notification: null,
        status: ASYNC_STATUS.SUCCESS,
        exercises: payload,
      };
    case SAVE_API_EXERCISES_SUCCESS:
      return {
        ...state,
        notification: null,
        status: ASYNC_STATUS.SUCCESS,
      };
    case GET_API_EXERCISES_FAILURE:
      return {
        ...state,
        notification: null,
        status: ASYNC_STATUS.FAILURE,
        exercises: {},
      };
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
