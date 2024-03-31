<template>
  <div class="reply-warp" id="reply-wrap">
    <div class="reply-title">
      <svg-icon icon-class="comment" size="1.4rem" style="margin-right: 5px;"></svg-icon>
      评论
    </div>
    <ReplyBox @reload="reloadComments" :questionId="questionId" />
    <div v-if="count > 0 && reFresh">
      <div class="reply-item" v-for="(comment, index) of commentList" :key="comment.id">
        <div class="reply-box-avatar">
          <img class="shoka-avatar" :src="comment.userAvatar">
        </div>
        <div class="content-warp">
          <div class="user-info">
            <div class="user-name">{{ comment.fromNickname }}</div>
            <svg-icon v-if="comment.fromUid == 1" icon-class="badge"></svg-icon>
          </div>
          <div class="reply-content" v-html="comment.commentContent"></div>
          <div class="reply-info">
            <span class="reply-time">{{ formatDateTime(comment.createTime) }}</span>
            <span class="reply-btn" @click="handleReply(index, comment)">回复</span>
          </div>
          <div class="sub-reply-item" v-for="reply of comment.replyVOList" :key="reply.id">
            <div class="sub-user-info">
              <img class="sub-reply-avatar" :src="reply.userAvatar" />
              <div class="sub-user-name">{{ reply.fromNickname }}</div>
              <svg-icon v-if="reply.fromUid == 1" icon-class="badge" style="margin-left: 5px;"></svg-icon>
            </div>
            <span class="reply-content">
              <template v-if="reply.fromUid !== reply.toUid">回复 <span style="color: #008ac5">@{{
                reply.toNickname
              }}</span> :</template>
              <span v-html="reply.commentContent"></span>
            </span>
            <div class="reply-info">
              <span class="reply-time">{{ formatDateTime(reply.createTime) }}</span>
              <span class="reply-btn" @click="handleReply(index, reply)">回复</span>
            </div>
          </div>
          <div ref="readMoreRef" class="view-more" v-show="comment.replyCount > 3">
            <span>共{{ comment.replyCount }}条回复, </span>
            <span class="view-more-btn" @click="readMoreComment(index, comment)">点击查看</span>
          </div>
          <pagination ref="pageRef" :total="comment.replyCount" :current="index" :page-size="5" :commentId="comment.id"
            @get-current-page="getCurrentPage"></pagination>
          <ReplyBox ref="replyRef" class="mt-4" :show="false" :questionId="questionId"
            @reload="reloadReplies(index)">
          </ReplyBox>
          <div class="bottom-line"></div>
        </div>
      </div>
      <div class="loading-warp" v-if="count > commentList.length">
        <n-button class="btn" color="#e9546b" @click="getList">
          加载更多...
        </n-button>
      </div>
    </div>
    <div v-else style="padding: 1.25rem; text-align: center">来发评论吧~</div>
  </div>
</template>

<script setup lang="ts">
import { CommentControllerService ,CommentResp,ReplyResp} from "../../../generated";
import { ref, reactive, toRefs, watch,nextTick,onMounted } from "vue";
import ReplyBox from "@/components/comment/ReplyBox.vue";
import { useStore } from "vuex";
import { formatDateTime } from '@/utils/date';
const store = useStore();
const replyRef = ref<any>([]);
const pageRef = ref<any>([]);
const readMoreRef = ref<any>([]);
const emit = defineEmits(["getCommentCount"]);
const questionId = Number( window.location.href.split("/")[5])
const data = reactive({
  count: 0,
  reFresh: true,
  queryParams: {
    current: 1,
    questionId: questionId,
  },
  commentList: [] as CommentResp[],
});
const { count, reFresh, queryParams, commentList } = toRefs(data);
// 刷新评论列表
watch(
  commentList,
  () => {
    reFresh.value = false;
    nextTick(() => {
      reFresh.value = true
    })
  },
  { deep: false },
);
// 查看更多评论
const readMoreComment = async (index: number, comment: CommentResp) => {
    const res = await CommentControllerService.listReplyUsingGet(comment.id);
    if(res.code === 200){
      comment.replyVOList = res.data;
      
      // 回复大于5条展示分页
      // if (comment.replyCount > 5) {
      //   pageRef.value[index].setPaging(true);
      // }
      // 隐藏查看更多
      readMoreRef.value[index].style.display = "none";
    }
};
// 查看当前页的回复评论
const getCurrentPage = async (current: number, index: number, commentId: number) => {
  const res = await CommentControllerService.listReplyUsingGet(commentId,current,5);
  if(res.code === 200){
    commentList.value[index].replyVOList = res.data;
  }
};
const handleReply = (index: number, target: CommentResp | ReplyResp) => {
  replyRef.value.forEach((element: any) => {
    element.setReply(false);
  });
  const currentReply = replyRef.value[index];
  currentReply.nickname = target.fromNickname;
  currentReply.commentForm.replyId = target.id;
  currentReply.commentForm.toUid = target.fromUid;
  currentReply.commentForm.parentId = commentList.value[index].id;
  currentReply.setReply(true);
};
const getList = async () => {
  //console.log(queryParams.value.current)
  const res = await CommentControllerService
  .listCommentVoUsingGet(queryParams.value.current,undefined,undefined,undefined,queryParams.value.questionId);
    if(res.code === 200){
      if (queryParams.value.current == 1) {
        commentList.value = res.data?.recordList;
      } else {
        commentList.value.push(...res.data.recordList);
      }
      queryParams.value.current++;
      count.value = res.data?.count;
      emit("getCommentCount", count.value);
      }
  };
// 重新加载评论列表
const reloadComments = () => {
  queryParams.value.current = 1;
  getList();
};
// 重新加载回复评论
const reloadReplies = async (index: number) => {
  const res = await CommentControllerService
    .listReplyUsingGet(commentList.value[index].id,
      pageRef.value[index].current, commentList.value[index].replyCount);
  
    if(res.code === 200){
      commentList.value[index].replyVOList = res.data;
      commentList.value[index].replyCount++;
      // 隐藏回复框
      replyRef.value[index].setReply(false);
      // 回复大于5条展示分页
      // if (commentList.value[index].replyCount > 5) {
      //   pageRef.value[index].setPaging(true);
      // }
      // 隐藏查看更多
      readMoreRef.value[index].style.display = "none";
    }
};
onMounted(() => {
  getList();
});
</script>

<style scoped>

.reply-warp::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.reply-warp {
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
  overflow-x: hidden;
  overflow-y: auto;
}

.reply-title {
  display: flex;
  align-items: center;
  margin: 22px 0;
  padding-left: 10px;
  font-size: 20px;
  font-weight: 600;
  line-height: 40px;
}
.sub-reply-avatar {
  position: absolute;
  left: 0;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
}
.reply-item {
  display: flex;
  padding-top: 1rem;
}
.reply-item .content-warp {
  flex: auto;
  margin-left: 0.6rem;
}
.reply-item .bottom-line {
  border-bottom: 1px solid var(--grey-3);
  margin-top: 0.5rem;
}
.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
}
.user-info .user-name {
  font-size: 0.875rem;
  font-weight: 500;
  margin-right: 0.3125rem;
}
.sub-reply-item {
  position: relative;
  padding: 8px 0 8px 33px;
  font-size: 15px;
  line-height: 24px;
}
.sub-reply-item .sub-user-info {
  display: inline-flex;
  align-items: center;
  margin-right: 9px;
  line-height: 24px;
}
.sub-reply-item .sub-user-name {
  font-size: 13px;
  line-height: 24px;
}
.reply-info {
  display: flex;
  align-items: center;
  margin-top: 0.125rem;
  font-size: 0.8125rem;
  color: #9499a0;
}
.reply-info .reply-time {
  margin-right: 15px;
  padding-top: 2px;
}
.reply-info .reply-like {
  display: flex;
  align-items: center;
  margin-right: 17px;
  cursor: pointer;
}
.reply-info .reply-like:hover .like {
  color: var(--color-pink);
}
.reply-info .reply-btn {
  cursor: pointer;
}
.reply-info .reply-btn:hover {
  color: var(--color-pink);
}
.reply-content {
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  font-size: 0.9375rem;
  line-height: 1.5;
  vertical-align: baseline;
}
.view-more {
  font-size: 13px;
  color: #9499a0;
}
.view-more .view-more-btn {
  cursor: pointer;
}
.view-more .view-more-btn:hover {
  color: var(--color-pink);
}

.shoka-avatar {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
}

.loading-warp {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
}
.loading-warp .btn {
    letter-spacing: 1.25px;
    padding: 10px 14px;
    cursor: pointer;
    color: #222 !important;
    background-image: linear-gradient(to right, rgba(237, 118, 137, .9) 0,rgba(241, 139, 179, .8) 100%);
}

</style>