# wu.tmpl.js
极简高性能模板引擎

============

![性能测试](test/test.png)  
<!--[性能测试](https://wusfen.github.io/wu.tmpl.js/test/template_test.html)-->


## 特性
  * 简单高效
  * 支持初始自动渲染
  * 支持简洁语法({{ }})和原生语法(<% %>)，可同时使用
  * 模板可直接写在目标位置，无需 script 标签或字符串保存模板。也支持这两种方式
  * 支持传参，模板内支持访问全局变量
  * 有进行缓存、传参转为内部变量（不用 with）、过滤频繁更新dom的中间状态等方式优化性能


## 10秒上手

在标签上加上 `wu-tmpl` 属性即可声明为模板，并会在页面准备完时 **自动渲染**，`"data"` 就是要传入的参数


```html
<!DOCTYPE html>
<html>
<head>
  <script src="../wu.tmpl.js"></script>
</head>
<body>

  <h1>example1</h1>

  <ul wu-tmpl="data">
    {{each list item i}}
    <li> {{item.name}} </li>
    {{/each}}
  </ul>

  <script>
    var data = {
      list:[
        {id:1, name:'tom'},
        {id:2, name:'lily'},
        {id:3, name:'mary'}
      ]
    }
  </script>

</body>
</html>
```
