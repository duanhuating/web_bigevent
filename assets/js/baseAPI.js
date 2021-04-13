//每次调用get post ajax的时候，会先调用这个函数，在这个函数中拿到我们的配置项
$.ajaxPrefilter(function(options) {
    // console.log(options);
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

    //统一为有权限的接口，设置请求头headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //全局统一挂载complete回调函数
    options.complete = function(res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //1.强制清空token
            localStorage.removeItem('token');
            //2.强制跳转到登录页面
            location.href = 'login.html'
        }
    }

})