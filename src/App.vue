<template>
  <div id="app">
    <a-spin :loading="loading" tip="加载中，请稍后...">
      <component :is="layout" />
    </a-spin>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const route = useRoute();
const theme = ref();

const layout = computed(() => route.meta.layout);

// 获取loading
const loading = computed(() => store.state.loading.loading);

/**
 *  全局初始化函数，有全局单次调用的代码，都可以写到这里
 */
 const doInit = () => {
  const c =
    "background: linear-gradient(to bottom right, #7b2a52, #36307f,#272151);color:#fff";
  console.log("%c panther %c https://github.com/panther125", c, "");
  console.log(
    "誰もが信じ崇めてる\n" +
      "まさに最強で無敵のアイドル\n" +
      "弱点なんて見当たらない\n" +
      "一番星を宿している\n" +
      "弱いとこなんて見せちゃダメダメ\n" +
      "知りたくないとこは見せずに\n" +
      "唯一無二じゃなくちゃイヤイヤ\n" +
      "それこそ%c本物のアイ%c\n" +
      "%c ⌜IDOL⌟ ",
    "color:#b424b8",
    "",
    c
  );
};
onMounted(() => {
  doInit();
  theme.value = localStorage.getItem("theme");
  if (theme.value === "light") {
    store.commit("theme/toggleTheme", "light");
  } else {
    store.commit("theme/toggleTheme", "dark");
  }
});
</script>
<style>
#app {
  background-color: var(--color-bg-1);
}
</style>
