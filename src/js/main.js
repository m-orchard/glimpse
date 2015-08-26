import React from 'react';
import {Commit} from './model/Commit';
import {CommitRequest} from './data/CommitRequest';
import {Diff} from './element/model/Diff';
import {SnapList} from './element/component/SnapList';
import {CommitSetup} from './element/component/CommitSetup';

window.onload = function() {
	const commit = new CommitRequest();
	commit.on('load', function(data) {
		if(data) {
			React.render(<SnapList items={Commit.parse(data).changes} type={Diff}></SnapList>, document.querySelector('.data-container'));
		} else {
			React.unmountComponentAtNode(document.querySelector('.data-container'));
		}
	});

	React.render(<CommitSetup commit={commit}/>, document.querySelector('.request-setup'));
};