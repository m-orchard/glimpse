import React from 'react';
import {ChunkLine} from './ChunkLine';

export class Chunk extends React.Component {
	render() {
		const chunk = this.props.chunk;
		return <div className="chunk">
			<div className="chunk-header">{chunk.header}</div>
			{chunk.lines.map(function(line) {
				return <ChunkLine line={line}></ChunkLine>;
			})}
		</div>;
	}
}