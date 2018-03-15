<template>
  <div>
    <!--添加和编辑界面-->
    <el-dialog :title="status=='add'?'添加设备信息':'修改设备信息'" :visible.sync="dialogFormVisible" @close="cancel">
      <el-form :model="form" style="width: 80%">
        <el-form-item label="设备编号" :label-width="formLabelWidth" v-if="status=='add'">
          <el-input v-model="form.deviceNo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备名称" :label-width="formLabelWidth">
          <el-input v-model="form.deviceName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="设备所属类别" :label-width="formLabelWidth">
          <el-select v-model="form.classificationName" placeholder="请选择">
            <el-option
              v-for="classifyItem in classify"
              :label="classifyItem.classificationName"
              :value="classifyItem.id"
              :key="classifyItem.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备所在区域" :label-width="formLabelWidth">
          <el-select v-model="form.areaName" placeholder="请选择">
            <el-option
              v-for="areaItem in area"
              :label="areaItem.areaName"
              :value="areaItem.id"
              :key="areaItem.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="责任组" :label-width="formLabelWidth">
          <el-select v-model="form.teamName" placeholder="请选择">
            <el-option
              v-for="teamItem in team"
              :label="teamItem.teamName"
              :value="teamItem.teamId"
              :key="teamItem.teamId">
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
  export default{
    props: ['form', 'visible', 'status', 'classify', 'area', 'team'],
    data() {
      return {
        formLabelWidth: '120px',
        dialogFormVisible: false
      };
    },
    methods: {
      cancel(){
        this.$store.dispatch(types.CONTENT1_CONFIRM_CANCEL_INFO_ACTION)
      },
      confirm(){
        //提示用户完成信息
        if(this.form.deviceNo.trim()==''){
          messageAlert(this,'请填写设备编号信息','提示')
          return
        }else if(this.form.deviceName.trim()==''){
          messageAlert(this,'请填写设备名称信息','提示')
          return
        }else if(this.form.classificationName.trim()==''){
          messageAlert(this,'请选择设备类别信息','提示')
          return
        }else if(this.form.areaName.trim()==''){
          messageAlert(this,'请选择设备所在区域信息','提示')
          return
        }else if(this.form.teamName.trim()==''){
          messageAlert(this,'请选择责任组信息','提示')
          return
        }
        //对于不同状态，调用不同接口
        if (this.status == 'add') {
          this.$store.dispatch(types.CONTENT1_CONFIRM_ADD_INFO_ACTION, {data: this.form, _this: this})
        } else {
          this.$store.dispatch(types.CONTENT1_CONFIRM_EDIT_INFO_ACTION, {data: this.form, _this: this})
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
