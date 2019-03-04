define(function (require, exports, module) {
    var wutpl = require('../wutpl.js')

    var tpl = 'hello {{"world"}}'
    var render = wutpl(tpl)
    var html = render()

    document.write(html)
})
