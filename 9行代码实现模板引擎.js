//https://github.com/wusfen/wu.tmpl.js/blob/master/9%E8%A1%8C%E4%BB%A3%E7%A0%81%E5%AE%9E%E7%8E%B0%E6%A8%A1%E6%9D%BF%E5%BC%95%E6%93%8E.js

Tpl = function(tpl, data) {
    var fn = tpl.replace(/&lt;/g, '<').replace(/&gt;/g, '>') //    转义 <>
        .replace(/(<%=)([\s\S]*?)(%>)/g, '$1_html_+= ($2)\n$3') // <%= %>  [\s\S]允许换行
        .replace(/(<%)(?!=)([\s\S]*?)(%>)/g, '$1\n\t$2\n$3') // <% js code %>  (?!=)不要匹配到<%= %>
        .replace(/(^|%>|%>)([\s\S]*?)(<%=|<%|$)/g, function($, $1, $2, $3) { // 边界符外的html, html中的(\|"|\r|\n)要转义
            return '_html_+= "' + $2.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\n') + '"\n'
        });
    return (fn = Function('data', 'with(data||{}){\nvar _html_=""\n' + fn + '\nreturn _html_\n}')), data ? fn(data) : fn
};


// 麻雀虽小，五脏俱全 （循环，条件，输出变量/表达式）
// 示例
var render = Tpl(String(function(){/*
<ul>
  <% for(var i=0;i<n;i++){ %>
  <li>
    <span> <%= i %> </span>
    <% if( i%2==0 ){ %>
    <span> even </span>
    <% } %>
  </li>
  <% } %>
</ul>
*/}).match(/^.*?\*([\s\S]*)\*/)[1]);


// 以上模板实际上编译成了以下代码(render函数)
/*var render = (function(data) {
    with (data || {}) {
        var _html_ = ""
        _html_ += "\n<ul>\n  "
        
        for (var i = 0; i < n; i++) {
            _html_ += "\n  <li>\n    <span> "
            _html_ += (i)
            _html_ += " </span>\n    "
            
            if (i % 2 == 0) {
                _html_ += "\n    <span> even </span>\n    "
            
            }
            _html_ += "\n  </li>\n  "
        
        }
        _html_ += "\n</ul>\n"
        
        return _html_
    }
})*/


// 使用数据执行渲染
render({n:10})


// 复以上内容到控制台运行即看到结果
