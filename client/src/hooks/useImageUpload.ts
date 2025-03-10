import { useState } from "react";
import { UploadRequestOption } from "rc-upload/lib/interface";

import { filesService } from "../api/filesService";

import { IPhoto } from "../interface/IPhoto";

export const useImageUpload = (initialValues?: IPhoto) => {
  const [photo, setPhoto] = useState(initialValues);

  const uploadImage = async ({ file }: UploadRequestOption) => {
    return filesService.uploadImageFile(file).then((res) => setPhoto(res));
  };

  const resetImage = () => {
    setPhoto(undefined);
  };

  return { photo, resetImage, uploadImage };
};
