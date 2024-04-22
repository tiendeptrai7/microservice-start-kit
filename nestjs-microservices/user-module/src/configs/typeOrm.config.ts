import '../vendors/boilerplate.polyfill';
import { DataSource } from 'typeorm';
require('dotenv').config();

const ENTITIES_PATH =
  process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test'
    ? 'src/entities/*.ts'
    : 'dist/entities/*.js';

const MIGRATIONS_PATH =
  process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test' 
  ? 'src/migrations/*.ts' 
  : 'dist/migrations/*.js';

const SUBCRIBE_PATH =
  process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test'
  ? 'src/subscribers/*.ts'
  : 'dist/subscribers/*.js';

export default new DataSource({
  type: 'mysql',
  port: Number(process.env.RDS_PORT) || 3308,
  host: '127.0.0.1',
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  synchronize: false,
  logging: false,
  entities: [ENTITIES_PATH],
  migrations: [MIGRATIONS_PATH],
  subscribers: [SUBCRIBE_PATH],
});
