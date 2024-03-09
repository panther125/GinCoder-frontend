<template>
  <div id="userLoginView">
    <h2 style="text-align: center">用户登录</h2>
    <a-form
      style="max-width: 21rem; margin: 0 auto"
      label-align="left"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
      layout="vertical"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于 8 位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit" style="width: 21rem">
          登录
        </a-button>
      </a-form-item>
    </a-form>
    <div class="signup">
      没有账户吗？
      <router-link to="#" @click="toggleSignUp" class="signupLine">
        注册
      </router-link>
    </div>
    <div>
      <div class="social-login-title">社交账号登录</div>
      <div class="social-login-wrapper">
        <img src="@/assets/icons/gitee.svg" class="icon" icon-class="gitee" size="2rem" @click="giteeLogin" />
        <img src="@/assets/icons/github.svg" class="icon" icon-class="gitee" size="2rem" @click="githubLogin" />
        <img src="@/assets/icons/qq.svg" class="icon" icon-class="gitee" size="2rem" @click="qqLogin" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import config from '@/assets/config'
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);
const router = useRouter();
const store = useStore();

/**
 * 提交表单
 * @param data
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功，跳转到主页
  if (res.code === 0) {
    message.success("登录成功！");
    await store.dispatch("user/getLoginUser");
    // 将token保存在localStorage中
    localStorage.setItem("Authorization", res.data.id);
    router.push({
      path: "/",
      replace: true,
    });
    //window.location.reload();
  } else {
    message.error("登录失败：" + res.message);
  }
};



const giteeLogin = () => {
  //保留当前路径
  window.open(
    "https://gitee.com/oauth/authorize?client_id=" +
    config.GITEE_APP_ID +
    "&response_type=code&redirect_uri=" +
    config.GITEE_REDIRECT_URL,
    "_self"
  );
};

const qqLogin = () => {
  //保留当前路径
  window.open(
    "https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=" +
    config.QQ_APP_ID +
    "&redirect_uri=" +
    config.QQ_REDIRECT_URL +
    "&scope=scope&display=display",
    "_self"
  );
};

const githubLogin = () => {
  message.error("暂时还没有！");
};

const toggleSignUp = () => {
  store.dispatch("auth/toggleSignUp");
};
</script>

<style scoped>
.signup {
  display: block;
  text-align: end;
}
.signupLine {
  text-decoration: none;
  color: #3b82f6;
}
.signupLine:hover {
  text-decoration: underline;
}


.social-login-title {
  margin-top: 1rem;
  color: #b5b5b5;
  font-size: 0.75rem;
  text-align: center;
}

.social-login-title::before {
  content: "";
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}

.social-login-title::after {
  content: "";
  display: inline-block;
  background-color: #d8d8d8;
  width: 60px;
  height: 1px;
  margin: 0 12px;
  vertical-align: middle;
}

.social-login-wrapper {
  text-align: center;
  margin-top: 1.4rem;
}

.icon {
  width: 2rem ;
  height: 2rem;
  margin: 0 0.3rem;
}
</style>
