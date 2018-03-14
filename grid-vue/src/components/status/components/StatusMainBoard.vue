<template>
  <div id="status-board" v-if="statusFlag">
    <img class="status-board-graph" src="../../../assets/bg_map.png" alt="">
    <status-main-room :room="room2" :roomData="statusData.roomData2" :current="'第2候车室'"></status-main-room>
    <status-main-room :room="room3" :roomData="statusData.roomData3" :current="'第3候车室'"></status-main-room>
    <status-main-room :room="room4" :roomData="statusData.roomData4" :current="'第4候车室'"></status-main-room>
    <status-main-room :room="room5" :roomData="statusData.roomData5" :current="'第5候车室'"></status-main-room>
    <status-main-room :room="room6" :roomData="statusData.roomData6" :current="'第6候车室'"></status-main-room>
    <status-main-room :room="room7" :roomData="statusData.roomData7" :current="'第7候车室'"></status-main-room>
    <status-main-room :room="room8" :roomData="statusData.roomData8" :current="'第8候车室'"></status-main-room>
    <status-main-room :room="room9" :roomData="statusData.roomData9" :current="'第9候车室'"></status-main-room>
    <status-main-info :infoStatus="statusCurrentFlag"
                      :infoPosition="positionData[statusCurrent]"
                      :infoData="statusCurrentData">
    </status-main-info>
  </div>
</template>

<script>
  import StatusMainRoom from './StatusMainRoom.vue'
  import StatusMainInfo from './StatusMainInfo.vue'

  export default{
    props:['statusData','statusFlag','statusCurrent','statusCurrentData','statusCurrentFlag'],
    data(){
      return{
        room2:{left: '700px',top: '160px'},
        room3:{left: '1060px',top: '160px'},
        room4:{left: '700px',top: '260px'},
        room5:{left: '1060px',top: '260px'},
        room6:{left: '700px',top: '360px'},
        room7:{left: '1060px',top: '360px'},
        room8:{left: '700px',top: '460px'},
        room9:{left: '1060px',top: '460px'},
        positionData:{
          '第2候车室':{left: '830px',top: '140px'},
          '第3候车室':{left: '1190px',top: '140px'},
          '第4候车室':{left: '830px',top: '240px'},
          '第5候车室':{left: '1190px',top: '240px'},
          '第6候车室':{left: '830px',top: '340px'},
          '第7候车室':{left: '1190px',top: '340px'},
          '第8候车室':{left: '830px',top: '440px'},
          '第9候车室':{left: '1190px',top: '440px'},
        }
      }
    },
    components:{
      StatusMainRoom,
      StatusMainInfo
    }
  }
</script>

<style scoped>
  #status-board{
    position: relative;
    height: 780px;
    width: 1834px;
    margin: 10px auto 0;
    font-size: 12px;
    background: rgba(0,0,0,.3);
  }
  .status-board-graph{
    position: absolute;
    left: 407px;
    top: 25px;
  }
</style>
