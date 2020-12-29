<template>
  <div>
    <el-dialog :visible.sync="info.isshow">
      <el-form :model="user">
        <el-form-item label="手机号" label-width="100px">
          <el-input v-model="user.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="100px">
          <el-input v-model="user.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input placeholder="请输入密码" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        {{user}}
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="qx">取 消</el-button>
        <el-button type="primary" @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reqmemberDetail, reqmemberUpdate } from "../../../utils/http";
import { successalert, erroralert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  methods: {
    getOne(uid) {
      reqmemberDetail({ uid: uid }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.uid = uid;
        }
      });
    },
    update() {
      if (this.user.password != "") {
        reqmemberUpdate(this.user).then((res) => {
          if (res.data.code == 200) {
            successalert(res.data.msg);
            this.info.isshow = false;
            this.$emit("init");
          }
        });
      }else{
          erroralert("密码不能为空")
      }
    },
    qx() {
      this.info.isshow = false;
    },
  },
};
</script>

<style>
</style>