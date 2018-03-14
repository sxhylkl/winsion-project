<template>
  <div>
    <!--添加和编辑界面-->
    <el-dialog :title="status=='add'?'添加巡检点信息':'修改巡检点信息'" v-model="dialogFormVisible" @close="cancel">
      <el-form :model="form" style="width: 80%">
        <el-form-item label="巡检点名称" :label-width="formLabelWidth">
          <el-input v-model="form.pointName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="蓝牙ID" :label-width="formLabelWidth">
          <el-input v-model="form.blueToothId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域名称" :label-width="formLabelWidth">
          <el-select v-model="form.areaName" placeholder="请选择">
            <el-option
              v-for="areaItem in area"
              :label="areaItem.areaName"
              :value="areaItem.id"
              :key="areaItem.id">
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
  import * as types from '../../../store/mutation-types'
  import { messageAlert } from '../../../api'
  export default{
    props: ['form', 'visible', 'status', 'area'],
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
        this.$store.dispatch(types.CONTENT14_2_CONFIRM_CANCEL_INFO_ACTION)
      },
      confirm(){
        //提示用户完成信息
        if(this.form.pointName.trim()==''){
          messageAlert(this,'请填写巡检点名称信息','提示')
          return
        }else if(this.form.blueToothId.trim()==''){
          messageAlert(this,'请填写蓝牙ID信息','提示')
          return
        }else if(this.form.areaName.trim()==''){
          messageAlert(this,'请选择区域名称信息','提示')
          return
        }
        //对于不同状态，调用不同接口
        if (this.status == 'add') {
          this.$store.dispatch(types.CONTENT14_2_CONFIRM_ADD_INFO_ACTION, {data: this.form, _this: this})
        } else {
          this.$store.dispatch(types.CONTENT14_2_CONFIRM_EDIT_INFO_ACTION, {data: this.form, _this: this})
        }
      }
    }
  }
</script>

<style scoped>
  .el-form-item__content > div {

  }
</style>
