import {cp, readFile, writeFile} from 'fs/promises';

const [, , nextVersion] = process.argv;
const packageJson = JSON.parse(await readFile('./package.json'));

function toJsonString(object) {
	return JSON.stringify(object, null, '  ');
}

if (nextVersion !== undefined) {
	packageJson.version = nextVersion;
	await writeFile('./package.json', `${toJsonString(packageJson)}\n`);
}

delete packageJson.devDependencies;
delete packageJson.private;

await Promise.all([
	await cp('.gitignore', './dist/.gitignore'),
	await new Promise((resolve, reject) => {
		cp('CHANGELOG.md', './dist/CHANGELOG.md').then(resolve).catch((error) => {
			if (error.code === 'ENOENT') {
				resolve();
			} else {
				reject(error);
			}
		});
	}),
	await cp('LICENSE', './dist/LICENSE'),
	await writeFile('./dist/package.json', `${toJsonString(packageJson)}\n`),
	await cp('README.md', './dist/README.md'),
]);
