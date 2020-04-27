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
import { navigate } from "@app/actions/routes";

export function resetNotification() {
  return {
    type: RESET_NOTIFICATION,
  };
}

export function sendNotification(message) {
  return (dispatch) => {
    dispatch({ type: EXERCISE_FAILURE, payload: { message } });
  };
}

export function initiateExercise() {
  return (dispatch) => {
    dispatch({ type: EXERCISE_INITIATE });
  };
}

export function getLegsExercises(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: EXERCISE_INIT,
    });

    const exerciseService = serviceManager.get("ExerciseService");

    exerciseService
      .getLegsExercises(payload)
      .then(({ data }) => {
        if (data && data.results) {
          dispatch({
            type: GET_LEG_EXERCISES_SUCCESS,
            payload: data.results,
          });
        } else {
          dispatch({
            type: EXERCISE_FAILURE,
            payload: { message: "Prediction failed!" },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: EXERCISE_FAILURE,
          payload: { message: "Prediction failed!" },
        });
      });
  };
}

export function getArmsExercises(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: EXERCISE_INIT,
    });

    const exerciseService = serviceManager.get("ExerciseService");

    exerciseService
      .getArmsExercises(payload)
      .then(({ data }) => {
        if (data && data.results) {
          dispatch({
            type: GET_ARM_EXERCISES_SUCCESS,
            payload: data.results,
          });
        } else {
          dispatch({
            type: EXERCISE_FAILURE,
            payload: { message: "Prediction failed!" },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: EXERCISE_FAILURE,
          payload: { message: "Prediction failed!" },
        });
      });
  };
}

export function getAbsExercises(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: EXERCISE_INIT,
    });

    const exerciseService = serviceManager.get("ExerciseService");

    exerciseService
      .getAbsExercises(payload)
      .then(({ data }) => {
        if (data && data.results) {
          dispatch({
            type: GET_ABS_EXERCISES_SUCCESS,
            payload: data.results,
          });
        } else {
          dispatch({
            type: EXERCISE_FAILURE,
            payload: { message: "Prediction failed!" },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: EXERCISE_FAILURE,
          payload: { message: "Prediction failed!" },
        });
      });
  };
}

export function getApiExercises() {
  return (dispatch, getState, serviceManager) => {
    const {
      exercise: { exercises },
    } = getState();

    if (
      !(
        exercises.legExercises &&
        exercises.armExercises &&
        exercises.absExercises
      )
    ) {
      dispatch({
        type: EXERCISE_INIT,
      });

      const exerciseService = serviceManager.get("ExerciseService");

      exerciseService
        .getApiExercises()
        .then(({ success, data }) => {
          if (success) {
            dispatch({
              type: GET_API_EXERCISES_SUCCESS,
              payload: data.exercises,
            });
          } else {
            dispatch({
              type: GET_API_EXERCISES_FAILURE,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: GET_API_EXERCISES_FAILURE,
          });
        });
    }
  };
}

export function saveExercisesToApi(payload) {
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: EXERCISE_INIT,
    });

    const exerciseService = serviceManager.get("ExerciseService");

    exerciseService
      .saveExercisesToApi(payload)
      .then(() => {
        dispatch({ type: SAVE_API_EXERCISES_SUCCESS });
        dispatch(navigate("My Workout Plan"));
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: EXERCISE_FAILURE,
          payload: { message: "Prediction failed!" },
        });
        dispatch({
          type: GET_API_EXERCISES_FAILURE,
        });
      });
  };
}

export function getAnalytics() {
  return (dispatch, getState, serviceManager) => {
    dispatch({
      type: EXERCISE_INIT,
    });

    const exerciseService = serviceManager.get("ExerciseService");

    exerciseService
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
          type: EXERCISE_FAILURE,
          payload: { message: "Prediction failed!" },
        });
      });
  };
}
