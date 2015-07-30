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
			diffs.forEach(function(diff) {
				React.render(<Diff diff={diff}></Diff>, document.querySelector('.container'));
			});
		} else {
			// show error;
		}
	};

	req.open("GET", "https://api.github.com/repos/mickylad/glimpse/commits/6d975f2a78c59fc28f1740ba41da60bd62b06969", true);
	req.setRequestHeader("Accept", "application/vnd.github.diff");
	req.send(null);
})();