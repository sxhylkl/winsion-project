<template>
  <div id="header">
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <!--<div id="titleFont">公共交通生产作业指挥系统</div>-->
          <!--<div id="titleFont">北京西站网格化管理配置系统</div>-->
          <div id="titleFont">网格化管理配置系统</div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <div id="timeFont">{{currentTime}}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentTime: ''
      };
    },
    mounted(){
      setInterval(()=> {
        this.timeDown()
      }, 1000)
    },
    methods: {
      timeDown () {
        let myDate = new Date();
        let year = myDate.getFullYear();//获取年份
        let month = myDate.getMonth() + 1;//获取月份
        let day = myDate.getDate();//获取日期
        let hour = myDate.getHours();//获取小时数(0-23)
        let minutes = myDate.getMinutes();//获取分钟数(0-59)
        let seconds = myDate.getSeconds();//获取秒数(0-59)
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
        if (seconds < 10) {
          seconds = '0' + seconds
        }
        this.currentTime = `${year}年${month}月${day}日 ${hour}:${minutes}:${seconds}`
      }
    }
  }
</script>

<style scoped>
  #header{
    padding: 20px 10px;
    background: #000;
  }
  #titleFont{
    font: 24px "微软雅黑";
    color: #fff;
  }
  #timeFont{
    text-align: right;
    color: #fff;
  }
</style>
