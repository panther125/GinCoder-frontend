<template>
    <div class="userLoginView">
      <h2 style="text-align: center">用户注册</h2>
      <a-form
        :model="form"
        @submit="handleSubmit"
        label-align="left"
        auto-label-width
        style="max-width: 21rem; margin: 0 auto"
        layout="vertical"
      >
        <a-form-item
          :rules="[
            { required: true, message: '账号不能为空' },
            { minLength: 4, message: '账号长度不能低于四位' },
          ]"
          field="userAccount"
          label="账号"
        >
          <a-input v-model="form.userAccount" placeholder="请输入账号,目前只支持邮箱注册" />
        </a-form-item>
        <a-form-item
          :rules="[
            { minLength: 6, message: '验证码长度6位' },
          ]"
          field="verificationCode"
          label="验证码"
          style="width: 21rem;"
        >
         <a-input v-model="form.verificationCode" placeholder="请输入验证码" />
          <button
            type="button"
            @click="toGetVerification"
            :disabled="isDisposed"
            class="btn btn-primary VerCode"
            >
            {{ isDisposed ? `${time}s后重新获取` : "获取验证码" }}
          </button>
        </a-form-item>
        <a-form-item
          :rules="[
            { required: true, message: '密码不能为空' },
            { minLength: 8, message: '密码长度不能低于八位' },
          ]"
          field="userPassword"
          tooltip="密码不少于8位"
          label="密码"
        >
          <a-input-password
            v-model="form.userPassword"
            placeholder="请输入密码"
          />
        </a-form-item>
        <a-form-item
          :rules="[
            { required: true, message: '密码不能为空' },
            { minLength: 8, message: '密码长度不能低于八位' },
          ]"
          field="checkPassword"
          tooltip="密码不少于8位"
          label="重复密码"
        >
          <a-input-password
            v-model="form.checkPassword"
            placeholder="请再次输入密码"
          />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" style="width: 21rem">
            注册
          </a-button>
        </a-form-item>
      </a-form>
      <div class="login">
        已有账号,
        <router-link to="#" @click="toggleLogin" class="loginLine">
          登录
        </router-link>
      </div>
    </div>
  </template>
  <script lang="ts" setup>
  import { reactive ,ref } from "vue";
  import { UserControllerService, UserRegisterRequest } from "../../../generated";
  import { Message } from "@arco-design/web-vue";
  import store from "../../store";
  
  const toggleLogin = () => {
    store.dispatch("auth/toggleLogin");
  };
  
  const form = reactive<UserRegisterRequest>({
    userAccount: "",
    userPassword: "",
    checkPassword: "",
    verificationCode: "",
  });
  
  const isDisposed = ref(false);
  const time = ref(60);
  const toGetVerification = async () => {
    const regex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    if(!regex.test(form.userAccount || "")){
      Message.error("目前只支持邮箱注册,请输入正确的邮箱");
      return;
    }
    if(form.userAccount == null || form.userAccount.length == 0){
      Message.error("邮箱不能为空！！");
    }else{
      isDisposed.value = true;
      time.value = 60;
      const res = await UserControllerService.getVerificationCodeUsingGet(form.userAccount)
      Message.info(res.data ? res.data : "邮箱发送失败，用户一天内最多注册10次")
      //Message.info(res.data ? res.data : res.message)
      handleTimeChange();
    }
  };
  
  const handleTimeChange = () => {
    if (time.value <= 0) {
      isDisposed.value = false;
      time.value = 60;
    } else {
      setTimeout(() => {
        time.value--;
        handleTimeChange();
      }, 1000);
    }
  };
  
  const handleSubmit = async () => {
    if (form.userAccount!.length < 4 || form.userPassword!.length < 6) {
      return;
    }
    const regex = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    if(!regex.test(form.userAccount || "")){
      Message.error("目前只支持邮箱注册");
      return;
    }
    if (
      form.checkPassword!.length !== form.userPassword!.length ||
      form.checkPassword !== form.userPassword
    ) {
      Message.error("两次输入密码不一致");
      return;
    }
    const res = await UserControllerService.userRegisterUsingPost(form);
    if (res.code === 0) {
      Message.success("注册成功！");
      await store.dispatch("user/getLoginUser");
      await toggleLogin();
    } else {
      Message.error(res.message);
    }
  };
  </script>
  <style scoped>
  .login {
    display: block;
    text-align: end;
  }
  .loginLine {
    text-decoration: none;
    color: #3b82f6;
  }
  .loginLine:hover {
    text-decoration: underline;
  }
  .VerCode{
    height: 2rem;
    width: 10rem ;
    background: #3b82f6;
    margin-left: 3px;
    box-shadow: -6px 6px 8px inset rgba(255, 255, 255, 0.6),
      6px -6px 8px inset rgba(0, 0, 0, 0.2);
  }
  </style>
  