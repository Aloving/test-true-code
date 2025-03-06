"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSwagger = initSwagger;
const swagger_1 = require("@nestjs/swagger");
function initSwagger(app) {
    const config = new swagger_1.DocumentBuilder()
        .setTitle('True Code examples')
        .setDescription('True Code examples description')
        .setVersion('1.0')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('swagger', app, document);
}
//# sourceMappingURL=initSwagger.js.map