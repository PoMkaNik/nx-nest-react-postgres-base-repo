import type { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * Схема метаданных пагинации
 */
export const PaginationMetaSchema: SchemaObject = {
    type: 'object',
    properties: {
        offset: {
            type: 'number',
            format: 'int32',
            description: 'Количество пропущенных элементов',
        },
        limit: {
            type: 'number',
            format: 'int32',
            description: 'Максимальное количество возвращаемых элементов',
        },
        total: {
            type: 'number',
            format: 'int32',
            description: 'Общее количество элементов',
        },
        count: {
            type: 'number',
            format: 'int32',
            description: 'Количество элементов в возвращаемом наборе',
        },
    },
    required: ['offset', 'limit', 'total'],
    additionalProperties: false,
};
