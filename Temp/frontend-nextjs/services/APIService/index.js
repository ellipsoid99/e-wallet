import axios from "axios";
import Router from "next/router";
const baseURL = process.env.NEXT_PUBLIC_API_URL;
let accessToken = null;

let httpOptions = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "X-Language": "en",
};
/*
@type endpoint:string as '/user'
@type token:string as 'string'
**/
const getAPI = async (endpoint, token) => {
  if (token && token.length > 0) {
    httpOptions.Authorization = `Bearer ${token}`;
    try {
      const URL = `${baseURL}${endpoint}`;
      const response = await axios.get(URL, { headers: httpOptions });
      if (response?.data?.context_code === 1000 && response?.data?.data) {
        return response;
      }
      return response;
    } catch (error) {
      throw error;
    }
  }
};

/*
@type endpoint:string as '/user'
@type token:string as 'string'
@type data:object as {'name':'John Doe', 'password': 'John@123'}
**/
const postAPI = async (endpoint, token, data, tokenRequired = true) => {
  if (data !== null) {
    if (!tokenRequired) {
      delete httpOptions["Authorization"];
    }
    if (tokenRequired && token && token.length > 0) {
      httpOptions.Authorization = `Bearer ${token}`;
    }
    try {
      const URL = `${baseURL}${endpoint}`;
      const response = await axios.post(URL, data, {
        headers: httpOptions,
      });
      if (response?.data?.context_code === 1000 && response?.data?.data) {
        return response;
      }
    } catch (error) {
      console.error("postAPI error", error);
      throw error;
    }
  }
};

export { getAPI, postAPI };
