<template>
  <div class="page-bg">
    <div class="tnlist-container">
      <div class="tnlist" v-for="train in trainList" :key="train.trainRunId" @click="selectTrain(train)">
        <div class="train">{{train.trainNumber}}</div>
        <div class="train-number-detail clearfix">
          <div class="station">{{train.stationName}}</div>
          <div class="start">
            <span>{{train.arriveTime | handleGetTime('time')}}</span><span>到达</span>
          </div>
          <div class="arrive">
            <span>{{train.departTime | handleGetTime('time')}}</span><span>出发</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '../../../store/mutation-types'
  import { setLocalStorage } from '../../../api'
  export default{
    created(){
      setLocalStorage(this)
    },
    data(){
      return{
        trainList:this.$store.state.trainList.trainList
      }
    },
    methods: {
      selectTrain(train){
        this.$store.dispatch(types.PLACE__TRAIN_LIST__SELECT_TRAIN, {train, _this: this})
      }
    }
  }
</script>

<style>
  .tnlist {
    margin: 0 0.1rem 0.1rem;
    background-color: #fff;
    padding: 0.3rem;
  }

  .train {
    color: #2a61b3;
    padding-bottom: 0.2rem;
    border-bottom: 1px dashed #a8a8a8;
  }

  .train-number-detail {
    margin-top: 0.3rem;
  }

  .train-number-detail > div {
    float: left;
    width: 33.33%;
    line-height: 0.4rem;
    box-sizing: border-box;
  }

  .station {
    font-size: 0.28rem;
    line-height: 0.68rem !important;
  }

  .start {
    text-align: center;
  }

  .arrive {
    float: right;
    text-align: right;
  }

  .start span, .arrive span {
    display: block;
    font-size: 0.3rem;
  }

  .start span:nth-of-type(2), .arrive span:nth-of-type(2) {
    color: #999999;
  }

  .margin-top {
    margin-top: 0.9rem;
  }
</style>

