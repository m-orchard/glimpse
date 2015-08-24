import React from 'react';
import {DiffSet as DiffSet} from './model/DiffSet';
import {Request} from './data/Request';
import {Diff} from './element/model/Diff';
import {SnapList} from './element/component/SnapList';
import {RequestSetup} from './element/component/RequestSetup';

window.onload = function() {
	const request = new Request();
	request.on('load', function(data) {
		React.render(<SnapList items={DiffSet.parse(data).diffs} type={Diff}></SnapList>, document.querySelector('.data-container'));
	});

	React.render(<RequestSetup request={request}/>, document.querySelector('.request-setup'));
};