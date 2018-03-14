<template>
  <div id="record-search">
    <img id="search-back" src="../../../assets/shadow.png" />
    <div id="search-back-content">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-row>
            <el-col :span="8">
              <div class="record-search-style-1">部门：</div>
            </el-col>
            <el-col :span="16">
              <el-select v-model="condition.organization" placeholder="请选择" @change="selectOrg">
                <el-option
                  v-for="item in commonOrganization"
                  :key="item.orgid"
                  :label="item.orgname"
                  :value="item.orgid">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row>
            <el-col :span="8">
              <div class="record-search-style-1">岗位：</div>
            </el-col>
            <el-col :span="16">
              <el-select v-model="condition.post" placeholder="请选择" @change="selectPost">
                <el-option
                  v-for="item in recordPost"
                  :key="item.postid"
                  :label="item.postname"
                  :value="item.postid">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row>
            <el-col :span="8">
              <div class="record-search-style-1">班组：</div>
            </el-col>
            <el-col :span="16">
              <el-select v-model="condition.team" placeholder="请选择">
                <el-option
                  v-for="item in recordTeam"
                  :key="item.teamid"
                  :label="item.teamsName"
                  :value="item.teamid">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row>
            <el-col :span="4">
              <div class="record-search-style-1">时间：</div>
            </el-col>
            <el-col :span="20">
              <el-date-picker
                v-model="condition.timeRange"
                type="datetimerange"
                placeholder="选择时间范围">
              </el-date-picker>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="searchData">查询</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {messageAlert} from '../../../api'
  export default{
    props: ['recordCondition','commonOrganization','recordPost','recordTeam'],
    data(){
      return {
        condition:JSON.parse(JSON.stringify(this.recordCondition))
      }
    },
    methods: {
      selectOrg(val){
        this.condition.post = ''
        this.condition.team = ''
        this.$store.dispatch('getRecordPost',{val})
      },
      selectPost(val){
        this.condition.team = ''
        this.$store.dispatch('getRecordTeam',{val})
      },
      searchData(){
        this.$store.commit('updateRecordCondition',JSON.parse(JSON.stringify(this.condition)))
        //获取饼图和表格的数据
        this.$store.dispatch('getRecordPieData')
        this.$store.dispatch('getRecordTableData',{status:''})
      }
    }
  }
</script>

<style scoped>
  #record-search {
    position: relative;
    padding-top: 18px;
  }
  #search-back{
    position: absolute;
    width: 1834px;
    height: 24px;
    left: 11px;
    top: 5px;
  }
  #search-back-content{
    width: 1834px;
    margin: 0 auto;
    background: rgba(0,0,0,.3);
    padding: 20px 0;
  }

  .record-search-style-1 {
    text-align: center;
    line-height: 35px;
    color: #fff;
  }
</style>
