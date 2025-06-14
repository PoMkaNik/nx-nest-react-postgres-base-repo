import { applyDecorators } from '@nestjs/common';
import { Transform } from 'class-transformer';

/**
 * Декоратор преобразования входящего значения, которое может быть либо одиночным значением, либо массивом, в массив
 */
export function TransformToArray() {
    return applyDecorators(Transform(({ value }) => (Array.isArray(value) ? value : [value])));
}
