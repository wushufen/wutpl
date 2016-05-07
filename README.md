
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


------------------------------------------
## 如何使用

1 . 引入 `<script src="wu.tmpl.js"></script>`。 下载压缩版 [wu.tmpl.min.js](https://cdn.rawgit.com/wusfen/wu.tmpl.js/master/wu.tmpl.min.js)
```html
<!DOCTYPE html>
<html>
<body>

  <script src="wu.tmpl.js"></script>
</body>
</html>
```

2 . 声明模板 `wu-tmpl`。将会在页面准备完成时 **自动渲染**
```html
<!DOCTYPE html>
<html>
<body>

	<div wu-tmpl>
		hello {{ 'world' }} !
	</div>

	<script src="wu.tmpl.js"></script>
</body>
</html>
```

3 . 传入参数 `wu-tmpl="data"`。可选
```html
<!DOCTYPE html>
<html>
<body>

	<div wu-tmpl>
		hello {{ 'world' }} !
	</div>

	<ul wu-tmpl="data">
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

	<script src="wu.tmpl.js"></script>
</body>
</html>
```

4 . 再渲染 `wu.tmpl.render(name)`。一条语句搞定
```javascript
@param  {} name          如果不传，则更新所有模板
@param  {String} name    'data' 
@param  {Object} name    data
@param  {Element} name   element
```
```javascript
wu.tmpl.render('data')

// or
wu.tmpl.render(data)

// or
var tpl = documents.getElementById('tplId')
wu.tmpl.render(tpl)
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
* <% ... %> 可以写任何原生 js，如：  
```
<ul>
 <% for(var i = 0; i < 100; i++){ %>
 <li>...<li>
 <% } %>
</ul>
```

* <%= ... %> 插入表达式，如：
```
<p> hello <%= 'world' %> ! </p>
```

