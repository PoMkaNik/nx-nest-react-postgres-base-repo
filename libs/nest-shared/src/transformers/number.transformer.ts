import type { TransformFnParams } from 'class-transformer';

/**
 * Трансформер для преобразования строкового значения в число.
 * Если преобразование невозможно, возвращает undefined.
 */
export const NumberTransformer = ({ value }: TransformFnParams): number | undefined => {
    if (typeof value === 'string' && value.trim() !== '') {
        const parsed = Number(value);
        return isNaN(parsed) ? undefined : parsed;
    } else if (typeof value === 'number') {
        return value;
    }
    return undefined;
};
