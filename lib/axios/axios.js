const axios = require("axios");
export const API = axios.create({
  baseURL: "https://openaiapi.vercel.app/",
});
