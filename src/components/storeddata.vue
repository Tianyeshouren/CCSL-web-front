<template>
  <div id="start">
    <el-container>
        <el-aside width="30%">
            <el-table
    :data="tableData"
    style="width: 100%"
    @row-click="show">
    <el-table-column type="expand" >
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="实验名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="结果">
            <span>{{ props.row.result }}</span>
          </el-form-item>
          <el-form-item label="边界">
            <span>{{ props.row.bound }}</span>
          </el-form-item>
          <el-form-item label="实验时间">
            <span>{{ props.row.date }}</span>
          </el-form-item>
          <el-form-item label="计算时间">
            <span>{{ props.row.time }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="实验名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="实验时间"
      prop="date">
    </el-table-column>
    <el-table-column
      label="边界"
      prop="bound">
    </el-table-column>
  </el-table>
  <el-popconfirm @confirm="deletefile" title="确定删除吗">
        <el-button slot="reference">删除 {{this.curfilename}}</el-button>
  </el-popconfirm>
</el-aside>
    <el-container>
        <el-main>
            <div v-html="outputHtml" class="output"></div>
        </el-main>
        <el-footer ref="foot" height="footheight">
            <div>
                <el-input ref="ccsltext" type="textarea" readonly v-model="ccslcontent"  autosize>
                </el-input>
            </div>
        </el-footer>
    </el-container>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'data',
  components: {
  },
  data: function () {
    return {
      tableData: [ {
        name: '第一次',
        bound: '20',
        time: '1',
        date: '20201121',
        ccsl: 'a#b',
        result: 'sat'
      }, {
        name: '第2次',
        bound: '20',
        time: '1',
        date: '20201121',
        ccsl: 'a#b',
        result: 'sat'
      }, {
        name: '第3次',
        bound: '20',
        time: '1',
        date: '20201121',
        ccsl: 'a#b',
        result: 'sat'
      }, {
        name: '第4次',
        bound: '20',
        time: '1',
        date: '20201121',
        ccsl: 'a#b',
        result: 'sat'
      }],
      outputHtml: '',
      ccslcontent: '',
      curfilename: '',
      fotheight: '60px',
      fame: {'name': ''}
    }
  },
  methods: {
    getData () {
      // 对应 Python 提供的接口，这里的地址填写下面服务器运行的地址，本地则为127.0.0.1，外网则为 your_ip_address
      const path = 'http://127.0.0.1:5000/Query'
      // const output = 'http://127.0.0.1:5000/static/output.html'
      axios.post(path, null).then((response) => {
        this.tableData = response.data
      }).catch(function (error) {
        alert('Error ' + error)
      })
      // axios.get(output).then((res) => {
      //   console.log(res.data)
      //   that.inputccsl = res.data
      // })
    },
    getOutput () {
      // 对应 Python 提供的接口，这里的地址填写下面服务器运行的地址，本地则为127.0.0.1，外网则为 your_ip_address
      const path = 'http://127.0.0.1:5000/queryOutput'
      // const output = 'http://127.0.0.1:5000/static/output.html'
      axios.post(path, this.fame).then((response) => {
        this.outputHtml = response.data.output
        this.ccslcontent = response.data.ccsl
      }).catch(function (error) {
        alert('Error ' + error)
      })
      // axios.get(output).then((res) => {
      //   console.log(res.data)
      //   that.inputccsl = res.data
      // })
    },
    deletefile () {
      // 对应 Python 提供的接口，这里的地址填写下面服务器运行的地址，本地则为127.0.0.1，外网则为 your_ip_address
      const path = 'http://127.0.0.1:5000/delete'
      // const output = 'http://127.0.0.1:5000/static/output.html'
      axios.post(path, this.fame).then((response) => {
        this.outputHtml = ''
        this.ccslcontent = ''
        this.curfilename = ''
        this.fame.name = ''
        this.getData()
      }).catch(function (error) {
        alert('delete Error ' + error)
      })
      // axios.get(output).then((res) => {
      //   console.log(res.data)
      //   that.inputccsl = res.data
      // })
    },
    show (row) {
      // console.log(row.name)
      if (this.curfilename !== row.name) {
        this.curfilename = row.name
        this.fame.name = row.name
        this.getOutput()
        // console.log(this.$refs.ccsltext.$el.offsetHeight)
      }
    }
  },
  computed: {
    footheight () {
      return this.$refs.ccsltext.$el.offsetHeight + 'px'
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
<style>
.el-header, .el-footer {
    background-color: white;
    color: #333;
    text-align: left;
    line-height: 30px;
}
.el-aside {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 30px;
}
.el-main {
    background-color: lightgoldenrodyellow;
    color: #333;
    text-align: center;
    line-height: 30px;
}
body > .el-container {
    margin-bottom: 40px;
}
.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}
.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
.demo-table-expand {
    font-size: 0;
}
.demo-table-expand label {
    width: 100px;
    color: #99a9bf;
}
.demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
}
</style>
