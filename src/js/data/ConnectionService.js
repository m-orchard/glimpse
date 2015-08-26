class ConnectionService {
	constructor() {
		this._cache = {};
	}

	get(url) {
		if(this._cache[url]) {
			return Promise.resolve(this._cache[url]);
		}

		return new Promise(this._request.bind(this, url));
	}

	_request(url, success, error) {
		const request = new XMLHttpRequest();
		request.onreadystatechange = function() {
			if(request.readyState !== 4) {
				return;
			}

			const status = request.status;
			if(status === 200) {
				const response = JSON.parse(request.responseText);
				this._cache[url] = response;

				success(response);
			} else if(status === 404) {
				delete this._cache[url];

				error(status);
			}
		}.bind(this);

		request.open('GET', url, true);
		request.send(null);
	}
}

const connectionService = new ConnectionService();

export default connectionService;