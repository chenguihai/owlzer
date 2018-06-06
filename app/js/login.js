$(document).ready(function () {
    $("#captchaCode").attr('src',owlzerOBj.urlLogin+"/captcha?t=" + Math.random());
    $('body').on("click", "#login", function () {
        var credentials = {
              username: $("input[ name='username'] ").val(),
              password: $("input[ name='password'] ").val(),
              pcode: '0x1005',
              verificationcode: $("input[ name='code'] ").val() || '',
              client: 'web',
              from: 0,
              rememberMe: true
          },
          param = "username=" + credentials.username + "&password=" + credentials.password + "&pcode=" + credentials.pcode + "&code=" + credentials.verificationcode + "&client=" + credentials.client + "&from=" + credentials.from + "&rememberMe=" + credentials.rememberMe;
        owlzerOBj.API.loginJson(owlzerOBj.urlLogin, param, function (data) {
            var obj = JSON.parse(data),$yzCodeTip = $('.yzCodeTip');
            if (obj.error_code === 10) {
                // $yzCodeTip.css({display: 'block'}).html('用户未授权');
                $yzCodeTip.css({display: 'block'}).html('User unauthorized');
            }else if (obj.error_code === 3) {//用户名或密码错误
                $('.login_user').addClass('loginActive');
                $('.login_pass').addClass('loginActive');
                // $yzCodeTip.css({display: 'block'}).html("账号或密码不正确");
                $yzCodeTip.css({display: 'block'}).html("Invalid username/password");
            } else if (obj.error_code === 1 || obj.error_code === 2) {//验证码错误或是过期
                $('.login_yzcode').addClass('loginActive');
                // $yzCodeTip.css({display: 'block'}).html("验证码错误或是过期");
                $yzCodeTip.css({display: 'block'}).html("Verification code error");
                $("#captchaCode").attr('src',owlzerOBj.url+"/captcha?t=" + Math.random());
            } else if (obj.error_code === 5) { //账号被禁用
                $yzCodeTip.css({display: 'block'}).html("Account is disabled");
            } else if (obj.error_code === 0) { //登录成功
                $yzCodeTip.css({display: 'none'}).html("");
                sessionStorage.setItem('loginInfo', JSON.stringify(obj.error_info));
                sessionStorage.setItem('loginTime', obj.error_info.system_time);
                var count  = 0 ;
                if(count === 0){
                    location.reload();
                }
                Q.go('table');
            }
        }, function (err) {

        });
    }).on('click','#captchaCode',function () {
        $("#captchaCode").attr('src',owlzerOBj.url+"/captcha?t=" + Math.random());
    });
});
