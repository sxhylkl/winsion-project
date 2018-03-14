<template>
  <div>
    <!--添加和编辑界面-->
    <el-dialog :title="status=='add'?'添加作业组信息':'修改作业组信息'" v-model="dialogFormVisible" @close="cancel">
      <el-form :model="form" style="width: 80%">
        <el-form-item label="职能组" :label-width="formLabelWidth">
          <el-select v-model="form.postName" placeholder="请选择">
            <el-option
              v-for="groupItem in group"
              :label="groupItem.postName"
              :value="groupItem.postId"
              :key="groupItem.postId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班组名称" :label-width="formLabelWidth">
          <el-input v-model="form.teamName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="通话组ID" :label-width="formLabelWidth">
          <el-input v-model="form.talkGroupId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="班组联系电话" :label-width="formLabelWidth">
          <el-input v-model="form.linkPhone" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="优先级" :label-width="formLabelWidth">
          <el-select v-model="form.sort" placeholder="请选择">
            <el-option label="1" value="1" ></el-option>
            <el-option label="2" value="2" ></el-option>
            <el-option label="3" value="3" ></el-option>
            <el-option label="4" value="4" ></el-option>
            <el-option label="5" value="5" ></el-option>
            <el-option label="6" value="6" ></el-option>
            <el-option label="7" value="7" ></el-option>
            <el-option label="8" value="8" ></el-option>
            <el-option label="9" value="9" ></el-option>
            <el-option label="10" value="10" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="组所负责的区域" :label-width="formLabelWidth">
          <div style="border: 1px solid #bfcbd9; border-radius: 4px;max-height: 300px;overflow-y: scroll">
            <el-checkbox-group v-model="form.areaId">
              <el-checkbox
                v-for="areaItem in area"
                :label="areaItem.id"
                :key="areaItem.id">
                {{areaItem.areaName}}
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
  import * as types from '../../store/mutation-types'
  import { messageAlert } from '../../api'
  export default{
    props: ['form', 'visible', 'status','area', 'group'],
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
        this.$store.dispatch(types.CONTENT8_CONFIRM_CANCEL_INFO_ACTION)
      },
      confirm(){
        //提示用户完成信息
        if(this.form.postName.trim()==''){
          messageAlert(this,'请选择职能组','提示')
          return
        }else if(this.form.teamName.trim()==''){
          messageAlert(this,'请填写班组的名称','提示')
          return
        }else if(this.form.talkGroupId.trim()==''){
          messageAlert(this,'请填写通话组ID','提示')
          return
        }else if(this.form.linkPhone.trim()==''){
          messageAlert(this,'请填写班组联系电话','提示')
          return
        }else if(this.form.sort.trim()==''){
          messageAlert(this,'请选择优先级','提示')
          return
        }else if(this.form.areaId.length==0){
          messageAlert(this,'选择组所负责的区域','提示')
          return
        }

        //对于不同状态，调用不同接口
        if (this.status == 'add') {
          this.$store.dispatch(types.CONTENT8_CONFIRM_ADD_INFO_ACTION, {data: this.form, _this: this})
        } else {
          this.$store.dispatch(types.CONTENT8_CONFIRM_EDIT_INFO_ACTION, {data: this.form, _this: this})
        }
      }
    }
  }
</script>

<style scoped>
  .el-checkbox-group .el-checkbox:first-child{
    margin-left: 15px;
  }
</style>
