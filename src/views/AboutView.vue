<template>
  <div class="about center">
    <a-card hoverable :style="{ width: '70vw' }" class="aboutCard">
      <div class="content center">
        <div class="author-info">
          <div class="author-tag-left">
            <span class="author-tag">🤖️ 数码科技爱好者</span>
            <span class="author-tag">🔍 分享与热心帮助</span>
            <span class="author-tag">🏠 智能家居小能手</span>
            <span class="author-tag">🔨 设计开发一条龙</span>
          </div>
          <div class="avatar">
            <a-avatar :style="{ backgroundColor: dimgray }">
              <template v-if="loginUser.userAvatar">
                <img
                  class="avatar-image"
                  alt="avatar"
                  :src="loginUser.userAvatar"
                />
              </template>
              <template v-else>
                <IconUser />
              </template>
            </a-avatar>
          </div>
          <div class="author-tag-right">
            <span class="author-tag">专修交互与设计 🤝</span>
            <span class="author-tag">脚踏实地行动派 🏃</span>
            <span class="author-tag">团队小组发动机 🧱</span>
            <span class="author-tag">壮汉人狠话不多 💢</span>
          </div>
        </div>
        <div class="userInfo">
          <p style="text-align: center;">
            <icon-user :style="{ fontSize: '18px' }" stroke-linecap="round" />
            {{ loginUser.userName ? loginUser.userName : "null" }}
          </p>
          <!-- <p style="text-align: center">
            <icon-idcard :style="{ fontSize: '15px' }" stroke-linecap="round" />
            {{
              loginUser.userProfile
                ? loginUser.userProfile
                : "http://www.baidu.com"
            }}
          </p> -->
          <div class="author-content">
            <div class="author-content-item myInfoAndSayHello">
              <div class="title2"><span class="inline-word">{{loginUser.userProfile ? loginUser.userProfile : 神秘玩家}}</span></div>
            </div>
          </div>
        </div>
        <a-button
          @click="handleEditor"
          type="outline"
          status="primary"
          class="editor"
          >编辑个人资料
        </a-button>
      </div>

      <a-divider :size="divederSize" />
      <a-card>
        <section class="about-kouseki wide color fade-before fade-in">
          <h5 class="kouseki-title" title="Kouseki">什么是《闲居即兴》</h5>
          <li class="kouseki-title-li">
              <span>依山傍水房数间，行也安然，坐也安然。一头耕牛半顷田，收也凭天，荒也凭天。雨过天晴驾小船，鱼在一边，酒在一边。路逢骚客问诗篇，好也几言，歹也几言。布衣得暖胜丝棉，新也可穿，旧也可穿。粗茶淡饭饱三餐，早也香甜，晚也香甜。夜归挚友话灯前，今也谈谈，古也谈谈。一觉睡到日三竿，不是神仙，胜似神仙！</span>
              <p>在这个快速变化的世界中，我希望能够记录下每一刻的美好，与您一起分享感动和启发。在“铭心石刻”，以文字为媒介，用心去感受这个世界的美好，用创意去表达我们对生活的热爱。不论是科技、生活、文化还是艺术，通过自己的视角与思考，带来不一样的感受和体验。
              </p>
              <p>“铭心”寓意着将朋友刻在心底，永远珍藏。而“石刻”则象征着这份珍贵的纪念，如同铭刻在坚固的石头上，永不褪色，永不忘记。希望你能够永远铭记这段珍贵的旅程。</p>
          </li>
          <li class="info">
            <a class="read" href="https://blog.gincode.icu" target="_blank" draggable="false">个人博客</a>
          </li>
          <div class="space"></div>
          <div class="stars">
              <div class="stars-animation">
                  <div class="star top"></div>
                  <div class="star center"></div>
                  <div class="star bottom"></div>
              </div>
          </div>
        </section>
      </a-card>
    </a-card>
  </div>
</template>

<script setup>
import { IconUser } from "@arco-design/web-vue/es/icon";
import { useStore } from "vuex";
import { computed } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useStore();
const divederSize = 0;

// 获取相关信息
const loginUser = computed(() => store.state.user.loginUser);

const handleEditor = () => {
  router.push({
    path: "/profile/info",
    replace: true,
  });
};
</script>

<style scoped>
.userInfo{
  font-size: 19px;
}
.center {
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  width: 100%;
  flex-direction: column;
}

.arco-avatar {
  width: 180px;
  height: 180px;
  margin-bottom: 10px;
}

:deep(.arco-avatar-circle .arco-avatar-image:before) {
    content: '';
    -webkit-transition: 1s;
    -moz-transition: 1s;
    -o-transition: 1s;
    -ms-transition: 1s;
    transition: 1s;
    width: 30px;
    height: 30px;
    background: #57bd6a;
    position: absolute;
    border-radius: 50%;
    border: 5px solid #f7f9fe;
    bottom: 10px;
    right: 10px;
    z-index: 2;
}

.arco-card-size-medium {
  font-size: 8px;
}
:deep(.vch__container .vch__legend) {
  display: none;
}

.editor {
  align-self: flex-end;
}
.author-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin-top: 1rem;
}
.myInfoAndSayHello {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
    background: linear-gradient(120deg,#5b27ff 0,#00d4ff 100%);
    background-size: 200%;
    width: 59%;
}
.author-content-item {
    width: 100%;
    border-radius: 12px;
    border: 1px solid #e3e8f7;
    box-shadow: 0 8px 16px -4px #2c2d300c;
    position: relative;
    padding: 1rem 2rem;
    overflow: hidden;
    margin-bottom: 10px;
}
.myInfoAndSayHello .title1 {
    opacity: .8;
    line-height: 1.3;
}
.myInfoAndSayHello .title2 {
    font-size: 36px;
    font-weight: 700;
    line-height: 1.1;
    margin: .5rem 0;
}
.author-content-item.aboutsiteTips {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 32%; 
}
.author-info {
    display: flex;
    align-items: center;
    margin: 0 0 16px 0;
}
.author-tag-left{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}
.author-tag-left .author-tag:first-child, .author-tag-left .author-tag:last-child {
    margin-right: -16px;
}
.author-tag {
    transform: translate(0,-4px);
    padding: 1px 18px;
    border-radius: 40px;
    margin-top: 6px;
    font-size: 16px;
    font-weight: 700;
    box-shadow: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    animation: 6s ease-in-out 0s infinite normal none running floating;
}

@keyframes floating {
    0% {
        transform: translate(0,-4px)
    }

    50% {
        transform: translate(0,4px)
    }

    100% {
        transform: translate(0,-4px)
    }
}
.author-tag-right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.author-tag-right .author-tag:first-child, .author-tag-right .author-tag:last-child {
    margin-left: -16px;
}
section.about-kouseki {
    background: linear-gradient(362deg,#850060,#27103c)!important;
    margin-top: 1rem;
}
section.about-kouseki {
    border-radius: .5rem;
    padding: 1.5rem;
    min-height: 10rem;
    color: hsl(0deg 0% 100% / 75%);
    font: 700 1rem;
    display: flex!important;
    flex-direction: column;
    text-align: justify;
    flex-wrap: wrap;
    align-content: space-between;
    justify-content: space-between;
    gap: 1.5rem;
    position: relative;
    overflow: hidden;
    transform: rotate(0);
    transition: all 1s,box-shadow .5s;
}
.about-kouseki h5 {
    width: 100%;
    z-index: 2;
    font-size: 1.5rem;
    text-align: center;
    text-transform: uppercase;
    color: hsl(0deg 0% 100% / 75%);
    margin: 0;
    outline: 0;
    padding: 0;
    vertical-align: baseline;
}
.about-kouseki li {
    font-size: 18px;
    list-style: none;
    width: min(100%,35rem);
}
section.fade-in {
    --trfm: scaleY(1.1) translateY(1rem);
    opacity: 1;
    animation: opacity var(--duration,.5s) cubic-bezier(.6, .2, .25, 1) backwards,transform var(--duration,.7s) cubic-bezier(.6, .2, .25, 1) backwards;
}
.info a {
    --color-rgb: 255 255 255;
    --color-sub-rgb: 255 255 255;
    display: flex;
    align-items: center;
    gap: .5em;
    color: hsl(0deg 0% 100% / 75%);
}
.about-kouseki .space {
    position: absolute;
    z-index: 1;
    width: 100%;
    border-radius: 50% 50% 0 0;
    transition: all .5s cubic-bezier(.5,0,0,1);
    background: rgb(255 255 255 / 10%);
    backdrop-filter: blur(5px);
    box-shadow: 0 .2rem 1rem 0 hsl(0deg 0% 100% / 10%);
}
.about-kouseki .space {
    height: auto;
    inset: 20% -40% auto auto;
    aspect-ratio: 1/1;
}
.about-kouseki:hover .space {
    width: 110%;
    top: 15%;
    right: -45%;
}
.about-kouseki .stars {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transform: rotate(-145deg);
}
.about-kouseki .stars-animation {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    animation: about-stars 10s linear infinite;
}
.about-kouseki .space:hover+.stars .stars-animation {
    animation-duration: 1s;
}
@keyframes about-stars {
    0% {
        transform: translateX(100%)
    }

    100% {
        transform: translateX(-100%)
    }
}
.about-kouseki .star {
    width: 5rem;
    height: 2px;
    background: linear-gradient(90deg,rgb(255 255 255 / 30%),rgb(255 255 255 / 0));
    display: flex;
    align-items: center;
}
.about-kouseki .star:before {
    content: "";
    height: 2px;
    width: 2px;
    background: rgb(255 255 255);
    border-radius: 50%;
}
.about-kouseki .star.center {
    margin: 0 0 0 100%;
}
.about-kouseki .star.bottom {
    margin: 0 0 0 30%;
}
</style>
