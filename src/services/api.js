import axios from "axios";

const apiUrl = "https://jsonplaceholder.typicode.com/posts";

export const getEvents = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};
