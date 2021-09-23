import Vue from "vue";
import Vant from 'vant';
Vue.use(Vant);
import 'vant/lib/index.css';
import Loading from "./index.vue"


const LoadingBox = Vue.extend(Loading)

Loading.install = ()=>{
    let instance = new LoadingBox().$mount()
    instance.append = ()=>{
        document.body.appendChild(instance.$el)
    }
    instance.remove=()=>{
        document.body.removeChild(instance.$el)
    }
    return instance
}

// export default Loading

let instance = new LoadingBox().$mount()
        document.body.appendChild(instance.$el)
export default instance;