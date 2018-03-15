<template>
  <div>
    <!--添加和编辑界面-->
    <el-dialog :visible.sync="dialogFormVisible" :title="listStatus=='add'?'添加区域管理':'修改区域管理'" @close="cancel">
      <el-form :model="listForm" style="width: 80%">
        <el-form-item label="上级节点" :label-width="formLabelWidth">
          <el-input v-model="listForm.parentName" auto-complete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="区域类型" :label-width="formLabelWidth">
          <el-select v-model="listForm.typeName" placeholder="请选择">
            <el-option
              v-for="item in tableData"
              :label="item.typeName"
              :value="item.areaTypeId"
              :key="item.areaTypeId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域名称" :label-width="formLabelWidth">
          <el-input v-model="listForm.areaName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="区域编号" :label-width="formLabelWidth">
          <el-input v-model="listForm.number" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="对应的BSSID" :label-width="formLabelWidth">
          <el-input v-model="listForm.ssId" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="车站级" :label-width="formLabelWidth">
          <el-switch
            v-model="value"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
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
  export default {
    props: ['listStatus', 'listShow', 'listForm', 'tableData'],
    data() {
      return {
        formLabelWidth: '120px',
        value: this.listForm.countFlag == '1',
        dialogFormVisible: false
      };
    },
    methods: {
      cancel(){
        this.$store.commit(types.CONTENT9_LIST_CONFIRM_CANCEL_INFO, false)
      },
      confirm(){
        //提示用户完成信息
        if (this.listForm.typeName.trim() == '') {
          messageAlert(this, '请选择区域类型', '提示')
          return
        }else if (this.listForm.areaName.trim() == '') {
          messageAlert(this, '请填写区域名称', '提示')
          return
        }else if (this.listForm.number.trim() == '') {
          messageAlert(this, '请填写区域编号', '提示')
          return
        }else if (this.listForm.ssId.trim() == '') {
          messageAlert(this, '请填写对应的BSSID', '提示')
          return
        }

        //对于不同状态，调用不同接口
        if (this.listStatus == 'add') {
          this.$store.dispatch(types.CONTENT9_LIST_CONFIRM_ADD_INFO_ACTION, {
            data: {
              ...this.listForm,
              countFlag: this.value ? '1' : '0'
            },
            _this: this
          })
        } else {
          this.$store.dispatch(types.CONTENT9_LIST_CONFIRM_EDIT_INFO_ACTION, {
            data: {
              ...this.listForm,
              countFlag: this.value ? '1' : '0'
            },
            _this: this
          })
        }
      }
    },
    watch: {
      listShow(newVal) {
        this.dialogFormVisible = newVal
      }
    }
  };
</script>

<style scoped>
  .el-checkbox-group .el-checkbox:first-child {
    margin-left: 15px;
  }
</style>
