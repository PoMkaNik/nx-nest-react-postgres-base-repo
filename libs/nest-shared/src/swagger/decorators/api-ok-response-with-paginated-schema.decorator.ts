import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { PaginationSchemaFor } from '../schemas';

/**
 * Декоратор возвращаемой схемы DTO успешного ответа массива значений с пагинацией
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const ApiOkResponsePaginatedWithSchema = (dto: string | Function, description = 'Успешный ответ') => {
    return applyDecorators(
        ApiOkResponse({
            description,
            content: {
                'application/json': {
                    schema: PaginationSchemaFor(dto),
                },
            },
        }),
    );
};
