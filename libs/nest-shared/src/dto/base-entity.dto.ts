import { ApiProperty } from '@nestjs/swagger';

import { BaseIdDto } from './base-id.dto';

/**
 * DTO сущности, которая хранит дату создания и изменения
 */
export class BaseEntityDto extends BaseIdDto {
    @ApiProperty({
        description: 'Метка времени создания сущности',
        type: 'string',
        format: 'date-time',
    })
    public created_at: string;

    @ApiProperty({
        description: 'Метка времени последнего изменения сущности',
        type: 'string',
        format: 'date-time',
    })
    public updated_at: string;
}
