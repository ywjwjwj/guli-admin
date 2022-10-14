<template>
  <div id="data-view">
    <div class="el-scrollbar__wrap_scrollBodyHidden">

      <!-- <top-header /> -->

      <div class="main-content">
        <digital-flop />

        <div class="block-left-right-content">
          <!-- <ranking-board /> -->

          <div class="block-top-bottom-content">
            <div class="block-top-content">
              <!-- <rose-chart /> -->

              <water-level-chart />

              <scroll-board />
            </div>
            <a class="outpage" @click="out">返回</a>
            <cards />
          </div>
        </div>
      </div>

    </div>

    <!-- </el-scrollbar> -->
    <!-- </dv-full-screen-container> -->
  </div>
</template>

<script>
  // import topHeader from './topHeader'
  import digitalFlop from './digitalFlop'
  // import rankingBoard from './rankingBoard'
  // import roseChart from './roseChart'
  import waterLevelChart from './waterLevelChart'
  import scrollBoard from './scrollBoard'
  import cards from './cards'
  export default {
    name: 'DataView',
    components: {
      // topHeader,
      digitalFlop,
      // rankingBoard,
      // roseChart,
      waterLevelChart,
      scrollBoard,
      cards
    },
    data() {
      return {
        clientHeight: 1080, //屏幕高度
      }
    },
    methods: {
      out() {
        this.$router.push({
          path: '/'
        })
      }
    },
    destroyed() { //vue3中为unmounted  vue2中销毁为destroyed
      clearInterval(this.clientHeightTime)
    },
    created() {
      this.clientHeightTime = setInterval(() => {
        this.clientHeight = document.documentElement.clientHeight - 50
      }, 500)
    }
  }
</script>

<style lang="less">
  .outpage {
    position: absolute;
    right: 0;
    top: 0;
    border: 2px solid #0000FF;

  }

  // .showdata:hover{
  //   opacity: 0;
  // }
  #data-view {
    width: 100%;
    height: 100%;
    background-color: #030409;
    color: #fff;


    #dv-full-screen-container {
      background-image: url(./img/bg.png);
      background-size: 100% 100%;
      box-shadow: 0 0 3px blue;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .block-left-right-content {
      flex: 1;
      display: flex;
      margin-top: 20px;
    }

    .block-top-bottom-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-left: 20px;
    }

    .block-top-content {
      height: 55%;
      display: flex;
      flex-grow: 0;
      box-sizing: border-box;
      padding-bottom: 20px;
    }
  }
</style>
<style>
  ::-webkit-scrollbar {
    width: 0 !important;
  }

  ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }

  .el-scrollbar__wrap_scrollBodyHidden {
    width: 100%;
    /* top: 50px; */
    height: calc(95vh);
    background-image: url(./img/bg.png);
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }
</style>
