# wu.tmpl.js
极简高性能模板引擎

============

![性能测试](test/test.png)
[性能测试](https://wusfen.github.io/wu.tmpl.js/test/template_test.html)


## Usage 使用方法

### 模板
```html
<!-- 注意这里的 type 不是 javascript，只是模板的容器 -->
<script id="test" type="text/html">
<ul>
  <% for(var i=0; i< list.length; i++){ %>
      <li> <%= list[i].name %> </li>
  <% } %>
</ul>
</script>
```

### 数据
```javascript
<script>
var list = [
    {id: 1, name: 'name1'},
    {id: 2, name: 'name2'},
    {id: 3, name: 'name3'}
]
</script>
```

### 渲染
```javascript
var tpl = document.getElementById('test').innerHTML;

var render = wu.tmpl(tpl); // 返回一个渲染函数

var result = render(); // 执行渲染得到结果

// 输出结果
document.getElementById('result').innerHTML = result;
```
```javascript
// 上面使用的是全局变量，这样并不太好。可以把需要的参数传入
var data = {
  list: {...},
  // ... 其它变量
}

var render = wu.tmpl(tpl);
var result = render(data); // 传入参数

// ... 数据变化后，再次渲染
var result = render(data);

// 还可以这样写
var result = wu.tmpl(tpl)(data);

// 或者这样
var result = wu.tmpl(tpl, data);
```

### 结果
```html
<div id="result">
<ul>
  
      <li> name1 </li>
  
      <li> name2 </li>
  
      <li> name3 </li>
  
</ul>
</div>
```
