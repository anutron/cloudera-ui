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
description: When splitviews are folded open or shut, it will refresh the JFrame with the fake_refresh linker for partial refresh compontents. The clicked link must have a data-splitview-resize or data-splitview-toggle value with a JSON string value for "partialRefresh" = true.
provides: [Behavior.SplitViewPostFold]
requires: [Behavior/Behavior.SplitView]
script: Behavior.SplitViewPostFold.js
...
*/
Behavior.addGlobalPlugin('SplitView', 'SplitViewPostFoldRefresh', function(element, behaviorAPI){
	var splitview = element.retrieve('SplitView');
	if (!splitview) {
		behaviorAPI.warn("warning, couldn't find splitview instance for %o", element);
		return;
	}
	splitview.addEvent('postFold', function(data, event, link){
		if (!document.id(document.body).hasChild(link)) return;
		if (data.partialRefresh) {
			if ($type(data.partialRefresh) == "string") link = new Element('a', { href: data.partialRefresh });
			behaviorAPI.invokeLinker('.jframe-fake_refresh', link, event);
		}
	});
});
