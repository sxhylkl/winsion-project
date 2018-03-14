//查询按钮
$('#recordBtn').click(function () {
    //获取数据
    var recordSelectVal = $('#recordSelect').val()
    recordSelectVal = recordSelectVal === "" ? "NN" : recordSelectVal

    var recordSelectFucVal = $('#recordSelectFuc').val()
    recordSelectFucVal = recordSelectFucVal === "" ? "NN" : recordSelectFucVal

    var recordSelectGroupVal = $('#recordSelectGroup').val()
    recordSelectGroupVal = recordSelectGroupVal === "" ? "NN" : recordSelectGroupVal

    var recordDtp_input1Val = $('#recordDtp_input1').val()
    recordDtp_input1Val = recordDtp_input1Val === "" ? "NN" : recordDtp_input1Val
    recordDtp_input1Val = recordDtp_input1Val.split(':').length === 3 ? recordDtp_input1Val : (recordDtp_input1Val + ':00')

    var recordDtp_input2Val = $('#recordDtp_input2').val()
    recordDtp_input2Val = recordDtp_input2Val === "" ? "NN" : recordDtp_input2Val
    recordDtp_input2Val = recordDtp_input2Val.split(':').length === 3 ? recordDtp_input2Val : (recordDtp_input2Val + ':00')

    console.log(recordDtp_input1Val);
    console.log(recordDtp_input2Val);

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


    drawPie(recordSelectVal, recordSelectFucVal,recordSelectGroupVal, recordDtp_input1Val, recordDtp_input2Val)
    drawTable(recordSelectVal,recordSelectFucVal,recordSelectGroupVal, recordDtp_input1Val, recordDtp_input2Val, 'total')

    //==========================================================================================

    //导航切换
    tabToggle()

    //======================================================================================
    //导航切换
    function tabToggle() {
        var $navList = $('.patrol-data-nav-0')
        var $previous = $($navList[0])
        $navList.click(function () {
            var $this = $(this)
            if ($previous == $this)return

            var currentClassify = $this.find('span').attr('id').split('Num')[0]

            drawTable(recordSelectVal,recordSelectFucVal,recordSelectGroupVal, recordDtp_input1Val, recordDtp_input2Val, currentClassify)

            //导航的切换
            $previous.removeClass('patrol-data-nav-background')
            $this.addClass('patrol-data-nav-background')

            $previous = $this

        })
    }
    //绘制饼图
    function drawPie(recordSelectVal, recordSelectFucVal,recordSelectGroupVal, recordDtp_input1Val, recordDtp_input2Val) {

        var data = {
            "porganiazationId":recordSelectVal,
            "ppostId": recordSelectFucVal,
            "pteamId": recordSelectGroupVal,
            "startDate": recordDtp_input1Val,
            "endDate": recordDtp_input2Val
        }
        var dataJson = JSON.stringify(data)

        $.ajax({
            type: "POST",
            url: dataUrl + "/grid/0.01/patrol/getPersonPostsData",
            data: {data: dataJson},
            success: function (result) {
                var data = result.data

                //设置人员到位情况
                var postsNumberSum = getSum(data.postsNumber)
                var noPostsNumberSum = getSum(data.noPostsNumber)
                var placeSum = postsNumberSum + noPostsNumberSum
                var placePercent =  placeSum === 0 ? 0 : postsNumberSum / placeSum
                $('#recordPieOne1').html(postsNumberSum)
                $('#recordPieOne2').html(noPostsNumberSum)
                $('#recordPieOne3').html(parseInt(placePercent * 100) + '%')
                //设置巡视完成情况
                var patrolSum = data.patrolFinishNumber + data.patrolNoFinishNumber
                var patrolPercent = patrolSum === 0 ? 0 : data.patrolFinishNumber / patrolSum
                $('#recordPieTwo1').html(data.patrolFinishNumber)
                $('#recordPieTwo2').html(data.patrolNoFinishNumber)
                $('#recordPieTwo3').html(parseInt(patrolPercent * 100) + '%')
                //设置人员到位情况
                var completeTaskNumberSum = getSum(data.completeTaskNumber)
                var failTaskNumberSum = getSum(data.failTaskNumber)
                var patrolSum = completeTaskNumberSum + failTaskNumberSum
                var patrolRate = patrolSum === 0 ? 0 : completeTaskNumberSum / patrolSum
                $('#recordPieThree1').html(completeTaskNumberSum)
                $('#recordPieThree2').html(failTaskNumberSum)
                $('#recordPieThree3').html(parseInt(patrolRate * 100) + '%')

                $('#record .survey-data').show()
                //饼图
                var $recordPieOne = $('#recordPieOne')[0]
                var $recordPieTwo = $('#recordPieTwo')[0]
                var $recordPieThree = $('#recordPieThree')[0]

                initBar($recordPieOne,{
                    areas:data.areas,
                    series:[
                        {name:'到位',num:data.postsNumber},
                        {name:'未到',num:data.noPostsNumber}
                    ]
                },['到位','未到'])

                initPie($recordPieTwo, [{value: data.patrolFinishNumber, name: '完成'}, {value: data.patrolNoFinishNumber, name: '未完成'}])

                initBar($recordPieThree,{
                    areas:data.areas,
                    series:[
                        {name:'正常',num:data.completeTaskNumber},
                        {name:'问题',num:data.failTaskNumber}
                    ]
                },['正常','问题'])
            }
        });
    }
    //初始绘制表格
    function drawTable(recordSelectVal,recordSelectFucVal,recordSelectGroupVal, recordDtp_input1Val, recordDtp_input2Val, currentClassify) {
        recordDtp_input1Val = recordDtp_input1Val=='NN'?recordDtp_input1Val:("'"+recordDtp_input1Val+"'")
        recordDtp_input2Val = recordDtp_input2Val=='NN'?recordDtp_input2Val:("'"+recordDtp_input2Val+"'")

        var data = {
            WhereClause: "[{JoinKey:0,ValueKey:" + recordSelectVal + ",Fields:orgid,FieldKey:0}," +
            "{JoinKey:0,ValueKey:" + recordSelectFucVal + ",Fields:postid,FieldKey:0}," +
            "{FieldKey:0,JoinKey:0,ValueKey:" + recordSelectGroupVal + ",Fields:teamid}," +
            "{JoinKey:0,ValueKey:" + recordDtp_input1Val + ",Fields:planstarttime,FieldKey:4}," +
            "{JoinKey:2,ValueKey:" + recordDtp_input2Val + ",Fields:planendtime,FieldKey:2}]",
            OrderBy: "",
            PageStart: 1,
            PageSize: 10000,
            ViewName: "patrolsviewinfo"
        }

        var dataJson = JSON.stringify(data)

        $.ajax({
            type: "POST",
            url: dataUrl + "/kingkong/0.01/job/gridFindByBaseCondition",
            data: {data: dataJson},
            success: function (result) {
                var data = result.data

                //设置总数
                $('#recordNum').html(data.totalcount)

                var totalData = setClassify(data.dataList)

                var totalDataTotal = totalData.total.length ? (totalData.total.length - 1 ) * 20 + totalData.total[totalData.total.length - 1].length : 0
                var totalDataUnfinished = totalData.unfinished.length ? (totalData.unfinished.length - 1 ) * 20 + totalData.unfinished[totalData.unfinished.length - 1].length : 0
                var totalDataRunning = totalData.running.length ? (totalData.running.length - 1 ) * 20 + totalData.running[totalData.running.length - 1].length : 0
                var totalDataNormal = totalData.normal.length ? (totalData.normal.length - 1 ) * 20 + totalData.normal[totalData.normal.length - 1].length : 0
                var totalDataQuestion = totalData.question.length ? (totalData.question.length - 1 ) * 20 + totalData.question[totalData.question.length - 1].length : 0

                $('#totalNum').html(totalDataTotal)
                $('#unfinishedNum').html(totalDataUnfinished)
                $('#runningNum').html(totalDataRunning)
                $('#normalNum').html(totalDataNormal)
                $('#questionNum').html(totalDataQuestion)

                setPagination(totalData[currentClassify])
                //显示表格
                $('#record .patrol-data').show()
            }
        });

    }
    //设置分类
    function setClassify(data) {

        var arr0 = [], arr00 = []
        var arr1 = [], arr11 = []
        var arr2 = [], arr22 = []
        var arr3 = [], arr33 = []
        var arr4 = [], arr44 = []

        data.forEach(function (item) {
            if (item.patrolsstate == '未开始') {
                if (arr11.length != 20) {
                    arr11.push(item)
                } else {
                    arr1.push(arr11)
                    arr11 = []
                    arr11.push(item)
                }
            } else if (item.patrolsstate == '进行中') {
                if (arr22.length != 20) {
                    arr22.push(item)
                } else {
                    arr2.push(arr22)
                    arr22 = []
                    arr22.push(item)
                }
            } else if (item.patrolsstate == '正常') {
                if (arr33.length != 20) {
                    arr33.push(item)
                } else {
                    arr3.push(arr33)
                    arr33 = []
                    arr33.push(item)
                }
            }else if (item.patrolsstate == '异常') {
                if (arr44.length != 20) {
                    arr44.push(item)
                } else {
                    arr4.push(arr44)
                    arr44 = []
                    arr44.push(item)
                }
            }

            if (arr00.length != 20) {
                arr00.push(item)
            } else {
                arr0.push(arr00)
                arr00 = []
                arr00.push(item)
            }
        })

        if (arr00.length != 0) {
            arr0.push(arr00)
        }
        if (arr11.length != 0) {
            arr1.push(arr11)
        }
        if (arr22.length != 0) {
            arr2.push(arr22)
        }
        if (arr33.length != 0) {
            arr3.push(arr33)
        }
        if (arr44.length != 0) {
            arr4.push(arr44)
        }


        return {
            total: arr0,
            unfinished: arr1,
            running: arr2,
            normal: arr3,
            question: arr4
        }
    }
    //设置分页
    function setPagination(currentList) {

        var total = currentList.length ? (currentList.length - 1 ) * 20 + currentList[currentList.length - 1].length : 0
        

        //设置分页器
        callBackPagination(total)

        //初始化表格
        createTable(1, 20, total)


        //配置分页符
        function callBackPagination(total) {
            $('#callBackPager').extendPagination({
                totalCount: total,
                showCount: 1,
                limit: 20,
                callback: function (curr, limit, totalCount) {
                    createTable(curr, limit, totalCount);
                }
            });
        }

        //绘制巡视表
        function createTable(currPage, limit, total) {
            var html = [], showNum = limit;
            var list = currentList[currPage - 1]

            if (total - (currPage * limit) < 0) showNum = total - ((currPage - 1) * limit);

            for (var i = 0; i < showNum; i++) {

                var background = i % 2 != 0 ? '#173970' : '#2E4466'
                html.push('<div> ' +
                    '<div class="patrol-title clearfix"> ' +
                    '<div style="width: 5%">' + ((currPage - 1) * limit + i + 1) + '</div> ' +
                    '<div style="width: 6%">' + list[i].pointname + '</div> ' +
                    '<div style="width: 13%">' + list[i].planstarttime + '</div> ' +
                    '<div style="width: 13%">' + list[i].planendtime + '</div> ' +
                    '<div style="width: 10%">' + list[i].realstarttime + '</div> ' +
                    '<div style="width: 10%">' + list[i].realendtime + '</div> ' +
                    '<div style="width: 7%">' + list[i].patrolsstate + '</div> ' +
                    '<div style="width: 9%" title="' + list[i].committeamname + '">' + list[i].committeamname + '</div> ' +
                    '<div style="width: 9%" title="' + list[i].commituser + '">' + list[i].commituser + '</div> ' +
                    '<div style="width: 6%">' + list[i].finishcount + '/' + list[i].itemscount + '</div> ' +
                    '<div style="width: 7%">' + list[i].problemscount + '</div> ' +
                    '<div class="check" style="width: 5%" dataId="' + list[i].id + '">查看</div> ' +
                    '</div>' +
                    '<div class="patrol-body" style="display: none;"> ' +
                    '<table class="table table-bordered" style="margin-bottom: 0"> ' +
                    '<thead style="background: ' + background + '"> ' +
                    '<tr> ' +
                    '<th>序号</th> ' +
                    '<th>巡视项目</th> ' +
                    '<th>巡视时间</th> ' +
                    '<th>巡视结果</th> ' +
                    '</tr> ' +
                    '</thead> ' +
                    '<tbody> ' +
                    '</tbody> ' +
                    '</table> ' +
                    '</div>' +
                    '</div>');
            }

            var mainObj = $('#mainContent');

            mainObj.empty();

            mainObj.html(html.join(''));
        }
    }
})

//========================================================
//为所有的查看按钮，添加监听
var $current = null
$('#record').delegate('.check', 'click', function () {
    //=====================================================
    //获取相应详情的id
    var _this = $(this)
    var id = _this.attr('dataId')

    //获取数据并展示
    getData(id,_this)

    //====================================================
    //请求数据
    function getData(id,_this) {
        var data = {
            "WhereClause": "[{FieldKey:0,JoinKey:2,ValueKey:" + id + ",Fields:patrolsid}]",
            "OrderBy": "",
            "PageStart": 1,
            "PageSize": 20,
            "ViewName": "patroldetailsviewinfo"
        }
        var dataJson = JSON.stringify(data)
        $.ajax({
            type: "POST",
            url: dataUrl + "/kingkong/0.01/job/gridFindByBaseCondition",
            data: {data: dataJson},
            success: function (result) {
                addDataAndShow(_this,result.data.dataList)
            }
        });
    }
    //添加数据并展示
    function addDataAndShow(_this,data) {
        //获取指定元素
        var $patrolBody = _this.parent().next()
        var $tbody = $patrolBody.find('tbody')

        //添加元素
        var html = data.map(function (item, index) {
            return '<tr><td>' + index + '</td><td>' + item.itemdescribe + '</td> <td>' + item.patroltime + '</td> <td>' + item.devicestate + '</td></tr> '
        })

        $tbody.empty()
        $tbody.append(html.join(''))

        //设置数据展示的动画效果
        if (!$current) {
            $patrolBody.slideDown("normal");
            $current = $patrolBody
        } else if ($current[0] != $patrolBody[0]) {
            $current.slideUp("normal");
            $patrolBody.slideDown("normal");
            $current = $patrolBody
        } else {
            $current.slideUp("normal");
            $current = null
        }
    }
})








