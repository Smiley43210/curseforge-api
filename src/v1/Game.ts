import Base from './Base.js';
import Client from './Client.js';
import {CoreApiStatus, CoreStatus, GameAssets, GetGameResponseRaw} from './Types.js';

/**
 * Represents a game.
 */
export default class Game extends Base {
	id: number;
	name: string;
	slug: string;
	dateModified: Date;
	assets: GameAssets;
	status: CoreStatus;
	apiStatus: CoreApiStatus;

	/**
	 * Constructs a new game representation.
	 * @internal
	 * @param client The {@link Client} associated with this file
	 * @param data The raw API response data
	 */
	constructor(client: Client, data: GetGameResponseRaw['data']) {
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
	 * {@inheritDoc Client.getVersions}
	 * @throws {@link ResponseError} when the request fails
	 */
	getVersions() {
		return this.client.getVersions(this.id);
	}

	/**
	 * {@inheritDoc Client.getVersionTypes}
	 * @throws {@link ResponseError} when the request fails
	 */
	getVersionTypes() {
		return this.client.getVersionTypes(this.id);
	}
}
