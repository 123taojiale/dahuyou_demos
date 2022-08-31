<template>
  <img alt="Vue logo" src="./assets/logo.png" @click="speak">
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Speech from 'speak-tts'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      speech: null
    }
  },
  mounted() {
    this.speechInit();
  },
  methods: {
    speechInit() {
      this.speech = new Speech();
      this.speech.setLanguage('zh-CN');
      this.speech.init().then(() => {
        console.log('语音播报初始化完成...')
      })
    },

    //语音播报
    speak() {
      this.speech.speak({ text: "语音播报测试" }).then(() => {
        console.log("播报完成...")
      })
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
