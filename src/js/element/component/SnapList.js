import React from 'react';
import {SnapListItem} from './SnapListItem';

export class SnapList extends React.Component {
	constructor(props) {
		super(props);

		this._items = [];
		this._activeIndex = 0;
	}

	render() {
		this._items.length = 0;

		return <div className="snap-list" onWheel={this.onScroll.bind(this)}>
			{this.props.items.map(function(item, index) {
				return <SnapListItem type={this.props.type} model={item} key={index} ref={(item) => this._items[index] = item}></SnapListItem>;
			}, this)}
		</div>;
	}

	componentDidMount() {
		this._items[0].setState({ position: 0 });
	}

	onScroll(event) {
		const item = this._items[this._activeIndex];
		const ignoreScroll = Boolean(event.target === React.findDOMNode(item));

		if(this._activeIndex > 0 && event.deltaY < 0 && (ignoreScroll || item.isScrolledToTop())) {
			// scrolling up
			this._setActiveIndex(this._activeIndex - 1);
			event.preventDefault();
		} else if(this._activeIndex < (this._items.length - 1) && event.deltaY > 0 && (ignoreScroll || item.isScrolledToBottom())) {
			// scrolling down
			this._setActiveIndex(this._activeIndex + 1);
			event.preventDefault();
		}
	}

	_setActiveIndex(index) {
		this._items[this._activeIndex].setState({ position: this._activeIndex - index });
		this._activeIndex = index;
		this._items[this._activeIndex].setState({ position: 0 });
	}
}