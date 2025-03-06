"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileNameEditor = void 0;
const fileNameEditor = (req, file, callback) => {
    callback(null, file.originalname);
};
exports.fileNameEditor = fileNameEditor;
//# sourceMappingURL=fileNameEditor.js.map