export class ChunkLine {
	constructor(text, flag) {
		this.text = text;
		this.flag = flag;
		this.addition = Boolean(flag === '+');
		this.removal = Boolean(flag === '-');
	}

	static parse(line) {
		return new ChunkLine(line.substr(1), line.substr(0, 1));
	}
}