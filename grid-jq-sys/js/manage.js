//====================================================
//为所有的详情添加监听
var questionList = []
var problemId = ''
var adminId = ''
$('#management').delegate('.check', 'click', function () {
    //==================================================================
    //获取当前问题表的信息
    var problemsid = $(this).attr('dataId')
    var currentData = questionList.filter(function (item) {return item.id == problemsid})[0]
    //获取分配人信息
    // var manageUser = JSON.parse(sessionStorage.getItem('_USER_MSG_'))
    var manageUser = {
        user: {
            userId: '',
            username: ''
        }
    }
    //设置问题详情的数据
    setQuestionDetails(currentData,manageUser)

    //===============================================================
    //添加图片
    getAndSetImgList()
    //获取并添加维修人列表
    getAndSetList()

    //===============================================================
    //判断是否处于未分配状态
    if (currentData.process == 0) {
        //设置未分配的状态
        setStatus()
    } else {
        //获取信息并设置分配的状态
        getAndSetInfo()
    }

    //================================================================
    //提交信息所需参数
    problemId = problemsid
    adminId = manageUser.user.userId

    //================================================================
    //添加问题详情数据
    function setQuestionDetails(currentData,manageUser) {
        $('#manageAddress').val(currentData.pointname)
        $('#manageBigCategory').val(currentData.classificationname)
        $('#manageCategory').val(currentData.typename)
        $('#manageLevel').val(currentData.priority)
        $('#manageSolveTime').val(currentData.costtime)
        $('#manageQuestionStatus').val(currentData.processname)
        $('#manageCommitUser').val(currentData.commituser)
        $('#manageCommitTime').val(currentData.ctime)
        $('#manageQuestion').val(currentData.comment)
        $('#manageUser').val(manageUser.user.username)
    }

    //添加图片
    function getAndSetImgList() {

        var data = {
            "WhereClause": "[{FieldKey:0,JoinKey:2,ValueKey:" + problemsid + ",Fields:tasksid}]",
            "OrderBy": "",
            "PageStart": 1,
            "PageSize": 1000,
            "ViewName": "jobmonitorfilesviewinfo"
        }

        var dataJson = JSON.stringify(data)

        $.ajax({
            type: "POST",
            url: dataUrl + "/kingkong/0.01/job/gridFindByBaseCondition",
            data: {data: dataJson},
            success: function (result) {
                var recoverUserList = []
                result.data.dataList.forEach(function (item) {
                    if (item.type == '0') {
                        recoverUserList.push('<img src="' + changeUrl(item.filepath) + '" />')
                    }
                })
                $('#scenePhoto').html(recoverUserList.join(''))
            }
        });
    }

    //获取并添加维修人列表
    function getAndSetList() {
        var data = {
            "WhereClause": "",
            "OrderBy": "",
            "PageStart": 1,
            "PageSize": 10000,
            "ViewName": "teamsinfo"
        }

        var dataJson = JSON.stringify(data)

        $.ajax({
            type: "POST",
            url: dataUrl + "/kingkong/0.01/job/gridFindByBaseCondition",
            data: {data: dataJson},
            success: function (result) {
                var recoverUserList = []
                result.data.dataList.forEach(function (item) {
                    if (item.committeamname != '') {
                        recoverUserList.push('<option value="' + item.teamid + '">' + item.teamsName + '</option>')
                    }
                })
                $('#manageRecoverUser').html(recoverUserList.join(''))
                $('#manageRecoverTimeReset').val('')
            }
        });
    }

    //设置未分配的状态
    function setStatus()     {
        //对应的信息显示和隐藏
        $('#allocation1').hide()
        $('#allocation2').hide()
        $('#manageForm').hide()
        $('#noAllocation').hide()
        //对应的按钮显示和隐藏
        $('#manageCancel').hide()
        $('#manageModify').hide()
        $('#manageModifySub').hide()
        $('#manageSub').hide()
        //整体的内容显示和隐藏
        $('.management-data').hide()
        $('.management-form').show()
    }

    //获取维修人信息（分配）
    function getAndSetInfo() {
        var data = {
            "WhereClause": "[{FieldKey:0,JoinKey:2,ValueKey:" + problemsid + ",Fields:tasksid}]",
            "OrderBy": "",
            "PageStart": 1,
            "PageSize": 10000,
            "ViewName": "problemresultsviewinfo"
        }

        var dataJson = JSON.stringify(data)

        $.ajax({
            type: "POST",
            url: dataUrl + "/kingkong/0.01/job/gridFindByBaseCondition",
            data: {data: dataJson},
            success: function (result) {
                //添加信息
                $('#allocationTeam').val(result.data.dataList[0].assignedteamname)
                $('#allocationTeam1').val(result.data.dataList[0].assignedteamname)
                $('#allocationTeam').attr('teamId',result.data.dataList[0].teamsid)
                $('#allocationTeam').attr('modifyId',result.data.dataList[0].tasksid)
                $('#allocationUser').val(result.data.dataList[0].handleperson)
                $('#allocationTime').val(result.data.dataList[0].dealtime)
                //对应的信息显示和隐藏
                $('#manageForm').hide()
                $('#noAllocation').hide()
                $('#allocation1').show()
                $('#allocation2').show()
                //对应的按钮显示和隐藏
                $('#manageSub').hide()
                $('#manageCancel').hide()
                $('#manageModifySub').hide()
                $('#manageModify').show()
                //对应的整体内容显示和隐藏
                $('.management-data').hide()
                $('.management-form').show()
            }
        });
    }

})

//===================================================
//为返回按钮，添加监听
$('#manageBack').click(function () {
    $('.management-form').hide()
    $('.management-data').show()
    $('#manageBtn').click()
})

//====================================================
//导出
$('#manageBtnExcel').click(function () {
    //========================================================================
    //获取数据并整理数据
    //部门，职能组，班组
    var manageSelectVal = $('#manageSelect').val()
    manageSelectVal = manageSelectVal === "" ? "NN" : manageSelectVal
    var manageSelectValFuc = $('#manageSelectFuc').val()
    manageSelectValFuc = manageSelectValFuc === "" ? "NN" : manageSelectValFuc
    var manageSelectGroupVal = $('#manageSelectGroup').val()
    manageSelectGroupVal = manageSelectGroupVal===""?"NN":manageSelectGroupVal

    //状态，区域，问题大类，超时状态
    var manageSelectStatusVal = $('#manageSelectStatus').val()
    manageSelectStatusVal = manageSelectStatusVal === "" ? "NN" : manageSelectStatusVal
    var manageSelectAreaVal = $('#manageSelectArea').val()
    manageSelectAreaVal = manageSelectAreaVal === "" ? "NN" : manageSelectAreaVal
    var manageSelectTypeVal = $('#manageSelectType').val()
    manageSelectTypeVal = manageSelectTypeVal === "" ? "NN" : manageSelectTypeVal
    var manageSelectTimeOutVal = $('#manageSelectTimeOut').val()
    manageSelectTimeOutVal = manageSelectTimeOutVal === "" ? "NN" : manageSelectTimeOutVal

    //时间
    var manageDtp_input1Val = $('#manageDtp_input1').val()
    manageDtp_input1Val = manageDtp_input1Val === "" ? "NN" : manageDtp_input1Val
    var manageDtp_input2Val = $('#manageDtp_input2').val()
    manageDtp_input2Val = manageDtp_input2Val === "" ? "NN" : manageDtp_input2Val

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

    //设置必要参数
    var manageDtp_input11Val = manageDtp_input1Val=='NN'?manageDtp_input1Val:("'"+manageDtp_input1Val+"T00:00:00"+"'")
    var manageDtp_input22Val = manageDtp_input2Val=='NN'?manageDtp_input2Val:("'"+manageDtp_input2Val+"T23:59:59"+"'")
    var data = {
        WhereClause: "[{FieldKey:0,JoinKey:0,Fields:orgid,ValueKey:"+manageSelectVal+"}," +
        "{FieldKey:0,JoinKey:0,Fields:postid,ValueKey:"+manageSelectValFuc+"}," +
        "{FieldKey:0,JoinKey:0,Fields:committeamid,ValueKey:"+manageSelectGroupVal+"}," +
        "{FieldKey:0,JoinKey:0,Fields:classificationid,ValueKey:'"+manageSelectTypeVal+"'}," +
        "{FieldKey:0,JoinKey:0,Fields:pointid,ValueKey:"+manageSelectAreaVal+"}," +
        "{FieldKey:0,JoinKey:0,Fields:process,ValueKey:"+manageSelectStatusVal+"}," +
        "{FieldKey:0,JoinKey:0,Fields:overstate,ValueKey:"+manageSelectTimeOutVal+"}," +
        "{JoinKey:0,ValueKey:" + manageDtp_input11Val + ",Fields:reporttime,FieldKey:4}," +
        "{JoinKey:2,ValueKey:" + manageDtp_input22Val + ",Fields:reporttime,FieldKey:2}]",
        OrderBy: "[{Field:process,Mode:1}]",
        PageStart: 1,
        PageSize: 20,
        ViewName: "reportproblemsviewinfo"
    }
    var dataJson = JSON.stringify(data)

    $.ajax({
        type: "POST",
        url: dataUrl + "/kingkong/0.01/job/gridFindByBaseCondition",
        data: {data: dataJson},
        success: function (result) {
            var data = result.data
            if(!data.totalcount)return

            //创建table
            $('<table class="table table-bordered" style="display: none" id="manageTableToExcel"> ' +
                '<thead> ' +
                '<tr> ' +
                '<th style="width: 5%">序号</th> ' +
                '<th style="width: 15%">提交时间</th> ' +
                '<th style="width: 10%">网格</th> ' +
                '<th style="width: 10%">问题大类</th> ' +
                '<th style="width: 15%">问题子类</th> ' +
                '<th style="width: 10%">提交组</th> ' +
                '<th style="width: 5%">等级</th> ' +
                '<th style="width: 25%">问题描述</th> ' +
                '<th style="width: 5%">状态</th> ' +
                '</tr> ' +
                '</thead> ' +
                '<tbody id="manageQuestionList"></tbody> ' +
                '</table>').appendTo($('body'))
            //创建列表数据
            var list = data.dataList
            var html = []

            for (var i = 0,len = list.length; i < len; i++) {
                html.push('<tr> ' +
                    '<th>' + (i+1) + '</th> ' +
                    '<td>' + list[i].ctime + '</td> ' +
                    '<td>' + list[i].pointname + '</td> ' +
                    '<td>' + list[i].classificationname + '</td> ' +
                    '<td>' + list[i].typename + '</td> ' +
                    '<td>' + list[i].committeamname + '</td> ' +
                    '<td>' + list[i].priority + '</td> ' +
                    '<td>' + list[i].itemdescribe + '</td> ' +
                    '<td>' + list[i].processname + '</td> ' +
                    '</tr>');
            }
            //添加列表
            var mainObj = $('#manageQuestionList');
            mainObj.empty();
            mainObj.html(html.join(''));
            //导出
            method('manageTableToExcel')
        }
    })
})


//====================================================
//查询按钮
$('#manageBtn').click(function () {
    //========================================================================
    //获取数据并整理数据
    //部门，职能组，班组
    var manageSelectVal = $('#manageSelect').val()
    manageSelectVal = manageSelectVal === "" ? "NN" : manageSelectVal
    var manageSelectValFuc = $('#manageSelectFuc').val()
    manageSelectValFuc = manageSelectValFuc === "" ? "NN" : manageSelectValFuc
    var manageSelectGroupVal = $('#manageSelectGroup').val()
    manageSelectGroupVal = manageSelectGroupVal===""?"NN":manageSelectGroupVal

    //状态，区域，问题大类，超时状态
    var manageSelectStatusVal = $('#manageSelectStatus').val()
    manageSelectStatusVal = manageSelectStatusVal === "" ? "NN" : manageSelectStatusVal
    var manageSelectAreaVal = $('#manageSelectArea').val()
    manageSelectAreaVal = manageSelectAreaVal === "" ? "NN" : manageSelectAreaVal
    var manageSelectTypeVal = $('#manageSelectType').val()
    manageSelectTypeVal = manageSelectTypeVal === "" ? "NN" : manageSelectTypeVal
    var manageSelectTimeOutVal = $('#manageSelectTimeOut').val()
    manageSelectTimeOutVal = manageSelectTimeOutVal === "" ? "NN" : manageSelectTimeOutVal

    //时间
    var manageDtp_input1Val = $('#manageDtp_input1').val()
    manageDtp_input1Val = manageDtp_input1Val === "" ? "NN" : manageDtp_input1Val
    var manageDtp_input2Val = $('#manageDtp_input2').val()
    manageDtp_input2Val = manageDtp_input2Val === "" ? "NN" : manageDtp_input2Val

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
    drawTable(manageSelectVal,manageSelectValFuc,manageSelectGroupVal,manageSelectStatusVal,manageSelectAreaVal,manageSelectTypeVal,manageSelectTimeOutVal,manageDtp_input1Val,manageDtp_input2Val)
    //===============================================================================
    //绘制表格
    function drawTable(manageSelectVal,manageSelectValFuc,manageSelectGroupVal,manageSelectStatusVal,manageSelectAreaVal,manageSelectTypeVal,manageSelectTimeOutVal,manageDtp_input1Val,manageDtp_input2Val) {
        //设置必要参数
        var manageDtp_input11Val = manageDtp_input1Val=='NN'?manageDtp_input1Val:("'"+manageDtp_input1Val+"T00:00:00"+"'")
        var manageDtp_input22Val = manageDtp_input2Val=='NN'?manageDtp_input2Val:("'"+manageDtp_input2Val+"T23:59:59"+"'")
        var data = {
            WhereClause: "[{FieldKey:0,JoinKey:0,Fields:orgid,ValueKey:"+manageSelectVal+"}," +
            "{FieldKey:0,JoinKey:0,Fields:postid,ValueKey:"+manageSelectValFuc+"}," +
            "{FieldKey:0,JoinKey:0,Fields:committeamid,ValueKey:"+manageSelectGroupVal+"}," +
            "{FieldKey:0,JoinKey:0,Fields:classificationid,ValueKey:'"+manageSelectTypeVal+"'}," +
            "{FieldKey:0,JoinKey:0,Fields:pointid,ValueKey:"+manageSelectAreaVal+"}," +
            "{FieldKey:0,JoinKey:0,Fields:process,ValueKey:"+manageSelectStatusVal+"}," +
            "{FieldKey:0,JoinKey:0,Fields:overstate,ValueKey:"+manageSelectTimeOutVal+"}," +
            "{JoinKey:0,ValueKey:" + manageDtp_input11Val + ",Fields:reporttime,FieldKey:4}," +
            "{JoinKey:2,ValueKey:" + manageDtp_input22Val + ",Fields:reporttime,FieldKey:2}]",
            OrderBy: "[{Field:process,Mode:1}]",
            PageStart: 1,
            PageSize: 20,
            ViewName: "reportproblemsviewinfo"
        }
        var dataJson = JSON.stringify(data)

        $.ajax({
            type: "POST",
            url: dataUrl + "/kingkong/0.01/job/gridFindByBaseCondition",
            data: {data: dataJson},
            success: function (result) {
                var data = result.data
                if(!data.totalcount){
                    $('#management .patrol-data').hide()
                    $('#management .survey-data').hide()
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

                //==============================================================================
                //绑定排序事件
                var orderBy = "[{Field:process,Mode:1}]"
                $('#management .management-order').unbind('click')
                $('#management .management-order').bind('click',function () {
                    var _this = $(this)
                    if(_this.attr('order')=='pointname'){
                        if(_this.attr('class').match('dropup')){
                            orderBy = "[{Field:pointname,Mode:1}]"
                            _this.removeClass('dropup')
                        }else{
                            orderBy = "[{Field:pointname,Mode:0}]"
                            _this.addClass('dropup')
                        }
                    }else if(_this.attr('order')=='classificationname'){
                        if(_this.attr('class').match('dropup')){
                            orderBy = "[{Field:classificationname,Mode:1}]"
                            _this.removeClass('dropup')
                        }else{
                            orderBy = "[{Field:classificationname,Mode:0}]"
                            _this.addClass('dropup')
                        }
                    }else if(_this.attr('order')=='processname'){
                        if(_this.attr('class').match('dropup')){
                            orderBy = "[{Field:process,Mode:1}]"
                            _this.removeClass('dropup')
                        }else{
                            orderBy = "[{Field:process,Mode:0}]"
                            _this.addClass('dropup')
                        }
                    }

                    //============================
                    //初始化数据
                    createTable(1, 20, data.totalcount)
                })

                //==========================================================================
                //绘制饼图
                drawPie(manageSelectVal,manageSelectValFuc,manageSelectGroupVal,manageSelectStatusVal,manageSelectAreaVal,manageSelectTypeVal,manageSelectTimeOutVal,manageDtp_input1Val,manageDtp_input2Val)
                //设置总数
                $('#manageNum').html(data.totalcount)
                //============================
                //配置分页
                callBackPagination(data.totalcount)
                //初始化数据
                createTable(1, 20, data.totalcount, data.dataList)
                //显示表格
                $('#management .patrol-data').show()

                //绘制巡视表
                function callBackPagination(total) {
                    $('#callBackPagerQuestion').extendPagination({
                        totalCount: total,
                        showCount: 1,
                        limit: 20,
                        callback: function (curr, limit, totalCount) {
                            createTable(curr, limit, totalCount);
                        }
                    });
                }

                function createTable(currPage, limit, total, list) {

                    if (list) {
                        create()
                    } else {
                        //设置必要参数
                        var data = {
                            WhereClause: "[{FieldKey:0,JoinKey:0,Fields:orgid,ValueKey:"+manageSelectVal+"}," +
                            "{FieldKey:0,JoinKey:0,Fields:postid,ValueKey:"+manageSelectValFuc+"}," +
                            "{FieldKey:0,JoinKey:0,Fields:committeamid,ValueKey:"+manageSelectGroupVal+"}," +
                            "{FieldKey:0,JoinKey:0,Fields:classificationid,ValueKey:'"+manageSelectTypeVal+"'}," +
                            "{FieldKey:0,JoinKey:0,Fields:pointid,ValueKey:"+manageSelectAreaVal+"}," +
                            "{FieldKey:0,JoinKey:0,Fields:process,ValueKey:"+manageSelectStatusVal+"}," +
                            "{FieldKey:0,JoinKey:0,Fields:overstate,ValueKey:"+manageSelectTimeOutVal+"}," +
                            "{JoinKey:0,ValueKey:" + manageDtp_input11Val + ",Fields:reporttime,FieldKey:4}," +
                            "{JoinKey:2,ValueKey:" + manageDtp_input22Val + ",Fields:reporttime,FieldKey:2}]",
                            OrderBy: orderBy,
                            PageStart: currPage,
                            PageSize: 20,
                            ViewName: "reportproblemsviewinfo"
                        }
                        var dataJson = JSON.stringify(data)

                        $.ajax({
                            type: "POST",
                            url: dataUrl + "/kingkong/0.01/job/gridFindByBaseCondition",
                            data: {data: dataJson},
                            success: function (msg) {
                                list = msg.data.dataList
                                questionList = list
                                create()
                            }
                        });
                    }
                    //保存到全局变量
                    questionList = list
                    //创建列表
                    function create() {
                        var html = [], showNum = limit;
                        var timeout = 0

                        if (total - (currPage * limit) < 0) showNum = total - ((currPage - 1) * limit);

                        for (var i = 0; i < showNum; i++) {

                            if(list[i].overstate==1){
                                timeout++
                            }

                            var background = {
                                '待修复':'#d84a4a',
                                '修复中':'#30aa9e',
                                '待验收':'#3c8fd6',
                                '已完成':'#999',
                                '未完成':'#e46a3b'
                            }
                            html.push('<div style="background:'+background[list[i].processname]+'"> ' +
                                '<div class="patrol-title clearfix"> ' +
                                '<div style="width: 3%">' + ((currPage - 1) * limit + i + 1) + '</div> ' +
                                '<div style="width: 15%">' + list[i].ctime + '</div> ' +
                                '<div style="width: 10%">' + list[i].pointname + '</div> ' +
                                '<div style="width: 10%">' + list[i].classificationname + '</div> ' +
                                '<div style="width: 12%">' + list[i].typename + '</div> ' +
                                '<div style="width: 10%">' + list[i].committeamname + '</div> ' +
                                '<div style="width: 5%">' + list[i].priority + '</div> ' +
                                '<div style="width: 25%">' + list[i].itemdescribe + '</div> ' +
                                '<div style="width: 5%">' + list[i].processname + '</div> ' +
                                '<div class="check" style="width: 5%" dataId="' + list[i].id + '">查看</div> ' +
                                '</div>' +
                                '</div>');
                        }


                        //设置超时和未超时
                        $('#managementPieTwo1').html(total - timeout)
                        $('#managementPieTwo2').html(timeout)

                        var mainObj = $('#mainQuestion');

                        mainObj.empty();

                        mainObj.html(html.join(''));
                    }
                }
            }
        });
    }
    //绘制饼图
    function drawPie(manageSelectVal,manageSelectValFuc,manageSelectGroupVal,manageSelectStatusVal,manageSelectAreaVal,manageSelectTypeVal,manageSelectTimeOutVal,manageDtp_input1Val,manageDtp_input2Val) {

        var stateObj = ['待修复','修复中','待验收','已完成','未完成']


        manageDtp_input1Val = manageDtp_input1Val=='NN'?manageDtp_input1Val:(manageDtp_input1Val+" 00:00:00")
        manageDtp_input2Val = manageDtp_input2Val=='NN'?manageDtp_input2Val:(manageDtp_input2Val+" 23:59:59")
        var data = {
            "porganiazationId": manageSelectVal,
            "ppostId": manageSelectValFuc,
            "pteamId":manageSelectGroupVal,
            "classificationId":manageSelectTypeVal,
            "pointId":manageSelectAreaVal,
            "process":manageSelectStatusVal === 'NN' ? 'NN' : stateObj[manageSelectStatusVal],
            "overTimeState":manageSelectTimeOutVal,
            "startDate": manageDtp_input1Val,
            "endDate": manageDtp_input2Val
        };

        var dataJson = JSON.stringify(data)
        
        $.ajax({
            type: "POST",
            url: dataUrl + "/grid/0.01/patrol/getProblemData",
            data: {data: dataJson},
            success: function (result) {
                var data = result.data
                $('#management .survey-data').show()
                //饼图
                var $managementPieOne = $('#managementPieOne')[0]
                var $managementPieTwo = $('#managementPieTwo')[0]
                var $managementPieThree = $('#managementPieThree')[0]

                initBarArea($managementPieOne,{
                    legendData: data.problemState,
                    yAxisData: data.areas,
                    series:data.problemStateData
                })

                initPie($managementPieTwo, data.gridNumber.map(function (item) {
                    return {name:item.name,value:item.value}
                }))

                initBarArea($managementPieThree,{
                    legendData: data.problemCategory,
                    yAxisData: data.areas,
                    series:data.problemCategoryData
                })
                
            }
        });
    }
})

//==============================
//======================
//提交数据
$('#manageSub').click(function () {

    var assignedTeamId = $('#manageRecoverUser').val()
    var plannedFixTime = new Date($('#manageRecoverTime').val()).getTime()

    $.ajax({
        type: "POST",
        url: dataUrl + "/grid/0.01/allocate/problemAllocate?problemId=" + problemId + "&adminId=" + adminId + "&assignedTeamId=" + assignedTeamId + "&plannedFixTime=" + plannedFixTime + "&comment=",
        success: function (result) {
            $('#manageBack').click()
        },
        error: function (err) {
            $('#infoDialogBox').dialogBox({
                width: 400,
                height: 200,
                hasMask: true,
                title: '提示',
                hasClose: true,
                content: '<h4 style="text-align: center;line-height: 100px">保存数据失败</h4>'
            });
        }
    });
})
//修改下的提交数据
$('#manageModifySub').click(function () {

    //var assignedTeamId = $('#manageRecoverUser').val()
    var plannedFixTime = $('#manageRecoverTime').val()
    var modifyId = $('#allocationTeam').attr('modifyId')

    $.ajax({
        type: "POST",
        url: dataUrl + "/grid/0.01/patrolSubmit/problemReAllocate?problemResultId=" + modifyId + "&handleTime=" + plannedFixTime,
        success: function (result) {
            $('#manageBack').click()
        },
        error: function (err) {
            $('#infoDialogBox').dialogBox({
                width: 400,
                height: 200,
                hasMask: true,
                title: '提示',
                hasClose: true,
                content: '<h4 style="text-align: center;line-height: 100px">保存数据失败</h4>'
            });
        }
    });
})
//取消
$('#manageCancel').click(function () {
    //显示状态的切换
    $('#noAllocation').hide()
    $('#manageSubBtn').hide()
    $('#allocation1').show()
    $('#allocation2').show()
    //按钮的切换
    $('#manageCancel').hide()
    $('#manageModifySub').hide()
    $('#manageModify').show()
    //时间为空
    $('#manageRecoverTimeReset').val('')
})
//修改
$('#manageModify').click(function () {
    //下拉列表信息匹配
    $('#manageRecoverUser').val($('#allocationTeam').attr('teamId'))
    //显示状态的切换
    $('#allocation1').hide()
    $('#allocation2').hide()
    $('#noAllocationRecoverState').hide()
    $('#allocationRecoverState').show()
    $('#noAllocation').show()
    $('#manageSubBtn').show()
    //按钮的切换
    $('#manageCancel').show()
    $('#manageModifySub').show()
    $('#manageModify').hide()
})


