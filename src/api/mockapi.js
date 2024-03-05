import axios from "axios";

const BASE_URL = "https://6597b34f668d248edf233795.mockapi.io/";
const mockAPI = axios.create({ baseURL: BASE_URL });

export default mockAPI;
