import axios from "axios";

export const getRequest = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const deleteRequest = async (url) => {
  const response = await axios.delete(url);
  return response.data;
};
