import type { TransformFnParams } from 'class-transformer/types/interfaces';

/**
 * Преобразование текстового значения поля класса в булево.
 */
export const BooleanTransformer = ({ value }: TransformFnParams): boolean =>
    value === true || value === 'true' ? true : value === false || value === 'false' ? false : (value as boolean);
