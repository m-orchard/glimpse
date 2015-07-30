import {Diff} from './Diff';
import {ChangeSet} from './ChangeSet';

export class DiffFactory {
	static parseDiffSet(diffSet) {
		var diffs = diffSet.split('diff');
		diffs.shift();

		return diffs.map(function(diff) {
			return diff.split("\n");
		}).map(DiffFactory.parseDiff);
	}

	static parseDiff(diffLines) {
		var files = diffLines.shift();
		var index = diffLines.shift();
		var leftFile = diffLines.shift();
		var rightFile = diffLines.shift();
		var changeSets = [];
		var changeSetIndices;
		var changeSetLines;

		do {
			changeSetIndices = diffLines.shift();
			changeSetLines = [];

			do {
				changeSetLines.push(diffLines.shift());
			} while(diffLines.length && diffLines[0].indexOf('@@') !== 0);

			changeSets.push(new ChangeSet(changeSetIndices, changeSetLines));
		} while(diffLines.length);

		return new Diff(files, index, leftFile, rightFile, changeSets);
	}
}