import axios from "axios";

const baseUrl = "https://itunes.apple.com"; // should moved to .env for a scalable app

const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export { api };
