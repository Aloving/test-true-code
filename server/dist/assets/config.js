"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => ({
    port: process.env.PORT || 3001,
    pixabay: {
        key: process.env.PIXABAY,
        per_page: 10,
        category: 'nature',
        editors_choice: 'true',
        orientation: 'horizontal',
        image_type: 'photo',
    },
    db: {
        host: 'localhost',
        port: +(process.env.DB_PORT || 5432),
        username: 'postgres',
        password: 'root',
        database: 'db_test',
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
});
//# sourceMappingURL=config.js.map