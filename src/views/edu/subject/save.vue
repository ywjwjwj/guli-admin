<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download" />
          <a :href="OSS_PATH + '/excel/write.xlsx'">点击下载模版</a>
        </el-tag>

      </el-form-item>


      <el-form-item label="选择Excel">
              <el-upload
                ref="upload"
                :auto-upload="false"
                :on-change="onChange"
                :on-success="fileUploadSuccess"
                :on-error="fileUploadError"
                :disabled="importBtnDisabled"
                :limit="1"
                :on-exceed='limitCheck'
                :action="BASE_API+'/subject/addSubject'"
                name="file"
                accept=".xlsx,.xls">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button
                  :loading="loading"
                  style="margin-left: 10px;"
                  size="small"
                  type="success"
                  @click="submitUpload">{{ fileUploadBtnText }}</el-button>
              </el-upload>
            </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        BASE_API: process.env.BASE_API, // 接口API地址
        OSS_PATH: process.env.OSS_PATH, // 阿里云OSS地址
        fileUploadBtnText: '上传到服务器', // 上传按钮文本
        importBtnDisabled: false, // 按钮是否禁用,
        loading: false,
        minFile:false //没有选择文件，禁止上传
      }
    },
    created() {

    },
    methods: {
      // 文件上传前的校验 —— 常见的校验有：校验文件类型，文件大小
      onChange(file , fileList) {
          // 允许上传的文件格式列表
          let acceptList = ["xlsx", "xls"]
          // 根据文件名获取文件的后缀名
          let fileType = file.name.split('.').pop().toLowerCase()
          // 判断文件格式是否符合要求
          if (acceptList.indexOf(fileType) === -1) {
              this.$message.error('只能上传 xlsx/xls 格式的文件 !');
              this.minFile=false
              return false
          }
          this.minFile=true
      },
      // 选择的文件超出限制的文件总数量时触发
      limitCheck() {
          this.$message.warning('每次只能上传一个文件')
      },
      submitUpload() {
        if(!this.minFile){
          this.$message({
            type: 'error',
            message: '请重新选择文件后再上传'
          })
          return false
        }
        this.fileUploadBtnText = '正在上传'
        this.importBtnDisabled = true
        this.loading = true
        // 表单提交
        // js写法: document.getElementById("upload").submit()
        // vue写法
        this.$refs.upload.submit()
      },

      fileUploadSuccess(response) {
        if (response.success === true) {
          //提示信息
          this.fileUploadBtnText = '上传到服务器'
          this.loading = false
          this.$message({
            type: 'success',
            message: '添加课程信息'+response.message
          })
          this.$router.push({path:'/subject/list'})
        }
      },
      fileUploadError(response) {
          this.fileUploadBtnText = '上传到服务器'
          this.loading = false
          this.$message({
            type: 'error',
            message: '添加失败'
          })
      },


    },

  }
</script>

<style>
</style>
