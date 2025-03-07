"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    console.log('process.env.PORT', process.env.DB_PORT);
    return {
        port: process.env.PORT,
        pixabay: {
            key: process.env.PIXABAY,
            per_page: 10,
            category: 'nature',
            editors_choice: 'true',
            orientation: 'horizontal',
            image_type: 'photo',
        },
        db: {
            host: process.env.DB_HOST,
            port: +(process.env.DB_PORT || 5432),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            ssl: Boolean(process.env.DB_SSL),
            synchronize: true,
            autoLoadEntities: true,
            dialectOptions: {
                ssl: { require: Boolean(process.env.DB_SSL) },
            },
        },
        auth: {
            secret: process.env.SECRET_KEY,
        },
    };
};
//# sourceMappingURL=config.js.map