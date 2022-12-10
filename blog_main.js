// 构造api接口url
var url = "https://api.github.com/repos/" + gitrepos + "/contents/topics" + "?callback=haha"

// 通过callback和script标签来加载api，解决跨域问题
var script_dom = document.createElement('script');  // 创建标签
script_dom.src = url;  //设置src
script_dom.language = 'javascript';  // 设置语言
script_dom.type = 'text/javascript';  // 设置类型
var head = document.getElementsByTagName('head').item(0);  //获取head标签
head.appendChild(script_dom);  //添加标签
