import CurseForgeClient from './Client.js';

export default class CurseForgeBase {
	client: CurseForgeClient;

	constructor(client: CurseForgeClient) {
		this.client = client;
	}
}
