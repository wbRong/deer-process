import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import { useUserStore } from '@/store/user'

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/course",
    name: "Course",
    component: () => import("../views/Course.vue"),
    meta: { title: '课程' }
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/info/:id",
    name: "CourseInfo",
    component: () => import("../views/CourseInfo.vue"),
    meta: { title: '课程详情' }
  },
  {
    // path: '/courseplay',
    path: '/courseplay/:courseId/:chapterId',
    name: 'CoursePlay',
    component: () => import("../views/CoursePlay.vue"),
    meta: { title: '课程播放页' },
  },
  {
    path: '/confirmOrder',
    name: 'ConfirmOrder',
    component: () => import("../views/ConfirmOrder.vue"),
    meta: { title: '确定订单页' },
  },
  {
    path: "/cart",
    name: "Cart",
    meta: { title: '购物车' },
    component: () => import("../views/Cart.vue"),
    beforeEnter: (to, from, next) => {
      if (useUserStore().userInfo.id) {
        next();
      } else {
        next('/login');
      }
    }
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;