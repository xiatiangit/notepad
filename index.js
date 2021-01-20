$(function () {
    load()
    sum()


    // 点击添加后添加事件
    $('#btn').click(function () {
        let val = $('#inp').val()
        let local = getdata()
        if (val == '') {
            alert("亲，请加入您想要完成的事情哦！")
        } else {
            push(local)
            load()
            sum()
        }

    })




    // 按回车后添加事件
    $('#inp').keydown(function (e) {
        if (e.keyCode == 13) {
            let local = getdata()
            let val = $('#inp').val()
            if (val == '') {
                alert("亲，请加入您想要完成的事情哦！")
            } else {
                push(local)
                load()
                sum()
            }
        }
    });



    // 点击删除后删除事件
    $('ol').on('click', '.delete', function () {
        let data = getdata()
        let id = $(this).attr('id')
        console.log(id);
        data.splice(id, 1)
        save(data)
        load()
        sum()
    })


    // 向本地存储提交事件
    function save(data) {
        localStorage.setItem('eve', JSON.stringify(data))
    }

    // 向本地存储添加函数
    function push(v) {
        let val = $('#inp').val()
        v.push({
            title: val,
            done: false
        })
        localStorage.setItem('eve', JSON.stringify(v))
    }




    // 读取本地存储函数
    function getdata() {
        let data = localStorage.getItem('eve')
        if (data !== null) {
            return JSON.parse(data)
        } else {
            return []
        }
    }


    // 添加函数
    function load() {
        // 先清空ol里的内容再添加
        $('ol').empty();
        let data = getdata()
        $.each(data, function (i, val) {
            if (val.done == true) {
                $('.y').prepend("<li><div class='before'></div><input type='checkbox' checked class='content'><p class='cont'>" + val.title + "</p><button class='delete' id=" + i + ">" + "x" + "</button></li>")
            } else {
                $('.w').prepend("<li><div class='before'></div><input type='checkbox' class='content'><p class='cont'>" + val.title + "</p><button class='delete' id=" + i + ">" + "x" + "</button></li>")
            }
        });
    }

    // 点击选择框后切换进行和完成事件
    $('ol').on('change', '.content', function () {
        let data = getdata()
        let index = $(this).siblings('button').attr('id')
        data[index].done = $(this).prop('checked')
        save(data)
        load()
        sum()
    })

    
    // 设置事件数量
    function sum(){
        let w = $('.w li').length
        let y = $('.y li').length
        $('.sw').html(w)
        $('.sy').html(y)
    }
})