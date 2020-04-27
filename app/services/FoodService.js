import type { ApiServiceInterface } from "@app/helpers/services/ApiServiceInterface";
import axios from "axios";

class FoodService {
  api: ApiServiceInterface;

  endpoint: string = "/auth";
  pythonApiFood: string = "http://tdasun94.pythonanywhere.com/food";
  pythonApiMealPlan: string = "http://tdasun94.pythonanywhere.com/meal_plan";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getScannedFood(payload) {
    return axios.post(this.pythonApiFood, payload);
  }

  getMealPlan(payload) {
    return axios.post(this.pythonApiMealPlan, payload);
  }
}

export default FoodService;
