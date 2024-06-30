import axios from "axios";

//configure base URL of mock API for use in project
const BASE_URL = "https://park-now-api.vercel.app/";
const mockAPI = axios.create({ baseURL: BASE_URL });

export default mockAPI;
