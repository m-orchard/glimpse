import {Diff} from './Diff';

export class DiffFactory {
	static parseDiffSet(diffSet) {
		var diffs = diffSet.split('diff');
		diffs.shift();

		return diffs.map(function(diff) {
			return diff.split("\n");
		}).map(DiffFactory.parseDiff);
	}

	static parseDiff(lines) {
		var files = lines.shift();
		var index = lines.shift();
		var leftFile = lines.shift();
		var rightFile = lines.shift();
		var changeSets = [];
		var changeSet;

		do {
			changeSet = {
				indices: lines.shift(),
				lines: []
			};

			do {
				changeSet.lines.push(lines.shift());
			} while(lines.length && lines[0].indexOf('@@') !== 0);

			changeSets.push(changeSet);
		} while(lines.length);

		return new Diff(files, index, leftFile, rightFile, changeSets);
	}
}