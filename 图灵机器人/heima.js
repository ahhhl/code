var heima = {
  ajax: function(options) {
    // 实例化ajax对象 小黄人
    var xhr = new XMLHttpRequest()
    // 判断是否为get请求 拼接数据
    if (options.type == 'get') {
      // url?key=value
      options.url += '?'
      options.url += options.data
    }
    // 设置请求的方法和地址
    xhr.open(options.type, options.url)
    // post的请求 设置请求头
    if (options.type == 'post') {
      xhr.setRequestHeader(
        'Content-type',
        'application/x-www-form-urlencoded'
      )
    }
    // 注册回调函数
    xhr.onload = function() {
      // console.log(xhr.responseText)
      // JSON.parse(xhr.responseText)
      // return xhr.responseText
      options.callback(xhr.responseText)
    }
    // 发送请求 post的 数据在send中传递
    if (options.type == 'post') {
      xhr.send(options.data)
    } else {
      xhr.send()
    }
  }
}
