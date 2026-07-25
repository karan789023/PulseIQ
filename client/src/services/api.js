import axios from "axios";

const API = axios.create({
  baseURL: "https://pulseiq-1-7to7.onrender.com/",
});

export const analyzeWebsite = async (url) => {
  try {
    const { data } = await API.post("/analyze", { url });
    return data;
  } catch (error) {
    throw error;
  }
};