declare const _default: () => {
    port: string | number;
    pixabay: {
        key: string | undefined;
        per_page: number;
        category: string;
        editors_choice: string;
        orientation: string;
        image_type: string;
    };
    db: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        ssl: boolean;
        synchronize: boolean;
        autoLoadEntities: boolean;
        dialectOptions: {
            ssl: {
                require: boolean;
            };
        };
    };
    auth: {
        secret: string | undefined;
    };
};
export default _default;
