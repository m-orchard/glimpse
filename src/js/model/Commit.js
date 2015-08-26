import {Diff} from './Diff';

export class Commit {
	constructor(sha, author, changes) {
		this.sha = sha;
		this.author = author;
		this.changes = changes;
	}

	static parse(commit) {
		const sha = commit.sha;
		const author = commit.commit.author.name;
		const changes = commit.files.map(function(file) {
			return Diff.parse(file);
		});

		return new Commit(sha, author, changes);
	}
}