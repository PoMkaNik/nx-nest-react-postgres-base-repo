import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

/**
 * Поля пагинации для базового DTO при запросе
 */
export class BasePaginationQueryDto {
    @ApiPropertyOptional({
        description: 'Количество пропускаемых элементов',
        type: 'integer',
        minimum: 0,
    })
    @IsOptional()
    @Min(0)
    @IsInt()
    @Type(() => Number)
    public offset?: number;

    @ApiPropertyOptional({
        description: 'Максимальное возвращаемое количество элементов',
        type: 'integer',
        minimum: 1,
    })
    @IsOptional()
    @Min(1)
    @IsInt()
    @Type(() => Number)
    public limit?: number;
}
