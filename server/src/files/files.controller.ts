import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { v4 as uuidv4 } from 'uuid';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import path = require('path');

@ApiTags('files')
@Controller('files')
export class FilesController {
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './static/images',
        filename: (req, file, cb) => {
          const filename: string =
            path.parse(file.originalname).name.replace(/\s/g, '') +
            `-${uuidv4()}`;
          const extension: string = path.parse(file.originalname).ext;

          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  @Post('/images')
  async uploadFile(@Req() req: Request, @UploadedFile() file: any) {
    const protocol = req.protocol;
    const host = req.get('Host');
    const fullUrl = `${protocol}://${host}`;
    const filePath = path.normalize(file.path);
    const urlToImage = new URL(filePath, fullUrl);
    const imageObj = {
      url: urlToImage.pathname,
      filename: file.filename,
    };

    return Promise.resolve(imageObj);
  }
}
