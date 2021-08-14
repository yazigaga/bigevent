$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = "http://www.liulongbin.top:3008/" + options.url;
    // 为需要有权限的接口设置headers请求头
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || "",
        };
    }
    // 全局统一挂载 complete 回调函数
    options.complete = function(res) {
        // console.log('执行了 complete 回调：')
        // console.log(res)
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.code === 1) {
            // 1. 强制清空 token
            localStorage.removeItem("token");
            // 2. 强制跳转到登录页面
            location.href = "login.html";
        }
    };
});