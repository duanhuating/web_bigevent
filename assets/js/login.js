$(function() {
    //点击去注册的链接
    $('#link_reg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //点击去登陆的链接
    $('#link_login').on('click', function() {
            $('.login-box').show()
            $('.reg-box').hide()
        })
        //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
        //通过form.verify() 函数自定义校验规则
    form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            //校验两次密码是否一致的规则
            repwd: function(value) {
                //通过属性选择器
                var pwd = $('.reg-box [name="password"]').val();
                if (pwd !== value) {
                    return '两次密码不一致';
                }

            }
        })
        //监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
            e.preventDefault()
            var data = {
                username: $('#form_reg [name="username"]').val(),
                password: $('#form_reg [name="password"]').val()
            }
            $.post('/api/reguser', data, function(res) {
                if (res.status !== 0) {
                    // return console.log(res.message)
                    return layer.msg(res.message)
                }
                // console.log('注册成功');
                layer.msg('注册成功，请登录！');
                //模拟人的点击行为，注册成功之后自动转到登录页面
                $('#link_login').click()
            })
        })
        //监听登录表单的提交事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功！')
                    // console.log(res.token)
                    //将登录成功得到的token字符串，保存到localStorage中
                localStorage.setItem('token', res.token)
                    //跳转到后台主页
                window.location.href = "/index.html"
            }
        })
    })
})