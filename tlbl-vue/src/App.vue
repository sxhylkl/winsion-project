<template>
    <div id="app" class="page">
        <router-view></router-view>
    </div>
</template>

<script>
  export default{
    created(){
      //初始化清空存储数据
      localStorage.removeItem('_TIE_LU_BAN_LV_')
    }
  }
</script>

<style>
    body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td, header, footer, section, span, a {
        margin: 0;
        padding: 0;
    }

    html, body {
        width: 100%;
        height: 100%;
    }

    body {
        color: #323232;
        font-size: 16px;
        font-family: "Helvetica", "Arial", sans-serif;
    }

    ul li {
        list-style: none;
    }

    img {
        border: none;
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    button, p {
        moz-user-select: -moz-none;
        -moz-user-select: none;
        -o-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    button, input, label, div，textarea {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        outline: none;
    }

    footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 1.2rem;
      line-height: 1.2rem;
      padding: 0 0.1rem;
      border-top: 1px solid #ccc;
      background-color: #f1f1f1;
    }
    .el-message-box{
      width: 85%;
    }
    a {
        text-decoration: none;
        color: #323232;
    }

    .clearfix:after {
        content: "";
        height: 0;
        font-size: 0;
        visibility: hidden;
        display: block;
        clear: both;
    }

    .clearfix {
        zoom: 1;
    }

    .fl {
        float: left;
    }

    .fr {
        float: right;
    }

    .page-bg, .page {
        height: 100%;
        position: relative;
        overflow: auto;
        overflow-x: hidden;
        background-color: #e4e5e7;
    }

    .page-bg {
      /*background: url("../static/images/background.png") no-repeat;*/
      background-size: 100% 100%;
    }

    .page button, .page-bg button {
        color: #fff;
        border: none;
        -webkit-border-radius: 6px;
        -moz-border-radius: 6px;
        border-radius: 6px;
        background-color: #306ab4;
    }

    .page button a, .page-bg button a {
        color: #fff;
    }

    .overflow-container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 1.22rem;
        left: 0;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }

    .tnlist-container {
        height: 100%;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }

    .tnlist-container .tnlist:first-child {
        margin-top: 0.1rem;
    }

    .judge-container-box {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 1.2rem;
        left: 0;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
    }

    .margin {
        margin-top: 1rem;
    }

    .line-through {
        text-decoration: line-through;
        color: #cccccc;
    }

    .position-relative {
        position: relative;
    }
</style>
