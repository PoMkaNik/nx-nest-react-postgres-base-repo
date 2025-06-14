/**
 * Актуализирует миграции вызовом typeorm:run с предварительным выводом статуса и подтверждением
 *
 * Параметры запуска:
 *
 * -f запуск актуализации без подтверждения
 *
 * -a предотвращает вывод mig:show
 */

import { exec } from 'node:child_process';
import { join } from 'node:path';
import { createInterface } from 'node:readline';
import { promisify } from 'node:util';

const pexec = promisify(exec);

const dataSourcePath = join(__dirname, 'data-source.ts');

const migrationsShowCommand = () => `npm run typeorm migration:show -- -d "${dataSourcePath}"`;
const migrationsUpCommand = () => `npm run typeorm migration:run -- -d "${dataSourcePath}"`;

async function doExecAndWriteToConsole(cmd: string) {
    const { stdout, stderr } = await pexec(cmd, { maxBuffer: Infinity });
    if (stderr) {
        console.error(stderr);
    }
    console.log(stdout);
}

function printEnv(env: string) {
    console.log(`${env}: ${process.env[env] ?? 'undefined'}`);
}

function printDbEnv() {
    ['NX_DB_HOST', 'NX_DB_PORT', 'NX_DB_NAME', 'NX_DB_USER', 'NX_DB_SCHEMA'].forEach((env) => printEnv(env));
}

/** Подтверждение запуска актуализации через консоль */
async function confirmMigUp(): Promise<boolean> {
    return new Promise((res) => {
        const rl = createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        rl.question('Подтвердите запуск актуализации миграций, напечатав "yes": ', (answer) => {
            process.nextTick(() => {
                res(answer === 'yes');
            });

            rl.close();
        });
    });
}

/** Параметры запуска скрипта */
type TParams = {
    /** Запуск актуализации миграций без подтверждения */
    forceMigUp: boolean;

    /** Предотвращение вывода информации о состоянии миграций */
    preventMigShow: boolean;
};

function parseParams(): TParams {
    return {
        preventMigShow: process.argv.slice(2).includes('-a'),
        forceMigUp: process.argv.slice(2).includes('-f'),
    };
}

/** Runner */
(async () => {
    // считываем параметры запуска
    const { forceMigUp, preventMigShow } = parseParams();

    // выводим данные ENV
    console.log(`Общие переменные окружения:`);
    printEnv('ENV');
    console.log(`\nПодключение к БД:`);
    printDbEnv();

    // выводим migration:show
    if (!preventMigShow) {
        console.log(`\nПолучаем список миграций и их состояние...`);
        await doExecAndWriteToConsole(migrationsShowCommand());
    }

    // выполняем актуализацию миграций
    console.log(`\nВыполняем актуализацию миграций...`);
    if (forceMigUp || (await confirmMigUp())) {
        await doExecAndWriteToConsole(migrationsUpCommand());
        console.log(`\nАктуализация миграций выполнена успешно!\n`);
    } else {
        console.log(`\nЗапуск актуализации миграций отменен!`);
    }
})().catch((e: any) => {
    console.log(`Ошибка выполнения скрипта актуализации миграций!`);
    if (e.stdout) {
        console.error(e.stdout);
    }
    console.error(e.message);
    process.exit(1);
});
