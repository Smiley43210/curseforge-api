import CurseForgeBase from './Base.js';
import CurseForgeClient from './Client.js';
import {CurseForgeCoreApiStatus, CurseForgeCoreStatus, CurseForgeGameAssets, CurseForgeGetGameResponseRaw} from './Types.js';

export default class CurseForgeGame extends CurseForgeBase {
	id: number;
	name: string;
	slug: string;
	dateModified: Date;
	assets: CurseForgeGameAssets;
	status: CurseForgeCoreStatus;
	apiStatus: CurseForgeCoreApiStatus;

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

	getVersions() {
		return this.client.getVersions(this.id);
	}

	getVersionTypes() {
		return this.client.getVersionTypes(this.id);
	}
}
