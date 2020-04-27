import type { ApiServiceInterface } from "@app/helpers/services/ApiServiceInterface";
import axios from "axios";

class AnalyticsService {
  api: ApiServiceInterface;

  endpoint: string = "/analytics";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getAnalytics() {
    return this.api.get(this.endpoint);
  }

  saveAnalytics(payload: Object) {
    return this.api.post(`${this.endpoint}/save`, payload);
  }
}

export default AnalyticsService;
