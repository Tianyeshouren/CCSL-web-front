<template>
  <div id="start">
  <div class="main">
   <div class="text-area">
     <h2 align="left">请在下面输入你要验证的CCSL</h2>
     <div class="btn">
      <button @click="inputsymbol($event)">#</button>
      <button @click="inputsymbol($event)">&lt;</button>
      <button @click="inputsymbol($event)">≤</button>
      <button @click="inputsymbol($event)">⊆</button>
      <button @click="inputsymbol($event)">+</button>
      <button @click="inputsymbol($event)">*</button>
      <button @click="inputsymbol($event)">∧</button>
      <button @click="inputsymbol($event)">∨</button>
      <button @click="inputsymbol($event)">$</button>
      <button @click="inputsymbol($event)">∝</button>
      <button @click="inputsymbol($event)">☇</button>
      <button @click="inputsymbol($event)">==</button>
      <button @click="inputsymbol($event)">∈</button>
      <button @click="inputsymbol($event)">-</button>
      <button @click="inputsymbol($event)">±</button>
      <button @click="inputsymbol($event)">⋈</button>
    </div>
    <textarea placeholder="请输入CCSL..." v-model="inputccsl" ref="input">
    </textarea>
    <div class="sub">
       Bound <input v-model="bound"/>
       <el-button type="primary" @click="getData">提交</el-button>
       <el-button type="primary" @click="open" :disabled="(cansave == false) ? true : false">点击保存结果</el-button>
    </div>
   </div>
   <div v-html="outputHtml" class="output"></div>
  </div>
  </div>
</template>

<script>
import Submit from '@/components/Submit'
import axios from 'axios'
export default {
  name: 'start',
  components: {
    Submit
  },
  data: function () {
    return {
      serverResponse: 'resp',
      data: {'ccsl': 'null', 'bound': ''},
      inputccsl: '',
      bound: 20,
      outputHtml: '',
      savefilename: '',
      saveinfo: {'name': '', 'bound': '', 'result': '', 'time': ''},
      cansave: false,
      cansubmit: 1
    }
  },
  methods: {
    save () {
      const path = 'http://127.0.0.1:5000/store'
      axios.post(path, this.saveinfo).then((response) => {
        console.log(response.data.output)
        alert('Success ')
        this.cansave = false
        // console.log(this.saveinfo.result)
      }).catch(function (error) {
        alert('Error ' + error)
        this.cansave = true
      })
    },
    open () {
      this.$prompt('请输入', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.$message({
          type: 'success',
          message: '你的文件名是: ' + value
        })
        this.savefilename = value
        this.saveinfo.name = value
        this.saveinfo.bound = this.bound
        this.save()
      }).catch(() => {
      })
    },
    getData () {
      var that = this
      that.data.ccsl = that.inputccsl
      that.data.bound = that.bound
      // 对应 Python 提供的接口，这里的地址填写下面服务器运行的地址，本地则为127.0.0.1，外网则为 your_ip_address
      const path = 'http://127.0.0.1:5000/getMsg'
      // const output = 'http://127.0.0.1:5000/static/output.html'
      axios.post(path, that.data).then((response) => {
        var msg = response.data.ccsl
        var res = response.data.result
        var time = response.data.time
        that.serverResponse = msg
        that.outputHtml = response.data.output
        console.log(response.data.output)
        that.saveinfo.time = time
        that.saveinfo.result = res
        that.cansave = true
        alert('Success ' + response.status + ', ' + response.data + ', ' + msg + ', ' + res + ', ' + time)
      }).catch(function (error) {
        alert('Error ' + error)
      })
      // axios.get(output).then((res) => {
      //   console.log(res.data)
      //   that.inputccsl = res.data
      // })
    },
    inputsymbol (e) {
      // console.log(e.target.value)
      const i = this.$refs.input
      if (i.selectionStart || i.selectionStart === 0) {
        var startpos = i.selectionStart
        var endpos = i.selectionEnd
        this.inputccsl = this.inputccsl.substring(0, startpos) + e.target.innerText + this.inputccsl.substring(endpos, i.value.length)
      }
      this.$nextTick(() => {
        this.$refs.input.selectionStart = startpos + e.target.innerText.length
        this.$refs.input.selectionEnd = startpos + e.target.innerText.length
        this.$refs['input'].focus()
      })
    }
  },
  mounted () {
    this.$refs['input'].focus()
  }
}
</script>
<style>
#start {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.main {
  width: 80%;
  height: 700px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  left:0;
  top:0;
  right:0;
  bottom: 0;
  margin: auto;
}
.text-area{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex: 0 0 35%;
    height: 100%;
    border-top:1px solid gainsboro;
    border-bottom:1px solid gainsboro;
    left:0;
    top:0;
    right:0;
    bottom: 0;
    margin: auto;
    border-right:1px solid gainsboro;
}
.output {
  width: 65%;
}
.text-area textarea {
    width: 95%;
    height: 80%;
    margin: 0.75rem  0;
    border: none;
    outline: none;
    padding-left: 1.125rem;
}
.text-area textarea::-webkit-input-placeholder {
    color: #9E9E9E;
}
.btn {
  flex: 0 0 20px;
  display: flex;
  width: 100%;
}
.sub {
  flex: 0 0 30px;
  flex-direction: column;
  width: 100%;
}
</style>
