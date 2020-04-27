import {
  STRESS_INIT,
  STRESS_INITIATE,
  PREDICT_STRESS_SUCCESS,
  STRESS_FAILURE,
  RESET_NOTIFICATION,
  STRESS_PLAN_SUCCESS,
} from "@app/actionTypes/stress";
import { navigate } from "@app/actions/routes";

export function resetNotification() {
  return {
    type: RESET_NOTIFICATION,
  };
}

export function sendNotification(message) {
  return (dispatch) => {
    dispatch({ type: STRESS_FAILURE, payload: { message } });
  };
}

export function initiateStress() {
  return (dispatch) => {
    dispatch({ type: STRESS_INITIATE });
  };
}

export function getScannedMood(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: STRESS_INIT,
    });

    const stressService = serviceManager.get("StressService");

    stressService
      .getScannedMood(payload)
      .then(({ data }) => {
        if (
          data &&
          data.results &&
          data.results.length > 0 &&
          data.results[0].predictedResult
        ) {
          dispatch({
            type: PREDICT_STRESS_SUCCESS,
            payload: data.results[0].predictedResult,
          });
        } else {
          dispatch({
            type: STRESS_FAILURE,
            payload: { message: "Prediction failed!" },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: STRESS_FAILURE,
          payload: { message: "Prediction failed!" },
        });
      });
  };
}

export function getActivityPlan(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: STRESS_INIT,
    });

    const stressService = serviceManager.get("StressService");

    stressService
      .getActivityPlan(payload)
      .then(({ data }) => {
        if (
          data &&
          data.results &&
          data.results.length > 0 &&
          data.results[0].result
        ) {
          dispatch({
            type: STRESS_PLAN_SUCCESS,
            payload: data.results[0].result,
          });
          dispatch(navigate("Activity Display"));
        } else {
          dispatch({
            type: STRESS_FAILURE,
            payload: { message: "Prediction failed!" },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: STRESS_FAILURE,
          payload: { message: "Prediction failed!" },
        });
      });
  };
}
