import type { ApiServiceInterface } from "@app/helpers/services/ApiServiceInterface";
import axios from "axios";

class ExerciseService {
  api: ApiServiceInterface;

  endpoint: string = "/exercises";
  pythonApiExLeg: string = "http://tdasun94.pythonanywhere.com/getlegsshedule";
  pythonApiExArm: string = "http://tdasun94.pythonanywhere.com/getarmsshedule";
  pythonApiExAbs: string = "http://tdasun94.pythonanywhere.com/getabsshedule";

  constructor(apiService: ApiServiceInterface) {
    this.api = apiService;
  }

  getLegsExercises(payload) {
    return axios.post(this.pythonApiExLeg, payload);
  }

  getArmsExercises(payload) {
    return axios.post(this.pythonApiExArm, payload);
  }

  getAbsExercises(payload) {
    return axios.post(this.pythonApiExAbs, payload);
  }

  getApiExercises() {
    return this.api.get(this.endpoint);
  }

  saveExercisesToApi(payload) {
    return this.api.post(`${this.endpoint}/save`, payload);
  }
}

export default ExerciseService;
