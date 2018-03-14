<template>
  <div>
    <!--添加和编辑界面-->
    <el-dialog v-model="dialogFormVisible" :title="tableStatus=='add'?'添加区域类型':'修改区域类型'" @close="cancel">
      <el-form :model="tableForm" style="width: 80%">
        <el-form-item label="区域类型" :label-width="formLabelWidth">
          <el-input v-model="tableForm.typeName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域用途" :label-width="formLabelWidth">
          <el-select v-model="tableForm.purposeName" placeholder="请选择">
            <el-option
              v-for="item in tableSelectData"
              :label="item.purposeName"
              :value="item.purposeId"
              :key="item.purposeId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import { messageAlert } from '../../api'
  export default {
    props:['tableSelectData','tableStatus','tableShow','tableForm'],
    data() {
      return {
        formLabelWidth: '120px'
      };
    },
    computed: {
      dialogFormVisible() {
        return this.tableShow
      }
    },
    methods:{
      cancel(){
        this.$store.commit(types.CONTENT9_TABLE_CONFIRM_CANCEL_INFO,false)
      },
      confirm(){
        //提示用户完成信息
        if(this.tableForm.typeName.trim()==''){
          messageAlert(this,'请填写区域类型','提示')
          return
        }else if(this.tableForm.purposeName.trim()==''){
          messageAlert(this,'请选择区域用途','提示')
          return
        }

        //对于不同状态，调用不同接口
        if (this.tableStatus == 'add') {
          this.$store.dispatch(types.CONTENT9_TABLE_CONFIRM_ADD_INFO_ACTION, {data: this.tableForm, _this: this})
        } else {
          this.$store.dispatch(types.CONTENT9_TABLE_CONFIRM_EDIT_INFO_ACTION, {data: this.tableForm, _this: this})
        }

      }
    }
  };
</script>

<style scoped>
  .el-checkbox-group .el-checkbox:first-child{
    margin-left: 15px;
  }
</style>
