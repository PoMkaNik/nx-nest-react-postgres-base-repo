import type { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * Генерирует схему сваггера успешного ответа с указанным типом объекта
 */
export function ResponseSchemaFor(data: SchemaObject | ReferenceObject): SchemaObject | ReferenceObject {
    return {
        type: 'object',
        properties: {
            data,
        },
        required: ['data'],
        additionalProperties: false,
    };
}
