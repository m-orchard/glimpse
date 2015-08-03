import {Diff} from './Diff';

export class DiffSet {
	constructor(diffs) {
		this.diffs = diffs;
	}

	static parse(diffSet) {
		const diffs = diffSet.split('\ndiff --git');
		diffs.shift();

		return new DiffSet(diffs.map(Diff.parse));
	}
}