import type { ApiParamOptions } from '@nestjs/swagger';

/**
 * Возвращает схему сваггера для параметра идентификатора типа UUID
 */
export const EntityIdParamSchema = (additionalParams?: Partial<ApiParamOptions>, name = 'id'): ApiParamOptions => ({
    name,
    required: true,
    schema: {
        type: 'string',
        format: 'uuid',
    },
    ...additionalParams,
});
