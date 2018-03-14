<template>
  <div id="newOrder">
    <router-view></router-view>
  </div>
</template>

<script>

</script>
<style>
  .el-col input{
    height: 0.6rem !important;
  }

  .go-map a {
    display: inline-block;
    width: 100%;
    text-align: right;
  }

  .train-info a {
    color: #236db4;
    font-size: 12px;
  }

  .line-height {
    line-height: 0.58rem !important;
  }

  .order-base-info, .base-info, .train-info, .remarks, .end-point, .luggage-numbers, .over-weight-luggage, .task-hour, .remark, .total-price, .attach, .pay-container, .in-carriage {
    margin: 0 0.1rem 0.1rem;
    background-color: #fff;
    padding: 0.3rem;
  }

  .base-info, .train-info, .remarks {
    color: #989898;
  }

  .base-info > div {
    margin-bottom: 0.2rem;
  }

  .train-info > div:nth-of-type(1), .remarks > div:nth-of-type(1) {
    margin-bottom: 0.2rem;
  }

  .operation-container > div:nth-of-type(1), .in-carriage > div:nth-of-type(1) {
    padding-bottom: 0.3rem;
    border-bottom: 1px dashed #a6a6a6;
    margin-bottom: 0.3rem;
  }

  .instruction span {
    float: right;
    color: #236db4;
  }

  .operation-container > div > div {
    float: left;
  }

  .operation-container > div > div:nth-of-type(1) {
    width: 0.9rem;
    height: 0.9rem;
    margin-right: 0.2rem;
  }

  .operation-container > div > div:nth-of-type(1) img {
    width: 100%;
  }

  .operation-container > div > div:nth-of-type(2) {
    line-height: 0.48rem;
  }

  .operation-container > div > div:nth-of-type(3) {
    float: right;
    margin: 0.15rem 0;
  }

  .number-disabled span, .number-disabled input {
    background-color: #f6f6f6;
    color: #989898;
    border-color: #d2d2d2;
  }

  .next-btn, .check-btn {
    padding: 0.2rem 0.1rem 0.3rem;
  }

  .next-btn button {
    padding: 0.24rem 0;
    width: 100%;
    font-size: 0.3rem;
  }

  .order-message {
    padding: 0.3rem 0 0.2rem;
    margin: 0 0.1rem;
    font-size: 0.28rem;
  }

  .actual-price {
    color: #999999;
    text-decoration: line-through;
  }

  .check-btn button {
    float: left;
    width: 48%;
    box-sizing: border-box;
    font-size: 0.32rem;
  }

  .check-btn button:nth-of-type(1), .completed button:nth-of-type(2) {
    margin-right: 4%;
    background-color: #fff;
    color: #323232;
  }

  #newOrder{
    height: 100%;
    overflow: hidden;
  }
  #newOrder .el-button + .el-button {
    margin-left: 0;
  }

  #newOrder .tnlist-container {
    overflow-x: hidden;
  }

  .add-phone {
    width: 21px;
    height: auto;
    vertical-align: middle;
    margin-top: -0.06rem;
  }

  .usual {
    color: #306ab4;
  }
</style>
