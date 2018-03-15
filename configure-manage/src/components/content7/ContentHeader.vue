<template>
  <div id="wrapper">
    <div style="text-align: center;margin-bottom: 20px">
      <h3>职能组信息列表</h3>
    </div>
    <div style="text-align: right;padding-right: 30px;word-spacing: 20px">
      <span style="font-family: '微软雅黑'">部门：</span>
      <el-select v-model="sectionValue" placeholder="请选择">
        <el-option
          v-for="item in section"
          :key="item.orgId"
          :label="item.orgName"
          :value="item.orgId">
        </el-option>
      </el-select>
      <el-button size="small" type="primary" @click="search">查询</el-button>
      <el-button size="small" type="primary" @click="add">添加</el-button>
    </div>
  </div>
</template>

<script>
  import * as types from '../../store/mutation-types'
  export default{
    props:['section'],
    data() {
      return {
        sectionValue: ''
      }
    },
    methods: {
      search() {
        this.$store.commit(types.CONTENT7_SAVE_SECTION_VALUE,this.sectionValue)
        this.$store.dispatch(types.CONTENT7_SEARCH_INFO_ACTION)
      },
      add(){
        this.$store.dispatch(types.CONTENT7_ADD_INFO_ACTION)
      }
    }
  }
</script>

<style scoped>
  #wrapper {
    margin-bottom: 20px;
  }
</style>
