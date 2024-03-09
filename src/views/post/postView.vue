<template>
<div id="postView">
    <a-card class="manageQuestionList">
    <a-list
        hoverable
        class="list-demo-action-layout"
        :bordered="false"
        :data="dataSource"
        :pagination-props="PaginationProps"
        @page-change="onPageChange"
    >
        <template #item="{ item }">
        <a-list-item class="list-demo-item" action-layout="horizontal">
        <a-card hoverable @click="gotoPost(item.id)" style="max-width: '30%'">
            <template #cover >
            <div
                :style="{
                height: '204px',
                overflow: 'hidden',
                }"
            >
                <img
                :style="{ width: '100%', transform: 'translateY(-20px)' }"
                alt="dessert"
                :src= item.background
                />
            </div>
            </template>
            <a-card-meta :title=item.title>
                <template #description>
                    {{ item.description}}
                </template>
            </a-card-meta>
            <a-space wrap>
              <a-tag v-for="(tag, index) of item.tags" :key="index" :color="colors[index]" bordered>{{ tag }}</a-tag>
            </a-space>
        </a-card>
        </a-list-item>
        </template>
    </a-list>
</a-card>
</div>
</template>
  
<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { onMounted, reactive,ref,computed,watchEffect } from 'vue'
import { PostQueryRequest ,PostControllerService, PostVO} from '../../../generated'
import { useRouter } from "vue-router";

const router = useRouter();

const searchParams = ref<PostQueryRequest>({
  pageSize: 8,
  current: 1,
});

const colors = [
      'orange',
      'gold',
      'lime',
      'green',
      'cyan',
      'blue',
      'arcoblue',
      'purple',
      'pinkpurple',
      'magenta',
      'gray'
    ];

const dataSource = ref([]);
const PaginationProps = ref({
    defaultPageSize: searchParams.value.pageSize,
    total: Number
})


const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    current: page,
  };
  loadData()
};

const gotoPost = (id: number) => {
  //alert(id)
  router.push({ path: `/post/detaile/${id}` });
};
/**
 * 页面加载时，请求数据
 */
 onMounted(() => {
  loadData();
});

const loadData = async () => {
    const res = await PostControllerService.listPostVoByPageUsingPost({
        ...searchParams.value,
    });
    if (res.code === 0) {
        dataSource.value = res.data.records;
        //alert(dataSource.value.)
        PaginationProps.value.total = res.data.total;
    } else {
        Message.error("数据加载失败" + res.message);
    }
};

</script>
  
<style scoped>

.manageQuestionList {
  flex: 1;
  margin-right: 8px;
}

#postView {
    max-width: 1440px;
}
:deep(.list-demo-action-layout){
    display: flex;
}
:deep(.arco-list-content) {
    display: flex;
    flex-wrap: wrap;
}
.list-demo-action-layout .image-area {
  width: 183px;
  height: 119px;
  border-radius: 2px;
  overflow: hidden;
}

.list-demo-action-layout .list-demo-item {
  padding: 20px 0;
  width: 25%;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}
</style>
