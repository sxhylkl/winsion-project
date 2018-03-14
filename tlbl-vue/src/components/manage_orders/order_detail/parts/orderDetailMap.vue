<template>
  <div id="contain">
    <div id="map" v-if="orderDetailMap.type" @click="toMap">
      <img style="width: 100%; height: 150px"
           :src="`http://api.map.baidu.com/staticimage/v2?ak=PfQ9N0aHmf9rw5hcuViCpQaG6CxYFVMs&mcode=666666&center=${orderDetailMap.longitude},${orderDetailMap.latitude}&width=300&height=200&zoom=16&markers=${orderDetailMap.longitude},${orderDetailMap.latitude}&markerStyles=-1,http://www.winsion.net:3100/img/xiaoqizi.png`" alt="地理位置">
    </div>
    <div id="orderBrother" v-if="orderDetailBrother">
      <div class="eachBrother">联系工作人员：</div>
      <div id="all" class="eachBrother" v-if="orderDetailBrother.wholeCourse.length">
        <div class="eachBrotherMessage" v-for="wholeCourse in orderDetailBrother.wholeCourse">
          <span>{{wholeCourse.name}}</span><a class="phone" :href="`winsion://interactive/phonecall?phone=${wholeCourse.mobile}`"></a>
        </div>
      </div>
      <div id="outside" class="eachBrother" v-if="orderDetailBrother.beforeCourse.length">
        <span class="eachBrotherCourse">起点到贵宾室：</span>
        <div class="eachBrotherMessage" v-for="beforeCourse in orderDetailBrother.beforeCourse">
          <span class="eachBrotherName" :class="{eachBrotherNamePart:orderDetailBrother.beforeCourse.length!=1}">{{beforeCourse.name}}</span><a class="phone" :href="`winsion://interactive/phonecall?phone=${beforeCourse.mobile}`"></a>
        </div>
      </div>
      <div id="platform" class="eachBrother" v-if="orderDetailBrother.afterCourse.length">
        <span class="eachBrotherCourse">贵宾室到站台：</span>
        <div class="eachBrotherMessage" v-for="afterCourse in orderDetailBrother.afterCourse">
          <span class="eachBrotherName" :class="{eachBrotherNamePart:orderDetailBrother.afterCourse.length!=1}">{{afterCourse.name}}</span><a class="phone" :href="`winsion://interactive/phonecall?phone=${afterCourse.mobile}`"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import * as types from '../../../../store/mutation-types'
  export default{
    computed: mapGetters({
      orderDetailMap: 'manage_orderDetail_orderDetailMap',
      orderDetailBrother: 'manage_orderDetail_orderDetailBrother',
    }),
    methods:{
      toMap(){
        this.$store.dispatch(types.MANAGE__ORDER_DETAIL__TO_MAP)
      }
    }
  }
</script>

<style scoped>
  #map,#orderBrother{
    margin: 0 0.1rem 0.1rem;
    background-color: #fff;
    padding: 0.3rem;
  }
  .eachBrother{
    height: 30px;
  }
  .eachBrotherCourse{
    display: inline-block;
  }
  .eachBrotherMessage{
    display: inline-block;
    margin-right: 10px;
  }
  .phone{
    display: inline-block;
    width: 20px;
    height: 20px;
    /*background: url("../../../../../static/images/phone.png") no-repeat;*/
    background-size: contain;
    margin-left: 10px;
    margin-bottom: -5px;
  }
  .eachBrotherName{
    display: inline-block;
    margin-bottom: -5px;
  }
  .eachBrotherNamePart{
    max-width: 1rem;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

</style>
