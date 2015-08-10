import React from 'react';

export class ChunkLine extends React.Component {
	render() {
		const model = this.props.model;

		let className = 'chunk-line';
		if(model.addition) {
			className += ' chunk-line-addition';
		} else if(model.removal) {
			className += ' chunk-line-removal';
		}

		return <div className={className}>
			<span className="chunk-line-flag">{model.flag}</span>
			<span className="chunk-line-text">{model.text}</span>
		</div>;
	}
}