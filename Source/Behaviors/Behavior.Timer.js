// Licensed to Cloudera, Inc. under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  Cloudera, Inc. licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/*
---
description: Adds a timer that counts forward from zero or a given value.
provides: [Behavior.Timer]
requires: [Behavior/Behavior, More/Date.Extras]
script: Behavior.Timer.js

...
*/

Behavior.addGlobalFilters({

	Timer: function(element){
		var start = element.getData('start-time');
		var showSeconds = element.hasClass('showSeconds');
		if (start) start = Date.parse(start);
		else start = new Date();
		var prev_value = '';
		var timer = (function(){
			var now = new Date();
			var diff = start.diff(now, 'second');
			if (diff > 60 || !showSeconds) new_value = start.timeDiffInWords();
			else new_value = diff + ' sec';
			if (new_value != prev_value) {
				element.set('html', new_value);
				prev_value = new_value;
			}
		}).periodical(250);
		this.markForCleanup(element, function(){
			$clear(timer);
		});
	}

});