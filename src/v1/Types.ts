/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

export interface CurseForgeApiResponseOfListOfMinecraftGameVersion {
	/** The response data. */
	data: CurseForgeMinecraftGameVersion[],
}

export interface CurseForgeApiResponseOfListOfMinecraftModLoaderIndex {
	/** The response data. */
	data: CurseForgeMinecraftModLoaderIndex[],
}

export interface CurseForgeApiResponseOfMinecraftGameVersion {
	/** The response data. */
	data: CurseForgeMinecraftGameVersion,
}

export interface CurseForgeApiResponseOfMinecraftModLoaderVersion {
	/** The response data. */
	data: CurseForgeMinecraftModLoaderVersion,
}

export interface CurseForgeCategory {
	/** The category id. */
	id: number,
	/** The game id related to the category. */
	gameId: number,
	/** Category name. */
	name: string,
	/** The category slug as it appear in the URL. */
	slug: string,
	/** The category URL. */
	url: string,
	/** URL for the category icon. */
	iconUrl: string,
	/** Last modified date of the category. */
	dateModified: Date,
	/** A top level category for other categories. */
	isClass?: boolean,
	/** The class id of the category, meaning - the class of which this category is under. */
	classId?: number,
	/** The parent category for this category. */
	parentCategoryId?: number,
	/** The display index for this category. */
	displayIndex?: number,
}

export enum CurseForgeCoreApiStatus {
	Private = 1,
	Public = 2,
}

export enum CurseForgeCoreStatus {
	Draft = 1,
	Test = 2,
	PendingReview = 3,
	Rejected = 4,
	Approved = 5,
	Live = 6,
}

export interface CurseForgeFeaturedModsResponse {
	featured: CurseForgeModRaw[],
	popular: CurseForgeModRaw[],
	recentlyUpdated: CurseForgeModRaw[],
}

export interface CurseForgeFileRaw {
	/** The file id. */
	id: number,
	/** The game id related to the mod that this file belongs to. */
	gameId: number,
	/** The mod id. */
	modId: number,
	/** Whether the file is available to download. */
	isAvailable: boolean,
	/** Display name of the file. */
	displayName: string,
	/** Exact file name. */
	fileName: string,
	/** The file release type. */
	releaseType: CurseForgeFileReleaseType,
	/** Status of the file. */
	fileStatus: CurseForgeFileStatus,
	/** The file hash (i.e. md5 or sha1). */
	hashes: CurseForgeFileHash[],
	/** The file timestamp. */
	fileDate: Date,
	/** The file length in bytes. */
	fileLength: number,
	/** The number of downloads for the file. */
	downloadCount: number,
	/** The file download URL. */
	downloadUrl: string,
	/** List of game versions this file is relevant for. */
	gameVersions: string[],
	/** Metadata used for sorting by game versions. */
	sortableGameVersions: CurseForgeSortableGameVersion[],
	/** List of dependencies files. */
	dependencies: CurseForgeFileDependency[],
	exposeAsAlternative?: boolean,
	parentProjectFileId?: number,
	alternateFileId?: number,
	isServerPack?: boolean,
	serverPackFileId?: number,
	fileFingerprint: number,
	modules: CurseForgeFileModule[],
}

export interface CurseForgeFileDependency {
	modId: number,
	relationType: CurseForgeFileRelationType,
}

export interface CurseForgeFileHash {
	value: string,
	algo: CurseForgeHashAlgo,
}

export interface CurseForgeFileIndex {
	gameVersion: string,
	fileId: number,
	filename: string,
	releaseType: CurseForgeFileReleaseType,
	gameVersionTypeId?: number,
	modLoader: CurseForgeModLoaderType,
}

export interface CurseForgeFileModule {
	name: string,
	fingerprint: number,
}

export enum CurseForgeFileRelationType {
	EmbeddedLibrary = 1,
	OptionalDependency = 2,
	RequiredDependency = 3,
	Tool = 4,
	Incompatible = 5,
	Include = 6,
}

export enum CurseForgeFileReleaseType {
	Release = 1,
	Beta = 2,
	Alpha = 3,
}

export enum CurseForgeFileStatus {
	Processing = 1,
	ChangesRequired = 2,
	UnderReview = 3,
	Approved = 4,
	Rejected = 5,
	MalwareDetected = 6,
	Deleted = 7,
	Archived = 8,
	Testing = 9,
	Released = 10,
	ReadyForReview = 11,
	Deprecated = 12,
	Baking = 13,
	AwaitingPublishing = 14,
	FailedPublishing = 15,
}

export interface CurseForgeFingerprintFuzzyMatchRaw {
	id: number,
	file: CurseForgeFileRaw,
	latestFiles: CurseForgeFileRaw[],
	fingerprints: number[],
}

export interface CurseForgeFingerprintFuzzyMatchResult {
	fuzzyMatches: CurseForgeFingerprintFuzzyMatchRaw[],
}

export interface CurseForgeFingerprintMatchRaw {
	id: number,
	file: CurseForgeFileRaw,
	latestFiles: CurseForgeFileRaw[],
}

export interface CurseForgeFingerprintsMatchesResult {
	isCacheBuilt: boolean,
	exactMatches: CurseForgeFingerprintMatchRaw[],
	exactFingerprints: number[],
	partialMatches: CurseForgeFingerprintMatchRaw[],
	partialMatchFingerprints: object,
	additionalProperties: number[],
	installedFingerprints: number[],
	unmatchedFingerprints: number[],
}

export interface CurseForgeFolderFingerprint {
	foldername: string,
	fingerprints: number[],
}

export interface CurseForgeGameRaw {
	id: number,
	name: string,
	slug: string,
	dateModified: Date,
	assets: CurseForgeGameAssets,
	status: CurseForgeCoreStatus,
	apiStatus: CurseForgeCoreApiStatus,
}

export interface CurseForgeGameAssets {
	iconUrl: string,
	tileUrl: string,
	coverUrl: string,
}

export interface CurseForgeGameVersionsByType {
	type: number,
	versions: string[],
}

export enum CurseForgeGameVersionStatus {
	Approved = 1,
	Deleted = 2,
	New = 3,
}

export interface CurseForgeGameVersionType {
	id: number,
	gameId: number,
	name: string,
	slug: string,
}

export enum CurseForgeGameVersionTypeStatus {
	Normal = 1,
	Deleted = 2,
}

export interface CurseForgeGetCategoriesResponseRaw {
	/** The response data. */
	data: CurseForgeCategory[],
}

export interface CurseForgeGetFeaturedModsResponseRaw {
	/** The response data. */
	data: CurseForgeFeaturedModsResponse,
}

export interface CurseForgeGetFilesResponseRaw {
	/** The response data. */
	data: CurseForgeFileRaw[],
}

export interface CurseForgeGetFingerprintMatchesResponseRaw {
	/** The response data. */
	data: CurseForgeFingerprintsMatchesResult,
}

export interface CurseForgeGetFingerprintsFuzzyMatchesResponseRaw {
	/** The response data. */
	data: CurseForgeFingerprintFuzzyMatchResult,
}

export interface CurseForgeGetGameResponseRaw {
	/** The response data. */
	data: CurseForgeGameRaw,
}

export interface CurseForgeGetGamesResponseRaw {
	/** The response data. */
	data: CurseForgeGameRaw[],
	/** The response pagination information. */
	pagination: CurseForgePagination,
}

export interface CurseForgeGetModFileResponseRaw {
	/** The response data. */
	data: CurseForgeFileRaw,
}

export interface CurseForgeGetModFilesResponseRaw {
	/** The response data. */
	data: CurseForgeFileRaw[],
	/** The response pagination information. */
	pagination: CurseForgePagination,
}

export interface CurseForgeGetModResponseRaw {
	/** The response data. */
	data: CurseForgeModRaw,
}

export interface CurseForgeGetModsResponseRaw {
	/** The response data. */
	data: CurseForgeModRaw[],
}

export interface CurseForgeGetVersionTypesResponseRaw {
	/** The response data. */
	data: CurseForgeGameVersionType[],
}

export interface CurseForgeGetVersionsResponseRaw {
	/** The response data. */
	data: CurseForgeGameVersionsByType[],
}

export interface CurseForgeGetFeaturedModsRequestBody {
	gameId: number,
	excludedModIds: number[],
	gameVersionTypeId?: number,
}

export interface CurseForgeGetFingerprintMatchesRequestBody {
	fingerprints: number[],
}

export interface CurseForgeGetFuzzyMatchesRequestBody {
	gameId: number,
	fingerprints: CurseForgeFolderFingerprint[],
}

export interface CurseForgeGetModFilesRequestBody {
	fileIds: number[],
}

export interface CurseForgeGetModsByIdsListRequestBody {
	modIds: number[],
}

export enum CurseForgeHashAlgo {
	Sha1 = 1,
	Md5 = 2,
}

export interface CurseForgeMinecraftGameVersion {
	id: number,
	gameVersionId: number,
	versionString: string,
	jarDownloadUrl: string,
	jsonDownloadUrl: string,
	approved: boolean,
	dateModified: Date,
	gameVersionTypeId: number,
	gameVersionStatus: CurseForgeGameVersionStatus,
	gameVersionTypeStatus: CurseForgeGameVersionTypeStatus,
}

export interface CurseForgeMinecraftModLoaderIndex {
	name: string,
	gameVersion: string,
	latest: boolean,
	recommended: boolean,
	dateModified: Date,
	type: CurseForgeModLoaderType,
}

export interface CurseForgeMinecraftModLoaderVersion {
	id: number,
	gameVersionId: number,
	minecraftGameVersionId: number,
	forgeVersion: string,
	name: string,
	type: CurseForgeModLoaderType,
	downloadUrl: string,
	filename: string,
	installMethod: CurseForgeModLoaderInstallMethod,
	latest: boolean,
	recommended: boolean,
	approved: boolean,
	dateModified: Date,
	mavenVersionString: string,
	versionJson: string,
	librariesInstallLocation: string,
	minecraftVersion: string,
	additionalFilesJson: string,
	modLoaderGameVersionId: number,
	modLoaderGameVersionTypeId: number,
	modLoaderGameVersionStatus: CurseForgeGameVersionStatus,
	modLoaderGameVersionTypeStatus: CurseForgeGameVersionTypeStatus,
	mcGameVersionId: number,
	mcGameVersionTypeId: number,
	mcGameVersionStatus: CurseForgeGameVersionStatus,
	mcGameVersionTypeStatus: CurseForgeGameVersionTypeStatus,
	installProfileJson: string,
}

export interface CurseForgeModRaw {
	/** The mod id. */
	id: number,
	/** The game id this mod is for. */
	gameId: number,
	/** The name of the mod. */
	name: string,
	/** The mod slug that would appear in the URL. */
	slug: string,
	/** Relevant links for the mod such as Issue tracker and Wiki. */
	links: CurseForgeModLinks,
	/** Mod summary. */
	summary: string,
	/** Current mod status. */
	status: CurseForgeModStatus,
	/** Number of downloads for the mod. */
	downloadCount: number,
	/** Whether the mod is included in the featured mods list. */
	isFeatured: boolean,
	/** The main category of the mod as it was chosen by the mod author. */
	primaryCategoryId: number,
	/** List of categories that this mod is related to. */
	categories: CurseForgeCategory[],
	/** The class id this mod belongs to. */
	classId?: number,
	/** List of the mod's authors. */
	authors: CurseForgeModAuthor[],
	/** The mod's logo asset. */
	logo: CurseForgeModAsset,
	/** List of screenshots assets. */
	screenshots: CurseForgeModAsset[],
	/** The id of the main file of the mod. */
	mainFileId: number,
	/** List of latest files of the mod. */
	latestFiles: CurseForgeFileRaw[],
	/** List of file related details for the latest files of the mod. */
	latestFilesIndexes: CurseForgeFileIndex[],
	/** The creation date of the mod. */
	dateCreated: Date,
	/** The last time the mod was modified. */
	dateModified: Date,
	/** The release date of the mod. */
	dateReleased: Date,
	/** Is mod allowed to be distributed. */
	allowModDistribution?: boolean,
	/** The mod popularity rank for the game. */
	gamePopularityRank: number,
	/** Is the mod available for search. This can be false when a mod is experimental, in a deleted state or has only alpha files. */
	isAvailable: boolean,
	/** The mod's thumbs up count. */
	thumbsUpCount: number,
}

export interface CurseForgeModAsset {
	id: number,
	modId: number,
	title: string,
	description: string,
	thumbnailUrl: string,
	url: string,
}

export interface CurseForgeModAuthor {
	id: number,
	name: string,
	url: string,
}

export interface CurseForgeModLinks {
	websiteUrl: string,
	wikiUrl: string,
	issuesUrl: string,
	sourceUrl: string,
}

export enum CurseForgeModLoaderInstallMethod {
	ForgeInstaller = 1,
	ForgeJarInstall = 2,
	ForgeInstaller_v2 = 3,
}

export enum CurseForgeModLoaderType {
	Any = 0,
	Forge = 1,
	Cauldron = 2,
	LiteLoader = 3,
	Fabric = 4,
	Quilt = 5,
}

export enum CurseForgeModsSearchSortField {
	Featured = 1,
	Popularity = 2,
	LastUpdated = 3,
	Name = 4,
	Author = 5,
	TotalDownloads = 6,
	Category = 7,
	GameVersion = 8,
}

export enum CurseForgeModStatus {
	New = 1,
	ChangesRequired = 2,
	UnderSoftReview = 3,
	Approved = 4,
	Rejected = 5,
	ChangesMade = 6,
	Inactive = 7,
	Abandoned = 8,
	Deleted = 9,
	UnderReview = 10,
}

export interface CurseForgePagination {
	/** A zero based index of the first item that is included in the response. */
	index: number,
	/** The requested number of items to be included in the response. */
	pageSize: number,
	/** The actual number of items that were included in the response. */
	resultCount: number,
	/** The total number of items available by the request. */
	totalCount: number,
}

export interface CurseForgeSearchModsResponseRaw {
	/** The response data. */
	data: CurseForgeModRaw[],
	/** The response pagination information. */
	pagination: CurseForgePagination,
}

export interface CurseForgeSortableGameVersion {
	/** Original version name (e.g. 1.5b). */
	gameVersionName: string,
	/** Used for sorting (e.g. 0000000001.0000000005). */
	gameVersionPadded: string,
	/** Game version clean name (e.g. 1.5). */
	gameVersion: string,
	/** Game version release date. */
	gameVersionReleaseDate: Date,
	/** Game version type id. */
	gameVersionTypeId?: number,
}

export enum CurseForgeSortOrder {
	Ascending = 'asc',
	Descending = 'desc',
}

export interface CurseForgeStringResponseRaw {
	/** The response data. */
	data: string,
}
