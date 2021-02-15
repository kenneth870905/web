<template>
    <div class="app-container">
        <el-row>
            <el-col :span="12" class="left">
                <div class="title-1">电脑轮播图</div>
                <el-alert title="图片尺寸为：1080*334" type="warning"></el-alert>
                <ul class="list list-1">
                    <li class="item" v-for="(item, index) in 电脑" :key="index">
                        <div class="img-box">
                            <img :src="$img_url+item.content" alt srcset />
                        </div>
                        <div class="url">跳转：{{item.url}}</div>
                        <span @click="删除(item)">删除</span>
                    </li>
                    <li class="add" @click="显示弹框(0)">
                        <i class="el-icon-plus"></i>
                    </li>
                </ul>
            </el-col>
            <el-col :span="12" class="right">
                <div class="title-1">手机轮播图</div>
                <el-alert title="图片尺寸为：350*120" type="warning"></el-alert>
                <ul class="list list-2">
                    <li class="item" v-for="(item, index) in 手机" :key="index">
                        <div class="img-box">
                            <img :src="$img_url+item.content" alt srcset />
                        </div>
                        <div class="url">跳转：{{item.url}}</div>
                        <span @click="删除(item)">删除</span>
                    </li>
                    <li class="add" @click="显示弹框(1)">
                        <i class="el-icon-plus"></i>
                    </li>
                </ul>
            </el-col>
        </el-row>

        <el-dialog class="添加弹框" :title="addType==0 ? '添加电脑轮播' : '添加手机轮播'" :visible.sync="dialogVisible" width="400px">
            <div>
                <div class="title-2">图片</div>
                <div class="img-box" @click="选择图片()">
                    <i v-if="!addObj.base64" class="el-icon-plus"></i>
                    <img v-if="addObj.base64" :src="addObj.base64" alt srcset />
                </div>
                <div class="title-2">跳转(本站已 / 开头，外站写全名)</div>
                <el-input v-model="addObj.url" placeholder="跳转地址"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="确定()" size="small">确 定</el-button>
            </span>
        </el-dialog>

        <input type="file" ref="file" accept="image/*" @change="changeFile()" v-if="showFile" name id class="hide" />
    </div>
</template>

<script>
export default {
    data() {
        return {
            addType: 0, //0电脑1手机
            dialogVisible: false,
            addObj: {
                file: "",
                base64: "",
                url: ""
            },
            showFile: true,
            电脑: [],
            手机: []
        }
    },
    methods: {
        显示弹框(t) {
            this.addObj = {
                file: "",
                base64: "",
                url: ""
            }
            this.addType = t
            this.dialogVisible = true
        },
        选择图片() {
            this.showFile = false
            this.$nextTick(() => {
                this.showFile = true
                this.$nextTick(() => {
                    this.$refs.file.click()
                })
            })
        },
        changeFile() {
            let file = this.$refs.file.files[0]
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                this.addObj.base64 = e.target.result
            };
        },
        确定() {
            if (!this.addObj.base64) {
                this.错误('请选择图片')
            } else {
                var form = new FormData()
                form.append('image', this.$refs.file.files[0]);
                if (this.addType == 0) {
                    form.append('keyName', 'webCarousel')
                } else {
                    form.append('keyName', 'h5Carousel')
                }
                form.append('content', '')
                form.append('url', this.addObj.url)
                this.$Loadading(1)
                this.$axios.post('/Basic/add', form).then(res => {
                    if (res.code == 1) {
                        this.正确('添加成功')
                        this.dialogVisible = false
                        if (this.addType == 0) {
                            this.查询电脑轮播()
                        } else {
                            this.查询手机轮播()
                        }
                    } else {
                        this.错误('添加失败')
                    }
                    this.$Loadading()
                }).catch(err => {
                    this.$Loadading()
                    this.错误('系统错误，稍后再试')
                })
            }
        },
        删除(item) {
            this.$confirm('确定删除？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('/Basic/delete',{id:item.id}).then(res => {
                    if(res.code==1){
                        this.正确('删除成功')
                        this.查询电脑轮播()
                        this.查询手机轮播()
                    }else{
                        this.错误('删除失败')
                    }
                }).catch(err => {
                    this.错误('系统错误，稍后再试')
                })
            }).catch(() => {
            });
        },
        查询电脑轮播() {
            this.$axios.post('/Basic/get', { keyName: "webCarousel" }).then(res => {
                if (res.code == 1) {
                    this.电脑 = res.data
                }
            }).catch(err => {
            })
        },
        查询手机轮播() {
            this.$axios.post('/Basic/get', { keyName: "h5Carousel" }).then(res => {
                if (res.code == 1) {
                    this.手机 = res.data
                }
            }).catch(err => {
            })
        }
    },
    mounted() {
        this.查询电脑轮播()
        this.查询手机轮播()
    },
}
</script>

<style lang="scss" scoped>
.title-1 {
    margin: 0px 0px 10px 0px;
}
.left {
    padding-right: 10px;
}
.right {
    padding-left: 10px;
}
.list {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0px 0px;
    li {
        margin: 10px;
        background: #eee;
        border: 1px solid #eee;
    }
    .url {
        padding: 5px;
    }
    .add {
        display: flex;
        justify-content: center;
        align-items: center;
        background: #eee;
        font-size: 30px;
        cursor: pointer;
        &:hover {
            background: #cecece;
        }
    }
    .item {
        position: relative;
        span {
            position: absolute;
            top: 0px;
            right: 0px;
            color: red;
            background: rgba($color: #000000, $alpha: 0.6);
            cursor: pointer;
            padding: 5px 10px;
        }
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}
.list-1 {
    .add {
        height: 141px;
    }
    li {
        width: calc(1080px / 3);
    }
    .img-box {
        height: calc(334px / 3);
    }
}
.list-2 {
    .add {
        height: 150px;
    }
    li {
        width: calc(350px / 1);
    }
    .img-box {
        height: calc(120px / 1);
    }
}

.添加弹框 {
    .title-2 {
        font-size: 14px;
        margin: 0px 0px 10px 0px;
    }
    .img-box {
        background: #eee;
        display: flex;
        height: 200px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40px;
        margin: 0px 0px 10px 0px;
        img {
            height: 100%;
            width: 100%;
            object-fit: contain;
        }
    }
}
</style>