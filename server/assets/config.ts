export default () => {
  return {
    port: process.env.PORT,
    db: {
      host: process.env.DB_HOST,
      port: +(process.env.DB_PORT || 5432),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,

      synchronize: true,
      autoLoadEntities: true,
      dialectOptions: {
        ssl: { require: Boolean(process.env.DB_SSL) },
      },
    },
  };
};
