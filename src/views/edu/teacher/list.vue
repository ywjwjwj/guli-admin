<template>
  <div class="app-container">
    讲师列表

    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名" />
      </el-form-item>

      <el-form-item>
        <el-select v-model="teacherQuery.level" clearable placeholder="讲师职称">
          <el-option :value="1" label="普通讲师" />
          <el-option :value="2" label="VIP讲师" />
        </el-select>
      </el-form-item>

      <el-form-item label="添加时间">
        <el-date-picker v-model="teacherQuery.begin" type="datetime" placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="teacherQuery.end" type="datetime" placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
      </el-form-item>

      <el-button type="primary" icon="el-icon-search" @click="getTeacherListPage()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>


    <!-- 表格 -->
    <el-table v-loading="listLoading" :data="list" element-loading-text="数据加载中" border fit highlight-current-row>

      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column prop="name" label="名称" width="80" />

      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'普通讲师':'VIP讲师' }}
        </template>
      </el-table-column>

      <el-table-column prop="intro" label="资历" />

      <el-table-column prop="gmtCreate" label="添加时间" width="160" />

      <el-table-column prop="sort" label="排序" width="60" />

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper" @current-change="getTeacherListPage" />

  </div>
</template>

<script>
  import teacher from '@/api/edu/teacher.js'

  export default {
    data() {
      return {
        listLoading: true, // 是否显示loading信息
        list: null, // 查询后接口返回的数据
        page: 1, // 当前页
        limit: 5, // 每页记录
        total: 0, // 总记录数
        teacherQuery: {}, // 对象

      }
    },
    created() {
      // 页面渲染前，一般调用methods定义的方法
      this.getTeacherListPage()
    },
    methods: {
      // 创建具体方法，调用teacher.js中方法
      // 获得讲师列表
      getTeacherListPage(page = 1) {
        //不传参默认是1 传就使用值
        let that = this
        that.page = page
        that.listLoading = true
        teacher.getTeacherListPage(that.page, that.limit, that.teacherQuery)
          .then(response => {
            if (response.success === true) {
              that.list = response.data.rows
              // 给逻辑删除作后处理，如果获取的列表值为空，返回上一页
              if(that.list==0){
                that.getTeacherListPage(that.page-1, that.limit,'')
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
        // 清空teacherQuery数据
        this.teacherQuery = {}
        this.getTeacherListPage()
      },
      // 删除讲师（逻辑）
      removeDataById(id) {
        // alert(id)
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          return teacher.removeDataById(id)
        }).then(() => {
          let that=this
          // 刷新当前页
          this.getTeacherListPage(that.page, that.limit,'')
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



    },
  }
</script>

<style>
</style>
