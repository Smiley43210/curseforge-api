import CurseForgeBase from './Base.js';
import CurseForgeClient from './Client.js';
import {CurseForgeCoreApiStatus, CurseForgeCoreStatus, CurseForgeGameAssets, CurseForgeGetGameResponseRaw} from './Types.js';

/**
 * Represents a game.
 */
export default class CurseForgeGame extends CurseForgeBase {
	id: number;
	name: string;
	slug: string;
	dateModified: Date;
	assets: CurseForgeGameAssets;
	status: CurseForgeCoreStatus;
	apiStatus: CurseForgeCoreApiStatus;

	/**
	 * Constructs a new game representation.
	 * @internal
	 * @param client The {@link CurseForgeClient} associated with this file
	 * @param data The raw API response data
	 */
	constructor(client: CurseForgeClient, data: CurseForgeGetGameResponseRaw['data']) {
		super(client);

		this.id = data.id;
		this.name = data.name;
		this.slug = data.slug;
		this.dateModified = data.dateModified;
		this.assets = data.assets;
		this.status = data.status;
		this.apiStatus = data.apiStatus;
	}

	/**
	 * {@inheritDoc CurseForgeClient.getVersions}
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	getVersions() {
		return this.client.getVersions(this.id);
	}

	/**
	 * {@inheritDoc CurseForgeClient.getVersionTypes}
	 * @throws {@link CurseForgeResponseError} when the request fails
	 */
	getVersionTypes() {
		return this.client.getVersionTypes(this.id);
	}
}
