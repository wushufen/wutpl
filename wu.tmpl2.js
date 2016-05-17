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
                var fbd = tpl

                var index = 0;
                var s = 0;
                var e = 0;
                var isJs = false;

                index = tpl.indexOf('<%');
                console.log(index)

                if (isJs) {
                    
                } else {

                }


                theCache.fbd = fbd = '\nvar _html_=""\n' + fbd + '\nreturn _html_';
                console.log(fbd)
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


tpl = `
<ul>
  <% for(var i=0; i< list.length; i++){ %>
      <li> <%= list[i].name %> </li>
  <% } %>
</ul>
`

console.log(wu.tmpl(tpl)())
