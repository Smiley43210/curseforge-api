/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import {ModLoaderType, ModsSearchSortField, SortOrder} from './Types.js';

export interface GetGamesOptions {
	/** A zero based index of the first item to include in the response,. */
	index?: number,
	/** The number of items to include in the response,. */
	pageSize?: number,
}

export interface GetCategoriesOptions {
	/** A class unique id. */
	classId?: number,
	/** A flag used with gameId to return only classes. */
	classesOnly?: boolean,
}

export interface SearchModsOptions {
	/** Filter by section id (discoverable via Categories). */
	classId?: number,
	/** Filter by category id. */
	categoryId?: number,
	/** Filter by game version string. */
	gameVersion?: string,
	/** Filter by free text search in the mod name and author. */
	searchFilter?: string,
	/** Filter by ModsSearchSortField enumeration. */
	sortField?: ModsSearchSortField,
	/** 'asc' if sort is in ascending order, 'desc' if sort is in descending order. */
	sortOrder?: SortOrder,
	/** Filter only mods associated to a given modloader (Forge, Fabric ...). Must be coupled with gameVersion. */
	modLoaderType?: ModLoaderType,
	/** Filter only mods that contain files tagged with versions of the given gameVersionTypeId. */
	gameVersionTypeId?: number,
	/** Filter by slug (coupled with classId will result in a unique result). */
	slug?: string,
	/** A zero based index of the first item to include in the response,. */
	index?: number,
	/** The number of items to include in the response,. */
	pageSize?: number,
}

export interface GetModFileOptions {
	/** The mod id the file belongs to. */
	modId: number,
	/** The file id. */
	fileId: number,
}

export interface GetModFilesOptions {
	/** Filter by game version string. */
	gameVersion?: string,
	/** ModLoaderType enumeration. */
	modLoaderType?: ModLoaderType,
	/** Filter only files that are tagged with versions of the given gameVersionTypeId. */
	gameVersionTypeId?: number,
	/** A zero based index of the first item to include in the response,. */
	index?: number,
	/** The number of items to include in the response,. */
	pageSize?: number,
}

export interface GetModFileChangelogOptions {
	/** The mod id the file belongs to. */
	modId: number,
	/** The file id. */
	fileId: number,
}

export interface GetModFileDownloadURLOptions {
	/** The mod id the file belongs to. */
	modId: number,
	/** The file id. */
	fileId: number,
}

export interface GetMinecraftVersionsOptions {
	sortDescending?: boolean,
}

export interface GetMinecraftModLoadersOptions {
	version?: string,
	includeAll?: boolean,
}
