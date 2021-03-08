/*
this.element({
	isRemove: false,
	uid: uid,
	tag: '',
	class: {},
	style: {},
	attr: {},
	props: {},
	events: {},
	children: [
		this.elementGroup(list, function(item, index){return{
			children: []
		}}),
		'text'
	]
})
*/


var This = {
	element: function (options) {
		var children = []
		this.each(options.children, function (node, index) {
			if (node.isGroup) {
				this.each(node.list, function (node, index) {
					!node.isRemove && children.push(node)
				})
			} else {
				!node.isRemove && children.push(node)
			}
		})
		options.children = children
		return options
	},
	elementGroup: function (list, fn) {
		var group = {
			isGroup: true,
			list: []
		}
		this.each(list, function (item, index) {
			var node = fn.apply(this, [item, index])
			group.list.push(node)
		})
		return group
	},
	each: function (list, fn) {
		for (var i = 0; i < list.length; i++) {
			fn.apply(this, [list[i], i])
		}
	},
	diff: function (last, current) {
		
	}
}

function VM(options) {
	
}




var vdom = This.element({
	children: [
		'text',
		This.elementGroup([1,2,3], function(item, i){
			return {
				isRemove: item==2,
				children: item
			}
		})
	]
})

console.log(vdom)

