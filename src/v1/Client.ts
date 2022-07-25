import CurseForgeFile from './File.js';
import CurseForgeGame from './Game.js';
import CurseForgeMod from './Mod.js';
import {CurseForgeGetCategoriesOptions, CurseForgeGetGamesOptions, CurseForgeGetMinecraftModLoadersOptions, CurseForgeGetMinecraftVersionsOptions, CurseForgeGetModFilesOptions, CurseForgeSearchModsOptions} from './Options.js';
import {CurseForgeApiResponseOfListOfMinecraftGameVersion, CurseForgeApiResponseOfListOfMinecraftModLoaderIndex, CurseForgeApiResponseOfMinecraftGameVersion, CurseForgeApiResponseOfMinecraftModLoaderVersion, CurseForgeFingerprintFuzzyMatchRaw, CurseForgeFingerprintMatchRaw, CurseForgeFingerprintsMatchesResult, CurseForgeGetCategoriesResponseRaw, CurseForgeGetFeaturedModsRequestBody, CurseForgeGetFeaturedModsResponseRaw, CurseForgeGetFilesResponseRaw, CurseForgeGetFingerprintMatchesResponseRaw, CurseForgeGetFingerprintsFuzzyMatchesResponseRaw, CurseForgeGetFuzzyMatchesRequestBody, CurseForgeGetGameResponseRaw, CurseForgeGetGamesResponseRaw, CurseForgeGetModFileResponseRaw, CurseForgeGetModFilesResponseRaw, CurseForgeGetModResponseRaw, CurseForgeGetModsResponseRaw, CurseForgeGetVersionsResponseRaw, CurseForgeGetVersionTypesResponseRaw, CurseForgePagination, CurseForgeSearchModsResponseRaw, CurseForgeStringResponseRaw} from './Types.js';

export type CurseForgeClass = typeof CurseForgeFile | typeof CurseForgeGame | typeof CurseForgeMod;

export type CurseForgeFetchQuery = Record<string, boolean | number | string>;

// Temporary fetch() typing until supported by @types/node
export interface NodeJSFetchOptions {
	/** A BodyInit object or null to set request's body. */
    body?: string | null;
    /** A string indicating how the request will interact with the browser's cache to set request's cache. */
    cache?: 'default' | 'force-cache' | 'no-cache' | 'no-store' | 'only-if-cached' | 'reload';
    /** A string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL. Sets request's credentials. */
    credentials?: 'include' | 'omit' | 'same-origin';
    /** A Headers object, an object literal, or an array of two-item arrays to set request's headers. */
    headers?: string[][] | Record<string, string>;
    /** A cryptographic hash of the resource to be fetched by request. Sets request's integrity. */
    integrity?: string;
    /** A boolean to set request's keepalive. */
    keepalive?: boolean;
    /** A string to set request's method. */
    method?: string;
    /** A string to indicate whether the request will use CORS, or will be restricted to same-origin URLs. Sets request's mode. */
    mode?: 'cors' | 'navigate' | 'no-cors' | 'same-origin';
    /** A string indicating whether request follows redirects, results in an error upon encountering a redirect, or returns the redirect (in an opaque fashion). Sets request's redirect. */
    redirect?: 'error' | 'follow' | 'manual';
    /** A string whose value is a same-origin URL, "about:client", or the empty string, to set request's referrer. */
    referrer?: string;
    /** A referrer policy to set request's referrerPolicy. */
    referrerPolicy?: '' | 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
    /** An AbortSignal to set request's signal. */
    signal?: AbortSignal | null;
}

export interface CurseForgeFetchOptions extends NodeJSFetchOptions {
	query?: CurseForgeFetchQuery;
}

export interface CurseForgeResponseErrorOptions {
	/** Request path, excluding the host name. */
	path: string,
	/** Response status code. */
	status: number,
	/** Response status code text. */
	statusText: string,
}

export class CurseForgeResponseError extends Error {
	/** Request path, excluding the host name. */
	path: string;
	/** Response status code. */
	status: number;
	/** Response status code text. */
	statusText: string;

	constructor({path, status, statusText}: CurseForgeResponseErrorOptions) {
		super(`API request to ${path} failed: ${status} (${statusText})`);

		this.path = path;
		this.status = status;
		this.statusText = statusText;
	}
}

export interface CurseForgeClientOptions {
	/** Provide a separate implementation of fetch(). */
	fetch?: (...args: any[]) => Promise<any>,
}

export interface CurseForgePaginatedResponse<T> {
	pagination: CurseForgePagination,
	data: T[],
}

export interface CurseForgeFeaturedMods {
	featured: CurseForgeMod[],
	popular: CurseForgeMod[],
	recentlyUpdated: CurseForgeMod[],
}

export interface CurseForgeFingerprintMatch extends Omit<CurseForgeFingerprintMatchRaw, 'file' | 'latestFiles'> {
	file: CurseForgeFile,
	latestFiles: CurseForgeFile[],
}

export interface CurseForgeFingerprintsMatches extends Omit<CurseForgeFingerprintsMatchesResult, 'exactMatches' | 'partialMatches'> {
	exactMatches: CurseForgeFingerprintMatch[],
	partialMatches: CurseForgeFingerprintMatch[],
}

export interface CurseForgeFingerprintFuzzyMatch extends Omit<CurseForgeFingerprintFuzzyMatchRaw, 'file' | 'latestFiles'> {
	file: CurseForgeFile,
	latestFiles: CurseForgeFile[],
}

/**
 * The main class to interact with the CurseForge Core API.
 */
export default class CurseForgeClient {
	#apiHost = 'https://api.curseforge.com';
	#apiKey: string;
	#fetch: (...args: any[]) => Promise<any>;
	static #dateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

	/**
	 * Constructs a new client to interact with the CurseForge Core API.
	 * @param apiKey Your CurseForge Core API key. An API key can be generated in the CurseForge Core [developer console](https://console.curseforge.com/).
	 * @param options Additional options to define how the client works
	 */
	constructor(apiKey: string, options?: CurseForgeClientOptions) {
		if (typeof apiKey !== 'string') {
			throw new TypeError(`CurseForgeClient constructor expects argument 1 to be string, received ${typeof apiKey}`);
		}

		this.#apiKey = apiKey;

		if (options?.fetch) {
			this.#fetch = options.fetch;
		} else {
			try {
				this.#fetch = fetch;
			} catch {}
		}

		// @ts-ignore Allow #fetch to be undefined, but throw
		if (typeof this.#fetch === 'undefined') {
			throw new TypeError('fetch() is not available in this environment. Please provide an implementation of fetch.');
		}
	}

	/**
	 * Does an in place conversion of date string values into [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) objects.
	 * @param object - The object to convert
	 * @returns The object
	 */
	static #upgrade(object: any) {
		if (object === null || typeof object !== 'object') {
			return object;
		}

		const entries = Object.entries(object);

		for (const [key, value] of entries) {
			if (typeof value === 'string' && value.match(CurseForgeClient.#dateRegex)) {
				object[key] = new Date(value);
			} else if (typeof value === 'object') {
				object[key] = CurseForgeClient.#upgrade(value);
			}
		}

		return object;
	}

	/**
	 * Sends a request to the given API endpoint.
	 * @internal
	 * @param path - The endpoint, excluding the protocol and hostname
	 * @param options - Any options to use in the request
	 * @returns A JSON object containing the API response
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async fetchUrl(path: string, options: CurseForgeFetchOptions = {}) {
		options.headers = {
			...options.headers,
			'x-api-key': this.#apiKey,
		};

		let url = `${this.#apiHost}${path}`;

		if (options.body && options.method === undefined) {
			options.method = 'POST';
			options.headers = {
				...options.headers,
				'Content-Type': 'application/json',
			};
		}

		if (options.query) {
			const entries = Object.entries(options.query);

			if (entries.length > 0) {
				url = `${url}?${entries.map(([key, value]) => {
					return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
				}).join('&')}`;
			}
		}

		const response = await this.#fetch(url, options);

		if (response.status === 200) {
			const data = await response.json();
			return CurseForgeClient.#upgrade(data) as Record<string, any>;
		} else {
			throw new CurseForgeResponseError({
				path,
				status: response.status,
				statusText: response.statusText,
			});
		}
	}

	/**
	 * Creates an array of the given class.
	 * @param CurseForgeType The class of objects to create
	 * @param data The raw API response array data
	 * @returns An array of `CurseForgeType` objects
	 */
	#getArrayResponse<T>(CurseForgeType: CurseForgeClass, data: Record<string, any>): T[] {
		return data.map((rawResponse: any) => {
			return new CurseForgeType(this, rawResponse);
		});
	}

	/**
	 * Creates a paginated response of the given class.
	 * @param CurseForgeType The class of objects to create
	 * @param data The raw paginated API response data
	 * @returns The paginated object containing `CurseForgeType` objects
	 */
	#getPaginatedResponse<T>(CurseForgeType: CurseForgeClass, data: Record<string, any>): CurseForgePaginatedResponse<T> {
		return {
			pagination: data.pagination,
			data: this.#getArrayResponse<T>(CurseForgeType, data.data),
		};
	}

	/**
	 * Get all games that are available to the provided API key.
	 * @param options - The pagination query
	 * @returns A list of games and the pagination information
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getGames(options?: CurseForgeGetGamesOptions) {
		const data = await this.fetchUrl('/v1/games', {query: options as CurseForgeFetchQuery}) as CurseForgeGetGamesResponseRaw;

		return this.#getPaginatedResponse<CurseForgeGame>(CurseForgeGame, data);
	}

	/**
	 * Get a single game. A private game is only accessible by its respective API key.
	 * @param gameId - A game unique id
	 * @returns The game matching the gameId
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getGame(gameId: number) {
		const data = await this.fetchUrl(`/v1/games/${gameId}`) as CurseForgeGetGameResponseRaw;

		return new CurseForgeGame(this, data.data);
	}

	/**
	 * Get all available versions for each known version type of the specified game. A private game is only accessible to its respective API key.
	 * @param gameId - A game unique id
	 * @returns A list of version types and versions
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getVersions(gameId: number) {
		const data = await this.fetchUrl(`/v1/games/${gameId}/versions`) as CurseForgeGetVersionsResponseRaw;

		return data.data;
	}

	/**
	 * Get all available version types of the specified game. A private game is only accessible to its respective API key.
	 * @param gameId - A game unique id
	 * @returns A list of version types
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getVersionTypes(gameId: number) {
		const {data} = await this.fetchUrl(`/v1/games/${gameId}/version-types`) as CurseForgeGetVersionTypesResponseRaw;

		return data;
	}

	/**
	 * Get all available classes and categories of the specified game. Specify a game id for a list of all game categories, or a class id for a list of categories under that class.
	 * @param gameId A game unique id
	 * @param options Additional filters
	 * @returns A list of categories
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getCategories(gameId: number, options?: CurseForgeGetCategoriesOptions) {
		const {data} = await this.fetchUrl('/v1/categories', {query: {
			gameId,
			...options,
		} as CurseForgeFetchQuery}) as CurseForgeGetCategoriesResponseRaw;

		return data;
	}

	/**
	 * Get all mods that match the search criteria.
	 * @param gameId A game unique id
	 * @param options Additional search criteria
	 * @returns A list of mods
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async searchMods(gameId: number, options?: CurseForgeSearchModsOptions) {
		const data = await this.fetchUrl('/v1/mods/search', {query: {
			gameId,
			...options,
		} as CurseForgeFetchQuery}) as CurseForgeSearchModsResponseRaw;

		return this.#getPaginatedResponse<CurseForgeMod>(CurseForgeMod, data);
	}

	/**
	 * Get a single mod.
	 * @param modId The mod id
	 * @returns The mod
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getMod(modId: number) {
		const {data} = await this.fetchUrl(`/v1/mods/${modId}`) as CurseForgeGetModResponseRaw;

		return new CurseForgeMod(this, data);
	}

	/**
	 * Get a list of mods.
	 * @param modIds An array of mod ids
	 * @returns A list of mods
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getMods(modIds: number[]) {
		const {data} = await this.fetchUrl('/v1/mods', {
			body: JSON.stringify({modIds}),
		}) as CurseForgeGetModsResponseRaw;

		return this.#getArrayResponse<CurseForgeMod>(CurseForgeMod, data);
	}

	/**
	 * Get a list of featured, popular and recently updated mods.
	 * @param options Match results for a game and exclude specific mods
	 * @returns A list of featured, popular and recently updated mods
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getFeaturedMods(options: CurseForgeGetFeaturedModsRequestBody): Promise<CurseForgeFeaturedMods> {
		const {data: {featured, popular, recentlyUpdated}} = await this.fetchUrl('/v1/mods/featured', {
			body: JSON.stringify(options),
		}) as CurseForgeGetFeaturedModsResponseRaw;

		return {
			featured: this.#getArrayResponse<CurseForgeMod>(CurseForgeMod, featured),
			popular: this.#getArrayResponse<CurseForgeMod>(CurseForgeMod, popular),
			recentlyUpdated: this.#getArrayResponse<CurseForgeMod>(CurseForgeMod, recentlyUpdated),
		};
	}

	/**
	 * Get the full description of a mod in HTML format.
	 * @param modId The mod id
	 * @returns The HTML description
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getModDescription(modId: number) {
		const {data} = await this.fetchUrl(`/v1/mods/${modId}/description`) as CurseForgeStringResponseRaw;

		return data;
	}

	/**
	 * Get a single file of the specified mod.
	 * @param modId The mod id the file belongs to
	 * @param fileId The file id
	 * @returns The mod file
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getModFile(modId: number, fileId: number) {
		const {data} = await this.fetchUrl(`/v1/mods/${modId}/files/${fileId}`) as CurseForgeGetModFileResponseRaw;

		return new CurseForgeFile(this, data);
	}

	/**
	 * Get all files of the specified mod.
	 * @param modId The mod id the files belong to
	 * @param options Additional search criteria
	 * @returns A list of mods
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getModFiles(modId: number, options?: CurseForgeGetModFilesOptions) {
		const data = await this.fetchUrl(`/v1/mods/${modId}/files`, {query: options as CurseForgeFetchQuery}) as CurseForgeGetModFilesResponseRaw;

		return this.#getPaginatedResponse<CurseForgeFile>(CurseForgeFile, data);
	}

	/**
	 * Get a list of files.
	 * @param fileIds A list of file ids to fetch
	 * @returns A list of files
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getFiles(fileIds: number[]) {
		const {data} = await this.fetchUrl('/v1/mods/files', {
			body: JSON.stringify({fileIds}),
		}) as CurseForgeGetFilesResponseRaw;

		return this.#getArrayResponse<CurseForgeFile>(CurseForgeFile, data);
	}

	/**
	 * Get the changelog of a file in HTML format.
	 * @param modId The mod id the file belongs to
	 * @param fileId The file id
	 * @returns The HTML changelog
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getModFileChangelog(modId: number, fileId: number) {
		const {data} = await this.fetchUrl(`/v1/mods/${modId}/files/${fileId}/changelog`) as CurseForgeStringResponseRaw;

		return data;
	}

	/**
	 * Get a download URL for a specific file.
	 * @param modId The mod id the file belongs to
	 * @param fileId The file id
	 * @returns The URL
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getModFileDownloadURL(modId: number, fileId: number) {
		const {data} = await this.fetchUrl(`/v1/mods/${modId}/files/${fileId}/download-url`) as CurseForgeStringResponseRaw;

		return data;
	}

	/**
	 * 
	 * @param fingerprints An array of fingerprints
	 * @returns A list of mod files
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getFingerprintsMatches(fingerprints: number[]): Promise<CurseForgeFingerprintsMatches> {
		const {data} = await this.fetchUrl('/v1/fingerprints', {
			body: JSON.stringify({fingerprints}),
		}) as CurseForgeGetFingerprintMatchesResponseRaw;

		return {
			...data,
			exactMatches: data.exactMatches.map((exactMatchRaw) => {
				return {
					...exactMatchRaw,
					file: new CurseForgeFile(this, exactMatchRaw.file),
					latestFiles: this.#getArrayResponse<CurseForgeFile>(CurseForgeFile, exactMatchRaw.latestFiles),
				};
			}),
			partialMatches: data.partialMatches.map((partialMatchRaw) => {
				return {
					...partialMatchRaw,
					file: new CurseForgeFile(this, partialMatchRaw.file),
					latestFiles: this.#getArrayResponse<CurseForgeFile>(CurseForgeFile, partialMatchRaw.latestFiles),
				};
			}),
		};
	}

	/**
	 * Get mod files that match a list of fingerprints using fuzzy matching.
	 * @param options Game id and folder fingerprints options for the fuzzy matching
	 * @returns A list of mod files
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getFingerprintsFuzzyMatches(options: CurseForgeGetFuzzyMatchesRequestBody): Promise<CurseForgeFingerprintFuzzyMatch[]> {
		const {data} = await this.fetchUrl('/v1/fingerprints/fuzzy', {
			body: JSON.stringify(options),
		}) as CurseForgeGetFingerprintsFuzzyMatchesResponseRaw;

		return data.fuzzyMatches.map((fuzzyMatchRaw) => {
			return {
				...fuzzyMatchRaw,
				file: new CurseForgeFile(this, fuzzyMatchRaw.file),
				latestFiles: this.#getArrayResponse<CurseForgeFile>(CurseForgeFile, fuzzyMatchRaw.latestFiles),
			};
		});
	}

	/**
	 * 
	 * @param options Sort options
	 * @returns A list of Minecraft game versions
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getMinecraftVersions(options?: CurseForgeGetMinecraftVersionsOptions) {
		const {data} = await this.fetchUrl('/v1/minecraft/version', {query: options as CurseForgeFetchQuery}) as CurseForgeApiResponseOfListOfMinecraftGameVersion;

		return data;
	}

	/**
	 * 
	 * @param gameVersionString 
	 * @returns A Minecraft game version
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	async getSpecificMinecraftVersion(gameVersionString: string) {
		const {data} = await this.fetchUrl(`/v1/minecraft/version/${gameVersionString}`) as CurseForgeApiResponseOfMinecraftGameVersion;

		return data;
	}

	/**
	 * 
	 * @param options Filter options
	 * @returns A list of Minecraft mod loaders
	 */
	async getMinecraftModLoaders(options?: CurseForgeGetMinecraftModLoadersOptions) {
		const {data} = await this.fetchUrl('/v1/minecraft/modloader', {query: options as CurseForgeFetchQuery}) as CurseForgeApiResponseOfListOfMinecraftModLoaderIndex;

		return data;
	}

	/**
	 * 
	 * @param modLoaderName 
	 * @returns A Minecraft mod loader
	 */
	async getSpecificMinecraftModLoader(modLoaderName: string) {
		const {data} = await this.fetchUrl(`/v1/minecraft/modloader/${modLoaderName}`) as CurseForgeApiResponseOfMinecraftModLoaderVersion;

		return data;
	}
}
