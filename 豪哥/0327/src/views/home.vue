<template>
    <div>
        

    </div>
</template>





<script setup>
import { ref } from "@vue/reactivity";
// import { computed } from "@vue/runtime-core";
import { useStore } from "vuex";
import { computed } from '@vue/runtime-core';

        const store = useStore()

        let userName = computed(()=>store.state.user.userName) 

        const commitTest=(name)=>{
            store.commit('user/mtest',1111111)
        }
        const actionsTest=(v)=>store.dispatch('user/setName',v)

</script>

<style lang="scss" scoped>

.a{
    font-size: 24px;
    span{
        color:red;
    }
}
</style>
