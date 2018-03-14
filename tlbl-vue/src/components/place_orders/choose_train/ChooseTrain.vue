<template>
  <div class="page-bg">
    <div class="overflow-container" id="trainNumberList">
      <div class="send-service">请选择您乘坐的车次，或点击“更多车次”查询添加。</div>
      <div class="train-number-container" v-for="train in allTrainData" @click="selectTrain(train)">
        <div class="train-number-header">
          <span class="train-number">{{train.trainNumber}}</span>
          <span class="font-icon take-head">乘</span>
          <span class="date">{{train.departDateTime | handleGetTime('date') }}</span>
        </div>
        <div class="train-detail clearfix">
          <div class="station-start">
            <span>{{train.departStation}}</span><span class="time start-time">{{train.departDateTime | handleGetTime('time') }}</span>
          </div>
          <div class="whole-time">{{train.allCourseTime}}</div>
          <div class="station-end">
            <span>{{train.arriveStation}}</span>
            <span class="time arrive-time">{{train.arriveDateTime | handleGetTime('time') }}<span class="run-date">{{train.runDateStatus}}</span></span>
          </div>
        </div>
        <div class="train-status clearfix">
          <span :class="train.statusClass">{{train.displayStatus}}</span><span :class="train.delayClass">{{train.displayDelay}}</span>
        </div>
      </div>
    </div>
    <footer class="my-orders-footer">
      <router-link to="/searchTrain">
        <el-button>更多车次&gt&gt</el-button>
      </router-link>
    </footer>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../../store/mutation-types'
  import { setLocalStorage } from '../../../api'
  export default{
    created (){
      setLocalStorage(this)
      this.$store.dispatch(types.PLACE__CHOOSE_TRAIN__GET_ALL_TRAIN,this)
    },
    computed: mapGetters({
      allTrainData: 'place_chooseTrain_allTrainData'
    }),
    methods :{
      selectTrain (trainData){
        this.$store.dispatch(types.PLACE__CHOOSE_TRAIN__SELECT_TRAIN,{trainData,_this:this})
      }
    }
  }
</script>
<style>
  .send-service {
    color: #bab9c1;
    font-size: 0.26rem;
    margin: 0.2rem 0.1rem;
  }

  .take-head {
    margin-top: 0.15rem;
  }

  .train-number-container {
    margin: 0 0.1rem 0.2rem;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }

  #trainNumber, #carriage {
    text-transform: uppercase;
  }

  .train-number-header {
    height: 0.6rem;
    line-height: 0.6rem;
    background-color: #2078e6;
    padding: 0 0.2rem;
    -webkit-border-radius: 6px 6px 0 0;
    -moz-border-radius: 6px 6px 0 0;
    border-radius: 6px 6px 0 0;
  }

  .train-detail {
    background-color: #fff;
    padding: 0.24rem 0.22rem 0.36rem;
    border-bottom: 1px dashed #a8a8a8;
  }

  .station-start {
    float: left;
  }

  .station-end {
    float: right;
  }

  .station-start, .station-end {
    width: 28%;
  }

  .station-start span, .station-end span {
    display: block;
  }

  .station-end {
    text-align: right;
  }

  .train-number-header .font-icon {
    color: #fff;
    border-color: #fff;
  }

  .train-number {
    font-size: 0.3rem;
    color: #fff;
    display: inline-block;
    vertical-align: middle;
  }

  .date {
    color: #fff;
    float: right;
  }

  .time {
    color: #000;
  }

  .whole-time {
    float: left;
    width: 44%;
    text-align: center;
    font-size: 0.26rem;
    color: #7c7c7c;
    padding-top: 0.18rem;
    padding-bottom: 0.25rem;
    border-bottom: 1px solid #000;
  }

  .station-start span:nth-of-type(1), .station-end span:nth-of-type(1) {
    font-size: 0.38rem;
    padding-bottom: 0.3rem;
  }

  .station-start span:nth-of-type(2), .station-end span:nth-of-type(2) {
    font-size: 0.36rem;
  }

  .train-status {
    padding: 0.13rem 0.3rem;
    background-color: #fff;
    -webkit-border-radius: 0 0 6px 6px;
    -moz-border-radius: 0 0 6px 6px;
    border-radius: 0 0 6px 6px;
  }

  .already-arrive, .depart-time, .depart-time-delay, .check-ticket, .stop-check {
    width: 1.6rem;
    padding: 0.14rem 0;
    text-align: center;
    font-size: 0.26rem;
    color: #fff;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
  }

  .already-arrive {
    float: left;
    background-color: #aacdfe;
  }

  .check-ticket {
    float: left;
    background-color: #4fb700;
  }

  .stop-check {
    float: left;
    background-color: #B42020;
  }

  .depart-time {
    float: right;
    background-color: #4fb700;
  }

  .depart-time-delay {
    float: right;
    background-color: #B42020;
  }

  .delay-time {
    background-color: red;
    color: #fff;
  }

  .run-date {
    display: inline-block !important;
    color: red;
    font-size: 0.3rem !important;
  }

  footer .el-button {
    width: 100%;
  }
</style>
