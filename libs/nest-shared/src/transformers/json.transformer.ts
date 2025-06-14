import { BadRequestException, Logger } from '@nestjs/common';
import type { TransformFnParams } from 'class-transformer';

const logger = new Logger('JsonTransformer');

/**
 * Трансформер для преобразования JSON-строки в объект.
 * Если value уже является объектом, возвращает его.
 * Если value — строка, пытается её распарсить как JSON.
 * В случае ошибки выбрасывает исключение.
 */
export const JsonTransformer = ({ value }: TransformFnParams): Record<string, any> | undefined => {
    // Если значение уже является объектом и не массивом, возвращаем его
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return value as Record<string, unknown>;
    }

    // Если значение является строкой, пытаемся его распарсить
    if (typeof value === 'string' && value.trim() !== '') {
        try {
            const parsed: unknown = JSON.parse(value);
            if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
                return parsed as Record<string, unknown>;
            }
            throw new BadRequestException('Распарсенное значение не является объектом');
        } catch (error) {
            if (error instanceof Error) {
                logger.error(`Некорректный JSON формат: ${error.message}`);

                throw new BadRequestException(`Некорректный JSON формат: ${error.message}`);
            } else {
                logger.error(`Некорректный JSON формат: ${String(error)}`);

                throw new BadRequestException('Некорректный JSON формат');
            }
        }
    }

    // В остальных случаях возвращаем undefined
    return undefined;
};
