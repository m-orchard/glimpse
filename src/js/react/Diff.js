import React from 'react';
import {ChangeSet} from './ChangeSet';

export class Diff extends React.Component {
	render() {
		var diff = this.props.diff;
		return <div className="diff" div>
			<div className="diff-files">{diff.files}</div>
			<div className="diff-index">{diff.index}</div>
			<div className="diff-left-file">{diff.leftFile}</div>
			<div className="diff-right-file">{diff.rightFile}</div>
			{diff.changeSets.map(function(changeSet) {
				return <ChangeSet changeSet={changeSet}></ChangeSet>;
			})}
		</div>;
	}
}