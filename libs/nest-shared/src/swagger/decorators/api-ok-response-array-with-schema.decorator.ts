import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { ResponseSchemaFor } from '../schemas';

/**
 * Декоратор возвращаемой схемы DTO успешного ответа массива значений
 */
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export const ApiOkResponseArrayWithSchema = (dto: string | Function, description = 'Успешный ответ') => {
    return applyDecorators(
        ApiOkResponse({
            description,
            content: {
                'application/json': {
                    schema: ResponseSchemaFor({
                        type: 'array',
                        items: {
                            $ref: getSchemaPath(dto),
                        },
                    }),
                },
            },
        }),
    );
};
