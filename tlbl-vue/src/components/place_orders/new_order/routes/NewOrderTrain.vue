<template>
  <div class="tnlist-container">
    <div class="order-message">请输入订单基本信息-{{type?'送':'接'}}站订单-{{trainData.stationName}}</div>
    <div class="base-info" id="trainData">
      <el-row>
        <el-col :span="7">车&#12288&#12288次:</el-col>
        <el-col :span="17">{{trainData.trainNumber}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="7">乘车日期:</el-col>
        <el-col :span="17">{{trainData.departDate | handleGetTime('all')}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="7">联&#8194系&#8194人:</el-col>
        <el-col :span="7">
          <el-input v-model="trainData.contact" placeholder="请输入联系人"></el-input>
        </el-col>
        <el-col :span="9" style="margin-left: 10px">
          <div class="info" @click="toOrderInfo">
            <img class="add-phone" src="../../../../../static/images/ic_addto_contacts@2x.png" alt="常用联系人">
            <span class="usual">常用联系人</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">联系手机:</el-col>
        <el-col :span="17">
          <el-input v-model="trainData.mobile" placeholder="请输入您的手机号"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="train-info">
      <el-row>
        <el-col :span="7">乘车车厢:</el-col>
        <el-col :span="11">
          <el-input v-model="trainData.carriage" placeholder="如:5"></el-input>
        </el-col>
        <el-col :span="5" style="margin-left: 10px">车厢</el-col>
      </el-row>
      <el-row style="margin-bottom: 0.2rem;">
        <el-col :span="7">{{type ? '送站起点' : '接站终点'}}:</el-col>
        <el-col :span="5">
          <el-select v-model="trainData.end" placeholder="请选择" @change="selectEnd">
            <el-option
              v-for="end in endData"
              :label="end.name"
              :value="end.id"
              :key="end.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" style="margin-left: 10px">
          <el-select v-model="trainData.location" placeholder="请选择" @change="selectLocation">
            <el-option
              v-for="location in locationData"
              :label="location.name"
              :value="JSON.stringify(location)"
              :key="location.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="5" style="margin-left: 10px">
          <div class="map" @click="goMap">查看地图</div>
        </el-col>
      </el-row>
      <el-row v-if="type">
        <el-col :span="7">到达时间:</el-col>
        <el-col :span="17">
          <el-select v-model="trainData.arriveTime" placeholder="请选择" @change="selectArriveTime">
            <el-option
              v-for="item in arriveTimeData"
              :label="item.label"
              :value="item.value"
              :key="item">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="remarks">
      <el-row>
        <el-col :span="9">贵重易碎物品:</el-col>
        <el-col :span="15">
          <el-select v-model="trainData.precious" placeholder="请选择" @change="selectPrecious">
            <el-option
              v-for="item in preciousData"
              :label="item.label"
              :value="item.value"
              :key="item">
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">备&#12288&#12288注:</el-col>
        <el-col :span="17">
          <el-input v-model="trainData.remark" placeholder="请输入联系人姓名"></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="next-btn" @click="toOrderPrice">
      <el-button>下一步</el-button>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as types from '../../../../store/mutation-types'
  import { handleGetTime ,setLocalStorage } from '../../../../api'
  export default{
    created(){
      setLocalStorage(this)
      this.$store.dispatch(types.PLACE__NEW_ORDER_TRAIN__GET_LOCATION_LIST, this)
    },
    data(){
      return {
        trainData: this.$store.state.newOrderTrain.newOrderTrainData,
        preciousData: [{value: '1', label: '有'}, {value: '0', label: '无'}],
        type: this.$store.state.transferType == 'pickup'
      }
    },
    computed: mapGetters({
      endData: 'place_newOrderTrain_endData',
      locationData: 'place_newOrderTrain_locationData',
      arriveTimeData: 'place_newOrderTrain_arriveTimeData'
    }),
    methods: {
      selectEnd(end){
        this.$store.dispatch(types.PLACE__NEW_ORDER_TRAIN__SELECT_END, {end, _this: this})
      },
      selectLocation(location){
        this.trainData.arriveTime = ''
      },
      selectArriveTime(arriveTime){
        const _this = this
        const date = handleGetTime(arriveTime, 'time').split(':')
        const dateHour = parseInt(date[0])
        const dateMin = parseInt(date[1])

        const stationId = this.trainData.stationId

        if (stationId=='1de76e8dac3c4ec5af2cdd06f2a5977b'&&(dateHour < 6 || dateHour > 23 || (dateHour == 6 && dateMin < 20))) {
          _this.$alert('非常抱歉，工作人员服务时间为\n(06:20-23:00)，感谢您的支持。', '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
              _this.trainData.arriveTime = ''
            }
          });
        }

        if (stationId=='5c41d92d20724a97b56afe7f434f876b'&&(dateHour < 10 || dateHour > 21 || (dateHour == 20 && dateMin > 40))) {
          _this.$alert('非常抱歉，工作人员服务时间为\n(10:00-20:40)，感谢您的支持。', '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
              _this.trainData.arriveTime = ''
            }
          });
        }

        //呼和浩特和呼和浩特东
        if ((stationId=='fa6300b05d09447aba2f4a998b0577c5'||stationId=='3f9a4bee66aa467587506a3c33c39b0c')&&(dateHour < 7 || dateHour > 23 )) {
          _this.$alert('非常抱歉，工作人员服务时间为\n(7:00-23:00)，感谢您的支持。', '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {
              _this.trainData.arriveTime = ''
            }
        });
        }
      },
      selectPrecious(precious){
        if(precious=='0')return
        const _this = this
        _this.$alert('亲爱的用户：现在暂时无法提供贵重物品搬运服务！', '贵重物品提示', {
          confirmButtonText: '确定',
          callback: action => {
            _this.trainData.precious = '0'
          }
        })
      },
      toOrderInfo(){
        this.$store.dispatch(types.PLACE__NEW_ORDER_TRAIN__TO_ORDER_INFO, {
          newOrderTrainData: this.trainData,
          _this: this
        })
      },
      goMap(){
        const location = this.trainData.location
        if (location == "") {
          this.$alert('请在选择接送起点后点击查看地图', '温馨提示', {
            confirmButtonText: '确定',
            callback: action => {}
          })
          return
        }
        setLocalStorage(this)
        const locationData = JSON.parse(location)
        window.location.href = `winsion://interactive/viewmap?stationId=${this.trainData.stationId}&itemId=${locationData.id}&transferType=${this.$store.state.transferType}`;
      },
      toOrderPrice(){
        this.$store.dispatch(types.PLACE__NEW_ORDER_TRAIN__TO_ORDER_PRICE, {
          newOrderTrainData: this.trainData,
          _this: this
        });
      }
    }
  }
</script>

<style scoped>
  .tnlist-container{
    font-size: 14px;
  }
  .el-col{
    height: 0.6rem;
    line-height: 0.6rem;
  }
  .info{
    height: 0.6rem;
  }
  .map{
    color: #306ab4;
    height: 0.6rem;
  }
</style>

