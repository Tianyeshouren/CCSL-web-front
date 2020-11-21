<template>
  <div id="ButtomNav">
    <router-link to="/" class="tab">首页</router-link>
    <router-link to="/page1" class="tab">第一</router-link>
    <div class="tab">第二</div>
  </div>
</template>
<script>
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #ButtomNav {
    display: flex;
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    padding: 0.5rem 0;
    text-align: center;
    border-top: 1px solid #999999;
    position: fixed;
    left: 0;
    bottom: 0;
  }
  .tab {
    flex: 1;
    text-align: center;
    border-right: 1px solid #999999;
  }
</style>
