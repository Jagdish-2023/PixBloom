import axios from "axios";
export const backendUrl = "https://pix-bloom-be.vercel.app";

const fetchApi = async (
  method,
  endPoint,
  dataToUpdate = null,
  headers = null
) => {
  const url = `${backendUrl}${endPoint}`;

  try {
    let response;
    if (method === "GET") {
      response = await axios.get(url, { withCredentials: true });
    }

    if (method === "POST") {
      response = await axios.post(url, dataToUpdate, {
        withCredentials: true,
        headers: headers || undefined,
      });
    }

    if (method === "DELETE") {
      response = await axios.delete(url, { withCredentials: true });
    }

    return response.data;
  } catch (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      window.location.href = "/login";
      return;
    }

    throw new Error(error.response?.data || "Something went wrong");
  }
};

export default fetchApi;
