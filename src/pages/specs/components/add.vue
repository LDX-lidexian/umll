<template>
  <div>
    <el-dialog :visible.sync="info.isshow">
      <el-form :model="user">
        <div>user:{{user}}</div>
        <!-- <div>attrsArr:{{}}</div> -->
        <el-form-item label="规格名称" label-width="100px">
          <el-input v-model="user.specsname"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          label-width="100px"
          v-for="(item,index) in attrsArr"
          :key="index"
        >
          <div class="line">
            <el-input class="line-ipt" v-model="item.value"></el-input>
            <el-button type="primary" class="line-btn" v-if="index==0" @click="addAttr">新增规格属性</el-button>
            <el-button type="danger" class="line-btn" v-else @click="delAttr(index)">删除</el-button>
          </div>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reqspecsAdd,
  reqspecsDetail,
  reqspecsUpdate,
} from "../../../utils/http";
import { successalert } from "../../../utils/alert";
import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
      attrsArr: [{ value: "" }],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
    }),
    addAttr() {
      this.attrsArr.push({ value: "" });
    },
    delAttr(index) {
      this.attrsArr.splice(index, 1);
    },
    empty() {
      this.user = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.attrsArr = [{ value: "" }];
    },
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    add() {
      this.user.attrs = JSON.stringify(this.attrsArr.map((item) => item.value));
      reqspecsAdd(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          //刷新列表
          this.reqList();
        }
      });
    },
    getOne(id) {
      reqspecsDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list[0];
          this.user.attrs = JSON.parse(this.user.attrs);
          this.attrsArr = this.user.attrs.map((item) => ({ value: item }));
        }
      });
    },
    update() {
      this.user.attrs = JSON.stringify(this.attrsArr.map((item) => item.value));
      reqspecsUpdate(this.user).then((res) => {
        if (res.data.code == 200) {
          successalert(res.data.msg);
          this.cancel();
          this.empty();
          //刷新列表
          this.reqList();
        }
      });
    },
  },
};
</script>

<style scoped>
.line {
  display: flex;
}
.line-btn {
  width: auto;
}
.line-ipt {
  flex: 1;
}
</style>