<template>
  <div>
    <!--表格-->
    <el-table :data="tableData" border style="width: 100%" height="680">
      <el-table-column label="部门" width="150" align="center">
        <template scope="scope">
          <span>{{ scope.row.orgName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="职能组" width="150" align="center">
        <template scope="scope">
          <span>{{ scope.row.postName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班组" width="150" align="center">
        <template scope="scope">
          <span>{{ scope.row.teamName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="通话组ID" width="200" align="center">
        <template scope="scope">
          <span>{{ scope.row.talkGroupId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="班组联系人电话" width="200" align="center">
        <template scope="scope">
          <span>{{ scope.row.linkPhone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="优先级" width="150" align="center">
        <template scope="scope">
          <span>{{ scope.row.sort }}</span>
        </template>
      </el-table-column>
      <el-table-column label="负责区域信息" width="500" align="center">
        <template scope="scope">
          <span>{{ scope.row.areaName }}</span>
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
        this.$store.dispatch(types.CONTENT8_EDIT_INFO_ACTION,data)
      },
      handleDelete(data) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(types.CONTENT8_CONFIRM_DELETE_INFO_ACTION,{data:data,_this:this})
        }).catch(()=>{})
      }
    }
  };
</script>

<style scoped>

</style>
