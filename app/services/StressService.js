import type { ApiServiceInterface } from "@app/helpers/services/ApiServiceInterface";
import axios from "axios";

class StressService {
  api: ApiServiceInterface;

  endpoint: string = "/auth";
  pythonApiMood: string = "http://tdasun94.pythonanywhere.com/stress";
  pythonApiActivity: string =
    "http://tdasun94.pythonanywhere.com/activity_suggestion";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getScannedMood(payload) {
    return axios.post(this.pythonApiMood, payload);
  }

  getActivityPlan(payload) {
    return axios.post(this.pythonApiActivity, payload);
  }
}

export default StressService;
