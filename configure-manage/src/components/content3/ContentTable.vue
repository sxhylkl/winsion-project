<template>
  <div>
    <!--表格-->
    <el-table :data="tableData" border style="width: 100%" height="680" size="mini">
      <el-table-column label="ID" width="500" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="巡检项名称" width="800" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.itemdescribe }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" min-width="200">
        <template slot-scope="scope">
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
        this.$store.dispatch(types.CONTENT3_EDIT_INFO_ACTION,data)
      },
      handleDelete(data) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(types.CONTENT3_CONFIRM_DELETE_INFO_ACTION,{data:data,_this:this})
      }).catch(()=>{})
      }
    }
  };
</script>

<style scoped>

</style>
