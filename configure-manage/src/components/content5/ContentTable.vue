<template>
  <div>
    <!--表格-->
    <el-table :data="tableData" border style="width: 100%" height="680">
      <el-table-column label="问题类型名称" width="400" align="center">
        <template scope="scope">
          <span>{{ scope.row.typeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="预计耗时" width="300" align="center">
        <template scope="scope">
          <span>{{ scope.row.planCostTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="大类名称" width="400" align="center">
        <template scope="scope">
          <span>{{ scope.row.classificationName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优先级" width="200" align="center">
        <template scope="scope">
          <span>{{ scope.row.priority }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
        this.$store.dispatch(types.CONTENT5_EDIT_INFO_ACTION,data)
      },
      handleDelete(data) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(types.CONTENT5_CONFIRM_DELETE_INFO_ACTION,{data:data,_this:this})
        }).catch(()=>{})
      }
    }
  };
</script>

<style scoped>

</style>
