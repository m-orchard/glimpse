import {ChunkLine} from './ChunkLine';

export class Chunk {
	constructor(header, lines) {
		this.header = header;
		this.lines = lines.map(ChunkLine.parse);
	}

	static parse(chunk) {
		const header = chunk.shift().match(Chunk.headerMatcher)[0];
		return new Chunk(header, chunk);
	}

	static get headerMatcher() {
		return /^@@.+@@/;
	}
}