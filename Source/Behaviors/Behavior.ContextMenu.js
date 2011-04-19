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
description: Adds context menu support for any element with a data-context-menu-actions property and the ContextMenu data-filter. See the JFrame.ContextMenu class for details on usage.
provides: [Behavior.ContextMenu]
requires: [Behavior/Behavior, /ContextMenu]
script: Behavior.ContextMenu.js
...
*/

(function(){

//subclass ContextMenu to create one that knows about JFrame

var JframeContextMenu = new Class({
	Extends: ContextMenu,
	options: {
		//jframe: null,
		adjustLocation: false
	},
	initialize: function(){
		//create a placeholder for when we pop menus out of the jframe (so we can put them back)
		this._placeHolder = new Element('div').hide();
		this.parent.apply(this, arguments);
		//pointer to the jframe; it's wrapped in function to prevent a recurssion issue - 
		//when you run a class instance through $merge (which setOptions does) you get one...
		//this._jframe = $lambda(this.options.jframe)();
		this.applyDelegates = this.options.applyDelegates;
	},
	show: function(x, y){
		if (this.disabled || !this.activeMenu) return;
		//when the menu is shown, put the place holder after the menu
		this._placeHolder.inject(this.activeMenu, 'after');
		//move the menu into the container
		this.activeMenu.inject(this.options.container);
		//apply click delegates to it since it's likely no longer in the jframe (where the delegates start)
		this.applyDelegates(this.activeMenu);
		this.parent(x, y);
	},
	hide: function(){
		if (this.disabled || !this.activeMenu) return;
		//when we hide the menu, put the menu back where it was and pop the placeholder out of the DOM
		this.activeMenu.inject(this._placeHolder, 'after');
		this._placeHolder.dispose();
		this.parent();
	}
});

Behavior.addGlobalFilters({

	//intercept right click behaviors
	ContextMenu: function(element, behaviorAPI){
		//create an instance of JFrame.ContextMenu for each delegate
		var menu = new JframeContextMenu(element, {
			applyDelegates: behaviorAPI.applyDelegates, //pass a function that wraps this jframe instance
			container: behaviorAPI.getContentElement() //inject the menu into the container outside the jframe
		});
		//detatch these whenever we unload jframe
		this.markForCleanup(element, function(){
				menu.hide();
				menu.detach();
		});
	}

});

})();
