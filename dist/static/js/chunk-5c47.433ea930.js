(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-5c47"],{XA1u:function(e,t,a){"use strict";var r=a("ubhu");a.n(r).a},uMPZ:function(e,t,a){"use strict";a.r(t);var r=a("QbLZ"),s=a.n(r),c=a("w7v5"),n={name:"",sort:0,level:1,career:"",intro:"",avatar:"https://ywj-oss.oss-cn-shenzhen.aliyuncs.com/2022/04/07/12b31df8a12f45829b11044200567b0d-XOUVI]WKXX2Y6FZ8XSBW%7BUI.jpg"},i={data:function(){return{teacher:n,saveBtnDisabled:!1,imagecropperShow:!1,imagecropperKey:0,BASE_API:"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin",dialogVisible:!1}},watch:{$route:function(e,t){this.init()}},created:function(){this.init()},methods:{handleAvatarSuccess:function(e,t){this.teacher.avatar=e.data.url,console.log(e)},beforeAvatarUpload:function(e){},init:function(){if(this.$route.params&&this.$route.params.id){var e=this.$route.params.id;this.fetchDataById(e)}else this.teacher=s()({},n)},saveOrUpdate:function(){this.saveBtnDisabled=!0,this.teacher.id?this.updateData():this.saveData()},saveData:function(){var e=this;c.a.addTeacher(this.teacher).then(function(t){return e.$message({type:"success",message:"添加成功!"})}).then(function(t){e.$router.push({path:"/teacher/list"})}).catch(function(t){e.$message({type:"error",message:"添加失败"})})},fetchDataById:function(e){var t=this;c.a.getById(e).then(function(e){t.teacher=e.data.edu_teacher}).catch(function(e){t.$message({type:"error",message:"获取数据失败"})})},updateData:function(){var e=this;this.saveBtnDisabled=!0,c.a.updateTeacher(this.teacher).then(function(t){return e.$message({type:"success",message:"修改成功!"})}).then(function(t){e.$router.push({path:"/teacher/list"})}).catch(function(t){e.$message({type:"error",message:"修改失败"})})}}},o=(a("XA1u"),a("KHd+")),l=Object(o.a)(i,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("el-form",{attrs:{"label-width":"120px"}},[a("el-form-item",{attrs:{label:"讲师名称"}},[a("el-input",{model:{value:e.teacher.name,callback:function(t){e.$set(e.teacher,"name",t)},expression:"teacher.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"讲师排序"}},[a("el-input-number",{attrs:{"controls-position":"right",min:0},model:{value:e.teacher.sort,callback:function(t){e.$set(e.teacher,"sort",t)},expression:"teacher.sort"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"讲师头衔"}},[a("el-select",{attrs:{clearable:"",placeholder:"请选择"},model:{value:e.teacher.level,callback:function(t){e.$set(e.teacher,"level",t)},expression:"teacher.level"}},[a("el-option",{attrs:{value:1,label:"高级讲师"}}),e._v(" "),a("el-option",{attrs:{value:2,label:"首席讲师"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"讲师资历"}},[a("el-input",{model:{value:e.teacher.career,callback:function(t){e.$set(e.teacher,"career",t)},expression:"teacher.career"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"讲师简介"}},[a("el-input",{attrs:{rows:10,type:"textarea"},model:{value:e.teacher.intro,callback:function(t){e.$set(e.teacher,"intro",t)},expression:"teacher.intro"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"讲师头像"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:e.BASE_API+"/eduoss/fileoss","show-file-list":!1,"on-success":e.handleAvatarSuccess,"before-upload":e.beforeAvatarUpload}},[e.teacher.avatar?a("img",{staticClass:"avatar",attrs:{src:e.teacher.avatar}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{disabled:e.saveBtnDisabled,type:"primary"},on:{click:e.saveOrUpdate}},[e._v("保存")])],1)],1)],1)},[],!1,null,null,null);l.options.__file="save.vue";t.default=l.exports},ubhu:function(e,t,a){},w7v5:function(e,t,a){"use strict";var r=a("t3Un");t.a={getTeacherListPage:function(e,t,a){return Object(r.a)({url:"/teacher/pageTeacherCondition2/"+e+"/"+t,method:"post",data:a})},removeDataById:function(e){return Object(r.a)({url:"/teacher/"+e+"2",method:"delete"})},addTeacher:function(e){return Object(r.a)({url:"/teacher/addTeacher",method:"post",data:e})},getById:function(e){return Object(r.a)({url:"/teacher/getTeacher/"+e,method:"get"})},updateTeacher:function(e){return Object(r.a)({url:"/teacher/updateTeacher",method:"post",data:e})}}}}]);