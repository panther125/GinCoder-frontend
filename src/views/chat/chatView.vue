<template>
    <a-card id = chatView>
    <div class="flex flex-col h-screen" style="overflow: overlay;">
      <div
        class="flex w-full items-baseline px-6 py-4 bg-gray-100"
      >
        <div class="text-2xl font-bold" style="color:rgb(29 78 216)">ChatGPT</div>
        <div class="ml-4 text-sm text-gray-500">
          基于 OpenAI 的 ChatGPT 自然语言模型人工智能对话
          <p style="color: red; font-weight: 900;"> 免费1万token 谨慎对话</p>
        </div>
        <div
          class="ml-auto px-3 py-2 text-sm cursor-pointer rounded-md"
          style="color: black;"
          @click="clickConfig()"
        >
          设置
        </div>
      </div>
  
      <div class="flex-1 mx-2 mb-2" ref="chatListDom">
        <div
          class="group flex flex-col px-4 py-3 rounded-lg"
          v-for="item of messageList.filter((v) => v.role !== 'system')"
        >
          <div class="flex justify-between items-center mb-2">
            <div class="font-bold">{{ roleAlias[item.role] }}：</div>
            <!-- <Copy class="invisible group-hover:visible" :content="item.content" /> -->
          </div>
          <div>
            <Viewer :value="item.content"  v-if="item.content"/>
            <Loding v-else />
          </div>
        </div>
      </div>
  
      <div class="sticky w-full p-6 pb-8 bg-gray-100">
        <div class="flex">
        <input
            class="input"
            :type="isLogin ? 'password' : 'text'"
            :placeholder="isLogin ? '请先登录' : '请输入'"
            v-model="messageContent"
            @keydown.enter="isTalking || sendChatMessage()"
            />
            <button class="btn" :disabled="isTalking || isLogin" @click="sendChatMessage()">
            发送
            </button>
        </div>
      </div>
    </div>
</a-card>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, nextTick, onMounted } from "vue";
  import Loding from "@/components/type/Loding.vue";
  import { Viewer } from "@bytemd/vue-next";
  import { useStore } from "vuex";
  import API from "../../../generated";
  import { computed } from "vue";

  interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
  }

  interface Props {
  onSuccess?: (result: API.QuestionContentDTO[]) => void;
  onSSESuccess?: (result: API.QuestionContentDTO) => void;
  onSSEStart?: (event: any) => void;
  onSSEClose?: (event: any) => void;
}
const props = withDefaults(defineProps<Props>(), {

});

  const store = useStore();
  // 获取相关信息
  const loginUser = computed(() => store.state.user.loginUser);
  let isLogin = ref(true);
  let isTalking = ref(false);
  let messageContent = ref("");
  const chatListDom = ref<HTMLDivElement>();
  const roleAlias = { user: "ME", assistant: "ChatGPT", system: "System" };
  const messageList = ref<ChatMessage[]>([
    {
      role: "system",
      content: "你是 ChatGPT，OpenAI 训练的大型语言模型，尽可能简洁地回答。",
    },
    {
      role: "assistant",
      content: `你好，我是AI语言模型，我可以提供一些常用服务和信息，例如：
  
  1. 翻译：我可以把中文翻译成英文，英文翻译成中文，还有其他一些语言翻译，比如法语、日语、西班牙语等。
  
  2. 咨询服务：如果你有任何问题需要咨询，例如健康、法律、投资等方面，我可以尽可能为你提供帮助。
  
  3. 闲聊：如果你感到寂寞或无聊，我们可以聊一些有趣的话题，以减轻你的压力。
  
  请告诉我你需要哪方面的帮助，我会根据你的需求给你提供相应的信息和建议。`,
    },
  ]);
  
  onMounted(() => {
    if (loginUser) {
      switchConfigStatus();
    }
  });
  
  const sendChatMessage = async (content: string = messageContent.value) => {
    switchConfigStatus();
    //console.log(isLogin.value)
    //console.log(loginUser.value.id)
    try {
      isTalking.value = true;
      if (messageList.value.length === 2) {
        messageList.value.pop();
      }
      messageList.value.push({ role: "user", content });
      clearMessageContent();
      messageList.value.push({ role: "assistant", content: "" });
      // 创建 SSE 请求
  const eventSource = new EventSource(
    // todo 手动填写完整的后端地址
    "http://localhost:9001/api/chat/ai/sse" +
      `?content=`+ content + "&id=" + loginUser.value.id + "&timeStamp="+ Date.parse(new Date().toString()) 
  );
  // 接收消息
  eventSource.onmessage = function (event) {
    console.log(event.data)
    appendLastMessageContent(event.data);
    props.onSSESuccess?.(JSON.parse(event.data));
  };
  // 报错或连接关闭时触发
  eventSource.onerror = function (event) {
    if (event.eventPhase === EventSource.CLOSED) {
      console.log("关闭连接");
      appendLastMessageContent("token 不足");
      props.onSSEClose?.(event);
      eventSource.close();
    } else {
        appendLastMessageContent("token 不足");
      eventSource.close();
    }
  };
    } catch (error: any) {
        console.log("hello")
      appendLastMessageContent("token 不足");
    } finally {
      isTalking.value = false;
    }
  };
  
  const appendLastMessageContent = (content: string) =>
    (messageList.value[messageList.value.length - 1].content += content);
  
  const clickConfig = () => {
    if (!isLogin.value) {
      // todo 设置promoat 和 参数
    } else {
      clearMessageContent();
    }
  };

  const switchConfigStatus = () => (isLogin.value = loginUser.value.id == undefined);
  
  const clearMessageContent = () => (messageContent.value = "");
  
  const scrollToBottom = () => {
    if (!chatListDom.value) return;
    scrollTo(0, chatListDom.value.scrollHeight);
  };
  
  watch(messageList.value, () => nextTick(() => scrollToBottom()));
  </script>
  
  <style scoped>
  #chatView{
    width: 95%;
  margin: auto;
  }
    *,:before,:after {
    box-sizing: border-box;
    border-width: 0;
    border-style: solid;
    border-color: #e5e7eb
}

:before,:after {
    --tw-content: ""
}

hr {
    height: 0;
    color: inherit;
    border-top-width: 1px
}

abbr:where([title]) {
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted
}

h1,h2,h3,h4,h5,h6 {
    font-size: inherit;
    font-weight: inherit
}

a {
    color: inherit;
    text-decoration: inherit
}

b,strong {
    font-weight: bolder
}

code,kbd,samp,pre {
    font-family: ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
    font-size: 1em
}

small {
    font-size: 80%
}


table {
    text-indent: 0;
    border-color: inherit;
    border-collapse: collapse
}

button,input,optgroup,select,textarea {
    font-family: inherit;
    font-size: 100%;
    font-weight: inherit;
    line-height: inherit;
    color: inherit;
    margin: 0;
    padding: 0
}

button,select {
    text-transform: none
}

button,[type=button],[type=reset],[type=submit] {
    -webkit-appearance: button;
    background-color: transparent;
    background-image: none
}

:-moz-focusring {
    outline: auto
}

:-moz-ui-invalid {
    box-shadow: none
}

progress {
    vertical-align: baseline
}

::-webkit-inner-spin-button,::-webkit-outer-spin-button {
    height: auto
}

[type=search] {
    -webkit-appearance: textfield;
    outline-offset: -2px
}

::-webkit-search-decoration {
    -webkit-appearance: none
}

::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit
}

summary {
    display: list-item
}

blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre {
    margin: 0
}

fieldset {
    margin: 0;
    padding: 0
}

legend {
    padding: 0
}

ol,ul,menu {
    list-style: none;
    margin: 0;
    padding: 0
}

textarea {
    resize: vertical
}

input::-moz-placeholder,textarea::-moz-placeholder {
    opacity: 1;
    color: #9ca3af
}

input::placeholder,textarea::placeholder {
    opacity: 1;
    color: #9ca3af
}

button,[role=button] {
    cursor: pointer
}

:disabled {
    cursor: default
}

img,svg,video,canvas,audio,iframe,embed,object {
    display: block;
    vertical-align: middle
}

img,video {
    max-width: 100%;
    height: auto
}

[hidden] {
    display: none
}

*,:before,:after {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-gradient-from-position: ;
    --tw-gradient-via-position: ;
    --tw-gradient-to-position: ;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / .5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia:
}

::backdrop {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x: ;
    --tw-pan-y: ;
    --tw-pinch-zoom: ;
    --tw-scroll-snap-strictness: proximity;
    --tw-gradient-from-position: ;
    --tw-gradient-via-position: ;
    --tw-gradient-to-position: ;
    --tw-ordinal: ;
    --tw-slashed-zero: ;
    --tw-numeric-figure: ;
    --tw-numeric-spacing: ;
    --tw-numeric-fraction: ;
    --tw-ring-inset: ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / .5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur: ;
    --tw-brightness: ;
    --tw-contrast: ;
    --tw-grayscale: ;
    --tw-hue-rotate: ;
    --tw-invert: ;
    --tw-saturate: ;
    --tw-sepia: ;
    --tw-drop-shadow: ;
    --tw-backdrop-blur: ;
    --tw-backdrop-brightness: ;
    --tw-backdrop-contrast: ;
    --tw-backdrop-grayscale: ;
    --tw-backdrop-hue-rotate: ;
    --tw-backdrop-invert: ;
    --tw-backdrop-opacity: ;
    --tw-backdrop-saturate: ;
    --tw-backdrop-sepia:
}

.prose {
    color: var(--tw-prose-body);
    max-width: 65ch
}

.prose :where(p):not(:where([class~="not-prose"] *)) {
    margin-top: 1.25em;
    margin-bottom: 1.25em
}

.prose :where([class~="lead"]):not(:where([class~="not-prose"] *)) {
    color: var(--tw-prose-lead);
    font-size: 1.25em;
    line-height: 1.6;
    margin-top: 1.2em;
    margin-bottom: 1.2em
}

.prose :where(a):not(:where([class~="not-prose"] *)) {
    color: var(--tw-prose-links);
    text-decoration: underline;
    font-weight: 500
}

.prose :where(strong):not(:where([class~="not-prose"] *)) {
    color: var(--tw-prose-bold);
    font-weight: 600
}

.prose :where(a strong):not(:where([class~="not-prose"] *)) {
    color: inherit
}

.prose :where(blockquote strong):not(:where([class~="not-prose"] *)) {
    color: inherit
}

.prose :where(thead th strong):not(:where([class~="not-prose"] *)) {
    color: inherit
}

.prose :where(ol):not(:where([class~="not-prose"] *)) {
    list-style-type: decimal;
    margin-top: 1.25em;
    margin-bottom: 1.25em;
    padding-left: 1.625em
}

.prose :where(ol[type="A"]):not(:where([class~="not-prose"] *)) {
    list-style-type: upper-alpha
}

.prose :where(ol[type="a"]):not(:where([class~="not-prose"] *)) {
    list-style-type: lower-alpha
}

.prose :where(ol[type="A" s]):not(:where([class~="not-prose"] *)) {
    list-style-type: upper-alpha
}

.prose :where(ol[type="a" s]):not(:where([class~="not-prose"] *)) {
    list-style-type: lower-alpha
}

.prose :where(ol[type="I"]):not(:where([class~="not-prose"] *)) {
    list-style-type: upper-roman
}

.prose :where(ol[type="i"]):not(:where([class~="not-prose"] *)) {
    list-style-type: lower-roman
}

.prose :where(ol[type="I" s]):not(:where([class~="not-prose"] *)) {
    list-style-type: upper-roman
}

.prose :where(ol[type="i" s]):not(:where([class~="not-prose"] *)) {
    list-style-type: lower-roman
}

.prose :where(ol[type="1"]):not(:where([class~="not-prose"] *)) {
    list-style-type: decimal
}

.prose :where(ul):not(:where([class~="not-prose"] *)) {
    list-style-type: disc;
    margin-top: 1.25em;
    margin-bottom: 1.25em;
    padding-left: 1.625em
}

.prose :where(ol > li):not(:where([class~="not-prose"] *))::marker {
    font-weight: 400;
    color: var(--tw-prose-counters)
}

.prose :where(ul > li):not(:where([class~="not-prose"] *))::marker {
    color: var(--tw-prose-bullets)
}

.prose :where(hr):not(:where([class~="not-prose"] *)) {
    border-color: var(--tw-prose-hr);
    border-top-width: 1px;
    margin-top: 3em;
    margin-bottom: 3em
}

.prose :where(blockquote):not(:where([class~="not-prose"] *)) {
    font-weight: 500;
    font-style: italic;
    color: var(--tw-prose-quotes);
    border-left-width: .25rem;
    border-left-color: var(--tw-prose-quote-borders);
    quotes: "“""”""‘""’";
    margin-top: 1.6em;
    margin-bottom: 1.6em;
    padding-left: 1em
}

.prose :where(blockquote p:first-of-type):not(:where([class~="not-prose"] *)):before {
    content: open-quote
}

.prose :where(blockquote p:last-of-type):not(:where([class~="not-prose"] *)):after {
    content: close-quote
}

.prose :where(h1):not(:where([class~="not-prose"] *)) {
    color: var(--tw-prose-headings);
    font-weight: 800;
    font-size: 2.25em;
    margin-top: 0;
    margin-bottom: .8888889em;
    line-height: 1.1111111
}

.prose :where(h1 strong):not(:where([class~="not-prose"] *)) {
    font-weight: 900;
    color: inherit
}

.prose :where(h2):not(:where([class~="not-prose"] *)) {
    color: var(--tw-prose-headings);
    font-weight: 700;
    font-size: 1.5em;
    margin-top: 2em;
    margin-bottom: 1em;
    line-height: 1.3333333
}

.prose :where(h2 strong):not(:where([class~="not-prose"] *)) {
    font-weight: 800;
    color: inherit
}

.prose :where(h3):not(:where([class~="not-prose"] *)) {
    color: var(--tw-prose-headings);
    font-weight: 600;
    font-size: 1.25em;
    margin-top: 1.6em;
    margin-bottom: .6em;
    line-height: 1.6
}

.prose :where(h3 strong):not(:where([class~="not-prose"] *)) {
    font-weight: 700;
    color: inherit
}

.prose :where(h4):not(:where([class~="not-prose"] *)) {
    color: var(--tw-prose-headings);
    font-weight: 600;
    margin-top: 1.5em;
    margin-bottom: .5em;
    line-height: 1.5
}

.prose :where(h4 strong):not(:where([class~="not-prose"] *)) {
    font-weight: 700;
    color: inherit
}

.prose :where(img):not(:where([class~="not-prose"] *)) {
    margin-top: 2em;
    margin-bottom: 2em
}

.prose :where(figure > *):not(:where([class~="not-prose"] *)) {
    margin-top: 0;
    margin-bottom: 0
}

.prose :where(figcaption):not(:where([class~="not-prose"] *)) {
    color: var(--tw-prose-captions);
    font-size: .875em;
    line-height: 1.4285714;
    margin-top: .8571429em
}

.prose :where(code):not(:where([class~="not-prose"] *)) {
    color: var(--tw-prose-code);
    font-weight: 600;
    font-size: .875em
}

.prose :where(code):not(:where([class~="not-prose"] *)):before {
    content: "`"
}

.prose :where(code):not(:where([class~="not-prose"] *)):after {
    content: "`"
}

.prose :where(a code):not(:where([class~="not-prose"] *)) {
    color: inherit
}

.prose :where(h1 code):not(:where([class~="not-prose"] *)) {
    color: inherit
}

.prose :where(h2 code):not(:where([class~="not-prose"] *)) {
    color: inherit;
    font-size: .875em
}

.prose :where(h3 code):not(:where([class~="not-prose"] *)) {
    color: inherit;
    font-size: .9em
}

.prose :where(h4 code):not(:where([class~="not-prose"] *)) {
    color: inherit
}

.prose :where(blockquote code):not(:where([class~="not-prose"] *)) {
    color: inherit
}

.prose :where(thead th code):not(:where([class~="not-prose"] *)) {
    color: inherit
}

.prose :where(pre):not(:where([class~="not-prose"] *)) {
    color: var(--tw-prose-pre-code);
    background-color: var(--tw-prose-pre-bg);
    overflow-x: auto;
    font-weight: 400;
    font-size: .875em;
    line-height: 1.7142857;
    margin-top: 1.7142857em;
    margin-bottom: 1.7142857em;
    border-radius: .375rem;
    padding: .8571429em 1.1428571em
}

.prose :where(pre code):not(:where([class~="not-prose"] *)) {
    background-color: transparent;
    border-width: 0;
    border-radius: 0;
    padding: 0;
    font-weight: inherit;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit
}

.prose :where(pre code):not(:where([class~="not-prose"] *)):before {
    content: none
}

.prose :where(pre code):not(:where([class~="not-prose"] *)):after {
    content: none
}

.prose :where(table):not(:where([class~="not-prose"] *)) {
    width: 100%;
    table-layout: auto;
    text-align: left;
    margin-top: 2em;
    margin-bottom: 2em;
    font-size: .875em;
    line-height: 1.7142857
}

.prose :where(thead):not(:where([class~="not-prose"] *)) {
    border-bottom-width: 1px;
    border-bottom-color: var(--tw-prose-th-borders)
}

.prose :where(thead th):not(:where([class~="not-prose"] *)) {
    color: var(--tw-prose-headings);
    font-weight: 600;
    vertical-align: bottom;
    padding-right: .5714286em;
    padding-bottom: .5714286em;
    padding-left: .5714286em
}

.prose :where(tbody tr):not(:where([class~="not-prose"] *)) {
    border-bottom-width: 1px;
    border-bottom-color: var(--tw-prose-td-borders)
}

.prose :where(tbody tr:last-child):not(:where([class~="not-prose"] *)) {
    border-bottom-width: 0
}

.prose :where(tbody td):not(:where([class~="not-prose"] *)) {
    vertical-align: baseline
}

.prose :where(tfoot):not(:where([class~="not-prose"] *)) {
    border-top-width: 1px;
    border-top-color: var(--tw-prose-th-borders)
}

.prose :where(tfoot td):not(:where([class~="not-prose"] *)) {
    vertical-align: top
}

.prose {
    --tw-prose-body: #374151;
    --tw-prose-headings: #111827;
    --tw-prose-lead: #4b5563;
    --tw-prose-links: #111827;
    --tw-prose-bold: #111827;
    --tw-prose-counters: #6b7280;
    --tw-prose-bullets: #d1d5db;
    --tw-prose-hr: #e5e7eb;
    --tw-prose-quotes: #111827;
    --tw-prose-quote-borders: #e5e7eb;
    --tw-prose-captions: #6b7280;
    --tw-prose-code: #111827;
    --tw-prose-pre-code: #e5e7eb;
    --tw-prose-pre-bg: #1f2937;
    --tw-prose-th-borders: #d1d5db;
    --tw-prose-td-borders: #e5e7eb;
    --tw-prose-invert-body: #d1d5db;
    --tw-prose-invert-headings: #fff;
    --tw-prose-invert-lead: #9ca3af;
    --tw-prose-invert-links: #fff;
    --tw-prose-invert-bold: #fff;
    --tw-prose-invert-counters: #9ca3af;
    --tw-prose-invert-bullets: #4b5563;
    --tw-prose-invert-hr: #374151;
    --tw-prose-invert-quotes: #f3f4f6;
    --tw-prose-invert-quote-borders: #374151;
    --tw-prose-invert-captions: #9ca3af;
    --tw-prose-invert-code: #fff;
    --tw-prose-invert-pre-code: #d1d5db;
    --tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);
    --tw-prose-invert-th-borders: #4b5563;
    --tw-prose-invert-td-borders: #374151;
    font-size: 1rem;
    line-height: 1.75
}

.prose :where(video):not(:where([class~="not-prose"] *)) {
    margin-top: 2em;
    margin-bottom: 2em
}

.prose :where(figure):not(:where([class~="not-prose"] *)) {
    margin-top: 2em;
    margin-bottom: 2em
}

.prose :where(li):not(:where([class~="not-prose"] *)) {
    margin-top: .5em;
    margin-bottom: .5em
}

.prose :where(ol > li):not(:where([class~="not-prose"] *)) {
    padding-left: .375em
}

.prose :where(ul > li):not(:where([class~="not-prose"] *)) {
    padding-left: .375em
}

.prose :where(.prose > ul > li p):not(:where([class~="not-prose"] *)) {
    margin-top: .75em;
    margin-bottom: .75em
}

.prose :where(.prose > ul > li > *:first-child):not(:where([class~="not-prose"] *)) {
    margin-top: 1.25em
}

.prose :where(.prose > ul > li > *:last-child):not(:where([class~="not-prose"] *)) {
    margin-bottom: 1.25em
}

.prose :where(.prose > ol > li > *:first-child):not(:where([class~="not-prose"] *)) {
    margin-top: 1.25em
}

.prose :where(.prose > ol > li > *:last-child):not(:where([class~="not-prose"] *)) {
    margin-bottom: 1.25em
}

.prose :where(ul ul,ul ol,ol ul,ol ol):not(:where([class~="not-prose"] *)) {
    margin-top: .75em;
    margin-bottom: .75em
}

.prose :where(hr + *):not(:where([class~="not-prose"] *)) {
    margin-top: 0
}

.prose :where(h2 + *):not(:where([class~="not-prose"] *)) {
    margin-top: 0
}

.prose :where(h3 + *):not(:where([class~="not-prose"] *)) {
    margin-top: 0
}

.prose :where(h4 + *):not(:where([class~="not-prose"] *)) {
    margin-top: 0
}

.prose :where(thead th:first-child):not(:where([class~="not-prose"] *)) {
    padding-left: 0
}

.prose :where(thead th:last-child):not(:where([class~="not-prose"] *)) {
    padding-right: 0
}

.prose :where(tbody td,tfoot td):not(:where([class~="not-prose"] *)) {
    padding: .5714286em
}

.prose :where(tbody td:first-child,tfoot td:first-child):not(:where([class~="not-prose"] *)) {
    padding-left: 0
}

.prose :where(tbody td:last-child,tfoot td:last-child):not(:where([class~="not-prose"] *)) {
    padding-right: 0
}

.prose :where(.prose > :first-child):not(:where([class~="not-prose"] *)) {
    margin-top: 0
}

.prose :where(.prose > :last-child):not(:where([class~="not-prose"] *)) {
    margin-bottom: 0
}

.btn {
    transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
    white-space: nowrap;
    border-radius: .375rem;
    --tw-bg-opacity: 1;
    background-color: rgb(29 78 216 / var(--tw-bg-opacity));
    padding: .5rem 1rem;
    font-size: .875rem;
    line-height: 1.25rem;
    font-weight: 500;
    text-transform: capitalize;
    letter-spacing: .025em;
    --tw-text-opacity: 1;
    color: rgb(255 255 255 / var(--tw-text-opacity));
    transition-property: color,background-color,border-color,text-decoration-color,fill,stroke;
    transition-timing-function: cubic-bezier(.4,0,.2,1);
    transition-duration: .3s
}

.btn:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(37 99 235 / var(--tw-bg-opacity))
}

.btn:focus {
    --tw-bg-opacity: 1;
    background-color: rgb(37 99 235 / var(--tw-bg-opacity));
    outline: 2px solid transparent;
    outline-offset: 2px
}

.btn:disabled {
    --tw-bg-opacity: 1;
    background-color: rgb(147 197 253 / var(--tw-bg-opacity))
}

.input {
    margin-right: .5rem;
    flex-grow: 1;
    border-radius: .375rem;
    border-width: 1px;
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
    padding: .5rem 1rem;
    --tw-text-opacity: 1;
    color: rgb(55 65 81 / var(--tw-text-opacity))
}

.input:focus {
    --tw-border-opacity: 1;
    border-color: rgb(96 165 250 / var(--tw-border-opacity));
    outline: 2px solid transparent;
    outline-offset: 2px;
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000);
    --tw-ring-color: rgb(147 197 253 / var(--tw-ring-opacity));
    --tw-ring-opacity: .4
}

@media (min-width: 640px) {
    .input {
        margin-right:1rem
    }
}

.invisible {
    visibility: hidden
}

.fixed {
    position: fixed
}

.relative {
    position: relative
}

.sticky {
    position: sticky
}

.bottom-0 {
    bottom: 0px
}


.mx-2 {
    margin-left: .5rem;
    margin-right: .5rem
}

.-mt-2 {
    margin-top: -.5rem
}

.mb-2 {
    margin-bottom: .5rem
}

.ml-0 {
    margin-left: 0
}

.ml-0\.5 {
    margin-left: .125rem
}

.ml-4 {
    margin-left: 1rem
}

.ml-auto {
    margin-left: auto
}

.mt-20 {
    margin-top: 5rem
}

.block {
    display: block
}

.flex {
    display: flex
}

.h-screen {
    height: 100vh
}

.w-full {
    width: 100%
}

.flex-1 {
    flex: 1 1 0%
}

.transform {
    transform: translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))
}

.cursor-pointer {
    cursor: pointer
}

.flex-col {
    flex-direction: column
}

.flex-nowrap {
    flex-wrap: nowrap
}

.items-center {
    align-items: center
}

.items-baseline {
    align-items: baseline
}

.justify-between {
    justify-content: space-between
}

.rounded-lg {
    border-radius: .5rem
}

.rounded-md {
    border-radius: .375rem
}

.border {
    border-width: 1px
}

.bg-gray-100 {
    --tw-bg-opacity: 1;
    background-color: rgb(243 244 246 / var(--tw-bg-opacity))
}

.p-6 {
    padding: 1.5rem
}

.px-3 {
    padding-left: .75rem;
    padding-right: .75rem
}

.px-4 {
    padding-left: 1rem;
    padding-right: 1rem
}

.px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem
}

.py-2 {
    padding-top: .5rem;
    padding-bottom: .5rem
}

.py-3 {
    padding-top: .75rem;
    padding-bottom: .75rem
}

.py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem
}

.pb-8 {
    padding-bottom: 2rem
}

.text-2xl {
    font-size: 1.5rem;
    line-height: 2rem
}

.text-sm {
    font-size: .875rem;
    line-height: 1.25rem
}

.text-xs {
    font-size: .75rem;
    line-height: 1rem
}

.font-bold {
    font-weight: 700
}

.leading-none {
    line-height: 1
}

.leading-relaxed {
    line-height: 1.625
}

.text-gray-500 {
    --tw-text-opacity: 1;
    color: rgb(107 114 128 / var(--tw-text-opacity))
}

.text-slate-600 {
    --tw-text-opacity: 1;
    color: rgb(71 85 105 / var(--tw-text-opacity))
}

.outline {
    outline-style: solid
}

.filter {
    filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)
}

.hover\:bg-slate-100:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(241 245 249 / var(--tw-bg-opacity))
}

.hover\:bg-white:hover {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity))
}

.group:hover .group-hover\:visible {
    visibility: visible
}

.i-icon {
    display: inline-block;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale
}

.i-icon-spin svg {
    animation: i-icon-spin 1s infinite linear
}

.i-icon-rtl {
    transform: scaleX(-1)
}

@keyframes i-icon-spin {
    to {
        transform: rotate(360deg)
    }
}

pre code.hljs {
    display: block;
    overflow-x: auto;
    padding: 1em
}

code.hljs {
    padding: 3px 5px
}

.hljs {
    color: #ddd;
    background: #303030
}

.hljs-keyword,.hljs-link,.hljs-literal,.hljs-section,.hljs-selector-tag {
    color: #fff
}

.hljs-addition,.hljs-attribute,.hljs-built_in,.hljs-bullet,.hljs-name,.hljs-string,.hljs-symbol,.hljs-template-tag,.hljs-template-variable,.hljs-title,.hljs-type,.hljs-variable {
    color: #d88
}

.hljs-comment,.hljs-deletion,.hljs-meta,.hljs-quote {
    color: #979797
}

.hljs-doctag,.hljs-keyword,.hljs-literal,.hljs-name,.hljs-section,.hljs-selector-tag,.hljs-strong,.hljs-title,.hljs-type {
    font-weight: 700
}

.hljs-emphasis {
    font-style: italic
}


  pre {
    font-family: -apple-system, "Noto Sans", "Helvetica Neue", Helvetica,
      "Nimbus Sans L", Arial, "Liberation Sans", "PingFang SC", "Hiragino Sans GB",
      "Noto Sans CJK SC", "Source Han Sans SC", "Source Han Sans CN",
      "Microsoft YaHei", "Wenquanyi Micro Hei", "WenQuanYi Zen Hei", "ST Heiti",
      SimHei, "WenQuanYi Zen Hei Sharp", sans-serif;
  }
  </style>