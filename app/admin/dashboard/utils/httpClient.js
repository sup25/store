import axios from "axios";

export const getRequest = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
export const putRequest = async (url) => {
  const response = await axios.put(url);
  return response.data;
};

export const deleteRequest = async (url) => {
  const response = await axios.delete(url);
  return response.data;
};
