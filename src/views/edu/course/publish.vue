<template>

  <div class="app-container">

      <h2 style="text-align: center;color: #0000FF">进行课程发布</h2>

      <el-steps :active="3" process-status="wait" align-center style="margin-bottom: 40px;">
        <el-step title="填写课程基本信息"/>
        <el-step title="完善课程详情并上传视频"/>
        <el-step title="发布课程"/>
      </el-steps>
<!-- 腾讯ui测试 -->
	  <t-steps :defaultCurrent="3">
	        <t-step-item title="填写课程基本信息"></t-step-item>
	        <t-step-item title="创建课程大纲"></t-step-item>
	        <t-step-item title="发布课程"></t-step-item>
	  </t-steps>
<!-- 腾讯ui测试 -->
      <div class="ccInfo">
        <img :src="coursePublish.cover">
        <div class="main">
          <h2>{{ coursePublish.title }}</h2>
          <p class="gray"><span>共{{ coursePublish.lessonNum }}课时</span></p>
          <p><span>所属分类：{{ coursePublish.subjectLevelOne }} — {{ coursePublish.subjectLevelTwo }}</span></p>
          <p>课程讲师：{{ coursePublish.teacherName }}</p>
          <h3 class="red">￥{{ coursePublish.price }}</h3>
        </div>
      </div>

      <div>
        <el-button @click="previous">返回修改</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布课程</el-button>
      </div>
    </div>
</template>

<script>
import course from '@/api/edu/course.js'

export default {
  data() {
    return {
      saveBtnDisabled: false ,// 保存按钮是否禁用
      courseId:'',
      coursePublish:{},

    }
  },
  components:{

  },
  created() {
    //获取路由课程id值
    if(this.$route.params && this.$route.params.id){
      this.courseId=this.$route.params.id
      this.getCoursePublishInfo()
    }
  },

  methods: {
    //根据课程id查询
    getCoursePublishInfo(){
      course.getCoursePublishInfo(this.courseId)
        .then(response=>{
          this.coursePublish=response.data.coursePublish
        })
    },

    previous() {
      console.log('previous')
      this.$router.push({ path: '/course/chapter/'+this.courseId })
    },
    //最终发布
    publish() {
      course.publishCourse(this.courseId)
        .then(res=>{
          this.$message({
            type:'success',
            message: '课程发布成功'
          })
          this.$router.push({ path: '/course/list' })
        })

    }
  }
}
</script>

<style scoped>
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}

.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}

.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}
</style>
