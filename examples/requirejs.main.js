define(['../wu.tmpl'], function(tmpl){

      var tpl = 'hello {{"world"}}';
      var render = tmpl(tpl);

      document.write(render())
})
