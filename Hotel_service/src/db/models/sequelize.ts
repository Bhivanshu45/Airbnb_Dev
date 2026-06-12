import { Sequelize } from "sequelize";
import { dbConfig } from "../../config/index";

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: dbConfig.HOST_NAME,
    username: dbConfig.DB_USERNAME,
    password: dbConfig.DB_PASSWORD,
    database: dbConfig.DB_NAME,
    logging: true
});

export default sequelize;
