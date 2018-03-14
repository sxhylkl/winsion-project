<template>
  <div id="manage-table">
    <div class="manage-table-head">
      <div style="width: 3%">序号</div>
      <div style="width: 15%">提交时间</div>
      <div style="width: 10%;cursor: pointer" @click="getTableData('point')">网格 <i :class="[sort1?'el-icon-caret-bottom':'el-icon-caret-top']"></i></div>
      <div style="width: 10%;cursor: pointer" @click="getTableData('classify')">问题大类 <i :class="[sort2?'el-icon-caret-bottom':'el-icon-caret-top']"></i></div>
      <div style="width: 12%">问题子类</div>
      <div style="width: 10%">提交组</div>
      <div style="width: 5%">等级</div>
      <div style="width: 25%">问题描述</div>
      <div style="width: 5%;cursor: pointer" @click="getTableData('process')">状态 <i :class="[sort3?'el-icon-caret-bottom':'el-icon-caret-top']"></i></div>
      <div style="width: 5%">详情</div>
    </div>
    <div class="manage-table-content" v-for="item,index in tableData">
      <div style="width: 3%">{{(range-1)*7+(1+index)}}</div>
      <div style="width: 15%">{{item.ctime}}</div>
      <div style="width: 10%">{{item.pointname}}</div>
      <div style="width: 10%">{{item.classificationname}}</div>
      <div style="width: 12%">{{item.typename}}</div>
      <div style="width: 10%">{{item.committeamname}}</div>
      <div style="width: 5%">{{item.priority}}</div>
      <div style="width: 25%">{{item.itemdescribe}}</div>
      <div style="width: 5%">{{item.processname}}</div>
      <div style="width: 5%;cursor: pointer" @click="getManageInfo(item)">查看</div>
    </div>
  </div>
</template>

<script>
  export default{
    props:['tableData','range'],
    data(){
      return{
        sort1:true,
        sort2:true,
        sort3:true,
      }
    },
    methods:{
      getManageInfo(item){
        //保存当前选中的数据
        this.$store.commit('saveManageCurrentTable',item)
        //获取详情
        this.$store.dispatch('getManageInfoData',{item})
      },
      getTableData(val){
        if(val=='point'){
          let orderBy = ""
          if(this.sort1){
            orderBy = "[{Field:pointname,Mode:1}]"
          }else {
            orderBy = "[{Field:pointname,Mode:0}]"
          }
          this.$store.commit('updateManageTableOrderBy',orderBy)
          this.$store.dispatch('getManageTableData',{currentPage:1})
          this.sort1 = !this.sort1
        }else if(val=='classify'){
          let orderBy = ""
          if(this.sort2){
            orderBy = "[{Field:classificationname,Mode:1}]"
          }else {
            orderBy = "[{Field:classificationname,Mode:0}]"
          }
          this.$store.commit('updateManageTableOrderBy',orderBy)
          this.$store.dispatch('getManageTableData',{currentPage:1})
          this.sort2 = !this.sort2
        }else if(val=='process'){
          let orderBy = ""
          if(this.sort3){
            orderBy = "[{Field:process,Mode:1}]"
          }else {
            orderBy = "[{Field:process,Mode:0}]"
          }
          this.$store.commit('updateManageTableOrderBy',orderBy)
          this.$store.dispatch('getManageTableData',{currentPage:1})
          this.sort3 = !this.sort3
        }
      }
    }
  }
</script>

<style scoped>
  #manage-table{
    margin: 10px auto 0;
    width: 1777px;
    height: 250px;
    overflow: auto;
    color: #d5d5d5;
  }
  .manage-table-head,.manage-table-content{
    overflow: hidden;
  }
  .manage-table-head{
    background: #061836;
  }
  .manage-table-content:nth-child(odd){
    background: #2E4466;
  }
  .manage-table-content:nth-child(even){
    background: #173970;
  }
  .manage-table-head>div,.manage-table-content>div{
    float: left;
    line-height: 30px;
    text-align: center;
    border: 1px solid #263b5d;
    box-sizing: border-box;
  }
</style>
