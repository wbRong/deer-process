<template>
  <div class="header">
    <div class="header-main">
      <div class="header-l">
        <h1 class="logo"><img src="@/assets/img/lemur-3245.png" /></h1>
        <ul>
          <!-- <li class="current"><router-link to="/home">首页</router-link></li>
          <li><router-link to="/course">课程</router-link></li>
          <li><router-link to="/course-info">会员</router-link>课程</li> -->
          <li
            v-for="(item, index) in menuList"
            :key="index"
            @click="changeStatus(index)"
            :class="active == index ? 'active' : ''"
          >
            <router-link :to="item.path">{{ item.text }}</router-link>
          </li>
        </ul>
      </div>
      <div class="header-r">
        <div class="serach">
          <input type="text" placeholder="搜索" />
          <el-icon :size="20"><Search></Search></el-icon>
        </div>
        <div class="shop">
          <el-icon :size="20"><ShoppingCart /></el-icon>
        </div>

        <!-- start module -->
        <div class="login" v-if="!isLogin">
          <router-link to="/login">登录/注册</router-link>
        </div>

        <div class="content-login-success" v-else>
          <div style="cursor: pointer">我的课程</div>
          <div @mouseenter="isShow = true">
            <img
              class="avator"
              :src="userInfo.avatar"
              alt=""
              v-if="userInfo.avatar"
            />
            <img
              v-else
              class="avator"
              src="../assets/img/avatar.5xl9mdkacdg0.webp"
            />
          </div>
        </div>

        <!-- 划过头像显示  -->
        <div class="user-info" v-if="isShow">
          <div class="user-info-top">
            <div class="u-i-t-top">
              <img
                class="avator"
                :src="userInfo.avatar"
                alt=""
                v-if="userInfo.avatar"
              />
              <img
                class="avator"
                src="../assets/img/avatar.5xl9mdkacdg0.webp"
                v-else
              />
              <div class="avator-info">
                <p>{{ userInfo.nickName }}</p>
              </div>
              <div class="vip" v-if="vipInfo">
                <div class="vipImg">
                  <img
                    :src="vipInfo.vipIcon"
                    :class="vipEndtime < 0 ? 'gray' : ''"
                  />
                </div>
                <div class="vipName">{{ vipInfo.vipName }}</div>
                <div class="endTime" v-if="vipInfo.isExpired === 0">
                  {{ endTimeVip }}天到期
                </div>
                <div class="endTime" v-else>
                  已过期{{ Math.abs(endTimeVip) }}天
                </div>
              </div>
            </div>
            <div class="u-i-i-bottom">
              <div>
                <router-link to="/">
                  <div class="info-item">
                    <img src="../assets/img/course.png" />
                    <p>我的课程</p>
                  </div>
                </router-link>
              </div>
              <div>
                <router-link to="/">
                  <div class="info-item">
                    <img src="../assets/img/order.png" />
                    <p>订单中心</p>
                  </div>
                </router-link>
              </div>
              <div>
                <router-link to="/">
                  <div class="info-item">
                    <img src="../assets/img/mess.png" />
                    <p>我的消息</p>
                  </div>
                </router-link>
              </div>
              <div>
                <router-link to="/">
                  <div class="info-item">
                    <img src="../assets/img/setting.png" />
                    <p>个人设置</p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="user-info-bottom">
            <div class="logout" @click="goLogout">退出登录</div>
          </div>
        </div>

        <!-- end module -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { Search, ShoppingCart } from "@element-plus/icons-vue";
import { ElMessageBox, ElMessage } from "element-plus";
import { getInfo, createToken } from "@/api/index";
import { logout } from "@/api/login";
import { useUserStore } from '@/store/user'

let router = useRouter();
let active = ref(0);
// 切换
let changeStatus = (index) => {
  active.value = index;
};
// 导航信息
let menuList = ref([
  { text: "首页", path: "/home" },
  { text: "课程", path: "/course" },
  { text: "会员", path: "/" },
]);

//用户是否是登录状态
let isLogin = ref(false);
//用户信息
let userInfo = ref({});
//用户vip数据
let vipInfo = ref({});
//VIP到期时间
let endTimeVip = ref();
//显示用户更多数据
let isShow = ref(false);

onBeforeMount(() => {
  createToken().then((res) => {
    getInfo({
      token: res.data.token,
    }).then((res) => {
      // console.log( res );
      //登录的状态，获取用户信息
      if (res.meta.code == "200") {
        //用户信息
        userInfo.value = res.data.data;
        useUserStore().userInfo = res.data.data;
        //用户vip
        vipInfo.value = res.data.data.vipInfo;
        //计算会员到期时间
        let now = new Date().getTime();
        let endTime = vipInfo.value.endTime - now;
        endTimeVip.value = Math.floor(endTime / 1000 / 60 / 60 / 24);
        //判断是否可以获取用户信息
        isLogin.value = true;
      }
    });
  });
});

//退出登录
const goLogout = () => {
  ElMessageBox.confirm("确定退出登录吗？", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(() => {
      logout().then((res) => {
        if (res.meta.code == "200") {
          let userStore = useUserStore();
          userStore.outLogin();
          router.go(0);
          ElMessage.success({
            message: "退出成功!",
          });
        }
      });
    })
    .catch(() => {
      ElMessage.info({
        message: "已取消",
      });
    });
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 1200px;
  background: white;
  box-shadow: 0px 5px 6px rgba(0, 0, 0, 0.16);
  .header-main {
    width: 1050px;
    height: 80px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header-l {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 127px;
      height: 50px;
      margin-right: 50px;
      img {
        width: 100%;
        height: 100%;
      }
    }

    ul {
      display: flex;
      li {
        margin-right: 78px;
        font-size: 16px;
        color: #808080;
        height: 50px;
        line-height: 50px;
        position: relative;
        cursor: pointer;
        &::after {
          content: "";
          width: 120%;
          height: 3px;
          position: absolute;
          bottom: 0;
          left: 0;
          background: blue;
          margin-left: -10%;
          transition: transform 0.25s;
          transform: scale(0);
        }
        &:hover,
        &.active {
          color: blue;
          font-weight: bold;
        }
        &:hover::after,
        &.active::after {
          transform: scale(1);
        }
        &:last-child {
          margin-right: 10px;
        }
      }
    }
  }
  .header-r {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .serach {
      display: flex;
      align-items: center;
      padding: 0 10px;
      width: 270px;
      height: 43px;
      background: #f0f2f4;
      border-radius: 5px;
      input {
        border: none;
        outline: none;
        width: 270px;
        height: 43px;
        background: transparent;
      }
    }
    .shop {
      display: flex;
      justify-content: center;
      margin-left: 42px;
    }
    .login {
      margin-left: 30px;
      font-size: 16px;
      color: #808080;
    }
  }
  a {
    color: #808080;
    text-decoration: none;
  }
  .content-login-success {
    height: 53px;
    color: #808080;
    text-align: center;
    width: 180px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #707070;
  }
  .avator {
    height: 53px;
    width: 53px;
    cursor: pointer;
    border-radius: 50%;
  }
  .user-info {
    width: 200px;
    height: 194px;
    background-color: #fff;
    border: 1px solid rgba(248, 250, 252, 1);
    box-shadow: 0px 5px 15px 3px #888888;
    position: absolute;
    top: 75px;
    right: -40px;
    z-index: 999;
    display: block;
    border-radius: 10px;
  }
  .user-info-top {
    display: flex;
    width: 100%;
    height: 160px;
    border-bottom: 1px solid rgba(248, 250, 252, 1);
    flex-direction: column;
  }
  .u-i-t-top {
    display: flex;
    height: 80px;
    width: 100%;
    align-items: center;
  }
  .u-i-t-top img {
    width: 40px;
    height: 40px;
    margin: 0 10px;
    cursor: pointer;
  }
  .avator-info {
    width: 120px;
    height: 60px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    display: flex;
    flex-direction: column;
    /*align-items: center;*/
  }
  /*有会员了之后高度微调*/
  .avator-info p {
    height: 40px;
    line-height: 40px;
    cursor: pointer;
  }
  .u-i-i-bottom {
    display: flex;
    height: 100px;
    width: 200px;
    margin-top: 10px;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .u-i-i-bottom a {
    text-decoration: none;
  }
  .info-item {
    width: 90px;
    height: 30px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #333333;
    border-radius: 3px;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1) !important;
  }
  .info-item img {
    width: 14px;
    height: 16px;
  }
  .user-info-bottom {
    position: relative;
    width: 100%;
    height: 30px;
  }
  .logout {
    line-height: 30px;
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: #93999f;
    cursor: pointer;
  }
  /*vip开始*/
  .vip {
    display: flex;
    flex-direction: row;
    /*flex-wrap: wrap;*/
    width: 100%;
    height: 30px;
    margin-left: -105px;
    margin-top: 18px;
    font-size: 12px;
    line-height: 30px;
  }
  .vipImg {
    width: 15px;
    height: 15px;
    margin-right: 12px;
  }
  .vipImg img {
    width: 100% !important;
    height: 100% !important;
  }
  .vipName {
    color: #93999f;
  }
  .endTime {
    padding-left: 2px;
    color: #ff0000;
    position: absolute;
    top: 45px;
    left: 73px;
    font-size: 12px;
  }
}
</style>