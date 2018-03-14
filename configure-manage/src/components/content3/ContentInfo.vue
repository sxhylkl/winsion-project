<template>
  <div>
    <!--添加和编辑界面-->
    <el-dialog :title="status=='add'?'添加巡检项信息':'修改巡检项信息'" v-model="dialogFormVisible" @close="cancel">
      <el-form :model="form" style="width: 80%">
        <el-form-item label="巡检项名称名称" :label-width="formLabelWidth">
          <el-input v-model="form.itemdescribe" auto-complete="off"></el-input>
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
  import {messageAlert} from '../../api'
  export default{
    props: ['form', 'visible', 'status'],
    data() {
      return {
        formLabelWidth: '120px',
      };
    },
    computed: {
      dialogFormVisible() {
        return this.visible
      }
    },
    methods: {
      cancel(){
        this.$store.dispatch(types.CONTENT3_CONFIRM_CANCEL_INFO_ACTION)
      },
      confirm(){
        //提示用户完成信息
        if (this.form.itemdescribe.trim() == '') {
          messageAlert(this, '请填写巡检项名称信息', '提示')
          return
        }
        //对于不同状态，调用不同接口
        if (this.status == 'add') {
          this.$store.dispatch(types.CONTENT3_CONFIRM_ADD_INFO_ACTION, {data: this.form, _this: this})
        } else {
          this.$store.dispatch(types.CONTENT3_CONFIRM_EDIT_INFO_ACTION, {data: this.form, _this: this})
        }
      }
    }
  }
</script>

<style scoped>
  .el-form-item__content > div {

  }
</style>
