
# wu.tmpl.js
极简高性能模板引擎  


![性能测试](test/test.png)  
<!-- [性能测试](https://wusfen.github.io/wu.tmpl.js/test/template_test.html) -->


------------------------------------------
## 特性
  * 简单高效
  * 支持初始自动渲染
  * 支持简洁语法({{ }})和原生语法(<% %>)，可同时使用
  * 模板可直接写在目标位置，无需 script 标签或字符串保存模板。也支持这两种方式
  * 支持传参，模板内支持访问全局变量
  * 有进行缓存、传参转为内部变量（不用 with）、过滤频繁更新dom的中间状态等方式优化性能
  * 体积小， 仅 2k 多
  * 支持 node.js, require.js, sea.js


------------------------------------------
## 如何使用

1 . 引入 `<script src="path/to/wu.tmpl.js"></script>`。 下载压缩版 [wu.tmpl.min.js](https://wusfen.github.io/wu.tmpl.js/wu.tmpl.min.js)
```html
<!DOCTYPE html>
<html>
<head>
	<!-- 引入 wu.tmpl.js 。如果使用自动渲染功能，建议放头部 -->
	<script src="../wu.tmpl.min.js"></script>
</head>
<body>

</body>
</html>
```

2 . 声明模板 `wu-tmpl="options"`

`options.render` 是否在页面准备完成时 **自动渲染**
```html
<!DOCTYPE html>
<html>
<head>
    <title>hello world</title>
    <script src="../wu.tmpl.min.js"></script>
</head>
<body>
    <div wu-tmpl="{render:true}">
        hello {{ 'world' }} !
    </div>
</body>
</html>
```

`options.name`   模板名
```html
<!DOCTYPE html>
<html>
<head>
	<script src="../wu.tmpl.min.js"></script>
</head>
<body>

	<div wu-tmpl="{name:'time'}">
		<% var d = new Date %>

		{{ d.getHours() }}:{{ d.getMinutes() }}:{{ d.getSeconds() }}

		<small> {{ ('00'+d.getMilliseconds()).slice(-3) }} </small>
	</div>

	<script>
		setInterval(function () {
			wu.tmpl.render('time');
		}, 41.666667)
	</script>

</body>
</html>
```

`options.data`   模板数据
```html
<!DOCTYPE html>
<html>
<body>
	<ul wu-tmpl="{name:'list', data:data, render:true}">
		{{each list item i}}
		<li>
			{{ item.name }}
		</li>		
		{{/each}}
	</ul>

	<script>
		var data = {
			list:[
				{id:1, name:'Tom'},
				{id:2, name:'Lily'},
				{id:3, name:'Mary'}
			]
		}
	</script>

	<script src="../wu.tmpl.js"></script>
</body>
</html>
```

3 . 更新视图 `wu.tmpl.render(name, data)`
```javascript
@param  {Undefined|String|Object|Element} name -
    Undefined:不传则更新所有模板；
    String:则为模板名；
    Object:模板的参数对象；
    Element:模板元素
@param  {Undefined|Object} data - 模板的参数
```
```javascript
wu.tmpl.render('list')

// or
wu.tmpl.render(data)

// or
wu.tmpl.render('list', newData)

// or
var tpl = document.getElementById('tplId')
wu.tmpl.render(tpl)
```


------------------------------------------
## 手动编译模板

`wu.tmpl(tpl, data)`

```javascript
@param  {String} tpl  template string
@param  {Object | --} data template arguments
@return {String | Function}      data? 'renderResult' : renderFunction
```

```javascript
var render = wu.tmpl('hello {{ "world" }} !')
// => render function
render()
// => hello world !
```

```javascript
wu.tmpl('hello {{ name||"world" }} !', {name:'tom'})
// => hello tom !
```


------------------------------------------
## 模板语法

### 简洁语法
* if, else, else if
```javascript
{{if 条件1}}
 ...
{{else if 条件2}}
 ...
{{else}}
 ...
{{/if}}
```
* each
```javascript
{{each array item index}}
 ...
{{/each}}
```
* {{ 表达式 }}
```javascript
{{ value }}
```

### 原生语法
* `<% ... %>` 可以写任何原生 js，如：  
```html
<ul>
 <% for(var i = 0; i < 100; i++){ %>
 <li>...<li>
 <% } %>
</ul>
```

* `<%= ... %>` 插入表达式，如：
```html
<p> hello <%= 'world' %> ! </p>
```

## data-src
如果模板直接写在目标位置，浏览器会先请求{{src}}，导致404
```html
<img src="{{src}}">
```
避免方式
```html
<img data-src="{{src}}">
```


------------------------------------------
## 例子

查看源代码，看怎么使用

* [hello world](https://wusfen.github.io/wu.tmpl.js/examples/helloWorld.html) | [源码](examples/helloWorld.html)
* [时钟](https://wusfen.github.io/wu.tmpl.js/examples/time.html) | [源码](examples/time.html)
* [动画](https://wusfen.github.io/wu.tmpl.js/examples/animate.html) | [源码](examples/animate.html)
* [ajax](https://wusfen.github.io/wu.tmpl.js/examples/ajax.html) | [源码](examples/ajax.html)
* [list](https://wusfen.github.io/wu.tmpl.js/examples/list.html) | [源码](examples/list.html)
* [原生语法](https://wusfen.github.io/wu.tmpl.js/examples/raw.html) | [源码](examples/raw.html)
