/**
 * require your custom plugin rules here
 * @example
 * const customRules = {
 *     data-attributes: require('./src/lib/rules/data-attributes.rule.js'),
 * };
 */
const customRules = {};

module.exports = {
    globals: {
        MyGlobal: true,
    },
    rules: customRules,
    configs: {
        base: {
            extends: ['./src/lib/config/base.eslintrc.js'],
        },
        react: {
            extends: ['./src/lib/config/react.eslintrc.js'],
        },
        nest: {
            extends: ['./src/lib/config/nestjs.eslintrc.js'],
        },
        'flat/base': require('./src/lib/config/base.flat.mjs').default,
        'flat/react': require('./src/lib/config/react.flat.mjs').default,
        'flat/nestjs': require('./src/lib/config/nestjs.flat.mjs').default,
    },
};
