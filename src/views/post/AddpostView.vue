<template>
    <div id="AddpostView">
      <a-drawer
        :visible="drawerVisible"
        @cancel="CloseDrawer"
        :width="880"
        :footer="false"
      >
        <template #title>
          <div>{{ id ? "更新文章" : "创建文章" }}</div>
        </template>
        <a-form :model="form">
          <a-form-item field="title" label="标题">
            <a-input
              v-model="form.title"
              placeholder="请输入标题"
              class="titleInput"
            />
          </a-form-item>
          <a-form-item field="tags" label="标签">
            <a-input-tag v-model="tags" placeholder="请选择标签" allow-clear />
          </a-form-item>
          <a-form-item field="content" label="文章内容">
            <MdEditor :value="form.content" :handle-change="onContentChange" />
          </a-form-item>
          <a-form-item field="description" label="文章描述">
            <a-textarea v-model="form.description" :max-length="{length:50,errorOnly:true}" allow-clear
                            show-word-limit />
          </a-form-item>
          <a-form-item field="background" label="文章背景">
            <a-upload v-if="!form.background" draggable :change="uploadFile" :limit="1" />
            <img v-else :src= "form.background" style="width: 20%; height: auto;" >
          </a-form-item>
          <div style="margin-top: 16px" />
          <a-form-item>
            <a-button
              type="primary"
              style="min-width: 200px"
              @click="doSubmit"
              class="submit"
              >提交
            </a-button>
          </a-form-item>
        </a-form>
      </a-drawer>
    </div>
  </template>
  
  <script setup lang="ts">
  import MdEditor from "@/components/MdEditor.vue";
  import { Message } from "@arco-design/web-vue";
  import { PostControllerService,FileControllerService } from "../../../generated";
  import { ref, computed, onMounted, watch, toRef } from "vue";
  import { useStore } from "vuex";
  /**
   *  定义组件属性类型
   */
  interface Props {
    postId: string;
  }
  /**
   * 给组件指定初始值
   */
  const props = withDefaults(defineProps<Props>(), {
    postId: () => "",
  });
  const id = ref();
  watch(toRef(props, "postId"), (newId) => {
    id.value = newId;
    loadData();
  });
  const store = useStore();
  const tags = ref();
  const form = ref();
  
  // 获取创建题目抽屉显示状态
  const drawerVisible = computed(() => store.state.questionDrawer.drawerVisible);
  /**
   * 根据题目 id 获取老的数据
   */
  const loadData = async () => {
    reset();
    if (!id.value) {
      return;
    }
    const res = await PostControllerService.getPostVoByIdUsingGet(
      id.value as any
    );
    if (res.code === 0) {
      form.value = res.data as any;
  
      if (!form.value.tags) {
        form.value.tags = [];
      } else {
        //form.value.tags = JSON.parse(form.value.tags as any);
        tags.value = form.value.tags;
      }
    } else {
      Message.error("加载失败" + res.message);
    }
  };
  
  const reset = () => {
    form.value = {
      title: "",
      tags: [] as string[],
      description: "",
      content: "",
      background: "",
    };
    tags.value = [];
  };
  
  onMounted(() => {
    loadData();
  });
  
  const onContentChange = (value: string) => {
    form.value.content = value;
  };
  
  const CloseDrawer = () => {
    store.commit("questionDrawer/showDrawerVisible", false);
  };
  const uploadFile = async (file: any) => {
    const res = await FileControllerService.uploadFileUsingPost(file);
    form.value.background = res;
  }

  const handleTags = () => {
    return [...tags.value].filter((v) => v);
  };
  const doSubmit = async () => {
    form.value.tags = handleTags();

    if (id.value) {
      const res = await PostControllerService.updatePostUsingPost(
        form.value
      );
      //alert(form.value.description)
      //form.value.description = 
      if (res.code === 0) {
        Message.success("更新成功");
      } else {
        Message.error("更新失败" + res.message);
      }
    } else {
      const res = await PostControllerService.addPostUsingPost(
        form.value
      );
      if (res.code === 0) {
        Message.success("创建成功");
      } else {
        Message.error("创建失败" + res.message);
      }
    }
    store.commit("questionDrawer/showDrawerVisible", false);
  };
  </script>
  
  <style scoped>
  #AddpostView {
    max-width: 880px;
    margin: auto;
  }
  #codeEditor {
    height: 200px;
    width: 100%;
  }
  .titleInput {
    width: 100%;
  }
  .arco-input-tag {
    width: 100%;
  }
  .arco-input-number {
    margin-right: 12px;
  }
  .addTest {
    width: 100%;
    color: var(--color-text-2);
    background-color: var(--color-fill-2);
    border: 2px dashed var(--color-neutral-3);
  }
  .submit {
    margin-left: auto;
  }
  :deep(
      .arco-list-medium
        .arco-list-content-wrapper
        .arco-list-content
        > .arco-list-item
    ) {
    padding: 5px 15px;
  }
  
  .button-box {
    display: flex;
    justify-content: end;
  }
  .dividerText {
    font-size: 12px;
    color: gray;
  }
  </style>
  