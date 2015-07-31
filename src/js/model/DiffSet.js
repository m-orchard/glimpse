import {Diff} from './Diff';

export class DiffSet {
	constructor(diffs) {
		this.diffs = diffs;
	}

	static parse(diffSet) {
		var diffs = diffSet.split('\ndiff --git');
		diffs.shift();

		diffs = diffs.map(Diff.parse);

		return new DiffSet(diffs);
	}
}