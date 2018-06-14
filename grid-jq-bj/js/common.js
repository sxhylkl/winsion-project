//var dataUrl = '';
var dataUrl = 'http://121.69.136.97:9411';
//var dataUrl = 'http://172.16.6.81:9411'
//var dataUrl = 'http://172.16.200.20:19411'
/*(function () {
    var winUrl = window.location.href.split(':18080')[0]
    dataUrl = winUrl + ':9411'
})()*/

//判断是否有用户登录，若登录，获取职能组信息，问题大类，区域
isLogin() && getAndSetList()
isLogin() && getAreaList()
isLogin() && getQuestionTypeList()

//登录框的显示和登录
$('#login').click(function () {
    $('#userDialogBox').show()
    $('#inputName').focus()
    $('#closeLogin').click(function () {
        $('#userDialogBox').hide()
    })
})
$('#loginBtn').click(function () {
    goLogin()
})
$('#inputPassword').keyup(function (ev) {
    if (ev.keyCode == 13) {
        goLogin()
    }
})
//去登陆
function goLogin() {

    var userName = $('#inputName').val()
    var userPassword = $('#inputPassword').val()

    if (userName.trim() == '') {
        $('#infoDialogBox').dialogBox({
            width: 400,
            height: 200,
            hasMask: true,
            title: '提示',
            hasClose: true,
            content: '<h4 style="text-align: center;line-height: 100px">用户名不能为空</h4>'
        });
        return
    }

    if (userPassword.trim() == '') {
        $('#infoDialogBox').dialogBox({
            width: 400,
            height: 200,
            hasMask: true,
            title: '提示',
            hasClose: true,
            content: '<h4 style="text-align: center;line-height: 100px">密码不能为空</h4>'
        });
        return
    }

    $.ajax({
        type: "POST",
        url: dataUrl + "/kingkong/0.01/auth/userLogin?account=" + userName + "&pwd=" + userPassword + "&ssId=1&device=1",
        success: function (result) {
            //判断是否登陆成功
            if (!result.success) {
                $('#infoDialogBox').dialogBox({
                    width: 400,
                    height: 200,
                    hasMask: true,
                    title: '提示',
                    hasClose: true,
                    content: '<h4 style="text-align: center;line-height: 100px">用户密码错误</h4>'
                });
                return
            }
            //登录框消失，头像显示
            $('#userDialogBox').hide()
            $('#accountPicture').show()
            //保存登录人信息
            var userMsg = {
                httpKey: result.data.httpKey,
                mqKey: result.data.mqKey,
                mqKeyId: result.data.mqKeyId,
                powerLine: result.data.powerLine,
                roleId: result.data.roleId,
                teamId: result.data.teamId,
                token: result.data.token,
                user: result.data.user
            }
            sessionStorage.setItem('_USER_MSG_', JSON.stringify(userMsg))
            //获取并添加部门列表
            getAndSetList()
            //获取区域和问题大类
            getAreaList()
            getQuestionTypeList()
            // 加载第一个页面数据
            $('#graphBtn').click()
        },
        error: function (err) {
            $('#infoDialogBox').dialogBox({
                width: 400,
                height: 200,
                hasMask: true,
                title: '提示',
                hasClose: true,
                content: '<h4 style="text-align: center;line-height: 100px">登录失败</h4>'
            });
        }
    });
}

//tab切换
var previousShowData = 'graph'
$('#myNav a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')

    var currentShowData = $(this).attr('showData')

    if (previousShowData == currentShowData)return

    if (currentShowData == 'graph') {
        $('#graph .patrol-graph-dialog').hide()
        $('#graph .patrol-project').hide()
        arrayRunning = false
        addressRunning = false
        $('#management').hide()
        $('#record').hide()
        $('#quality').hide()
        $('#graph').show()
    } else if (currentShowData == 'record') {
        $current && $current.hide()
        $('#graph').hide()
        $('#management').hide()
        $('#quality').hide()
        $('#record').show()
    } else if (currentShowData == 'management') {
        $('#management .management-data').show()
        $('#management .management-form').hide()
        $('#graph').hide()
        $('#record').hide()
        $('#quality').hide()
        $('#management').show()
    } else if (currentShowData == 'quality') {
        $('#quality').show()
        $('#graph').hide()
        $('#management').hide()
        $('#record').hide()
    }

    previousShowData = currentShowData
})

//================================
//初始化时间
var currentTime = handleGetTime(new Date().getTime(), 'date')
var currentTimeDetail = currentTime + ' 08:00'
var tomorrowTime = handleGetTime((new Date().getTime() + 24 * 60 * 60 * 1000), 'date')
var tomorrowTimeDetail = tomorrowTime + ' 08:00'
//图表
$('#graphDtp_inputStart').val(currentTime)
$('#graphDtp_input1').val(currentTime)
//巡检
$('#recordDtp_inputStart1').val(currentTimeDetail)
$('#recordDtp_input1').val(currentTimeDetail)
$('#recordDtp_inputStart2').val(tomorrowTimeDetail)
$('#recordDtp_input2').val(tomorrowTimeDetail)
//管理
$('#manageDtp_inputStart1').val(currentTime)
$('#manageDtp_input1').val(currentTime)
$('#manageDtp_inputStart2').val(currentTime)
$('#manageDtp_input2').val(currentTime)
//服务质量
$('#qualityDtp_inputStart1').val(currentTime)
$('#qualityDtp_input1').val(currentTime)
$('#qualityDtp_inputStart2').val(currentTime)
$('#qualityDtp_input2').val(currentTime)
//日期控件  年-月-日 时-分
$('.form_datetime').datetimepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd hh:ii',//显示格式
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    forceParse: 0,
    showMeridian: 1
});
//日期控件 年-月-日
$('.form_date').datetimepicker({
    language: 'zh-CN',
    format: 'yyyy-mm-dd',//显示格式
    weekStart: 1,
    todayBtn: 1,
    autoclose: 1,
    todayHighlight: 1,
    startView: 2,
    minView: 2,
    forceParse: 0
});

//三级联动
//巡检页面
$('#recordSelect').change(function () {
    getAndFuc($('#recordSelectGroup'), $('#recordSelectFuc'), $(this))
})
$('#recordSelectFuc').change(function () {
    getAndGroup($('#recordSelectGroup'), $(this))
})

//问题页面
$('#manageSelect').change(function () {
    getAndFuc($('#manageSelectGroup'), $('#manageSelectFuc'), $(this))
})
$('#manageSelectFuc').change(function () {
    getAndGroup($('#manageSelectGroup'), $(this))
})

//质量服务页面
$('#qualitySelect').change(function () {
    getAndFuc($('#qualitySelectGroup'), $('#qualitySelectFuc'), $(this))
})
$('#qualitySelectFuc').change(function () {
    getAndGroup($('#qualitySelectGroup'), $(this))
})


//饼图
function initPie(obj, data, color) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(obj);
    color = color ? color : ['#fc8658', '#4a87b6', '#4ab6ab', '#4a4fb6', '#b64d4a', '#1e717b', '#1e4a7b', '#1e7b71']

    var option = {
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: '10%',
            top: '30%',
            data: data.map(function (item) {
                return item.name
            })
        },
        color: color,
        series: [
            {
                name: '数据',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
//柱状图
function initBar(obj, data, config) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(obj);

    var labelOption = {
        normal: {
            show: true,
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            distance: 12,
            fontSize: 12,
            fontFamily:'Arial',
            formatter: '{c}'
        }
    };

    var option = {
        color: ['#fc8658', '#4a87b6'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: config
        },
        toolbox: {
            show: false,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                axisTick: {show: false},
                data: data.areas
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: data.series.map(function (item) {
            return {
                name: item.name,
                type: 'bar',
                label: labelOption,
                data: item.num
            }
        })
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
//柱状层堆图
function initBarArea(obj,data) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(obj);
    var option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: data.legendData
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data: data.yAxisData
        },
        series: data.series.map(function (item) {
            return {
                name: item.name,
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: item.value
            }
        })
    };
    myChart.setOption(option);
}

//判断是否有用户登录
function isLogin() {
    return sessionStorage.getItem('_USER_MSG_')
}

//===================================
//获取并添加部门列表
function getAndSetList() {
    //设置必要参数
    var data = {
        "WhereClause": "",
        "OrderBy": "",
        "PageStart": 1,
        "PageSize": 100,
        "ViewName": "orgnizationinfo"
    }
    var dataJson = JSON.stringify(data)

    $.ajax({
        type: "POST",
        url: dataUrl + "/kingkong/0.01/job/gridFindByBaseCondition",
        data: {data: dataJson},
        success: function (result) {
            $('#accountPicture').show()
            var recoverUserList = ['<option value="">全部</option>']
            result.data.dataList.forEach(function (item) {
                if (item.committeamname != '') {
                    recoverUserList.push('<option value="' + item.orgid + '">' + item.orgname + '</option>')
                }
            })
            //巡检
            $('#recordSelect').html(recoverUserList.join(''))
            $('#recordSelectFuc').html('<option value="">全部</option>')
            $('#recordSelectGroup').html('<option value="">全部</option>')
            //问题管理
            $('#manageSelect').html(recoverUserList.join(''))
            $('#manageSelectFuc').html('<option value="">全部</option>')
            $('#manageSelectGroup').html('<option value="">全部</option>')
            //服务质量
            $('#qualitySelect').html(recoverUserList.join(''))
            $('#qualitySelectFuc').html('<option value="">全部</option>')
            $('#qualitySelectGroup').html('<option value="">全部</option>')
        }
    });
}
//获取职能组信息
function getAndFuc($func, $group, $this) {

    $func.html('<option value="">全部</option>')

    if (!$this.val()) {
        $group.html('<option value="">全部</option>')
        return
    }
    //设置必要参数
    var data = {
        "WhereClause": "[{FieldKey:0,JoinKey:2,ValueKey:" + $this.val() + ",Fields:orgid}]",
        "OrderBy": "",
        "PageStart": 1,
        "PageSize": 10000,
        "ViewName": "orgnizationpostviewinfo"
    }
    var dataJson = JSON.stringify(data)

    $.ajax({
        type: "POST",
        url: dataUrl + "/kingkong/0.01/job/gridFindByBaseCondition",
        data: {data: dataJson},
        success: function (result) {
            var recoverUserList = ['<option value="">全部</option>']
            result.data.dataList.forEach(function (item) {
                if (item.committeamname != '') {
                    recoverUserList.push('<option value="' + item.postid + '">' + item.postname + '</option>')
                }
            })
            $group.html(recoverUserList.join(''))
        }
    });
}
//获取班组信息
function getAndGroup($group, $this) {

    if (!$this.val()) {
        $group.html('<option value="">全部</option>')
        return
    }
    //设置必要参数
    var data = {
        "WhereClause": "[{FieldKey:0,JoinKey:2,ValueKey:" + $this.val() + ",Fields:postid}]",
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
            var recoverUserList = ['<option value="">全部</option>']
            result.data.dataList.forEach(function (item) {
                if (item.committeamname != '') {
                    recoverUserList.push('<option value="' + item.teamid + '">' + item.teamsName + '</option>')
                }
            })
            $group.html(recoverUserList.join(''))
        }
    });
}

//================================
//获取区域和问题大类列表
//获取区域
function getAreaList() {
    var data = {
        "WhereClause": "",
        "OrderBy": "",
        "PageStart": 1,
        "PageSize": 1000,
        "ViewName": "pratolpointinfo"
    }
    var dataJson = JSON.stringify(data)
    $.ajax({
        type: "POST",
        url: dataUrl + "/kingkong/0.01/job/gridFindByBaseCondition",
        data: {data: dataJson},
        success: function (result) {
            
            $('#accountPicture').show()
            var list = ['<option value="">全部</option>']
            result.data.dataList.forEach(function (item) {
                if (item.committeamname != '') {
                    list.push('<option value="' + item.id + '">' + item.pointName + '</option>')
                }
            })
            $('#manageSelectArea').html(list.join(''))
            $('#qualitySelectArea').html(list.join(''))
        }
    });
}
//获取问题大类
function getQuestionTypeList() {
    var data = {
        "WhereClause": "",
        "OrderBy": "",
        "PageStart": 1,
        "PageSize": 1000,
        "ViewName": "problemclassificationsinfo"
    }
    var dataJson = JSON.stringify(data)
    $.ajax({
        type: "POST",
        url: dataUrl + "/kingkong/0.01/job/gridFindByBaseCondition",
        data: {data: dataJson},
        success: function (result) {
            $('#accountPicture').show()
            var list = ['<option value="">全部</option>']
            result.data.dataList.forEach(function (item) {
                if (item.committeamname != '') {
                    list.push('<option value="' + item.id + '">' + item.classificationname + '</option>')
                }
            })
            $('#manageSelectType').html(list.join(''))
        }
    });
}

//时间格式化
function handleGetTime(time, type) {
    if (time == '946656000000') {
        return '--:--';
    }
    var myTime = parseInt(time);
    var myDate = new Date(myTime);
    var year = myDate.getFullYear();//获取年份
    var month = myDate.getMonth() + 1;//获取月份
    var day = myDate.getDate();//获取日期
    var hour = myDate.getHours();//获取小时数(0-23)
    var minutes = myDate.getMinutes();//获取分钟数(0-59)
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    if (hour < 10) {
        hour = '0' + hour
    }
    if (minutes < 10) {
        minutes = '0' + minutes
    }
    if (type == "hh") {
        return '' + hour;
    } else if (type == "mm") {
        return '' + minutes;
    } else if (type == "time") {
        return hour + ':' + minutes;
    } else if (type == "date") {
        return year + '-' + month + '-' + day;
    } else if (type == "all") {
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
    } else if (type == "allFormat") {
        return '"'+year+'-'+month+'-'+day+' '+ hour +':'+ minutes+':00"'
    }
}

//求和公式
function getSum(arr) {
    var sum = 0
    arr.forEach(function (item) {
        sum += item
    })
    return sum
}

//更改url
function changeUrl(url) {

/*    var winUrl = window.location.href.split(':18080')[0]
    var currentUrl = 'http://121.69.136.97'
    var dataUrl = 'http://121.69.136.97'

    if (!url) return ''

    var str = url

    if (str.indexOf(winUrl) !== -1) {
        if (winUrl === currentUrl) {
            str.replace(dataUrl, winUrl)
        }else{
            str.replace(currentUrl, winUrl)
        }
    }
    return str*/
    return url
}