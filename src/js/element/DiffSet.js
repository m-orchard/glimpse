import React from 'react';
import {Diff} from './Diff';

export class DiffSet extends React.Component {
	render() {
		const diffSet = this.props.diffSet;

		return <div className="diff-set" onWheel={this.onScroll.bind(this)} ref="diffSet">
			{diffSet.diffs.map(function(diff, index) {
				return <Diff diff={diff} index={index} key={index} ref={'diff' + index}></Diff>;
			}, this)}
		</div>;
	}

	componentDidMount() {
		this._setActiveDiff(0);
	}

	onScroll(event) {
		const diffSet = React.findDOMNode(this.refs.diffSet);
		const diffSetBounds = diffSet.getBoundingClientRect();
		let activeDiff = this._getActiveDiff();
		const activeDiffBounds = React.findDOMNode(activeDiff).getBoundingClientRect();
		const activeDiffIndex = activeDiff.props.index;

		if(activeDiffIndex > 0 && event.deltaY < 0) {
			// scrolling up
			const topDistance = activeDiffBounds.top - diffSetBounds.top;
			if(topDistance > 0) {
				if(topDistance >= 50) {
					activeDiff = this._setActiveDiff(activeDiffIndex - 1);
				}

				this._scrollToTop(activeDiff);
				event.preventDefault();
			}
		} else if(activeDiffIndex < (this.props.diffSet.diffs.length - 1) && event.deltaY > 0) {
			// scrolling down
			const bottomDistance = diffSetBounds.bottom - activeDiffBounds.bottom;
			if(bottomDistance > 0) {
				if(bottomDistance >= 50) {
					activeDiff = this._setActiveDiff(activeDiffIndex + 1);
					this._scrollToTop(activeDiff);
				} else {
					this._scrollToBottom(activeDiff);
				}

				event.preventDefault();
			}
		}
	}

	_scrollToTop(target) {
		const diff = React.findDOMNode(target);
		const diffBounds = diff.getBoundingClientRect();
		const diffHeight = diffBounds.bottom - diffBounds.top;
		const diffSet = React.findDOMNode(this.refs.diffSet);
		const diffSetBounds = diffSet.getBoundingClientRect();
		const diffSetHeight = diffSetBounds.bottom - diffSetBounds.top;

		diffSet.scrollTop += (diffBounds.top - Math.max((diffSetHeight - diffHeight) / 2, 50));
	}

	_scrollToBottom(target) {
		const diff = React.findDOMNode(target);
		const diffBounds = diff.getBoundingClientRect();
		const diffHeight = diffBounds.bottom - diffBounds.top;
		const diffSet = React.findDOMNode(this.refs.diffSet);
		const diffSetBounds = diffSet.getBoundingClientRect();
		const diffSetHeight = diffSetBounds.bottom - diffSetBounds.top;

		diffSet.scrollTop -= (diffSetBounds.bottom - diffBounds.bottom) - Math.max((diffSetHeight - diffHeight) / 2, 50);
	}

	_getDiffs() {
		const refs = this.refs;

		return Object.keys(refs).filter(function(ref) {
			return Boolean(ref.match(/diff\d/));
		}).map(function(ref) {
			return refs[ref];
		});
	}

	_getActiveDiff() {
		return this._getDiffs().filter(function(diff) {
			return diff.state.active;
		})[0];
	}

	_setActiveDiff(index) {
		let activeDiff = this._getActiveDiff();
		if(activeDiff) {
			activeDiff.setState({ active: false });
		}

		activeDiff = this._getDiffs()[index];
		activeDiff.setState({ active: true });

		return activeDiff;
	}
}