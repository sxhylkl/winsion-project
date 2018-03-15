<template>
  <div id="wrapper">
    <div style="text-align: center;margin-bottom: 20px">
      <h3>作业组信息列表</h3>
    </div>
    <div style="text-align: right;padding-right: 30px;word-spacing: 20px">
      <span style="font-family: '微软雅黑'">部门：</span>
      <el-select v-model="sectionValue" placeholder="请选择" @change="handleChangeSection">
        <el-option
          v-for="sectionData in section"
          :key="sectionData.orgId"
          :label="sectionData.orgName"
          :value="sectionData.orgId">
        </el-option>
      </el-select>
      <span style="font-family: '微软雅黑'">职能组：</span>
      <el-select v-model="groupValue" placeholder="请选择" @change="handleChangeGroup">
        <el-option
          v-for="groupData in group"
          :key="groupData.postId"
          :label="groupData.postName"
          :value="groupData.postId">
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
    props:['group','section'],
    data() {
      return {
        sectionValue: '',
        groupValue: '',
      }
    },
    methods: {
      handleChangeSection(value) {
        this.groupValue = ''
        this.$store.commit(types.CONTENT8_SAVE_SECTION_VALUE,value)
        this.$store.dispatch(types.CONTENT8_GET_GROUP_INFO_ACTION)
      },
      handleChangeGroup(value) {
        this.$store.commit(types.CONTENT8_SAVE_GROUP_VALUE,value)
      },
      search() {
        this.$store.dispatch(types.CONTENT8_SEARCH_INFO_ACTION)
      },
      add(){
        this.$store.dispatch(types.CONTENT8_ADD_INFO_ACTION)
      }
    }
  }
</script>

<style scoped>
  #wrapper {
    margin-bottom: 20px;
  }
</style>
