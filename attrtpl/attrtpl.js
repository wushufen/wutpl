!function(){
	function attrtpl (tpl, data) {
		var code = '' 

		var div = attrtpl.div || document.createElement('div')
		div.innerHTML = tpl
		loop(div.childNodes)

		function loop(childNodes) {

			for (var i = 0; i < childNodes.length; i++) {
				var node = childNodes[i]

				// tag
				if (node.nodeType==1) {

					// for
					var forAttr = node.getAttribute('v-for') || node.getAttribute('for')
					if (forAttr) {
						if (forAttr.match(' in ')) {
							node.removeAttribute('for')
							var m = forAttr.match(/^(.+?) in (.+?)$/)
							code += 'this.each(' + m[2] + ', function('+ m[1] + ', index){' + '\n'
						} else {
							forAttr = null
						}
					}

					// if
					var ifAttr = node.getAttribute('v-if') || node.getAttribute('if')
					if (ifAttr) {
						node.removeAttribute('if')
						code += 'if(' + ifAttr + '){\n'
					}

					// <tag>
					var tag = node.cloneNode().outerHTML
					var tagLeft = tag.match(/^<.*?>/)[0].replace(/"/g, '\\"')
					tagLeft = tagLeft.replace(/{{/g, '"+(').replace(/}}/g, ')+"')
					code += '_html_+= "' + tagLeft + '"\n'

					// childNodes
					loop(node.childNodes)

					// </tag>
					var tagRightM = node.outerHTML.match(/<\/.*?>$/)
					if (tagRightM) {
						var tagRight = tagRightM[0]
						code += '_html_+= "' + tagRight + '"\n'
					}

					if (ifAttr) {
						code += '}\n\n'
					}
					if (forAttr) {
						code += '})\n\n'
					}
				}

				// text
				if (node.nodeType==3) {
					var string = node.nodeValue
	                .replace(/\\/g, '\\\\') // \  ->  '\\'
	                .replace(/\r?\n/g, '\\n') // \n  ->  '\\n'
	                .replace(/"/g, '\\"') // "  ->  '\\"'

					string = string.replace(/{{/g, '"+(').replace(/}}/g, ')+"')

					code += '_html_+= "' + string+ '"\n'
				}
			}

		}

		var render = Function('_data_', 'var _html_=""\nwith(_data_){' + code + '}return _html_')
		var _this = {
			each: function (list, fn) {
				for (var i = 0; i < list.length; i++) {
					fn(list[i], i)
				}
			}
		}
		var fn = function (data) {
			return render.call(_this, data)
		}
		fn.render = render

		return data? fn(data): fn
	}

	if (typeof module != 'undefined') {
		module.exports = attrtpl
	} else {
		window.attrtpl = attrtpl
	}
}()
