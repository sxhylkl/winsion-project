<template>
  <div class="page">
    <div class="tnlist-container order-container">
      <ul class="send-user-info">
        <li class="clearfix" v-for="user in userInfo" @click="selectUser(user)">
          <el-row :gutter="20">
            <el-col :span="3">
              <div class="grid-content bg-purple" style="line-height: 0.5rem;">
                <img :src="user.show?'./static/images/ic_check_selected@2x.png':'./static/images/ic_check_notselected@2x.png'" alt="">
              </div>
            </el-col>
            <el-col :span="7">
              <div class="grid-content bg-purple fixed-height">{{user.contact}}</div>
            </el-col>
            <el-col :span="9">
              <div class="grid-content bg-purple fixed-height">{{user.mobile}}</div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple fixed-height"><el-button size="small" @click.stop="deleteInfo(user)">删除</el-button></div>
            </el-col>
          </el-row>
        </li>
      </ul>
    </div>
    <footer class="my-orders-footer" @click="toNewOrder">
      <button id="myOrderList">选择</button>
    </footer>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as types from '../../../../store/mutation-types'
  import { setLocalStorage } from '../../../../api'
  export default{
    created(){
      setLocalStorage(this)
      this.$store.dispatch(types.PLACE__NEW_ORDER_INFO__GET_CONTACT_INFO)
    },
    computed: mapGetters({
      userInfo: 'place_newOrderInfo_userInfo'
    }),
    methods: {
      selectUser(user){
        this.$store.commit(types.PLACE__NEW_ORDER_INFO__UPDATE_CONTACT_INFO, user)
      },
      toNewOrder(){
        this.$store.dispatch(types.PLACE__NEW_ORDER_INFO__UPDATE_NEW_ORDER_TRAIN, this)
      },
      deleteInfo(user){
        this.$store.dispatch(types.PLACE__NEW_ORDER_INFO__DELETE_CONTACT_INFO, {user,_this:this})
      }
    }
  }
</script>

<style>
  html, body {
    height: 100%;
    overflow: hidden;
  }
  .page{
    height: 100%;
    overflow: auto;
  }

  .send-user-info {
    margin: 0.15rem 0 1.3rem 0;
    padding-left: 0.3rem;
    box-sizing: border-box;
    background: #fff;
  }

  .send-user-info li {
    box-sizing: border-box;
    border-top: 1px solid #E1E1E1;
    padding: 0.3rem 0 0.3rem 0;
  }

  .send-user-info li:first-child {
    border-top: none;
  }

  .send-user-info img {
    width: 22px;
    height: auto;
  }
  .fixed-height{
    line-height: 0.5rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
</style>

