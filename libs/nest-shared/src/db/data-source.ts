import { join } from 'node:path';
import { DataSource } from 'typeorm';

import { baseDbConfig } from './base-db.config';

/**
 * Перечень Entity классов или путей
 * Для работы генератора миграций необходимо указывать пути к entity, например:
 *   entities: ['./libs/nest-shared/src/ ** / *.entity.ts']; // убрать пробелы
 */
export const entities = ['./libs/nest-shared/src/db/entities/**/*.entity.ts'];

/**
 * Перечень классов миграций или путей к миграциям
 */
const migrations = [join(__dirname, `migrations/*.ts`)];

/**
 * DataSource для подключения к БД для работы с миграциями
 */
export default new DataSource({
    ...baseDbConfig(),
    entities,
    migrations,
});
