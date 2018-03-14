<template>
  <div id="manage-info">
    <div id="manage-info-back">
      <img id="search-back" src="../../../assets/shadow.png" />
      <div id="search-back-content">
        <el-button type="primary" @click="backBtn">返回</el-button>
      </div>
    </div>
    <div id="manage-info-content">
      <div id="manage-info-data">
        <el-row :gutter="20" class="manage-info-data-row-style">
          <el-col :span="2"><div class="manage-info-data-style">地点</div></el-col>
          <el-col :span="16"><el-input v-model="currentData.pointname" :disabled="true"></el-input></el-col>
        </el-row>
        <el-row :gutter="20" class="manage-info-data-row-style">
          <el-col :span="2"><div class="manage-info-data-style">大类</div></el-col>
          <el-col :span="5"><el-input v-model="currentData.classificationname" :disabled="true"></el-input></el-col>

          <el-col :span="2"><div class="manage-info-data-style">子类</div></el-col>
          <el-col :span="5"><el-input v-model="currentData.typename" :disabled="true"></el-input></el-col>

          <el-col :span="2"><div class="manage-info-data-style">等级</div></el-col>
          <el-col :span="5"><el-input v-model="currentData.priority" :disabled="true"></el-input></el-col>
        </el-row>
        <el-row :gutter="20" class="manage-info-data-row-style">
          <el-col :span="12">
            <el-row :gutter="20">
              <el-col :span="4"><div class="manage-info-data-style">解决时限</div></el-col>
              <el-col :span="14"><el-input v-model="currentData.costtime" :disabled="true"></el-input></el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="20">
              <el-col :span="4"><div class="manage-info-data-style">问题状态</div></el-col>
              <el-col :span="14"><el-input v-model="currentData.processname" :disabled="true"></el-input></el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="manage-info-data-row-style">
          <el-col :span="12">
            <el-row :gutter="20">
              <el-col :span="4"><div class="manage-info-data-style">提交人</div></el-col>
              <el-col :span="14"><el-input v-model="currentData.commituser" :disabled="true"></el-input></el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-row :gutter="20">
              <el-col :span="4"><div class="manage-info-data-style">提交时间</div></el-col>
              <el-col :span="14"><el-input v-model="currentData.ctime" :disabled="true"></el-input></el-col>
            </el-row>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="manage-info-data-row-style">
          <el-col :span="2">
            <div class="manage-info-data-style">问题描述</div>
          </el-col>
          <el-col :span="19">
            <el-input type="textarea" :rows="2" v-model="currentData.comment" :disabled="true"></el-input>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="manage-info-data-row-style">
          <el-col :span="2">
            <div class="manage-info-data-style">现场照片</div>
          </el-col>
          <el-col :span="19">
            <div class="manage-info-data-img">
              <img v-for="item in imgList" :src="item.filepath" alt="">
            </div>
          </el-col>
        </el-row>
      </div>
      <div id="manage-info-allot" v-if="allotStatus">
        <div v-if="flag">
          <div style="height: 120px">
            <el-row :gutter="20" class="manage-info-data-row-style">
              <el-col :span="2"><div class="manage-info-data-style">修复组</div></el-col>
              <el-col :span="5">
                <el-select v-model="value1" placeholder="请选择" style="width: 300px">
                  <el-option
                    v-for="maintain in maintainList"
                    :key="maintain.teamid"
                    :label="maintain.teamsName"
                    :value="maintain.teamid">
                  </el-option>
                </el-select>
              </el-col>
              <el-col :span="2"><div class="manage-info-data-style">修复时间</div></el-col>
              <el-col :span="5">
                <el-date-picker
                  v-model="value2"
                  type="datetime"
                  placeholder="选择日期时间" style="width: 300px">
                </el-date-picker>
              </el-col>
            </el-row>
          </div>
          <div class="manage-info-allot-button">
            <el-button type="primary" @click="saveMaintain">保存</el-button>
          </div>
        </div>
        <div v-if="!flag">
          <div v-show="currentFlag">
            <div style="height: 120px">
              <el-row :gutter="20" class="manage-info-data-row-style">
                <el-col :span="2"><div class="manage-info-data-style">修复组</div></el-col>
                <el-col :span="5"><el-input v-model="maintainData.assignedteamname" :disabled="true"></el-input></el-col>
              </el-row>
              <el-row :gutter="20" class="manage-info-data-row-style">
                <el-col :span="2"><div class="manage-info-data-style">修复人</div></el-col>
                <el-col :span="5"><el-input v-model="maintainData.handleperson" :disabled="true"></el-input></el-col>
                <el-col :span="2"><div class="manage-info-data-style">修复时间</div></el-col>
                <el-col :span="5"><el-input v-model="maintainData.dealtime" :disabled="true"></el-input></el-col>
              </el-row>
            </div>
            <div class="manage-info-allot-button">
              <el-button type="primary" @click="currentFlag=!currentFlag">修改</el-button>
            </div>
          </div>
          <div v-show="!currentFlag">
            <div style="height: 120px">
              <el-row :gutter="20" class="manage-info-data-row-style">
                <el-col :span="2"><div class="manage-info-data-style">修复组</div></el-col>
                <el-col :span="5">
                  <el-select v-model="value1" placeholder="请选择" style="width: 300px">
                    <el-option
                      v-for="maintain in maintainList"
                      :key="maintain.teamid"
                      :label="maintain.teamsName"
                      :value="maintain.teamid">
                    </el-option>
                  </el-select>
                </el-col>
                <el-col :span="2"><div class="manage-info-data-style">修复时间</div></el-col>
                <el-col :span="5">
                  <el-date-picker
                    v-model="value2"
                    type="datetime"
                    placeholder="选择日期时间" style="width: 300px">
                  </el-date-picker>
                </el-col>
              </el-row>
            </div>
            <div class="manage-info-allot-button">
              <el-button type="primary" @click="currentFlag=!currentFlag">返回</el-button>
              <el-button type="primary" @click="updateMaintain">保存</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    props:['flag','currentData','imgList','maintainList','maintainData'],
    data(){
      return{
        currentFlag:true,
        value1:'',
        value2:'',
        allotStatus:false
      }
    },
    methods:{
      updateMaintain(){
        const data = {
          problemResultId:this.maintainData.id,
          assignedTeamId:this.value1,
          handleTime:new Date(this.value2).getTime(),
        }
        this.$store.dispatch('updateManageAllotData',data)
      },
      saveMaintain(){
        const data = {
          problemId:this.currentData.id,
          adminId:this.$store.state.userId,
          assignedTeamId:this.value1,
          plannedFixTime:new Date(this.value2).getTime(),
          comment:''
        }
        this.$store.dispatch('submitManageAllotData',data)
      },
      backBtn(){
        this.$store.commit('updateManageFlag',true)
      }
    }
  }
</script>

<style scoped>
  #manage-info-back{
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
    width: 1804px;
    margin: 0 auto;
    background: rgba(0,0,0,.3);
    padding: 20px 0 20px 30px;
  }
  #manage-info-content{
    position: relative;
    width: 1834px;
    height: 780px;
    margin: 10px auto 0;
    font-size: 14px;
    background: rgba(0,0,0,.3);
  }
  #manage-info-data{
    padding: 100px 150px 30px 200px;
    color: #d5d5d5;
  }
  #manage-info-allot{
    padding: 30px 150px 30px 200px;
    color: #d5d5d5;
  }
  .manage-info-data-style{
    line-height: 35px;
    text-align: center;
  }
  .manage-info-data-row-style{
    margin: 20px 0;
    text-align: left;
  }
  .manage-info-data-row-style input{
    color: #000;
  }
  .manage-info-data-img{
    height: 120px;
    line-height: 120px;
  }
  #manage-info-data img{
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  .manage-info-allot-button{
    width: 858px;
    text-align: right;
  }
</style>
