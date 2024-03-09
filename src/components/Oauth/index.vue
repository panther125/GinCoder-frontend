<template>
  <div class="oauth-background">
    <div id="preloader_6">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
  
<script setup lang="ts">
import { BaseResponse_LoginUserVO_, LoginControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { onMounted } from "vue";
const route = useRouter();
const store = useStore();

const loadData = async () => {
  //message.info("hello")
  const pathCode = window.location.href.split("=")[1]
  const AuthloginType = window.location.href.split('/')[5].split('?')[0]
  //alert(route.)
  var res = {} as BaseResponse_LoginUserVO_ ;
  if(AuthloginType === 'gitee'){
      res = await LoginControllerService.giteeLoginUsingPost({
        code: pathCode
    }) as BaseResponse_LoginUserVO_;
  }else if(AuthloginType === 'github'){
      alert("还未开发！")
  }else if(AuthloginType === 'qq'){
      res = await LoginControllerService.qqLoginUsingPost({
        code: pathCode
      }) as BaseResponse_LoginUserVO_;
  }else{
    message.error("暂不支持该登录方式！")
  }
  //console.log(res)
  // 登录成功，跳转到主页
  if (res.code === 0) {
    message.success("登录成功！");
    //store.state.loginUser = res.data
    await store.dispatch("user/getLoginUser");
    route.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败：" + res.message);
  }
};

onMounted(() => {
  loadData();
});
</script>
  
  <style scoped>
  .oauth-background {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    z-index: 1000;
  }
  
  #preloader_6 {
    position: relative;
    top: 45vh;
    left: 47vw;
    animation: preloader_6 5s infinite linear;
  }
  
  #preloader_6 span {
    width: 20px;
    height: 20px;
    position: absolute;
    background: red;
    display: block;
    animation: preloader_6_span 1s infinite linear;
  }
  
  #preloader_6 span:nth-child(1) {
    background: #2ecc71;
  }
  
  #preloader_6 span:nth-child(2) {
    left: 22px;
    background: #9b59b6;
    animation-delay: 0.2s;
  }
  
  #preloader_6 span:nth-child(3) {
    top: 22px;
    background: #3498db;
    animation-delay: 0.4s;
  }
  
  #preloader_6 span:nth-child(4) {
    top: 22px;
    left: 22px;
    background: #f1c40f;
    animation-delay: 0.6s;
  }
  
  @keyframes preloader_6 {
    from {
      -ms-transform: rotate(0deg);
    }
  
    to {
      -ms-transform: rotate(360deg);
    }
  }
  
  @keyframes preloader_6_span {
    0% {
      transform: scale(1);
    }
  
    50% {
      transform: scale(0.5);
    }
  
    100% {
      transform: scale(1);
    }
  }
  </style>