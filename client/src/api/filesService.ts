import axios from "axios";

import { IFilesService } from "../interface/IFilesService";

export const filesService: IFilesService = {
  uploadImage: ({ file }) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios
      .post("/api/files/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      });
  },

  uploadImageFile: (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return axios
      .post("/api/files/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        return res.data;
      });
  },
};
