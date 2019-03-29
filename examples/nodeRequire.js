var wutpl = require('../wutpl')

var tpl = `
{{JSON.stringify(list)}}
{{for list item i}}
  [{{i}}]{{item}}: {{if item%2==0 }} %2 = 0 {{/if}}
{{/for}}
`

var render = wutpl(tpl)
// console.log(render.fn.toString())

var rs = render({
  list: [1, 2, 3, 4, 5]
})

console.log(rs)
