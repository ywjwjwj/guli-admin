<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
        <el-step title="完善课程详情并上传视频"/>
        <el-step title="发布课程"/>
    </el-steps>
<!-- 腾讯ui测试 -->
	  <t-steps :defaultCurrent="2" align-center style="margin-bottom: 40px;" >
	        <t-step-item title="填写课程基本信息"></t-step-item>
	        <t-step-item title="创建课程大纲"></t-step-item>
	        <t-step-item title="发布课程"></t-step-item>
	  </t-steps>
<!-- 腾讯ui测试 -->
    <el-button type="text" @click="openChapterDialog">添加章节</el-button>
    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
        <el-form :model="chapter" label-width="120px">
            <el-form-item label="章节标题">
                <el-input v-model="chapter.title"/>
            </el-form-item>
            <el-form-item label="章节排序">
                <el-input-number v-model="chapter.sort" :min="0" controls-position="right"/>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
        </div>
    </el-dialog>

    <!-- 章节 -->
    <ul class="chanpterList">
        <li
            v-for="chapter in chapterVideoList"
            :key="chapter.id">
            <p>
                {{ chapter.title }}

                <span class="acts">
                    <el-button type="text" @click="openVideo(chapter.id)">添加小节</el-button>
                    <el-button style="" type="text" @click="openEditChapter(chapter.id)">编辑</el-button>
                    <el-button type="text" @click="deleteChapter(chapter.id)">删除</el-button>
                </span>
            </p>

            <!-- 视频 -->
            <ul class="chanpterList videoList">
                <li
                    v-for="video in chapter.children"
                    :key="video.id">
                    <p>{{ video.title }}
                        <span class="acts">
                            <el-button type="text" @click="editVideo(video.id)">编辑</el-button>
                            <el-button type="text" @click="deleteVideo(video.id)">删除</el-button>
                        </span>
                    </p>
                </li>
            </ul>
        </li>
    </ul>

    <el-form label-width="120px">

      <el-form-item>
        <el-button @click="previous">上一步</el-button>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
      </el-form-item>
    </el-form>


    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title"/>
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right"/>
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
            <el-upload
                   :on-success="handleVodUploadSuccess"
                   :on-remove="handleVodRemove"
                   :before-remove="beforeVodRemove"
                   :on-exceed="handleUploadExceed"
                   :on-progress="updateLoading"
                   :file-list="fileList"
                   :action="BASE_API+'/vod/uploadVideo'"
                   :limit="1"
                   class="upload-demo">
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
                <div slot="content">最大支持1G，<br>
                    支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                    GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                    MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                    SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
                <i class="el-icon-question"/>
            </el-tooltip>
            </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button :disabled="saveVideoBtnDisabled" type="primary" @click="saveOrUpdateVideo">{{updateLoadingMsg}}</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import chapter from '@/api/edu/chapter.js'
import course from '@/api/edu/course.js'
import video from '@/api/edu/video.js'
import vod from '@/api/edu/vod.js'

const defaultChapter={
  title:'',
  sort: 0
}
const defaultVideo={// 课时对象
        title: '',
        sort: 0,
        isFree: 0,
        progress: 0,
        videoSourceId:'',
        videoOriginalName:''
      }

export default {
  data() {
    return {
      saveBtnDisabled: false ,// 保存按钮是否禁用
      courseId:'',//课程id
      chapterVideoList:[],
      dialogChapterFormVisible:false ,//章节弹窗
      chapter:defaultChapter ,//封装章节数据
      saveVideoBtnDisabled: false, // 课时按钮是否禁用
      dialogVideoFormVisible: false, // 是否显示课时表单
      chapterId: '', // 课时所在的章节id
      video: defaultVideo,
      fileList:[], //上传的视频文件列表
      BASE_API:process.env.BASE_API ,//上传视频接口地址
      updateLoadingMsg:"确 定"
    }
  },

  created() {
    //获取路由中id值
    if(this.$route.params && this.$route.params.id){
      this.courseId=this.$route.params.id
      console.log( this.courseId)
      //根据课程id获取章节和小节
      this.getChapterVideo()
    }
  },

  methods: {
    //点击x调用的方法
    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    //点击x中确定删除时的方法
    handleVodRemove(file, fileList) {
      console.log(file)
      vod.removeById(this.video.videoSourceId).then(response=>{
        this.$message({
          type: 'success',
          message: response.message
        })
        //清空文件列表
        this.fileList=[]
        //删除视频要清楚视频id和名称
        this.video.videoSourceId=""
        this.video.videoOriginalName=""
      })
    },
    //文件上传的时候禁止提交
    updateLoading(event, file, fileList){
      this.saveVideoBtnDisabled=true
      this.updateLoadingMsg="正在上传..."
    },
	  //上传视频成功调用的方法
	  handleVodUploadSuccess(response,file,fileList){
      this.video.videoSourceId=response.data.videoId
      this.video.videoOriginalName=file.name
      this.saveVideoBtnDisabled=false
      this.updateLoadingMsg="确 定"
    },
    //视图上传多于一个视频
    handleUploadExceed(files, fileList) {
      this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    },
    // -------------------------小节操作--------------------------------

    //弹窗确定，是添加或者修改小节
    saveOrUpdateVideo(){
      //如果没有小节id则添加
      if(this.video.id){
        //有小节id 修改
        this.updateVideo()
        return
      }
      this.addVideo()
    },

    //修改小节 弹窗
    editVideo(videoId){
      this.dialogVideoFormVisible=true
      //获取数据并回显
      this.getVideo(videoId)
    },
    //添加小节 弹窗
    openVideo(chapterId){
      this.dialogVideoFormVisible=true
      //清空数据
      this.video={...defaultVideo}
      //设置章节id
      this.video.chapterId=chapterId
      this.fileList=[]
    },
    //添加小节方法
    addVideo(){
      //设置课程id
      this.video.courseId=this.courseId
      video.addVideo(this.video).then(response => {
        this.dialogVideoFormVisible=false
        this.$message({
          type: 'success',
          message: '添加小节成功成功!'
        })
        this.getChapterVideo()
      })
      .catch(response => {
        this.$message({
          type: 'success',
          message: response
        })
      })
    },

    //删除小节
    deleteVideo(videoId){
      this.$confirm('此操作将永久删除该小节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return video.deleteVideo(videoId)
        }).then(() => {
          this.getChapterVideo()// 刷新列表
          this.$message({
            type: 'success',
            message: '删除小节成功!'
          })
        }).catch((response) => { // 失败
          if (response === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除小节'
            })
          }
        })
    },

    //根据小节id查找小节信息
    getVideo(videoId){
      video.getVideoInfoById(videoId)
        .then(response=>{
          this.video = response.data.video
          if(this.video.videoOriginalName.length>0){
            this.fileList = [{'name': this.video.videoOriginalName}]
          }else{
            this.fileList = []
          }
        })
    },
    //修改小节 弹窗
    updateVideo(){
      //设置章节id
      // this.video.chapterId=chapterId
      //设置课程id
      // this.video.courseId=this.courseId

      video.updateVideo(this.video).then(response => {
        this.dialogVideoFormVisible=false
        this.$message({
          type: 'success',
          message: '修改小节成功!'
        })
        this.getChapterVideo()
      })
    },

    // -------------------------章节操作--------------------------------
    //修改章节弹窗数据回显
    openEditChapter(chapterId){
      this.dialogChapterFormVisible = true
      chapter.getChapter(chapterId)
        .then(response=>{
          this.chapter=response.data.chapter
        })
    },
    //弹出弹窗页面
    openChapterDialog(){
      this.dialogChapterFormVisible=true
      this.chapter={...defaultChapter}
    },
    //添加章节
    addChapter(){
      //设置课程id给chapter对象
      this.chapter.courseId=this.courseId
      chapter.addChapter(this.chapter)
        .then(response=>{
          //1 关闭弹窗  2 提示弹窗  3 刷新页面
          this.dialogChapterFormVisible=false
          this.$message({
            type: 'success',
            message: '添加章节成功'
          })
          this.getChapterVideo()
        })
    },

    //修改章节的方法
    updateChapter(){
      chapter.updateChapter(this.chapter)
        .then(response=>{
          //1 关闭弹窗  2 提示弹窗  3 刷新页面
          this.dialogChapterFormVisible=false
          this.$message({
            type: 'success',
            message: '修改章节成功'
          })
          this.fileList=[]
          this.getChapterVideo()
        })
    },

    //添加或者修改章节
    saveOrUpdate(){
      if(!this.chapter.id){
        this.addChapter()
        return
      }
      this.updateChapter()
    },
    //删除章节
    deleteChapter(chapterId){
      this.$confirm('此操作将永久删除该小节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return chapter.deleteChapter(chapterId)
        }).then(() => {
          this.getChapterVideo()// 刷新列表
          this.$message({
            type: 'success',
            message: '删除章节成功!'
          })
        }).catch((response) => { // 失败
          if (response === 'cancel') {
            this.$message({
              type: 'info',
              message: '已取消删除章节'
            })
          }
        })
    },

    //根据课程id获取章节和小节
    getChapterVideo(){
      chapter.getChapterVideo(this.courseId)
        .then(response=>{
          this.chapterVideoList = response.data.allChapterVideo
        })
    },


    previous() {
      console.log('previous')
      this.$router.push({ path: '/course/info/'+this.courseId })
    },

    next() {
      console.log('next')
      this.$router.push({ path: '/course/publish/'+this.courseId })
    }
  }
}
</script>

<style scoped>
.chanpterList{
    position: relative;
    list-style: none;
    margin: 0;
    padding: 0;
}
.chanpterList li{
  position: relative;
}
.chanpterList p{
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {
    position: relative;
    float: right;
    z-index: 999;
    font-size: 14px;
    /* border: 1px solid #DDD; */
}

.videoList{
  padding-left: 50px;
}
.videoList p{
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #DDD;
}

</style>
