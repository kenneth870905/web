<template>
    <div class="app-container">
        <el-form :model="sp" size="mini" label-width="80px">
            <el-form-item label="分类">
                <!-- <el-select v-model="sp.goodsType" placeholder>
                    <el-option v-for="item in goodsType" :value="item.id" :label="item.title"></el-option>
                </el-select> -->
                <el-cascader placeholder="请选择分类"  v-model="typeValue" size="small" style="width: 200px;" :props="{ checkStrictly: true,expandTrigger: 'hover',value:'id',label:'title' }" :options="goodsType" ></el-cascader>
            </el-form-item>
            <el-form-item label="标题">
                <el-input v-model="sp.title" placeholder></el-input>
            </el-form-item>
            <el-form-item label="简介">
                <el-input step="0.01" v-model="sp.brief" type="textarea" placeholder></el-input>
            </el-form-item>
            <el-form-item label="基础价格">
                <el-input v-model="sp.price" placeholder @blur="blur('price')"></el-input>
            </el-form-item>
            <el-form-item label="总库存">
                <el-input v-model="sp.amount" placeholder @blur="blur('amount')"></el-input>
            </el-form-item>
            <el-form-item label="颜色">
                <template>
                    <div class="颜色">
                        <div class="img-box" v-for="(item,index) in sp.color">
                            <div v-if="!item.previewImgUrl">无图</div>
                            <img v-else :src="$img_url+item.previewImgUrl" alt srcset />
                            <div class="text">{{item.name}}</div>
                            <i class="el-icon-delete shanchu" @click="sp.color.splice(index,1)"></i>
                        </div>
                        <div class="img-box" v-for="(item,index) in color">
                            <div v-if="!item.base64">无图</div>
                            <img v-else :src="item.base64" alt srcset />
                            <div class="text">{{item.name}}</div>
                            <i class="el-icon-delete shanchu" @click="color.splice(index,1)"></i>
                        </div>
                        <!-- <div class="img-box">
                            <div>无图</div>
                            <img src="http://ph-test-11.slatic.net/p/71ca58b5f5ac393a129a40d35fb31eb9.jpg_720x720q80.jpg" alt srcset />
                            <div class="text">红色</div>
                            <i class="el-icon-delete shanchu"></i>
                        </div>-->
                        <el-button type size="mini" @click="点击添加颜色()">添加颜色</el-button>
                    </div>
                </template>
            </el-form-item>
            <el-form-item label="尺寸">
                <template>
                    <div class="尺寸">
                        <el-button-group class="btn" size="mini" v-for="(item,index) in sp.size">
                            <el-button size="mini">{{item.name}}</el-button>
                            <el-button size="mini" type="warning" icon="el-icon-delete" @click="sp.size.splice(index,1)"></el-button>
                        </el-button-group>
                        <el-button type size="mini" class="btn" @click="尺寸弹框=true">添加尺寸</el-button>
                    </div>
                </template>
            </el-form-item>
            <el-form-item label="对应价格">
                <template>
                    <el-table :data="sp.priceList" style="width: 50%;" size="mini" border>
                        <el-table-column label="颜色" prop="color"></el-table-column>
                        <el-table-column label="尺寸" prop="size"></el-table-column>
                        <el-table-column label="价格">
                            <template slot-scope="s">
                                <el-input v-model="s.row.price" placeholder></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="库存">
                            <template slot-scope="s">
                                <el-input v-model="s.row.stock_num" placeholder></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div style="color:red" v-if="sp.priceList.length>0">提示:价格/库存 = 0 或者未填写时用户无法进行购买</div>
                </template>
            </el-form-item>
            <el-form-item label="封面">
                <template>
                    <div class="img-box add" @click="选择图片(1)">
                        <i class="el-icon-plus 添加" v-if="!sp.cover && !cover.base64"></i>
                        <img v-if="sp.cover && !cover.base64" :src="$img_url+sp.cover" alt srcset />
                        <img v-if="cover.base64" :src="cover.base64" alt srcset />
                    </div>
                </template>
            </el-form-item>
            <el-form-item label="轮播图">
                <template>
                    <div class="img-list">
                        <div class="img-box" v-for="(item,index) in sp.image">
                            <img :src="$img_url+item" alt srcset />
                            <i class="el-icon-delete shanchu" @click="删除轮播(index,1)"></i>
                        </div>
                        <div class="img-box" v-for="(item,index) in image">
                            <img :src="item.base64" alt srcset />
                            <i class="el-icon-delete shanchu" @click="删除轮播(index,2)"></i>
                        </div>
                        <div class="img-box add" @click="选择图片(2)">
                            <i class="el-icon-plus 添加"></i>
                        </div>
                    </div>
                </template>
            </el-form-item>
            <el-form-item label="详情">
                <template>
                    <div id="div1" ref="wangeditor"></div>
                </template>
            </el-form-item>
            <div>
                <el-button type="primary" @click="保存商品()" style="width:100%;">保存</el-button>
            </div>
        </el-form>

        <input type="file" v-if="showFile" accept="image/*" @change="fileChange()" ref="file" class="hide" />

        <el-dialog title="设置商品颜色" :visible.sync="颜色弹框" width="300px">
            <el-form>
                <el-form-item label="当前颜色对应图片">
                    <template>
                        <div class="el-input">
                            <div class="img-box add" @click="选择图片(3)">
                                <i class="el-icon-plus 添加" v-if="!单个颜色.base64"></i>
                                <img v-else :src="单个颜色.base64" alt srcset />
                            </div>
                        </div>
                    </template>
                </el-form-item>
                <el-form-item label="颜色名称">
                    <el-input v-model="单个颜色.name" placeholder></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="颜色弹框 = false">取 消</el-button>
                <el-button type="primary" @click="保存颜色()">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="设置商品尺寸" :visible.sync="尺寸弹框" width="300px">
            <el-form>
                <el-form-item label="颜色尺寸">
                    <el-input v-model="单个尺寸" placeholder="如：XL"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="尺寸弹框 = false">取 消</el-button>
                <el-button type="primary" @click="保存尺寸()">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import E from 'wangeditor'
//  `goodsType`, `cover`, `title`, `brief`, `price`, `amount`, `details`, `color`, `size`, `priceList`, `creationTime`, `type`) VALUES
export default {
    data() {
        return {
            typeValue:'',
            goodsType:[],
            sp: {
                id:"",
                goodsType: "",   //类型
                cover: "",   //封面
                title: "",   //标题
                image: [],   //轮播图
                brief: "",   //简介
                price: 1,   //价格
                amount: 0,  //数量
                details: "", //详情
                color: [
                    // {
                    //     name: '红色',       //规格值名称
                    //     previewImgUrl: '',  // 用于预览显示的规格类目图片
                    // }
                ],   //颜色
                size: [
                    // {name:"大"}
                ],    //大小
                priceList: [
                    // {
                    //     color: '红色',
                    //     size: "大",
                    //     price: 100,  //价格单位分
                    //     stock_num: 100,  //当前 组合对应的库存
                    // },
                    // {
                    //     color: '红色',
                    //     size: "大",
                    //     price: 100,  //价格单位分
                    //     stock_num: 100,  //当前 组合对应的库存
                    // }
                ],   //规格价格
                creationTime: "",    //时间
                type: 1,     // 1正常2已删除
            },
            cover: {
                file: "",
                base64: ""
            },
            image: [
                // {
                //     file:'',
                //     base64:''
                // }
            ],
            color: [
                // {
                //      name: '红色',       
                //      base64:"",
                //      file: '',  
                // }
            ],
            单个颜色: {
                name: '',
                base64: "",
                file: '',
            },
            单个尺寸:"",
            showFile: true,
            imgType: 1,  //1封面 2轮播图 3 产品颜色的图片
            颜色弹框: false,
            尺寸弹框:false,
            editor:"",
            img_test:""
        }
    },
    methods: {
        保存尺寸(){
            if(!this.单个尺寸){
                this.错误('请输入尺寸名称')
                return
            }else if(this.sp.size.find(x=>x.name==this.单个尺寸)){
                this.错误('当前尺寸已存在')
                return
            }
            
            this.sp.size.push({name:this.单个尺寸})
            this.尺寸弹框 = false
        },
        点击添加颜色() {
            this.单个颜色 = {
                name: '',
                base64: "",
                file: '',
            }
            this.颜色弹框 = true
        },
        保存颜色() {
            if (!this.单个颜色.name) {
                this.错误('请输入名字')
                return
            }else if(this.color.find(x=>x.name==this.单个颜色.name) || this.sp.color.find(x=>x.name==this.单个颜色.name)){
                this.错误('次颜色已存在')
                return
            }
            this.color.push(Object.assign({}, this.单个颜色))
            this.颜色弹框 = false
        },
        选择图片(t) {
            this.imgType = t
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
                if (this.imgType == 1) {
                    this.cover.file = file
                    this.cover.base64 = e.target.result
                } else if (this.imgType == 2) {
                    let o = {
                        file: file,
                        base64: e.target.result
                    }
                    this.image.push(o)
                } else {
                    this.单个颜色.base64 = e.target.result
                    this.单个颜色.file = file
                }
            };
        },
        删除轮播(i, t) {
            if (t == 1) {
                this.sp.image.splice(i, 1)
            } else {
                this.image.splice(i, 1)
            }
        },
        设置规格(){
            console.log('设置规格')
            let 颜色=[...this.sp.color,...this.color]
            let list = []
            for (let index = 0; index < 颜色.length; index++) {
                for (let i = 0; i < this.sp.size.length; i++) {
                    var price = 0
                    var stock_num = 0
                    if(this.sp.priceList.find(x=>x.color==颜色[index].name && x.size==this.sp.size[i].name)){
                        price = this.sp.priceList.find(x=>x.color==颜色[index].name && x.size==this.sp.size[i].name).price
                        stock_num = this.sp.priceList.find(x=>x.color==颜色[index].name && x.size==this.sp.size[i].name).stock_num
                    }
                    let o = {
                        color:颜色[index].name,
                        size:this.sp.size[i].name,
                        price:price,
                        stock_num:stock_num
                    }
                    list.push(o)
                }
            }
            this.sp.priceList = list
            console.log(list)
        },
        获取商品类型(){
            this.$axios.post('/Goods/getGoodsType','').then(res => {
                let treeData = this.toTreeData(res.data,0)
                this.goodsType = treeData
                if(this.$route.query.id){
                    this.查询单个商品(this.$route.query.id)
                }
            }).catch(err => {})
        },
        保存商品(){
            this.sp.details = this.editor.txt.html()
            this.sp.goodsType = this.typeValue && this.typeValue.length>0 ? this.typeValue[this.typeValue.length-1] : '' 
            if(!this.sp.goodsType){
                this.错误('请选择类型')
            }else if(!this.sp.title){
                this.错误('请输入商品标题')
            }else if(!this.sp.price || this.sp.price<=0){
                this.错误('商品基础价格输入有误')
            }else if(!this.sp.amount && this.sp.amount!==0){
                this.错误('总库存输入有误')
            }else if(this.sp.color.length==0 && this.color.length==0){
                this.错误('请添加颜色')
            }else if(this.sp.size.length==0){
                this.错误('请添加尺寸')
            }else if(!this.sp.cover && !this.cover.base64){
                this.错误('请选择封面')
            }else if(this.sp.image.length==0 && this.image.length==0){
                this.错误('请设置轮播图')
            }else{
                let o = {
                    sp:this.sp,
                    //封面
                    cover:this.cover,
                    //轮播图
                    image:this.image,
                    // 颜色
                    color:this.color
                }
                this.$Loadading(1)
                this.$axios.post('/Goods/setGoods',o).then(res => {
                    if(res.code===1){
                        this.正确('保存成功')
                        history.back()
                    }else{
                        this.错误('保存失败，请联系管理员')
                    }
                    this.$Loadading()
                }).catch(err => {
                    this.错误('保存失败，请联系管理员')
                    console.error(err);
                    this.$Loadading() 
                })
            }
        },
        blur(key){
            if(parseFloat(this.sp[key]).toString() == "NaN"){
                this.sp[key] = 0
                return
            }
             
            if(key=='price'){
                this.sp[key] = Math.abs(parseInt(this.sp[key]*100)/100)  
            }else if(key=='amount'){
                this.sp[key] = Math.abs(parseInt(this.sp[key])) 
            }
        },
        查询单个商品(id){
            this.$Loadading(1)
            this.$axios.post('/Goods/getGoodsById',{id:id}).then(res => {
                let typeid = res.data.goodsType;
                let list = []
                for (let i = 0; i < this.goodsType.length; i++) {
                    if(this.goodsType[i].id==typeid){
                        list = [typeid]
                        break
                    }
                    if(this.goodsType[i].children){
                        for (let L = 0; L < this.goodsType[i].children.length; L++) {
                            if(this.goodsType[i].children[L].id==typeid){
                                list = [this.goodsType[i].id,typeid]
                                break
                            }
                        }
                    }
                }
                this.typeValue = list
                this.sp = res.data
                this.editor.txt.html(res.data.details)
                this.$Loadading()
            }).catch(err => {
                this.$Loadading()
            })
        },
        toTreeData(data, pid) {
            function tree(id) {
                let arr = []
                data.filter(item => {
                    return item.parentId === id;
                }).forEach(item => {
                    if(tree(item.id).length>0){
                        item.children = tree(item.id)
                    }
                    arr.push(item)
                })
                return arr
            }
            return tree(pid)  // 第一级节点的父id，是null或者0，视情况传入
        }
    },
    mounted() {
        this.editor = new E(this.$refs.wangeditor)
        // 配置菜单栏，设置不需要的菜单
        this.editor.config.excludeMenus = [
            'link',
            'todo', //好像是单选框
            'emoticon',
            'video',
            'undo',
            'redo',
        ]
        //上传图片地址
        this.editor.config.uploadImgServer = api + '/public/index.php/Goods/xqUploadImg'
        this.editor.create()

        this.获取商品类型()


        // 这个放在了查询商品类型后面
        // if(this.$route.query.id){
        //     this.查询单个商品(this.$route.query.id)
        // }
        
    },
    watch:{
        color(){
            this.设置规格()
        },
        'sp.color'(){
            this.设置规格()
        },
        'sp.size'(){
            this.设置规格()
        }
    }
}
</script>

<style lang="scss" scoped>
.img-list {
    display: flex;
    .img-box {
        margin: 0px 10px 0px 0px;
    }
}
.img-box {
    width: 100px;
    height: 100px;
    background: #eee;
    border: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &.add {
        cursor: pointer;
    }
    .添加 {
        font-size: 30px;
    }
    .shanchu {
        color: red;
        cursor: pointer;
        position: absolute;
        top: 0px;
        right: 0px;
        font-size: 18px;
        opacity: 0.5;
        transition: all 0.3s;
        &:hover {
            opacity: 1;
            transform: scale(1.5);
        }
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }
}

.颜色 {
    display: flex;
    align-items: center;
    .img-box {
        margin: 0px 10px 0px 0px;
        .text {
            position: absolute;
            background: rgba($color: #000000, $alpha: 0.6);
            width: 100%;
            left: 0px;
            bottom: 0px;
            color: #fff;
            text-align: center;
        }
    }
}
.尺寸 {
    .btn {
        margin: 0px 10px 0px 0px;
    }
}
</style>