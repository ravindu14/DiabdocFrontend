import {
  FOOD_INIT,
  FOOD_INITIATE,
  PREDICT_FOOD_SUCCESS,
  FOOD_FAILURE,
  RESET_NOTIFICATION,
  MEAL_PLAN_SUCCESS,
} from "@app/actionTypes/food";

export function resetNotification() {
  return {
    type: RESET_NOTIFICATION,
  };
}

export function sendNotification(message) {
  return (dispatch) => {
    dispatch({ type: FOOD_FAILURE, payload: { message } });
  };
}

export function initiateFood() {
  return (dispatch) => {
    dispatch({ type: FOOD_INITIATE });
  };
}

export function getScannedFood(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: FOOD_INIT,
    });

    const foodService = serviceManager.get("FoodService");

    foodService
      .getScannedFood(payload)
      .then(({ data }) => {
        if (
          data &&
          data.results &&
          data.results.length > 0 &&
          data.results[0].predictedResult
        ) {
          dispatch({
            type: PREDICT_FOOD_SUCCESS,
            payload: data.results[0].predictedResult,
          });
        } else {
          dispatch({
            type: FOOD_FAILURE,
            payload: { message: "Prediction failed!" },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: FOOD_FAILURE,
          payload: { message: "Prediction failed!" },
        });
      });
  };
}

export function getMealPlan(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: FOOD_INIT,
    });

    const foodService = serviceManager.get("FoodService");

    foodService
      .getMealPlan(payload)
      .then(({ data }) => {
        if (
          data &&
          data.results &&
          data.results.length > 0 &&
          data.results[0].result
        ) {
          dispatch({
            type: MEAL_PLAN_SUCCESS,
            payload: data.results[0].result,
          });
        } else {
          dispatch({
            type: FOOD_FAILURE,
            payload: { message: "Prediction failed!" },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: FOOD_FAILURE,
          payload: { message: "Prediction failed!" },
        });
      });
  };
}
