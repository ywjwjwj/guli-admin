(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-13c7"],{"1pSU":function(e,t,s){"use strict";var i=s("t3Un");t.a={getPageList:function(e,t,s){return Object(i.a)({url:"/user/"+e+"/"+t,method:"get",params:s})},getById:function(e){return Object(i.a)({url:"/user/get/"+e,method:"get"})},save:function(e){return Object(i.a)({url:"/user/save",method:"post",data:e})},updateById:function(e){return Object(i.a)({url:"/user/update",method:"put",data:e})},getAssign:function(e){return Object(i.a)({url:"/user/toAssign/"+e,method:"get"})},saveAssign:function(e,t){return Object(i.a)({url:"/user/doAssign",method:"post",params:{userId:e,roleId:t}})},removeById:function(e){return Object(i.a)({url:"/user/remove/"+e,method:"delete"})},removeRows:function(e){return Object(i.a)({url:"/user/batchRemove",method:"delete",data:e})}}},"ck/j":function(e,t,s){"use strict";s.r(t);var i=s("gDS+"),n=s.n(i),a=s("1pSU"),c={data:function(){return{checkAll:!1,checkedCities:[],cities:[],isIndeterminate:!0,userId:"",saveBtnDisabled:!1}},created:function(){this.init()},methods:{init:function(){this.$route.params&&this.$route.params.id&&(this.userId=this.$route.params.id,this.getById(this.userId))},getById:function(e){var t=this;a.a.getAssign(e).then(function(e){var s=e.data.assignRoles;t.checkedCities=t.getJsonToList(s,"id"),t.cities=e.data.allRolesList})},getJsonToList:function(e,t){for(var s=JSON.parse(n()(e)),i=[],a=0;a<s.length;a++)i.push(s[a][t]);return i},handleCheckAllChange:function(e){this.checkedCities=e?this.cities:[],this.isIndeterminate=!1},handleCheckedCitiesChange:function(e){var t=e.length;this.checkAll=t===this.cities.length,this.isIndeterminate=t>0&&t<this.cities.length},update:function(){var e=this;this.saveBtnDisabled=!0;var t=this.checkedCities.join(",");console.log(t),a.a.saveAssign(this.userId,t).then(function(t){t.success&&(e.$message({type:"success",message:"保存成功"}),e.$router.push({path:"/acl/user/list"}))})}}},r=s("KHd+"),u=Object(r.a)(c,function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"app-container"},[s("el-checkbox",{attrs:{indeterminate:e.isIndeterminate},on:{change:e.handleCheckAllChange},model:{value:e.checkAll,callback:function(t){e.checkAll=t},expression:"checkAll"}},[e._v("全选")]),e._v(" "),s("div",{staticStyle:{margin:"15px 0"}}),e._v(" "),s("el-checkbox-group",{on:{change:e.handleCheckedCitiesChange},model:{value:e.checkedCities,callback:function(t){e.checkedCities=t},expression:"checkedCities"}},e._l(e.cities,function(t){return s("el-checkbox",{key:t.id,attrs:{label:t.id}},[e._v(e._s(t.roleName))])})),e._v(" "),s("br"),e._v(" "),s("el-button",{attrs:{disabled:e.saveBtnDisabled,type:"primary"},on:{click:e.update}},[e._v("保存")])],1)},[],!1,null,null,null);u.options.__file="roleForm.vue";t.default=u.exports},"gDS+":function(e,t,s){e.exports={default:s("oh+g"),__esModule:!0}},"oh+g":function(e,t,s){var i=s("WEpk"),n=i.JSON||(i.JSON={stringify:JSON.stringify});e.exports=function(e){return n.stringify.apply(n,arguments)}}}]);