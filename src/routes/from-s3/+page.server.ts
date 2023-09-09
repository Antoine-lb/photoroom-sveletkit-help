import axios from "axios";
import { Blob } from "buffer";
import { SECRET_API_KEY } from "$env/static/private";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const REMOTE_S3_URL =
      "https://er-s3-prod.s3.fr-par.scw.cloud/filename_9834befd98.jpeg";

    const binaryFile = await axios.get(REMOTE_S3_URL, {
      responseType: "arraybuffer",
    });
    const blob = new Blob([binaryFile.data]);

    const formData = new FormData();
    formData.append("image_file", blob);
    formData.append("format", "png");
    formData.append("size", "preview");

    const url = "https://sdk.photoroom.com/v1/segment";
    const options = {
      method: "POST",
      headers: {
        Accept: "image/png, application/json",
        "x-api-key": SECRET_API_KEY,
      },
    };
    options.body = formData;

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      console.log("success", data);
    } catch (error) {
      console.error(error);
    }
  },
};
