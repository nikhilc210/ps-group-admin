import axios from "axios";
import { MAIN_URL, UPLOAD_API_LINK } from "../Connection/Index";

const psApiCalling = (params) => {
  return fetch(`${MAIN_URL}`, {
    method: "POST",
    body: JSON.stringify(params),
    mode: "cors",
    headers: {
      "Content-type": "application/json;charset=utf-8",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return {
        status: "error",
        message: "API_ERROR " + error,
      };
    });
};

const uploadImage = (params) => {
  let res = axios({
    method: "post",
    url: `${UPLOAD_API_LINK}`,
    data: params,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res;
};

export { psApiCalling, uploadImage };
