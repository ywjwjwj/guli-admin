<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name" />
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0" />
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career" />
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea" />
      </el-form-item>

      <!-- 讲师头像：TODO -->
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">
        <el-upload class="avatar-uploader" :action="BASE_API+'/eduoss/fileoss'" :show-file-list="false"
          :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img v-if="teacher.avatar" :src="teacher.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  import teacherApi from '../../../api/edu/teacher.js'

  const defaultForm = {
    name: '',
    sort: 0,
    level: 1,
    career: '',
    intro: '',
    avatar: 'https://ywj-oss.oss-cn-shenzhen.aliyuncs.com/2022/04/07/12b31df8a12f45829b11044200567b0d-XOUVI]WKXX2Y6FZ8XSBW%7BUI.jpg', //头像
  }

  export default {
    data() {
      return {
        teacher: defaultForm,
        saveBtnDisabled: false, // 保存按钮是否禁用
        imagecropperShow: false, // 上传组件是否展示
        imagecropperKey: 0, // 上传组件key值
        BASE_API: process.env.BASE_API, // 获取dev.env.js中的地址
        dialogVisible: false
      }
    },
    //为了解决点了修改又点击添加  数据还在
    //我们可以在watch中监听路由的变化，当路由变化时，重新调用created中的内容
    watch: {
      $route(to, form) {
        //路由变化方式
        this.init()
      }
    },
    created() {
      this.init()
    },

    methods: {
      handleAvatarSuccess(res, file) {
        //上传头像成功
        this.teacher.avatar = res.data.url;
        console.log(res)
      },
      beforeAvatarUpload(file) {
        //上传头像前校验
      },


      init() {
        // list中点击修改，数据回显
        // console.log(this.teacher.avatar)
        //如果路径有id值 查询添加数据到表单
        if (this.$route.params && this.$route.params.id) {
          const id = this.$route.params.id
          this.fetchDataById(id)
        } else {
          //没有id 清空表单  拓展对象符=》拷贝对象
          this.teacher = {...defaultForm}
        }
      },
      saveOrUpdate() {
        this.saveBtnDisabled = true
        //判断修改还是添加
        //有id修改，没有保存
        if (!this.teacher.id) {
          this.saveData()
        } else {
          this.updateData()
        }
      },
      // 保存
      saveData() {
        teacherApi.addTeacher(this.teacher).then(response => {
            return this.$message({
              type: 'success',
              message: '添加成功!'
            })
          })
          .then(response => {
            this.$router.push({
              path: '/teacher/list'
            })
          })
          .catch((response) => {
            // console.log(response)
            this.$message({
              type: 'error',
              message: '添加失败'
            })
          })
      },

      // 根据id查询记录
      fetchDataById(id) {
        teacherApi.getById(id).then(response => {
          this.teacher = response.data.edu_teacher
        }).catch((response) => {
          this.$message({
            type: 'error',
            message: '获取数据失败'
          })
        })
      },
      // 根据id更新记录
      updateData() {
        this.saveBtnDisabled = true
        teacherApi.updateTeacher(this.teacher).then(response => {
            return this.$message({
              type: 'success',
              message: '修改成功!'
            })
          })
          .then(response => {
            this.$router.push({
              path: '/teacher/list'
            })
          })
          .catch((response) => {
            this.$message({
              type: 'error',
              message: '修改失败'
            })
          })
      },



    }
  }
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
