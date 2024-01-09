import axios from "axios";

export const $http = axios.create({
    headers: {
      "Access-Control-Allow-Origin": import.meta.env.VITE_APP_URL,
    },
    baseURL: "https://jsonplaceholder.typicode.com/",
});