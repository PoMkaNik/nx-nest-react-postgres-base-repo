import { applyDecorators } from '@nestjs/common';
import { ApiNotFoundResponse } from '@nestjs/swagger';

import { ExceptionSchemaForStatus } from '../schemas/exception.schema';

/**
 * Декоратор схемы ответа сваггера при коде 404
 */
export function ApiNotFoundErrorResponse() {
    return applyDecorators(
        ApiNotFoundResponse({
            description: 'Объект не найден',
            content: {
                'application/json': {
                    schema: ExceptionSchemaForStatus(404),
                },
            },
        }),
    );
}
