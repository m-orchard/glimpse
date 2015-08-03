import React from 'react';

export class Chunk extends React.Component {
	render() {
		const chunk = this.props.chunk;
		return <div className="chunk">
			<div className="chunk-header">{chunk.header}</div>
			<div className="chunk-mode">{chunk.mode}</div>
			{chunk.lines.map(function(line) {
				return <div className="chunk-line">{line}</div>;
			})}
		</div>;
	}
}