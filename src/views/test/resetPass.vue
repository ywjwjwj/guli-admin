<template>
  <div class="contain" ref="mainDiv">
    <!-- <dv-full-screen-container> -->
    <dv-border-box-8 :dur="6" class='box8' v-if='loading'>
      <dv-loading v-if='loading'>数据加载中...</br>
        <at-button @click="modal1=true">修改密码</at-button>
        <at-modal v-model="modal1" title="修改密码" cancelText='取消' okText='确定' @on-confirm="handleConfirm"
          @on-cancel="handleCancel">
          <at-input v-model="user.pass" type="password" placeholder="密码"></at-input>
        </at-modal>
      </dv-loading>

    </dv-border-box-8>

    <!-- </dv-full-screen-container> -->
  </div>
</template>

<script>
  import test from '@/api/test/test.js'

  export default {
    data() {
      return {
        loading: true,
        modal1: false,
        user: {
          id: '',
          pass: ''
        }
      }
    },
    methods: {
      handleConfirm() {
        this.user.id = 'test'
        this.$Message('点击了确定')
        test.resetPass(this.user.id, this.user.pass).then((data) => {
          this.$Message(`请求成功，返回值为 ${data.message}`)
        })
      },
      getDivHeight() {
        const screenheight = window.innerHeight
        this.$refs.mainDiv.style.height = screenheight-370+ 'px'
        // 704 为 头部组件高度 + 底部组件高度
      },
    },
    // 在 mounted 生命周期监听窗口变化并触发上文处理函数，修改高度
    mounted() {
      this.getDivHeight()
      window.addEventListener('resize', this.getDivHeight)
    },
    destroyed() {
      window.removeEventListener('resize', this.getDivHeight, false)
    },
  }
</script>
<style>
  .contain {
    display: flex;
    justify-content: space-between;
    height: 0;
    min-height: 370px;
  }

  .box8 {
    /* position: absolute; */
/*    top: 0;
    left: 0;
    right: 0;
    bottom: 0; */
   width: 80%;
    height: 100%;
    margin: 50px auto;
  }
</style>
