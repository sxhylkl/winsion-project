var graphData = null;
//查询数据
$('#graphBtn').click(function () {
    //是否登陆
    if (!isLogin()) {
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

    //是否选择日期
    var graphDtp_input1 = $('#graphDtp_input1').val()
    if (graphDtp_input1 == '') {
        $('#infoDialogBox').dialogBox({
            width: 400,
            height: 200,
            hasMask: true,
            title: '提示',
            hasClose: true,
            content: '<h4 style="text-align: center;line-height: 100px">请选择日期</h4>'
        });
        return
    }

    //设置参数
    var beforeTime,afterTime,countBeforeTime,countAfterTime
    var hour = new Date().getHours()

    if(hour>=0&&hour<8){
        countBeforeTime = new Date(graphDtp_input1).getTime() - 24 * 60 * 60 * 1000
        beforeTime = handleGetTime(countBeforeTime, 'allFormat')
        countAfterTime = new Date(graphDtp_input1).getTime()
        afterTime = handleGetTime(countAfterTime, 'allFormat')
    }else {
        countBeforeTime = new Date(graphDtp_input1).getTime()
        beforeTime = handleGetTime(countBeforeTime, 'allFormat')
        countAfterTime = new Date(graphDtp_input1).getTime() + 24 * 60 * 60 * 1000
        afterTime = handleGetTime(countAfterTime, 'allFormat')
    }

    //设置并清除定时器
    var patrolGraphTimer = null
    clearInterval(patrolGraphTimer)

    //获取并设置数据
    getAndSetPatrolGraph(beforeTime, afterTime)

    //获取并设置数据
    function getAndSetPatrolGraph(beforeTime, afterTime) {
        $('.patrol-graph-dialog').hide()
        $('.patrol-project').hide()
        arrayRunning = false
        addressRunning = false
        //设置必要参数
        var data = {
            WhereClause: "[{JoinKey:0,ValueKey:NN,Fields:postid,FieldKey:0}," +
            "{FieldKey:0,JoinKey:0,ValueKey:NN,Fields:teamid}," +
            "{JoinKey:0,ValueKey:" + beforeTime + ",Fields:planstarttime,FieldKey:4}," +
            "{JoinKey:2,ValueKey:" + afterTime + ",Fields:planendtime,FieldKey:2}]",
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
                //将数据保存
                graphData = result.data.dataList
                //存取数据元素置空
                $('.patrol-project-content').empty()
                //设置颜色映射
                var colorObj = {
                    "未开始": "#4b4b4b",
                    "正常": "#00cf0f",
                    "异常": "#ff0000",
                    "进行中": "#ffc600"
                }
                //对应添加新数据
                var arr2 = [], arr3 = [], arr4 = [], arr5 = [], arr6 = [], arr7 = [], arr8 = [], arr9 = [],arr10 = [], arr11 = [], arr12 = []
                var arrNorth1 = [],arrSouth1=[],arrEast1=[],arrEast2=[],arrWest1=[],arrWest2=[],arrCenter1=[],arrCenter2=[]
                var local2 = ''     //第2候车室
                var local3 = ''     //第3候车室
                var local4 = '8a7bd86c-e162-11e7-b8b7-782bcb466fe6'     //第4候车室
                var local5 = '8a7bd6fa-e162-11e7-b8b7-782bcb466fe6'     //第5候车室
                var local6 = ''     //第6候车室
                var local7 = ''     //第7候车室
                var local8 = ''     //第8候车室
                var local9 = ''     //第9候车室
                var local10 = '8a7bd9d2-e162-11e7-b8b7-782bcb466fe6'    //第10候车室
                var local11 = '8a7bd92c-e162-11e7-b8b7-782bcb466fe6'     //第11候车室
                var local12 = ''     //第12候车室
                var localNorth1 = '8a78d511-e162-11e7-b8b7-782bcb466fe6'     //北侧候车室
                var localSouth1 = ''     //南侧候车室
                var localEast1 = ''     //西侧上候车室
                var localEast2 = ''     //西侧下候车室
                var localWest1 = ''     //东侧上候车室
                var localWest2 = ''     //东侧下候车室
                var localCenter1 = '8a7bda6f-e162-11e7-b8b7-782bcb466fe6'     //中间上候车室
                var localCenter2 = ''     //中间下候车室

                result.data.dataList.forEach(function (item) {
                    if (item.pointsid == local2) {
                        arr2.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    } else if (item.pointsid == local3) {
                        arr3.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    } else if (item.pointsid == local4) {
                        arr4.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    } else if (item.pointsid == local5) {
                        arr5.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    } else if (item.pointsid == local6) {
                        arr6.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    } else if (item.pointsid == local7) {
                        arr7.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    } else if (item.pointsid == local8) {
                        arr8.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    } else if (item.pointsid == local9) {
                        arr9.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    } else if (item.pointsid == local10) {
                        arr10.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    }else if (item.pointsid == local11) {
                        arr11.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    }else if (item.pointsid == local12) {
                        arr12.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    }else if (item.pointsid == localNorth1) {
                        arrNorth1.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    }else if (item.pointsid == localSouth1) {
                        arrSouth1.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    }else if (item.pointsid == localEast1) {
                        arrEast1.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    }else if (item.pointsid == localEast2) {
                        arrEast2.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    }else if (item.pointsid == localWest1) {
                        arrWest1.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    }else if (item.pointsid == localWest2) {
                        arrWest2.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    }else if (item.pointsid == localCenter1) {
                        arrCenter1.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    }else if (item.pointsid == localCenter2) {
                        arrCenter2.push({id: item.id, status: item.patrolsstate,teamNamne:item.committeamname})
                    }
                })
                //设置候车室
                setRoom(arr2, 2)
                setRoom(arr3, 3)
                setRoom(arr4, 4)
                setRoom(arr5, 5)
                setRoom(arr6, 6)
                setRoom(arr7, 7)
                setRoom(arr8, 8)
                setRoom(arr9, 9)
                setRoom(arr10, 10)
                setRoom(arr11, 11)
                setRoom(arr12, 12)

                setRoom(arrNorth1, 13)
                setRoom(arrSouth1, 14)
                setRoom(arrEast1, 15)
                setRoom(arrEast2, 16)
                setRoom(arrWest1, 17)
                setRoom(arrWest2, 18)
                setRoom(arrCenter1, 19)
                setRoom(arrCenter2, 20)
                $('.patrol-graph').show()

                patrolGraphTimer = setInterval(function () {
                    getAndSetPatrolGraph(beforeTime, afterTime)
                }, 600000)

                //设置候车室
                function setRoom(arr, num) {
                    var totalStatus = ''
                    var stop = [], running = [], question = [], normal = [],html=[]
                    arr.forEach(function (item) {
                        html.push('<div class="patrol-point-array" patrolsid="'+item.id+'"><div class="patrol-point" style="background: '+colorObj[item.status]+'"></div><div class="patrol-point-info">'+item.teamNamne+'</div></div>')
                        if (item.status == '未开始') {
                            stop.push(item)
                        } else if (item.status == '进行中') {
                            running.push(item)
                        } else if (item.status == '异常') {
                            question.push(item)
                        } else {
                            normal.push(item)
                        }
                    })

                    $('.waiting-room-' + num + '-1 .patrol-project-content').html(html.join(''))

                    if (arr.length == stop.length) {
                        totalStatus = './img/ic_stop.png'
                    } else if (arr.length == normal.length) {
                        totalStatus = './img/ic_normal.png'
                    } else if (question.length) {
                        totalStatus = './img/ic_question.png'
                    } else {
                        totalStatus = './img/ic_running.png'
                    }

                    $('.waiting-room-' + num + '-1>.patrol-address').css('background', 'url("' + totalStatus + '")')
                    $('.waiting-room-' + num + '-1>.patrol-process').jQMeter({
                        goal: arr.length + '',
                        raised: arr.length - stop.length +　'',
                        orientation:'horizontal',
                        width:'100px',
                        height:'10px',
                        displayTotal:false,
                        bgColor: '#4b4b4b',
                        barColor:'#ffc600'
                    });

                }
            }
        })
    }
})

//====================================================
//设置查看功能，以及关闭按钮的操作
var addressRunning = false;
var arrayRunning = false;
//打开二级菜单
$('.patrol-address').click(function () {
    if (addressRunning)return
    addressRunning = true
    $(this).siblings('.patrol-project').show()
})
//关闭二级菜单
$('.patrol-project-title-close').click(function () {
    if(arrayRunning)return
    addressRunning = false
    $('.patrol-project').hide()
})
//打开三级菜单
$('.patrol-graph-content').delegate('.patrol-point-array', 'click', function () {

    if (arrayRunning)return
    arrayRunning = true

    var patrolsid = $(this).attr('patrolsid')
    //设置描述详情的初始值
    var $beforeEle = null
    //请求数据
    getData(patrolsid)

    //=========================================
    //获取数据
    function getData(patrolsid) {
        var data = {
            "WhereClause": "[{FieldKey:0,JoinKey:2,ValueKey:" + patrolsid + ",Fields:patrolsid}]",
            "OrderBy": "",
            "PageStart": 1,
            "PageSize": 1000,
            "ViewName": "patroldetailsviewinfo"
        }
        var dataJson = JSON.stringify(data)
        $.ajax({
            type: "POST",
            url: dataUrl + "/kingkong/0.01/job/gridFindByBaseCondition",
            data: {data: dataJson},
            success: function (result) {
                setDetailsInfo(patrolsid)
                setTable(result.data.dataList)
                $('.patrol-graph-dialog').show()
            }
        });
    }
    //设置详情基本信息
    function setDetailsInfo(patrolsid) {
        var info = graphData.filter(function (item) {
            return item.id == patrolsid
        })[0]
        $('.patrol-info-address').html(info.pointname)
        $('.patrol-info-plan-begin').html(info.planstarttime)
        $('.patrol-info-plan-finish').html(info.planendtime)
        $('.patrol-info-actual-begin').html(info.realstarttime)
        $('.patrol-info-actual-finish').html(info.realendtime)
        $('.patrol-info-process').html(info.patrolsstate)
        $('.patrol-info-team').html(info.committeamname)
    }
    //设置详情表格
    function setTable(data) {
        var html = data.map(function (item, index) {
            var background = item.devicestate=='异常'?'#cf0404':'#173970'
            var color = item.devicestate=='异常'?'#fff':'#fff'
            //图片列表
            var fileUrlList = item.fileurl.split(',')
            var fileImg = fileUrlList.map(function (item) {
                return item?'<img imgInfo="'+changeUrl(item)+'" src="'+changeUrl(item)+'" alt="">':''
            }).join('')
            //返回值
            return '<div class="patrol-table-content clearfix" style="background: '+background+';color: '+color+'"> ' +
                '<div class="patrol-table-content-item">' +
                    '<div style="width: 10%">' + index + '</div> ' +
                    '<div style="width: 35%">' + item.itemdescribe + '</div> ' +
                    '<div style="width: 15%">' + item.commituser + '</div> ' +
                    '<div style="width: 20%">' + item.patroltime + '</div> ' +
                    '<div style="width: 10%">' + item.devicestate + '</div> ' +
                    '<div style="width: 10%;cursor: pointer" class="patrol-table-content-open">详情</div> ' +
                '</div>' +
                '<div class="patrol-table-content-desc">' +
                    '<div style="line-height: 25px"><span>描述：</span>' + item.comment + '</div>' +
                    '<div style="line-height: 40px;">' +
                        '<span>图片：</span>' +
                        fileImg +
                    '</div>' +
                '</div> ' +
                '</div>'
        })

        var mainObj = $('.patrol-graph-dialog .patrol-table-body')

        mainObj.empty();

        mainObj.html(html.join(''));
        //设置打开图片动画
        setAnimate()
        //设置图片放大功能
        setImgShow()
    }
    //设置打开图片动画
    function setAnimate() {
        var $open = $('.patrol-table-content-open')
        $open.click(function () {
            var $next = $(this).parent().next()
            if($beforeEle&&$next[0] == $beforeEle[0]){
                $beforeEle.slideUp()
                $beforeEle = null
            }else {
                $beforeEle&&$beforeEle.slideUp()
                $next.slideDown()
                $beforeEle = $next
            }
        })
    }
    //设置图片放大功能
    function setImgShow() {
        var $img = $('.patrol-table-content-desc img')
        var $next = $('.patrol-img')
        $img.hover(function () {
            var pos = $(this).offset()
            var html = '<img src="'+ $(this).attr('imgInfo') +'">'
            $next.empty();
            $next.html(html);
            $next.css({ left: pos.left-155 + 'px', top: pos.top-560 + 'px'});
            $next.show()
        },function () {
            $next.hide()
        })
    }
})
//关闭三级菜单
$('.patrol-close').click(function () {
    $('.patrol-graph-dialog').hide()
    arrayRunning = false
})



