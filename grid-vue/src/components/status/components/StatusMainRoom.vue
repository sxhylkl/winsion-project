<template>
  <div id="status-room" :style="{ top: room.top, left: room.left }" @click="selectRoom(current)">
    <div class="status-room-current" :class="`status-room-current-${roomData.totalStatus}`"></div>
    <div class="status-room-process">
      <el-progress :text-inside="false" :show-text="false" :stroke-width="12" :percentage="roomData.process"></el-progress>
    </div>
  </div>
</template>

<script>
  export default{
    props:['room','roomData','current'],
    methods:{
      selectRoom(current){
        this.$store.commit('updateStatusRoom',{current,status:true})
      }
    }
  }
</script>

<style scoped>
  #status-room{
    position: absolute;
    left: 550px;
    top: 220px;
  }
  .status-room-current{
    width: 35px;
    height: 55px;
    margin: 0 auto;
    cursor: pointer;
  }
  .status-room-process{
    width: 100px;
  }
  .status-room-current-normal{
    background: url("../../../assets/ic_normal.png") no-repeat;
  }
  .status-room-current-question{
    background: url("../../../assets/ic_question.png") no-repeat;
  }
  .status-room-current-running{
    background: url("../../../assets/ic_running.png") no-repeat;
  }
  .status-room-current-stop{
    background: url("../../../assets/ic_stop.png") no-repeat;
  }
</style>
