(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-29bd"],{"RU/L":function(e,t,i){i("Rqdy");var o=i("WEpk").Object;e.exports=function(e,t,i){return o.defineProperty(e,t,i)}},Rqdy:function(e,t,i){var o=i("Y7ZC");o(o.S+o.F*!i("jmDH"),"Object",{defineProperty:i("2faE").f})},SEkw:function(e,t,i){e.exports={default:i("RU/L"),__esModule:!0}},VTSi:function(e,t,i){"use strict";i.r(t);var o=i("QbLZ"),s=i.n(o),a=i("t3Un"),n=function(e){return Object(a.a)({url:"/chapter/getChapterVideo/"+e,method:"get"})},r=function(e){return Object(a.a)({url:"/chapter/addChapter",method:"POST",data:e})},d=function(e){return Object(a.a)({url:"/chapter/getChapterInfo/"+e,method:"get"})},l=function(e){return Object(a.a)({url:"/chapter/updateChapter",method:"POST",data:e})},c=function(e){return Object(a.a)({url:"/chapter/"+e,method:"delete"})},u=(i("xash"),function(e){return Object(a.a)({url:"/video/addVideo",method:"POST",data:e})}),p=function(e){return Object(a.a)({url:"/video/getVideoInfoById/"+e,method:"get"})},h=function(e){return Object(a.a)({url:"/video/updateVideo",method:"POST",data:e})},v=function(e){return Object(a.a)({url:"/video/"+e,method:"delete"})},f=function(e){return Object(a.a)({url:"/vod/removeVideo/"+e,method:"delete"})},m={title:"",sort:0},g={title:"",sort:0,isFree:0,progress:0,videoSourceId:"",videoOriginalName:""},b={data:function(){return{saveBtnDisabled:!1,courseId:"",chapterVideoList:[],dialogChapterFormVisible:!1,chapter:m,saveVideoBtnDisabled:!1,dialogVideoFormVisible:!1,chapterId:"",video:g,fileList:[],BASE_API:"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin",updateLoadingMsg:"确 定"}},created:function(){this.$route.params&&this.$route.params.id&&(this.courseId=this.$route.params.id,console.log(this.courseId),this.getChapterVideo())},methods:{beforeVodRemove:function(e,t){return this.$confirm("确定移除 "+e.name+"？")},handleVodRemove:function(e,t){var i=this;console.log(e),f(this.video.videoSourceId).then(function(e){i.$message({type:"success",message:e.message}),i.fileList=[],i.video.videoSourceId="",i.video.videoOriginalName=""})},updateLoading:function(e,t,i){this.saveVideoBtnDisabled=!0,this.updateLoadingMsg="正在上传..."},handleVodUploadSuccess:function(e,t,i){this.video.videoSourceId=e.data.videoId,this.video.videoOriginalName=t.name,this.saveVideoBtnDisabled=!1,this.updateLoadingMsg="确 定"},handleUploadExceed:function(e,t){this.$message.warning("想要重新上传视频，请先删除已上传的视频")},saveOrUpdateVideo:function(){this.video.id?this.updateVideo():this.addVideo()},editVideo:function(e){this.dialogVideoFormVisible=!0,this.getVideo(e)},openVideo:function(e){this.dialogVideoFormVisible=!0,this.video=s()({},g),this.video.chapterId=e,this.fileList=[]},addVideo:function(){var e=this;this.video.courseId=this.courseId,u(this.video).then(function(t){e.dialogVideoFormVisible=!1,e.$message({type:"success",message:"添加小节成功成功!"}),e.getChapterVideo()}).catch(function(t){e.$message({type:"success",message:t})})},deleteVideo:function(e){var t=this;this.$confirm("此操作将永久删除该小节, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return v(e)}).then(function(){t.getChapterVideo(),t.$message({type:"success",message:"删除小节成功!"})}).catch(function(e){"cancel"===e&&t.$message({type:"info",message:"已取消删除小节"})})},getVideo:function(e){var t=this;p(e).then(function(e){t.video=e.data.video,t.video.videoOriginalName.length>0?t.fileList=[{name:t.video.videoOriginalName}]:t.fileList=[]})},updateVideo:function(){var e=this;h(this.video).then(function(t){e.dialogVideoFormVisible=!1,e.$message({type:"success",message:"修改小节成功!"}),e.getChapterVideo()})},openEditChapter:function(e){var t=this;this.dialogChapterFormVisible=!0,d(e).then(function(e){t.chapter=e.data.chapter})},openChapterDialog:function(){this.dialogChapterFormVisible=!0,this.chapter=s()({},m)},addChapter:function(){var e=this;this.chapter.courseId=this.courseId,r(this.chapter).then(function(t){e.dialogChapterFormVisible=!1,e.$message({type:"success",message:"添加章节成功"}),e.getChapterVideo()})},updateChapter:function(){var e=this;l(this.chapter).then(function(t){e.dialogChapterFormVisible=!1,e.$message({type:"success",message:"修改章节成功"}),e.fileList=[],e.getChapterVideo()})},saveOrUpdate:function(){this.chapter.id?this.updateChapter():this.addChapter()},deleteChapter:function(e){var t=this;this.$confirm("此操作将永久删除该小节, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){return c(e)}).then(function(){t.getChapterVideo(),t.$message({type:"success",message:"删除章节成功!"})}).catch(function(e){"cancel"===e&&t.$message({type:"info",message:"已取消删除章节"})})},getChapterVideo:function(){var e=this;n(this.courseId).then(function(t){e.chapterVideoList=t.data.allChapterVideo})},previous:function(){console.log("previous"),this.$router.push({path:"/course/info/"+this.courseId})},next:function(){console.log("next"),this.$router.push({path:"/course/publish/"+this.courseId})}}},V=(i("k7eC"),i("KHd+")),_=Object(V.a)(b,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"app-container"},[i("h2",{staticStyle:{"text-align":"center"}},[e._v("发布新课程")]),e._v(" "),i("el-steps",{staticStyle:{"margin-bottom":"40px"},attrs:{active:2,"process-status":"wait","align-center":""}},[i("el-step",{attrs:{title:"填写课程基本信息"}}),e._v(" "),i("el-step",{attrs:{title:"完善课程详情并上传视频"}}),e._v(" "),i("el-step",{attrs:{title:"发布课程"}})],1),e._v(" "),i("t-steps",{staticStyle:{"margin-bottom":"40px"},attrs:{defaultCurrent:2,"align-center":""}},[i("t-step-item",{attrs:{title:"填写课程基本信息"}}),e._v(" "),i("t-step-item",{attrs:{title:"创建课程大纲"}}),e._v(" "),i("t-step-item",{attrs:{title:"发布课程"}})],1),e._v(" "),i("el-button",{attrs:{type:"text"},on:{click:e.openChapterDialog}},[e._v("添加章节")]),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogChapterFormVisible,title:"添加章节"},on:{"update:visible":function(t){e.dialogChapterFormVisible=t}}},[i("el-form",{attrs:{model:e.chapter,"label-width":"120px"}},[i("el-form-item",{attrs:{label:"章节标题"}},[i("el-input",{model:{value:e.chapter.title,callback:function(t){e.$set(e.chapter,"title",t)},expression:"chapter.title"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"章节排序"}},[i("el-input-number",{attrs:{min:0,"controls-position":"right"},model:{value:e.chapter.sort,callback:function(t){e.$set(e.chapter,"sort",t)},expression:"chapter.sort"}})],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogChapterFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:e.saveOrUpdate}},[e._v("确 定")])],1)],1),e._v(" "),i("ul",{staticClass:"chanpterList"},e._l(e.chapterVideoList,function(t){return i("li",{key:t.id},[i("p",[e._v("\n                "+e._s(t.title)+"\n\n                "),i("span",{staticClass:"acts"},[i("el-button",{attrs:{type:"text"},on:{click:function(i){e.openVideo(t.id)}}},[e._v("添加小节")]),e._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(i){e.openEditChapter(t.id)}}},[e._v("编辑")]),e._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(i){e.deleteChapter(t.id)}}},[e._v("删除")])],1)]),e._v(" "),i("ul",{staticClass:"chanpterList videoList"},e._l(t.children,function(t){return i("li",{key:t.id},[i("p",[e._v(e._s(t.title)+"\n                        "),i("span",{staticClass:"acts"},[i("el-button",{attrs:{type:"text"},on:{click:function(i){e.editVideo(t.id)}}},[e._v("编辑")]),e._v(" "),i("el-button",{attrs:{type:"text"},on:{click:function(i){e.deleteVideo(t.id)}}},[e._v("删除")])],1)])])}))])})),e._v(" "),i("el-form",{attrs:{"label-width":"120px"}},[i("el-form-item",[i("el-button",{on:{click:e.previous}},[e._v("上一步")]),e._v(" "),i("el-button",{attrs:{disabled:e.saveBtnDisabled,type:"primary"},on:{click:e.next}},[e._v("下一步")])],1)],1),e._v(" "),i("el-dialog",{attrs:{visible:e.dialogVideoFormVisible,title:"添加课时"},on:{"update:visible":function(t){e.dialogVideoFormVisible=t}}},[i("el-form",{attrs:{model:e.video,"label-width":"120px"}},[i("el-form-item",{attrs:{label:"课时标题"}},[i("el-input",{model:{value:e.video.title,callback:function(t){e.$set(e.video,"title",t)},expression:"video.title"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"课时排序"}},[i("el-input-number",{attrs:{min:0,"controls-position":"right"},model:{value:e.video.sort,callback:function(t){e.$set(e.video,"sort",t)},expression:"video.sort"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"是否免费"}},[i("el-radio-group",{model:{value:e.video.isFree,callback:function(t){e.$set(e.video,"isFree",t)},expression:"video.isFree"}},[i("el-radio",{attrs:{label:!0}},[e._v("免费")]),e._v(" "),i("el-radio",{attrs:{label:!1}},[e._v("默认")])],1)],1),e._v(" "),i("el-form-item",{attrs:{label:"上传视频"}},[i("el-upload",{staticClass:"upload-demo",attrs:{"on-success":e.handleVodUploadSuccess,"on-remove":e.handleVodRemove,"before-remove":e.beforeVodRemove,"on-exceed":e.handleUploadExceed,"on-progress":e.updateLoading,"file-list":e.fileList,action:e.BASE_API+"/vod/uploadVideo",limit:1}},[i("el-button",{attrs:{size:"small",type:"primary"}},[e._v("上传视频")]),e._v(" "),i("el-tooltip",{attrs:{placement:"right-end"}},[i("div",{attrs:{slot:"content"},slot:"content"},[e._v("最大支持1G，"),i("br"),e._v("\n                    支持3GP、ASF、AVI、DAT、DV、FLV、F4V、"),i("br"),e._v("\n                    GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、"),i("br"),e._v("\n                    MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、"),i("br"),e._v("\n                    SWF、TS、VOB、WMV、WEBM 等视频格式上传")]),e._v(" "),i("i",{staticClass:"el-icon-question"})])],1)],1)],1),e._v(" "),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.dialogVideoFormVisible=!1}}},[e._v("取 消")]),e._v(" "),i("el-button",{attrs:{disabled:e.saveVideoBtnDisabled,type:"primary"},on:{click:e.saveOrUpdateVideo}},[e._v(e._s(e.updateLoadingMsg))])],1)],1)],1)},[],!1,null,"172618d4",null);_.options.__file="chapter.vue";t.default=_.exports},YEIV:function(e,t,i){"use strict";t.__esModule=!0;var o=function(e){return e&&e.__esModule?e:{default:e}}(i("SEkw"));t.default=function(e,t,i){return t in e?(0,o.default)(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}},iWFY:function(e,t,i){},k7eC:function(e,t,i){"use strict";var o=i("iWFY");i.n(o).a},xash:function(e,t,i){"use strict";var o,s=i("YEIV"),a=i.n(s),n=i("t3Un");t.a=(o={addCourseInfo:function(e){return Object(n.a)({url:"/course/addCourseInfo",method:"post",data:e})},getListTeacher:function(){return Object(n.a)({url:"/teacher/selectAllTeacher2",method:"get"})},getCourseInfoId:function(e){return Object(n.a)({url:"/course/getCourseInfo/"+e,method:"get"})},updateCourseInfo:function(e){return Object(n.a)({url:"/course/updateCourseInfo",method:"post",data:e})},getCoursePublishInfo:function(e){return Object(n.a)({url:"/course/getPublishCourseInfo/"+e,method:"get"})},publishCourse:function(e){return Object(n.a)({url:"/course/publishCourse/"+e,method:"put"})},getCourseList:function(){return Object(n.a)({url:"/course/getCourseList/"+courseId,method:"get"})}},a()(o,"getCourseList",function(e,t,i){return Object(n.a)({url:"/course/getCourseList/"+e+"/"+t,method:"post",data:i})}),a()(o,"removeDataById",function(e){return Object(n.a)({url:"/course/"+e,method:"delete"})}),o)}}]);