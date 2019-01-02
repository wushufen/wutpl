失败
事件不能用 for 的 item

/*
this.element({
	id: 0,
	isIf: false,
	isFor: false,
	props: {},
	events: {
		click: function(){},
	},
	children: function(item,key,index){return[
		'text'
	]}
})
*/

This = {
	nodeMap: {},
	id: 0,
	code: '',
	compile: function (node) {
		var _this = this
		this.code = ''
		this.scan([node])

		var fun = Function('_data_', 'with(_data_){return '+ this.code + '}')
		var fn = function (data) {
			return fun.apply(_this, [data])
		}
		return fn
	},
	scan: function (nodeList) {
		for (var i = 0; i < nodeList.length; i++) {
			var node = nodeList[i]
			var isLast = i == nodeList.length - 1

			// tag
			if (node.nodeType == 1) {
				var id = node._id_ = this.newId()
				this.nodeMap[id] = node

				var if_ = node.getAttribute('if')
				var for_ = node.getAttribute('for')
				var forM = String(for_).match(/^(.+?) in (.+?)$/)
				var forArgs = ''
				if (forM) {
					forArgs = forM[1]
				}

				this.code += 'this.element({'
				this.code += ' id:' + id + ','
				this.code += ' isFor:' + (forM? 'true': 'false') + ','
				this.code += ' forValue:' + (forM? forM[2]: 'null') + ','
				this.code += ' isIf:' + (if_? 'true': 'false') + ','
				this.code += ' ifValue:' + (if_? if_: 'null') + ','
				this.code += ' props: {' 
				this.scan(node.attributes)
				this.code += '},'
				this.code += ' children: function('+forArgs+'){return['
				this.scan(node.childNodes)
				this.code += ' ]}'
				this.code += '})'
				this.code += isLast? '\n': ',\n'

			}
			// attr
			if (node.nodeType == 2) {
				if (node.nodeName.match(/^:/)) {
					this.code += '"' + node.nodeName + '": ' + node.nodeValue
					this.code += isLast? '\n': ',\n'
				}
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

		if (options.isFor) {
			var group = {
				isGroup: true,
				list: options.children.apply(this)
			}
			return group
		} else {
			if (options.isIf) {

			}
			return node
		}

	},
	each: function (list, fn) {
		for (var i = 0; i < list.length; i++) {
			fn.apply(this, [list[i], i])
		}
	}
}
