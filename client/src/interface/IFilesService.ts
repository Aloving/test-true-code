import { UploadRequestOption } from "rc-upload/lib/interface";
import { UploadRequestFile } from "rc-upload/lib/interface";
import { IPhoto } from "./IPhoto";

export interface IFilesService {
  uploadImage: (options: UploadRequestOption) => Promise<IPhoto>;
  uploadImageFile: (file: UploadRequestFile) => Promise<IPhoto>;
}
