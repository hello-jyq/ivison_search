<template>
    <div class="result_box">
        <div :class="isCollapse?'result_DIY result_filter_all':'result_DIY result_filter'">
          <div class="title_box">
            <ul>
              <li v-for="(item,index) in 5" :key="index" :class="active==index?'active':''" @click="active=index">文件服务器{{index+1}}</li>
            </ul>
          </div>
          <div class="con_box" :class="active==index?'show':''" v-for="(item,index) in 5" :key="item.index">
            <div class="left_result">
              <div class="search_num" @click="istree=!istree">
                <i class="iconfont icon-sousuo2" />
                <span>搜索结果数量</span>
                <i class="iconfont icon-ai-arrow-down"></i>
              </div>     
              <el-tree
              v-show="istree"
                :data="data"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[2, 5]"
                :default-checked-keys="[1]"
                :default-expand-all="istree"
                icon-class="iconfont icon-jiantou-copy"
                ref="ProjectTree"
                >             
              </el-tree>

              <div class="search_num" style="margin-top:30px" @click="ischeck=!ischeck">
                  <i class="iconfont icon-duomeitiicon-" />
                  <span>文档类型</span>
                  <i class="iconfont icon-ai-arrow-down"></i>
              </div>
              <el-checkbox-group v-model="filecheckList" v-show='ischeck'>
                <el-checkbox label="Word (11)"></el-checkbox>
                <el-checkbox label="Excel (12)"></el-checkbox>
                <el-checkbox label="PowerPoint (22)"></el-checkbox>
                <el-checkbox label="Adobe Acrobat PDF (44)"></el-checkbox>
                <el-checkbox label="文本类 (54)"></el-checkbox>
                <el-checkbox label="图像类 (77)"></el-checkbox>
                <el-checkbox label="压缩类 (22)"></el-checkbox>
                <el-checkbox label="媒体类 (54)"></el-checkbox>
                <el-checkbox label="其他类型 (7997)"></el-checkbox>
              </el-checkbox-group> 
        
              <div class="search_num" style="margin-top:30px" @click="isradio=!isradio">
                  <i class="iconfont icon-shijian" />
                  <span>更新时间</span>
                  <i class="iconfont icon-ai-arrow-down"></i>
              </div>
              <el-radio-group v-model="radioList" v-show="isradio">
                  <el-radio :label="1">一天内 (33)</el-radio>
                  <el-radio :label="2">一周内 (33)</el-radio>
                  <el-radio :label="3">一月内 (66)</el-radio>
                  <el-radio :label="4">半年内 (33)</el-radio>
                  <el-radio :label="5">一年内 (55)</el-radio>
                  <el-radio :label="6">自定义时间</el-radio>
               </el-radio-group>
              <div class="block" v-show="isradio">        
                  <el-date-picker
                    v-model="radiotime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
              </div>

                <div class="search_num" style="margin-top:30px" @click="issize=!issize">
                  <i class="iconfont icon-daxiao" />
                  <span>文件大小</span>
                  <i class="iconfont icon-ai-arrow-down"></i>
                </div>
                <el-checkbox-group v-model="sizecheckList" v-show='issize'>
                  <el-checkbox label="100K - 500K (33)"></el-checkbox>
                  <el-checkbox label="500K - 1M (33)"></el-checkbox>
                  <el-checkbox label="1M - 100M (33)"></el-checkbox>
                  <el-checkbox label="100M以上 (33)"></el-checkbox>
                  <el-checkbox label="自定义大小"></el-checkbox>
                </el-checkbox-group> 
                <div class="diy_size"  v-show='issize'>
                  <el-input
                  class="from"
                    placeholder="请输入数值"
                    prefix-icon="iconfont icon-daxiao"
                    v-model="diysizefrom">
                  </el-input>
                  <span class="zhi">至</span>
                  <el-input
                   class="to"
                    placeholder="请输入数值"
                    v-model="diysizeto">
                  </el-input>
                </div>
            </div>
            <el-row type="flex" justify="space-around" style="margin-top:20px;margin-right:20px">
              <el-button round icon="iconfont icon-refresh">重置</el-button>
              <el-button type="primary" round icon="iconfont icon-queding">确定</el-button>
            </el-row>
          </div>
        </div>
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
       
         <div class="main_box">
            <div class="result_header">
              <span>找到约41,300条结果(用时0.55秒)</span>
              <div class="result_header_filter">
                  结果排序：<span @click="isrelativity=!isrelativity">相关度<i class="iconfont icon-xuanze" :class="isrelativity?'icon_active':''"/></span><span  @click="istime=!istime">时间<i class="iconfont icon-xuanze" :class="istime?'icon_active':''"/></span>
                  <div class="pop_btn"><i class="iconfont icon-sousuo2"/></div>
              </div>
             
            </div>
             <div class="result_main">
                <div class="each_reult">
                  <div class="each_r_top"></div>
                  <div class="each_r_title" @click="centerDialogVisible = true"></div>
                  <div class="each_r_con"></div>
                  <div class="each_r_url"></div>
                  <div class="each_r_lable"></div>
                </div>
                <div class="each_reult">
                  <div class="each_r_top"></div>
                  <div class="each_r_title" @click="centerDialogVisible = true"></div>
                  <div class="each_r_con"></div>
                  <div class="each_r_url"></div>
                  <div class="each_r_lable"></div>
                </div>
                <div class="each_reult">
                  <div class="each_r_top"></div>
                  <div class="each_r_title" @click="centerDialogVisible = true"></div>
                  <div class="each_r_con"></div>
                  <div class="each_r_url"></div>
                  <div class="each_r_lable"></div>
                </div>
             </div>
          </div>     
        </div>
        <el-dialog
          title="提示"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
          <span>需要注意的是内容是默认不居中的</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
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
      centerDialogVisible: false,
      active: 1,
      data: [{
        id: 1,
        label: '一级 2 (4)',
        children: [{
          id: 3,
          label: '二级 2-1 (3)',
          children: [{
            id: 4,
            label: '三级 3-1-1 (2)',
            children: [{
              id: 9,
              label: '四级 4-1-1'
            }, {
              id: 10,
              label: '四级 4-1-2'
            }, {
              id: 11,
              label: '四级 4-1-3',
              disabled: true
            }, {
              id: 12,
              label: '四级 4-1-4 (1)',
              children: [{
                id: 14,
                label: '五级 5-4-1'
              }, {
                id: 15,
                label: '五级 5-4-2',
                disabled: true
              }]
            }, {
              id: 13,
              label: '四级 4-1-5',
              disabled: true
            }]
          }, {
            id: 5,
            label: '三级 3-1-2',
            disabled: true
          }]
        }, {
          id: 2,
          label: '二级 2-2 (1)',
          disabled: true,
          children: [{
            id: 6,
            label: '三级 3-2-1'
          }, {
            id: 7,
            label: '三级 3-2-2',
            disabled: true
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      istree: true,
      ischeck: true,
      isradio: true,
      issize: true,
      filecheckList: ['Word (11)', '图像类 (77)'],
      radioList: 4,
      radiotime: '',
      sizecheckList: ['500K - 1M (33)', '100M以上 (33)'],
      diysizefrom: '',
      diysizeto: '',
      isrelativity: '',
      istime: ''
      // isCollapse: this.$store.state.falg
    }
  },

  created() {
    console.log(this.$route.query)
    // console.log('搜索', this.$store.state.falg)
  },
  computed: {
    isCollapse() {
      return this.$store.state.falg
    }
  },
  methods: {
    search() {

    },
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
    closeTree() {

      // var nodes = this.$refs.ProjectTree[1].store.nodesMap;
      // for (var i in nodes) {
      //   nodes[i].expanded = false;
      // }
      // var nodes = this.$refs.ProjectTree
      // for (var i in this.$refs.ProjectTree) {
      //   var item = nodes[i].store.nodesMap
      //   for (var e in nodes[i].store.nodesMap) {
      //     item[e].expanded = bool;
      //   }
      // }

    }
  }

}
</script>
<style scoped>
.search_box {
  height: 164px;
  margin-bottom: 20px;
  background: #ffffff;
  box-shadow: 0px 2px 10px 0px rgba(68, 100, 163, 0.1);
  border-radius: 16px;
}
.main_box {
  height: calc(100vh - 308px);
  box-shadow: 0px 2px 10px 0px rgba(68, 100, 163, 0.1);
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  flex: 1;
  display: flex;
  justify-content: space-between;
  padding: 30px;
  box-sizing: border-box;
  flex-direction: column;
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
  background: linear-gradient(180deg, #475ba0 0%, #2fa5bb 100%);
  border-radius: 25px;
  margin-right: -5px;
  color: #ffffff;
  font-size: 16px;
  font-family: "微软雅黑";
  border: none;
}
.title_box {
  height: 30px;
  box-shadow: 0px 2px 4px 1px rgba(45, 122, 156, 0.2);
}
.con_box {
  height: calc(100vh - 114px);
  padding: 20px 0 20px 20px;
  display: none;
  box-sizing: border-box;
  overflow: hidden;
}
.left_result {
  height: calc(100% - 60px);
  overflow: auto;
}
.title_box li {
  width: 44px;
  height: 30px;
  float: left;
  font-size: 14px;
  font-family: "微软雅黑";
  color: #999999;
  line-height: 30px;
  padding: 0 2px;
  text-align: center;
  box-shadow: 0px 2px 4px 1px rgba(45, 122, 156, 0.2);
  border-radius: 6px 6px 0px 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
}
.title_box li.active {
  width: 104px;
  background: #2d7a9c;
  box-shadow: 0px 2px 4px 1px rgba(45, 122, 156, 0.2);
  border-radius: 6px 6px 0px 0px;
  font-family: "微软雅黑";
  color: #ffffff;
}
.result_filter_all .title_box li {
  width: 100px;
  height: 30px;
}
.result_filter_all .title_box li.active {
  width: 100px;
  background: #2d7a9c;
  box-shadow: 0px 2px 4px 1px rgba(45, 122, 156, 0.2);
  border-radius: 6px 6px 0px 0px;
  font-family: "微软雅黑";
  color: #ffffff;
}
.search_num {
  height: 20px;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.search_num span {
  font-size: 14px;
  font-family: "微软雅黑";
  color: #333333;
  line-height: 19px;
}
.search_num .icon-sousuo2 {
  font-size: 22px;
  line-height: 19px;
  margin-right: 2px;
  margin-left: -2px;
}
.search_num .icon-ai-arrow-down {
  font-size: 12px;
  margin-left: 6px;
  margin-top: 5px;
}
.icon-duomeitiicon- {
  margin-right: 6px;
}
.icon-shijian {
  font-size: 14px;
  margin-right: 6px;
}
.icon-daxiao {
  margin-right: 6px;
}
.result_header {
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #eeeeee;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: #666666;
  line-height: 45px;
  display: flex;
  justify-content: space-between;
}
.result_header .result_header_filter span {
  margin-right: 35px;
  cursor: pointer;
}
.result_header span i {
  margin-left: 5px;
}
.pop_btn {
  width: 40px;
  height: 40px;
  float: right;
  background: #2d7a9c;
  border-radius: 50%;
  margin-top: -15px;
  box-shadow: 0px 6px 10px 0px rgba(45, 122, 156, 0.25);
  text-align: center;
  line-height: 40px;
  cursor: pointer;
}
.pop_btn .icon-sousuo2 {
  color: #fff;
  font-size: 28px;
}
.result_main {
  width: 100%;
  flex: 1;
  overflow: auto;
}
.each_reult {
  padding: 30px 0;
  width: 100%;
  height: auto;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
}
.each_r_top {
  background-color: darkcyan;
  height: 16px;
}
.each_r_title {
  margin-top: 15px;
  height: 25px;
  background-color: darkgoldenrod;
}
.each_r_con {
  margin-top: 20px;
  height: 40px;
  background-color: darkorchid;
}
.each_r_url {
  margin-top: 15px;
  height: 15px;
  background-color: darkseagreen;
}
.each_r_lable {
  margin-top: 20px;
  height: 55px;
  background-color: deepskyblue;
}
</style>