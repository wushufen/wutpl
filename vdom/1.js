失败
if 不能控制后代



/*
var tpl = `
<div>
	exp: {{exp}}

	<input type="text" />

	<div for="item in list" :class="{todo}" :attr="todo" @click="todo">

		<span if="item.bool"> o </span>
		{{item.name}}

	</div>
</div>
`

var code = 
`
this.element({
	id: id,
	attr: {},
	class: {},
	style: {},
	props: {},
	event: {},
	children:[
		'exp: '+(exp)+'',
		this.elementGroup(list, function (item, index) {return{
			id: id,
			event: {
				click: function () {todo()}
			},
			children: [
				this.element({
					isRemove: !(item.bool),
					children: ['o']
				}),
				item.name,
			]
		}})
	]
})
`
*/



This = {
	nodeMap: {},
	id: 0,
	code: '',
	compile: function (node) {
		this.code = ''
		this.scan([node])

		var fun = Function('_data_', 'with(_data_){'+ this.code + '}')
		return fun
	},
	scan: function (nodeList) {
		for (var i = 0; i < nodeList.length; i++) {
			var node = nodeList[i]
			var isLast = i == nodeList.length - 1

			// tag
			if (node.nodeType == 1) {
				var id = node._id_ = this.newId()
				this.nodeMap[id] = node

				// for
				var for_ = node.getAttribute('for')
				var forM = String(for_).match(/^(.+?) in (.+?)$/)
				if (forM) {
					node.removeAttribute('for')
				} else {
					for_ = null
				}
				// if
				var if_ = node.getAttribute('if')
				if (if_) {
					node.removeAttribute('if')
				} else {
					if_ = 'true'
				}

				// element
				if (for_) {
					this.code += 'this.elementGroup(' + forM[2] + ', function('+ forM[1] + ', index){return'
				} else {
					this.code += 'this.element('
				}
				// options
				this.code += '{\n'
				this.code += '  id:' + id + ',\n'
				this.code += '  isRemove: !(' + if_ + '),\n'
				this.scan(node.attributes)
				this.code += '  children:[\n'
				this.scan(node.childNodes)
				this.code += '  ]\n'
				this.code += '}'
				if (for_) {
					this.code += '})'
				} else {
					this.code += ')'
				}
				this.code += isLast? '\n': ',\n'
			}
			// attr
			if (node.nodeType == 2) {

			}
			// text
			if (node.nodeType == 3) {
				var value = node.nodeValue
                .replace(/\\/g, '\\\\') // \  ->  '\\'
                .replace(/\r?\n/g, '\\n') // \n  ->  '\\n'
                .replace(/"/g, '\\"') // "  ->  '\\"'

				value = value.replace(/{{/g, '"+(').replace(/}}/g, ')+"')

				this.code += '"' + value + '"'
				this.code += isLast? '\n': ',\n'
			}
		}
	},
	newId: function () {
		return ++ this.id
	},
	element: function (options) {
		var id = options.id
		var node = this.nodeMap[id]

		return node
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
	}
}
