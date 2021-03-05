<template>
    <div class="对账系统">
        <div class="上传文件">
            <el-alert title="请在下方选择你要上传的文件" type="error"> </el-alert>
            <!-- <el-upload class="upload-demo" :data="{'caozuoyuan':user.account}" name="image[]" drag action="http://test.yooy8.com/huobi/public/index.php/Excel/upload2" multiple>
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">奖文件拖到此处后会自动上传</div>
            </el-upload> -->

            <!-- <el-upload multiple class="upload-demo" ref="upload" :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="fileList" :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
            </el-upload> -->

            <el-button class="选择文件" @click="选择文件()" size="small" type="primary">选取文件</el-button>

            <ul class="上传列表">
                <li v-for="(item, index) in list" :key="index">
                    <span>{{item.name}}</span>
                    <i @click="删除(index)" class="el-icon-close"></i>
                </li>
            </ul>
            <el-button v-show="list.length>0" size="small" type="success" @click="上传()">上传到服务器</el-button>
            <input v-if="show_file" class="file" multiple @change="change1()" type="file" ref="file">
        </div>
        <div class="上传记录">
            <div class="header_1">历史上传记录</div>
            <el-table :data="历史.list" style="width: 100%" border size="mini">
                <el-table-column prop="bbchushoubishu" label="B币出售笔数" width="150"></el-table-column>
                <el-table-column prop="bbgoumaibishu" label="B币购买笔数" width="150"></el-table-column>
                <el-table-column prop="bblirun" label="B币利润" width="180"></el-table-column>
                <el-table-column prop="fabichushoubishu" label="法币出售笔数" width="150"></el-table-column>
                <el-table-column prop="fabigoumaibishu" label="法币购买笔数" width="150"></el-table-column>
                <el-table-column prop="fabilirun" label="法币利润" width="150"></el-table-column>
                <el-table-column prop="zonglirun" label="总利润" width="150"></el-table-column>
                <el-table-column prop="chuangjianshijian" label="创建时间" width="200"></el-table-column>
            </el-table>
            <div class="分页">
                <el-pagination @current-change="fenye" background layout="prev, pager, next" :total="历史.total" :page-size="历史.query.row">
                </el-pagination>
            </div>
        </div>

        <el-dialog class="上传详情" title="上传信息" :visible.sync="上传详情" width="500px">
            <ul class="list2">
                <li>
                    <div>B币出售笔数</div>
                    <div>{{上传结果.bbchushoubishu}}</div>
                </li>
                <li>
                    <div>B币购买笔数</div>
                    <div>{{上传结果.bbgoumaibishu}}</div>
                </li>
                <li>
                    <div>B币利润</div>
                    <div>{{上传结果.bblirun}}</div>
                </li>
                <li>
                    <div>法币出售笔数</div>
                    <div>{{上传结果.fabichushoubishu}}</div>
                </li>
                <li>
                    <div>法币购买笔数</div>
                    <div>{{上传结果.fabigoumaibishu}}</div>
                </li>
                <li>
                    <div>法币利润</div>
                    <div>{{上传结果.fabilirun}}</div>
                </li>
                <li>
                    <div>总利润</div>
                    <div>{{上传结果.zonglirun}}</div>
                </li>
            </ul>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" type="primary" @click="上传详情 = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import $ from 'jquery';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            // uploadUrl:"http://test.yooy8.com/huobi/public/index.php/Excel/upload2",
            // uploadUrl:"http://test.yooy8.com/huobi/public/index.php/Excel/upload2",
            fileList: [],
            list: [],
            show_file: true,
            上传详情: false,
            上传结果: {
                bbchushoubishu: "",
                bbgoumaibishu: "",
                bblirun: "",
                fabichushoubishu: "",
                fabigoumaibishu: "",
                fabilirun: "",
                zonglirun: ""
            },
            历史: {
                query: {
                    page: 1,
                    row: 10,
                    caozuoyuan: ""
                },
                list: [],
                total: 0
            }
        };
    },
    computed: {
        ...mapState({
            user: x => x.user2.user
        })
    },
    methods: {
        fenye(index){
            this.历史.query.page = index;
            this.g1();
        },
        选择文件() {
            this.show_file = true;
            this.$nextTick(() => {
                this.$refs.file.click();
            })
        },
        删除(index) {
            this.list.splice(index, 1)
        },
        change1() {
            var files = this.$refs.file.files
            let length = files.length;
            for (let i = 0; i < length; i++) {
                this.list.push(files[i])
            }
            // console.log(this.list);
            this.show_file = false;
        },
        上传() {
            let param = new FormData(); //创建form对象
            this.list.map(x => {
                param.append('image[]', x)
            })
            param.append('caozuoyuan', this.user.account)
            // param.append('file',file);//通过append向form对象添加数据
            let config = {
                headers: { 'Content-Type': 'multipart/form-data' }
            }; //添加请求头
            this.$Loading(true)
            this.$axios.post('/huobi/public/index.php/Excel/upload2', param, config).then(response => {
                this.$Loading(false)
                var data = response.data;
                try {
                    data = JSON.parse(data);
                } catch (error) {
                    this.$message({ showClose: true, message: 'JSON 转换错误，请联系客服', type: 'error' });
                    return
                }
                console.log(data)
                if (data.code == 1) {
                    this.list = [];
                    this.上传结果 = data.data;
                    this.上传详情 = true;
                    this.g1()
                    this.$message({ showClose: true, message: '上传成功', type: 'success' });
                } else {
                    this.$message({ showClose: true, message: data.msg, type: 'error' });
                }
            }).catch(err => {
                this.$message({ showClose: true, message: '系统错误，稍后再试！', type: 'error' });
                this.$Loading(false)
            })
        },
        submitUpload() {
            // this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        g1() {
            this.$axios.post(`/huobi/public/index.php/Excelsearch/lishi`, this.历史.query).then(x => {
                this.历史.list = x.data.rows;
                this.历史.total = x.data.total;
            }).catch(err => { })
        }
    },
    mounted() {
        this.历史.query.caozuoyuan = this.user.account;
        this.g1()
    },
}
</script>

<style lang="scss" scoped>
.对账系统 {
    padding: 20px 50px;
    // width: 500px;
    // margin: 0px auto;
}
.upload-demo {
    margin: 20px 0px 0px;
    /* /deep/ .el-upload {
        display: block;
    } */
    /deep/ .el-upload-dragger {
        width: 100%;
    }
}

ul {
    margin: 0px;
    padding: 0px;
}
li {
    list-style: none;
}

.file {
    display: none;
}
.选择文件 {
    margin: 10px 0px 0px;
}
.上传列表 {
    margin: 0px 0px 10px;
    li {
        margin: 10px 0px 0px;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        padding: 5px;
        &:hover {
            background: #eee;
        }
        i {
            cursor: pointer;
            &:hover {
                color: red;
            }
        }
    }
}
.上传记录 {
    margin: 30px 0px 0px;
    border-top: 1px solid #cccccc;
    .header_1 {
        padding: 5px;
    }
}
.上传文件 {
    min-height: 150px;
}
.上传详情 {
    /deep/ .el-dialog__body {
        padding: 10px;
    }
}
.list2 {
    li {
        display: flex;
        border-right: 1px solid #6b6b6b;
        border-bottom: 1px solid #6b6b6b;
        div {
            width: 50%;
            border-top: 1px solid #6b6b6b;
            border-left: 1px solid #6b6b6b;
            padding: 5px;
        }
        div:nth-child(1) {
            text-align: right;
        }
    }
}
</style>