import React from 'react';

export class RequestSetup extends React.Component {
	render() {
		return <div>
			<label className="request-setup-field">Repository: <input onChange={this._onOwnerChange.bind(this)}/></label>
			<label className="request-setup-field"> / <input onChange={this._onRepoChange.bind(this)}/></label>
		</div>;
	}

	_onOwnerChange(event) {
		this.props.request.setOwner(event.target.value);
	}

	_onRepoChange(event) {
		this.props.request.setRepo(event.target.value);
	}
}