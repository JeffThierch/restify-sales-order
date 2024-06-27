import mysql, { PoolOptions } from "mysql2/promise";
import { environment } from "./environment";

const pollConfig: PoolOptions = {
  user: environment.DB_USER,
  password: environment.DB_PASSWORD,
  database: environment.DB_DATABASE,
  host: environment.DB_HOST,
  port: environment.DB_PORT,
  dateStrings: true,
};

const databaseConnection = mysql.createPool(pollConfig);

export default databaseConnection;
