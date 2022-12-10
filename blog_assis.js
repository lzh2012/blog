// 变量初始化
var sm;
var json;

// 获取数据函数
function GetRequest() {
    const url = location.search;
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
        let str = url.substr(1);
        strs = str.split("&");
        for(let i = 0; i < strs.length; i ++) {
           theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
   return theRequest;
}

// 解码
function getDecode(str){
    return decodeURIComponent(atob(str).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
}

// 显示文章
var showwz = function(data){
    wz_md = getDecode(data["data"]["content"]).replaceAll("\r", "");  // 获取文章markdown（md）数据
    wz_html = marked.parse(wz_md);  // 用marked来转换成html
    document.getElementById('main').innerHTML = wz_html;  // 把文章显示出来
    hljs.highlightAll();  // 代码高亮启动
}

// 主js
function main_js(sm){
    let ages = GetRequest();  // 获取数据
    var content = document.getElementById("main");  // 获取填充内容的div

    // 检查是否报错
    try{
        let id = ages["id"];  // 获取文章id
        var idi = parseInt(id);  // 转换成数字

        // 判断是不是nan，是就显示都有什么文章
        if (isNaN(idi)){
            var innetext = "<p>一共有" + String(sm) + "篇文章</p>";  // 显示文章数量

            // 文章链接
            for (var i=0; i < sm; i++){
                // 构建a标签
                innetext = innetext + '<a href="./topic.html?id=' + String(i + 1) + '">' + json["data"][i]["name"] + '</a><br>';
            }

            // 显示出来
            content.innerHTML = innetext;
            
        }else{
            // 显示文章
            // 判断是不是不在范围
            if (idi <= sm | idi >= 1){
                // 构造api接口url
                var url = json["data"][idi - 1]["_links"]["self"] + "&callback=showwz";
                
                // 通过callback和script标签来加载api，解决跨域问题
                var script_dom = document.createElement('script');  // 创建标签
                script_dom.src = url;  //设置src
                script_dom.language = 'javascript';  // 设置语言
                script_dom.type = 'text/javascript';  // 设置类型
                var head = document.getElementsByTagName('head').item(0);  //获取head标签
                head.appendChild(script_dom);  //添加标签
            }else{
                // 404报错
                content.innerHTML = "<h1>404</h1><h2>" + page_not_found_text + "</h2>";
            }
        }
    }catch(err){
        // 抛出异常并提升用户
        console.error(err);
        content.innerHTML = "<h1>出错了，请打开f12开发人员工具， 并打开控制台(console)， 把里面的内容发到邮箱liurongshuo2022@outlook.com</h1>";
    }
}

// 获取文章回调函数
var haha = function(data){
    console.log(data);  // 记录数据，方便检查
    json = data;  // 方便使用数据
    sm = json["data"].length;  // 获取位置数量
    main_js(sm);  // 运行主js
}
