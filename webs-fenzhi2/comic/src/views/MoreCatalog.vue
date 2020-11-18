<template>
<div>
    <topHeader title="全部章节"/>
    <div class="全部章节">
        <router-link class="单个章节" tag="div" :to="{path:'/comic',query:{id:item.id}}" v-for="(item,index) in 全部章节" :key="index">
            {{item.name}}
        </router-link>
    </div>
</div>
</template>

<script>
import topHeader from "@/components/header.vue"
import {
    api_漫画章节
} from "@/api/api.js"
export default {
    data() {
        return {
            全部章节: ''
        }
    },
    methods: {
        漫画章节() {
            var mhzj = {
                wenZhangId: this.$route.query.id
            }
            api_漫画章节(mhzj).then(x => {
                console.log(x.data);
                this.全部章节 = x.data
            })
        }
    },
    mounted() {
        this.漫画章节()
    },
     components: {
        topHeader,
    },
}
</script>

<style scoped>
.全部章节 {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-evenly;
}

.单个章节 {
    width: 30%;
    height: 47px;
    border: 1px solid #C5C5C5;
    margin-top: 10px;
    text-align: center;
    line-height: 47px;
}

</style>
