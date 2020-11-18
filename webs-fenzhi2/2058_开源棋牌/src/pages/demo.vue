<template>
    <div>
         <h3>{{$store.state.测试}}</h3>
         <button  @click="加加(1)">加加</button>
         <button @click="减减(1)">减减</button>
          <button @click="异步减少(1)">异步减少</button>
         <button @click="异步增加(1)">异步增加</button>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
      加加(n){
          this.$store.commit("加加",n)
      },
      减减(n){
          this.$store.commit("减减",n)
      },
      异步增加(n){
          this.$store.dispatch('异步加加',n)
      },
       异步减少(n){
          this.$store.dispatch('异步减减',n)
      }
    }
}
</script>

<style>
    
</style>