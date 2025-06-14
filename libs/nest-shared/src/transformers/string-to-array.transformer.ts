import { Transform } from 'class-transformer';

/**
 * Трансформер для преобразования строки с разделителями запятыми в массив строк.
 * Если значение уже является массивом, возвращает его без изменений.
 * Если значение не является строкой или массивом, возвращает пустой массив.
 *
 * Пример использования:
 * @TransformStringToArray()
 */
export function TransformStringToArray(): PropertyDecorator {
    return Transform(({ value }: { value: unknown }) => {
        if (Array.isArray(value)) {
            return value.every((item) => typeof item === 'string') ? value : [];
        }
        if (typeof value === 'string') {
            return value
                .split(',')
                .map((item) => item.trim())
                .filter((item) => item.length > 0);
        }
        return [];
    });
}
