<template>
  <div>
    <!--添加和编辑界面-->
    <el-dialog :title="status=='add'?'添加问题类型信息':'修改问题类型信息'" :visible.sync="dialogFormVisible" @close="cancel">
      <el-form :model="form" style="width: 80%">
        <el-form-item label="所属站点" :label-width="formLabelWidth">
          <el-select v-model="form.areaName" placeholder="请选择">
            <el-option
              v-for="areaItem in area"
              :label="areaItem.areaName"
              :value="areaItem.id"
              :key="areaItem.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户组" :label-width="formLabelWidth">
          <el-input v-model="form.userGroupName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="对讲用户组ID" :label-width="formLabelWidth">
          <el-input v-model="form.talkGroupId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户" :label-width="formLabelWidth">
          <div style="border: 1px solid #bfcbd9; border-radius: 4px;max-height: 300px;overflow-y: scroll">
            <el-checkbox-group v-model="form.userId">
              <el-checkbox
                v-for="userItem in user"
                :label="userItem.userId"
                :key="userItem.userId">
                {{userItem.userName}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
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
  import {messageAlert} from '../../../api'
  export default{
    props: ['form', 'visible', 'status', 'area','user'],
    data() {
      return {
        formLabelWidth: '120px',
        dialogFormVisible: false
      };
    },
    methods: {
      cancel(){
        this.$store.dispatch(types.CONTENT11_2_CONFIRM_CANCEL_INFO_ACTION)
      },
      confirm(){
        //提示用户完成信息
        if (this.form.areaName.trim() == '') {
          messageAlert(this, '请选择所属站点', '提示')
          return
        } else if (this.form.userGroupName.trim() == '') {
          messageAlert(this, '请填写用户组信息', '提示')
          return
        } else if (this.form.talkGroupId.trim() == '') {
          messageAlert(this, '请输入对讲用户组ID信息', '提示')
          return
        } else if (this.form.userId.length == 0) {
          messageAlert(this, '请选择用户信息', '提示')
          return
        }
        //对于不同状态，调用不同接口
        if (this.status == 'add') {
          this.$store.dispatch(types.CONTENT11_2_CONFIRM_ADD_INFO_ACTION, {data: this.form, _this: this})
        } else {
          this.$store.dispatch(types.CONTENT11_2_CONFIRM_EDIT_INFO_ACTION, {data: this.form, _this: this})
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
  .el-checkbox-group .el-checkbox:first-child{
    margin-left: 15px;
  }
</style>
