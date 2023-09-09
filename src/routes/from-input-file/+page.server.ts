import axios from "axios";
import { SECRET_API_KEY } from "$env/static/private";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const data = await event.request.formData();

    let files = data.getAll("image_file");
    const file = files[0];
    console.log("file", file);

    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("format", "png");
    formData.append("size", "preview");

    const url = "https://sdk.photoroom.com/v1/segment";
    const options = {
      method: "POST",
      headers: {
        Accept: "image/png, application/json",
        "x-api-key": SECRET_API_KEY,
      },
      body: formData,
    };

    try {
      // const response = await fetch(url, options);
      // const text = await response.text();

      return {
        success: true,
        img: "text",
      };
    } catch (error) {
      console.error(error);
    }
  },
};
