$(function() {
    // 点击去登录
    $("#link_login").on("click", function() {
        $(".login-box").show();
        $(".reg-box").hide();
    });
    // 点击去注册
    $("#link_reg").on("click", function() {
        $(".reg-box").show();
        $(".login-box").hide();
    });
    // 从layui获取form
    var form = layui.form;
    var layer = layui.layer;
    // 通过form.verify（）函数自定义校验规则
    form.verify({
        username: function(value, item) {
            //value：表单的值、item：表单的DOM对象
            if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
                return "用户名不能有特殊字符";
            }
            if (/(^\_)|(\__)|(\_+$)/.test(value)) {
                return "用户名首尾不能出现下划线'_'";
            }
            if (/^\d+\d+\d$/.test(value)) {
                return "用户名不能全为数字";
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if (value === "xxx") {
                alert("用户名不能为敏感词");
                return true;
            }
        },
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败,则return一个提示消息即可
        repwd: function(value) {
            var pwd = $(".reg-box [name=password]").val();
            if (pwd !== value) {
                return "两次密码不一致";
            }
        },
    });
    // 监听注册表单的提交事件
    $("#form_reg").on("submit", function(e) {
        // 阻止表单的默认行为
        e.preventDefault();
        // 发起ajax的post请求
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val(),
            repassword: $("#form_reg [name=repassword]").val(),
        };
        $.post("api/reg", data, function(res) {
            console.log(res);
            if (res.code !== 0) {
                console.log(res);
                return layer.msg(res.message);
            }
            layer.msg("注册成功，请登录！");
            // 模拟人的点击行为
            $("#link_login").click();
        });
    });
    $("#form_login").submit(function(e) {
        // 阻止默认提交行为
        e.preventDefault();
        $.ajax({
            url: "api/login",
            method: "POST",
            data: $(this).serialize(),
            success: function(res) {
                if (res.code !== 0) {
                    return layer.msg("登录失败");
                }
                layer.msg("登录成功");
                console.log(res.token);
                // 保存登录成功得到的token字符串
                localStorage.setItem("token", res.token);
                // 跳转到后台页面
                location.href = "index.html";
            },
        });
    });
});