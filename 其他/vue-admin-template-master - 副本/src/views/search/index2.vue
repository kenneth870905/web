<template>
    <div class="app-container">
        <div class="filter-container">
            <!-- <el-row>
        <i class="el-icon-s-promotion">：xxxx</i>
        <i class="el-icon-s-promotion" style="margin-left: 40%">：xxxx</i>
            </el-row>-->
            <el-row style="max-width: 800px; margin: auto">
                <el-input v-model="listQuery.Query.cardNumber" placeholder="卡号" style="width: 200px" class="filter-item" @keyup.enter.native="handleFilter" clearable icon="el-icon-search">
                    <el-button slot="append" icon="el-icon-search" @click="handleFilter"></el-button>
                </el-input>

                <el-popover placement="left" width="210" trigger="hover">
                    <div>
                        <el-row>
                            更新通知
                            <el-link type="success" href="https://t.me/cvvhv" target="view_window">https://t.me/cvvhv</el-link>
                        </el-row>
                        <el-row>25在线秒发 ✅ icq：123123</el-row>
                        <el-row>25在线秒发 ✅ icq：222444</el-row>
                        <el-row>25在线秒发 ✅ icq：555333</el-row>
                        <el-row>25在线秒发 ✅ icq：888777</el-row>
                        <el-row>25在线秒发 ✅ icq：900000</el-row>
                        <el-row>25在线秒发 ✅ icq：93339</el-row>
                        <el-row>25在线秒发 ✅ icq：30088</el-row>
                        <el-row>在线支持 ✅ icq：77777</el-row>
                    </div>
                    <el-button slot="reference" style="float: right">联系方式</el-button>
                </el-popover>
            </el-row>
        </div>
        <el-table :key="tableKey" v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%" @sort-change="sortChange" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName">
            <!-- <el-table-column label="ID" prop="id" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.id }}</span>
        </template>
            </el-table-column>-->

            <el-table-column label="卡号" prop="cardNumber" style="background-color: gray" align="center">
                <template slot-scope="{ row }">
                    <span>{{ row.cardNumberXX }}</span>
                </template>
            </el-table-column>
        </el-table>

        <el-row style="text-align: center">
            <el-button type="primary" icon="el-icon-arrow-left" :disabled="listQuery.page == 1" @click="getpage(1)">上一页</el-button>
            <el-button type="primary" @click="getpage(2)" :disabled="listQuery.page == 2">
                下一页
                <i class="el-icon-arrow-right el-icon--right"></i>
            </el-button>
        </el-row>
    </div>
</template>
<style >
body {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

#app,
.el-table__empty-block,
.app-container {
    background-color: gray !important;
}

.el-table .success-row {
    background: gray;
    color: green;
}

.el-table {
    max-width: 800px !important;
    margin: auto;
}

.el-table th {
    background-color: gray;
    color: green !important;
}

.table1 {
    width: 80%;
}
/* .el-table__row .el-table .cell {
  background-color: gray !important;
  color: green !important;
}

.el-table__row .el-table_1_column_1 {
  background-color: gray !important;
}
.tableRowClassName {
  background-color: gray;
} */
</style>


<script>
import { searchList } from "@/api/search";

import { parseTime } from "@/utils";

import { getToken } from "@/utils/auth";
import Pagination from "@/components/Pagination";
export default {
    name: "ComplexTable",
    components: { Pagination },
    filters: {
        parseTime(time) {
            return parseTime(time);
        },
    },
    data() {
        return {
            fullscreenLoading: false,
            fileList: [],
            tableKey: 0,
            list: null,
            total: 0,
            listLoading: true,
            listQuery: {
                page: 1,
                limit: 20,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: "+id",
                Query: {
                    cardNumber: "",
                },
            },
            importanceOptions: [1, 2, 3],

            dialogPvVisible: false,
            pvData: [],

            downloadLoading: false,
            uploadUrl: process.env.VUE_APP_BASE_API + "CardNumber/UploadData",
            multipleSelection: [],
            gridData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
            ],
        };
    },
    created() {
        this.getList();
    },
    methods: {
        tableRowClassName() {
            return "success-row";
        },
        getpage(val) {
            this.listQuery.page = val;
            this.getList();
        },
        getList() {
            this.listLoading = true;
            searchList(this.listQuery).then((response) => {
                this.list = response.data.items;
                this.total = response.data.total;

                // Just to simulate the time of the request
                setTimeout(() => {
                    this.listLoading = false;
                }, 1.5 * 1000);
            });
        },
        handleFilter() {
            this.listQuery.page = 1;
            this.getList();
        },
        handleModifyStatus(row, status) {
            this.$message({
                message: "操作Success",
                type: "success",
            });
            row.status = status;
        },
        sortChange(data) {
            const { prop, order } = data;
            if (prop === "id") {
                this.sortByID(order);
            }
        },
        sortByID(order) {
            if (order === "ascending") {
                this.listQuery.sort = "+id";
            } else {
                this.listQuery.sort = "-id";
            }
            this.handleFilter();
        },
        resetTemp() {
            this.temp = {
                id: undefined,
                importance: 1,
                remark: "",
                timestamp: new Date(),
                title: "",
                status: "published",
                type: "",
            };
        },
        handleCreate() {
            this.resetTemp();
            this.dialogStatus = "create";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        createData() {
            this.$refs["dataForm"].validate((valid) => {
                if (valid) {
                    this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
                    this.temp.author = "vue-element-admin";
                    createArticle(this.temp).then(() => {
                        this.list.unshift(this.temp);
                        this.dialogFormVisible = false;
                        this.$notify({
                            title: "Success",
                            message: "Created Successfully",
                            type: "success",
                            duration: 2000,
                        });
                    });
                }
            });
        },
        handleUpdate(row) {
            this.temp = Object.assign({}, row); // copy obj
            this.temp.timestamp = new Date(this.temp.timestamp);
            this.dialogStatus = "update";
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs["dataForm"].clearValidate();
            });
        },
        updateData() {
            this.$refs["dataForm"].validate((valid) => {
                if (valid) {
                    const tempData = Object.assign({}, this.temp);
                    tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
                    updateArticle(tempData).then(() => {
                        const index = this.list.findIndex((v) => v.id === this.temp.id);
                        this.list.splice(index, 1, this.temp);
                        this.dialogFormVisible = false;
                        this.$notify({
                            title: "Success",
                            message: "Update Successfully",
                            type: "success",
                            duration: 2000,
                        });
                    });
                }
            });
        },
        handleDelete(row, index) {
            this.$notify({
                title: "Success",
                message: "Delete Successfully",
                type: "success",
                duration: 2000,
            });
            this.list.splice(index, 1);
        },
        handleFetchPv(pv) {
            fetchPv(pv).then((response) => {
                this.pvData = response.data.pvData;
                this.dialogPvVisible = true;
            });
        },

        formatJson(filterVal) {
            return this.list.map((v) =>
                filterVal.map((j) => {
                    if (j === "timestamp") {
                        return parseTime(v[j]);
                    } else {
                        return v[j];
                    }
                })
            );
        },
        getSortClass: function (key) {
            const sort = this.listQuery.sort;
            return sort === `+${key}` ? "ascending" : "descending";
        },

        beforeAvatarUpload() {
            var inppt = document.getElementById("file");
            var file = document.getElementById("file").files[0];
            const isJPG = file.type === "text/plain";
            const isLt2M = file.size / 1024 / 1024 < 5;

            if (!isJPG) {
                this.$message.error("上传头像图片只能是 txt 格式!");
                inppt.value = "";
                return false;
            }
            if (!isLt2M) {
                this.$message.error("上传头像图片大小不能超过 5MB!");
                inppt.value = "";
                return false;
            }

            this.fullscreenLoading = true;

            var form = new FormData(); // FormData对象
            form.append("file", file); //文件对象
            var xhr = new XMLHttpRequest(); // XMLHttpRequest对象

            xhr.open("post", this.uploadUrl, true); //post方式，url为服务器请求地址，true该参数规定请求是否异步处理。
            xhr.setRequestHeader("x-token", getToken());
            xhr.onload = this.handleAvatarSuccess; //请求完成
            // xhr.onerror = uploadFailed; //请求失败
            //xhr.upload.onprogress = progressFunction; //【上传进度调用方法实现】
            xhr.upload.onloadstart = function () {
                //上传开始执行方法
                // ot = new Date().getTime(); //设置上传开始时间
                // oloaded = 0; //设置上传开始时，以上传的文件this.$t('chatmgr.groupmgr.Size')为0
            };
            xhr.send(form); //开始上传，this.$t('chatmgr.groupmgr.Send')form数据
            inppt.value = "";
            return true;
        },
        chooseFile() {
            //$("#file").click();
            document.getElementById("file").click();
        },
        handleAvatarSuccess(response) {
            this.fullscreenLoading = false;
            if (!response.target) {
                this.$notify({
                    title: "成功",
                    message: "上传成功",
                    type: "success",
                    duration: 2000,
                });
                return;
            }

            var retData = response.target.response;
            var data = JSON.parse(retData);

            if (data.isSuccess) {
                this.$notify({
                    title: "成功",
                    message: "上传成功",
                    type: "success",
                    duration: 2000,
                });
            } else {
                this.$notify({
                    title: "失败",
                    message: "上传失败!",
                    type: "error",
                    duration: 2000,
                });
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAll() {
            if (this.multipleSelection.length == 0) {
                this.$notify({
                    title: "失败",
                    message: "请选择!",
                    type: "error",
                    duration: 2000,
                });
                return;
            }
            var ids = [];
            this.multipleSelection.forEach((element) => {
                ids.push(element.id);
            });
            cardNumberdel(ids).then((response) => {
                if (response.isSuccess) {
                    this.$notify({
                        title: "成功",
                        message: "删除成功",
                        type: "success",
                        duration: 2000,
                    });
                    this.getList();
                } else {
                    this.$notify({
                        title: "失败",
                        message: "删除失败",
                        type: "error",
                        duration: 2000,
                    });
                }
            });
        },
        delitem(id) {
            cardNumberdel([id]).then((response) => {
                if (response.isSuccess) {
                    this.$notify({
                        title: "成功",
                        message: "删除成功",
                        type: "success",
                        duration: 2000,
                    });
                    this.getList();
                } else {
                    this.$notify({
                        title: "失败",
                        message: "删除失败",
                        type: "error",
                        duration: 2000,
                    });
                }
            });
        },
    },
};
</script>
