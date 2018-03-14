<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-input type="textarea" :placeholder="placeholder.tip" v-model="rateContent"
                  resize="none" @blur="getRateContent"></el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">服务评分</el-col>
      <el-col :span="18">
        <el-rate v-model="starLevelLevel" @change="handleRateChange"></el-rate>
      </el-col>
    </el-row>
    <el-row v-if="judgeItem">
      <el-col :span="24">
        <span v-for="item in rateItems" :key="item.id" @click="handleRateItemClick">{{item.value}}</span>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import * as types from '../../../../store/mutation-types'
  export default{
    props: ['placeholder'],
    data(){
      return {
        starLevelLevel: 0,
        rateContent: "",
        judgeItem: false,
        rateItems: []
      }
    },
    methods: {
      getRateContent(ev){
        this.$store.commit(types.MANAGE__JUDGE__UPDATE_RATE_CONTENT, {
          staffId: this.placeholder.staffId,
          content: ev.target.value
        })
      },
      handleRateChange(starLevel){
        this.rateItems = [];
        this.judgeItem = true;

        //为了防止重复渲染
        if (starLevel == 1) {
          this.rateItems = [
            {id: 11, value: "服务态度差"},
            {id: 12, value: "迟到"},
            {id: 13, value: "联系不畅"},
            {id: 14, value: "没有送上车"},
            {id: 15, value: "搬运粗暴"}
          ];
        }
        if (starLevel == 2) {
          this.rateItems = [
            {id: 21, value: "服务态度差"},
            {id: 22, value: "迟到"},
            {id: 23, value: "联系不畅"},
            {id: 24, value: "没有送上车"},
            {id: 25, value: "搬运粗暴"}
          ];
        }
        if (starLevel == 3) {
          this.rateItems = [
            {id: 31, value: "态度好"},
            {id: 32, value: "准时"},
            {id: 33, value: "细心周到"},
            {id: 34, value: "服务专业"},
            {id: 35, value: "轻拿轻放"},
            {id: 36, value: "风雨无阻"}
          ];
        }
        if (starLevel == 4) {
          this.rateItems = [
            {id: 41, value: "态度好"},
            {id: 42, value: "准时"},
            {id: 43, value: "细心周到"},
            {id: 44, value: "服务专业"},
            {id: 45, value: "轻拿轻放"},
            {id: 46, value: "风雨无阻"}
          ];
        }
        if (starLevel == 5) {
          this.rateItems = [
            {id: 51, value: "态度好"},
            {id: 52, value: "准时"},
            {id: 53, value: "细心周到"},
            {id: 54, value: "服务专业"},
            {id: 55, value: "轻拿轻放"},
            {id: 56, value: "风雨无阻"}
          ];
        }

        this.$store.commit(types.MANAGE__JUDGE__UPDATE_STAR_LEVEL, {
          staffId: this.placeholder.staffId,
          starLevel: starLevel
        })
      },
      handleRateItemClick(ev){
        if (ev.target.className.match('judge-active')) {
          this.$store.commit(types.MANAGE__JUDGE__DELETE_TAG_NAME, {
            staffId: this.placeholder.staffId,
            tagItem: ev.target.innerHTML
          })
          ev.target.className = ""
        } else {
          this.$store.commit(types.MANAGE__JUDGE__ADD_TAG_NAMEL, {
            staffId: this.placeholder.staffId,
            tagItem: ev.target.innerHTML
          })
          ev.target.className = "judge-active"
        }
      }
    }
  }
</script>
<style>

</style>
