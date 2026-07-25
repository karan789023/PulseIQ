import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const analyzeWebsite = async (url) => {
  try {
    const { data } = await API.post("/analyze", { url });
    return data;
  } catch (error) {
    throw error;
  }
};