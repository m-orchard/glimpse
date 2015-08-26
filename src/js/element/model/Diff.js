import React from 'react';
import {Chunk} from './Chunk';

export class Diff extends React.Component {
	constructor(props) {
		super(props);

		this.state = { position: 1 };
	}

	render() {
		const model = this.props.model;

		return <div className="diff" ref={(contents) => this._contents = contents}>
				<div className="diff-file">{model.file}</div>
				<div className="diff-type">{model.type}</div>
				{model.chunks.map(function(chunk, index) {
					return <Chunk model={chunk} key={index}></Chunk>;
				})}
			</div>;
	}

	isScrolledToTop() {
		return React.findDOMNode(this._contents).scrollTop === 0;
	}

	isScrolledToBottom() {
		const contents = React.findDOMNode(this._contents);
		return (contents.scrollHeight - contents.clientHeight) === contents.scrollTop;
	}
}