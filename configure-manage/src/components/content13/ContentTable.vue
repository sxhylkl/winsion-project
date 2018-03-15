<template>
  <div>
    <!--表格-->
    <el-table :data="tableData" border style="width: 100%" height="680">
      <el-table-column label="日期" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.runDate.split(' ')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="车次" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.trainNumber }}</span>
        </template>
      </el-table-column>
      <el-table-column label="始发站" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.startStation }}</span>
        </template>
      </el-table-column>
      <el-table-column label="到达站" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.endStation }}</span>
        </template>
      </el-table-column>
        <el-table-column label="上下行方向" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.direction==0?'上行':'下行' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="计划到达时间" width="180" align="center">
        <template slot-scope="scope">
        <span>{{ scope.row.arriveTime.split('.')[0] }}</span>
      </template>
      </el-table-column>
      <el-table-column label="实际到达时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.realArriveTime.split('.')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="计划出发时间" width="180" align="center">
        <template slot-scope="scope">
        <span>{{ scope.row.departTime.split('.')[0] }}</span>
      </template>
      </el-table-column>
      <el-table-column label="实际出发时间" width="180" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.realDepartTime.split('.')[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="列车状态" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.trainLate==0
            ?'正点'
            :scope.row.trainLate==1
              ?'确定晚点'
              :scope.row.trainLate==2
                ?'不确定晚点'
                :'停运'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="检票时间" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.checkTime.split('.')[0].split(' ')[1] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="候车室" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.waitroomName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="检票口" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.checkportName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="站台" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.platformName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" width="300">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" :disabled="!(new Date(scope.row.checkTime).getTime()>new Date().getTime())||!(scope.row.trainStatus!=1)"
                     type="success" @click="handleCheckIn(scope.row,1)">开始检票</el-button>
          <el-button size="small" :disabled="!(new Date(scope.row.checkTime).getTime()>new Date().getTime())||!(scope.row.trainStatus==1)"
                     type="success" @click="handleCheckIn(scope.row,2)">结束检票</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  export default {
    props:['tableData'],
    methods: {
      handleEdit(data) {
        this.$store.dispatch(types.CONTENT13_EDIT_INFO_ACTION,data)
      },
      handleCheckIn(data,num){
        this.$confirm(`确定${num==1?'开始':'结束'}检票, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(num==1){
            this.$store.dispatch(types.CONTENT13_CONFIRM_CHECK_IN_INFO_ACTION,{data:data,_this:this})
          }else {
            this.$store.dispatch(types.CONTENT13_CONFIRM_CHECK_END_INFO_ACTION,{data:data,_this:this})
          }
        }).catch(()=>{})
      }
    }
  };
</script>

<style scoped>

</style>
