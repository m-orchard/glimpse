import React from 'react';

export class Chunk extends React.Component {
	render() {
		var chunk = this.props.chunk;
		return <div className="chunk">
			<div className="chunk-header">{chunk.header}</div>
			{chunk.lines.map(function(line) {
				return <div className="chunk-line">{line}</div>;
			})}
		</div>;
	}
}