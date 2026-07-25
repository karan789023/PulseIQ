import axios from "axios";

const API = axios.create({
  baseURL: "https://pulseiq-1-7to7.onrender.com/api",
});

export const analyzeWebsite = async (url) => {
  const { data } = await API.post("/analyze", {
    url,
  });

  return data;
};