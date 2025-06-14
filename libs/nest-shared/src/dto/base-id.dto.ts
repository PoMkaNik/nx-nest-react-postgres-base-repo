import { ApiProperty } from '@nestjs/swagger';

/**
 * DTO сущности, которая хранит идентификатор сущности
 */
export class BaseIdDto {
    @ApiProperty({
        description: 'Уникальный идентификатор сущности',
        type: 'string',
        format: 'uuid',
    })
    public id: string;
}
