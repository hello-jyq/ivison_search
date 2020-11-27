<template>
    <div class="result_box">
        <div :class="isCollapse?'result_filter_all':'result_filter'"></div>
        <div  class="container">
         <el-row class="search_box">
            <el-col :span="24">             
                <el-autocomplete
                  class="inline-input "
                  v-model="searchs"
                  :fetch-suggestions="querySearch"
                  placeholder="请输入您想要搜索的内容"
                  :trigger-on-focus="false"
                  popper-class="search_input"
                >
                <i slot="prefix" class="iconfont icon-sousuo1"></i>
                <el-button slot="suffix" @click="search">搜&nbsp;&nbsp;索</el-button>
              </el-autocomplete>
            </el-col>
            <el-col :span="24" class="flex_ceter" style="height:24px;line-height:24px">
              <span class="font_size_14 fontC_333">搜索条件：</span>
              <el-radio-group v-model="radio">
                <el-radio label="all">不限</el-radio>
                <el-radio label="fileName">文件名</el-radio>
                <el-radio label="fileCon">文件内容</el-radio>
              </el-radio-group>
              <el-select v-model="lang" placeholder="所有语言" placement="top-end" @change="getLang" popper-class="lang_select">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
          </el-row>   
       
         <div class="main_box"></div>     
        </div>
    </div>
</template>
<script>

export default {
  data() {
    return {
      restaurants: [{ value: '1' }, { value: '21' }, { value: '311贝斯1' }, { value: '43123' }, { value: '5' }, { value: '贝斯无锡1' }, { value: '贝斯无锡信息系统' }, { value: '73123' }, { value: '8' }],
      searchs: this.$route.query.search,
      radio: this.$route.query.radio,
      lang: this.$route.query.lang,
      options: [{
        value: 'cn',
        label: '中文'
      }, {
        value: 'en',
        label: '英文'
      }, {
        value: 'ja',
        label: '日文'
      }],
      isCollapse: false
    }
  },
  watch: {
    // isCollapse=sessionStorage.getItem('isCollapse'),
  },
  created() {
    console.log(this.$route.query)
    window.addEventListener('setItem', () => {
      this.isCollapse = sessionStorage.getItem('formState');
    })
  },

  methods: {
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().includes(queryString.toLowerCase()) === true);
      };
    },
    getLang(value) {
      this.lang = value
    },
    search() {

    }
  }

}
</script>
<style scoped>
.search_box {
  height: 164px;
  margin-bottom: 20px;
  background: #FFFFFF;
  box-shadow: 0px 2px 10px 0px rgba(68, 100, 163, 0.1);
  border-radius: 16px;
}
.main_box {
  height: calc(100vh - 248px);
  box-shadow: 0px 2px 10px 0px rgba(68, 100, 163, 0.1);
  background: #FFFFFF;
  border-radius: 16px;
  overflow: hidden;
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  box-sizing: border-box;
}
.inline-input {
  width: 100%;
  padding: 40px 30px 20px;
}
.icon-sousuo1 {
  line-height: 50px;
}
.search_box .el-button {
  width: 160px;
  height: 50px;
  background: linear-gradient(180deg, #475BA0 0%, #2FA5BB 100%);
  border-radius: 25px;
  margin-right: -5px;
  color: #FFFFFF;
  font-size: 16px;
  font-family: "微软雅黑";
  border: none;
}
</style>