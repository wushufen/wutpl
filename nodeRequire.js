var wutmpl = require('./wu.tmpl');

var tpl = `
{{each list item i}} [ {{ item }} ] {{if item%2==0}} 2 {{/if}}
{{/each}}
<% var date = new Date %>
{{ date.getHours() }}:{{date.getMinutes()}}:{{date.getSeconds()}}
`;

var render = wutmpl(tpl);
var out = render({
    list: [1, 2, 3, 4, 5]
});

console.log(out);
