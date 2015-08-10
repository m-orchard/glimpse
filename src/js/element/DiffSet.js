import React from 'react';
import {Diff} from './Diff';

export class DiffSet extends React.Component {
	constructor(props) {
		super(props);

		this._diffs = [];
		this._activeIndex = 0;
	}

	render() {
		this._diffs.length = 0;

		const model = this.props.model;

		return <div className="diff-set" onWheel={this.onScroll.bind(this)}>
			{model.diffs.map(function(diff, index) {
				return <Diff model={diff} key={index} ref={(diff) => this._diffs[index] = diff}></Diff>;
			}, this)}
		</div>;
	}

	componentDidMount() {
		this._diffs[0].setState({ position: 0 });
	}

	onScroll(event) {
		const diff = this._diffs[this._activeIndex];

		if(this._activeIndex > 0 && event.deltaY < 0 && diff.isScrolledToTop()) {
			// scrolling up
			this._setActiveIndex(this._activeIndex - 1);
			event.preventDefault();
		} else if(this._activeIndex < (this._diffs.length - 1) && event.deltaY > 0 && diff.isScrolledToBottom()) {
			// scrolling down
			this._setActiveIndex(this._activeIndex + 1);
			event.preventDefault();
		}
	}

	_setActiveIndex(index) {
		this._diffs[this._activeIndex].setState({ position: this._activeIndex - index });
		this._activeIndex = index;
		this._diffs[this._activeIndex].setState({ position: 0 });
	}
}