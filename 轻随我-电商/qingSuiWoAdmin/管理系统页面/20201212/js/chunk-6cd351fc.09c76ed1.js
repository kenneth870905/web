(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6cd351fc"],{"3f9d":function(t,e,a){"use strict";a("90d2")},"6c64":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"title1"},[t._v(" 操作记录 ")]),a("el-date-picker",{attrs:{"value-format":"yyyy-MM-dd",size:"small",type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},on:{change:t.changeTime},model:{value:t.time,callback:function(e){t.time=e},expression:"time"}}),a("div",{staticClass:"table"},[a("el-table",{attrs:{data:t.list,border:"",size:"mini"}},[a("el-table-column",{attrs:{label:"类型"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v(" "+t._s(t.opType[e.row.opType])+" ")]}}])}),a("el-table-column",{attrs:{label:"时间",prop:"createdAt"}}),a("el-table-column",{attrs:{label:"详情",prop:"content"}})],1)],1),a("div",{staticClass:"分页"},[a("el-pagination",{attrs:{background:"","page-size":t.query.size,layout:"prev, pager, next",total:t.total},on:{"current-change":t.changePage}})],1)],1)},i=[],o=a("c1df"),s=a.n(o),r={name:"",components:{},data:function(){return{opType:["","登录","商品","积分"],query:{page:1,size:10,startDate:"",endDate:""},list:[],total:0,time:[s()().subtract(7,"days").format("YYYY-MM-DD"),s()().add(1,"days").format("YYYY-MM-DD")]}},methods:{"获取操作记录":function(){var t=this;this.query.startDate=this.time?this.time[0]:"",this.query.endDate=this.time?this.time[1]:"",this.$axios.get("/api/adminLog",{params:this.query}).then((function(e){console.log(e),0===e.code&&(t.list=e.data,t.total=e.total)})).catch((function(t){console.error(t)}))},changeTime:function(){console.log(132),this.query.page=1,this.获取操作记录()},changePage:function(t){this.query.page=t,this.获取操作记录()}},mounted:function(){this.获取操作记录()}},l=r,c=(a("3f9d"),a("2877")),d=Object(c["a"])(l,n,i,!1,null,"68d8a913",null);e["default"]=d.exports},"86dc":function(t,e,a){var n=a("24fb");e=n(!1),e.push([t.i,".title1[data-v-68d8a913]{border-bottom:1px solid #eee;padding:0 0 10px;margin:0 0 15px 0}.table[data-v-68d8a913]{margin:15px 0 0;min-height:400px}.分页[data-v-68d8a913]{text-align:right;margin:10px 0}",""]),t.exports=e},"90d2":function(t,e,a){var n=a("86dc");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var i=a("499e").default;i("0a58d33a",n,!0,{sourceMap:!1,shadowMode:!1})}}]);
//# sourceMappingURL=chunk-6cd351fc.09c76ed1.js.map