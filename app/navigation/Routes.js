import React from "react";
import { createAppContainer, createBottomTabNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { enableScreens } from "react-native-screens";

import HomeScreen from "@app/containers/layouts/home";
import SplashScreen from "@app/containers/layouts/splash";
import { SignIn, SignUp } from "@app/containers/layouts/auth";

import DietPlanScreen from "@app/containers/layouts/dietBalancer";
import StressPlanScreen from "@app/containers/layouts/moodFixer";
import ActivityDisplayScreen from "@app/containers/layouts/moodFixer/screens/displayPlan";
import ActivityQuestionScreen from "@app/containers/layouts/moodFixer/screens/activityPlan";
import RiskCalculatorScreen from "@app/containers/layouts/riskCalculator";
import ComplicationCalculateScreen from "@app/containers/layouts/complicationCalculator";

import ExerciseWarningScreen from "@app/containers/layouts/fitnessChecker";
import ExerciseTestScreen from "@app/containers/layouts/fitnessChecker/screens/exerciseTest";
import LegsFitnessTestScreen from "@app/containers/layouts/fitnessChecker/screens/legsFitnessTest";
import MuscularFitnessTestScreen from "@app/containers/layouts/fitnessChecker/screens/muscularFitnessTest";
import AerobicFitnessTestScreen from "@app/containers/layouts/fitnessChecker/screens/aerobicFitnessTest";
import MyWorkoutsScreen from "@app/containers/layouts/fitnessChecker/screens/myWorkouts";
import AbsWorkoutsScreen from "@app/containers/layouts/fitnessChecker/screens/myWorkouts/absWorkouts";
import ArmsWorkoutsScreen from "@app/containers/layouts/fitnessChecker/screens/myWorkouts/armsWorkouts";
import LegsWorkoutsScreen from "@app/containers/layouts/fitnessChecker/screens/myWorkouts/legsWorkouts";
import AnalyticScreen from "@app/containers/layouts/fitnessChecker/screens/analytics";

import { ArrowBackIcon } from "@app/assets/icons";
import { TopNavigationBar } from "./components/topNavigationBar";

import { getCurrentRouteState, isRootRoute } from "./util";
import { KEY_NAVIGATION_BACK } from "./constants";

const MenuTopNavigationParams = {
  header: (props) => {
    const { routeName } = getCurrentRouteState(props.navigation);
    return (
      <TopNavigationBar
        {...props}
        backIcon={!isRootRoute(routeName) && ArrowBackIcon}
        title={routeName}
        onBackPress={() => {
          props.navigation.goBack(KEY_NAVIGATION_BACK);
        }}
      />
    );
  },
};

const AuthNavigationMap = {
  ["Sign In"]: SignIn,
  ["Sign Up"]: SignUp,
};

const DietPlanNavigationMap = createStackNavigator(
  {
    ["Diet Plan"]: DietPlanScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const StressPlanNavigationMap = createStackNavigator(
  {
    ["Stress Plan"]: StressPlanScreen,
    ["Activity Question"]: ActivityQuestionScreen,
    ["Activity Display"]: ActivityDisplayScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const RiskCalculatorNavigationMap = createStackNavigator(
  {
    ["Risk Calculator"]: RiskCalculatorScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const ComplicationNavigationMap = createStackNavigator(
  {
    ["Complication Calculator"]: ComplicationCalculateScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const ExerciseNavigationMap = createStackNavigator(
  {
    ["Exercise Warning"]: ExerciseWarningScreen,
    ["Exercise Test"]: ExerciseTestScreen,
    ["Legs Fitness"]: LegsFitnessTestScreen,
    ["Muscular Fitness"]: MuscularFitnessTestScreen,
    ["Aerobic Fitness"]: AerobicFitnessTestScreen,
    ["Analytics"]: AnalyticScreen,
    ["My Workout Plan"]: MyWorkoutsScreen,
    ["Abs Workouts"]: AbsWorkoutsScreen,
    ["Arms Workouts"]: ArmsWorkoutsScreen,
    ["Legs Workouts"]: LegsWorkoutsScreen,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const DashboardNavigationMap = createStackNavigator(
  {
    ["Home"]: HomeScreen,
    ["Diet Plan"]: DietPlanNavigationMap,
    ["Risk Calculate"]: RiskCalculatorNavigationMap,
    ["Complication Calculate"]: ComplicationNavigationMap,
    ["Stress Plan"]: StressPlanNavigationMap,
    ["Exercise Warning"]: ExerciseNavigationMap,
  },
  {
    defaultNavigationOptions: MenuTopNavigationParams,
  }
);

const Routes = createStackNavigator(
  {
    ["Splash"]: SplashScreen,
    Dashboard: DashboardNavigationMap,
    ...AuthNavigationMap,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

const createAppRouter = (container) => {
  enableScreens();
  return createAppContainer(container);
};

export default createAppRouter(Routes);
