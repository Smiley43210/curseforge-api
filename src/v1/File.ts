import Base from './Base.js';
import Client from './Client.js';
import {FileDependency, FileHash, FileModule, FileRaw, FileReleaseType, FileStatus, SortableGameVersion} from './Types.js';

/**
 * Represents a mod file.
 */
export default class File extends Base {
	/** The file id. */
	id: number;
	/** The game id related to the mod that this file belongs to. */
	gameId: number;
	/** The mod id. */
	modId: number;
	/** Whether the file is available to download. */
	isAvailable: boolean;
	/** Display name of the file. */
	displayName: string;
	/** Exact file name. */
	fileName: string;
	/** The file release type. */
	releaseType: FileReleaseType;
	/** Status of the file. */
	fileStatus: FileStatus;
	/** The file hash (i.e. md5 or sha1). */
	hashes: FileHash[];
	/** The file timestamp. */
	fileDate: Date;
	/** The file length in bytes. */
	fileLength: number;
	/** The number of downloads for the file. */
	downloadCount: number;
	/** The file download URL. */
	downloadUrl: string;
	/** List of game versions this file is relevant for. */
	gameVersions: string[];
	/** Metadata used for sorting by game versions. */
	sortableGameVersions: SortableGameVersion[];
	/** List of dependencies files. */
	dependencies: FileDependency[];
	exposeAsAlternative?: boolean;
	parentProjectFileId?: number;
	alternateFileId?: number;
	isServerPack?: boolean;
	serverPackFileId?: number;
	fileFingerprint: number;
	modules: FileModule[];

	/**
	 * Constructs a new file representation.
	 * @internal
	 * @param client The {@link Client} associated with this file
	 * @param data The raw API response data
	 */
	constructor(client: Client, data: FileRaw) {
		super(client);

		this.id = data.id;
		this.gameId = data.gameId;
		this.modId = data.modId;
		this.isAvailable = data.isAvailable;
		this.displayName = data.displayName;
		this.fileName = data.fileName;
		this.releaseType = data.releaseType;
		this.fileStatus = data.fileStatus;
		this.hashes = data.hashes;
		this.fileDate = data.fileDate;
		this.fileLength = data.fileLength;
		this.downloadCount = data.downloadCount;
		this.downloadUrl = data.downloadUrl;
		this.gameVersions = data.gameVersions;
		this.sortableGameVersions = data.sortableGameVersions;
		this.dependencies = data.dependencies;
		this.exposeAsAlternative = data.exposeAsAlternative;
		this.parentProjectFileId = data.parentProjectFileId;
		this.alternateFileId = data.alternateFileId;
		this.isServerPack = data.isServerPack;
		this.serverPackFileId = data.serverPackFileId;
		this.fileFingerprint = data.fileFingerprint;
		this.modules = data.modules;
	}

	/**
	 * {@inheritDoc Client.getModFileChangelog}
	 * @throws {@link ResponseError} when the request fails
	 */
	getChangelog() {
		return this.client.getModFileChangelog(this.modId, this.id);
	}

	/**
	 * {@inheritDoc Client.getModFileDownloadURL}
	 * @throws {@link ResponseError} when the request fails
	 */
	getDownloadURL() {
		return this.client.getModFileDownloadURL(this.modId, this.id);
	}
}
