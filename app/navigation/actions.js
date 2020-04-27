import { NavigationActions, NavigationNavigateAction } from "react-navigation";
import { KEY_NAVIGATION_ROOT } from "./constants";

export const navigateAction = (route) => {
  return NavigationActions.navigate({
    key: KEY_NAVIGATION_ROOT,
    routeName: route,
  });
};
