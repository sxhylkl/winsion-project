<template>
  <div>
    <!--表格-->
    <el-table :data="tableData" border style="width: 100%" height="680">
      <el-table-column label="计划名称" width="300" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.planName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="开始时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排班方式" width="300" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.cycleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.used=='1'?'生效':'未生效' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建日期" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="排班周期" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.regularDays }}</span>
        </template>
      </el-table-column>
      <el-table-column label="详情" width="100" align="center">
        <template slot-scope="scope">
          <span style="cursor: pointer" @click="getDetails(scope.row)">查看</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button :disabled="scope.row.used=='1'" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button :disabled="scope.row.used=='1'" size="small" type="warning" @click="handleExecute(scope.row)">生效</el-button>
          <el-button :disabled="scope.row.used=='0'" size="small" type="warning" @click="handleNotExecute(scope.row)">未生效</el-button>
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
        this.$store.dispatch(types.CONTENT12_EDIT_INFO_ACTION,{data,_this:this})
      },
      handleDelete(data) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(types.CONTENT12_CONFIRM_DELETE_INFO_ACTION,{data:data,_this:this})
        }).catch(()=>{})
      },
      handleExecute(data) {
        this.$confirm('此操作将使该排班计划生效, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(types.CONTENT12_CONFIRM_EXECUTE_INFO_ACTION,{data:data,_this:this})
        }).catch(()=>{})
      },
      handleNotExecute(data) {
        this.$confirm('此操作将使该排班计划失效, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(types.CONTENT12_CONFIRM_NOT_EXECUTE_INFO_ACTION,{data:data,_this:this})
        }).catch(()=>{})
      },
      getDetails(data){
        this.$store.dispatch(types.CONTENT12_GET_DETAILS_ACTION,{data:data.workplanCyclesId,_this:this,condition:'details'})
      }
    }
  };
</script>

<style scoped>

</style>
