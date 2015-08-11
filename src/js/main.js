import React from 'react';
import {DiffSet as DiffSet} from './model/DiffSet';
import {Diff} from './element/model/Diff';
import {SnapList} from './element/component/SnapList';

(function() {
	let req = new XMLHttpRequest();
	req.onreadystatechange = function() {
		if(req.readyState !== 4) {
			return;
		}

		if(req.status === 200) {
			let diffSet = DiffSet.parse(req.responseText);
			React.render(<SnapList items={diffSet.diffs} type={Diff}></SnapList>, document.querySelector('.container'));
		} else {
			// show error;
		}
	};

	req.open("GET", "https://api.github.com/repos/mickylad/glimpse/commits/dde4c1d0166057e0bf679156eb72e2aef19ff65c", true);
	req.setRequestHeader("Accept", "application/vnd.github.diff");
	req.send(null);
})();