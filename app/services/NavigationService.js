import { NavigationActions, StackActions } from "react-navigation";

// @flow
import type { ApiServiceInterface } from "../helpers/services/ApiServiceInterface";

export class NavigationService {
  constructor() {}

  navigator;

  /**
   * This is called when the RootScreen is created to set the navigator instance to use.
   */
  setTopLevelNavigator(navigatorRef) {
    this.navigator = navigatorRef;
  }

  /**
   * Navigate to a route.
   *
   * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
   * @param params Route parameters.
   */
  navigate(routeName, params) {
    this.navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      })
    );
  }

  /**
   * Navigate AND reset the navigation history.
   * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
   * @param params Route parameters.
   */
  navigateAndReset(routeName, params) {
    this.navigator.dispatch(
      StackActions.reset({
        index: 0,
        key: null,
        actions: [
          NavigationActions.navigate({
            routeName,
            params,
          }),
        ],
      })
    );
  }
}

export default NavigationService;
