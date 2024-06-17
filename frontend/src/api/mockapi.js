import axios from "axios";

//configure base URL of mock API for use in project
const BASE_URL = "https://6597b34f668d248edf233795.mockapi.io/";
const mockAPI = axios.create({ baseURL: BASE_URL });

export default mockAPI;
