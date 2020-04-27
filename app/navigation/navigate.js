import { serviceManager } from "@app/services/manager";
const NavigationService = serviceManager.get("NavigationService");

export const navigate = (routeName, params = {}) => {
  NavigationService.navigate(routeName, params);
};
export const navigateAndReset = (routeName, params = {}) => {
  NavigationService.navigateAndReset(routeName, params);
};
