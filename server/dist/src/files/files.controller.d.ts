import { Request } from 'express';
export declare class FilesController {
    uploadFile(req: Request, file: any): Promise<{
        url: string;
        filename: any;
    }>;
}
