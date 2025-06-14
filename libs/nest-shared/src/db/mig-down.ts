/**
 * Производит откат N миграций
 *
 * Количество указывается параметром командной строки, по умолчанию: 1
 */
import { exec } from 'node:child_process';
import { join } from 'node:path';
import { promisify } from 'node:util';

const pexec = promisify(exec);

const dataSourcePath = join(__dirname, 'data-source.ts');

const makeCommand = () => `npm run typeorm migration:revert -- -d "${dataSourcePath}"`;

(async () => {
    const arg = process.argv[2] ?? '';
    const steps = /^\d+$/.test(arg) ? Number(arg) : 1;
    const migString = `миграци${steps == 1 ? 'и' : 'й'}`;
    console.log(`\nПроизводим откат [${steps}] ${migString}\n`);
    const cmd = makeCommand();
    for (let i = 0; i < steps; i++) {
        const { stdout } = await pexec(cmd);
        console.log(stdout);
        console.log(`№ миграции: ${i + 1}`);
    }
    console.log(`\nОткат [${steps}] ${migString} прошёл успешно\n`);
})().catch((e: any) => {
    console.log(`Ошибка при откате миграций`);
    if (e.stdout) {
        console.error(e.stdout);
    }
    console.error(e.message);
    process.exit(1);
});
