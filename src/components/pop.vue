<template>
<div class="bg">
    <div class="pop">
        <h1>{{type}}</h1>
        <ul v-if='pdata!=""'>
            <li v-for="(item,index) in pdata" :key='index'>
              {{index+1}}  姓名：{{item.name}}   年龄：{{item.ege}}   职业：{{item.jop}}
            </li>
        </ul>
        <img :src='img'>
        <div class="close" @click="close">x</div>
        <div v-for="item in apidata.result" :key="item.index">
            <img :src='item.header'/>
            <div>{{item.name}}</div>
            <div>{{item.text}}</div>
        </div>
    </div>

    <template>
      <div>
      <h1>login</h1>
      <router-link to="/"><button>home</button></router-link>
      <button @click="flag=true">查看详细</button>
        <pop :pdata='popdata' :type='type' :apidata='adata'   v-show="flag" @childclose="close"></pop>
      </div>
</template>
</div>
</template>
<script>
export default {
  data() {
    return {
      msg: false
    }
  },
  props: { pdata: {}, type: {}, img: {}, apidata: {} },
  methods: {
    close() {
      this.$emit("childclose", this.msg)
    }
  }
}
</script>

<script>
import pop from '@/components/pop'
export default {
  data() {
    return {
      popdata: [
        { name: "张三", age: 18, jop: '渣渣' },
        { name: "李四", age: 128, jop: '程序员' },
        { name: "王五", age: 183, jop: '金叉' },
        { name: "赵六", age: 11, jop: '小偷' },

      ],
      type: 'login',
      flag: false,
      adata: ''
    };
  },
  created() {
    this.$axios.post('https://api.apiopen.top/getJoke?page=1&count=2&type=video').then(res => {
      console.log(res.data)
      this.adata = res.data
    })
  },
  components: {
    pop
  },
  methods: {
    close(data) {
      this.flag = data
    }
  }
};
</script>
