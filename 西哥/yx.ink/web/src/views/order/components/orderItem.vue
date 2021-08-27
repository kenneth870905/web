<template>
    <div class="orderItem">
        <div class="title-1">
            <div>
                <div>
                    订单号：
                    <span class="color-1">{{order.orderNumber}}</span>
                </div>
                <div class="time">{{order.creationTime}}</div>
            </div>
            <div class="color-1">{{type[order.type]}}</div>
        </div>
        <ul>
            <li class="order-item" v-for="item in order.orderInfo" v-if="order.orderInfo.length>0">
                <div class="img-box">
                    <img :src="$img_url+item.goodsInfo.cover" alt srcset />
                </div>
                <div class="title-2">
                    <div>{{item.goodsInfo.title}}</div>
                    <div>{{item.specification.color}}；{{item.specification.size}}</div>
                    <div>₱{{item.specification.price | setMoney}}</div>
                </div>
                <div class="flex1 shuliang">x{{item.number}}</div>
                <div class="flex1 jiage">₱ {{ item.number*item.specification.price | setMoney}}</div>
                <div class="flex1 pingjia">
                    <span class="btn-1" v-if="order.type==3 && !item.pingJia" @click="pingjia(item)">评价</span>
                </div>
            </li>
            <li class="zongjia" v-if="order.orderInfo.length>0">
                商品总价（不包含运费）
                <span>₱{{总价}}</span>
            </li>
            <li class="异常" v-if="order.orderInfo.length==0">商品信息异常</li>
            <li class="address">
                <div>收货信息：</div>
                <div>{{order.address.address}}（{{order.address.name}} 收）{{order.address.contact}}</div>
            </li>
            <li class="wuliu" v-if="order.type==2 || order.type==3">物流：{{order.logistics}}</li>
            <li class="btn-2">
                <span class="btn-1" v-if="order.type==2" @click="确认收货()">确认收货</span>
            </li>
        </ul>

        <el-dialog title="添加评价" :visible.sync="dialogVisible" width="500px">
            <el-form>
                <el-form-item label="评分">
                    <el-col :span="24">
                        <el-rate v-model="评价.number"></el-rate>
                    </el-col>
                </el-form-item>
                <el-form-item label="内容">
                    <el-input type="textarea" autosize placeholder="请输入内容" v-model="评价.text"></el-input>
                </el-form-item>
                <el-form-item label="图片">
                    <el-col :span="24">
                        <ul class="img-list">
                            <li v-for="(item, index) in fileList" :key="index">
                                <img :src="item.base64" alt srcset />
                                <div class="删除" @click="fileList.splice(index,1)">
                                    <i class="el-icon-delete-solid"></i>
                                </div>
                            </li>
                            <li class="add" @click="选择图片()">
                                <i class="el-icon-plus"></i>
                            </li>
                        </ul>
                    </el-col>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="确定()" size="mini">确 定</el-button>
            </span>
        </el-dialog>

        <input class="hide" type="file" @change="changeFile()" ref="file" accept="image/*" multiple v-if="showFile" />
    </div>
</template>

<script>
import { setMoney } from "@/assets/自定义函数.js";
export default {
    inject:['刷新列表'],
    props: {
        order: {
            type: Object,
            default: () => ({})
        }
    },
    data() {
        return {
            // 0待付款1已付款或已支付定金待发货2已发货待收货，3已收货 -1订单异常或取消
            type: {
                0: '待付款',
                1: '待发货',
                2: "待收货",
                3: "已收货",
                '-1': '关闭/取消'
            },
            dialogVisible: false,
            评价: {
                goodsId: '',
                orderId: "",
                number: 5,
                parentId: 0,
                text: '',
                image: [],
                //上传图片
                // fileList:[file],
            },
            fileList: [
                // {
                //     base64:"",
                //     file:""
                // }
            ],
            showFile: false,
            orderInfo:{}        //添加评论是使用其中参数
        }
    },
    filters: {
        setMoney
    },
    computed: {
        总价() {
            let n = 0
            this.order.orderInfo.forEach(item => {
                n += parseInt(Math.round(item.number * item.specification.price * 100)) / 100
            });
            return setMoney(n)
        }
    },
    methods: {
        确定(){
            var kong= /^\s*$/g;
            if(kong.test(this.评价.text) ){
                this.错误('请输入内容')
                return
            }
            this.评价.goodsId = this.orderInfo.goodsInfo.id
            this.评价.orderId = this.order.id
            let f = new FormData();
            Object.keys(this.评价).forEach(key=>{
                f.append(key,this.评价[key])
            })
            this.fileList.forEach(item=>{
                f.append('fileList[]',item.file)
            })
            this.$Loading(1)
            this.$axios.post('/Translation/add',f).then(res => {
                this.$Loading()
                if(res.code==1){
                    this.正确('添加成功')
                    this.dialogVisible=false
                    this.刷新列表()
                }else{
                    this.错误('添加失败，请联系客服')
                }
            }).catch(err => {
                this.$Loading()
                this.错误('系统错误，请联系客服')
            })
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
            let files = this.$refs.file.files
            console.log(files)
            for (let i = 0; i < files.length; i++) {
                var reader = new FileReader();
                reader.readAsDataURL(files[i]);
                reader.onload = (e)=> {
                    //console.log(e.target.result);
                    this.fileList.push({
                        base64:e.target.result,
                        file: files[i]
                    })
                };
            }
        },
        确认收货() {
            this.$confirm('点击下方确定将状态更改为已收货, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let obj = Object.assign({}, this.order)
                obj.type = 3
                this.$Loading(1)
                this.$axios.post('/Order/modifyOrder', obj).then(res => {
                    this.$Loading()
                    if (res.code == 1) {
                        this.正确('设置成功')
                        this.order.type = 3
                    } else {
                        this.错误('设置失败')
                    }
                }).catch(err => {
                    console.log(err)
                    this.$Loading()
                    this.错误('系统错误，请稍后再试')
                })
            }).catch(() => {
            });
        },
        pingjia(item) {
            this.orderInfo = item
            this.dialogVisible=true
        }
    },
}
</script>

<style lang="scss" scoped>
.orderItem {
    background: #fff;
    margin: 0px 0px 15px;
}

.title-1 {
    background: #fff;
    padding: 8px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    border-bottom: 1px solid #dadada;
    .time {
        color: #757575;
        font-size: 12px;
    }
    .color-1 {
        cursor: pointer;
        color: #1a9cb7;
        font-weight: 500;
    }
}

.order-item {
    padding: 24px 0px 24px 0px;
    margin: 0px 12px 0px 36px;
    display: flex;
    border-bottom: 1px solid #eee;
    .img-box {
        width: 80px;
        height: 80px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .title-2 {
        width: 280px;
        flex-shrink: 0;
        margin: 0px 24px 0px 12px;
        font-size: 14px;
        color: #212121;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // display: -webkit-box;
        // -webkit-box-orient: vertical;
        // -webkit-line-clamp: 2;
    }
    .flex1 {
        flex: 1;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .shuliang {
        color: #bbb;
    }
    .pingjia {
        width: 150px;
    }
    .btn-1 {
        display: inline-block;
        width: 60px;
        line-height: 24px;
        border-radius: 24px;
        border: 1px solid #adadad;
        text-align: center;
        cursor: pointer;
        font-size: 12px;
    }
}
.异常 {
    line-height: 100px;
    text-align: center;
}
.zongjia {
    padding: 5px 0px 5px 0px;
    margin: 0px 12px 0px 36px;
    text-align: right;
    font-size: 14px;
    span {
        color: #f57224;
        font-weight: bold;
    }
}
.address {
    padding: 5px 0px 5px 0px;
    margin: 0px 12px 0px 36px;
    border-top: 1px solid #eee;
    font-size: 12px;
    color: rgba($color: #000000, $alpha: 0.8);
    display: flex;
    word-break: break-all;
    div:nth-child(1) {
        white-space: nowrap;
        flex-shrink: 0;
    }
}
.wuliu {
    padding: 5px 0px 5px 0px;
    margin: 0px 12px 0px 36px;
    border-top: 1px solid #eee;
    font-size: 12px;
    color: rgba($color: #000000, $alpha: 0.8);
}
.btn-2 {
    padding: 5px 0px 5px 0px;
    margin: 0px 12px 0px 36px;
    border-top: 1px solid #eee;
    text-align: right;
    .btn-1 {
        display: inline-block;
        width: 80px;
        line-height: 24px;
        border-radius: 24px;
        border: 1px solid #adadad;
        text-align: center;
        cursor: pointer;
        font-size: 12px;
    }
}

.img-list {
    display: flex;
    flex-wrap: wrap;
    li {
        width: 80px;
        height: 80px;
        margin: 0px 5px 0px 5px;
        background: #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }
        &:hover {
            .删除 {
                display: block;
            }
        }
        .删除 {
            position: absolute;
            top: 0px;
            left: 0px;
            width: 100%;
            line-height: 80px;
            text-align: center;
            background: rgba($color: #000000, $alpha: 0.5);
            color: #fff;
            font-size: 25px;
            display: none;
            i {
                cursor: pointer;
            }
        }
    }
    .add {
        cursor: pointer;
        font-size: 30px;
    }
}
</style>