<template>
   <div class="reply-box" v-if="show">
    <div class="box-normal">
      <div class="reply-box-avatar">
        <img class="shoka-avatar" :src="loginUser.userAvatar" alt="" />
      </div>
      <div class="reply-box-warp">
        <textarea class="reply-box-textarea" v-model="commentContent" :style="sendActive ? lineStyle : ''"
          @input.prevent="inputActive" :placeholder="placeholderText"></textarea>
      </div>
      <div class="reply-box-send" :class="sendActive ? 'send-active' : ''" @click="handleAdd">
        评论
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CommentControllerService,CommentReq } from "../../../generated";
import { useStore } from "vuex";
import message from "@arco-design/web-vue/es/message";
import { ref, reactive, toRefs, computed } from "vue";
const store = useStore();
const loginUser = computed(() => store.state.user.loginUser);
const lineStyle = {
  lineHeight: "normal",
  borderColor: "#ed6ea0",
  backgroundColor: "var(--grey-0)",
};
const emit = defineEmits(["reload"]);
const props = defineProps({
  show: {
    type: Boolean,
    default: true,
  },
  questionId: {
    type: Number,
  },
});
const data = reactive({
  userName: "",
  sendActive: false,
  show: props.show,
  commentContent: "",
  commentForm: {
    questionId: props.questionId,
    parentId: undefined,
    replyId: undefined,
    toUid: undefined,
    commentContent: "",
  },
});
const { userName, sendActive, show, commentContent, commentForm } = toRefs(data);
const placeholderText = computed(() =>
  userName.value ? `回复 @${userName.value}：` : "发一条友善的评论"
);
const inputActive = () => {
  if (commentContent.value.length == 0) {
    sendActive.value = false;
  } else {
    sendActive.value = true;
  }
};

const handleAdd = async () => {
  if (commentContent.value.trim() == "") {
    message.error("评论不能为空");
    return;
  }
  commentForm.value.commentContent = commentContent.value;
  const res = await CommentControllerService.addCommentUsingPost(commentForm.value);
    if (res.code === 200) {
      sendActive.value = false;
      commentContent.value = "";
      message.success("评论成功");
      // 重新加载评论列表
      emit("reload");
    }
};
const setReply = (flag: boolean) => {
  show.value = flag;
};
defineExpose({ commentForm, userName, setReply });
</script>

<style scoped>

.reply-box {
    display: flex;
    flex-direction: column;
}

.box-normal {
    display: flex;
    height: 50px;
    transition: .2s;
}
.box-normal .reply-box-warp {
    flex: auto;
    margin-left: .6rem;
}
.box-normal .send-active {
  background-color: var(--color-pink);
}
.reply-box-avatar {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3.125rem;
}

.reply-box-textarea {
    width: 95%;
    height: 100%;
    padding: 5px 10px;
    border: 1px solid #444;
    border-radius: 6px;
    background-color: #21252b;
    font-size: 12px;
    line-height: 38px;
    color: #aaa;
    resize: none;
    outline: none;
}

.box-expand {
    display: flex;
    align-items: center;
    margin-left: 3.6rem;
    margin-top: 0.3125rem;
}
.box-normal .reply-box-send {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 70px;
    margin-left: 10px;
    border-radius: 4px;
    background-color: #ed9abb;
    color: #222;
    cursor: pointer;
}

.shoka-avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
}

</style>
