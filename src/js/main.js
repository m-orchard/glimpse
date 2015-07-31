import React from 'react';
import {DiffSet as DiffSetModel} from './model/DiffSet';
import {DiffSet} from './element/DiffSet';

(function() {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(req.readyState !== 4) {
			return;
		}

		if(req.status === 200) {
			var diffSet = DiffSetModel.parse(req.responseText);
			React.render(<DiffSet diffSet={diffSet}></DiffSet>, document.querySelector('.container'));
		} else {
			// show error;
		}
	};

	req.open("GET", "https://api.github.com/repos/mickylad/glimpse/commits/359c2d9b8ef5408cd983b90a0639d0ff66c2bbea", true);
	req.setRequestHeader("Accept", "application/vnd.github.diff");
	req.send(null);
})();