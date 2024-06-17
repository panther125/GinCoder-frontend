<template>
    <div id="app">
  
      <div id="__next">
        <div class="overflow-hidden w-full h-full relative">
          <div class="flex h-full flex-1 flex-col md:pl-[260px]">
            <div
              class="sticky top-0 z-10 flex items-center border-b border-white/20 bg-gray-800 pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
              <div>
                <button @click="showSlideMethod" type="button"
                  class="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white dark:hover:text-white"><span
                    class="sr-only">Open sidebar</span>
                  <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round"
                    stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                  </svg>
                </button>
              </div>
              <h1 class="flex-1 text-center text-base font-normal">{{ chatTitle }}</h1>
              <button @click.stop="newChat" type="button" class="px-3">
                <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round"
                  stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
  
            <main class="relative h-full w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
              <!-- 聊天窗 -->
              <div class="flex-1 overflow-hidden">
                <div class="react-scroll-to-bottom--css-ncqif-79elbk h-full dark:bg-gray-800">
                  <div ref="chatContainer" class="react-scroll-to-bottom--css-krija-1n7m0yu">
                    <div class="flex flex-col items-center text-sm dark:bg-gray-800">
                      <!-- 对话item -->
                      <template v-for="conv, idx in conversation">
                        <!-- human -->
                        <div v-if="conv.speaker == 'human'"
                          class="w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800">
                          <div
                            class="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
                            <div class="w-[30px] flex flex-col relative items-end">
                              <div class="relative flex">
                                <span
                                  style="box-sizing: border-box; display: inline-block; overflow: hidden; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; position: relative; max-width: 100%;">
                                  <span
                                    style="box-sizing: border-box; display: block; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px; max-width: 100%;">
                                    <img aria-hidden="true" :src="require('./assets/imgs/human' + avatarIdx + '.png')"
                                      alt="huamn"
                                      style="display: block; max-width: 100%; width: initial; height: initial; background: none; opacity: 1; border: 0px; margin: 0px; padding: 0px;">
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                              <div class="flex flex-grow flex-col gap-3">
                                <div class="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">{{
                                  conv.speech
                                }}
                                </div>
                              </div>
                              <div v-if="false"
                                class="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-3 md:gap-4 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible">
                                <button
                                  class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400 md:invisible md:group-hover:visible">
                                  <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                    stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                  </svg>
                                </button>
                              </div>
                              <div class="flex justify-between"></div>
                            </div>
                          </div>
                        </div>
  
                        <!-- ai -->
                        <div v-if="conv.speaker == 'ai'"
                          class="w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group bg-gray-50 dark:bg-[#444654]">
                          <div
                            class="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
                            <div class="w-[30px] flex flex-col relative items-end">
                              <div
                                class="relative h-[30px] w-[30px] p-1 rounded-sm text-white flex items-center justify-center"
                                style="background-color: rgb(16, 163, 127);">
                                <svg width="41" height="41" viewBox="0 0 41 41" fill="none"
                                  xmlns="http://www.w3.org/2000/svg" stroke-width="1.5" class="h-6 w-6">
                                  <path
                                    d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z"
                                    fill="currentColor"></path>
                                </svg>
                              </div>
  
                              <!-- 多个消息 -->
                              <div v-if="conv.speeches.length > 1"
                                class="text-xs flex items-center justify-center gap-1 invisible absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible">
                                <button @click.stop="last(conv)" :disabled="!(conv.idx > 0)"
                                  class="dark:text-white disabled:text-gray-300 dark:disabled:text-gray-400">
                                  <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24"
                                    stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="15 18 9 12 15 6"></polyline>
                                  </svg>
                                </button>
                                <span class="flex-grow flex-shrink-0">{{ conv.idx + 1 }} / {{
                                  conv.speeches.length
                                }}</span>
                                <button @click.stop="next(conv)" :disabled="!(conv.idx < conv.speeches.length - 1)"
                                  class="dark:text-white disabled:text-gray-300 dark:disabled:text-gray-400">
                                  <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24"
                                    stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3" height="1em" width="1em"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                  </svg>
                                </button>
                              </div>
                            </div>
                            <div class="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
                              <div class="flex flex-grow flex-col gap-3">
                                <!--  whitespace-pre-wrap -->
                                <div class="min-h-[20px] flex flex-col items-start gap-4">
                                  <div v-html="mdToHtml(conv.speeches[conv.idx], conv)"
                                    :class="{ 'result-streaming': conv.loading }"
                                    class="markdown prose-r w-full break-words dark:prose-invert light">
                                  </div>
                                </div>
                              </div>
                              <div class="flex justify-between">
                                <div
                                  class="text-gray-400 flex self-end lg:self-center justify-center mt-2 gap-3 md:gap-4 lg:gap-1 lg:absolute lg:top-0 lg:translate-x-full lg:right-0 lg:mt-0 lg:pl-2 visible">
                                  <button @click.stop="suitable(idx, conv, 1)"
                                    v-if="conv.suitable[conv.idx] == 0 || conv.suitable[conv.idx] == 1"
                                    :class="{ 'suitable_selected': conv.suitable[conv.idx] == 1 }"
                                    class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400">
                                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                      stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em"
                                      width="1em" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                        d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3">
                                      </path>
                                    </svg>
                                  </button>
                                  <button @click.stop="suitable(idx, conv, -1)"
                                    v-if="conv.suitable[conv.idx] == 0 || conv.suitable[conv.idx] == -1"
                                    :class="{ 'suitable_selected': conv.suitable[conv.idx] == -1 }"
                                    class="p-1 rounded-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 disabled:dark:hover:text-gray-400">
                                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                      stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em"
                                      width="1em" xmlns="http://www.w3.org/2000/svg">
                                      <path
                                        d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17">
                                      </path>
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </template>
  
                      <div v-if="conversation.length == 0"
                        class="text-gray-800 w-full md:max-w-2xl lg:max-w-3xl md:h-full md:flex md:flex-col px-6 dark:text-gray-100">
                        <h1
                          class="text-4xl font-semibold text-center mt-6 sm:mt-[20vh] ml-auto mr-auto mb-10 sm:mb-16 flex gap-2 items-center justify-center">
                          ChatGPT</h1>
                        <div class="md:flex items-start text-center gap-3.5">
                          <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                            <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                              <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24"
                                stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="5"></circle>
                                <line x1="12" y1="1" x2="12" y2="3"></line>
                                <line x1="12" y1="21" x2="12" y2="23"></line>
                                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                                <line x1="1" y1="12" x2="3" y2="12"></line>
                                <line x1="21" y1="12" x2="23" y2="12"></line>
                                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                              </svg>
                              Examples
                            </h2>
                            <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                              <button @click="inputChat('Explain quantum computing in simple terms')"
                                class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
                                "Explain
                                quantum computing in simple terms" →
                              </button>
                              <button @click="inputChat('Got any creative ideas for a 10 year old’s birthday?')"
                                class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
                                "Got
                                any creative ideas for a 10 year old’s birthday?"
                                →
                              </button>
                              <button @click="inputChat('How do I make an HTTP request in Javascript?')"
                                class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-900">
                                "How
                                do I make an HTTP request in Javascript?" →
                              </button>
                            </ul>
                          </div>
                          <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                            <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true" class="h-6 w-6">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                  d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z">
                                </path>
                              </svg>
                              Capabilities
                            </h2>
                            <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                              <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">
                                Remembers what user said earlier in the conversation
                              </li>
                              <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">Allows
                                user to provide follow-up corrections
                              </li>
                              <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">Trained
                                to decline inappropriate requests
                              </li>
                            </ul>
                          </div>
                          <div class="flex flex-col mb-8 md:mb-auto gap-3.5 flex-1">
                            <h2 class="flex gap-3 items-center m-auto text-lg font-normal md:flex-col md:gap-2">
                              <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24"
                                stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z">
                                </path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                              </svg>
                              Limitations
                            </h2>
                            <ul class="flex flex-col gap-3.5 w-full sm:max-w-md m-auto">
                              <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">May
                                occasionally generate incorrect information
                              </li>
                              <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">May
                                occasionally produce harmful instructions or biased content
                              </li>
                              <li class="w-full bg-gray-50 dark:bg-white/5 p-3 rounded-md">Limited
                                knowledge of world and events after 2021
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
  
                      <div class="w-full h-32 md:h-48 flex-shrink-0"></div>
                    </div>
  
                    <transition name="el-fade-in-linear">
                      <!-- 回到底部 -->
                      <button v-show="isShowGoBottom" @click="handleScrollBottom"
                        class="cursor-pointer absolute right-6 bottom-[124px] md:bottom-[120px] z-10 rounded-full border border-gray-200 bg-gray-50 text-gray-600 dark:border-white/10 dark:bg-white/10 dark:text-gray-200">
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                          stroke-linejoin="round" class="h-4 w-4 m-1" height="1em" width="1em"
                          xmlns="http://www.w3.org/2000/svg">
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <polyline points="19 12 12 19 5 12"></polyline>
                        </svg>
                      </button>
                    </transition>
                  </div>
                </div>
              </div>
  
              <!-- 底部输入 -->
              <div
                class="absolute bottom-0 left-0 w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient">
                <form class="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
                  <div class="relative flex h-full flex-1 md:flex-col">
                    <div class="flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
                      <button v-if="!convLoading && conversation.length > 0" @click.stop.prevent="chatRepeat"
                        id="chatRepeat" class="btn flex justify-center gap-2 btn-neutral border-0 md:border">
                        <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round"
                          stroke-linejoin="round" class="h-3 w-3" height="1em" width="1em"
                          xmlns="http://www.w3.org/2000/svg">
                          <polyline points="1 4 1 10 7 10"></polyline>
                          <polyline points="23 20 23 14 17 14"></polyline>
                          <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
                        </svg>
                        <p class="none">Regenerate response</p>
                      </button>
  
                      <button v-if="convLoading" @click.stop.prevent="stopChat" id="stopChat"
                        class="btn relative btn-neutral border-0 md:border">
                        <div class="flex w-full items-center justify-center gap-2">
                          <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24"
                            stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          </svg>Stop generating
                        </div>
                      </button>
  
                    </div>
                    <div
                      class="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                      <textarea v-model="chatMsg" ref="inputChat" @keydown="judgeInput" tabindex="0" data-id="root"
                        style="max-height: 200px; height: 24px; overflow-y: hidden;" rows="1"
                        class="m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0"></textarea>
                      <button @click.stop.prevent="send" :disabled="convLoading"
                        class="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-400 dark:hover:bg-gray-900 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
                        <div v-if="convLoading" class="text-2xl" style="line-height: 1.3rem;">
                          <span class="load_dot1">·</span><span class="load_dot2">·</span><span class="load_dot3">·</span>
                        </div>
                        <svg v-else stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                          stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 mr-1" height="1em" width="1em"
                          xmlns="http://www.w3.org/2000/svg">
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                      </button>
                    </div>
                  </div>
                </form>
                <div class="px-3 pt-2 pb-3 text-center text-xs text-black/50 dark:text-white/50 md:px-4 md:pt-3 md:pb-6">
                  <a href="https://gitee.com/MIEAPP/chatai-vue" target="_blank" rel="noreferrer"
                    class="underline">开源：chatai-vue</a> 本开源项目前端使用vue，后端基于openai开放api开发，仅供学习 AI 使用。
                </div>
              </div>
            </main>
          </div>
  
          <!-- 菜单导航 -->
          <div class="dark hidden bg-gray-900 md:fixed md:inset-y-0 md:flex md:w-[260px] md:flex-col">
            <div class="flex h-full min-h-0 flex-col ">
              <div ref="menu" class="scrollbar-trigger flex h-full w-full flex-1 items-start border-white/20">
  
                <nav ref="navEle" class="flex h-full flex-1 flex-col space-y-1 p-2">
                  <a @click.stop="newChat"
                    class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-2 flex-shrink-0 border border-white/20">
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                      stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                    New chat
                  </a>
  
                  <!-- 对话列表 -->
                  <div class="flex-col flex-1 overflow-y-auto border-b border-white/20" style="padding-bottom: 5px;">
                    <div class="flex flex-col gap-2 text-gray-100 text-sm">
  
                      <template v-for="conversation, cidx in conversations">
  
                        <div v-if="conversation.editable"
                          class="m-focus flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer hover:pr-14 break-all pr-14 bg-gray-800 hover:bg-gray-800">
                          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                            stroke-linejoin="round" class="h-4 w-4 flex-shrink-0" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                          </svg>
                          <input id="titleInput" v-model="convTitletmp" @blur="titleInputBlur(cidx, conversation)"
                            type="text" class="text-sm border-none bg-transparent p-0 m-0 w-full mr-0" autofocus="true">
                          <div class="absolute flex right-1 z-10 text-gray-300 visible">
                            <button @click="changeConvTitle(cidx, conversation)" class="p-1 hover:text-white">
                              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </button>
                            <button @click="cancelChangeConvTitle(cidx, conversation)" class="p-1 hover:text-white">
                              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        </div>
  
                        <a v-else-if="conversation.delete" @blur="cancelDelConv(cidx, conversation)"
                          class="m-focus flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all pr-14 bg-gray-800 hover:bg-gray-800 group">
                          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                            stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                          <div class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">Delete "{{
                            conversation.title
                          }}"?
                            <div class="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-800"></div>
                          </div>
                          <div class="absolute flex right-1 z-10 text-gray-300 visible">
                            <button @click="delConv(cidx)" class="p-1 hover:text-white">
                              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </button>
                            <button @click="cancelDelConv(cidx, conversation)" class="p-1 hover:text-white">
                              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </div>
                        </a>
  
  
                        <a v-else @click.stop.prevent="selectConversation(conversation, true)"
                          :class="{ 'bg-gray-800 hover:bg-gray-800 pr-14': conversation.selected, 'hover:bg-[#2A2B32] hover:pr-4': !conversation.selected }"
                          class="flex py-3 px-3 items-center gap-3 relative rounded-md cursor-pointer break-all group">
                          <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                            stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z">
                            </path>
                          </svg>
                          <div class="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
                            {{ conversation.title }}
                            <div
                              :class="{ 'from-gray-800': conversation.selected, 'from-gray-900 group-hover:from-[#2A2B32]': !conversation.selected }"
                              class="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l">
                            </div>
                          </div>
                          <div v-show="conversation.selected" class="absolute flex right-1 z-10 text-gray-300 visible">
                            <button @click="editTitle(cidx, conversation)" class="p-1 hover:text-white">
                              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 20h9"></path>
                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                              </svg>
                            </button>
                            <button @click="conversation.delete = true" class="p-1 hover:text-white">
                              <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em"
                                xmlns="http://www.w3.org/2000/svg">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                                </path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                              </svg>
                            </button>
                          </div>
                        </a>
  
                      </template>
  
                    </div>
                  </div>
  
                  <a v-if="conversations.length > 0" @click.stop.prevent="clearConversations"
                    class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                      stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">
                      </path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Clear conversations
                  </a>
                  <a v-if="theme == 'light'" @click="changeTheme('dark')"
                    class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                      stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                    Dark mode
                  </a>
  
                  <a v-if="theme == 'dark'" @click="changeTheme('light')"
                    class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                      stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="5"></circle>
                      <line x1="12" y1="1" x2="12" y2="3"></line>
                      <line x1="12" y1="21" x2="12" y2="23"></line>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                      <line x1="1" y1="12" x2="3" y2="12"></line>
                      <line x1="21" y1="12" x2="23" y2="12"></line>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                    </svg>
                    Light mode</a>
  
                  <a href="https://discord.gg/openai" target="_blank"
                    class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="2" viewBox="0 0 640 512" class="h-4 w-4"
                      height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z">
                      </path>
                    </svg>
                    OpenAI Discord</a>
                  <a href="https://help.openai.com/en/collections/3742473-chatgpt" target="_blank"
                    class="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round"
                      stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Updates &amp; FAQ</a>
                </nav>
  
              </div>
            </div>
          </div>
        </div>
        <div class="absolute top-0 left-0 right-0 z-[2]"></div>
      </div>
  
      <div v-show="showSlide" class="semi-portal" style="z-index: 1000;">
        <div class="">
          <div class="semi-modal-mask"></div>
          <div role="none" class="semi-modal-wrap">
            <div class="semi-modal semi-modal-small" id="dialog-3" style="width: 0px;">
              <div role="dialog" aria-modal="true" aria-labelledby="semi-modal-title" aria-describedby="semi-modal-body"
                class="semi-modal-content">
                <div class="semi-modal-body-wrapper">
                  <div class="semi-modal-body" x-semi-prop="children">
                    <div class="fixed inset-0 z-40 flex">
                      <div class="relative flex w-full max-w-xs flex-1 flex-col bg-gray-900 translate-x-0"
                        id="headlessui-dialog-panel-:r1:" data-headlessui-state="open">
                        <div class="absolute top-0 right-0 -mr-12 pt-2 opacity-100">
                          <button @click="closeShowSlide" type="button"
                            class="ml-1 flex h-10 w-10 items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"><span
                              class="sr-only">Close sidebar</span>
                            <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24"
                              stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6 text-white" height="1em"
                              width="1em" xmlns="http://www.w3.org/2000/svg">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        </div>
                        <div ref="slideNavContainer" style="width:320px"
                          class="flex h-full flex-1 items-start border-white/20">
  
  
                        </div>
                      </div>
                      <div @click="closeShowSlide" style="width:calc(100% - 320px)" class="flex-shrink-0"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <div portal-container="">
        <span
          class="pointer-events-none fixed inset-0 z-[60] mx-auto my-2 flex max-w-[560px] flex-col items-stretch justify-start md:pb-5">
        </span>
      </div>
  
      <!-- 弹窗 -->
      <div id="headlessui-portal-root" v-if="popupShow">
        <div data-headlessui-portal="">
          <button type="button" aria-hidden="true"
            style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;">
          </button>
          <div>
            <div class="relative z-50" id="headlessui-dialog-:r3:" role="dialog" aria-modal="true"
              data-headlessui-state="open" aria-labelledby="headlessui-dialog-title-:r5:">
              <div class="fixed inset-0 bg-gray-500/90 transition-opacity dark:bg-gray-800/90"></div>
              <div class="fixed inset-0 z-50 overflow-y-auto">
                <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
  
                  <div v-if="popupShow"
                    class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6 sm:max-w-lg opacity-100 translate-y-0 sm:scale-100"
                    id="headlessui-dialog-panel-:r1:" data-headlessui-state="open">
                    <div class="flex items-center sm:flex">
                      <div class="mt-3 text-center sm:mt-0 sm:text-left"></div>
                    </div>
                    <div class="prose dark:prose-invert">
                      <div class="mb-5">
                        <h2 class="!mt-4 font-normal !mb-2"><b>ChatGPT</b></h2>
                      </div>
                      <div class="w-full h-[1px] bg-gray-300 opacity-20"></div>
                      <h4 class="mb-4">
                        本开源项目基于openai开放api开发，使用最新的gpt-3.5-turbo，前端使用vue高仿ChatGpt界面，仅供学习使用.</h4>
                      <div class="flex gap-4 flex-col text-sm">
                        <div class="flex p-4 bg-gray-50 dark:bg-white/5 rounded-md items-center gap-4 min-h-[71px]">
                          <div class="w-10 text-2xl text-center">🚨</div>
                          <div class="flex-1 leading-5">
                            本开源项目有搭建教程，如有能力可以自行搭建，因为openai的api是付费的，项目不会长期提供演示。（用完官网送的18美元，就会停止项目演示）
                          </div>
                        </div>
                        <div class="flex p-4 bg-gray-50 dark:bg-white/5 rounded-md items-center gap-4 min-h-[71px]">
                          <div class="w-10 text-2xl text-center">🔬</div>
                          <div class="flex-1 leading-5">随着使用人数的增多和api被墙等原因，演示环境过几天就会关闭问答功能。如果需要长期使用，可以联系我，微信：zjb592466695
                          </div>
                        </div>
                      </div>
                      <div class="flex gap-4 mt-6">
                        <button @click="closePopup" class="btn flex justify-center gap-2 btn-primary ml-auto">Done
                        </button>
                      </div>
                    </div>
                    <div class="mt-5 flex flex-col gap-3 sm:mt-4 sm:flex-row-reverse"></div>
                  </div>
  
                  <div v-if="false"
                    class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6 sm:max-w-lg"
                    id="headlessui-dialog-panel-:r4:" data-headlessui-state="open">
                    <div class="flex items-center sm:flex">
                      <div
                        class="mr-4 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10 bg-green-100">
                        <svg stroke="currentColor" fill="none" stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round"
                          stroke-linejoin="round" class="h-6 w-6 text-green-700" height="1em" width="1em"
                          xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3">
                          </path>
                        </svg>
                      </div>
                      <div class="mt-3 text-center sm:mt-0 sm:text-left">
                        <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-gray-200"
                          id="headlessui-dialog-title-:r5:" data-headlessui-state="open">Provide additional
                          feedback</h3>
                      </div>
                    </div>
                    <form><textarea id="feedback-other" placeholder="What would the ideal answer have been?" rows="3"
                        class="mt-4 mb-1 w-full rounded-md dark:bg-gray-800 dark:focus:border-white dark:focus:ring-white"
                        tabindex="0" style="height: 89.4815px; overflow-y: hidden;"></textarea></form>
                    <div class="mt-5 flex flex-col gap-3 sm:mt-4 sm:flex-row-reverse">
                      <button class="btn flex justify-center gap-2 btn-neutral">Submit feedback
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button type="button" aria-hidden="true"
            style="position: fixed; top: 1px; left: 1px; width: 1px; height: 0px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; border-width: 0px;"></button>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  
  import { marked } from 'marked';
  import hljs from "highlight.js";
  import './assets/index.css'
  import 'highlight.js/styles/github.css';
  
  const renderer = {
    code(code, infostring, escaped) {
      var codeHtml = code
      if(infostring && infostring == "html"){
         codeHtml = encodeURIComponent(code);
      }
      if (infostring) {
        codeHtml = hljs.highlightAuto(code).value
      }
  
      console.log(code, infostring, escaped, codeHtml);
  
      return `<div class="bg-black mb-4 rounded-md">
        <div class="code_header flex items-center relative text-gray-200 bg-gray-800 px-4 py-2 text-xs font-sans">
          <span>${infostring || ""}</span>
          <button onclick="copy(this)" class="flex ml-auto gap-2">
            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
            </svg>
            <span>Copy code</span>
            <code style="display:none">${encodeURIComponent(code)}</code>
          </button>
        </div>
        <div class="p-4 overflow-y-auto">
          <code class="!whitespace-pre hljs language-${infostring}">${codeHtml}</code>
        </div>
      </div>`;
    },
    paragraph(text) {
      return `<p style="white-space:pre-wrap;">${text}</p>`
    }
  };
  marked.use({ renderer });
  
  export default {
    data() {
      return {
        theme: "light",
        popupShow: true,
        avatarIdx: 1,
        conversations: [],
        conversation: [],
        chatMsg: "",
        chatTitle: "New chat",
        convLoading: false,
        showSlide: false,
        isShowGoBottom: false,
        oldConv: undefined,
        convTitletmp: "",
        source: undefined,
        rsource: undefined,
        tsource: undefined
      };
    },
    methods: {
      closeSource() {
        var that = this;
        if (that.source) {
          that.source.close();
          that.source = undefined;
        }
        if (that.tsource) {
          that.tsource.close();
          that.tsource = undefined;
  
        }
        if (that.rsource) {
          that.rsource.close();
          that.rsource = undefined;
        }
      },
      stopChat() {
        var that = this;
        this.axios.put(`/api/stop/chat/${this.cid}`, {})
          .then((result) => {
            var rconv = that.conversation[that.conversation.length - 1];
            rconv["loading"] = false;
            that.convLoading = false;
  
            if (that.conversation.length == 2 && rconv["speeches"].length == 1) {
              var newConv = {
                "id": that.cid,
                "title": "New chat"
              }
  
              that.generateConvTitle(newConv);
              that.conversations.unshift(newConv);
              that.selectConversation(newConv, false);
              that.saveConversations();
            }
  
            that.refrechConversation();
            that.closeSource();
          })
          .catch((err) => {
            that.closeSource();
          });
  
      },
      closeShowSlide() {
        this.showSlide = false;
        this.$refs.menu.appendChild(this.$refs.navEle);
      },
      showSlideMethod() {
        this.showSlide = true;
        this.$refs.slideNavContainer.appendChild(this.$refs.navEle);
      },
      changeHeight() {
        var elem = this.$refs.inputChat;
        elem.style.height = '24px';
        var scrollHeight = elem.scrollHeight;
        if (24 >= scrollHeight || this.chatMsg.length == 0) {
          this.resetHeight();
          return;
        }
  
        elem.style.removeProperty("overflow-y")
        elem.style.height = scrollHeight + 'px';
      },
      resetHeight() {
        var elem = this.$refs.inputChat;
        elem.style.height = '24px';
        elem.style["overflow-y"] = 'hidden';
      },
      closePopup() {
        this.popupShow = false;
      },
      vueCopy(node) {
        var code = node.getElementsByTagName("code")[0].innerHTML
        var text = decodeURIComponent(code);
        this.$copyText(text).then(
          res => {
            var svg = `<svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                          <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Copied!</span>`
            const nodeInnerHtml = node.innerHTML
            node.innerHTML = svg;
  
            setTimeout(() => {
              node.innerHTML = nodeInnerHtml
            }, 1000);
          },
          err => {
            console.log('复制失败');
          }
        );
      },
      changeTheme(theme) {
        this.theme = theme;
        var html = document.getElementsByTagName("html")[0]
        html.classList.remove("light", "dark");
        html.classList.add(theme);
        html.style["color-scheme"] = theme;
        localStorage.setItem("theme", theme)
      },
      initConvs(convs) {
        for (let i = 0; i < convs.length; i++) {
          var conv = convs[i];
          if (conv.speaker == "human") {
            continue
          }
          conv["idx"] = conv["speeches"].length - 1;
        }
        return convs;
      },
      last(conv) {
        if (conv.idx == 0) {
          return;
        }
        conv.idx--;
        this.refrechConversation();
      },
      suitable(idx, conv, suit) {
        var that = this;
        var cdate = {
          "idx": idx,
          "msg_idx": conv.idx,
          "suitable": suit,
        }
        conv.suitable[conv.idx] = suit
  
        this.axios.put(`/api/ai/suitable/${this.cid}`, cdate)
          .then((result) => {
            console.log(result);
  
            that.refrechConversation()
          })
          .catch((err) => {
          });
      },
      next(conv) {
        if (conv.idx == conv["speeches"].length - 1) {
          return;
        }
        conv.idx++;
        this.refrechConversation();
      },
      inputChat(msg) {
        console.log(msg);
        this.chatMsg = msg;
      },
      countAndConcat(str, substr) {
        // 使用正则表达式的全局匹配来查找子字符串
        const matches = str.match(new RegExp(substr, 'g'));
  
        // 判断子字符串的个数是奇数还是偶数
        const count = matches ? matches.length : 0;
        const isOdd = count % 2 === 1;
  
        // 根据判断结果返回相应的字符串
        return isOdd ? str + "\n" + substr : str;
      },
      mdToHtml(md, conv) {
        if (md == "") {
          return "<p></p>"
        }
  
        md = this.countAndConcat(md, "```")
  
        var htmlMD = marked.parse(md);
        htmlMD = htmlMD.trim();
        return htmlMD;
      },
      refrechConversation() {
        this.conversation = JSON.parse(JSON.stringify(this.conversation));
      },
      chatRepeat() {
        if (this.convLoading) {
          return
        }
  
        var that = this;
        this.convLoading = true;
  
        var rconv = this.conversation[this.conversation.length - 1];
        rconv["idx"] = rconv["suitable"].length;
        rconv["loading"] = true;
        rconv["suitable"].push(0);
        rconv["speeches"].push("");
        that.refrechConversation()
  
        var rsource = this.rsource = new EventSource(`/api/chat/repeat/${this.cid}`);
        rsource.addEventListener("open", function () {
          console.log("connect");
        });
  
        //如果服务器响应报文中没有指明事件，默认触发message事件
        rsource.addEventListener("message", function (e) {
          console.log(`resp:(${e.data})`);
          var rconv = that.conversation[that.conversation.length - 1];
          if (e.data == "[DONE]") {
            rsource.close();
  
            rconv["loading"] = false;
            that.convLoading = false;
            that.refrechConversation();
            that.rsource = undefined;
            return;
          }
  
          var content = e.data;
          if (content.includes("[ENTRY]")) {
            content = content.replaceAll("[ENTRY]", "\n");
          }
  
          // 滚动到最下面
          that.handleScrollBottom();
  
          var idx = rconv.idx;
          rconv["speeches"][idx] += content;
          that.refrechConversation()
        });
  
        //发生错误，则会触发error事件
        rsource.addEventListener("error", function (e) {
          console.log("error:" + e.data);
          rsource.close();
          that.rsource = undefined;
        });
      },
      judgeInput(e) {
        if (!e.shiftKey && e.keyCode == 13) {
          e.cancelBubble = true;  //ie阻止冒泡行为
          e.stopPropagation(); //Firefox阻止冒泡行为
          e.preventDefault(); //取消事件的默认动作*换行
          this.send();
        }
      },
      send() {
        if (this.chatMsg.trim().length == 0) {
          return;
        }
  
        if (this.convLoading) {
          return;
        }
  
        this.convLoading = true;
        var chatMsg = this.chatMsg;
        chatMsg = chatMsg.trim().replace(/\n/g, "")
        this.chatMsg = ""
  
        var first = this.conversation.length == 0;
  
        this.conversation.push({
          "speaker": "human",
          "speech": chatMsg
        })
  
        var conv = {
          "idx": 0,
          "loading": true,
          "speaker": "ai",
          "suitable": [0],
          "speeches": [""]
        }
        this.conversation.push(conv)
  
        // 滚动到最下面
        this.handleScrollBottom();
  
        var that = this;
        var source = this.source = new EventSource(`/api/chat/${this.cid}?prompt=${encodeURIComponent(chatMsg)}`);
  
        source.addEventListener("open", function () {
          console.log("connect");
        });
  
        //如果服务器响应报文中没有指明事件，默认触发message事件
        source.addEventListener("message", function (e) {
          console.log(`resp:(${e.data})`);
  
          var conv = that.conversation[that.conversation.length - 1];
          if (e.data == "[DONE]") {
            source.close();
            conv["loading"] = false;
            that.convLoading = false;
  
            if (first) {
              var newConv = {
                "id": that.cid,
                "title": "New chat"
              }
  
              that.generateConvTitle(newConv);
              that.conversations.unshift(newConv);
              that.selectConversation(newConv, false);
              that.saveConversations();
  
            }
            that.refrechConversation();
            that.source = undefined;
            return;
          }
  
          var content = e.data;
          if (content.includes("[ENTRY]")) {
            content = content.replaceAll("[ENTRY]", "\n");
          }
  
          // 滚动到最下面
          that.handleScrollBottom();
  
          conv["speeches"][0] += content
          that.refrechConversation();
        });
  
        //发生错误，则会触发error事件
        source.addEventListener("error", function (e) {
          console.log("error:" + e.data);
          source.close();
          that.source = undefined;
        });
      },
      generateConvTitle(conv) {
        var that = this;
        var tsource = this.tsource = new EventSource(`/api/chat/title/${this.cid}`);
  
        //如果服务器响应报文中没有指明事件，默认触发message事件
        conv.title = ""
        tsource.addEventListener("message", function (e) {
          if (e.data == "[DONE]") {
            tsource.close();
            that.selectConversation(conv, false);
            that.saveConversations();
            that.tsource = undefined;
            return
          }
  
          conv.title += e.data;
          that.selectConversation(conv, false);
        });
  
        tsource.addEventListener("error", function (e) {
          console.log("error:" + e.data);
          tsource.close();
          that.tsource = undefined;
        });
  
      },
      newChat() {
        if (this.conversation.length == 0) {
          return
        }
  
        this.chatTitle = "New chat";
        document.title = "New chat";
        var conversations = this.conversations;
        for (let idx in conversations) {
          var conv = conversations[idx];
          delete conv.editable;
          delete conv.selected;
          delete conv.delete;
        }
  
        this.loadId()
      },
      loadId() {
        var that = this;
        this.axios.post(`/api/generate/id`, {})
          .then((result) => {
            console.log(result);
            var resp = result.data;
  
            that.cid = resp.data;
            this.conversation = []
          })
          .catch((err) => {
          });
      },
      loadConversations() {
        let convs = localStorage.getItem("conversations") || "[]";
        this.conversations = JSON.parse(convs);
      },
      saveConversations() {
        var conversations = JSON.parse(JSON.stringify(this.conversations));
        for (let idx in conversations) {
          var conv = conversations[idx];
          delete conv.editable;
          delete conv.selected;
          delete conv.delete;
        }
        let convs = JSON.stringify(conversations);
        localStorage.setItem("conversations", convs);
      },
      clearConversations() {
        this.conversations = []
        this.saveConversations();
      },
      selectConversation(conv, loadConv) {
        var that = this;
        if (this.oldConv) {
          this.oldConv.selected = false;
        }
        conv.selected = true
        this.oldConv = conv;
  
        document.title = conv.title || "chatai";
        this.chatTitle = conv.title || "chatai";
  
        if (!loadConv) {
          return;
        }
  
        this.axios.get(`/api/conv/${conv.id}`)
          .then((result) => {
            console.log(result);
            var resp = result.data;
            var content = resp.data;
  
            that.cid = conv.id;
            that.conversation = that.initConvs(content.convs)
            setTimeout(() => {
              that.isScrollAndNotBottom();
            }, 300)
          })
          .catch((err) => {
          });
      },
      editTitle(idx, conv) {
        this.convTitletmp = conv.title;
        conv.editable = true;
        this.$set(this.conversations, idx, conv);
        setTimeout(() => {
          document.getElementById("titleInput").focus();
        }, 150)
      },
      titleInputBlur(idx, conv) {
        setTimeout(() => {
          this.cancelChangeConvTitle(idx, conv);
        }, 100);
      },
      changeConvTitle(idx, conv) {
        conv.title = this.convTitletmp;
        this.saveConversations();
        this.cancelChangeConvTitle(idx, conv)
      },
      cancelChangeConvTitle(idx, conv) {
        conv.editable = false;
        this.$set(this.conversations, idx, conv);
      },
      delConv(cidx) {
        this.conversations.splice(cidx, 1);
        this.saveConversations();
      },
      cancelDelConv(idx, conv) {
        conv.delete = false;
        this.$set(this.conversations, idx, conv);
      },
      loadAvatar() {
        let avatar = localStorage.getItem("avatar") || Math.ceil(Math.random() * 9);
        this.avatarIdx = avatar;
      },
      handleScrollBottom() {
        this.$nextTick(() => {
          let scrollElem = this.$refs.chatContainer;
          scrollElem.scrollTo({ top: scrollElem.scrollHeight, behavior: 'smooth' });
        });
      },
      isScrollAndNotBottom() {
        let chatDivEle = this.$refs.chatContainer;
        if (!chatDivEle) {
          return;
        }
  
        if (chatDivEle.scrollHeight <= chatDivEle.clientHeight) {
          this.isShowGoBottom = false;
          return;
        }
  
        const scrollTop = chatDivEle.scrollTop;
        const windowHeight = chatDivEle.clientHeight;
        const scrollHeight = chatDivEle.scrollHeight;
        if (scrollTop + windowHeight >= scrollHeight - 50) {
          this.isShowGoBottom = false;
          return;
        }
  
        this.isShowGoBottom = true;
      },
    },
    computed: {},
    watch: {
      chatMsg(newVal, oldVal) {
        if (newVal === oldVal) {
          return;
        }
        this.changeHeight();
      }
    },
    mounted: function () {
      var theme = localStorage.getItem("theme") || "light"
      this.changeTheme(theme);
      this.loadId();
      this.loadConversations();
      this.loadAvatar();
  
      let chatDivEle = this.$refs.chatContainer;
      chatDivEle.addEventListener('scroll', this.isScrollAndNotBottom, true)
  
      window.copy = this.vueCopy
    }
  };
  </script>
  
  
  <style>
  html{
    height: 100%;
    width: 100%;
  }
  body {
    height: 100%;
    width: 100%;
  }
  
  #app {
    height: 100%;
  }
  
  .flex_row_c_c {
    display: flex;
    align-content: center;
    flex-direction: row;
    justify-items: center;
  }
  
  .react-scroll-to-bottom--css-krija-1n7m0yu {
    height: 100%;
    overflow-y: auto;
    width: 100%;
  }
  
  .code_header {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  
  .prose :where(code):not(:where([class~=not-prose] *)):before {
    content: "" !important;
  }
  
  .prose :where(code):not(:where([class~=not-prose] *)):after {
    content: "" !important;
  }
  
  #chatRepeat:focus {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    --tw-ring-offset-width: 0px;
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), 0 0 transparent;
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 transparent);
  }
  
  .suitable_selected {
    --tw-text-opacity: 1 !important;
    cursor: auto !important;
  }
  
  .load_dot1 {
    -webkit-animation: blink 1s steps(2, start) infinite;
    animation: blink 1s steps(2, start) infinite;
  }
  
  .load_dot2 {
    -webkit-animation: blink 1s steps(3, start) infinite;
    animation: blink 1s steps(3, start) infinite;
  }
  
  .load_dot3 {
    -webkit-animation: blink 1s steps(4, start) infinite;
    animation: blink 1s steps(4, start) infinite;
  }
  
  #app .markdown h1 {
    margin-bottom: 0rem;
    margin-top: 0rem;
  }
  
  #app .markdown h2 {
    margin-bottom: 0rem;
    margin-top: 0rem;
  }
  
  #app .markdown h3 {
    margin-bottom: 0rem;
    margin-top: 0rem;
  }
  
  #app .markdown h4 {
    margin-bottom: 0rem;
    margin-top: 0rem;
  }
  
  #app .markdown h5 {
    margin-bottom: 0rem;
    margin-top: 0rem;
  }
  
  #app .markdown h6 {
    margin-bottom: 0rem;
    margin-top: 0rem;
  }
  
  @media (max-width: 640px) {
    #app .none {
      display: none;
    }
  }
  
  .w-180px {
    width: 180px;
  }
  
  .prose-r {
    font-size: 1rem;
    line-height: 1.75;
  }
  </style>
  