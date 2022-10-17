/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

export interface ApiResponseOfListOfMinecraftGameVersion {
	/** The response data. */
	data: MinecraftGameVersion[],
}

export interface ApiResponseOfListOfMinecraftModLoaderIndex {
	/** The response data. */
	data: MinecraftModLoaderIndex[],
}

export interface ApiResponseOfMinecraftGameVersion {
	/** The response data. */
	data: MinecraftGameVersion,
}

export interface ApiResponseOfMinecraftModLoaderVersion {
	/** The response data. */
	data: MinecraftModLoaderVersion,
}

export interface Category {
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

export enum CoreApiStatus {
	Private = 1,
	Public = 2,
}

export enum CoreStatus {
	Draft = 1,
	Test = 2,
	PendingReview = 3,
	Rejected = 4,
	Approved = 5,
	Live = 6,
}

export interface FeaturedModsResponse {
	featured: ModRaw[],
	popular: ModRaw[],
	recentlyUpdated: ModRaw[],
}

export interface FileRaw {
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
	releaseType: FileReleaseType,
	/** Status of the file. */
	fileStatus: FileStatus,
	/** The file hash (i.e. md5 or sha1). */
	hashes: FileHash[],
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
	sortableGameVersions: SortableGameVersion[],
	/** List of dependencies files. */
	dependencies: FileDependency[],
	exposeAsAlternative?: boolean,
	parentProjectFileId?: number,
	alternateFileId?: number,
	isServerPack?: boolean,
	serverPackFileId?: number,
	fileFingerprint: number,
	modules: FileModule[],
}

export interface FileDependency {
	modId: number,
	relationType: FileRelationType,
}

export interface FileHash {
	value: string,
	algo: HashAlgo,
}

export interface FileIndex {
	gameVersion: string,
	fileId: number,
	filename: string,
	releaseType: FileReleaseType,
	gameVersionTypeId?: number,
	modLoader: ModLoaderType,
}

export interface FileModule {
	name: string,
	fingerprint: number,
}

export enum FileRelationType {
	EmbeddedLibrary = 1,
	OptionalDependency = 2,
	RequiredDependency = 3,
	Tool = 4,
	Incompatible = 5,
	Include = 6,
}

export enum FileReleaseType {
	Release = 1,
	Beta = 2,
	Alpha = 3,
}

export enum FileStatus {
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

export interface FingerprintFuzzyMatchRaw {
	id: number,
	file: FileRaw,
	latestFiles: FileRaw[],
	fingerprints: number[],
}

export interface FingerprintFuzzyMatchResult {
	fuzzyMatches: FingerprintFuzzyMatchRaw[],
}

export interface FingerprintMatchRaw {
	id: number,
	file: FileRaw,
	latestFiles: FileRaw[],
}

export interface FingerprintsMatchesResult {
	isCacheBuilt: boolean,
	exactMatches: FingerprintMatchRaw[],
	exactFingerprints: number[],
	partialMatches: FingerprintMatchRaw[],
	partialMatchFingerprints: object,
	additionalProperties: number[],
	installedFingerprints: number[],
	unmatchedFingerprints: number[],
}

export interface FolderFingerprint {
	foldername: string,
	fingerprints: number[],
}

export interface GameRaw {
	id: number,
	name: string,
	slug: string,
	dateModified: Date,
	assets: GameAssets,
	status: CoreStatus,
	apiStatus: CoreApiStatus,
}

export interface GameAssets {
	iconUrl: string,
	tileUrl: string,
	coverUrl: string,
}

export interface GameVersionsByType {
	type: number,
	versions: string[],
}

export enum GameVersionStatus {
	Approved = 1,
	Deleted = 2,
	New = 3,
}

export interface GameVersionType {
	id: number,
	gameId: number,
	name: string,
	slug: string,
}

export enum GameVersionTypeStatus {
	Normal = 1,
	Deleted = 2,
}

export interface GetCategoriesResponseRaw {
	/** The response data. */
	data: Category[],
}

export interface GetFeaturedModsResponseRaw {
	/** The response data. */
	data: FeaturedModsResponse,
}

export interface GetFilesResponseRaw {
	/** The response data. */
	data: FileRaw[],
}

export interface GetFingerprintMatchesResponseRaw {
	/** The response data. */
	data: FingerprintsMatchesResult,
}

export interface GetFingerprintsFuzzyMatchesResponseRaw {
	/** The response data. */
	data: FingerprintFuzzyMatchResult,
}

export interface GetGameResponseRaw {
	/** The response data. */
	data: GameRaw,
}

export interface GetGamesResponseRaw {
	/** The response data. */
	data: GameRaw[],
	/** The response pagination information. */
	pagination: Pagination,
}

export interface GetModFileResponseRaw {
	/** The response data. */
	data: FileRaw,
}

export interface GetModFilesResponseRaw {
	/** The response data. */
	data: FileRaw[],
	/** The response pagination information. */
	pagination: Pagination,
}

export interface GetModResponseRaw {
	/** The response data. */
	data: ModRaw,
}

export interface GetModsResponseRaw {
	/** The response data. */
	data: ModRaw[],
}

export interface GetVersionTypesResponseRaw {
	/** The response data. */
	data: GameVersionType[],
}

export interface GetVersionsResponseRaw {
	/** The response data. */
	data: GameVersionsByType[],
}

export interface GetFeaturedModsRequestBody {
	gameId: number,
	excludedModIds: number[],
	gameVersionTypeId?: number,
}

export interface GetFingerprintMatchesRequestBody {
	fingerprints: number[],
}

export interface GetFuzzyMatchesRequestBody {
	gameId: number,
	fingerprints: FolderFingerprint[],
}

export interface GetModFilesRequestBody {
	fileIds: number[],
}

export interface GetModsByIdsListRequestBody {
	modIds: number[],
}

export enum HashAlgo {
	Sha1 = 1,
	Md5 = 2,
}

export interface MinecraftGameVersion {
	id: number,
	gameVersionId: number,
	versionString: string,
	jarDownloadUrl: string,
	jsonDownloadUrl: string,
	approved: boolean,
	dateModified: Date,
	gameVersionTypeId: number,
	gameVersionStatus: GameVersionStatus,
	gameVersionTypeStatus: GameVersionTypeStatus,
}

export interface MinecraftModLoaderIndex {
	name: string,
	gameVersion: string,
	latest: boolean,
	recommended: boolean,
	dateModified: Date,
	type: ModLoaderType,
}

export interface MinecraftModLoaderVersion {
	id: number,
	gameVersionId: number,
	minecraftGameVersionId: number,
	forgeVersion: string,
	name: string,
	type: ModLoaderType,
	downloadUrl: string,
	filename: string,
	installMethod: ModLoaderInstallMethod,
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
	modLoaderGameVersionStatus: GameVersionStatus,
	modLoaderGameVersionTypeStatus: GameVersionTypeStatus,
	mcGameVersionId: number,
	mcGameVersionTypeId: number,
	mcGameVersionStatus: GameVersionStatus,
	mcGameVersionTypeStatus: GameVersionTypeStatus,
	installProfileJson: string,
}

export interface ModRaw {
	/** The mod id. */
	id: number,
	/** The game id this mod is for. */
	gameId: number,
	/** The name of the mod. */
	name: string,
	/** The mod slug that would appear in the URL. */
	slug: string,
	/** Relevant links for the mod such as Issue tracker and Wiki. */
	links: ModLinks,
	/** Mod summary. */
	summary: string,
	/** Current mod status. */
	status: ModStatus,
	/** Number of downloads for the mod. */
	downloadCount: number,
	/** Whether the mod is included in the featured mods list. */
	isFeatured: boolean,
	/** The main category of the mod as it was chosen by the mod author. */
	primaryCategoryId: number,
	/** List of categories that this mod is related to. */
	categories: Category[],
	/** The class id this mod belongs to. */
	classId?: number,
	/** List of the mod's authors. */
	authors: ModAuthor[],
	/** The mod's logo asset. */
	logo: ModAsset,
	/** List of screenshots assets. */
	screenshots: ModAsset[],
	/** The id of the main file of the mod. */
	mainFileId: number,
	/** List of latest files of the mod. */
	latestFiles: FileRaw[],
	/** List of file related details for the latest files of the mod. */
	latestFilesIndexes: FileIndex[],
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

export interface ModAsset {
	id: number,
	modId: number,
	title: string,
	description: string,
	thumbnailUrl: string,
	url: string,
}

export interface ModAuthor {
	id: number,
	name: string,
	url: string,
}

export interface ModLinks {
	websiteUrl: string,
	wikiUrl: string,
	issuesUrl: string,
	sourceUrl: string,
}

export enum ModLoaderInstallMethod {
	ForgeInstaller = 1,
	ForgeJarInstall = 2,
	ForgeInstaller_v2 = 3,
}

export enum ModLoaderType {
	Any = 0,
	Forge = 1,
	Cauldron = 2,
	LiteLoader = 3,
	Fabric = 4,
	Quilt = 5,
}

export enum ModsSearchSortField {
	Featured = 1,
	Popularity = 2,
	LastUpdated = 3,
	Name = 4,
	Author = 5,
	TotalDownloads = 6,
	Category = 7,
	GameVersion = 8,
}

export enum ModStatus {
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

export interface Pagination {
	/** A zero based index of the first item that is included in the response. */
	index: number,
	/** The requested number of items to be included in the response. */
	pageSize: number,
	/** The actual number of items that were included in the response. */
	resultCount: number,
	/** The total number of items available by the request. */
	totalCount: number,
}

export interface SearchModsResponseRaw {
	/** The response data. */
	data: ModRaw[],
	/** The response pagination information. */
	pagination: Pagination,
}

export interface SortableGameVersion {
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

export enum SortOrder {
	Ascending = 'asc',
	Descending = 'desc',
}

export interface StringResponseRaw {
	/** The response data. */
	data: string,
}
