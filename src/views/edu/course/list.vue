<template>
  <div class="app-container">
    课程列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.name" placeholder="讲师名" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.state" clearable placeholder="课程状态">
          <el-option value="Draft" label="未发布" />
          <el-option value="Normal" label="已发布" />
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker v-model="courseQuery.begin" type="datetime" placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="courseQuery.end" type="datetime" placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getCourseListPage()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>


    <!-- 表格 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="数据加载中" border fit highlight-current-row>

      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="title" label="课程名称"  />

      <el-table-column label="发布状态" width="280">
        <template slot-scope="scope">
          {{ scope.row.status==="Draft"?'未发布':'已发布' }}
        </template>
      </el-table-column>

      <el-table-column prop="lessonNum" label="课时数" width="80" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column prop="viewCount" label="浏览数量" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程信息</el-button>
          </router-link>

          <router-link :to="'/course/chapter/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
          </router-link>

          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>

        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper" @current-change="getCourseListPage" />

  </div>
</template>

<script>
import course from '@/api/edu/course.js'
export default{
  data() {
    return {
      listLoading: true, // 是否显示loading信息
      list: null, // 查询后接口返回的数据
      page: 1, // 当前页
      limit: 5, // 每页记录
      total: 0, // 总记录数
      courseQuery: {}, // 对象

    }
  },
  created() {
    // 页面渲染前，一般调用methods定义的方法
    this.getCourseListPage()
  },
  methods:{
    // 创建具体方法，调用teacher.js中方法
    // 获得列表
    getCourseListPage(page = 1) {
      //不传参默认是1 传就使用值
      let that = this
      that.page = page
      that.listLoading = true
      course.getCourseList(that.page, that.limit, that.courseQuery)
        .then(response => {
          if (response.success === true) {
            that.list = response.data.list
            // 给逻辑删除作后处理，如果获取的列表值为空，返回上一页
            if(that.list==0){
              that.getCourseListPage(that.page-1, that.limit,'')
              return
            }
            that.total = response.data.total
          }
          that.listLoading = false
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 清空查询条件
    resetData() {
      // 清空courseQuery数据
      this.courseQuery = {}
      this.getCourseListPage()
    },
    // 删除（逻辑）
    removeDataById(id) {
      // alert(id)
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        return course.removeDataById(id)
      }).then(() => {
        let that=this
        // 刷新当前页
        this.getCourseListPage(that.page, that.limit,'')
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch((response) => { // 失败
        if (response === 'cancel') {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败'
          })
        }
      })
    },
  }
}
</script>

<style>
</style>
