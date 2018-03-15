<template>
  <div>
    <!--添加和编辑界面-->
    <el-dialog :title="status=='add'?'添加问题大类信息':'修改问题大类信息'" :visible.sync="dialogFormVisible" @close="cancel">
      <el-form :model="form" style="width: 80%">
        <el-form-item label="编号" :label-width="formLabelWidth">
          <el-input v-model="form.classificationNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="大类名称" :label-width="formLabelWidth">
          <el-input v-model="form.classificationName" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="cancel">取 消</el-button>
        <el-button size="small" type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import { messageAlert } from '../../api'
  export default{
    props: ['form', 'visible', 'status'],
    data() {
      return {
        formLabelWidth: '120px',
        dialogFormVisible: false
      };
    },
    methods: {
      cancel(){
        this.$store.dispatch(types.CONTENT4_CONFIRM_CANCEL_INFO_ACTION)
      },
      confirm(){
        //提示用户完成信息
        if(this.form.classificationNo.trim()==''){
          messageAlert(this,'请填写设备编号信息','提示')
          return
        }else if(this.form.classificationName.trim()==''){
          messageAlert(this,'请填写设备名称信息','提示')
          return
        }
        //对于不同状态，调用不同接口
        if (this.status == 'add') {
          this.$store.dispatch(types.CONTENT4_CONFIRM_ADD_INFO_ACTION, {data: this.form, _this: this})
        } else {
          this.$store.dispatch(types.CONTENT4_CONFIRM_EDIT_INFO_ACTION, {data: this.form, _this: this})
        }
      }
    },
    watch: {
      visible(newVal) {
        this.dialogFormVisible = newVal
      }
    }
  }
</script>

<style scoped>
  .el-form-item__content > div {

  }
</style>
