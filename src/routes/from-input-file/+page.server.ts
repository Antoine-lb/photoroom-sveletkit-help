import axios from "axios";

/** @type {import('./$types').Actions} */
export const actions = {
  default: async (event) => {
    const API_KEY = "";

    const data = await event.request.formData();

    let files = data.getAll("image_file");
    const file = files[0];
    console.log("file", file);

    const formData = new FormData();
    formData.append("image_file", file, "filename.jpg");
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
