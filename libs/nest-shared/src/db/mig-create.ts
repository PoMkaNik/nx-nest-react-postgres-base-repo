/**
 * Создаёт миграцию вызовом typeorm:create с указанным в строке вызова именем
 */
import { exec } from 'node:child_process';
import { join } from 'node:path';
import { promisify } from 'node:util';

const pexec = promisify(exec);

const makeCommand = (name: string) => `npm run typeorm migration:create "${name}"`;

(async () => {
    const name = process.argv[2];
    if (!name) {
        throw new Error(`Не указано имя новой миграции в строке вызова`);
    }
    if (!/^[A-Z][a-zA-Z0-9]+$/.test(name)) {
        throw new Error(
            `Имя миграции должно быть в pascal-case и содержать только английские буквы` +
                ` или цифры, например: "CreateTableUsers"`,
        );
    }
    const fullName = join(__dirname, 'migrations', name);
    await pexec(makeCommand(fullName));
})().catch((e: Error) => {
    console.log(`Ошибка при создании новой миграции`);
    console.error(e.message);
    process.exit(1);
});
