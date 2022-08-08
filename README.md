# curseforge-api 🚀
This is a JavaScript module built around the new [CurseForge Core API](https://docs.curseforge.com/#accessing-the-service) following the deprecation of the older, unnofficial API. It is designed to be easy to use and has zero dependencies 🙌. More information about the CurseForge Core API is [available here](https://docs.curseforge.com/).

This module provides TypeScript typings.

This module uses `fetch()` under the hood to make requests. However, if used Node.js, keep in mind that `fetch()` was not added until `v17.5.0`, and is behind the `--experimental-fetch` flag until `v18.0.0`. For this reason, where `fetch()` is unavailable, the module can use a fetch polyfill such as [node-fetch](https://www.npmjs.com/package/node-fetch).

## Table of Contents
1. [Documentation](#documentation)
1. [Installation](#installation)
	1. [Node.js](#nodejs)
	1. [Deno and Browser](#deno-and-browser)
1. [Usage](#usage)
	1. [Using a `fetch()` Polyfill](#using-a-fetch-polyfill)
	1. [Documentation](#documentation-1)
	1. [Examples](#examples)
1. [Enums](#enums)

## Documentation
Documentation is [available here](https://smiley43210.github.io/curseforge-api/) and is automatically generated from the source with [TypeDoc](https://typedoc.org/).

## Installation
Import the package depending on what type of environment you're using it in.

### Node.js
Install the package [via npm](https://www.npmjs.com/package/curseforge-api):
```
npm install curseforge-api
```

and import it in your script:
```js
import {CurseForgeClient} from 'curseforge-api';
```

### Deno and Browser
Import modules directly via CDN (for example, jsDelivr or unpkg):
```js
import {CurseForgeClient} from 'https://cdn.jsdelivr.net/npm/curseforge-api@1.0/index.js';
// OR
import {CurseForgeClient} from 'https://unpkg.com/curseforge-api@1.0/index.js'
```

## Usage
Start by creating a [client](https://smiley43210.github.io/curseforge-api/classes/CurseForgeClient.html), which you will use to make most API queries:
```js
const client = new CurseForgeClient('YOUR_API_KEY');
```

### Using a `fetch()` Polyfill
If you're using Node.js < v17.5.0, you'll want to provide a `fetch()` polyfill such as [node-fetch](https://www.npmjs.com/package/node-fetch):
```js
import fetch from 'node-fetch';

// Pass fetch to the client
const client = new CurseForgeClient('YOUR_API_KEY', {fetch});
```

You can also provide a different polyfill, for example, if you're running this in a browser environment and target older browsers that don't support `fetch()`. As seen above, simply pass the polyfilled `fetch` function to the client constructor via the options.

### Documentation
All classes, functions, enums, and types are [documented here](https://smiley43210.github.io/curseforge-api/).

### Examples
Search for a mod via slug:
```js
import {CurseForgeGameEnum} from 'curseforge-api';

const modsResults = await client.searchMods(CurseForgeGameEnum.Minecraft, {slug: 'jei'});
const jei = modsResults.data[0];
console.log(jei.name); // => 'Just Enough Items (JEI)'
console.log(jei.id); // => 238222
```

Fetch a mod via project ID:
```js
const jei = await client.getMod(238222);
console.log(jei.name); // => 'Just Enough Items (JEI)'
console.log(jei.id); // => 238222
```

Get the latest Forge 1.18.2 file for Just Enough Items (JEI):
```js
const files = await mod.getFiles(238222, {
	gameVersion: '1.18.2',
	modLoaderType: CurseForgeModLoaderType.Forge,
	pageSize: 1,
});
console.log(files.data[0].fileName); // => 'jei-1.18.2-9.7.1.232.jar'
```

Fetch a mod's file and get the download URL:
```js
const file = await mod.getFile(3847103);
console.log(file.displayName); // => 'jei-1.18.2-9.7.0.209.jar'
console.log(await file.getDownloadURL()); // => 'https://edge.forgecdn.net/files/3847/103/jei-1.18.2-9.7.0.209.jar'
```

## Enums
For convenience, the game IDs that were available at the time of publishing are [available as an enum](https://smiley43210.github.io/curseforge-api/enums/CurseForgeGameEnum.html). You can use this wherever you need to provide a game ID.

There are also enums and typings available for all documented types on the [CurseForge Core API](https://docs.curseforge.com/#schemas).
