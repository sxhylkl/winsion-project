<template>
  <div id="manage-search">
    <img id="search-back" src="../../../assets/shadow.png" />
    <div id="search-back-content">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-row>
            <el-col :span="8">
              <div class="manage-search-style-1">部门：</div>
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
              <div class="manage-search-style-1">岗位：</div>
            </el-col>
            <el-col :span="16">
              <el-select v-model="condition.post" placeholder="请选择" @change="selectPost">
                <el-option
                  v-for="item in managePost"
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
              <div class="manage-search-style-1">班组：</div>
            </el-col>
            <el-col :span="16">
              <el-select v-model="condition.team" placeholder="请选择">
                <el-option
                  v-for="item in manageTeam"
                  :key="item.teamid"
                  :label="item.teamsName"
                  :value="item.teamid">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row>
            <el-col :span="4">
              <div class="manage-search-style-1">时间：</div>
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
      <div style="margin: 20px 0"></div>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-row>
            <el-col :span="8">
              <div class="manage-search-style-1">状态：</div>
            </el-col>
            <el-col :span="16">
              <el-select v-model="condition.status" placeholder="请选择">
                <el-option
                  v-for="item in statusOption"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row>
            <el-col :span="8">
              <div class="manage-search-style-1">网格：</div>
            </el-col>
            <el-col :span="16">
              <el-select v-model="condition.grid" placeholder="请选择">
                <el-option
                  v-for="item in manageGrid"
                  :key="item.id"
                  :label="item.pointName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="4">
          <el-row>
            <el-col :span="8">
              <div class="manage-search-style-1">问题大类：</div>
            </el-col>
            <el-col :span="16">
              <el-select v-model="condition.question" placeholder="请选择">
                <el-option
                  v-for="item in manageQuestion"
                  :key="item.id"
                  :label="item.classificationname"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="7">
          <el-row>
            <el-col :span="4">
              <div class="manage-search-style-1">超时状态：</div>
            </el-col>
            <el-col :span="18">
              <el-select v-model="condition.outTime" placeholder="请选择">
                <el-option
                  v-for="item in questionOption"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {messageAlert} from '../../../api'
  export default{
    props: ['manageCondition','commonOrganization','managePost','manageTeam','manageGrid','manageQuestion'],
    data(){
      return {
        condition:JSON.parse(JSON.stringify(this.manageCondition)),
        statusOption:[
          {value: '', label: '全部'},
          {value: '0', label: '待修复'},
          {value: '1', label: '修复中'},
          {value: '2', label: '待验收'},
          {value: '3', label: '已完成'},
          {value: '4', label: '未完成'},
        ],
        questionOption:[
          {value: '', label: '全部'},
          {value: '0', label: '未超时'},
          {value: '1', label: '超时'}
        ],
      }
    },
    methods: {
      selectOrg(val){
        this.condition.post = ''
        this.condition.team = ''
        this.$store.dispatch('getManagePost',{val})
      },
      selectPost(val){
        this.condition.team = ''
        this.$store.dispatch('getManageTeam',{val})
      },
      searchData(){
        this.$store.commit('updateManageCondition',JSON.parse(JSON.stringify(this.condition)))
        //获取饼图和表格的数据
        this.$store.dispatch('getManagePieData')
        //更改排序状态
        this.$store.commit('updateManageTableOrderBy',"[{Field:process,Mode:1}]")
        this.$store.dispatch('getManageTableData',{currentPage:1})
      }
    }
  }
</script>

<style scoped>
  #manage-search {
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
  .manage-search-style-1 {
    text-align: center;
    line-height: 35px;
    color: #fff;
  }
</style>
