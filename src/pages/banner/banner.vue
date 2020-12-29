<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>
    <v-list :list="list" @init="init" @edit="edit($event)"></v-list>
    <v-add :info="info" :init="init" :list="list" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list"
import vAdd from "./components/add";
import { reqbannerList } from "../../utils/http";

export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      //弹框状态
      info: {
        isshow: false,
        isadd: true,
      },
      //初始化列表数据
      list: [],
    };
  },
  methods: {
    //点击添加按钮
    willAdd() {
      this.info.isshow = true;
      this.info.isadd = true;
    },
    //获取列表数据
    init() {
      reqbannerList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    edit(id) {
      this.info.isshow = true;
      this.info.isadd = false;
      this.$refs.add.getOne(id);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style>
</style>