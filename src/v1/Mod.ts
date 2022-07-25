import CurseForgeBase from './Base.js';
import CurseForgeClient from './Client.js';
import CurseForgeFile from './File.js';
import {CurseForgeGetModFilesOptions} from './Options.js';
import {CurseForgeCategory, CurseForgeFileIndex, CurseForgeGetModResponseRaw, CurseForgeModAsset, CurseForgeModAuthor, CurseForgeModLinks, CurseForgeModStatus} from './Types.js';

export default class CurseForgeMod extends CurseForgeBase {
	/** The mod id. */
	id: number;
	/** The game id this mod is for. */
	gameId: number;
	/** The name of the mod. */
	name: string;
	/** The mod slug that would appear in the URL. */
	slug: string;
	/** Relevant links for the mod such as Issue tracker and Wiki. */
	links: CurseForgeModLinks;
	/** Mod summary. */
	summary: string;
	/** Current mod status. */
	status: CurseForgeModStatus;
	/** Number of downloads for the mod. */
	downloadCount: number;
	/** Whether the mod is included in the featured mods list. */
	isFeatured: boolean;
	/** The main category of the mod as it was chosen by the mod author. */
	primaryCategoryId: number;
	/** List of categories that this mod is related to. */
	categories: CurseForgeCategory[];
	/** The class id this mod belongs to. */
	classId?: number;
	/** List of the mod's authors. */
	authors: CurseForgeModAuthor[];
	/** The mod's logo asset. */
	logo: CurseForgeModAsset;
	/** List of screenshots assets. */
	screenshots: CurseForgeModAsset[];
	/** The id of the main file of the mod. */
	mainFileId: number;
	/** List of latest files of the mod. */
	latestFiles: CurseForgeFile[];
	/** List of file related details for the latest files of the mod. */
	latestFilesIndexes: CurseForgeFileIndex[];
	/** The creation date of the mod. */
	dateCreated: Date;
	/** The last time the mod was modified. */
	dateModified: Date;
	/** The release date of the mod. */
	dateReleased: Date;
	/** Is mod allowed to be distributed. */
	allowModDistribution?: boolean;
	/** The mod popularity rank for the game. */
	gamePopularityRank: number;
	/** Is the mod available for search. This can be false when a mod is experimental, in a deleted state or has only alpha files. */
	isAvailable: boolean;
	/** The mod's thumbs up count. */
	thumbsUpCount: number;

	constructor(client: CurseForgeClient, data: CurseForgeGetModResponseRaw['data']) {
		super(client);

		this.id = data.id;
		this.gameId = data.gameId;
		this.name = data.name;
		this.slug = data.slug;
		this.links = data.links;
		this.summary = data.summary;
		this.status = data.status;
		this.downloadCount = data.downloadCount;
		this.isFeatured = data.isFeatured;
		this.primaryCategoryId = data.primaryCategoryId;
		this.categories = data.categories;
		this.classId = data.classId;
		this.authors = data.authors;
		this.logo = data.logo;
		this.screenshots = data.screenshots;
		this.mainFileId = data.mainFileId;
		this.latestFiles = data.latestFiles.map((rawFile) => {
			return new CurseForgeFile(client, rawFile);
		});
		this.latestFilesIndexes = data.latestFilesIndexes;
		this.dateCreated = data.dateCreated;
		this.dateModified = data.dateModified;
		this.dateReleased = data.dateReleased;
		this.allowModDistribution = data.allowModDistribution;
		this.gamePopularityRank = data.gamePopularityRank;
		this.isAvailable = data.isAvailable;
		this.thumbsUpCount = data.thumbsUpCount;
	}

	getDescription() {
		return this.client.getModDescription(this.id);
	}

	getFile(fileId: number) {
		return this.client.getModFile(this.id, fileId);
	}

	getFiles(options?: CurseForgeGetModFilesOptions) {
		return this.client.getModFiles(this.id, options);
	}
}
