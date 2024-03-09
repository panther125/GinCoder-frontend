<template>
    <div id="RankView">
    <a-card class="RanktableView">
      <a-alert banner center style="margin-bottom: 3%;">
        <p style="color: #a03bff;font-size: 1.2rem;">简单 加 1分、 中等 加 3分 、困难 加 10分</p>
      </a-alert>
      <a-table
        :column-resizable="true"
        :ref="tableRef"
        :columns="columns"
        :data="dataList"
        :pagination="{
          showTotal: true,
          pageSize: searchParams.pageSize,
          current: searchParams.current,
          total,
          showJumper: true,
          showPageSize: true,
        }"
        @page-change="onPageChange"
        @pageSizeChange="onPageSizeChange"
      >
        <template #userAvatar="{ record }">
          <a-avatar :size="70" shape="circle">
            <img alt="userAvatar" :src="record.userAvatar" />
          </a-avatar>
        </template>
      </a-table>
    </a-card>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref, watchEffect,reactive } from "vue";
  import {
    QuestionControllerService
  } from "../../generated";
  import message from "@arco-design/web-vue/es/message";
  
  const tableRef = ref();
  
  const dataList = ref([]);
  const total = ref(0);
  const searchParams = ref({
    id: undefined,
    pageSize: 10,
    current: 1,
  });
  
  const loadData = async () => {
    const res = await QuestionControllerService.listPageRankListUsingPost({
      ...searchParams.value,
    });
    if (res.code === 0) {
      dataList.value = res.data.records;
      //userInfo.value = res.data.records;
      total.value = res.data.total;
    } else {
      message.error("加载失败，" + res.message);
    }
  };
  
  /**
   * 监听 searchParams 变量，改变时触发页面的重新加载
   */
  watchEffect(() => {
    loadData();
  });
  
  /**
   * 页面加载时，请求数据
   */
  onMounted(() => {
    loadData();
  });
  
  const columns = [
    {
      title: "排名",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "名称",
      dataIndex: "userName",
      align: "center",
    },
    {
      title: "头像",
      slotName: "userAvatar",
      align: "center",
      width: 64,
    },
    {
      title: "简介",
      dataIndex: "userProfile",
      align: "center",
    },
    {
      title: "ac数量",
      dataIndex: "userAcTotal",
      align: "center",
    },
    {
      title: "提交数量",
      dataIndex: "userSubmitTotal",
      align: "center",
    },
    {
      title: "用户得分",
      dataIndex: "userScore",
      align: "center",
    },
    {
      title: "通过率",
      dataIndex: "passRate",
      align: "center",
      default: "0",
      // 判断值是否为空，如果为空则显示默认值
    },
  ];
  /**
   * 分页
   * @param page
   */
  const onPageChange = (page: number) => {
    searchParams.value = {
      ...searchParams.value,
      current: page,
    };
  };
  
  /**
   * 分页大小
   * @param size
   */
  const onPageSizeChange = (size: number) => {
    searchParams.value = {
      ...searchParams.value,
      pageSize: size,
    };
  };
  </script>
  
  <style scoped>
  #RankView {
    padding: 5px;
    box-shadow: 0px 0px 10px rgba(35, 7, 7, 0.21);
    border-radius: 10px;
    max-width: 1440px;
    margin: 0 auto;
  }
  </style>