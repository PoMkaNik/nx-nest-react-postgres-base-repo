import { getSchemaPath } from '@nestjs/swagger';
import type { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

import { PaginationMetaSchema } from './pagination-meta.schema';

/**
 * Генерирует схему сваггера с пагинацией для указанного DTO
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function PaginationSchemaFor(dto: string | Function): SchemaObject | ReferenceObject {
    return {
        type: 'object',
        properties: {
            pagination: PaginationMetaSchema,
            items: {
                type: 'array',
                items: {
                    $ref: getSchemaPath(dto),
                },
            },
        },
        required: ['pagination', 'items'],
        additionalProperties: false,
    };
}
