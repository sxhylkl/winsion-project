<template>
  <div class="page">
    <div class="search-train-number">
      <div class="search">
        <div class="search-container" id="searchTrain">
          <div>
            <span class="train-icon"></span>
            <el-input placeholder="请输入车次" v-model="trainNumber"></el-input>
            <img v-if="sweep" src="../../../../static/images/ic_carry_sweep@2x.png" @click="sweepTicket">
          </div>
          <div class="display-table">
            <span class="date-icon"></span>
            <div class="block">
              <el-date-picker
                v-model="dateValue"
                align="right"
                type="date"
                :editable="false"
                :clearable="false"
                :picker-options="pickerOptions">
              </el-date-picker>
            </div>
            <span class="service-date">服务日期</span>
          </div>
        </div>
        <div class="station-container clearfix" id="radioBox">
          <div v-for="(station, index) in stationData" style="margin-top: 10px">
            <el-radio class="stationId" v-model="stationId" :label="station.stationId">{{station.stationName}}</el-radio>
          </div>
        </div>
        <button class="search-btn" id="searchBtn" @click="searchTrain">开始查询</button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../../store/mutation-types'
  import { setLocalStorage,isRunByVersion } from '../../../api'
  export default{
    created(){
      setLocalStorage(this)
    },
    data(){
      return {
        trainNumber: '',
        stationId: '',
        pickerOptions: {
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        dateValue: new Date().getTime(),
        sweep: isRunByVersion(this.$store.state.version , '2.0.3'),
        stationData: [
          {
            stationId: "1de76e8dac3c4ec5af2cdd06f2a5977b",
            stationName: "北京西"
          },
          {
            stationId: "5c41d92d20724a97b56afe7f434f876b",
            stationName: "郑州"
          },
          {
            stationId: "fa6300b05d09447aba2f4a998b0577c5",
            stationName: "呼和浩特东"
          },
          {
            stationId: "3f9a4bee66aa467587506a3c33c39b0c",
            stationName: "呼和浩特"
          }
        ]
      }
    },
    computed: mapGetters({
      sweep: 'place__searchTrain__sweep',
      stationData: 'place__searchTrain__stationData'
    }),
    methods: {
      searchTrain(){
        this.$store.dispatch(types.PLACE__SEARCH_TRAIN__SEARCH_TRAIN,{trainNumber:this.trainNumber,dateValue:this.dateValue,stationId:this.stationId,_this:this})
      },
      sweepTicket(){
        this.$store.dispatch(types.PLACE__SEARCH_TRAIN__SWEEP_TICKET,this)
      }
    }
  }
</script>

<style>

  #searchTrain .el-input__inner{
    padding-right: 20px;
  }

  .search-train-number {
    background-color: #f0f0f0;
    height: 100%;
    overflow: hidden;
  }

  .search {
    background-color: #f0f0f0;
    margin: 0.1rem;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .search > div {
    margin-bottom: 0.4rem;
  }

  .search-container {
    background-color: #fff;
    padding: 0 0.16rem;
  }

  .search-container > div {
    position: relative;
    min-height: 0.5rem;
    padding: 0.2rem 0.15rem;
  }

  .search-container > div:nth-of-type(1) {
    border-bottom: 1px solid #c7c7c9;
  }

  .display-table {
    display: table;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
  }

  .train-icon {
    position: absolute;
    top: 0.4rem;
    left: 0;
    width: 0.76rem;
    height: 0.38rem;
    background: url("../../../../static/images/ic_train_small_green.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    z-index: 10;
    zoom: 1;
  }

  .date-icon {
    position: absolute;
    top: 0.25rem;
    left: 0;
    width: 0.76rem;
    height: 0.53rem;
    background: url("../../../../static/images/ic_calendar_small_blue.png") no-repeat;
    -webkit-background-size: 100%;
    background-size: 100%;
    box-sizing: border-box;
    z-index: 10;
    zoom: 1;
  }

  .service-date {
    font-size: 0.28rem;
    text-align: right;
    font-weight: bold;
    display: table-cell;
    vertical-align: middle;
    box-sizing: border-box;
  }

  #today {
    display: table-cell;
    vertical-align: middle;
    font-size: 0.28rem;
    color: #ffc655;
    box-sizing: border-box;
  }

  .search-container input {
    border: none;
    outline: none;
    padding-left: 1rem;
    line-height: 0.5rem;
    display: block;
    box-sizing: border-box;
    width: 100%;
    font-size: 0.28rem;
  }

  .search-container input[type=text] {
    width: 85%;
    text-transform: uppercase;
  }

  .search-container img {
    position: absolute;
    top: 0.4rem;
    right: 0.4rem;
    width: 21px;
  }

  .search-container input[type=date] {
    background-color: rgba(0, 0, 0, 0);
    font-size: 0.28rem;
    display: table-cell;
    vertical-align: middle;
    padding-left: 0.3rem;
    /*-webkit-appearance: none;*/
    box-sizing: border-box;
  }

  .station-container {
    padding: 0;
  }

  .station-container > div {
    float: left;
    position: relative;
    margin-right: 5%;
    width: 30%;
    height: 0.44rem;
    line-height: 0.44rem;
  }

  .station-container > div:nth-last-child(1) {
    margin-right: 0;
  }

  .station-container label {
    font-size: 0.32rem;
    padding-left: 0.65rem;
  }

  .station-container input[type=radio] {
    opacity: 0;
    width: 0.44rem;
    height: 0.44rem;
    position: absolute;
    top: 0;
    left: 0;
  }

  .station-radio {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.44rem;
    height: 0.44rem;
    background: url('../../../../static/images/ic_station_unchecked.png') no-repeat;
    background-size: 100%;
  }

  .station-radio-checked {
    position: absolute;
    top: 0;
    left: 0;
    width: 0.44rem;
    height: 0.44rem;
    background: url('../../../../static/images/ic_station_checked.png') no-repeat;
    background-size: 100%;
  }

  .search-btn {
    width: 6rem;
    display: block;
    margin: 0 auto;
    background-color: #2f6ab6;
    padding: 0.2rem 0;
    text-align: center;
    color: #fff;
    font-size: 0.34rem;
    font-weight: bold;
  }

  input[type="date"]::-webkit-clear-button {
    display: none
  }


</style>

