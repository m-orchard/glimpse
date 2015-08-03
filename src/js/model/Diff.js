import {Chunk} from './Chunk';

export class Diff {
	constructor(comparedFiles, mode, fileMetadata, fileA, fileB, chunks) {
		this.comparedFiles = comparedFiles;
		this.fileMetadata = fileMetadata;
		this.mode = mode;
		this.fileA = fileA;
		this.fileB = fileB;
		this.chunks = chunks;
	}

	static parse(diff) {
		const diffLines = diff.split('\n');

		const comparedFiles = diffLines.shift();
		const mode = diffLines[0].match(Diff.modeMatcher) ? diffLines.shift() : '';
		const fileMetadata = diffLines.shift();
		const fileA = diffLines.shift();
		const fileB = diffLines.shift();
		const chunks = [];

		let chunkHeader;
		let chunkLines;

		do {
			chunkHeader = diffLines.shift();
			chunkLines = [];

			do {
				chunkLines.push(diffLines.shift());
			} while(diffLines.length && !diffLines[0].match(Chunk.headerMatcher));

			chunks.push(new Chunk(chunkHeader, chunkLines));
		} while(diffLines.length);

		return new Diff(comparedFiles, mode, fileMetadata, fileA, fileB, chunks);
	}

	static get modeMatcher() {
		return /^(new|deleted) file mode.+$/;
	}
}