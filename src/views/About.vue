<template>
  <a-card class="problemSolve">
    <div class="main">
      <div class="title"></div>
      <MdViewer :value="answer" />
    </div>
  </a-card>
</template>

<script setup lang="ts">
import MdViewer from "@/components/MdViewer.vue";
const answer = "# GinOJ在线判题系统使用帮助\n" +
                "## 判题系统的编译器信息\n"+
              "```java\n"+
              "JAVA：javac 1.8 -encoding=utf-8\n"+
              "```\n"+
              "```cpp\n"+
              "CPP: g++ -DONLINE_JUDGE -O2 -w -fmax-errors=3 %s -lm -o %s\n"+
              "```\n"+
              "## 输入和输出\n"+
              "JAVA，注意类名必须为`Main`, 不要有任何`package` xxx信息\n"+
              "注意`hasNext`和`hasNextLine`的区别\n"+

              "```java\n"+
              "import java.util.Scanner;\n\n"+
              "public class Main {\n"+
              "    public static void main(String[] args) {\n"+
              "        Scanner in = new Scanner(System.in); \n"+
              "        while (in.hasNextInt()) { \n"+
              "            //注意while处理多个case  \n"+
              "            int a = in.nextInt();\n"+
              "            int b = in.nextInt();\n"+
              "            System.out.println(a + b);\n"+
              "        }\n"+
              "    }\n"+
              "} \n"+
              "```\n"

</script>

<style scoped>
:deep(.arco-card-body) {
  padding: 8px 16px;
}
.problemSolve {
  height: 100%;
  width: 80%;
  font-size: large;
  line-height: 1.4em;
  margin: auto;
}
.header {
  padding-bottom: 5px;
  border-bottom: 1px solid #eee;  
}
.closeIcon {
  color: gray;
  cursor: pointer;
}
</style>
