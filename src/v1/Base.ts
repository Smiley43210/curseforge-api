import Client from './Client.js';

export default class Base {
	client: Client;

	constructor(client: Client) {
		this.client = client;
	}
}
