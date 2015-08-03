import React from 'react';

export class ChunkLine extends React.Component {
	render() {
		const line = this.props.line;

		let className = 'chunk-line';
		if(line.addition) {
			className += ' chunk-line-addition';
		} else if(line.removal) {
			className += ' chunk-line-removal';
		}

		return <div className={className}>
			<span className="chunk-line-flag">{line.flag}</span>
			<span className="chunk-line-text">{line.text}</span>
		</div>;
	}
}