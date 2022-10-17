import {jest} from '@jest/globals';
import {Client, File, Game, GameEnum, Mod} from '../dist/index.js';

jest.setTimeout(30000);
let client: Client;

beforeAll(() => {
	// @ts-ignore
	client = new Client(process.env.JEST_CURSEFORGE_API);
});

test('Client constructor throws without api key', () => {
	expect(() => {
		// @ts-ignore
		const badClient = new Client();
	}).toThrow();
});

describe('Game has properties', () => {
	let game;

	beforeAll(async () => {
		game = await client.getGame(GameEnum.Minecraft);
	});

	test('game is Game', async () => {
		expect(game).toBeInstanceOf(Game);
	});
	test('game id is number', async () => {
		expect(typeof game.id).toBe('number');
	});
	test('game dateModified is Date', async () => {
		expect(game.dateModified).toBeInstanceOf(Date);
	});
	test('game status is number', async () => {
		expect(typeof game.status).toBe('number');
	});
});

describe('getGames finds games', () => {
	let games;

	beforeAll(async () => {
		games = await client.getGames();
	});

	test('data property is object', async () => {
		expect(typeof games.data).toBe('object');
	});
	test('finds at least 10 games', async () => {
		expect(games.data.length).toBeGreaterThanOrEqual(10);
	});
	test('has pagination data', async () => {
		expect(games.pagination).toBe('object');
	});
	test('pagination shows result count', async () => {
		expect(games.pagination.resultCount).toBe(games.data.length);
	});
});

test('getGame finds Minecraft', async () => {
	const game = await client.getGame(GameEnum.Minecraft);

	expect(game.name).toBe('Minecraft');
});

test('getVersions finds versions', async () => {
	const versionTypes = await client.getVersions(GameEnum.Minecraft);

	expect(typeof versionTypes).toBe('object');
	expect(versionTypes.length).toBeGreaterThanOrEqual(10);
	expect(typeof versionTypes[0].type).toBe('number');
	expect(typeof versionTypes[0].versions).toBe('object');
	expect(versionTypes[0].versions.length).toBeGreaterThanOrEqual(0);
	expect(typeof versionTypes[0].versions[0]).toBe('string');
});

test('getVersionTypes finds versions', async () => {
	const types = await client.getVersionTypes(GameEnum.Minecraft);

	expect(typeof types).toBe('object');
	expect(types.length).toBeGreaterThanOrEqual(1);
	expect(typeof types[0].id).toBe('number');
	expect(typeof types[0].name).toBe('string');
});

test('getCategories finds categories', async () => {
	const categories = await client.getCategories(GameEnum.Minecraft);

	expect(typeof categories).toBe('object');
	expect(categories.length).toBeGreaterThanOrEqual(10);
	expect(typeof categories[0].id).toBe('number');
	expect(typeof categories[0].name).toBe('string');
});

describe('Mod has properties', () => {
	let mod;

	beforeAll(async () => {
		mod = await client.getMod(238222);
	});

	test('mod is Mod', async () => {
		expect(mod).toBeInstanceOf(Mod);
	});
	test('mod id is number', async () => {
		expect(typeof mod.id).toBe('number');
	});
	test('mod dateCreated is Date', async () => {
		expect(mod.dateCreated).toBeInstanceOf(Date);
	});
	test('mod latestFiles is object', async () => {
		expect(typeof mod.latestFiles).toBe('object');
	});
});

test('searchMods finds jei', async () => {
	const mods = await client.searchMods(GameEnum.Minecraft, {slug: 'jei'});

	expect(mods.data[0].name).toBe('Just Enough Items (JEI)');
});

test('getMod finds jei', async () => {
	const mod = await client.getMod(238222);

	expect(mod.name).toBe('Just Enough Items (JEI)');
});

test('getMods finds jei', async () => {
	const mods = await client.getMods([238222]);

	expect(mods[0].name).toBe('Just Enough Items (JEI)');
});

test('getFeaturedMods finds mods', async () => {
	const mods = await client.getFeaturedMods({
		gameId: GameEnum.Minecraft,
		excludedModIds: [],
	});

	expect(typeof mods.featured[0].name).toBe('string');
	expect(typeof mods.popular[0].dateCreated).toBe('object');
	expect(typeof mods.recentlyUpdated[0].downloadCount).toBe('number');
});

test('getModDescription finds text', async () => {
	const description = await client.getModDescription(238222);

	expect(typeof description).toBe('string');
});

describe('File has properties', () => {
	let file;

	beforeAll(async () => {
		file = await client.getModFile(238222, 3847103);
	});

	test('mod is File', async () => {
		expect(file).toBeInstanceOf(File);
	});
	test('mod id is number', async () => {
		expect(typeof file.id).toBe('number');
	});
	test('mod dateCreated is Date', async () => {
		expect(file.dateCreated).toBeInstanceOf(Date);
	});
	test('mod latestFiles is object', async () => {
		expect(typeof file.latestFiles).toBe('object');
	});
});

test('getModFile finds file', async () => {
	const file = await client.getModFile(238222, 3847103);

	expect(file.displayName).toBe('jei-1.18.2-9.7.0.209.jar');
});

test('getModFiles finds files', async () => {
	const file = await client.getModFiles(328085, {
		gameVersion: '1.18.2',
		modLoaderType: 1,
		pageSize: 1,
	});

	expect(file.data[0].displayName).toBe(' Create 1.18.2 v0.5.0c');
});

test('getFiles finds files', async () => {
	const file = await client.getFiles([3872145]);

	expect(file[0].displayName).toBe(' Create 1.18.2 v0.5.0c');
});

test('getModFileChangelog returns string', async () => {
	const changelog = await client.getModFileChangelog(328085, 3872145);

	expect(typeof changelog).toBe('string');
});

test('getModFileDownloadURL returns string', async () => {
	const url = await client.getModFileDownloadURL(328085, 3872145);

	expect(typeof url).toBe('string');
});

test('getFingerprintsMatches finds files', async () => {
	const matchesResult = await client.getFingerprintsMatches([3652023177]);

	expect(typeof matchesResult.exactMatches[0].file.getDownloadURL).toBe('function');
});

test('getFingerprintsFuzzyMatches returns array', async () => {
	const matchesResult = await client.getFingerprintsFuzzyMatches({
		gameId: GameEnum.Minecraft,
		fingerprints: [
			{
				foldername: 'META-INF',
				fingerprints: [2558943843],
			},
		],
	});

	expect(typeof matchesResult).toBe('object');
});

test('getMinecraftVersions returns versions', async () => {
	const versions = await client.getMinecraftVersions();

	expect(versions.length).toBeGreaterThanOrEqual(10);
});
