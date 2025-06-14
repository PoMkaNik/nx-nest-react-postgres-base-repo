import type { SchemaObject, ReferenceObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { STATUS_CODES } from 'http';

/**
 * Схема ошибки авторизации
 */
export function AuthErrorSchema(): SchemaObject | ReferenceObject {
    return {
        type: 'object',
        properties: {
            statusCode: {
                type: 'number',
                format: 'int32',
                example: STATUS_CODES.UNAUTHORIZED,
            },
            message: {
                type: 'string',
                example: 'Недействительный токен',
            },
            error: {
                type: 'string',
                example: 'InvalidTokenError',
            },
        },
        required: ['statusCode', 'message', 'error'],
        additionalProperties: false,
    };
}
