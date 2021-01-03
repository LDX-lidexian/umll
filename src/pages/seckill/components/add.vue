<template>
  <div>
    <el-dialog :visible.sync="info.isshow">
      <el-form label-width="80px">
        <div>{{user}}</div>
        {{value1}}
        <!-- 活动名称 -->
        <el-form-item label="活动名称" label-width="100px">
          <el-input v-model="user.title"></el-input>
        </el-form-item>
        <!-- 活动期限 -->
        <div class="block hdTime">
          <span class="demonstration">活动期限</span>
          <el-date-picker
            v-model="value1"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="timestamp"
          ></el-date-picker>
        </div>
        <!-- <el-form-item label="活动期限" class="hdTime">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="开始日期"
              v-model="user.begintime"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">至</el-col>
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="结束日期"
              v-model="user.endtime"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>-->
        <!-- 一级分类 -->
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirstCateId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid" @change="changeTwoCateId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :value="item.id"
              :label="item.catename"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品 -->
        <el-form-item label="商品" label-width="100px">
          <el-select v-model="user.goodsid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in goodsArr"
              :key="item.id"
              :value="item.id"
              :label="item.goodsname"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <!-- 添加/修改 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isadd">添 加</el-button>
        <el-button type="primary" @click="update" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {
  reqcateList,
  reqgoodsDetail,
  reqgoodslist,
  reqseckillAdd,
  reqseckillInfo,
  reqseckillEdit,
} from "../../../utils/http";
import { erroralert, successalert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: "本月",
            onClick(picker) {
              picker.$emit("pick", [new Date(), new Date()]);
            },
          },
          {
            text: "今年至今",
            onClick(picker) {
              const end = new Date();
              const start = new Date(new Date().getFullYear(), 0);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近六个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 6);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      value1: "",
      user: {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      },
      secondCateList: [],
      //三级
      goodsArr: [],
    };
  },
  computed: {
    ...mapGetters({
      //一级分类
      cateList: "cate/list",
      goodsList: "goods/list",
    }),
  },
  methods: {
    ...mapActions({
      //一级分类
      reqCateList: "cate/reqList",
      reqGoodsList: "goods/reqList",
      reqSeckillList: "seckill/reqList",
    }),
    time() {
      this.user.begintime = this.value1[0] + "";
      this.user.endtime = this.value1[1] + "";
    },
    //修改一级
    changeFirstCateId() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    //二级分类
    getSecondList() {
      //根据一级分类，计算出二级分类的list
      reqcateList({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    //修改二级
    changeTwoCateId() {
      this.user.goodsid = "";
      this.getGoodsList();
    },
    getGoodsList() {
      //三级商品名称
      //   let obj = this.goodsList.find((item) => item.id == this.user.goodsid);
      //   this.goodsArr = obj;
      reqgoodslist({
        fid: this.user.first_cateid,
        sid: this.user.second_cateid,
      }).then((res) => {
        if (res.data.code == 200) {
          this.goodsArr = res.data.list;
        }
      });
    },
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        title: "",
        begintime: "",
        endtime: "",
        first_cateid: "",
        second_cateid: "",
        goodsid: "",
        status: 1,
      };
      this.secondCateList = [];
      this.goodsArr = [];
    },
    checkProps() {
      return new Promise((resolve, reject) => {
        if (this.user.first_cateid === "") {
          erroralert("一级分类不能为空");
          return;
        }

        if (this.user.second_cateid === "") {
          erroralert("二级分类不能为空");
          return;
        }
        if (this.user.title === "") {
          erroralert("活动名称不能为空");
          return;
        }

        // if (this.user.begintime === "") {
        //   erroralert("开始时间不能为空");
        //   return;
        // }

        // if (this.user.endtime === "") {
        //   erroralert("结束时间不能为空");
        //   return;
        // }

        if (!this.user.goodsid) {
          erroralert("商品名称不能为空");
          return;
        }
        resolve();
      });
    },
    add() {
      this.checkProps().then(() => {
        this.user.begintime = this.value1[0] + "";
        this.user.endtime = this.value1[1] + "";
        reqseckillAdd(this.user).then((res) => {
          if (res.data.code == 200) {
            //1.弹框消失
            this.cancel();
            //2.数据清空
            this.empty();
            //3.弹成功
            successalert(res.data.msg);
            //4.刷新list
            this.reqSeckillList();
          }
        });
      });
    },
    getOne(id) {
      reqseckillInfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          this.user.begintime = Number(this.user.begintime);
          this.user.endtime = Number(this.user.endtime);
          //重新获取二级分类的list
          this.getSecondList();
          //规格属性展示list
          this.getGoodsList();
          //规格属性选中的list
          //   this.user.specsattr = JSON.parse(this.user.specsattr);
          //补id
          this.user.id = id;
          this.user.begintime = Number(this.user.begintime);
          this.user.endtime = Number(this.user.endtime);
        }
      });
    },
    update() {
      this.checkProps().then(() => {
        reqseckillEdit(this.user).then((res) => {
          if (res.data.code == 200) {
            this.time();
            //1.弹框消失
            this.cancel();
            //2.数据清空
            this.empty();
            //3.弹成功
            successalert(res.data.msg);
            //4.刷新list
            this.reqSeckillList();
          }
        });
      });
    },
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.reqCateList();
    }
    this.reqGoodsList();
  },
};
</script>

<style scoped>
.hdTime {
  margin-left: 32px;
  margin-bottom: 20px;
}
.demonstration {
  margin-right: 8px;
}
</style>