declare const _default: () => {
    port: string | undefined;
    pixabay: {
        key: string | undefined;
        per_page: number;
        category: string;
        editors_choice: string;
        orientation: string;
        image_type: string;
    };
    db: {
        host: string | undefined;
        port: number;
        username: string | undefined;
        password: string | undefined;
        database: string | undefined;
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
