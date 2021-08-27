<template>
    <div class="app-container">
        <el-alert title="商品类型只能有2级，2级以后的将不显示" type="error" style="margin:0px 0px 10px;"></el-alert>
        <div class="header-1">
            <el-button type size="small" @click="添加()">添加分类</el-button>
        </div>

        <el-tree class="tree" :default-expand-all="true" :data="list" :props="defaultProps" icon-class :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                    <el-button type="text" size="mini" @click="() => 修改(data)">修改</el-button>
                    <el-button class="red-text" type="text" size="mini" @click="() => 删除分类(data)">删除分类</el-button>
                </span>
            </span>
        </el-tree>

        <el-dialog title="商品类型" :visible.sync="dialogVisible" width="400px" aria-label :close-on-click-modal="false">
            <el-form :model="类型" size="mini" ref="类型" :rules="rules">
                <el-form-item label="图标" prop="cover">
                    <div class="el-input">
                        <div class="img-box" @click="点击图片()">
                            <i v-if="!类型.cover && !coverBase64" class="el-icon-plus"></i>
                            <img v-if="类型.cover && !coverBase64" :src="$img_url+类型.cover" alt srcset />
                            <img v-if="coverBase64" :src="coverBase64" alt srcset />
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="类型名称" prop="title">
                    <el-input v-model="类型.title" placeholder></el-input>
                </el-form-item>
                <el-form-item label="所属上级">
                    <el-select v-model="类型.parentId" placeholder="没有上级不选择" style="width: 100%;">
                        <el-option :value="0" label="无上级"></el-option>
                        <el-option v-show="item.id!=类型.id" v-for="item in list" :value="item.id" :label="item.title"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="简介">
                    <el-input type="textarea" autosize v-model="类型.brief" placeholder></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
                <el-button size="mini" type="primary" @click="保存()">确 定</el-button>
            </span>
        </el-dialog>

        <input type="file" v-if="showFile" accept="image/*" @change="fileChange()" ref="file" class="hide" />
    </div>
</template>

<script>

export default {
    data() {
        return {
            // data: [{
            //     title: '一级 1',
            // }, {
            //     title: '一级 2',
            //     children: [{
            //         title: '二级 2-1',
            //     }, {
            //         title: '二级 2-2',
            //     }]
            // }
            // ],
            defaultProps: {
                children: 'children',
                label: 'title',
            },


            list: [],
            loading: false,
            dialogVisible: false,
            类型: {
                id: "",
                cover: "",
                title: "",
                parentId: "",
                brief: "", //简介
            },
            coverBase64: "",
            rules: {
                cover: [
                    {
                        required: true, trigger: 'blur', validator: (rule, value, callback) => {
                            if (!this.类型.cover && !this.coverBase64) {
                                callback(new Error('请选择图标'));
                            } else {
                                callback();
                            }
                        }
                    }
                ],
                title: [
                    { required: true, message: '请选择图标', trigger: 'blur' },
                ]
            },
            showFile: true,
        }
    },
    computed: {

    },
    methods: {
        修改(item) {
            console.log(item)
            this.coverBase64 = ''
            this.类型 = {
                id: item.id,
                cover: item.cover,
                title: item.title,
                parentId: item.parentId,
                brief: item.brief, //简介
            }
            this.dialogVisible = true
        },
        添加() {
            this.coverBase64 = ''
            this.类型 = {
                id: "",
                cover: "",
                title: "",
                parentId: "",
                brief: "", //简介
            }
            this.dialogVisible = true
        },
        点击图片() {
            this.showFile = false
            this.$nextTick(() => {
                this.showFile = true
                this.$nextTick(() => {
                    this.$refs.file.click()
                })
            })
        },
        fileChange() {
            let file = this.$refs.file.files[0]
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                // console.log(e.target.result);
                this.coverBase64 = e.target.result
            };
        },
        保存() {
            this.$refs.类型.validate((valid) => {
                if (valid) {
                    console.log('可以提交')
                    var form = new FormData
                    if (this.coverBase64) {
                        form.append('image', this.$refs.file.files[0])
                    }
                    for (const key in this.类型) {
                        form.append(key, this.类型[key])
                    }
                    this.$axios.post('/Goods/setGoodsType', form).then(res => {
                        if (res.code == 1) {
                            this.正确('设置成功')
                            this.dialogVisible = false
                            this.getList()
                        } else {
                            this.错误('设置失败，请联系管理员')
                        }
                    }).catch(err => {
                        this.错误('设置失败，请联系管理员')
                    })
                } else {
                    return false;
                }
            });
        },
        删除分类(item) {
            this.$confirm('分类如果有下级将一起被删除，是否继续？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log('点击了确定', item)
                // return
                this.$axios.post('/Goods/deleteGoodsType', { id: item.id }).then(res => {
                    console.log(res)
                    if (res.code === 1) {
                        this.正确('删除成功')
                        this.getList()
                    } else {
                        this.错误('删除失败，请联系管理员')
                    }
                }).catch(err => {
                    this.错误('删除失败，请联系管理员')
                    console.error(err);
                })
            }).catch(() => {
            });
        },
        getList() {
            this.$axios.post('/Goods/getGoodsType', '').then(res => {
                console.log(res)
                let data = res.data;
                this.list = this.toTreeData(data, 0)
            }).catch(err => {
                console.error(err);
            })
        },
        toTreeData(data, pid) {
            function tree(id) {
                let arr = []
                data.filter(item => {
                    return item.parentId === id;
                }).forEach(item => {
                    // let obj = Object.assign()
                    item.children = tree(item.id)
                    arr.push(item)
                    // arr.push({
                    //     id: item.id,
                    //     label: item.name,
                    //     children: tree(item.id)
                    // })
                })
                return arr
            }
            return tree(pid)  // 第一级节点的父id，是null或者0，视情况传入
        }
    },
    mounted() {
        this.getList()
    },
}
</script>

<style lang="scss" scoped>
.header-1 {
    margin: 0px 0px 10px;
}

.img-box {
    width: 100px;
    height: 100px;
    background: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    i {
        font-size: 30px;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

// 树形结构
.tree {
    width: 500px;
    .red-text {
        color: red;
    }
}
.custom-tree-node {
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    border-bottom: 1px solid #d0d0d0;
}
::v-deep .el-tree-node__children {
    overflow: inherit;
}
</style>
