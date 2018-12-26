var attrtpl = function (tpl, data) {
	var html = '' 

	var div = attrtpl.div || document.createElement('div')
	div.innerHTML = tpl
	loop(div.childNodes)

	function loop(childNodes) {

		for (var i = 0; i < childNodes.length; i++) {
			var node = childNodes[i]

			// tag
			if (node.nodeType==1) {

				var forAttr = node.getAttribute('for')
				if (forAttr) {
					if (forAttr.match(' in ')) {
						node.removeAttribute('for')
						var m = forAttr.match(/^(.+?) in (.+?)$/)
						html += 'this.each(' + m[2] + ', function('+ m[1] + ', index){' + '\n'
					} else {
						forAttr = null
					}
				}

				var ifAttr = node.getAttribute('if')
				if (ifAttr) {
					node.removeAttribute('if')
					html += 'if(' + ifAttr + '){\n'
				}

				var tag = node.cloneNode().outerHTML
				var tagLeft = tag.match(/^<.*?>/)[0].replace(/"/g, '\\"')
				tagLeft = tagLeft.replace(/{{/g, '"+(').replace(/}}/g, ')+"')
				html += '_html_+= "' + tagLeft + '"\n'

				// <tag> ^^^^^^^^^^^^^
				
				loop(node.childNodes)

				// </tag> vvvvvvvvvvvvv

				var tagRightM = node.outerHTML.match(/<\/.*?>$/)
				if (tagRightM) {
					var tagRight = tagRightM[0]
					html += '_html_+= "' + tagRight + '"\n'
				}

				if (ifAttr) {
					html += '}\n\n'
				}
				if (forAttr) {
					html += '})\n\n'
				}
			}
			// text
			if (node.nodeType==3) {
				var string = node.nodeValue
                .replace(/\\/g, '\\\\') // \  ->  '\\'
                .replace(/\r?\n/g, '\\n') // \n  ->  '\\n'
                .replace(/"/g, '\\"') // "  ->  '\\"'

				string = string.replace(/{{/g, '"+(').replace(/}}/g, ')+"')

				html += '_html_+= "' + string+ '"\n'
			}
		}

	}

	var render = Function('_data_', 'var _html_=""\nwith(_data_){' + html + '}return _html_')
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


/*
var tpl = `
exp: {{exp}}

<input type="text" />

<div for="item in list">

	<span if="item.bool"> o </span>
	{{item.name}}

</div>


`

var code = 
`
_html_+= "exp: " + (exp) + ""

this.each(list, function(item, index){  _html_+= "<div   >"

	if (item.bool) { _html_+= "<span   >"

		_html_+= "yes"

	_html_+= "</span>"}

_html_+= "</div>"})

`


var render = attrtpl(tpl)

var html = render({
	exp: 'hello world',
	list: [
		{bool:false, name:'wsf'}
	]
})

console.log(html)
*/