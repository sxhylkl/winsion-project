<template>
  <div id="record-table">
    <!--选择项-->
    <el-row class="record-table-process">
      <el-col :span="4">
        <div @click="selectTableStatus('')" :style="{background: tableDataSelect==''?'#061836':''}">
          <el-row class="record-table-select">
            <el-col :span="12"><div class="record-table-select-style">全部</div></el-col>
            <el-col :span="12"><div class="record-table-select-style">{{tableCount.all}}</div></el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="5">
        <div @click="selectTableStatus('正常')" :style="{background: tableDataSelect=='正常'?'#061836':''}">
          <el-row class="record-table-select">
            <el-col :span="12"><div class="record-table-select-style">正常</div></el-col>
            <el-col :span="12"><div class="record-table-select-style">{{tableCount.normal}}</div></el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="5">
        <div @click="selectTableStatus('未开始')" :style="{background: tableDataSelect=='未开始'?'#061836':''}">
          <el-row class="record-table-select">
            <el-col :span="12"><div class="record-table-select-style">未开始</div></el-col>
            <el-col :span="12"><div class="record-table-select-style">{{tableCount.stop}}</div></el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="5">
        <div @click="selectTableStatus('进行中')" :style="{background: tableDataSelect=='进行中'?'#061836':''}">
          <el-row class="record-table-select">
            <el-col :span="12"><div class="record-table-select-style">进行中</div></el-col>
            <el-col :span="12"><div class="record-table-select-style">{{tableCount.running}}</div></el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="5">
        <div @click="selectTableStatus('异常')" :style="{background: tableDataSelect=='异常'?'#061836':''}">
          <el-row class="record-table-select">
            <el-col :span="12"><div class="record-table-select-style">有问题</div></el-col>
            <el-col :span="12"><div class="record-table-select-style">{{tableCount.question}}</div></el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>

    <!--表内容-->
    <div id="record-table-data">
      <!--表头-->
      <div class="record-table-content record-table-content-head-style">
        <div style="width: 5%">序号</div>
        <div style="width: 6%">地点</div>
        <div style="width: 13%">计划开始时间</div>
        <div style="width: 13%">计划结束时间</div>
        <div style="width: 10%">到位时间</div>
        <div style="width: 10%">完成时间</div>
        <div style="width: 7%">状态</div>
        <div style="width: 9%">班组</div>
        <div style="width: 9%">巡视人</div>
        <div style="width: 6%">完成度</div>
        <div style="width: 7%">问题数量</div>
        <div style="width: 5%">详情</div>
      </div>
      <!--表内容-->
      <div class="record-table-data" v-for="item,index in tableData">
        <!--当前的表内容-->
        <div class="record-table-content" :style="{background:index%2?'#173970':'#2E4466'}">
          <div style="width: 5%">{{range*7+(1+index)}}</div>
          <div style="width: 6%">{{item.pointname}}</div>
          <div style="width: 13%">{{item.planstarttime}}</div>
          <div style="width: 13%">{{item.planendtime}}</div>
          <div style="width: 10%">{{item.realstarttime}}</div>
          <div style="width: 10%">{{item.realendtime}}</div>
          <div style="width: 7%">{{item.patrolsstate}}</div>
          <div style="width: 9%" :title="item.committeamname">{{item.committeamname}}</div>
          <div style="width: 9%" :title="item.commituser">{{item.commituser}}</div>
          <div style="width: 6%">{{`${item.finishcount}/${item.itemscount}`}}</div>
          <div style="width: 7%">{{item.problemscount}}</div>
          <div style="width: 5%;cursor: pointer" @click="getInfoData(index,item.id)">查看</div>
        </div>
        <el-collapse-transition>
          <div class="record-table-data-info" v-if="index==currentIndex">
          <div class="record-table-content-info" :style="{background:index%2?'#173970':'#2E4466'}">
            <div style="width: 5%">序号</div>
            <div style="width: 60%">巡视项目</div>
            <div style="width: 20%">巡视时间</div>
            <div style="width: 15%">巡视结果</div>
          </div>
          <div class="record-table-content-info" v-for="info,infoIndex in currentInfo">
            <div style="width: 5%">{{infoIndex}}</div>
            <div style="width: 60%">{{info.itemdescribe}}</div>
            <div style="width: 20%">{{info.patroltime}}</div>
            <div style="width: 15%">{{info.devicestate}}</div>
          </div>
        </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props:['tableData','range','tableCount','currentIndex','currentInfo','tableDataSelect'],
    methods:{
      getInfoData(index,id){
        if(this.currentIndex==index){
          this.$store.commit('saveRecordTableInfoDataIndex',-1)
          return
        }
        this.$store.dispatch('getRecordTableInfoData',{index,id})
      },
      selectTableStatus(status){
        //更新选择项
        this.$store.commit('saveRecordTableSelectData',status)
        //切换数据
        this.$store.dispatch('getRecordTableData',{status})
      }
    }
  }
</script>

<style scoped>
  .record-table-process{
    margin: 10px 0;
    padding: 0 30px;
  }
  #record-table-data{
    margin: 0 auto;
    width: 1777px;
    height: 250px;
    overflow: auto;
  }
  .record-table-select{
    width: 100%;
    box-sizing: border-box;
    border: 1px solid #263b5d;
    cursor: pointer;
  }
  .record-table-select-style{
    line-height: 30px;
    text-align: center;
    color: #d5d5d5;
  }
  .record-table-content{
    overflow: hidden;
  }
  .record-table-content-head-style{
    background: #061836;
  }
  .record-table-content>div{
    float: left;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #263b5d;
    line-height: 28px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: auto;
    color: #d5d5d5;
  }
  .record-table-data-info{
    width: 80%;
    margin: 0 auto;
    padding: 20px 0;
  }
  .record-table-content-info{
    overflow: hidden;
  }
  .record-table-content-info>div{
    float: left;
    box-sizing: border-box;
    text-align: center;
    border: 1px solid #263b5d;
    line-height: 28px;
    color: #d5d5d5;
  }
</style>
