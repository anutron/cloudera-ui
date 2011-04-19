/*
---
name: Behavior.CollapsingElements Tests
description: n/a
requires: [Cloudera-UI/Behavior.CollapsingElements, Behavior-Tests/Behavior.SpecsHelpers]
provides: [Behavior.CollapsingElements.Tests]
...
*/

(function(){

	var str = '<div data-filters="CollapsingElements" data-CollapsingElements-options="\'togglers\': \'.tog\', \'sections\': \'.sect\'"><a class="tog">toggler</a><div class="sect">section</div><a class="tog">toggler</a><div class="sect">section</div></div>';
	Behavior.addFilterTest({
		filterName: 'CollapsingElements',
		desc: 'Creates an instance of CollapsingElements',
		content: str,
		returns: CollapsingElements,
		expectations: [
			function(element, instance){
				var togs = element.getElements('.tog');
				var sects = element.getElements('.sect');
				instance.toggle(togs[1]);
				waits(700);
				runs(function(){
					expect(sects[1].getStyle('display')).toBe('none');
				});
			}
		]
	});
	Behavior.addFilterTest({
		filterName: 'CollapsingElements',
		desc: 'Creates an instance of CollapsingElements',
		content: str,
		returns: CollapsingElements,
		multiplier: 10,
		noSpecs: true
	});


})();