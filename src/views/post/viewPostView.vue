<template>
<a-card id = post>
    <MdViewer :value=content />
</a-card>
</template>
    
<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { PostQueryRequest ,PostControllerService, PostVO} from '../../../generated'
import { onMounted, ref,watch } from 'vue'
import  MdViewer from "@/components/MdViewer.vue";
import { useRoute } from "vue-router";
const route = useRoute();

const content = ref<string>("hello world");

interface Props {
  id: string;
}

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const id = ref<string>(props.id);

// watch(route, () => {
//   id.value = route.params.id as string;
//   //console.log(id.value)
//   loadData();
// });

const loadData = async () =>{
    //alert(id.value)
    const res = await PostControllerService.getPostVoByIdUsingGet(id.value)
    if (res.code === 0) {
      content.value = res.data?.content ? res.data.content : "数据请求异常！！！";
    } else {
      Message.error("数据加载失败" + res.message);
    }
}

/**
 * 页面加载时，请求数据
 */
 onMounted(() => {
  id.value = route.params.id as string;
  //alert(id.value)
  loadData();
});

</script>
<style scoped>
#post{
  margin: 0 20px 20px 20px;
  padding: 10px 10px 10px 20px;
}
</style>
    