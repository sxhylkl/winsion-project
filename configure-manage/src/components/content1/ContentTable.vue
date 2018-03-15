<template>
  <div>
    <!--表格-->
    <el-table :data="tableData" border style="width: 100%" height="680" :header-row-style="headerRowStyle" highlight-current-row>
      <el-table-column label="设备编号" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceNo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备名称" width="300" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.deviceName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备所属类别" width="300" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.classificationName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备所在区域" width="400" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.areaName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="责任组" width="200" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.teamName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
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
    data() {
      return {
        headerRowStyle: {
          color: '#000'
        }
      }
    },
    methods: {
      handleEdit(data) {
        this.$store.dispatch(types.CONTENT1_EDIT_INFO_ACTION,data)
      },
      handleDelete(data) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(types.CONTENT1_CONFIRM_DELETE_INFO_ACTION,{data:data,_this:this})
        }).catch(()=>{})
      }
    }
  };
</script>

<style scoped>

</style>
