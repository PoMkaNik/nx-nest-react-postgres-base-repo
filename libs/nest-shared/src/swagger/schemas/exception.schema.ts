import type { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

/**
 * Генерирует схему сваггера для указанного кода статуса
 */
export function ExceptionSchemaForStatus(statusCode: number): SchemaObject | ReferenceObject {
    return {
        type: 'object',
        properties: {
            statusCode: {
                type: 'number',
                format: 'int32',
                enum: [statusCode],
            },
            message: {
                type: 'string',
            },
        },
        required: ['statusCode'],
        additionalProperties: false,
    };
}
