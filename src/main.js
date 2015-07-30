import React from 'react';
import {DiffFactory} from './git/DiffFactory';
import {Diff} from './react/Diff';

(function() {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(req.readyState !== 4) {
			return;
		}

		if(req.status === 200) {
			var diffs = DiffFactory.parseDiffSet(req.responseText);
			React.render(<Diff name="Michael"></Diff>, document.querySelector('.container'));
			console.log(diffs);
		} else {
			// show error;
		}
	};

	req.open("GET", "https://api.github.com/repos/jquery/jquery/commits/1c59b308d201d6dd0f0aed2ad0256d01b9f68047", true);
	req.setRequestHeader("Accept", "application/vnd.github.diff");
	req.send(null);
})();