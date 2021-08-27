<template>
    <div>
        <navigation />
        <topSwiper />
        <kittenType :tid="kitten.kittenTypeId"/>

        <div class="cat_tit">
            <h2>{{kitten.name}}</h2>
            <div class="des">
                <span v-show="kitten.sex">性别：{{kitten.sex}}</span>
                <span v-show="kitten.age">年龄：{{kitten.age}}</span>
                <span v-show="kitten.color">毛色：{{kitten.color}}</span>
                <span v-show="kitten.hair">毛长：{{kitten.hair}}</span>
                <br>
                <span v-show="kitten.vaccine">疫苗：{{kitten.vaccine}}</span>
                <span v-show="kitten.chip">芯片：{{kitten.chip}}</span>
            </div>
        </div>
        <div class="cover">
            <img v-if="kitten.cover" :src="`${$api_url}/tmm/public/storage/${kitten.cover}`" >
        </div>

        <div class="tit_pron">
            <p>猫咪详情</p>
        </div>

        <div class="content_cat">
            <p v-for="item in kitten.img_list">
                <img :src="`${$api_url}/tmm/public/storage/${item.imgUrl}`" style="">
            </p>
            <p><br></p>
        </div>

        <footer1 />
    </div>
</template>

<script>

import navigation from '@/components/navigation.vue'
import topSwiper from '@/components/topSwiper.vue'
import kittenType from './components/猫咪类别.vue'
import footer1 from '@/components/footer.vue'
export default {
    name: '',
    components: {
        navigation,
        topSwiper,
        kittenType,
        footer1
    },
    data() {
        return {
            kitten:{}
        }
    },
    computed: {
        id(){
            return this.$route.query.id
        }
    },
    methods: {
        getKitten(){
            this.$axios.post('Kitten/getKittenById',{id:this.id}).then(res => {
                if(res.data.code==1)
                this.kitten = res.data.data
            }).catch(err => {})
        }
    },
    mounted() {
        this.getKitten()

    },
}
</script>

<style lang="scss" scoped>
.cat_tit {
    text-align: center;
    padding: 20px 15px;
    h2 {
        font-size: 28px;
        color: #666;
        line-height: 50px;
        font-weight: 400;
        margin: 0px;
    }
    .des {
        margin-top: 15px;
        padding: 10px;
        border-radius: 8px;
        color: #999;
        background: #f9f9f9;
        font-size: 14px;
        line-height: 25px;
        span{
            margin: 0px 4px;
        }
    }
}
.cover {
    padding: 0 20px;
    img {
        width: 100%;
    }
}
.tit_pron {
    border-bottom: 1px solid #eee;
    p {
        width: 132px;
        height: 40px;
        margin: 10px auto 0px;
        padding: 0 0 8px 0;
        background: #e1a85b;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
    }
}
.content_cat{
    margin: 10px 2%;
    img{
        width: 100%;
    }
}
</style>
