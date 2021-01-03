<template>
  <div>
    <el-dialog title :visible.sync="info.isshow" @opened="opened">
      <el-form :model="user">
        <div>user:{{user}}</div>
        <el-form-item label="一级分类" label-width="100px">
          <el-select v-model="user.first_cateid" @change="changeFirstCateId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="100px">
          <el-select v-model="user.second_cateid">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="user.goodsname"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="100px">
          <el-input v-model="user.price"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="100px">
          <el-input v-model="user.market_price"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="100px">
          <div class="my-upload">
            <div class="add">+</div>
            <img class="img" v-if="imgUrl" :src="imgUrl" alt />
            <input type="file" class="ipt" @change="changeImg" />
          </div>
        </el-form-item>
        <el-form-item label="商品规格" label-width="100px">
          <el-select v-model="user.specsid" @change="changeSpecsId">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格属性" label-width="100px">
          <el-select multiple v-model="user.specsattr">
            <el-option label="--请选择--" value disabled></el-option>
            <el-option v-for="item in showSpecsAttr" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="100px">
          <el-radio v-model="user.isnew" :label="1">是</el-radio>
          <el-radio v-model="user.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="100px">
          <el-radio v-model="user.ishot" :label="1">是</el-radio>
          <el-radio v-model="user.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="100px">
          <el-switch v-model="user.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="100px">
          <textarea v-model="user.description" cols="30" rows="10"></textarea>
          <!-- 富文本编辑器 -->
          <div id="editor"></div>
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
import { mapActions, mapGetters } from "vuex";
import {
  reqcateList,
  reqgoodsAdd,
  reqgoodsDetail,
  reqgoodsUpdate,
} from "../../../utils/http";
import { erroralert, successalert } from "../../../utils/alert";
import path from "path";
import E from "wangeditor";
export default {
  props: ["info"],
  data() {
    return {
      user: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      imgUrl: "",
      //二级分类
      secondCateList: [],
      //规格
      showSpecsAttr: [],
    };
  },
  computed: {
    ...mapGetters({
      cateList: "cate/list",
      specsList: "specs/list",
    }),
  },
  methods: {
    ...mapActions({
      reqcateList: "cate/reqList",
      reqSpecsList: "specs/reqList",
      reqList: "goods/reqList",
      reqTotal: "goods/reqTotal",
    }),
    opened() {
      this.editor = new E("#editor");
      this.editor.create();
      this.editor.txt.html(this.user.description);
    },
    changeFirstCateId() {
      this.user.second_cateid = "";
      this.getSecondList();
    },
    getSecondList() {
      reqcateList({ pid: this.user.first_cateid }).then((res) => {
        if (res.data.code == 200) {
          this.secondCateList = res.data.list;
        }
      });
    },
    changeSpecsId() {
      this.user.specsattr = [];
      //计算出规格属性展示的所有选项的列表
      this.getShowSpecsAttr();
    },
    //规格属性
    getShowSpecsAttr() {
      let obj = this.specsList.find((item) => item.id == this.user.specsid);
      this.showSpecsAttr = obj ? obj.attrs : [];
    },
    changeImg(e) {
      let file = e.target.files[0];
      //文件大小验证 1M=1024KB 1KB=1024B
      if (file.size > 2 * 1024 * 1024) {
        erroralert("文件大小不能超过2M");
        return;
      }
      //后缀名
      let extname = path.extname(file.name);
      let arr = [".png", ".gif", ".jpg", ".jpeg"];
      if (!arr.some((item) => item === extname)) {
        erroralert("请上传图片");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);
      this.user.img = file;
    },
    cancel() {
      if (!this.info.isadd) {
        this.empty();
      }
      this.info.isshow = false;
    },
    empty() {
      this.user = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [], //后端要的是数组字符串，所以在发请求之前，需要JSON.stringify()
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      this.imgUrl = "";
      //二级分类的列表
      this.secondCateList = [];
      // 规格属性展示的所有选项的列表
      this.showSpecsAttr = [];
    },
    add() {
      this.checkProps().then(() => {
        this.user.description = this.editor.txt.html();
        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };
        //发请求
        reqgoodsAdd(data).then((res) => {
          if (res.data.code == 200) {
            //1.弹框消失
            this.cancel();
            //2.数据清空
            this.empty();
            //3.弹成功
            successalert(res.data.msg);
            //4.刷新list
            this.reqList();
            this.reqTotal();
          }
        });
      });
    },
    getOne(id) {
      reqgoodsDetail({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.user = res.data.list;
          //重新获取二级分类的list
          this.getSecondList();
          //图片
          this.imgUrl = this.$pre + this.user.img;
          //规格属性展示list
          this.getShowSpecsAttr();
          //规格属性选中的list
          this.user.specsattr = JSON.parse(this.user.specsattr);
          //补id
          this.user.id = id;
          //将user.desctiption赋值给富文本编辑器
          if (this.editor) {
            this.editor.txt.html(this.user.description);
          }
        }
      });
    },
    //封装的验证
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
        if (this.user.goodsname === "") {
          erroralert("商品名称不能为空");
          return;
        }

        if (this.user.price === "") {
          erroralert("商品价格不能为空");
          return;
        }

        if (this.user.market_price === "") {
          erroralert("商品市场价格不能为空");
          return;
        }

        if (!this.user.img) {
          erroralert("请上传图片");
          return;
        }
        if (this.user.specsid === "") {
          erroralert("商品规格不能为空");
          return;
        }

        if (this.user.specsattr.length === 0) {
          erroralert("请选择规格属性");
          return;
        }
        if (this.editor.txt.html() == "") {
          erroralert("请输入商品描述");
          return;
        }
        resolve();
      });
    },
    //修改
    update() {
      this.checkProps().then(() => {
        //取出富文本编辑器的内容，赋值给user
        this.user.description = this.editor.txt.html();
        let data = {
          ...this.user,
          specsattr: JSON.stringify(this.user.specsattr),
        };
        reqgoodsUpdate(data).then((res) => {
          if (res.data.code == 200) {
            //1.弹框消失
            this.cancel();
            //2.数据清空
            this.empty();
            //3.弹成功
            successalert(res.data.msg);
            //4.刷新list
            this.reqList();
          }
        });
      });
    },
  },
  mounted() {
    if (this.cateList.length === 0) {
      this.reqcateList();
    }
    //请求规格
    this.reqSpecsList(true);
  },
};
</script>

<style scoped>
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #999;
  position: relative;
}
.my-upload .add {
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  font-size: 30px;
  color: #666;
}
.my-upload .ipt {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}
.my-upload .img {
  width: 100px;
  height: 100px;
  position: absolute;
  left: 0;
  top: 0;
}
</style>