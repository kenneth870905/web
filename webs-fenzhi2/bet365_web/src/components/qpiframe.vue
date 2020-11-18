<template>
    <div>
        <iframe :src="config.iframe_url+'/html/1/index.html?back=1'" frameborder="0"></iframe>
    </div>
</template>

<style >
iframe{
    width: 100%;
    height: 800px;
}
</style>
<script>
export default {
    data(){
        return{
            config:config
        }
    }
}
</script>