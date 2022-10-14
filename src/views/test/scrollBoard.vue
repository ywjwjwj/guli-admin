<template>
  <div id="scroll-board">
    <dv-scroll-board :config="config"  ref="scrollBoard"/>
  </div>
</template>

<script>
  import staApi from '../../api/sta/sta.js'
  export default {
    name: 'ScrollBoard',
    data() {
      return {
        config: {
          header: ['时间', '名称', '详细信息'],
          data: [],
          index: true,
          columnWidth: [50, 270, 230],
          align: ['center'],
          rowNum: 7,
          headerBGC: '#1981f6',
          headerHeight: 45,
          oddRowBGC: 'rgba(0, 44, 81, 0.8)',
          evenRowBGC: 'rgba(10, 29, 50, 0.8)'
        }
      }
    },
    methods: {
      createData() {
        staApi.getSysInfo().then(res => {
          this.config.data = res.data.sysInfo
          this.config = { ...this.config }
          console.log(this.config.data)
        })
      },
      doUpdate(){
        // this.$refs['scrollBoard'].updateRows(rows, index)
      }
    },
    mounted() {
      const { createData } = this
      createData()
      // setInterval(this.createData, 5000000)
    }
  }
</script>

<style lang="less">
  #scroll-board {
    width: 75%;
    box-sizing: border-box;
    margin-left: 20px;
    height: 100%;
    overflow: hidden;
  }
</style>
