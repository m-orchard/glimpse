import {Chunk} from './Chunk';

export class Diff {
	constructor(comparedFiles, mode, fileMetadata, fileAMarker, fileBMarker, chunks) {
		this.comparedFiles = comparedFiles;
		this.fileMetadata = fileMetadata;
		this.mode = mode;
		this.fileAMarker = fileAMarker;
		this.fileBMarker = fileBMarker;
		this.chunks = chunks;
	}

	static parse(diff) {
		const diffLines = diff.split('\n');
		const comparedFiles = diffLines.shift();
		const mode = diffLines[0].match(Diff.modeMatcher) ? diffLines.shift() : '';
		const fileMetadata = diffLines.shift();
		const fileAMarker = diffLines.shift();
		const fileBMarker = diffLines.shift();
		const chunks = [];

		let chunkLength;
		while(diffLines.length) {
			chunkLength = 2;

			while(chunkLength < diffLines.length && !diffLines[chunkLength].match(Chunk.headerMatcher)) {
				chunkLength++;
			}

			chunks.push(Chunk.parse(diffLines.splice(0, chunkLength)));
		}

		return new Diff(comparedFiles, mode, fileMetadata, fileAMarker, fileBMarker, chunks);
	}

	static get modeMatcher() {
		return /^(new|deleted) file mode.+$/;
	}
}