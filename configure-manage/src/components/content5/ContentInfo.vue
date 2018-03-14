<template>
  <div>
    <!--添加和编辑界面-->
    <el-dialog :title="status=='add'?'添加问题类型信息':'修改问题类型信息'" v-model="dialogFormVisible" @close="cancel">
      <el-form :model="form" style="width: 80%">
        <el-form-item label="类型名称" :label-width="formLabelWidth">
          <el-input v-model="form.typeName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="预计耗时" :label-width="formLabelWidth">
          <el-input v-model="form.planCostTime" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="大类名称" :label-width="formLabelWidth">
          <el-select v-model="form.classificationName" placeholder="请选择">
            <el-option
              v-for="classifyItem in classify"
              :label="classifyItem.classificationName"
              :value="classifyItem.id"
              :key="classifyItem.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="优先级" :label-width="formLabelWidth">
          <el-select v-model="form.priority" placeholder="请选择">
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
    props: ['form', 'visible', 'status', 'classify'],
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
        this.$store.dispatch(types.CONTENT5_CONFIRM_CANCEL_INFO_ACTION)
      },
      confirm(){
        //提示用户完成信息
        if(this.form.typeName.trim()==''){
          messageAlert(this,'请填写类型名称信息','提示')
          return
        }else if(this.form.planCostTime.trim()==''){
          messageAlert(this,'请填写耗时信息','提示')
          return
        }else if(this.form.classificationName.trim()==''){
          messageAlert(this,'请选择问题大类信息','提示')
          return
        }else if(this.form.priority.trim()==''){
          messageAlert(this,'请选择优先级','提示')
          return
        }
        //对于不同状态，调用不同接口
        if (this.status == 'add') {
          this.$store.dispatch(types.CONTENT5_CONFIRM_ADD_INFO_ACTION, {data: this.form, _this: this})
        } else {
          this.$store.dispatch(types.CONTENT5_CONFIRM_EDIT_INFO_ACTION, {data: this.form, _this: this})
        }
      }
    }
  }
</script>

<style scoped>
  .el-form-item__content > div {

  }
</style>
