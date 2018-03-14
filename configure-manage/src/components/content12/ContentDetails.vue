<template>
  <div>
    <!--详情界面-->
    <el-dialog v-model="dialogFormVisible" size="large" @close="cancel">
      <el-table :data="schedulingSpecificList" border style="width: 100%" height="500">
        <el-table-column label="班组名称" width="200" align="center">
          <template scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="班次" width="300" align="center">
          <template scope="scope">
            <span>{{ scope.row.teamname }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上班日期" width="210" align="center">
          <template scope="scope">
            <span>{{ scope.row.startdays }}</span>
          </template>
        </el-table-column>
        <el-table-column label="上班时间" width="210" align="center">
          <template scope="scope">
            <span>{{ scope.row.starttime }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下班日期" width="210" align="center">
          <template scope="scope">
            <span>{{ scope.row.enddays }}</span>
          </template>
        </el-table-column>
        <el-table-column label="下班时间" align="center">
          <template scope="scope">
            <span>{{ scope.row.endtime }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  import { messageAlert } from '../../api'
  export default{
    props: ['visible', 'schedulingSpecificList'],
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
        this.$store.commit(types.CONTENT12_CONFIRM_DETAILS_INFO,false)
      }
    }
  }
</script>

<style scoped>

</style>
