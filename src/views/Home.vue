<template>
  <div>
    <Header></Header>
    <NavSwiper></NavSwiper>
    <div ref="target">
      <NewGoodCourse v-if="targetIsVisible"></NewGoodCourse>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Foot.vue";
import NavSwiper from "@/components/home/NavSwiper.vue";

// 异步组件加载
import { useIntersectionObserver } from '@vueuse/core'
const NewGoodCourse = defineAsyncComponent(() =>
  import('@/components/home/NewGoodCourse.vue')
)

const target = ref(null);
const targetIsVisible = ref(false);

const { stop } = useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
  	if( isIntersecting ) {
  		targetIsVisible.value = isIntersecting
  	}
  },
)
</script>