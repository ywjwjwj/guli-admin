<template>
  <div id="cards">
    <div
      class="card-item"
      v-for="(card, i) in cards"
      :key="card.title"
    >
      <div class="card-header">
        <div class="card-header-left">{{ card.title }}</div>
        <!-- <div class="card-header-right">{{ '0' + (i + 1) }}</div> -->
      </div>
      <dv-charts class="ring-charts" :option="card.ring" />
      <div class="card-footer">
        <div class="card-footer-item">
          <div class="footer-title">浏览数量</div>
          <div class="footer-detail">
            <dv-digital-flop :config="card.total" style="width:70%;height:35px;" />人
          </div>
        </div>
        <div class="card-footer-item">
          <div class="footer-title">销售数量</div>
          <div class="footer-detail">
            <dv-digital-flop :config="card.num" style="width:70%;height:35px;" />个
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import testApi from '../../api/test/test.js'
export default {
  name: 'Cards',
  data () {
    return {
      cards: []
    }
  },
  methods: {
    createData () {
      testApi.getCard().then(res=>{
        this.cards = res.data.data
      })
      console.log(this.cards)
    }
  },
  mounted () {
    const { createData } = this
    createData()
    setInterval(this.createData, 50000)
  }
}
</script>

<style lang="less">
#cards {
  display: flex;
  justify-content: space-between;
  height: 45%;
  .card-item {
    background-color: rgba(6, 30, 93, 0.5);
    border-top: 2px solid rgba(1, 153, 209, .5);
    width: 19%;
    display: flex;
    flex-direction: column;
  }
  .card-header {
    display: flex;
    height: 20%;
    align-items: center;
    justify-content: space-between;
    .card-header-left {
      font-size: 18px;
      font-weight: bold;
      padding-left: 20px;
    }
    .card-header-right {
      padding-right: 20px;
      font-size: 40px;
      color: #03d3ec;
    }
  }
  .ring-charts {
    height: 55%;
  }
  .card-footer {
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .card-footer-item {
    padding: 5px 10px 0px 10px;
    box-sizing: border-box;
    width: 40%;
    background-color: rgba(6, 30, 93, 0.7);
    border-radius: 3px;
    .footer-title {
      font-size: 15px;
      margin-bottom: 5px;
    }
    .footer-detail {
      font-size: 20px;
      color: #1294fb;
      display: flex;
      font-size: 18px;
      align-items: center;
      .dv-digital-flop {
        margin-right: 5px;
      }
    }
  }
}
</style>
