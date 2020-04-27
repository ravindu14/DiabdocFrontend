import { combineReducers } from "redux";

import auth, { type AuthStateType } from "./auth";
import food, { type FoodStateType } from "./food";
import stress, { type StressStateType } from "./stress";
import exercise, { type ExerciseStateType } from "./exercise";
import analytics, { type AnalyticsStateType } from "./analytics";

export type ApplicationState = {
  auth: AuthStateType,
  food: FoodStateType,
  stress: StressStateType,
  exercise: ExerciseStateType,
  analytics: AnalyticsStateType,
};

export default () =>
  combineReducers({ auth, food, stress, exercise, analytics });
