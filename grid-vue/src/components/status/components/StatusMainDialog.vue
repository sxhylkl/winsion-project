<template>
  <div id="status-dialog">
    <el-dialog :visible.sync="show" top="9%" :modal="false" @close="close">
      <div id="status-dialog-content">
        <el-row class="status-dialog-style">
          <el-col :span="12"><div>地点：{{statusDialogData.data.pointname}}</div></el-col>
          <el-col :span="12"><div>班组：{{statusDialogData.data.committeamname}}</div></el-col>
        </el-row>
        <el-row class="status-dialog-style">
          <el-col :span="12"><div>计划开始时间：{{statusDialogData.data.planstarttime}}</div></el-col>
          <el-col :span="12"><div>计划结束时间：{{statusDialogData.data.planendtime}}</div></el-col>
        </el-row>
        <el-row class="status-dialog-style">
          <el-col :span="12"><div>实际开始时间：{{statusDialogData.data.realstarttime}}</div></el-col>
          <el-col :span="12"><div>实际结束时间：{{statusDialogData.data.realendtime}}</div></el-col>
        </el-row>
        <el-row class="status-dialog-style">
          <el-col :span="12"><div>状态：{{statusDialogData.data.patrolsstate}}</div></el-col>
        </el-row>
      </div>

      <div id="status-dialog-table">
        <div id="status-dialog-table-style">
          <el-row class="status-dialog-table-head">
            <el-col :span="4"><div class="status-dialog-table-head-style">序号</div></el-col>
            <el-col :span="8"><div class="status-dialog-table-head-style">巡视项目</div></el-col>
            <el-col :span="4"><div class="status-dialog-table-head-style">巡视人</div></el-col>
            <el-col :span="4"><div class="status-dialog-table-head-style">巡视时间</div></el-col>
            <el-col :span="4"><div class="status-dialog-table-head-style">巡视结果</div></el-col>
          </el-row>
          <el-row v-for="(item,index) in statusDialogData.arr" key="item.id" class="status-dialog-table-body"
                  :style="{background:item.devicestate=='异常'?'#f00':''}">
            <el-col :span="4"><div class="status-dialog-table-body-style">{{index}}</div></el-col>
            <el-col :span="8"><div class="status-dialog-table-body-style">{{item.itemdescribe}}</div></el-col>
            <el-col :span="4"><div class="status-dialog-table-body-style">{{item.commituser}}</div></el-col>
            <el-col :span="4"><div class="status-dialog-table-body-style">{{item.patroltime}}</div></el-col>
            <el-col :span="4"><div class="status-dialog-table-body-style">{{item.devicestate}}</div></el-col>
          </el-row>
        </div>
      </div>

    </el-dialog>
  </div>
</template>

<script>
  export default{
    props: ['statusDialogFlag','statusDialogData'],
    data(){
      return {
        show: this.statusDialogFlag
      }
    },
    computed: {},
    methods: {
      close(){
        this.$store.commit('updateStatusDialogFlag', false)
      }
    },
    watch: {
      statusDialogFlag(val, oldVal){
        this.show = val
      }
    }
  }
</script>

<style scoped>
  #status-dialog-content{
    padding: 30px 30px 0;
    color: #d5d5d5;
  }
  .status-dialog-style{
    border-bottom: 1px dashed #263b5d;
    padding-bottom: 15px;
    padding-left: 15px;
    margin-bottom: 15px;
  }
  #status-dialog-table{
    padding: 30px;
  }
  #status-dialog-table-style{
    height: 420px;
    overflow: auto;
  }
  .status-dialog-table-head-style{
    text-align: center;
    line-height: 30px;
    border: 1px solid #263b5d;
    color: #d5d5d5;
  }
  .status-dialog-table-head{
    background: #061836;
  }
  .status-dialog-table-body:nth-child(odd){
    background: #2E4466;
  }
  .status-dialog-table-body:nth-child(even){
    background: #173970;
  }
  .status-dialog-table-body-style{
    text-align: center;
    line-height: 26px;
    height: 26px;
    border: 1px solid #263b5d;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #d5d5d5;
  }
</style>
