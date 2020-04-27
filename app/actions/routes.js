export const navigate = (routeName, params = {}) => {
  return (dispatch, getState, serviceManager) => {
    const NavigationService = serviceManager.get("NavigationService");
    NavigationService.navigate(routeName, params);
  };
};
export const navigateAndReset = (routeName, params = {}) => {
  return (dispatch, getState, serviceManager) => {
    const NavigationService = serviceManager.get("NavigationService");
    NavigationService.navigateAndReset(routeName, params);
  };
};
