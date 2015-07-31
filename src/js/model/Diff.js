import {Chunk} from './Chunk';

export class Diff {
	constructor(comparedFiles, fileMetadata, fileA, fileB, chunks) {
		this.comparedFiles = comparedFiles;
		this.fileMetadata = fileMetadata;
		this.fileA = fileA;
		this.fileB = fileB;
		this.chunks = chunks;
	}

	static parse(diff) {
		var diffLines = diff.split('\n');

		var comparedFiles = diffLines.shift();
		var fileMetadata = diffLines.shift();
		var fileA = diffLines.shift();
		var fileB = diffLines.shift();
		var chunks = [];
		var chunkHeader;
		var chunkLines;

		do {
			chunkHeader = diffLines.shift();
			chunkLines = [];

			do {
				chunkLines.push(diffLines.shift());
			} while(diffLines.length && diffLines[0].indexOf('@@') !== 0);

			chunks.push(new Chunk(chunkHeader, chunkLines));
		} while(diffLines.length);

		return new Diff(comparedFiles, fileMetadata, fileA, fileB, chunks);
	}
}