import { BadRequestException } from '@nestjs/common';

export const imageFileFilter = (
  req: Request,
  file: any,
  callback: (error: any, valid: boolean) => void,
) => {
  if (
    !file.originalname ||
    !file.originalname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)
  ) {
    return callback(
      new BadRequestException(`File must be of type jpg|grep|png|gif|svg|webp`),
      false,
    );
  }
};
