import React from 'react';
import {Chunk} from './Chunk';

export class Diff extends React.Component {
	constructor(props) {
		super(props);

		this.state = { active: false };
	}

	render() {
		const diff = this.props.diff;

		let className = 'diff';
		if(this.state.active) {
			className += ' active-diff';
		}

		return <div className={className} div>
			<div className="diff-compared-files">{diff.comparedFiles}</div>
			<div className="diff-mode">{diff.mode}</div>
			<div className="diff-file-metadata">{diff.fileMetadata}</div>
			<div className="diff-file-a-marker">{diff.fileAMarker}</div>
			<div className="diff-file-b-marker">{diff.fileBMarker}</div>
			{diff.chunks.map(function(chunk, index) {
				return <Chunk chunk={chunk} key={index}></Chunk>;
			})}
		</div>;
	}
}