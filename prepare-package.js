import {cp, readFile, writeFile} from 'fs/promises';

const packageJson = JSON.parse(await readFile('package.json'));
delete packageJson.devDependencies;
delete packageJson.private;

await Promise.all([
	await cp('LICENSE', './dist/LICENSE'),
	await writeFile('./dist/package.json', JSON.stringify(packageJson)),
	await cp('README.md', './dist/README.md'),
]);
