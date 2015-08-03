import React from 'react';
import {DiffSet as DiffSetModel} from './model/DiffSet';
import {DiffSet} from './element/DiffSet';

(function() {
	let req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(req.readyState !== 4) {
			return;
		}

		if(req.status === 200) {
			let diffSet = DiffSetModel.parse(req.responseText);
			React.render(<DiffSet diffSet={diffSet}></DiffSet>, document.querySelector('.container'));
		} else {
			// show error;
		}
	};

	req.open("GET", "https://api.github.com/repos/mickylad/glimpse/commits/dde4c1d0166057e0bf679156eb72e2aef19ff65c", true);
	req.setRequestHeader("Accept", "application/vnd.github.diff");
	req.send(null);
})();