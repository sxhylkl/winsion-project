<template>
  <div>
    <!--表格-->
    <el-table :data="tableData" border style="width: 100%" height="680">
      <el-table-column label="开始时间" width="200" align="center">
        <template scope="scope">
          <span>{{ scope.row.startDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束时间" width="200" align="center">
        <template scope="scope">
          <span>{{ scope.row.endDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规则名称" width="320" align="center">
        <template scope="scope">
          <span>{{ scope.row.ruleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="规则类型" width="200" align="center">
        <template scope="scope">
          <span>{{ scope.row.ruleType }}</span>
        </template>
      </el-table-column>
      <el-table-column label="区域名称" width="320" align="center">
        <template scope="scope">
          <span>{{ scope.row.areaName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="150" align="center">
        <template scope="scope">
          <span>{{ scope.row.used=='1'?'生效':'未生效' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          <el-button :disabled="scope.row.used=='1'" size="small" type="warning" @click="handleExecute(scope.row)">生效</el-button>
          <el-button :disabled="scope.row.used=='0'" size="small" type="warning" @click="handleNotExecute(scope.row)">未生效</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import * as types from '../../../store/mutation-types'
  export default {
    props:['tableData'],
    methods: {
      handleEdit(data) {
        this.$store.dispatch(types.CONTENT14_1_EDIT_INFO_ACTION,data)
      },
      handleDelete(data) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(types.CONTENT14_1_CONFIRM_DELETE_INFO_ACTION,{data:data,_this:this})
        }).catch(()=>{})
      },
      handleExecute(data) {
        this.$confirm('此操作将使其生效, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //this.$store.dispatch(types.CONTENT14_CONFIRM_EXECUTE_INFO_ACTION,{data:data,_this:this})
        }).catch(()=>{})
      },
      handleNotExecute(data) {
        this.$confirm('此操作将使其失效, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //this.$store.dispatch(types.CONTENT14_CONFIRM_NOT_EXECUTE_INFO_ACTION,{data:data,_this:this})
        }).catch(()=>{})
      },
    }
  };
</script>

<style scoped>

</style>
