//每次调用get post ajax的时候，会先调用这个函数，在这个函数中拿到我们的配置项
$.ajaxPrefilter(function(options) {
    // console.log(options);
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
})