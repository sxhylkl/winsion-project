//====================================================
//为所有的详情添加监听
$('#quality').delegate('.check', 'click', function () {
    var $qualityImg = $('#quality .quality-img')
    var $qualityImgList = $('#quality .quality-img-list')
    var html = []
    var list = $(this).attr('dataImg').split(',')
    list.forEach(function (item) {
        item&&html.push('<img src="'+ item +'">')
    })
    $qualityImgList.empty();
    $qualityImgList.html(html.join(''));
    $qualityImg.show()
})
//关闭详情
$('#quality .quality-img-close').click(function () {
    var $qualityImg = $('#quality .quality-img')
    $qualityImg.hide()
})

//查询按钮
$('#qualityBtn').click(function () {
    //========================================================================
    //获取数据并整理数据
    //部门，职能组，班组
    var qualitySelectVal = $('#qualitySelect').val()
    qualitySelectVal = qualitySelectVal === "" ? "NN" : qualitySelectVal
    var qualitySelectValFuc = $('#qualitySelectFuc').val()
    qualitySelectValFuc = qualitySelectValFuc === "" ? "NN" : qualitySelectValFuc
    var qualitySelectGroupVal = $('#qualitySelectGroup').val()
    qualitySelectGroupVal = qualitySelectGroupVal===""?"NN":qualitySelectGroupVal

    //区域
    var qualitySelectAreaVal = $('#qualitySelectArea').val()
    qualitySelectAreaVal = qualitySelectAreaVal === "" ? "NN" : qualitySelectAreaVal

    //时间
    var qualityDtp_input1Val = $('#qualityDtp_input1').val()
    qualityDtp_input1Val = qualityDtp_input1Val === "" ? "NN" : qualityDtp_input1Val
    var qualityDtp_input2Val = $('#qualityDtp_input2').val()
    qualityDtp_input2Val = qualityDtp_input2Val === "" ? "NN" : qualityDtp_input2Val

    //=============================================================================
    //判断用户是否登录
    if (!isLogin()) {
        $('#accountPicture').hide()
        $('#infoDialogBox').dialogBox({
            width: 400,
            height: 200,
            hasMask: true,
            title: '提示',
            hasClose: true,
            content: '<h4 style="text-align: center;line-height: 100px">用户请先登录</h4>'
        });
        return
    }

    //=============================================================================
    //绘制相应内容的饼图和图表
    drawTable(qualitySelectVal,qualitySelectValFuc,qualitySelectGroupVal,qualitySelectAreaVal,qualityDtp_input1Val,qualityDtp_input2Val)
    //===============================================================================
    //绘制表格
    function drawTable(qualitySelectVal,qualitySelectValFuc,qualitySelectGroupVal,qualitySelectAreaVal,qualityDtp_input1Val,qualityDtp_input2Val) {
        //设置必要参数
        var qualityDtp_input11Val = qualityDtp_input1Val=='NN'?qualityDtp_input1Val:("'"+qualityDtp_input1Val+"T00:00:00"+"'")
        var qualityDtp_input22Val = qualityDtp_input2Val=='NN'?qualityDtp_input2Val:("'"+qualityDtp_input2Val+"T23:59:59"+"'")
        var data = {
            WhereClause: "[{FieldKey:0,JoinKey:0,Fields:orgid,ValueKey:"+qualitySelectVal+"}," +
            "{FieldKey:0,JoinKey:0,Fields:postid,ValueKey:"+qualitySelectValFuc+"}," +
            "{FieldKey:0,JoinKey:0,Fields:committeamid,ValueKey:"+qualitySelectGroupVal+"}," +
            "{FieldKey:0,JoinKey:0,Fields:pointid,ValueKey:"+qualitySelectAreaVal+"}," +
            "{JoinKey:0,ValueKey:" + qualityDtp_input11Val + ",Fields:reporttime,FieldKey:4}," +
            "{JoinKey:2,ValueKey:" + qualityDtp_input22Val + ",Fields:reporttime,FieldKey:2}]",
            OrderBy: "[{Field:process,Mode:1}]",
            PageStart: 1,
            PageSize: 1000,
            ViewName: "problemsview"
        }
        var dataJson = JSON.stringify(data)

        $.ajax({
            type: "POST",
            url: dataUrl + "/kingkong/0.01/job/gridFindByBaseCondition",
            data: {data: dataJson},
            success: function (result) {
                var data = result.data
                if(!data.totalcount){
                    $('#quality .patrol-data').hide()
                    $('#infoDialogBox').dialogBox({
                        width: 400,
                        height: 200,
                        hasMask: true,
                        title: '提示',
                        hasClose: true,
                        content: '<h4 style="text-align: center;line-height: 100px">查询结果为空</h4>'
                    });
                    return
                }
                //设置table数据
                setTable(data.dataList)
                //显示
                $('#quality .patrol-data').show()
            }
        });
    }
    //设置table数据
    function setTable(list) {
        var html = []
        for (var i = 0,len = list.length; i < len; i++) {
            var background = i % 2 != 0 ? '#bcddfc' : '#ddf4ff'
            html.push('<tr style="background:'+background+'"> ' +
                    '<th>' + (i+1) + '</th> ' +
                    '<td>' + list[i].ctime + '</td> ' +
                    '<td>' + list[i].pointname + '</td> ' +
                    '<td>' + list[i].committeamname + '</td> ' +
                    '<td>' + list[i].itemdescribe + '</td> ' +
                    '<td>' + list[i].comment + '</td> ' +
                    '<td class="check" style="cursor: pointer" dataImg="' + changeUrl(list[i].fileurl) + '">查看</td> ' +
                '</tr>');
        }

        var mainObj = $('#qualityQuestion');
        mainObj.empty();
        mainObj.html(html.join(''));
    }
})
//导出
$('#qualityBtnExcel').click(function () {
    var mainObj = $('#qualityQuestion');
    if(!mainObj.children())return
    method('dialogBoxContent')
})



