<template>
  <div id="TopNav">
    <router-link to="/start" class="toptab">当前实验</router-link>
    <router-link to="/data" div class="toptab">过往数据</router-link>
  </div>
</template>
<script>
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #TopNav {
    display: flex;
    width: 80%;
    height: 3rem;
    line-height: 3rem;
    padding: 0.01rem 0;
    text-align: center;
    border-top: 1px solid #999999;
    border-bottom: 1px solid #999999;
    position: fixed;
    left: 10%;
    top: 0;
  }
  .toptab {
    flex: 1;
    text-align: center;
    border-right: 1px solid #999999;
    border-left: 1px solid #999999;
  }
</style>
