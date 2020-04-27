import {
  ANALYTICS_INIT,
  RESET_NOTIFICATION,
  ANALYTICS_FAILURE,
  GET_ANALYTICS_SUCCESS,
} from "@app/actionTypes/analytics";
import { navigate, navigateAndReset } from "@app/actions/routes";

export function resetNotification() {
  return {
    type: RESET_NOTIFICATION,
  };
}

export function sendNotification(message) {
  return (dispatch) => {
    dispatch({ type: ANALYTICS_FAILURE, payload: { message } });
  };
}

export function getAnalytics() {
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: ANALYTICS_INIT,
    });

    const analyticsService = serviceManager.get("AnalyticsService");

    analyticsService
      .getAnalytics()
      .then(({ success, data }) => {
        if (success) {
          dispatch({
            type: GET_ANALYTICS_SUCCESS,
            payload: data.analytics,
          });
        } else {
          dispatch({
            type: GET_ANALYTICS_SUCCESS,
            payload: [
              {
                day: "monday",
                calories: 0,
              },
              {
                day: "tuesday",
                calories: 0,
              },
              {
                day: "wednesday",
                calories: 0,
              },
              {
                day: "thursday",
                calories: 0,
              },
              {
                day: "friday",
                calories: 0,
              },
              {
                day: "saturday",
                calories: 0,
              },
              {
                day: "sunday",
                calories: 0,
              },
            ],
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ANALYTICS_FAILURE,
          payload: { message: "Prediction failed!" },
        });
      });
  };
}

export function saveAnalytics(payload) {
  console.log(payload);
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: ANALYTICS_INIT,
    });

    const analyticsService = serviceManager.get("AnalyticsService");

    analyticsService
      .saveAnalytics(payload)
      .then(({ success }) => {
        console.log("output", success);
        dispatch(navigateAndReset("Dashboard"));
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ANALYTICS_FAILURE,
          payload: { message: "Prediction failed!" },
        });
      });
  };
}
