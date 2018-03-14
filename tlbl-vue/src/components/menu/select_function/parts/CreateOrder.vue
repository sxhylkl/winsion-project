<template>
  <div class="send-container" style="margin-top: 0.1rem">
    <div>
      <span class="font-icon">{{serviceType.fontIcon}}</span>
      <span class="service-type">{{serviceType.service}}</span>
    </div>
    <div>{{serviceType.message}}</div>
    <div>
      <el-button class="create-order-btn" @click="createOrder">创建订单&gt&gt</el-button>
    </div>
  </div>
</template>
<script>
  import * as types from '../../../../store/mutation-types'
  export default{
    props: ['type'],
    computed: {
      serviceType: function () {
        if (this.type == "pickup") {
          return {fontIcon: "送", service: "送站服务", message: "要去火车站，希望从车站周边送我上火车！"}
        } else if (this.type == "take") {
          return {fontIcon: "接", service: "接站服务", message: "下火车时，希望从车厢接我出火车站！"}
        }
      }
    },
    methods: {
      createOrder(){
        this.$store.dispatch(types.MENU__SELECT_FUNCTION__CREATE_ORDER,{type:this.type,_this:this})
      }
    }
  }
</script>
<style>
  .send-container {
    padding: 0.26rem 0.3rem;
    background-color: #fff;
    margin: 0 0.1rem 0.1rem;
  }

  .service-type {
    font-size: 0.28rem;
    color: #306ab4;
  }

  .font-icon {
    font-size: 0.2rem;
    width: 0.32rem;
    height: 0.32rem;
    line-height: 0.32rem;
    text-align: center;
    color: #306ab4;
    border: 1px solid #306ab4;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    float: left;
    margin-right: 0.1rem;
    padding-top: 0.03rem;
  }

</style>
