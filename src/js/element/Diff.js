import React from 'react';
import {Chunk} from './Chunk';

export class Diff extends React.Component {
	render() {
		const diff = this.props.diff;
		return <div className="diff" div>
			<div className="diff-compared-files">{diff.comparedFiles}</div>
			<div className="diff-mode">{diff.mode}</div>
			<div className="diff-file-metadata">{diff.fileMetadata}</div>
			<div className="diff-file-a">{diff.fileA}</div>
			<div className="diff-file-b">{diff.fileB}</div>
			{diff.chunks.map(function(chunk) {
				return <Chunk chunk={chunk}></Chunk>;
			})}
		</div>;
	}
}