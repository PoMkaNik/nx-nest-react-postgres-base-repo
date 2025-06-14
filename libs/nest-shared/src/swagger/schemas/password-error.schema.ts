import type { SchemaObject, ReferenceObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { STATUS_CODES } from 'http';

/**
 * Схема ошибки валидации пароля
 */
export function PasswordValidationErrorSchema(): SchemaObject | ReferenceObject {
    return {
        type: 'object',
        properties: {
            statusCode: {
                type: 'number',
                format: 'int32',
                example: STATUS_CODES.BAD_REQUEST,
            },
            message: {
                type: 'string',
                example: 'Ошибка валидации пароля',
            },
            errors: {
                type: 'array',
                items: {
                    type: 'string',
                },
                example: ['Пароль должен содержать не менее 8 символов', 'Пароль должен содержать цифры'],
            },
            suggestions: {
                type: 'array',
                items: {
                    type: 'string',
                },
                example: ['Добавьте цифры в пароль', 'Увеличьте длину пароля'],
            },
            error: {
                type: 'string',
                example: 'Bad Request',
            },
        },
        required: ['statusCode', 'message', 'errors', 'error'],
        additionalProperties: false,
    };
}
