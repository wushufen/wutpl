define(function(require, exports, module) {
    var tmpl = require('../wu.tmpl.js');

    var tpl = 'hello {{"world"}}';
    var render = tmpl(tpl);

    document.write(render())
});
