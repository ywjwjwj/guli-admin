<template>
  <dv-border-box-8 class="dvbox8">
    <div class="chart-container">
      <div class="water-level-chart-title">累计收入情况</div>
      <dv-water-level-pond :config="config" style="width:200px;height:200px" />
    </div>
  </dv-border-box-8>
</template>

<script>
  import orderApi from '../../api/order/order.js'
  export default {
    name: 'WaterLevelChart',
    data() {
      return {
        config: {
          data: [55],
          shape: 'round',
          waveHeight: 9,
          waveNum: 2,
          formatter: '{value}元',
          colors: ['#aaffff','#00ffff','#00aaff']
        }

      }
    },
    methods: {
      createData() {
        orderApi.getSumMoney().then(res => {
          this.config.data = res.data.totalFee
          this.config.data.push(9)
          this.config.data.push(55)
          this.config.data.push(56)
          this.config = {...this.config}

        })
        console.log(this.cards)
      }
    },
    mounted() {
      const { createData } = this
      createData()
      // setInterval(this.createData, 50000)
    }
  }
</script>

<style lang="less">
  .dvbox8{
    width: 20%;
  }

  #water-level-chart {
    width: 100%;
    box-sizing: border-box;
    margin-left: 20px;
    background-color: rgba(204, 27, 27, 0.5) !important;
    border-top: 2px solid rgba(209, 87, 87, 0.5) !important;
    display: flex;
    flex-direction: column;

    .water-level-chart-title {
      font-weight: bold;
      height: 50px;
      display: flex;
      align-items: center;
      font-size: 20px;
      justify-content: center;
    }

    .water-level-chart-details {
      height: 15%;
      display: flex;
      justify-content: center;
      font-size: 17px;
      align-items: flex-end;

      span {
        font-size: 35px;
        font-weight: bold;
        color: #58a1ff;
        margin: 0 5px;
        margin-bottom: -5px;
      }
    }

    .chart-container {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 20%;
      margin: 6%;
    }

    .dv-water-pond-level {
      max-width: 90%;
      width: 200px;
      height: 200px;
      border: 10px solid #19c3eb;
      border-radius: 50%;

      ellipse {
        stroke: transparent !important;
        width: 200px !important;
        height: 200px !important;
      }

      text {
        font-size: 10px;
      }
    }
  }

  .water-level-chart-title {
    font-weight: bold;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 20px;
    justify-content: center;
  }

  .chart-container {
    flex-direction: column;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    // width: 20%;
    // margin-left: 6%;
  }
</style>
