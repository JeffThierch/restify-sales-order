interface EnvironmentInterface {
  SERVER_PORT: number | string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
  DB_HOST: string;
  DB_PORT: number;
}

export const environment: EnvironmentInterface = {
  SERVER_PORT: process.env.SERVER_PORT ?? 3333,
  DB_USER: process.env.DB_USER ?? "root",
  DB_PASSWORD: process.env.DB_PASSWORD ?? "root",
  DB_DATABASE: process.env.DB_DATABASE ?? "sales_order",
  DB_HOST: process.env.DB_HOST ?? "0.0.0.0",
  DB_PORT: parseInt(process.env.DB_PORT ?? "3306"),
};
