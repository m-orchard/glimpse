import React from 'react';
import {Diff} from './Diff';

export class DiffSet extends React.Component {
	render() {
		const diffSet = this.props.diffSet;
		return <div className="diff-set">
			{diffSet.diffs.map(function(diff) {
				return <Diff diff={diff}></Diff>;
			})}
		</div>;
	}
}