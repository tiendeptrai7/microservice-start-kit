const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

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

const CLI_ENTITIES_DIR =
  process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test' 
  ? 'src/entities' 
  : 'dist/entities';

const CLI_MIGRATION_DIR =
  process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test' 
  ? 'src/migrations' 
  : 'dist/migrations';

const CLI_SUBCRIBE_DIR =
  process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test' 
  ? 'src/subscribers' 
  : 'dist/subscribers';

const config = {
  type: 'mysql',
  port: Number(process.env.RDS_PORT) || 3308,
  host: process.env.RDS_HOST,
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DATABASE,
  logger: 'debug',
  charset: 'utf8mb4',
  synchronize: false,
  entities: [ENTITIES_PATH],
  migrations: [MIGRATIONS_PATH],
  subscribers: [SUBCRIBE_PATH],
  // keepConnectionAlive: true,
  cli: {
    entitiesDir: CLI_ENTITIES_DIR,
    migrationsDir: CLI_MIGRATION_DIR,
    subscribersDir: CLI_SUBCRIBE_DIR,
  },
};

module.exports = config;
