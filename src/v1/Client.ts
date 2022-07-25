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

export default class CurseForgeClient {
	#apiHost = 'https://api.curseforge.com';
	#apiKey: string;
	#fetch: (...args: any[]) => Promise<any>;
	static #dateRegex = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/;

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

	#getArrayResponse<T>(CurseForgeType: CurseForgeClass, data: Record<string, any>): T[] {
		return data.map((rawResponse: any) => {
			return new CurseForgeType(this, rawResponse);
		});
	}

	#getPaginatedResponse<T>(CurseForgeType: CurseForgeClass, data: Record<string, any>): CurseForgePaginatedResponse<T> {
		return {
			pagination: data.pagination,
			data: this.#getArrayResponse<T>(CurseForgeType, data.data),
		};
	}

	async getGames(options?: CurseForgeGetGamesOptions) {
		const data = await this.fetchUrl('/v1/games', {query: options as CurseForgeFetchQuery}) as CurseForgeGetGamesResponseRaw;

		return this.#getPaginatedResponse<CurseForgeGame>(CurseForgeGame, data);
	}

	async getGame(gameId: number) {
		const data = await this.fetchUrl(`/v1/games/${gameId}`) as CurseForgeGetGameResponseRaw;

		return new CurseForgeGame(this, data.data);
	}

	async getVersions(gameId: number) {
		const data = await this.fetchUrl(`/v1/games/${gameId}/versions`) as CurseForgeGetVersionsResponseRaw;

		return data.data;
	}

	async getVersionTypes(gameId: number) {
		const {data} = await this.fetchUrl(`/v1/games/${gameId}/version-types`) as CurseForgeGetVersionTypesResponseRaw;

		return data;
	}

	async getCategories(gameId: number, options?: CurseForgeGetCategoriesOptions) {
		const {data} = await this.fetchUrl('/v1/categories', {query: {
			gameId,
			...options,
		} as CurseForgeFetchQuery}) as CurseForgeGetCategoriesResponseRaw;

		return data;
	}

	async searchMods(gameId: number, options?: CurseForgeSearchModsOptions) {
		const data = await this.fetchUrl('/v1/mods/search', {query: {
			gameId,
			...options,
		} as CurseForgeFetchQuery}) as CurseForgeSearchModsResponseRaw;

		return this.#getPaginatedResponse<CurseForgeMod>(CurseForgeMod, data);
	}

	async getMod(modId: number) {
		const {data} = await this.fetchUrl(`/v1/mods/${modId}`) as CurseForgeGetModResponseRaw;

		return new CurseForgeMod(this, data);
	}

	async getMods(modIds: number[]) {
		const {data} = await this.fetchUrl('/v1/mods', {
			body: JSON.stringify({modIds}),
		}) as CurseForgeGetModsResponseRaw;

		return this.#getArrayResponse<CurseForgeMod>(CurseForgeMod, data);
	}

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

	async getModDescription(modId: number) {
		const {data} = await this.fetchUrl(`/v1/mods/${modId}/description`) as CurseForgeStringResponseRaw;

		return data;
	}

	async getModFile(modId: number, fileId: number) {
		const {data} = await this.fetchUrl(`/v1/mods/${modId}/files/${fileId}`) as CurseForgeGetModFileResponseRaw;

		return new CurseForgeFile(this, data);
	}

	async getModFiles(modId: number, options?: CurseForgeGetModFilesOptions) {
		const data = await this.fetchUrl(`/v1/mods/${modId}/files`, {query: options as CurseForgeFetchQuery}) as CurseForgeGetModFilesResponseRaw;

		return this.#getPaginatedResponse<CurseForgeFile>(CurseForgeFile, data);
	}

	async getFiles(fileIds: number[]) {
		const {data} = await this.fetchUrl('/v1/mods/files', {
			body: JSON.stringify({fileIds}),
		}) as CurseForgeGetFilesResponseRaw;

		return this.#getArrayResponse<CurseForgeFile>(CurseForgeFile, data);
	}

	async getModFileChangelog(modId: number, fileId: number) {
		const {data} = await this.fetchUrl(`/v1/mods/${modId}/files/${fileId}/changelog`) as CurseForgeStringResponseRaw;

		return data;
	}

	async getModFileDownloadURL(modId: number, fileId: number) {
		const {data} = await this.fetchUrl(`/v1/mods/${modId}/files/${fileId}/download-url`) as CurseForgeStringResponseRaw;

		return data;
	}

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

	async getMinecraftVersions(options?: CurseForgeGetMinecraftVersionsOptions) {
		const {data} = await this.fetchUrl('/v1/minecraft/version', {query: options as CurseForgeFetchQuery}) as CurseForgeApiResponseOfListOfMinecraftGameVersion;

		return data;
	}

	async getSpecificMinecraftVersion(gameVersionString: string) {
		const {data} = await this.fetchUrl(`/v1/minecraft/version/${gameVersionString}`) as CurseForgeApiResponseOfMinecraftGameVersion;

		return data;
	}

	async getMinecraftModLoaders(options?: CurseForgeGetMinecraftModLoadersOptions) {
		const {data} = await this.fetchUrl('/v1/minecraft/modloader', {query: options as CurseForgeFetchQuery}) as CurseForgeApiResponseOfListOfMinecraftModLoaderIndex;

		return data;
	}

	async getSpecificMinecraftModLoader(modLoaderName: string) {
		const {data} = await this.fetchUrl(`/v1/minecraft/modloader/${modLoaderName}`) as CurseForgeApiResponseOfMinecraftModLoaderVersion;

		return data;
	}
}
