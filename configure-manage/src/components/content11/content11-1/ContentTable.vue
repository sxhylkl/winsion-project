<template>
  <div>
    <!--表格-->
    <el-table :data="tableData" border style="width: 100%" height="680" size="mini">
      <el-table-column label="所属站点" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.areaName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属部门" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.orgName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属职能" width="140" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.postName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属班组" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.teamName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.loginName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="真实姓名" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="内部电话号码" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sipTellAddress }}</span>
        </template>
      </el-table-column>
      <el-table-column label="对讲用户名" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.mmpUser }}</span>
        </template>
      </el-table-column>
      <el-table-column label="生效时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.startTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="失效时间" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.endTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="管理员" width="100" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status=='1'?'启用':'禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属角色" width="120" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" fixed="right" min-width="180">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
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
        this.$store.dispatch(types.CONTENT11_1_EDIT_INFO_ACTION,data)
      },
      handleDelete(data) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(types.CONTENT11_1_CONFIRM_DELETE_INFO_ACTION,{data:data,_this:this})
        }).catch(()=>{})
      }
    }
  };
</script>

<style scoped>

</style>
