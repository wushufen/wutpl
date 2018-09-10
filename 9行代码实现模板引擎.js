/*! @preserve https://github.com/wusfen */
function wutpl(tpl){
    var code = tpl
        .replace(/<%=(.*?)%>/g, '\f_html_+= $1\f') // <%= %>
        .replace(/<%(.*?)%>/g, '\f$1\f') // <% %>
        .replace(/(^|\f)([\s\S]*?)(\f|$)/g, function($, $1, $2, $3){ // \f html \f
            return '\n_html_+= "' + $2
                .replace(/\\/g, '\\\\') // \  ->  '\\'
                .replace(/\r?\n/g, '\\n') // \n  ->  '\\n'
                .replace(/"/g, '\\"') // "  ->  '\\"'
                + '"\n'
        })
    return Function('_data_', 'var _html_="";with(_data_){'+code+'}return _html_')
}

// ========== 示例与解析 ==========

// 模板
var tpl = `
<ul>
    <% for(var i=0; i<list.length; i++){ %>
    <li>
        <%= list[i].name %>
    </li>
    <% } %>
</ul>
`

// 编译模板
var render = wutpl(tpl)


// 以上模板实际上编译成了以下代码 (render函数)
function anonymous(_data_) {
    var _html_ = "";
    with (_data_) {
        _html_ += "\n<ul>\n    "
        for (var i = 0; i < list.length; i++) {
            _html_ += "\n    <li>\n        "
            _html_ += list[i].name
            _html_ += "\n    </li>\n    "
        }
        _html_ += "\n</ul>\n"
    }
    return _html_
}


// 渲染数据
var html = render({
    list:[
        {id:1, name:'wsf'},
        {id:2, name:'Tom'}
    ]
})


// 输出结果
console.log(html)
/*
<ul>
    
    <li>
        wsf
    </li>
    
    <li>
        Tom
    </li>
    
</ul>
*/


// 复以上内容到控制台运行即看到结果
