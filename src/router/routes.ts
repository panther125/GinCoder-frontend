import { RouteRecordRaw } from "vue-router";
import QuestionLayout from "@/layouts/QuestionLayout.vue";
import BasicLayout from "@/layouts/BasicLayout.vue";
import { IconList, IconBookmark, IconBook,IconUser,IconUserGroup,IconRobotAdd,IconPaste,IconTrophy} from "@arco-design/web-vue/es/icon";
import ACCESS_ENUM from "@/access/accessEnum";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "主页",
    component: () => import("../views/HomeView.vue"),
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/questions",
    name: "浏览题目",
    component: () => import("../views/question/QuestionsView.vue"),
    meta: {
      icon: IconList,
      layout: BasicLayout,
    },
  },
  {
    path: "/question_submit",
    name: "题目提交",
    component: () => import("../views/question/QuestionSubmitView.vue"),
    meta: {
      icon: IconBookmark,
      layout: BasicLayout,
    },
  },
  {
    path: "/view/question/:id",
    name: "在线做题",
    component: () => import("../views/question/ViewQuestionView.vue"),
    props: true,
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
      layout: QuestionLayout,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: () => import("../views/question/ManageQuestionView.vue"),
    meta: {
      access: ACCESS_ENUM.ADMIN,
      icon: IconBook,
      layout: BasicLayout,
    },
  },
  {
    path: "/manage/user",
    name: "用户管理",
    component: () => import("../views/UserManageView.vue"),
    meta: {
      access: ACCESS_ENUM.ADMIN,
      icon: IconUserGroup,
      layout: BasicLayout,
    },
  },
  {
    path: "/user",
    name: "个人中心",
    component: () => import("../views/AboutView.vue"),
    meta: {
      access: ACCESS_ENUM.USER,
      hideInMenu: true,
      layout: BasicLayout,
      icon: IconUser
    },
  },
  {
    path: "/profile/info",
    name: "编辑资料",
    component: () => import("../views/UserView.vue"),
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/post",
    name: "学习文章",
    component: () => import("../views/post/postView.vue"),
    meta: {
      layout: BasicLayout,
      icon: IconPaste
    },
  },
  {
    path: "/chat",
    name: "ai对话",
    component: () => import("../views/chat/chatView.vue"),
    meta: {
      icon: IconUserGroup,
      layout: BasicLayout,
    },
  },
  {
    path: "/post/detaile/:id",
    name: "文章详情",
    component: () => import("../views/post/viewPostView.vue"),
    props: true,
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/manage/post",
    name: "文章管理",
    component: () => import("../views/post/ManagePostView.vue"),
    meta: {
      access: ACCESS_ENUM.ADMIN,
      icon: IconUserGroup,
      layout: BasicLayout,
    },
  },
  {
    path: "/RankList",
    name: "排行榜",
    component: () => import("../views/Rank.vue"),
    meta: {
      layout: BasicLayout,
      icon: IconTrophy
    },
  },
  {
    path: "/about",
    name: "帮助中心",
    component: () => import("../views/About.vue"),
    meta: {
      layout: BasicLayout,
      icon: IconRobotAdd
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: () => import("../views/error/401.vue"),
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/error/404.vue"),
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/oauth/login/gitee",
    name: "gitee login",
    component: () => import("../components/Oauth/index.vue"),
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/oauth/login/github",
    name: "github login",
    component: () => import("../components/Oauth/index.vue"),
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/oauth/login/qq",
    name: "qq login",
    component: () => import("../components/Oauth/index.vue"),
    meta: {
      hideInMenu: true,
      layout: BasicLayout,
    },
  },
  {
    path: "/:pathMatch(.*)", // 匹配所有路由
    redirect: "/404",
  },
];
