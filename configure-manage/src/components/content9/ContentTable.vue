<template>
  <div>
    <div id="button">
      <div class="block">
      <span class="wrapper">
        <el-button size="small" :plain="true" type="info" @click="add">添加</el-button>
        <el-button size="small" :plain="true" type="info" @click="edit">修改</el-button>
        <el-button size="small" :plain="true" type="info" @click="handleDelete">删除</el-button>
      </span>
      </div>
    </div>
    <el-card>
      <div slot="header">
        <span style="line-height: 20px;">区域类型</span>
      </div>
      <div>
        <el-table
          :data="tableData"
          height="620"
          border
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%" size="mini">
          <el-table-column
            fixed="right" min-width="180"
            prop="typeName"
            label="类型名称"
            width="300"
            align="center">
          </el-table-column>
          <el-table-column
            prop="purposeName"
            label="类型用途"
            align="center">
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import { messageAlert } from '../../api'
  export default {
    props:['tableData'],
    data() {
      return {
        currentRow: null
      }
    },
    methods: {
      handleCurrentChange(val) {
        this.currentRow = val
      },
      add() {
        this.$store.commit(types.CONTENT9_TABLE_ADD_INFO,{typeName: '', purposeName: ''})
      },
      edit(){
        if(!this.currentRow){
          messageAlert(this,'请选择区域类型','提示')
          return
        }
        this.$store.commit(types.CONTENT9_TABLE_EDIT_INFO,this.currentRow)
      },
      handleDelete() {
        if(!this.currentRow){
          messageAlert(this,'请选择区域类型','提示')
          return
        }
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch(types.CONTENT9_TABLE_CONFIRM_DELETE_INFO_ACTION,{data:this.currentRow,_this:this})
        }).catch(()=>{})
      }
    }
  }
</script>

<style scoped>
  #button {
    padding: 10px 0;
  }

  .el-card {
    height: 720px;
  }
</style>
