(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Diff = function Diff(files, index, leftFile, rightFile, changeSets) {
	_classCallCheck(this, Diff);

	this.files = files;
	this.index = index;
	this.leftFile = leftFile;
	this.rightFile = rightFile;
	this.changeSets = changeSets;
};

exports.Diff = Diff;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Diff = require('./Diff');

var DiffFactory = (function () {
	function DiffFactory() {
		_classCallCheck(this, DiffFactory);
	}

	_createClass(DiffFactory, null, [{
		key: 'parseDiffSet',
		value: function parseDiffSet(diffSet) {
			var diffs = diffSet.split('diff');
			diffs.shift();

			return diffs.map(function (diff) {
				return diff.split("\n");
			}).map(DiffFactory.parseDiff);
		}
	}, {
		key: 'parseDiff',
		value: function parseDiff(lines) {
			var files = lines.shift();
			var index = lines.shift();
			var leftFile = lines.shift();
			var rightFile = lines.shift();
			var changeSets = [];
			var changeSet;

			do {
				changeSet = {
					indices: lines.shift(),
					lines: []
				};

				do {
					changeSet.lines.push(lines.shift());
				} while (lines.length && lines[0].indexOf('@@') !== 0);

				changeSets.push(changeSet);
			} while (lines.length);

			return new _Diff.Diff(files, index, leftFile, rightFile, changeSets);
		}
	}]);

	return DiffFactory;
})();

exports.DiffFactory = DiffFactory;

},{"./Diff":1}],3:[function(require,module,exports){
"use strict";

var _gitDiffFactory = require('./git/DiffFactory');

(function () {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function () {
		if (req.readyState !== 4) {
			return;
		}

		if (req.status === 200) {
			var diffs = _gitDiffFactory.DiffFactory.parseDiffSet(req.responseText);
			console.log(diffs);
		} else {
			// show error;
		}
	};

	req.open("GET", "https://api.github.com/repos/jquery/jquery/commits/1c59b308d201d6dd0f0aed2ad0256d01b9f68047", true);
	req.setRequestHeader("Accept", "application/vnd.github.diff");
	req.send(null);
})();

},{"./git/DiffFactory":2}]},{},[3])


//# sourceMappingURL=glimpse.js.map