import React from 'react';

export class CommitSetup extends React.Component {
	render() {
		return <div>
			<label className="commit-setup-field">Repository: <input placeholder="owner" defaultValue="mickylad" onChange={this._onOwnerChange.bind(this)} ref="owner"/></label>
			<label className="commit-setup-field"> / <input placeholder="repository" defaultValue="glimpse" onChange={this._onRepoChange.bind(this)} ref="repo"/></label>
		</div>;
	}

	componentDidMount() {
		this._onOwnerChange();
		this._onRepoChange();
	}

	_onOwnerChange() {
		this.props.commit.setOwner(React.findDOMNode(this.refs.owner).value);
	}

	_onRepoChange() {
		this.props.commit.setRepo(React.findDOMNode(this.refs.repo).value);
	}
}