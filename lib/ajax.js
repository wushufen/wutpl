/*! @preserve https://github.com/wusfen/ajax.js */
!(function (window) {
  if (!window.XMLHttpRequest) {
    window.XMLHttpRequest = function () {
      return new ActiveXObject("Microsoft.XMLHTTP")
    }
  }

  var noop = function () { }

  var typeOf = function (obj) {
    return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
  }

  var extend = function (obj, _obj) {
    for (var key in _obj) {
      var val = obj[key]
      var _val = _obj[key]
      if (typeOf(_val) == 'object') {
        obj[key] = extend(val ? val : {}, _val)
      } else {
        obj[key] = _obj[key]
      }
    }
    return obj
  }

  var map = function (arr, fn) {
    var list = []
    for (var i = 0; i < arr.length; i++) {
      list[i] = fn(arr[i], i)
    }
    return list
  }

  // to x-www-form-urlencoded
  var encodeUrl = function (value) {
    var arr = [] // [ {keys, value}, ]

    !(function loop(keys, value) {

      if (typeOf(value) == 'undefined') {

      } else if (typeOf(value) == 'null') {
        arr.push({ keys: keys, value: '' })

      } else if (typeOf(value) == 'function') {
        arr.push({ keys: keys, value: value() })

      } else if (typeOf(value) == 'object' || typeOf(value) == 'array') {

        for (var k in value) {
          if (!value.hasOwnProperty(k)) continue

          loop(keys.concat(k), value[k]) // [k1,k2,..]
        }

      } else {
        arr.push({ keys: keys, value: value })
      }
    })([], value)

    // [ 'obj[key]=value', ]
    arr = map(arr, function (item, i) {
      var keys = item.keys
      var value = item.value
      var keyPath = ''
      map(keys, function (key, i) {
        var _key = '[' + key + ']'
        if (i == 0) {
          _key = key
        }
        var lastI = keys.length - 1
        if (i == lastI && !isNaN(keys[lastI])) {
          _key = '[]'
        }
        keyPath += _key
      })
      // ecKeyPath=ecValue
      keyPath = encodeURIComponent(keyPath).replace(/%20/g, '+')
      value = encodeURIComponent(value).replace(/%20/g, '+')
      return keyPath + (keyPath ? '=' : '') + value
    })

    // ...&...
    return arr.join('&')
  }

  var setting = {
    base: '',
    url: '',
    type: 'get',
    data: {},
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    async: true,
    cache: false,
    before: noop,
    after: noop,
    success: noop,
    error: noop
  }

  function ajax(options) {
    var _setting = extend({}, setting)
    options = extend(_setting, options)
    options.type = options.type.toUpperCase()
    ajax.options = options

    // before
    if (options.before(xhr, options)) {
      return
    }

    // data
    var data = options.data
    // raw: text||application/json
    if (typeOf(data) == 'string') {
      options.dataStr = data
    }
    // form
    else {
      options.dataStr = encodeUrl(data)
    }

    // href
    options.href = options.url
    if (options.base && !options.url.match('://')) {
      options.href = options.base + '/' + options.url
    }
    if (options.type == 'GET') {
      options.href = options.href + (options.href.match(/\?/) ? '&' : '?') + options.dataStr
    }


    // xhr
    var xhr = new XMLHttpRequest
    ajax.xhr = xhr

    // handle
    xhr.onreadystatechange = function () {
      if (xhr.readyState != 4) return
      // console.log(xhr.readyState, xhr.status, xhr.responseText)

      // res
      var res = xhr.responseText
      try { res = JSON.parse(res) } catch (e) { }
      ajax.res = res

      // after
      if (options.after(xhr, options, res)) {
        return
      }

      // success
      // xhr.status == 0 || 
      var status = xhr.status
      if (status == 0 || (status >= 200 && status < 300) || status == 304) {
        options.success(res)
      }
      // error
      else {
        options.error(xhr)
      }
    }

    // open
    xhr.open(options.type, options.href, options.async)

    // headers
    for (var key in options.headers) {
      xhr.setRequestHeader(key, options.headers[key])
    }

    // no-cache
    if (!options.cache) {
      xhr.setRequestHeader('If-Modified-Since', 0)
    }

    // send
    xhr.send(options.type == 'POST' ? options.dataStr : null)

    return xhr
  }

  ajax.setting = setting
  ajax.post = function (options) {
    options.type = 'POST'
    return ajax(options)
  }
  ajax.get = function (options) {
    options.type = 'GET'
    return ajax(options)
  }
  ajax.config = function (options) {
    return extend(setting, options)
  }
  ajax.setUp = ajax.config

  // export
  if (typeof module != 'undefined') {
    module.exports = ajax
  } else {
    window.ajax = ajax
  }
})(window);