<template>
  <div id="record-pie">
    <el-row>
      <el-col :span="8">
        <div class="record-pie-item">
          <div class="record-pie-item-tip">
            <p>问题状态分布</p>
          </div>
          <div class="record-pie-item-graph" id="record-pie-item-graph-1"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="record-pie-item">
          <div class="record-pie-item-tip">
            <p>网格状况分布</p>
          </div>
          <div class="record-pie-item-graph" id="record-pie-item-graph-2"></div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="record-pie-item">
          <div class="record-pie-item-tip">
            <p>问题大类分布</p>
          </div>
          <div class="record-pie-item-graph" id="record-pie-item-graph-3"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default{
    props:['pieData'],
    mounted(){
      this.drawPie(document.getElementById('record-pie-item-graph-1'),this.pieData.pieData1.data,this.pieData.pieData1.color)
      this.drawPie(document.getElementById('record-pie-item-graph-2'),this.pieData.pieData2.data)
      this.drawPie(document.getElementById('record-pie-item-graph-3'),this.pieData.pieData3.data)
    },
    methods:{
      drawPie(obj, data, color){
        var myChart = echarts.init(obj);
        color = color ? color : ['#fc8658', '#4a87b6', '#4ab6ab', '#4a4fb6', '#b64d4a', '#1e717b', '#1e4a7b', '#1e7b71']

        var option = {
          tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: '10%',
            top: '30%',
            data: data.map(function (item) {
              return item.name
            }),
            textStyle:{
              color:'#d5d5d5'
            }
          },
          color: color,
          series: [
            {
              name: '数据',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              label: {
                normal: {
                  show: false,
                  position: 'center'
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
            }
          ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    },
    watch:{
      pieData(val,oldVal){
        this.drawPie(document.getElementById('record-pie-item-graph-1'),val.pieData1.data,this.pieData.pieData1.color)
        this.drawPie(document.getElementById('record-pie-item-graph-2'),val.pieData2.data)
        this.drawPie(document.getElementById('record-pie-item-graph-3'),val.pieData3.data)
      }
    }
  }
</script>

<style scoped>
  .record-pie-item{
    position: relative;
    height: 400px;
    overflow: hidden;
  }
  .record-pie-item-tip{
    position: absolute;
    left: -10px;
    top: 60px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #d5d5d5;
    font-size: 16px;
  }
  .record-pie-item-graph{
    position: absolute;
    left: 50px;
    top: -50px;
    width: 500px;
    height: 500px;
  }
</style>
