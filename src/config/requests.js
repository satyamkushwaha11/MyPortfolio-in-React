import Axios from "axios";
import * as config from "./config";
import { getLocalStorage } from "./sessions";

// const LANG = getLocalStorage("lang");
const getUrl = (endpoint) => {
  return config.API_HOST + endpoint;
};

/**
 * @description POST method to call post api (without token)
 * @author Satyam_kushwaha
 * @date 2023-08-17
 * @param endpoint endpoint for api
 * @param data payload data
 */
export const Post = async (endpoint, data) => {
  return Axios.post(getUrl(endpoint),{...data },{
      headers: {
        "Content-Type": "application/json",
        // 'language': LANG || 'en'
      },
    }
  );
};

/**
 * @description GET method to call Get api (without token)
 * @author Satyam_kushwaha
 * @date 2023-08-17
 * @param endpoint endpoint for api
 */
export const Get = async (endpoint) => {
  return Axios.get(getUrl(endpoint), {
    headers: {
      "Content-Type": "application/json",
      // 'language': LANG || 'en'
    },
  });
};

/**
 * @description PUT method to call Put api (without token)
 * @author Satyam_kushwaha
 * @date 2023-08-17
 * @param endpoint endpoint for api
 * @param data payload data
 */
export const Put = async (endpoint, data) => {
  return Axios.put(getUrl(endpoint),{ ...data },{
      headers: {
        "Content-Type": "application/json",
        // 'language': LANG || 'en'
      },
    }
  );
};

/**
 * @description PATCH method to call Patch api (without token)
 * @author Satyam_kushwaha
 * @date 2023-08-17
 * @param endpoint endpoint for api
 * @param data payload data
 */
export const Patch = async (endpoint, data) => {
  return Axios.patch(getUrl(endpoint),{ ...data },{
      headers: {
        "Content-Type": "application/json",
        // 'language': LANG || 'en'
      },
    }
  );
};

/**
 * @description DELETE method to call Delete api (without token)
 * @author Satyam_kushwaha
 * @date 2023-08-17
 * @param endpoint endpoint for api
 * @param data payload data
 */
export const Delete = async (endpoint, data) => {
  return Axios.delete(getUrl(endpoint),{
      headers: {
        "Content-Type": "application/json",
        // 'language': LANG || 'en'
        data
      },
    }
  );
};

// -------------with token----------------------

/**
 * @description POST method to call post api (with token)
 * @author Satyam_kushwaha
 * @date 2023-08-17
 * @param endpoint endpoint for api
 * @param data payload data
 */
export const PostWithToken = async (endpoint, data) => {
  Axios.defaults.headers.common["authorization"] = await getLocalStorage(
    "token"
  );
  return Axios.post(getUrl(endpoint),{ ...data },
    {
      headers: {
        "Content-Type": "application/json",
        // 'language': LANG || 'en'
      },
    }
  );
};

/**
 * @description GET method to call Get api (with token)
 * @author Satyam_kushwaha
 * @date 2023-08-17
 * @param endpoint endpoint for api
 */
export const GetWithToken = async (endpoint) => {
  Axios.defaults.headers.common["authorization"] = await getLocalStorage(
    "token"
  );
  return Axios.get(getUrl(endpoint),{
      headers: {
        "Content-Type": "application/json",
        // 'language': LANG || 'en'
      },
    }
  );
};

/**
 * @description PUT method to call Put api (with token)
 * @author Satyam_kushwaha
 * @date 2023-08-17
 * @param endpoint endpoint for api
 * @param data payload data
 */
export const PutWithToken = async (endpoint, data) => {
  Axios.defaults.headers.common["authorization"] = await getLocalStorage(
    "token"
  );
  return Axios.post(getUrl(endpoint),{ ...data },{
      headers: {
        "Content-Type": "application/json",
        // 'language': LANG || 'en'
      },
    }
  );
};

/**
 * @description PATCH method to call Patch api (with token)
 * @author Satyam_kushwaha
 * @date 2023-08-17
 * @param endpoint endpoint for api
 * @param data payload data
 */
export const PatchWithToken = async (endpoint, data) => {
  Axios.defaults.headers.common["authorization"] = await getLocalStorage(
    "token"
  );
  return Axios.patch(
    getUrl(endpoint),
    { ...data },
    {
      headers: {
        "Content-Type": "application/json",
        // 'language': LANG || 'en'
      },
    }
  );
};

/**
 * @description Delete method to call Delete api (with token)
 * @author Satyam_kushwaha
 * @date 2023-08-17
 * @param endpoint endpoint for api
 * @param data payload data
 */
export const DeleteWithToken = async (endpoint, data) => {
  Axios.defaults.headers.common["authorization"] = await getLocalStorage(
    "token"
  );
  return Axios.delete(getUrl(endpoint), {
    headers: {
      "Content-Type": "application/json",
      // 'language': LANG || 'en'
      data,
    },
  });
};

//   -----------------------------------------------------

Axios.interceptors.request.use(
  (request) => {
    request.headers["Content-Type"] = "application/json";
    // request.headers['language'] = LANG || 'en'
    return request;
  },
  function (error) {
    return Promise.reject(error);
  },
  { synchronous: true }
);

Axios.interceptors.response.use(
  (response) => {
    // console.log('response', response)
    return Promise.resolve(response);
  },
  function (error) {
    if (!error || !error.response) {
      return Promise.reject(error);
    }
    if (error?.response?.status === 401) {
      alert("authentication Fail");
      // return (window.location.href = "/");
    }
    return Promise.reject(error);
  }
);
