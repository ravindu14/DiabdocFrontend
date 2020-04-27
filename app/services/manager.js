import {
  registerGlobalServices,
  serviceManager,
} from "../helpers/services/manager";
import NavigationService from "./NavigationService";
import StorageService from "./StorageService";
import AuthService from "./AuthService";
import FoodService from "./FoodService";
import StressService from "./StressService";
import ExerciseService from "./ExerciseService";
import AnalyticsService from "./AnalyticService";

export const registerServices = (options) => {
  registerGlobalServices(options);

  serviceManager.register("NavigationService", () => {
    return new NavigationService();
  });

  serviceManager.register("StorageService", () => {
    return new StorageService();
  });

  serviceManager.register("AuthService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new AuthService(api);
  });

  serviceManager.register("FoodService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new FoodService(api);
  });

  serviceManager.register("StressService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new StressService(api);
  });

  serviceManager.register("ExerciseService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new ExerciseService(api);
  });

  serviceManager.register("AnalyticsService", (serviceManager) => {
    let api = serviceManager.get("ApiService");
    return new AnalyticsService(api);
  });
};

export { serviceManager };
