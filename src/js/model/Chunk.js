export class Chunk {
	constructor(header, lines) {
		this.header = header;
		this.lines = lines;
	}

	static get headerMatcher() {
		return /^@@.+@@.*$/;
	}
}