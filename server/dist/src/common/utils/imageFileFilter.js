"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
const imageFileFilter = (req, file, callback) => {
    if (!file.originalname ||
        !file.originalname.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
        return callback(new common_1.BadRequestException(`File must be of type jpg|grep|png|gif|svg|webp`), false);
    }
};
exports.imageFileFilter = imageFileFilter;
//# sourceMappingURL=imageFileFilter.js.map