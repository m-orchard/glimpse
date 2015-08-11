import React from 'react';

export class SnapListItem extends React.Component {
	constructor(props) {
		super(props);

		this.state = { position: 1 };
	}

	render() {
		let className = 'snap-list-item';
		if(this.state.position > 0) {
			className += ' snap-list-item-after-active';
		} else if(this.state.position < 0) {
			className += ' snap-list-item-before-active';
		} else {
			className += ' snap-list-item-active';
		}

		return <div className={className}>
			<this.props.type model={this.props.model} ref={(item) => this._item = item}></this.props.type>
		</div>;
	}

	isScrolledToTop() {
		return React.findDOMNode(this._item).scrollTop === 0;
	}

	isScrolledToBottom() {
		const element = React.findDOMNode(this._item);
		return (element.scrollHeight - element.clientHeight) === element.scrollTop;
	}
}