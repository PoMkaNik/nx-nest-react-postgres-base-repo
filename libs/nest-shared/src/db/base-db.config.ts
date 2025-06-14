import type { LoggerOptions } from 'typeorm';
import type { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const DEFAULT_ENV_LOGGING = 'all';

// TODO: конвертировать ELogLevel в LogLevel и брать из NX_APP_LOG_LEVEL
function prepareLogging(envValue?: string): LoggerOptions {
    const value = envValue ?? DEFAULT_ENV_LOGGING;

    if (/^(true|false)$/i.test(value)) {
        return Boolean(value.toLowerCase() === 'true');
    } else if (value === 'all') {
        return value;
    } else {
        return value.split(',') as LoggerOptions;
    }
}

export const baseDbConfig = (): PostgresConnectionOptions => ({
    type: 'postgres',
    database: process.env.NX_DB_NAME,
    username: process.env.NX_DB_USER,
    password: process.env.NX_DB_PASS,
    host: process.env.NX_DB_HOST,
    port: Number(process.env.NX_DB_PORT),
    schema: process.env.NX_DB_SCHEMA ?? 'public',
    logging: prepareLogging(process.env.NX_DB_LOGGING),
    maxQueryExecutionTime: 2000,
    migrations: [],
    entities: [], // переопределяется сервисом
});
