<template>
    <div class="wrapper">
        <div class="bar">
            <minibar></minibar>
        </div>
        <div class="top">
            <div class="top-service" v-for="item in serviceData">
                <div class="title">
                    <text class="title-icon font-size-small-s">{{item.title}}</text>
                    <text class="title-icon-desc font-size-small-s">{{item.title}}站服务</text>
                </div>
                <div class="desc">
                    <text class="font-size-small">{{item.desc}}</text>
                </div>
                <div class="select">
                    <wxc-button :text="serviceText" :btn-style="serviceBtnStyle" @wxcButtonClicked="createOrder"></wxc-button>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="bottom-preferential">
                <div class="bottom-preferential-left">
                    <text class="preferential font-size-small">{{privilegeTitle}}</text>
                    <text class="preferential-desc font-size-small">{{privilegeDesc}}</text>
                </div>
                <div class="bottom-preferential-right">
                    <image class="preferential-image" :src="privilegeUrl"></image>
                </div>
            </div>
            <div class="bottom-confirm">
                <wxc-button :text="orderText" :btn-style="orderBtnStyle" @wxcButtonClicked="showDialogDate"></wxc-button>
            </div>
        </div>
        <picker ref="picker"></picker>
    </div>
</template>

<script>
    const modal = weex.requireModule('modal');
    import Minibar from '@/base/minibar'
    import Picker from '@/base/picker'
    import { WxcButton, WxcMinibar } from 'weex-ui';
    export default {
        data: () => ({
            serviceData: [
                {
                    title: '送',
                    desc: '要去火车站，希望从车站周边送我上火车！'
                },
                {
                    title: '接',
                    desc: '下火车时，希望从车厢接我出火车站！'
                },
            ],
            serviceText: '创建订单 >>',
            serviceBtnStyle: {
                backgroundColor: '#306ab4',
                width: '240px',
                height: '80px'
            },
            privilegeTitle: '我的优惠券',
            privilegeDesc: '超值优惠券，多用多送，尽享出行',
            privilegeUrl: 'http://172.16.6.101:3000/image/privilege.png',
            orderText: '我的订单列表',
            orderBtnStyle: {
                backgroundColor: '#306ab4'
            }
        }),
        components: { WxcButton, WxcMinibar, Minibar, Picker },
        methods: {
            createOrder () {
                this.$router.push('/selectTrain')
            },
            showDialogDate() {
                this.$refs.picker.show()
            }
        }
    }
</script>

<style>
    /* 共同遵守的样式 */
    .font-size-small-s{
        font-size: 28px;
    }
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
    .top-service{
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        padding-left: 20px;
        padding-right: 20px;
        background-color: #f1f1f1;
    }
    .title{
        flex-direction: row;
        align-items: center;
        height: 70px;
        border-bottom-width: 1px;
        border-bottom-style: dashed;
    }
    .title-icon{
        padding-right: 5px;
        padding-left: 5px;
        padding-top: 3px;
        padding-bottom: 3px;
        border-width: 1px;
        border-color: #306ab4;
        border-radius: 10px;
        color: #306ab4;
    }
    .title-icon-desc{
        margin-left: 10px;
        color: #306ab4;
    }
    .desc{
        margin-top: 30px;
        margin-bottom: 20px;
    }
    .select{
        margin-top: 20px;
        margin-bottom: 20px;
        align-items: center;
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
        margin-bottom: 30px;
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
    .date{
        position: absolute;
        left: 0;

    }
</style>