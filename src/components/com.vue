<template>
    <div>
        <h4>子组件</h4>
        <ul>
            <li v-for="(item,index,key) in data" :key="index">{{item}}{{key}}</li>
        </ul>
        <template>
  <div>
    <h1>Home</h1>
    <router-link to='/login'><button>登陆</button></router-link>
    <com :data='con'></com>
    <button @click="flag=true">展示自己</button>
    <pop :type='type' :img='img' @childclose="childclose" v-show='flag'></pop>
      <div class="main">
            <router-view/>
        </div>
  </div>
</template>
    </div>
    
</template>
<script>
export default {
  data() {
    return {

    }

  },
  props: ['data']
}
</script>


<script>
import com from '@/components/com'
import pop from '@/components/pop'
export default {
  data() {
    return {
      con: [{ a: 1 }, { b: 2 }, { c: 1 }, { d: 2 }, { e: 1 }, { f: 1 },],
      flag: false,
      type: '首页',
      img: 'https://cdn.istt.info/images/CPC/2/CofffeLake-DefaultImage.jpg'
    };
  },
  components: {
    com,
    pop
  },
  methods: {
    childclose(e) {
      this.flag = e
    }
  }
};
</script>

<style scoped>
button {
  width: 100px;
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  background: chartreuse;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  animation: dong 2s infinite;
}
@keyframes dong {
  0% {
    background-color: #FFFAFA;
  }
  10% {
    background-color: #5cffec;
  }
  20% {
    background-color: #69ff5c;
  }
  30% {
    background-color: #cce28d;
  }
  40% {
    background-color: #565412;
  }
  50% {
    background-color: #e2af8d;
  }
  60% {
    background-color: #ff8d5c;
  }
  80% {
    background-color: #ff5c79;
  }
  90% {
    background-color: #ff5cc8;
  }
  100% {
    background-color: #ba5cff;
  }
}
</style>
