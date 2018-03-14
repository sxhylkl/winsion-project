<template>
  <div>
    <!--添加和编辑界面-->
    <el-dialog :title="status=='add'?'添加排班':'修改排班'" top="5%" size="large" v-model="dialogFormVisible" @close="cancel">
      <div class="dialog-group-style">
        <h4>排班计划</h4>
        <el-form :inline="true" :model="schedulingPlan">
          <el-form-item label="计划名称" :label-width="formLabelWidth">
            <el-input v-model="schedulingPlan.planName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="开始日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="schedulingPlan.startDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束日期" :label-width="formLabelWidth">
            <el-date-picker
              v-model="schedulingPlan.endDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="状态" :label-width="formLabelWidth">
            <el-input v-model="executeStatus" auto-complete="off" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-group-style">
        <h4>排班方式</h4>
        <el-form :inline="true" :model="schedulingWay">
          <el-form-item label="方式名称" :label-width="formLabelWidth">
            <el-input v-model="schedulingWay.cycleName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="排班周期（天）" :label-width="formLabelWidth">
            <el-input v-model="schedulingWay.regularDays" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-group-style">
        <h4>具体方式</h4>
        <el-form :inline="true" :model="schedulingSpecificWay">
          <el-form-item label="班组名称" :label-width="formLabelWidth">
            <el-input v-model="schedulingSpecificWay.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="班次" :label-width="formLabelWidth">
            <el-select v-model="schedulingSpecificWay.teamname" multiple placeholder="请选择">
              <el-option
                v-for="teamItem in team"
                :label="teamItem.teamName"
                :value="`${teamItem.teamId}:${teamItem.teamName}`"
                :key="teamItem.teamId">
              </el-option>
            </el-select>
          </el-form-item>
          <br>
          <el-form-item label="上班日期（天）" :label-width="formLabelWidth">
            <el-input-number :min="1" v-model="schedulingSpecificWay.startdays"></el-input-number>
          </el-form-item>
          <el-form-item label="上班时间" :label-width="formLabelWidth">
            <el-time-select
              v-model="schedulingSpecificWay.starttime"
              placeholder="时间"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:45'
              }">
            </el-time-select>
          </el-form-item>
          <el-form-item label="下班日期（天）" :label-width="formLabelWidth">
            <el-input-number :min="1" v-model="schedulingSpecificWay.enddays"></el-input-number>
          </el-form-item>
          <el-form-item label="下班时间" :label-width="formLabelWidth">
            <el-time-select
              v-model="schedulingSpecificWay.endtime"
              placeholder="时间"
              :picker-options="{
                start: '00:00',
                step: '00:15',
                end: '23:45'
              }">
            </el-time-select>
          </el-form-item>
        </el-form>

        <div style="text-align: right;padding-right: 68px;margin-bottom: 15px;margin-top: -20px">
          <el-button @click="addSpecificWay">添 加</el-button>
        </div>

        <el-table :data="schedulingSpecificList" border style="width: 100%" height="260">
          <el-table-column label="班组名称" width="200" align="center">
            <template scope="scope">
              <span>{{ scope.row.name }}</span>
            </template>
          </el-table-column>
          <el-table-column label="班次" width="200" align="center">
            <template scope="scope">
              <span>{{ scope.row.teamname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上班日期" width="200" align="center">
            <template scope="scope">
              <span>{{ scope.row.startdays }}</span>
            </template>
          </el-table-column>
          <el-table-column label="上班时间" width="200" align="center">
            <template scope="scope">
              <span>{{ scope.row.starttime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="下班日期" width="200" align="center">
            <template scope="scope">
              <span>{{ scope.row.enddays }}</span>
            </template>
          </el-table-column>
          <el-table-column label="下班时间" width="200" align="center">
            <template scope="scope">
              <span>{{ scope.row.endtime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template scope="scope">
              <el-button size="small" type="danger" @click="deleteRow(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
    props: ['visible', 'team','status', 'schedulingPlan','schedulingWay','schedulingSpecificWay','schedulingSpecificList'],
    data() {
      return {
        formLabelWidth: '120px',
        executeStatus:'未执行'
      };
    },
    computed: {
      dialogFormVisible() {
        return this.visible
      }
    },
    methods: {
      cancel(){
        this.$store.dispatch(types.CONTENT12_CONFIRM_CANCEL_INFO_ACTION)
      },
      confirm(){
        //提示用户完成信息
        if (this.schedulingPlan.planName.trim() == '') {
          messageAlert(this, '请填写排班计划名称', '提示')
          return
        }else if (typeof this.schedulingPlan.startDate=='string'&&this.schedulingPlan.startDate.trim() == '') {
          messageAlert(this, '请选择开始时间', '提示')
          return
        }else if (typeof this.schedulingPlan.endDate=='string'&&this.schedulingPlan.endDate.trim() == '') {
          messageAlert(this, '请选择结束时间', '提示')
          return
        }else if (this.schedulingWay.cycleName.trim() == '') {
          messageAlert(this, '请填写排班方式名称', '提示')
          return
        }else if (this.schedulingWay.regularDays.trim() == '') {
          messageAlert(this, '请填写排班方式周期', '提示')
          return
        }else if (this.schedulingSpecificList.length == 0) {
          messageAlert(this, '请添加具体排班方案', '提示')
          return
        }
        //对于不同状态，调用不同接口
        if (this.status == 'add') {
          this.$store.dispatch(types.CONTENT12_CONFIRM_ADD_INFO_ACTION, {
            data1: this.schedulingPlan,
            data2: this.schedulingWay,
            _this: this
          })
        } else {
          this.$store.dispatch(types.CONTENT12_CONFIRM_EDIT_INFO_ACTION, {
            data1: this.schedulingPlan,
            data2: this.schedulingWay,
            _this: this
          })
        }
      },
      addSpecificWay(){
        //提示用户添加信息
        if (this.schedulingSpecificWay.name.trim() == '') {
          messageAlert(this, '请填写具体排班方式名称', '提示')
          return
        }else if (this.schedulingSpecificWay.teamname.length == 0) {
          messageAlert(this, '请选择班次', '提示')
          return
        }else if (this.schedulingSpecificWay.starttime.trim() == '') {
          messageAlert(this, '请选择上班时间', '提示')
          return
        }else if (this.schedulingSpecificWay.endtime.trim() == '') {
          messageAlert(this, '请选择下班时间', '提示')
          return
        }
        //添加详情
        this.$store.commit(types.CONTENT12_CONFIRM_ADD_SPECIFIC_WAY,JSON.parse(JSON.stringify(this.schedulingSpecificWay)))
      },
      deleteRow(index){
        //刪除数据
        this.$store.commit(types.CONTENT12_CONFIRM_DELETE_SPECIFIC_WAY,index)
      }
    }
  }
</script>

<style scoped>
  .dialog-group-style{
    position: relative;
    margin-bottom: 30px;
    padding-top: 20px;
    box-sizing: border-box;
    border: 1px solid #ddd;
  }
  .dialog-group-style>h4{
    position: absolute;
    left: 10px;
    top: -10px;
    background: #fff;
  }
</style>
