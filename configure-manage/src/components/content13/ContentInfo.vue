<template>
  <div>
    <!--添加和编辑界面-->
    <el-dialog :title="'修改站台到发信息'" :visible.sync="dialogFormVisible" @close="cancel">
      <el-form :model="form" style="width: 80%;">
        <el-form-item label="计划到达时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.arriveTime"
            :disabled="form.arriveTime==''||form.arriveTime==null"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="计划出发时间" :label-width="formLabelWidth">
          <el-date-picker
            v-model="form.departTime"
            :disabled="form.departTime==''||form.departTime==null"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="检票口" :label-width="formLabelWidth">
          <el-select multiple  v-model="form.checkportId" placeholder="请选择">
            <el-option
              v-for="areaItem in area"
              :label="areaItem.checkportName"
              :value="areaItem.checkportId"
              :key="areaItem.checkportId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="站台" :label-width="formLabelWidth">
          <el-select v-model="form.platformId" placeholder="请选择">
            <el-option
              v-for="teamItem in team"
              :label="teamItem.platformName"
              :value="teamItem.platformId"
              :key="teamItem.platformId">
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
    props: ['form', 'visible', 'area', 'team'],
    data() {
      return {
        formLabelWidth: '120px',
        dialogFormVisible: false
      };
    },
    methods: {
      cancel(){
        this.$store.dispatch(types.CONTENT13_CONFIRM_CANCEL_INFO_ACTION)
      },
      confirm(){
        //提示用户完成信息
        if(this.form.checkportName==''||this.form.checkportName.length==0){
          messageAlert(this,'请选择检票口','提示')
          return
        }else if(!this.form.platformName||this.form.platformName.trim()==''){
          messageAlert(this,'请选择站台','提示')
          return
        }
        //确认修改
        this.$store.dispatch(types.CONTENT13_CONFIRM_EDIT_INFO_ACTION, {data: this.form, _this: this})
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
