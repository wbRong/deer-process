<template>
  <div>
    <Header></Header>
    <div class="confirmOrder">
      <div class="bgColor">
        <h1 class="main-shopcart">确认订单</h1>
      </div>
      <div class="main">
        <div class="info">
          <div class="head">商品信息</div>
          <div class="info-main" v-for="item in courses" :key="item.id">
            <div class="courseInfo">
              <div class="coursebg">
                <img :src="item.courseCover" alt="" />
              </div>
              <div class="courseName">
                {{ item.courseName }}
              </div>
              <div class="coursePrice">
                <span class="nowprice">￥{{ item.discountPrice }}</span>
                <span class="oldprice">￥{{ item.salePrice }}</span>
              </div>
            </div>
          </div>
          <div class="choose">
            <h3>
              支付方式 <span class="pay">{{ description }}</span>
            </h3>
            <div class="choosebg">
              <span
                v-for="item in payModes"
                :key="item.wxpayment"
                @click="tabPayment(item)"
                >{{ item.description }}</span
              >
            </div>
          </div>
          <ul class="foot">
            <li class="foot-item">
              应付<span class="unique">￥{{ totalPrice }}</span>
            </li>
            <li>
              <button class="btn" @click="goPayment">确认订单</button>
            </li>
          </ul>
        </div>
      </div>
      <!-- 二维码对话框 -->
      <el-dialog v-model="dialogVisible" class="pay-dialog" width="500px">
        <div class="dialogPrice">
          支付：<span class="prices">{{ totalPrice }}元</span>
        </div>
        <div class="codeimg">
          <img :src="payurl" />
        </div>
        <div class="alert">请您及时付款，已便订单尽快处理！</div>
        <div class="finish">
          <div class="error">支付遇到问题</div>
          <div class="success">我已支付</div>
        </div>
      </el-dialog>
    </div>
    <Foot></Foot>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Foot from "@/components/Foot.vue";
import { ElMessage } from "element-plus";
//dialog
const dialogVisible = ref(false);
import { useCartStore } from "@/store/cart";
let cartStore = useCartStore();
import {
  settlement,
  alipayOrder,
  queryAlipay,
  deleteShopCars,
  createToken,
} from "@/api/index";

//商品总价
let totalPrice = ref(0);
//商品列表
let courses = ref([]);
//支付方式
let payModes = ref([]);
//当前支付方式
let description = ref("暂无选择支付方式");

onBeforeMount(() => {
  settlement(cartStore.order).then((res) => {
    totalPrice.value = res.data.totalPrice;
    courses.value = res.data.courses;
    payModes.value = res.data.payModes;
    // console.log( res )
  });
});

// 支付二维码
let payurl = ref("");

//选择支付方式
const tabPayment = (item) => {
  payment.description = item.description;
  alipayOrder({
    courses: cartStore.orderList,
    payModes: item.code,
  }).then((res) => {
    payurl.value = res.data.payurl;
    // console.log(res);
    orderNumber.value = res.data.orderNumber;
  });
};

let router = useRouter();
//[支付宝]短轮询查订单状态
const interPaymentAli = () => {
  queryAlipay({
    orderNumber: orderNumber.value,
  }).then((res) => {
    console.log(res);
    if (res.meta.code == "200") {
      clearInterval(timer.value);
      ElMessage.success({
        message: "支付成功!",
      });
      router.push("/home");

      createToken().then((res) => {
        let token = res.data.token;
        deleteShopCars(cartStore.select, token);
      });
    }
  });
};

//去支付
const goPayment = () => {
  timer.value = setInterval(interPaymentAli, 3000);
  dialogVisible.value = true;
};
</script>

<style scoped lang="scss">
.finish {
  width: 170px;

  line-height: 30px;
  margin: 0 auto;
  display: flex;
}
.success {
  margin-left: 20px;
  width: 70px;
  font-size: 12px;
  background: rgba(54, 137, 255, 0.22);
  color: #3692ff;
  cursor: pointer;
  border-radius: 8px;
}
.error {
  width: 100px;
  font-size: 12px;
  background: linear-gradient(90deg, #fc7979 0%, #da4848 100%);
  color: #ffffff;
  cursor: pointer;
  border-radius: 8px;
}
::v-deep .el-dialog {
  text-align: center !important;
  border-radius: 10px !important;
}
.dialogPrice {
  padding-bottom: 20px;
  color: #93999f;
}
.prices {
  color: #f01414;
}
.alert {
  padding: 20px 0;
  font-size: 14px;
  color: #93999f;
}
.confirmOrder {
  width: 100%;
  padding-bottom: 60px;
}
.bgColor {
  width: 100%;
  height: 200px;
  background-color: red;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
.main-shopcart {
  width: 1200px;
  margin: 0 auto;
  height: 42px;
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  line-height: 35px;
  color: #ffffff;
  padding: 30px 0;
  opacity: 1;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.main {
  width: 1200px;
  margin: -100px auto 0 auto;
  /*background-color: red;*/
}
.main h1 {
  color: #ffffff;
  padding: 30px 0 30px 47px;
}
.info {
  width: 1200px;
  padding: 5px 0px 20px 0px;
  background: #f3f5f7;
  border-radius: 10px;
  box-shadow: 0px 2px 5px #888888;
}
.info-main {
  margin: 10px 20px;
  background: #ffffff;
  border-radius: 10px;
  padding: 20px;
}
.head {
  padding: 20px;
  font-size: 18px;
  color: #333333;
}
/* 课程信息 */
.courseInfo {
  display: flex;
  width: 100%;
  height: 160px;
  margin: 0 auto;
}
.coursebg {
  width: 280px;
  height: 160px;
}
.coursebg img {
  width: 100%;
  height: 100%;
}
.courseName {
  margin: 0 20px;
  width: 400px;
  height: 160px;
  font-size: 16px;
  color: #07111b;
  line-height: 160px;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.coursePrice {
  margin-left: 100px;
  height: 160px;
  text-align: right;
  line-height: 160px;
}
.coursePrice .nowprice {
  font-size: 18px;
  font-weight: 600;
  color: #1c1f21;
}
.coursePrice .oldprice {
  padding-left: 10px;
  font-size: 14px;
  text-decoration: line-through;
  color: #93999f;
}
/* 支付开始 */
.choose {
  width: 1200px;
  margin: 0 auto;
}
.choose h3 {
  color: #222;
  font-size: 16px;
  font-weight: 400;
  padding: 0 20px;
}
.choosebg {
  display: flex;
  margin: 20px;
}
.choosebg span {
  margin-top: 60px;
  margin-right: 40px;
}
.payment {
  width: 130px;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;
  margin-right: 10px;
  line-height: 50px;
  display: flex;
  padding: 0 10px;
  align-items: center;
}
.payment i {
  font-size: 35px;
  margin-right: 10px;
}
.payment span {
  line-height: 50px;
  color: #222222;
  font-weight: bold;
}

.payStyle {
  background: url("/image/checkedVip.png") no-repeat;
  background-size: 220px 111px;
  background-position: -67px -59px;
  border: #ff470a solid 1px !important;
}
.alipayment {
  border: #bfbfbf solid 1px;
  color: #01a8eb;
}
.wxpayment {
  border: #bfbfbf solid 1px;
  color: #01af37;
}

/* 支付结束 */
/* 结算 */
.foot {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
  line-height: 50px;
  color: #333333;
  margin-bottom: 10px;
}
.foot-item {
  width: 200px;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  font-weight: 400;
  color: #333333;
}
.foot-item:first-child {
  margin-top: 3px;
}
.old {
  margin-left: 10px;
}
.unique {
  margin-left: 5px;
  font-size: 24px;
  color: #f01414;
}
.btn {
  margin-right: 20px;
  width: 150px;
  height: 50px;
  border: none;
  color: #ffffff;
  font-size: 20px;
  border-radius: 5px;
  background: #f01414;
  cursor: pointer;
  box-shadow: 0px 3px 5px 2px #ff727f;
}
.pay {
  font-size: 18px;
  padding-left: 10px;
  color: #f01414;
}
.codeimg {
  margin: 0 auto;
  border: #d2d2d2 solid 1px;
  width: 150px;
  height: 150px;
}
.codeimg img {
  width: 100%;
  height: 100%;
}
</style>