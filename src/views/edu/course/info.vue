<template>
  <div class="app-container">

      <h2 style="text-align: center;">添加新课程</h2>

      <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
        <el-step title="填写课程基本信息"/>
        <el-step title="完善课程详情并上传视频"/>
        <el-step title="发布课程"/>
      </el-steps>
<!-- 腾讯ui测试 -->
	  <t-steps :defaultCurrent="1" align-center style="margin-bottom: 40px;">
	        <t-step-item title="填写课程基本信息"></t-step-item>
	        <t-step-item title="创建课程大纲"></t-step-item>
	        <t-step-item title="发布课程"></t-step-item>
	  </t-steps>
<!-- 腾讯ui测试 -->
      <el-form label-width="120px">

        <el-form-item label="课程标题">
          <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
        </el-form-item>

        <!-- 所属分类：级联下拉列表 -->
        <!-- 一级分类 -->
        <el-form-item label="课程类别">
          <el-select
            @change="subjectLevelOneChanged"
            v-model="courseInfo.subjectParentId"
            placeholder="一级分类">
            <el-option
              v-for="subject in subjectOneList"
              :key="subject.id"
              :label="subject.title"
              :value="subject.id"/>
          </el-select>
        <!-- 二级分类 -->
          <el-select
            v-model="courseInfo.subjectId"
            placeholder="二级分类">
            <el-option
              v-for="subject in subjectTwoList"
              :key="subject.id"
              :label="subject.title"
              :value="subject.id"/>
          </el-select>
        </el-form-item>

        <!-- 课程讲师 -->
        <el-form-item label="课程讲师">
          <el-select
            v-model="courseInfo.teacherId"
            placeholder="请选择">
            <el-option
              v-for="teacher in teacherList"
              :key="teacher.id"
              :label="teacher.name"
              :value="teacher.id"/>
          </el-select>
        </el-form-item>

        <el-form-item label="总课时">
          <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
        </el-form-item>

        <!-- 课程简介-->
        <el-form-item label="课程简介">
            <tinymce :height="300" v-model="courseInfo.description"/>
        </el-form-item>

        <!-- 课程封面-->
        <el-form-item label="课程封面">

          <el-upload
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :action="BASE_API+'/eduoss/fileoss'"
            class="avatar-uploader">
            <img style="width: 400px;height: auto;" :src="courseInfo.cover">
          </el-upload>

        </el-form-item>

        <el-form-item label="课程价格">
          <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
        </el-form-item>

        <el-form-item>
          <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpadte">保存并下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import course from '@/api/edu/course.js'
import subject from '@/api/edu/subject.js'
import Tinymce from '@/components/Tinymce'
const defaultForm = {
  title: '',
  subjectId: '',
  subjectParentId:'',
  teacherId: '',
  lessonNum: 0,
  description: '',
  cover: process.env.OSS_PATH + '/img/zs1.png',
  price: 0,
}

export default{
  components:{
    Tinymce,
  },
  data() {
    return{
      courseId:'',
      saveBtnDisabled:false,
      courseInfo:defaultForm,
      teacherList:[],
      subjectOneList:[],
      subjectTwoList:[],
      BASE_API: process.env.BASE_API // 接口API地址
    }
  },
  created() {
    //获取路由中的id值
    if(this.$route.params&&this.$route.params.id){
      this.courseId = this.$route.params.id
      console.log( this.courseId)
      this.getInfo()
    }else{
    //初始化所有讲师
    this.getListTeacher()
    //初始化所有一级分类
    this.getSubjectTree()
    this.courseInfo={...defaultForm}
    }
  },
  watch:{

  },
  methods:{
    //根据课程id查询信息
    getInfo(){
      course.getCourseInfoId(this.courseId)
        .then(response=>{
          //获取课程基本信息给courseInfo，包含1级 2级
          this.courseInfo=response.data.courseInfoVo
          //查询所有分类,包含1级 2级
          subject.getSubjectTree()
            .then(response=>{
              //获取一级分类
              this.subjectOneList = response.data.list
              //比较 取出对应二级分类
              // console.log(this.subjectOneList.length)
              for (let i = 0; i < this.subjectOneList.length; i++) {
                  if (this.subjectOneList[i].id === this.courseInfo.subjectParentId) {
                      this.subjectTwoList = this.subjectOneList[i].children
                      return false
                  }
              }
            })
            //初始化所有讲师
            this.getListTeacher()
        })
    },
    //上传封面成功调用
    handleAvatarSuccess(res,file){
      console.log(res)// 上传响应
      console.log(URL.createObjectURL(file.raw))// base64编码
      this.courseInfo.cover = res.data.url
    },
    //上传文件前调用
    beforeAvatarUpload(file){
      const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
    },
    subjectLevelOneChanged(value) {
        for (let i = 0; i < this.subjectOneList.length; i++) {
            if (this.subjectOneList[i].id === value) {
                this.subjectTwoList = this.subjectOneList[i].children
                this.courseInfo.subjectId = this.subjectTwoList[0].title
                return
            }
        }
    },
    //查询所有一级分类
    getSubjectTree(){
      subject.getSubjectTree()
        .then(response=>{
          this.subjectOneList=response.data.list
        })
    },
    //查询所有讲师
    getListTeacher(){
      course.getListTeacher()
      .then(response=>{
        this.teacherList=response.data.items
      })
    },
    //添加课程
    addCourse(){
      course.addCourseInfo(this.courseInfo)
      .then(response=>{
        //提示
        this.$message({
          type:'success',
          message: "成功"
        });
        //跳转到第二步
        this.$router.push({path:'/edu/course/chapter/'+response.data.courseId})
      })
    },
    //修改课程
    updateCourse(){
      course.updateCourseInfo(this.courseInfo).then(response=>{
        this.$message({
              type: 'success',
              message: '修改成功!'
            })
            return response// 将响应结果传递给then
      }).then(response => {
        console.log( this.courseId)
        this.$router.push({ path: '/course/chapter/' + response.data.courseId })
      }).catch((response) => {
        // console.log(response)
        this.$message({
            type: 'error',
            message: '保存失败'
        })
      })
    },
    //判断添加还是修改
    saveOrUpadte(){
      if(this.courseInfo.id){
        this.updateCourse()
        return
      }
      this.addCourse()
    },

  }

}

</script>

<style scoped>
.tinymce-container {
  line-height: 29px;
}
</style>
