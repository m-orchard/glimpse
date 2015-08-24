import {Debouncer} from '../Debouncer';
import {Emitter} from '../event/Emitter';

export class Request extends Emitter {
	constructor() {
		super();

		this.owner = '';
		this.repo = '';
		this.commit = '';

		Debouncer(this, '_request', 800);
	}

	setOwner(value) {
		this.owner = value;
		this._request();
	}

	setRepo(value) {
		this.repo = value;
		this._request();
	}

	setCommit(value) {
		this.commit = value;
		this._request();
	}

	_buildCommitURL(owner, repo, commit) {
		return 'https://api.github.com/repos/' + owner + '/' + repo + '/commits/' + commit;
			//dde4c1d0166057e0bf679156eb72e2aef19ff65c
	}

	_buildHeadURL(owner, repo) {
		return 'https://api.github.com/repos/' + owner + '/' + repo + '/git/refs/heads/master';
	}

	_onCommitResponse(request) {
		this.emit('load', [request.responseText])
	}

	_onHeadResponse(request) {
		const head = JSON.parse(request.responseText);
		this.setCommit(head.object.sha);

		this._request();
	}

	_request() {
		if(!this.owner || !this.repo) {
			return;
		}

		const request = new XMLHttpRequest();

		let url, handler;
		if(this.commit) {
			url = this._buildCommitURL(this.owner, this.repo, this.commit);
			handler = this._onCommitResponse;
		} else {
			url = this._buildHeadURL(this.owner, this.repo);
			handler = this._onHeadResponse;
		}

		request.onreadystatechange = this._response(request, handler.bind(this));

		request.open('GET', url, true);
		request.setRequestHeader('Accept', 'application/vnd.github.diff');
		request.send(null);
	}

	_response(request, handler) {
		return function(request) {
			if(request.readyState !== 4) {
				return;
			}

			const status = request.status;
			if(status === 200) {
				handler(request);
			} else if(status === 404) {
				this.emit('error', [request.responseText]);
			} else {
				this.emit('error', [request.responseText]);
			}
		}.bind(this, request);
	}
}