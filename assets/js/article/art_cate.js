$(function() {
    var layer = layui.layer
    var form = layui.form
    initArticleCateList()
        //获取文章分页的列表
    function initArticleCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var htmlStr = template('tpl-table', res);
                //将其熏染到想要渲染的地方
                $('tbody').html(htmlStr)
            }
        })
    }
    //添加类别按钮绑定点击事件
    var indexAdd = null;
    $('#btnAddCate').on('click', function() {
            indexAdd =
                layer.open({
                    type: 1,
                    area: ['500px', '250px'],
                    title: '添加文章分类',
                    content: $('#dialog-add').html()
                });
        })
        //通过代理的方式，为form-add表单绑定submit事件
        //当发生表单提交事件的时候，事件冒泡到父亲身上，触发这个处理函数
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArticleCateList()
                layer.msg('新增成功');
                //根据索引关闭对应的弹出层
                layer.close(indexAdd);
            }
        })
    })
    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function() {
            indexEdit =
                layer.open({
                    type: 1,
                    area: ['500px', '250px'],
                    title: '修改文章分类',
                    content: $('#dialog-edit').html()
                });
            var id = $(this).attr('data-id')
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    form.val('form-edit', res.data)
                }
            })
        })
        //为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
            e.preventDefault();
            $.ajax({
                method: 'POST',
                url: '/my/article/updatecate',
                data: $(this).serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('更新数据失败！')
                    }
                    layer.msg('更新数据成功')
                    layer.close(indexEdit)
                    initArticleCateList()
                }
            })
        })
        //通过代理的方式为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id');
        //提示是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除数据失败')
                    }
                    layer.msg('删除成功')
                        // layer.close(index);
                    initArticleCateList()
                }
            })
            layer.close(index);
        });
    })
})