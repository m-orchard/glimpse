export class Diff {
	constructor(files, index, leftFile, rightFile, changeSets) {
		this.files = files;
		this.index = index;
		this.leftFile = leftFile;
		this.rightFile = rightFile;
		this.changeSets = changeSets;
	}
}