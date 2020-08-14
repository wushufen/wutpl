
# wutpl.js
极简高性能模板引擎  

## 特点
本模板引擎主要解决以下问题
* 有的模板引擎语法太复杂或者比较奇怪
* 有的模板引擎性能性能较差，比如使用了 `with` 
* 有的模板引擎不能直接使用全局变量（比如 `parseInt`, `Math`, `JSON` 等）
* 有的模板引擎使用变量需要加前缀，比如 `this.value`, `data.value`, `it.value`

## 性能测试
[点这测试](https://wusfen.github.io/wutpl/test/template_test.html?v=20190304.1644)  
![性能测试](https://wusfen.github.io/wutpl/test/test.20190308.1422.png)  


## 使用方法
```html
<!DOCTYPE html>
<html>

<head>
  <!-- 1: 引入wutpl，支持 es6 requireJS seaJS -->
  <script src="../wutpl.js"></script>
</head>

<body>

  <!-- 2: 编写模板 -->
  <div id="tpl">
    {for list item}
    <span>{item}</span>
    {/for}
  </div>

  <!-- 3: 编译与渲染 -->
  <script>
    var render = wutpl(tpl)
    render({
      list: [1, 2, 3]
    })
  </script>

</body>

</html>
```

## 安装
```
npm i -D wutpl
```
or
```html
<script src="../wutpl.js"></script>
```


## API
```javascript
var render = wutpl(tpl)
var html = render(data)
```
```javascript
var html = wutpl(tpl, data)
```
* tpl: {String|Node} 字符串模板或者dom节点，dom节点使用innerHTML作为模板
* data: {Object} 模板数据
* render(data): {Function} 渲染函数，若模板为dom节点，render会自动更新视图
* html: {String} 渲染后的html字符串


## 模板语法

* 超简洁的模板语法
```javascript
 {for array item index?} {/for}

 {for object value key? index?} {/for}

 {if bool} yes {else} no {/if}

 {text}

 {#html}
```
* wutpl-src
```html
<!-- 如果用html节点做为模板，浏览器解析到该节点马上就请求{src}，会有一个不必要的404 -->
<img src="{src}">
<!-- 可以这样去掉这个404 -->
<img wutpl-src="{src}">
```
* table each
```html
<!-- 如果用html节点做为模板， `<table>` 等标签之间是不允许有文本的，可用注释写法 -->
<table>
  <tbody>
    <!-- {for list item} -->
    <tr>
      <td>{item.name}</td>
    </tr>
    <!-- {/for} -->
  </tbody>
</table>
```

## 标签配置
默认
```javascript
  wutpl.leftTag = '<!-- {|{'
  wutpl.rightTag = '} -->|}'
```
可以自定义为双花括号
```javascript
  wutpl.leftTag = '<!-- {{|{{'
  wutpl.rightTag = '}} -->|}}'
```


## 实例

* [hello world](https://wusfen.github.io/wutpl/examples/helloWorld.html) | [源码](examples/helloWorld.html)
* [list](https://wusfen.github.io/wutpl/examples/list.html) | [源码](examples/list.html)
* [ajax](https://wusfen.github.io/wutpl/examples/ajax.html) | [源码](examples/ajax.html)
* [xss](https://wusfen.github.io/wutpl/examples/xss.html) | [源码](examples/xss.html)
* [时钟](https://wusfen.github.io/wutpl/examples/time.html) | [源码](examples/time.html)
* [动画](https://wusfen.github.io/wutpl/examples/animate.html) | [源码](examples/animate.html)
