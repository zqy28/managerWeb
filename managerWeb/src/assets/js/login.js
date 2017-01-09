import $ from 'jquery';
window.$ = $;
window.jQuery = $;
jQuery.ajaxSetup({
    contentType : "application/x-www-form-urlencoded;charset=utf-8",
    complete : function(XMLHttpRequest, textStatus) {
        var sessionstatus = XMLHttpRequest.getResponseHeader("sessionstatus"); // 通过XMLHttpRequest取得响应头，sessionstatus，
        if (sessionstatus == "timeout") {
            // 如果超时就处理 ，指定要跳转的页面
            window.location.replace("/EventManager/index.htm");
        }
    }
}); 

$(document).ready(function () {
    $("#login-btn").click(
        function () {
            let usrName = $("#usr-name").val();
            let usrPassword = $("#usr-password").val();
            if ((!!usrName) && (!isNaN(usrName))) {
                $.ajax({
                    type: "POST",
                    url: "loginAction",
                    data: { usrName: usrName, usrPassword: usrPassword },
                    dataType: 'json',
                    timeout: 3000, //超时时间：3秒
                    cache: false,
                    success: function (data) {
                        if (data.resultCode === "1") {
                            location.href = "./main.html";
                        } else {
                            $("#login-message").html(data.resultMessage).css("color", "red");
                        }
                    },
                    error: (xhr, status, err) => {
                        if (!xhr.responseText) {
                            xhr.responseText = "连接服务器超时,请刷新重试";
                        }
                        $("#login-message").html(xhr.responseText).css("color", "red");
                    }
                })
            } else if (!usrName) {
                $("#login-message").html("用户名不能为空").css("color", "red");
            } else {
                $("#login-message").html("用户名应为手机号").css("color", "red");
            }
        }
    )
    $("#logout-btn").click(function () {
        $.ajax({
            type: "POST",
            url: "logoutAction",
            cache: false,
            success: function (data) {
                location.href = "/EventManager/index.html";
            },
            error: (xhr, status, err) => {
                if (!xhr.responseText) {
                    xhr.responseText = "连接服务器超时,请刷新重试";
                }
                $("#login-message").html(xhr.responseText).css("color", "red");
            }
        })
    })
})