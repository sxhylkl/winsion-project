<template>
    <div class="wrapper">
        <div class="top">
            <text class="font-size-middle-s">123</text>
        </div>
        <div class="bottom">
            <div class="bottom-preferential">
                <div class="bottom-preferential-left">
                    <text class="preferential font-size-small">我的优惠券</text>
                    <text class="preferential-desc font-size-small">超值优惠券，多用多送，尽享出行</text>
                </div>
                <div class="bottom-preferential-right">
                    <image class="preferential-image" :src="privilegeUrl"></image>
                </div>
            </div>
            <div class="bottom-confirm">
                <wxc-button :text="text" :btn-style="btnStyle"></wxc-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { WxcButton } from 'weex-ui'
    export default {
        data: () => ({
            text: '我的订单列表',
            btnStyle: {
                backgroundColor: '#306ab4'
            },
            privilegeUrl: 'http://172.16.6.101:3000/image/privilege.png'
        }),
        components: { WxcButton },
        methods: {
            wxcButtonClicked (e) {
                console.log(e)
            }
        }
    }
</script>

<style>
    /* 共同遵守的样式 */
    .font-size-small{
        font-size: 32px;
    }
    /* -------------- */
    .wrapper{
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }
    .bottom{
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
    }
    .bottom-preferential{
        padding-left: 25px;
        padding-right: 25px;
        padding-top: 15px;
        padding-bottom: 15px;
        margin-bottom: 100px;
        flex-direction: row;
        justify-content: space-between;
        background-color: #f1f1f1;
    }
    .bottom-preferential-left{
        height: 140px;
        justify-content: space-around;
    }
    .preferential{
        color: #13BCF2;
    }
    .preferential-image{
        width: 140px;
        height: 140px;
    }
    .bottom-confirm{
        align-items: center;
        padding-top: 15px;
        padding-bottom: 15px;
        background-color: #f1f1f1;
    }
</style>