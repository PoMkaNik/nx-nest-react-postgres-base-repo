import { ApiProperty } from '@nestjs/swagger';

import { BaseIdDto } from './base-id.dto';

/**
 * DTO сущности с полем name
 */
export class BaseIdAndNameDto extends BaseIdDto {
    @ApiProperty({
        description: 'Название',
        type: 'string',
        example: 'Имя сущности',
    })
    public name: string;
}
