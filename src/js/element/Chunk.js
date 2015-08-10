import React from 'react';
import {ChunkLine} from './ChunkLine';

export class Chunk extends React.Component {
	render() {
		const model = this.props.model;

		return <div className="chunk">
			<div className="chunk-header">{model.header}</div>
			{model.lines.map(function(line, index) {
				return <ChunkLine model={line} key={index}></ChunkLine>;
			})}
		</div>;
	}
}