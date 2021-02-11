<template>
    <div class="address">
        <van-nav-bar fixed title="收货地址详情" left-arrow @click-left="$back()"></van-nav-bar>

        <div class="form">
            <van-form @submit="submit" :show-error="false">
                <van-field class="input-2" label="收货人" v-model="address.name" placeholder="请输入联系人姓名"/>
                <van-field class="input-2" label="联系方式" placeholder="如：微信:88888；电话:909000" v-model="address.contact" />
                <van-field readonly class="input-2" label="地区/Province" placeholder="请选择地区" v-model="address.province" isLink @click="选择地区=true"/>
                <van-field class="input-2" label="详细地址" type="textarea" placeholder="请输入详细地址" v-model="address.address" />
                <van-cell title="设为默认收货地址" value="内容" >
                    <van-switch v-model="默认" size="20" />
                </van-cell>
                <div style="margin: 16px;">
                    <van-button round block type="info" native-type="submit">提交</van-button>
                </div>
                <div style="margin: 16px;">
                    <van-button round block type="warning">删除</van-button>
                </div>
            </van-form>
        </div>


        <van-action-sheet v-model="选择地区" :actions="省" @select="onSelect" close-on-click-action/>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            address: {
                id:"",
                userId:"",  //用户id
                name:"",
                contact:"", //联系方式
                province:'',    //省
                address:"",     //详细地址
                type:0  //0表示非默认 1 默认
            },
            默认:false,
            选择地区:false,
            省:[{"id":"R52299","name":"Abra","nameLocal":"Abra","parentId":"R443174","displayName":"Abra"},{"id":"R1507282","name":"Agusan\u0020Del\u0020Norte","nameLocal":"Agusan\u0020Del\u0020Norte","parentId":"R443174","displayName":"Agusan\u0020Del\u0020Norte"},{"id":"R52297","name":"Agusan\u0020Del\u0020Sur","nameLocal":"Agusan\u0020Del\u0020Sur","parentId":"R443174","displayName":"Agusan\u0020Del\u0020Sur"},{"id":"R1506745","name":"Aklan","nameLocal":"Aklan","parentId":"R443174","displayName":"Aklan"},{"id":"R1504625","name":"Albay","nameLocal":"Albay","parentId":"R443174","displayName":"Albay"},{"id":"R1506746","name":"Antique","nameLocal":"Antique","parentId":"R443174","displayName":"Antique"},{"id":"R1504662","name":"Aurora","nameLocal":"Aurora","parentId":"R443174","displayName":"Aurora"},{"id":"R1504680","name":"Bataan","nameLocal":"Bataan","parentId":"R443174","displayName":"Bataan"},{"id":"R1504427","name":"Batangas","nameLocal":"Batangas","parentId":"R443174","displayName":"Batangas"},{"id":"R52304","name":"Benguet","nameLocal":"Benguet","parentId":"R443174","displayName":"Benguet"},{"id":"R1506424","name":"Biliran","nameLocal":"Biliran","parentId":"R443174","displayName":"Biliran"},{"id":"R1550487","name":"Bohol","nameLocal":"Bohol","parentId":"R443174","displayName":"Bohol"},{"id":"R48393","name":"Bukidnon","nameLocal":"Bukidnon","parentId":"R443174","displayName":"Bukidnon"},{"id":"R1504656","name":"Bulacan","nameLocal":"Bulacan","parentId":"R443174","displayName":"Bulacan"},{"id":"R1504756","name":"Cagayan","nameLocal":"Cagayan","parentId":"R443174","displayName":"Cagayan"},{"id":"R1504550","name":"Camarines\u0020Norte","nameLocal":"Camarines\u0020Norte","parentId":"R443174","displayName":"Camarines\u0020Norte"},{"id":"R1504551","name":"Camarines\u0020Sur","nameLocal":"Camarines\u0020Sur","parentId":"R443174","displayName":"Camarines\u0020Sur"},{"id":"R1552824","name":"Camiguin","nameLocal":"Camiguin","parentId":"R443174","displayName":"Camiguin"},
            {"id":"R1550483","name":"Capiz","nameLocal":"Capiz","parentId":"R443174","displayName":"Capiz"},{"id":"R1506351","name":"Catanduanes","nameLocal":"Catanduanes","parentId":"R443174","displayName":"Catanduanes"},{"id":"R1503544","name":"Cavite","nameLocal":"Cavite","parentId":"R443174","displayName":"Cavite"},{"id":"R1506936","name":"Cebu","nameLocal":"Cebu","parentId":"R443174","displayName":"Cebu"},{"id":"R80200191","name":"Cotabato","nameLocal":"Cotabato","parentId":"R443174","displayName":"Cotabato"},{"id":"R1507313","name":"Davao\u0020Del\u0020Norte","nameLocal":"Davao\u0020Del\u0020Norte","parentId":"R443174","displayName":"Davao\u0020Del\u0020Norte"},{"id":"R1513050","name":"Davao\u0020Del\u0020Sur","nameLocal":"Davao\u0020Del\u0020Sur","parentId":"R443174","displayName":"Davao\u0020Del\u0020Sur"},{"id":"R1507283","name":"Davao\u0020de\u0020Oro","nameLocal":"Davao\u0020de\u0020Oro","parentId":"R443174","displayName":"Davao\u0020de\u0020Oro"},{"id":"R1507095","name":"Davao\u0020Oriental","nameLocal":"Davao\u0020Oriental","parentId":"R443174","displayName":"Davao\u0020Oriental"},{"id":"R1506373","name":"Eastern\u0020Samar","nameLocal":"Eastern\u0020Samar","parentId":"R443174","displayName":"Eastern\u0020Samar"},{"id":"R1506802","name":"Guimaras","nameLocal":"Guimaras","parentId":"R443174","displayName":"Guimaras"},{"id":"R52303","name":"Ifugao","nameLocal":"Ifugao","parentId":"R443174","displayName":"Ifugao"},{"id":"R1504744","name":"Ilocos\u0020Norte","nameLocal":"Ilocos\u0020Norte","parentId":"R443174","displayName":"Ilocos\u0020Norte"},{"id":"R1504724","name":"Ilocos\u0020Sur","nameLocal":"Ilocos\u0020Sur","parentId":"R443174","displayName":"Ilocos\u0020Sur"},{"id":"R1506774","name":"Iloilo","nameLocal":"Iloilo","parentId":"R443174","displayName":"Iloilo"},{"id":"R1504761","name":"Isabela","nameLocal":"Isabela","parentId":"R443174","displayName":"Isabela"},{"id":"R52300","name":"Kalinga","nameLocal":"Kalinga","parentId":"R443174","displayName":"Kalinga"},
            {"id":"R1503483","name":"Laguna","nameLocal":"Laguna","parentId":"R443174","displayName":"Laguna"},{"id":"R1513179","name":"Lanao\u0020Del\u0020Norte","nameLocal":"Lanao\u0020Del\u0020Norte","parentId":"R443174","displayName":"Lanao\u0020Del\u0020Norte"},{"id":"R1504722","name":"La\u0020Union","nameLocal":"La\u0020Union","parentId":"R443174","displayName":"La\u0020Union"},{"id":"R80156092","name":"Lazada\u0020Office","nameLocal":"Lazada\u0020Office","parentId":"R443174","displayName":"Lazada\u0020Office"},{"id":"R1506532","name":"Leyte","nameLocal":"Leyte","parentId":"R443174","displayName":"Leyte"},{"id":"R1506331","name":"Marinduque","nameLocal":"Marinduque","parentId":"R443174","displayName":"Marinduque"},{"id":"R273242","name":"Metro\u0020Manila\u007ECaloocan","nameLocal":"Metro\u0020Manila\u007ECaloocan","parentId":"R443174","displayName":"Metro\u0020Manila\u007ECaloocan"},{"id":"R2095594","name":"Metro\u0020Manila\u007ELas\u0020Pinas","nameLocal":"Metro\u0020Manila\u007ELas\u0020Pinas","parentId":"R443174","displayName":"Metro\u0020Manila\u007ELas\u0020Pinas"},{"id":"R103716","name":"Metro\u0020Manila\u007EMakati","nameLocal":"Metro\u0020Manila\u007EMakati","parentId":"R443174","displayName":"Metro\u0020Manila\u007EMakati"},{"id":"R403176","name":"Metro\u0020Manila\u007EMalabon","nameLocal":"Metro\u0020Manila\u007EMalabon","parentId":"R443174","displayName":"Metro\u0020Manila\u007EMalabon"},{"id":"R2284209","name":"Metro\u0020Manila\u007EMandaluyong","nameLocal":"Metro\u0020Manila\u007EMandaluyong","parentId":"R443174","displayName":"Metro\u0020Manila\u007EMandaluyong"},{"id":"R103703","name":"Metro\u0020Manila\u007EManila","nameLocal":"Metro\u0020Manila\u007EManila","parentId":"R443174","displayName":"Metro\u0020Manila\u007EManila"},{"id":"R146949","name":"Metro\u0020Manila\u007EMarikina","nameLocal":"Metro\u0020Manila\u007EMarikina","parentId":"R443174","displayName":"Metro\u0020Manila\u007EMarikina"},
            {"id":"R1346849","name":"Metro\u0020Manila\u007EMuntinlupa","nameLocal":"Metro\u0020Manila\u007EMuntinlupa","parentId":"R443174","displayName":"Metro\u0020Manila\u007EMuntinlupa"},{"id":"R379812","name":"Metro\u0020Manila\u007ENavotas","nameLocal":"Metro\u0020Manila\u007ENavotas","parentId":"R443174","displayName":"Metro\u0020Manila\u007ENavotas"},{"id":"R122940","name":"Metro\u0020Manila\u007EParanaque","nameLocal":"Metro\u0020Manila\u007EParanaque","parentId":"R443174","displayName":"Metro\u0020Manila\u007EParanaque"},{"id":"R113858","name":"Metro\u0020Manila\u007EPasay","nameLocal":"Metro\u0020Manila\u007EPasay","parentId":"R443174","displayName":"Metro\u0020Manila\u007EPasay"},{"id":"R131703","name":"Metro\u0020Manila\u007EPasig","nameLocal":"Metro\u0020Manila\u007EPasig","parentId":"R443174","displayName":"Metro\u0020Manila\u007EPasig"},{"id":"R131653","name":"Metro\u0020Manila\u007EPateros","nameLocal":"Metro\u0020Manila\u007EPateros","parentId":"R443174","displayName":"Metro\u0020Manila\u007EPateros"},{"id":"R106569","name":"Metro\u0020Manila\u007EQuezon\u0020City","nameLocal":"Metro\u0020Manila\u007EQuezon\u0020City","parentId":"R443174","displayName":"Metro\u0020Manila\u007EQuezon\u0020City"},{"id":"R2284210","name":"Metro\u0020Manila\u007ESan\u0020Juan","nameLocal":"Metro\u0020Manila\u007ESan\u0020Juan","parentId":"R443174","displayName":"Metro\u0020Manila\u007ESan\u0020Juan"},{"id":"R184776","name":"Metro\u0020Manila\u007ETaguig","nameLocal":"Metro\u0020Manila\u007ETaguig","parentId":"R443174","displayName":"Metro\u0020Manila\u007ETaguig"},{"id":"R307470","name":"Metro\u0020Manila\u007EValenzuela","nameLocal":"Metro\u0020Manila\u007EValenzuela","parentId":"R443174","displayName":"Metro\u0020Manila\u007EValenzuela"},{"id":"R1513208","name":"Misamis\u0020Occidental","nameLocal":"Misamis\u0020Occidental","parentId":"R443174","displayName":"Misamis\u0020Occidental"},
            {"id":"R1513190","name":"Misamis\u0020Oriental","nameLocal":"Misamis\u0020Oriental","parentId":"R443174","displayName":"Misamis\u0020Oriental"},{"id":"R52301","name":"Mountain\u0020Province","nameLocal":"Mountain\u0020Province","parentId":"R443174","displayName":"Mountain\u0020Province"},{"id":"R1506913","name":"Negros\u0020Occidental","nameLocal":"Negros\u0020Occidental","parentId":"R443174","displayName":"Negros\u0020Occidental"},{"id":"R1506914","name":"Negros\u0020Oriental","nameLocal":"Negros\u0020Oriental","parentId":"R443174","displayName":"Negros\u0020Oriental"},{"id":"R1513151","name":"North\u0020Cotabato","nameLocal":"North\u0020Cotabato","parentId":"R443174","displayName":"North\u0020Cotabato"},{"id":"R1506364","name":"Northern\u0020Samar","nameLocal":"Northern\u0020Samar","parentId":"R443174","displayName":"Northern\u0020Samar"},{"id":"R52306","name":"Nueva\u0020Ecija","nameLocal":"Nueva\u0020Ecija","parentId":"R443174","displayName":"Nueva\u0020Ecija"},{"id":"R52305","name":"Nueva\u0020Vizcaya","nameLocal":"Nueva\u0020Vizcaya","parentId":"R443174","displayName":"Nueva\u0020Vizcaya"},{"id":"R1506320","name":"Occidental\u0020Mindoro","nameLocal":"Occidental\u0020Mindoro","parentId":"R443174","displayName":"Occidental\u0020Mindoro"},{"id":"R1506328","name":"Oriental\u0020Mindoro","nameLocal":"Oriental\u0020Mindoro","parentId":"R443174","displayName":"Oriental\u0020Mindoro"},{"id":"R1506669","name":"Palawan","nameLocal":"Palawan","parentId":"R443174","displayName":"Palawan"},{"id":"R1504669","name":"Pampanga","nameLocal":"Pampanga","parentId":"R443174","displayName":"Pampanga"},{"id":"R1504701","name":"Pangasinan","nameLocal":"Pangasinan","parentId":"R443174","displayName":"Pangasinan"},{"id":"R1504500","name":"Quezon","nameLocal":"Quezon","parentId":"R443174","displayName":"Quezon"},{"id":"R52302","name":"Quirino","nameLocal":"Quirino","parentId":"R443174","displayName":"Quirino"},{"id":"R1504641","name":"Rizal","nameLocal":"Rizal","parentId":"R443174","displayName":"Rizal"},{"id":"R1506343","name":"Romblon","nameLocal":"Romblon","parentId":"R443174","displayName":"Romblon"},
            {"id":"R1513098","name":"Sarangani","nameLocal":"Sarangani","parentId":"R443174","displayName":"Sarangani"},{"id":"R3604058","name":"Siquijor","nameLocal":"Siquijor","parentId":"R443174","displayName":"Siquijor"},{"id":"R1504631","name":"Sorsogon","nameLocal":"Sorsogon","parentId":"R443174","displayName":"Sorsogon"},{"id":"R1513131","name":"South\u0020Cotabato","nameLocal":"South\u0020Cotabato","parentId":"R443174","displayName":"South\u0020Cotabato"},{"id":"R1506605","name":"Southern\u0020Leyte","nameLocal":"Southern\u0020Leyte","parentId":"R443174","displayName":"Southern\u0020Leyte"},{"id":"R1513160","name":"Sultan\u0020Kudarat","nameLocal":"Sultan\u0020Kudarat","parentId":"R443174","displayName":"Sultan\u0020Kudarat"},{"id":"R1507031","name":"Surigao\u0020Del\u0020Norte","nameLocal":"Surigao\u0020Del\u0020Norte","parentId":"R443174","displayName":"Surigao\u0020Del\u0020Norte"},{"id":"R1507067","name":"Surigao\u0020Del\u0020Sur","nameLocal":"Surigao\u0020Del\u0020Sur","parentId":"R443174","displayName":"Surigao\u0020Del\u0020Sur"},{"id":"R52307","name":"Tarlac","nameLocal":"Tarlac","parentId":"R443174","displayName":"Tarlac"},{"id":"R1506416","name":"Western\u0020Samar","nameLocal":"Western\u0020Samar","parentId":"R443174","displayName":"Western\u0020Samar"},{"id":"R1504691","name":"Zambales","nameLocal":"Zambales","parentId":"R443174","displayName":"Zambales"},{"id":"R1513211","name":"Zamboanga\u0020Del\u0020Norte","nameLocal":"Zamboanga\u0020Del\u0020Norte","parentId":"R443174","displayName":"Zamboanga\u0020Del\u0020Norte"},{"id":"R1513233","name":"Zamboanga\u0020Del\u0020Sur","nameLocal":"Zamboanga\u0020Del\u0020Sur","parentId":"R443174","displayName":"Zamboanga\u0020Del\u0020Sur"},{"id":"R1513227","name":"Zamboanga\u0020Sibugay","nameLocal":"Zamboanga\u0020Sibugay","parentId":"R443174","displayName":"Zamboanga\u0020Sibugay"}],
            

        }
    },
    computed:{
        ...mapState({
            userInfo:'userInfo'
        })
    },
    methods: {
        submit() {
            this.address.type = this.默认 ? 1 : 0
            this.address.userId = this.userInfo.id
            
            if(/^\s*$/g.test(this.address.name)){
                this.$toast('请输入收货人姓名')
            }else if(/^\s*$/g.test(this.address.contact)){
                this.$toast('请输入联系方式')
            }else if(/^\s*$/g.test(this.address.province)){
                this.$toast('请选择省份/Province')
            }else if(/^\s*$/g.test(this.address.address)){
                this.$toast('请输入详细收货地址')
            }else{
                this.$toast.loading({ message: '加载中...', forbidClick: true});
                this.$axios.post('/Address/setAddress',this.address).then(res => {
                    if(res.code==1){
                        this.$toast('设置成功')
                        setTimeout(() => {
                            history.back()                        
                        }, 500);
                    }else{
                        this.$toast(res.message)
                    }
                }).catch(err => {
                    this.$toast('系统错误，稍后再试')
                })
            }
        },
        onSelect(item) {
            // 可以通过 close-on-click-action 属性开启自动收起
            this.address.province = item.name
        },
        查询地址(){
            let id = this.$route.query.id
            this.$toast.loading({ message: '加载中...', forbidClick: true});
            this.$axios.post('/Address/getAddressById',{id:id}).then(res => {
                if(res.data){
                    this.address = res.data
                    this.默认 = res.data.type==1
                }
                this.$toast.clear();
            }).catch(err => {
                this.$toast.clear();
            })
        }
    },
    mounted() {
        if(this.$route.query.id){
            this.查询地址()
        }
    },
}
</script>

<style lang="scss" scoped>
.address {
    padding: 46px 0px 0px;
}
.form {
    // background: #fff;
    margin: 20px 0px 0px;
    .input-2 {
        flex-wrap: wrap;
        /deep/ .van-field__body {
            border-bottom: 1px solid #ebedf0;
        }
        /deep/ .van-cell__title {
            width: 100%;
            flex: auto;
        }
        /deep/ .van-cell::after {
            display: none;
        }
    }
    .title-1 {
        padding: 0px 16px;
        font-size: 14px;
    }
    
}
</style>