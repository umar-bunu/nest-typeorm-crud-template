import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), `.env.stage.${process.env.STAGE}`),
});

console.log('is local::: ', process.env.STAGE === 'local');
export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  entities: ['dist/**/*.entity.js'],
  host: process.env.DB_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.DB_PORT),
  database: process.env.POSTGRES_DB,
  useUTC: true,
  logging: true,
  migrations: ['dist/db/migrations/*.js'], // Path to your migration files if not working try ['db/migrations/*.ts']
  migrationsTableName: 'migrations',
  extra: {
    softDelete: true,
  },
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
