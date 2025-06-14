/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Makes type nullable
 * @example
 * type A = Nullable<1>;
 * const a: A = null;
 * const b: A = 1;
 */
declare type Nullable<T> = T | null;

/**
 * Делает тип, который не может быть null
 * @example
 * type A = NotNull<object | null | undefined>; // object | undefined
 */
declare type NotNull<T> = T extends null ? never : T;

type NullableKeys<T> = keyof {
    [P in keyof T as null extends T[P] ? P : never]: T[P];
};

type NotNullableKeys<T> = keyof {
    [P in keyof T as null extends T[P] ? never : P]: T[P];
};

/** Делает необязательными поля объекта, которые могут быть null */
declare type WithNullAsOptional<T extends object> = {
    [P in NullableKeys<T>]?: NotNull<T[P]>;
} & {
    [P in NotNullableKeys<T>]: T[P];
};

/**
 * Makes type optional
 * @example
 * type A = Optional<string>;
 * const a: A = undefined;
 * const b: A = 'foo';
 */
declare type Optional<T> = T | undefined;

/**
 * Removes undefined from union type.
 * @example
 * type A = NonUndefined<string | undefined>;
 * const a: A = 'foo';
 * // @ts-expect-error
 * const b: A = undefined;
 */
declare type NonUndefined<T> = T extends undefined ? never : T;

/**
 * Тип позволяет преобразовать заданные атрибуты в Nullable тип 'Type | null'
 * Если конкретные значения не заданы - делает все поля Nullable
 * @example
 * interface A {
 *     a: string;
 *     b?: number;
 * }
 * type B = WithNullable<A, 'b'>; // { a: string; b?: number | null; }
 * type C = WithNullable<A>; // { a: string | null; b?: number | null; }
 */
declare type WithNullable<T, K extends keyof T = keyof T> = Omit<T, K> & { [D in K]: Nullable<T[D]> };

/**
 * Тип убирает для указанных или всех полей возможность иметь значение "null"
 */
declare type WithNotNullable<T, K extends keyof T = keyof T> = Omit<T, K> & { [D in K]: Exclude<T[D], null> };

type NonUndefinedMany<T> = { [N in keyof T]-?: NonUndefined<T[N]> };

/**
 * Тип позволяет объявить заявленные параметры как обязательные
 * (убрать ? из объявления 'a?: Type' или undefined из 'a: Type | undefined').
 * @example
 * interface A {
 *     egg: string;
 *     spam?: number;
 *     ham: number | undefined | null;
 * }
 *
 * type B = WithRequired<A, 'spam' | 'ham'>; // B::{ egg: string; spam: number; ham: number | null };
 */
declare type WithRequired<T, P extends keyof T> = T & NonUndefinedMany<Pick<T, P>>;

/**
 * Тип позволяет преобразовать заданные атрибуты в Optional тип 'Type | void'
 * @example
 * interface A {
 *     a: string;
 *     b: number;
 * }
 * type B = WithOptional<A, 'a'>; // { a?: string; b: number; }
 */
declare type WithOptional<T, K extends keyof T> = Omit<T, K> & { [D in K]?: T[D] };

/**
 * Тип утверждает, что свойства объекта существуют.
 */
declare type WithExist<T, K extends keyof T> = WithRequired<T, K> & WithNotNullable<T, K>;

/**
 * Removes indexed elements from type
 * @example
 * type A = { [K: string]: any, id: number, value: string };
 * type B = RemoveIndex<A>; // { id: number, value: string }
 */
declare type RemoveIndex<T> = {
    [K in keyof T as string extends K ? never : number extends K ? never : symbol extends K ? never : K]: T[K];
};

/**
 * Представление ленивой функции-значения.
 */
declare type Lazy<T> = () => T;

/**
 * Тип или выводит тип аргумента или приводит к unknown.
 * @example
 * type TObjWithCallback = {
 *     callback: (arg: InferOrUnknown<Lazy<unknown>>) => void;
 * }
 * function fn(arg: string) {}
 *
 * const inferredObj: TObjWithCallback = {
 *     callback: fn, // inferred argument type is string - no error
 * }
 * const coercedObj: TObjWithCallback = {
 *     callback: (x: string) => {}, // argument must be typed otherwise is unknown
 * }
 */
declare type InferOrUnknown<QR extends () => unknown> = ReturnType<QR> extends infer A
    ? A extends any
        ? A
        : never
    : never;

/**
 * Тип выдвигает требование, что бы хотя бы одно из полей объекта было объявлено.
 * @example
 * // Объявлен DTO для изменения методом PATH
 * type PathUserDTO = {
 *     name?: string;
 *     age?: number;
 *     mobilePhone?: number;
 * }
 *
 * api.pathUser<PathUserDTO>({}); // Ok, пустое обновление
 * api.pathUser<AtLeastOne<PathUserDTO>>({}) // Ошибка, хотя бы одно из полей должно присутствовать
 */
declare type AtLeastOne<Type, Keys extends keyof Type = keyof Type> = Partial<Type> &
    { [K in Keys]: Required<Pick<Type, K>> }[Keys];

/**
 * Позволяет получить пересечение ключей двух объектов. Ассоциативно, коммутативно, дистрибутивно.
 * @example
 * type A = { foo: string; bar: string; baz: string; };
 * type B = { foo: number; baz: number; };
 * type SimilarKeys = KeysIntersection<A, B> // 'foo' | 'baz'
 */
declare type KeysIntersection<A, B> = keyof A & keyof B;

/**
 * Тип вычисляет пересечение первого объекта со вторым. Тип значений при этом учитывается для первого объекта.
 * @example
 * type Foo = { foo: string; bar: string };
 * type Bar = { foo: number; };
 *
 * type Result = Intersect<Foo, Bar>; // type Result = { foo: string; };
 * type Never = Intersect<{ foo: any }, { bar: any }>; // type Never = never;
 */
declare type Intersect<A extends object, B extends object> = Pick<
    A,
    Exclude<keyof A, Exclude<keyof A, keyof B>>
> extends {
    [x: string]: never;
}
    ? never
    : Pick<A, Exclude<keyof A, Exclude<keyof A, keyof B>>>;

/**
 * Логический типовый оператор.
 * Сравнивает LEFT и RIGHT, возвращает True или False
 * @example
 * type L = 1;
 * type R = 2;
 * type R2 = number;
 * type WilFalse = If<L, R, true, false>
 * type WilTrue = If<L, R2, true, false>
 */
declare type If<LEFT, RIGHT, True, False> = [LEFT] extends [RIGHT] ? True : False;

declare type IfDef<LEFT, True, False> = [LEFT] extends [never] ? False : True;

/** Выбирает ключи, которые не являются опциональными и не могут быть `undefined` */
type NonUndefinedKeys<T> = keyof {
    [P in keyof T as undefined extends T[P] ? never : P]: T[P];
};

/** Выбирает ключи, которые являются опциональными или могут быть `undefined` */
type UndefinedKeys<T> = keyof {
    [P in keyof T as undefined extends T[P] ? P : never]: T[P];
};

/** Делает опциональными ключи, которые могут быть `undefined` */
declare type UndefinedOptional<T> = T extends object
    ? Partial<T> & {
          [P in NonUndefinedKeys<T>]-?: T[P];
      }
    : T;

/**
 * Делает опциональными ключи, которые могут быть `undefined`, на всех уровнях вложенности
 */
declare type DeepUndefinedOptional<T> = T extends object
    ? {
          [P in UndefinedKeys<T>]?: NonUndefined<T[P]> extends object ? DeepUndefinedOptional<T[P]> : T[P];
      } & {
          [P in NonUndefinedKeys<T>]-?: NonUndefined<T[P]> extends object ? DeepUndefinedOptional<T[P]> : T[P];
      }
    : T;

/**
 * Оставляет свойства указанного типа
 */
declare type FilterByType<TSource, TType> = {
    [P in keyof TSource as TSource[P] extends TType ? P : never]: TSource[P];
};

/**
 * Запрещает использование пустого массива
 */
declare type NonEmptyArray<T> = [T, ...T[]];

/**
 * Возвращает базовый тип массива или сам тип, если он не является массивом
 *
 * @example
 * type TEx1 = BaseTypeIfArray<string[] | number | null>; // string | number | null
 * type TEx2 = BaseTypeIfArray<(string[] | undefined)[]>; // string[] | undefined
 * type TEx3 = BaseTypeIfArray<{ a: number; }[] | { b: string; }>; // { a: number; } | { b: string; }
 */
declare type BaseTypeIfArray<T> = T extends (infer B)[] ? B : T;

/**
 * Возвращает базовый тип массива
 *
 * @example
 * type TEx1 = BaseTypeOfArray<string[]>; // string
 * type TEx2 = BaseTypeOfArray<string>; // never
 */
declare type BaseTypeOfArray<T> = T extends (infer B)[] ? B : never;

/**
 * Возвращает объединение ключей, которые имеют тип объекта или массива объектов, допуская null и undefined
 * @example
 * type TObj = { ... };
 * type TSource = {
 *   n: number;
 *   obj?: TObj | null;
 *   objArray: TObj[];
 *   objOrString: TObj | string
 * };
 * type TObjKeys = RelationKey<TSource>; // 'obj' | 'objArray'
 */
// declare type RelationKey<T> = T extends object
//     ? Extract<
//           keyof {
//               [P in keyof T as Extract<Exclude<NonNullable<BaseTypeIfArray<T[P]>>, Date>, object> extends never
//                   ? never
//                   : P]: T[P];
//           },
//           string
//       >
//     : never;
// TODO: пока что движок TS очень медленно тянет связи по шаблонам
declare type RelationKey<T> = keyof T | string;

/**
 * Возвращает объединение ключей объекта, имеющих тип объекта или массива объектов, допуская null и undefined,
 * а также всех их вложенных объектов (включая объекты массивов) при записи вложенности через точку
 * В случае циклической зависимости она игнорируется
 * @example
 * type TA = { s: string }
 * type TB = { n: number, a: TA }
 * type TC = { x: boolean, a: TA, bs: TB[] }
 * type TCRelations = RelationKeyDeep<TC>; // 'a' | 'bs' | 'bs.a'
 */
// declare type RelationKeyDeep<T, L = T, K extends RelationKey<T> = RelationKey<T>> =
//     | K
//     | {
//           [P in K]: T[P] extends L
//               ? never
//               : `${P}.${Extract<RelationKeyDeep<BaseTypeIfArray<T[P]>, L | T[P]>, string>}`;
//       }[K];
// TODO: пока что движок TS очень медленно тянет связи по шаблонам
declare type RelationKeyDeep<T> = keyof T | string;

/**
 * Возвращает объединение ключей объекта
 * а также всех вложенных объектов (включая объекты массивов) при записи вложенности через точку
 * В случае циклической зависимости она игнорируется
 * @example
 * type TA = { s: string }
 * type TB = { n: number, a: TA }
 * type TC = { x: boolean, a: TA, bs: TB[] }
 * type TCRelations = RelationKeyDeep<TC>; // keyof TC | "a.s" | "bs.a" | "bs.n" | "bs.a.s"
 */
// declare type EntityKeyDeep<T, L = T, K extends RelationKey<T> = RelationKey<T>> =
//     | keyof Extract<T, object>
//     | {
//           [P in K]: T[P] extends L ? never : `${P}.${Extract<EntityKeyDeep<BaseTypeIfArray<T[P]>, L | T[P]>, string>}`;
//       }[K];
// TODO: пока что движок TS очень медленно тянет связи по шаблонам
declare type EntityKeyDeep<T> = keyof T | string;

/** Выбирает строковые типы */
declare type TStringTypes<T> = T extends string ? T : never;

/**
 * Выбирает тип первого не-undefined элемента кортежа.
 * @example
 * function coalesceUndefined<T extends unknown[]>(...params: T): TFirstNonUndefined<T> { ... }
 * const p1: number | undefined;
 * const p2: { value: 'string' };
 * const value = coalesceUndefined(p1, p2.value); // тип: number | string
 */
declare type FirstNonUndefined<T extends unknown[], TFinal = never> = T extends [infer P1, ...infer PN]
    ? undefined extends P1
        ? PN extends [any, ...any[]]
            ? FirstNonUndefined<PN, TFinal | Exclude<P1, undefined>>
            : TFinal | P1
        : TFinal | P1
    : never;
