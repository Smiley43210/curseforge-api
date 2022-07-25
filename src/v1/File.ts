import CurseForgeBase from './Base.js';
import CurseForgeClient from './Client.js';
import {CurseForgeFileDependency, CurseForgeFileHash, CurseForgeFileModule, CurseForgeFileRaw, CurseForgeFileReleaseType, CurseForgeFileStatus, CurseForgeSortableGameVersion} from './Types.js';

/**
 * Represents a mod file.
 */
export default class CurseForgeFile extends CurseForgeBase {
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
	releaseType: CurseForgeFileReleaseType;
	/** Status of the file. */
	fileStatus: CurseForgeFileStatus;
	/** The file hash (i.e. md5 or sha1). */
	hashes: CurseForgeFileHash[];
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
	sortableGameVersions: CurseForgeSortableGameVersion[];
	/** List of dependencies files. */
	dependencies: CurseForgeFileDependency[];
	exposeAsAlternative?: boolean;
	parentProjectFileId?: number;
	alternateFileId?: number;
	isServerPack?: boolean;
	serverPackFileId?: number;
	fileFingerprint: number;
	modules: CurseForgeFileModule[];

	/**
	 * Constructs a new file representation.
	 * @internal
	 * @param client The {@link CurseForgeClient} associated with this file
	 * @param data The raw API response data
	 */
	constructor(client: CurseForgeClient, data: CurseForgeFileRaw) {
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
	 * {@inheritDoc CurseForgeClient.getModFileChangelog}
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	getChangelog() {
		return this.client.getModFileChangelog(this.modId, this.id);
	}

	/**
	 * {@inheritDoc CurseForgeClient.getModFileDownloadURL}
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	getDownloadURL() {
		return this.client.getModFileDownloadURL(this.modId, this.id);
	}
}
