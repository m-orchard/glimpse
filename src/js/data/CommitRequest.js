import ConnectionService from './ConnectionService';
import {Debouncer} from '../Debouncer';
import {Emitter} from '../event/Emitter';

export class CommitRequest extends Emitter {
	constructor() {
		super();

		this._owner = '';
		this._repo = '';
		this._sha = '';

		Debouncer(this, '_tryLoad', 800);
	}

	setOwner(owner) {
		this._owner = owner;
		this._tryLoad();
	}

	setRepo(repo) {
		this._repo = repo;
		this._tryLoad();
	}

	setSHA(sha) {
		this._sha = sha;
		this._tryLoad();
	}

	_tryLoad() {
		if(!this._owner || !this._repo) {
			this._clear();
		} else if(this._sha) {
			this._requestCommit();
		} else {
			this._requestHEAD();
		}
	}

	_clear() {
		this.emit('load', []);
	}

	_requestCommit() {
		const url = 'https://api.github.com/repos/' + this._owner + '/' + this._repo + '/commits/' + this._sha;

		ConnectionService.get(url)
			.then(this._onCommitResponse.bind(this))
			.catch(this._onError.bind(this));
	}

	_requestHEAD() {
		const url = 'https://api.github.com/repos/' + this._owner + '/' + this._repo + '/git/refs/heads/master';

		ConnectionService.get(url)
			.then(this._onHEADResponse.bind(this))
			.catch(this._onError.bind(this));
	}

	_onCommitResponse(commit) {
		this.emit('load', [commit])
	}

	_onHEADResponse(head) {
		this.setSHA(head.object.sha);

		this._requestCommit();
	}

	_onError(code) {
		this.emit('error', [code]);
	}
}