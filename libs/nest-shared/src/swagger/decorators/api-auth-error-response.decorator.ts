import { STATUS_CODES } from '@canalia/common';
import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { AuthErrorSchema } from '../schemas';

/**
 * Декоратор для ответа на ошибку авторизации
 */
export function ApiAuthErrorResponse() {
    return applyDecorators(
        ApiResponse({
            status: STATUS_CODES.UNAUTHORIZED,
            description: 'Ошибка авторизации',
            content: {
                'application/json': {
                    schema: AuthErrorSchema(),
                },
            },
        }),
    );
}
