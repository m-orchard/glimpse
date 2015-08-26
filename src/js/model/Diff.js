import {Chunk} from './Chunk';

export class Diff {
	constructor(file, type, chunks) {
		this.file = file;
		this.type = type;
		this.chunks = chunks;
	}

	static parse(change) {
		const file = change.filename;
		const type = change.status;
		const chunks = [];

		let chunkLength;

		const patchLines = change.patch.split('\n');
		while(patchLines.length) {
			chunkLength = 2;

			while(chunkLength < patchLines.length && !patchLines[chunkLength].match(Chunk.headerMatcher)) {
				chunkLength++;
			}

			chunks.push(Chunk.parse(patchLines.splice(0, chunkLength)));
		}

		return new Diff(file, type, chunks);
	}
}