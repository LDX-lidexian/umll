<template>
  <div>
    <el-button type="primary" @click="addOpen">添加</el-button>
    <v-list :list="list" @init="init" @edit="edit($event)" :info="info"></v-list>
    <v-add :info="info" :list="list" @init="init" ref="add"></v-add>
  </div>
</template>

<script>
import vList from "./components/list";
import vAdd from "./components/add";
import { reqRoleList } from "../../utils/http";
// import Public from "../../public";

export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        isadd: true,
      },
      list: [],
    };
  },
  methods: {
    addOpen() {
      this.info.isshow = true;
      this.info.isadd = true
    },
    // 刷新列表信息
    init() {
      reqRoleList().then((res) => {
        if (res.data.code == 200) {
          this.list = res.data.list;
        }
      });
    },
    //触发编辑
    edit(id) {
      //弹框出现
      this.info.isshow = true;
      //触发add的getOne
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