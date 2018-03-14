<template>
  <div id="status-info" v-if="infoStatus" :style="{top: infoPosition['top'], left: infoPosition['left']}">
    <div class="status-info-title"><span class="status-info-title-close" @click="close"></span></div>
    <div class="status-info-content">
      <div v-for="item in infoData" :key="item.id" @click="checkDetails(item)">
        <div class="status-info-point" :style="{background:statusColor[item.patrolsstate]}"></div>
        <div class="status-info-point-info">{{item.committeamname}}</div>
      </div>
    </div>
    <div class="status-info-goal"></div>
  </div>
</template>

<script>
  export default{
    props:['infoStatus','infoPosition','infoData'],
    data(){
      return{
        statusColor:{
          "未开始": "#4b4b4b",
          "正常": "#00cf0f",
          "异常": "#ff0000",
          "进行中": "#ffc600"
        }
      }
    },
    methods:{
      close(){
        this.$store.commit('updateStatusRoom',{status:false})
      },
      checkDetails(val){
        this.$store.dispatch('getStatusDetails',{val})
      }
    }
  }
</script>

<style scoped>
  #status-info{
    position: absolute;
    width: 180px;
    height: 230px;
    background: url("../../../assets/bg_img2.png") no-repeat;
    z-index: 5;
    box-sizing: border-box;
    border-radius: 5px/5px;
    background-size: contain;
  }
  #status-info>.status-info-title{
    padding: 2px 10px 0 0;
    text-align: right;
  }
  #status-info .status-info-title-close{
    display: inline-block;
    width: 10px;
    height: 10px;
    background: url("../../../assets/close.png") no-repeat;
    background-size: contain;
    cursor: pointer;
  }
  #status-info>.status-info-content{
    width: 153px;
    height: 190px;
    padding: 0 10px;
    overflow: auto;
  }
  #status-info>.status-info-content>div{
    border-bottom: 1px dashed #263b5d;
    line-height: 24px;
    cursor: pointer;
    color: #d5d5d5;
  }
  #status-info .status-info-point{
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 6px/6px;
    border: 1px solid #15273E;
    margin: 10px 10px 0 5px;
    background: #ff0;
  }
  #status-info .status-info-point-info{
    display: inline-block;
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: -5px;
  }
  #status-info .status-info-goal{
    position: absolute;
    left: -40px;
    top: 24px;
    z-index: 8;
    border-right: 15px solid #4a87b6;
    border-bottom: 15px solid transparent;
    border-left: 15px solid transparent;
    border-top: 15px solid transparent;
  }
</style>
