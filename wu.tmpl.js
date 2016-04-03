var wu = wu || {};
(function() {
    var cache = {};
    wu.tmpl = function(tpl, data) {
        var render = function(data) {
            var varArr = Object.keys(data || {}).sort();
            var vars = varArr.join(); // 用于判断传来的data属性有没有变化
            var theCache = cache[tpl] = cache[tpl] || {};

            // 缓存函数体
            if (!theCache.fbd) {
                var fbd = tpl.replace(/&lt;/g, '<').replace(/&gt;/g, '>') //    转义 <>
                    .replace(/(<%=)([\s\S]*?)(%>)/g, '$1_html_+= ($2)\n$3') // <%= %>  [\s\S]允许换行
                    .replace(/(<%)(?!=)([\s\S]*?)(%>)/g, '$1\n\t$2\n$3') // <% js code %>  (?!=)不要匹配到<%= %>
                    .replace(/(^|%>|%>)([\s\S]*?)(<%=|<%|$)/g, function($, $1, $2, $3) { // 边界符外的html, html 中的(\|"|\r|\n) 要转义
                        return '_html_+= "' + $2.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\r?\n/g, '\\n') + '"\n'
                    });
                theCache.fbd = fbd = '\nvar _html_=""\n' + fbd + '\nreturn _html_';
            }

            // vars 不一样则生成新的 fn 并缓存
            if (vars != theCache.vars) {
                var fvars = ''; // 把传来的data转成内部变量，不用with，提高性能
                while (varArr.length) {
                    var v = varArr.shift();
                    fvars += 'var ' + v + '= _data_["' + v + '"]\n';
                }
                theCache.vars = vars;
                theCache.fn = Function('_data_', fvars + theCache.fbd); // fn
            }

            return theCache.fn(data);
        }
        return data ? render(data) : render;
    };
})();
