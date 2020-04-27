import { navigateAndReset } from "@app/actions/routes";
import {
  AUTH_INIT,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  RESET_NOTIFICATION,
  GET_USER_SUCCESS,
  UPDATE_USER_SUCCESS,
  GET_COMPLICATIONS_SUCCESS,
} from "@app/actionTypes/auth";
import { AUTH_TOKEN_KEY, GENDER_KEY, RISK_KEY } from "@app/constants/auth";

export function sendNotification(message) {
  return (dispatch) => {
    dispatch({ type: AUTH_FAILURE, payload: { message } });
  };
}

function authSuccess(payload) {
  return {
    type: AUTH_SUCCESS,
    payload,
  };
}

export function getUserData() {
  return (dispatch, getState, serviceManager) => {
    const authService = serviceManager.get("AuthService");

    const {
      auth: { userDetails },
    } = getState();

    if (userDetails === null) {
      dispatch({
        type: AUTH_INIT,
      });

      authService
        .getUserData()
        .then(({ success, data }) => {
          if (success) {
            dispatch({ type: GET_USER_SUCCESS, payload: data });
          } else {
            dispatch({
              type: AUTH_FAILURE,
              payload: { message },
            });
          }
        })
        .catch((error) => {
          console.log(error);
          dispatch({
            type: AUTH_FAILURE,
            payload: { message: "Request failed!" },
          });
        });
    }
  };
}

export function isUserLogged() {
  return (dispatch, getState, serviceManager) => {
    const storageService = serviceManager.get("StorageService");
    storageService
      .getItems([AUTH_TOKEN_KEY, GENDER_KEY, RISK_KEY])
      .then((stores) => {
        const values = {};
        stores.map((result, i, store) => {
          values[store[i][0]] = store[i][1];
        });
        const token = values[AUTH_TOKEN_KEY];
        const gender = values[GENDER_KEY];
        const risk = parseFloat(values[RISK_KEY]);
        if (token && token !== null) {
          dispatch(authSuccess({ gender, risk }));
          serviceManager.get("ApiService").authToken = token;
          dispatch(navigateAndReset("Dashboard"));
        } else {
          dispatch(navigateAndReset("Sign In"));
        }
      });
  };
}

export function userLogin(payload) {
  return (dispatch, getState, serviceManager) => {
    const authService = serviceManager.get("AuthService");
    const storageService = serviceManager.get("StorageService");
    dispatch({
      type: AUTH_INIT,
    });
    authService
      .login(payload)
      .then(({ success, message, token, gender, risk }) => {
        if (success) {
          storageService.saveItems([
            [AUTH_TOKEN_KEY, token.key],
            [GENDER_KEY, gender],
            [RISK_KEY, risk.toString()],
          ]);
          serviceManager.get("ApiService").authToken = token.key;
          dispatch(authSuccess({ gender, risk }));
          dispatch(navigateAndReset("Dashboard"));
        } else {
          dispatch({
            type: AUTH_FAILURE,
            payload: { message },
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: AUTH_FAILURE,
          payload: { message: "Request failed!" },
        });
      });
  };
}

export function userSignUp(payload, riskPayload) {
  return (dispatch, getState, serviceManager) => {
    const authService = serviceManager.get("AuthService");
    const storageService = serviceManager.get("StorageService");
    dispatch({
      type: AUTH_INIT,
    });
    authService
      .predictRisk(riskPayload)
      .then(({ data }) => {
        let risk =
          data && data.results && data.results.length > 0
            ? data.results[0].result * 100 > 100.0
              ? 100.0
              : data.results[0].result * 100
            : 10.45;

        authService
          .register({ ...payload, risk })
          .then(({ success, message, token, gender, risk }) => {
            if (success) {
              storageService.saveItems([
                [AUTH_TOKEN_KEY, token.key],
                [GENDER_KEY, gender],
              ]);
              serviceManager.get("ApiService").authToken = token.key;
              dispatch(authSuccess({ gender, risk }));
              dispatch(navigateAndReset("Sign In"));
            } else {
              dispatch({
                type: AUTH_FAILURE,
                payload: { message },
              });
            }
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: AUTH_FAILURE,
              payload: { message: "Request failed" },
            });
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: AUTH_FAILURE,
          payload: { message: "Prediction failed" },
        });
      });
  };
}

export function updateUser(payload, riskPayload) {
  return (dispatch, getState, serviceManager) => {
    const authService = serviceManager.get("AuthService");
    dispatch({
      type: AUTH_INIT,
    });

    authService
      .predictRisk(riskPayload)
      .then(({ data }) => {
        let risk =
          data && data.results && data.results.length > 0
            ? data.results[0].result * 100
            : 10.45;

        authService
          .updateUser({ ...payload, risk })
          .then(({ success, data: { risk } }) => {
            if (success) {
              dispatch({ type: UPDATE_USER_SUCCESS, payload: risk });
              dispatch(navigateAndReset("Dashboard"));
            } else {
              dispatch({
                type: AUTH_FAILURE,
                payload: { message },
              });
            }
          })
          .catch((error) => {
            console.log(error);
            dispatch({
              type: AUTH_FAILURE,
              payload: { message: "Request failed" },
            });
          });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: AUTH_FAILURE,
          payload: { message: "Prediction failed" },
        });
      });
  };
}

export function userLogout() {
  return (dispatch, getState, serviceManager) => {
    const storageService = serviceManager.get("StorageService");
    storageService.deleteItem(AUTH_TOKEN_KEY).then((token) => {
      dispatch(navigateAndReset("Sign In"));
    });
  };
}

export function resetNotification() {
  return {
    type: RESET_NOTIFICATION,
  };
}

export function getComplications(payload) {
  return (dispatch, getState, serviceManager) => {
    const authService = serviceManager.get("AuthService");
    dispatch({
      type: AUTH_INIT,
    });

    authService
      .predictComplications(payload)
      .then(({ data }) => {
        if (data && data.results && data.results.length > 0) {
          dispatch({
            type: GET_COMPLICATIONS_SUCCESS,
            payload: data.results[0],
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: AUTH_FAILURE,
          payload: { message: "Prediction failed" },
        });
      });
  };
}
