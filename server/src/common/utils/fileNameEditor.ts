import { DiskStorageOptions } from 'multer';

export const fileNameEditor: DiskStorageOptions['filename'] = (
  req,
  file,
  callback,
) => {
  callback(null, file.originalname);
};
