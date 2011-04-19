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
description: Attaches a delegated click listener to a container to watch for clicks on a "toggler" that uses Fx.Reveal to hide/show a "section".
provides: [CollapsingElements]
requires: [More/Fx.Reveal]
script: Collapsible.js

...
*/

var CollapsingElements = new Class({
	Implements: [Options, Events],
	options: {
		togglers: '.collapser',
		sections: '.collapsible',
		onWarn: function(){
			if (window.dbug) dbug.warn.apply(dbug, arguments);
		}
	},
	initialize: function(element, options){
		this.element = document.id(element);
		this.setOptions(options);
		this._boundHandler = this.clickHandler.bind(this);
		this.attach();
	},
	attach: function(method){
		this.element[method || 'addEvent']('click:relay(' + this.options.togglers + ')', this._boundHandler);
		return this;
	},
	detach: function(){
		this.attach('removeEvent');
		return this;
	},
	clickHandler: function(e, clicked){
		e.preventDefault();
		this.toggle(clicked);
	},
	toggle: function(toggler){
		var togglers = this.element.getElements(this.options.togglers);
		var sections = this.element.getElements(this.options.sections);
		if(togglers.length != sections.length) {
			this.fireEvent('warn', ['CollapsingElements filter exiting; togglers length (%s) != sections length (%s)', togglers.length, sections.length]);
			return;
		}
		var section = sections[togglers.indexOf(toggler)];
		if (section) section.get('reveal').toggle();
		return this;
	}
});