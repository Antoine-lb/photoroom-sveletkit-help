import axios from "axios";
import { Blob } from "buffer";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const API_KEY = "";
    const REMOTE_S3_URL =
      "https://er-s3-prod.s3.fr-par.scw.cloud/filename_9834befd98.jpeg";

    const binaryFile = await axios.get(REMOTE_S3_URL);
    const blob = new Blob([binaryFile.data]);

    const formData = new FormData();
    formData.append("image_file", blob, "filename.jpg");
    formData.append("format", "png");
    formData.append("size", "preview");

    const url = "https://sdk.photoroom.com/v1/segment";
    const options = {
      method: "POST",
      headers: {
        Accept: "image/png, application/json",
        "x-api-key": API_KEY,
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
