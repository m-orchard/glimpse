import React from 'react';

export class ChangeSet extends React.Component {
	render() {
		var changeSet = this.props.changeSet;
		return <div className="change-set">
			<div className="change-set-indices">{changeSet.indices}</div>
			{changeSet.lines.map(function(line) {
				return <div className="change-set-line">{line}</div>;
			})}
		</div>;
	}
}