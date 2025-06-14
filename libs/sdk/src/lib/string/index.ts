import { identity } from '../functions';

/**
 * Преобразует строку из camel в kebab нотацию.
 * @example
 * assert(camelToKebabCase('someAwesomeString')).toBe('some-awesome-string');
 */
export const camelToKebab = (str: string) => {
    const result = str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
    return result.substring(1);
};

export function snakeToKebab(identity: string) {
    return identity.split('_').join('-');
}
export function kebabToSnake(identity: string) {
    return identity.split('-').join('_');
}

/**
 * Начинает предложение с большой буквы.
 * @example
 * assert(capitalizeSentence('малиновая лада, малиновый закат')).toBe('Малиновая лада, малиновый закат');
 */
export const capitalizeSentence = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Возвращает строку в правильном склонении, в зависимости от заданного числа.
 *
 * Пример использования:
 * > console.log(10, pluralize(10, 'яблоко', 'яблока', 'яблок'));
 * > 10 яблок
 */
export function pluralize(source: number, single: string, several: string, many: string): string {
    let num = source;
    if (num >= 100) {
        num = +num.toString().slice(-2);
    }

    if (num % 10 === 1 && num !== 11) {
        return single;
    }

    if ((num % 10 === 2 || num % 10 === 3 || num % 10 === 4) && num !== 12 && num !== 13 && num !== 14) {
        return several;
    }

    return many;
}

/** Возвращает год в правильном склонении. */
export function pluralizeYear(year: number): string {
    return `${year} ${pluralize(year, 'год', 'года', 'лет')}`;
}

/** Возвращает день в правильном склонении. */
export function pluralizeDay(day: number): string {
    return `${day} ${pluralize(day, 'день', 'дня', 'дней')}`;
}

/** разбивает предложение на слова. */
export function words(s: string) {
    return s.split(/[^a-zA-Zа-яА-Я\d]/).filter(identity);
}

export function fst(i: string): string | undefined;
export function fst<T>(i: T[]): T | undefined;
export function fst<T>(i: string | T[]) {
    return i[0];
}

export function snd(i: string): string | undefined;
export function snd<T>(i: T[]): T | undefined;
export function snd<T>(i: string | T[]) {
    return i[1];
}

export const getEncodedString = (name: string) => {
    try {
        return encodeURI(name);
    } catch (error) {
        console.warn(error);
        return name;
    }
};
export const getDecodedString = (name: string) => {
    try {
        return decodeURI(name);
    } catch (error) {
        console.warn(error);
        return name;
    }
};

export const parseBooleanString = (value?: string | boolean) => {
    if (!value) {
        return undefined;
    }

    if (typeof value === 'boolean') {
        return value;
    }

    if (value) {
        switch (value?.toLowerCase()) {
            case 'false':
                return false;
            case 'true':
                return true;
            default:
                return undefined;
        }
    }

    return undefined;
};
