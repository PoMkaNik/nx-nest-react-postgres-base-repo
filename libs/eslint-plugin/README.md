# eslint-plugin-tedo Плагин для eslint с правилами проекта для линтинга кода.

## Применение.

Есть 2 варианта применения:

1. Запустить build & publish - TODO
2. Импортировать непосредственно конфиги.

## Импорт конфигов.

Существует 3 набора конфигураций линтинга:

1. [Base](./src/lib/config/base.eslintrc.js) - базовый набор без привязки к фреймворку
2. [Common](./src/lib/config/common.eslintrc.js) - ???
3. [NestJs](./src/lib/config/nestjs.eslintrc.js) - набор конфигурации для фреймворка NestJs
4. [React](./src/lib/config/react.eslintrc.js) - набор конфигурации для ReactJs
5. [Library](./src/lib/config/library.eslintrc.js) - набор для библиотек с небольшими допущениями - облегчает правила предыдущих конфигураций

Каждый специфичный конфиг наследует [Base](./src/lib/config/base.eslintrc.js) конфигурацию, то есть, например react.eslintrc.js = base.eslintrc.js + react специфичные правила

```json
{
    "extends": ["../libs/eslint-plugin/src/lib/config/react.eslintrc.js"],
    "compilerOptions": {
        "project": "<globPathToYourTSCONFIG(S)> | true"
    }
}
```

## Дополнительные свойства

```json
{
    "no-restricted-imports": ["error", { "paths": [] }]
}
```

## Сборка и публикация

TODO

[comment]: <> (Run `nx build eslint-plugin` to build the library.)
