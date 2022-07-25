/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

import {CurseForgeModLoaderType, CurseForgeModsSearchSortField, CurseForgeSortOrder} from './Types.js';

export interface CurseForgeGetGamesOptions {
	/** A zero based index of the first item to include in the response,. */
	index?: number,
	/** The number of items to include in the response,. */
	pageSize?: number,
}

export interface CurseForgeGetCategoriesOptions {
	/** A class unique id. */
	classId?: number,
}

export interface CurseForgeSearchModsOptions {
	/** Filter by section id (discoverable via Categories). */
	classId?: number,
	/** Filter by category id. */
	categoryId?: number,
	/** Filter by game version string. */
	gameVersion?: string,
	/** Filter by free text search in the mod name and author. */
	searchFilter?: string,
	/** Filter by ModsSearchSortField enumeration. */
	sortField?: CurseForgeModsSearchSortField,
	/** 'asc' if sort is in ascending order, 'desc' if sort is in descending order. */
	sortOrder?: CurseForgeSortOrder,
	/** Filter only mods associated to a given modloader (Forge, Fabric ...). Must be coupled with gameVersion. */
	modLoaderType?: CurseForgeModLoaderType,
	/** Filter only mods that contain files tagged with versions of the given gameVersionTypeId. */
	gameVersionTypeId?: number,
	/** Filter by slug (coupled with classId will result in a unique result). */
	slug?: string,
	/** A zero based index of the first item to include in the response,. */
	index?: number,
	/** The number of items to include in the response,. */
	pageSize?: number,
}

export interface CurseForgeGetModFileOptions {
	/** The mod id the file belongs to. */
	modId: number,
	/** The file id. */
	fileId: number,
}

export interface CurseForgeGetModFilesOptions {
	/** Filter by game version string. */
	gameVersion?: string,
	/** ModLoaderType enumeration. */
	modLoaderType?: CurseForgeModLoaderType,
	/** Filter only files that are tagged with versions of the given gameVersionTypeId. */
	gameVersionTypeId?: number,
	/** A zero based index of the first item to include in the response,. */
	index?: number,
	/** The number of items to include in the response,. */
	pageSize?: number,
}

export interface CurseForgeGetModFileChangelogOptions {
	/** The mod id the file belongs to. */
	modId: number,
	/** The file id. */
	fileId: number,
}

export interface CurseForgeGetModFileDownloadURLOptions {
	/** The mod id the file belongs to. */
	modId: number,
	/** The file id. */
	fileId: number,
}

export interface CurseForgeGetMinecraftVersionsOptions {
	sortDescending?: boolean,
}

export interface CurseForgeGetMinecraftModLoadersOptions {
	version?: string,
	includeAll?: boolean,
}
