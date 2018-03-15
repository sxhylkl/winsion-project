<template>
  <div>
    <el-menu
             background-color="#324157"
             text-color="#fff"
             active-text-color="#409EFF"
             :default-active="activeIndex"
             class="el-menu-demo"
             mode="horizontal"
             :router="true">
      <el-menu-item index="content1">设备管理</el-menu-item>
      <el-menu-item index="content2">巡检点</el-menu-item>
      <el-menu-item index="content3">巡检项</el-menu-item>
      <el-menu-item index="content4">问题大类</el-menu-item>
      <el-menu-item index="content5">问题类型</el-menu-item>
      <el-menu-item index="content6">部门管理</el-menu-item>
      <el-menu-item index="content7">职能组</el-menu-item>
      <el-menu-item index="content8">作业组</el-menu-item>
      <el-menu-item index="content9">区域管理</el-menu-item>
      <el-submenu index="content10">
        <template slot="title">角色管理</template>
        <el-menu-item index="content10-1">基本信息</el-menu-item>
      </el-submenu>
      <el-submenu index="content11">
        <template slot="title">用户管理</template>
        <el-menu-item index="content11-1">用户管理</el-menu-item>
        <el-menu-item index="content11-2">用户组管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="content12">排班计划</el-menu-item>
      <el-menu-item index="content13">到发车次</el-menu-item>
      <!--<el-submenu index="content14">
        <template slot="title">规则制定</template>
        <el-menu-item index="content14-1">基础规则</el-menu-item>
        <el-menu-item index="content14-2">任务规则</el-menu-item>
        <el-menu-item index="content14-3">列车任务类型</el-menu-item>
      </el-submenu>-->
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: window.location.href.split('/#/')[1]==''?'content1':window.location.href.split('/#/')[1].split('/')[0]
      };
    }
  }
</script>

<style>

</style>
