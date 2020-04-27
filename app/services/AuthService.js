import type { ApiServiceInterface } from "@app/helpers/services/ApiServiceInterface";
import axios from "axios";

class AuthService {
  api: ApiServiceInterface;

  endpoint: string = "/auth";
  pythonApiRisk: string = "http://tdasun94.pythonanywhere.com/diabetic_risk";
  pythonComplication: string =
    "http://tdasun94.pythonanywhere.com/diabetic_complications";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  login(payload: Object) {
    return this.api.post(`${this.endpoint}/login`, payload);
  }

  register(payload: Object) {
    return this.api.post(`${this.endpoint}/register`, payload);
  }

  getUserData() {
    return this.api.get(`${this.endpoint}/userData`);
  }

  updateUser(payload: Object) {
    return this.api.put(`${this.endpoint}/profile`, payload);
  }

  predictRisk(payload: Object) {
    return axios.post(this.pythonApiRisk, payload);
  }

  predictComplications(payload: Object) {
    return axios.post(this.pythonComplication, payload);
  }
}

export default AuthService;
