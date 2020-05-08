define(['../wutpl'], function (wutpl) {

  var tpl = 'hello {"world"}'
  var render = wutpl(tpl)
  var html = render()

  document.write(html)
})
