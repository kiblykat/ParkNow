import axios from "axios";

//configure base URL of mock API for use in project
const BASE_URL = "https://park-now-api.vercel.app/";
// const BASE_URL = "http://localhost:4000/";
const parkingAPI = axios.create({ baseURL: BASE_URL });

export default parkingAPI;
