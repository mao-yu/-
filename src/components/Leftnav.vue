<template>
  <div class="nav">
    <ul class="leftnav">
      <li>
        <i class="icon iconfont icon-goumai"></i>
        <div>收银</div>
      </li>
      <li>
        <i class="icon iconfont icon-home"></i>
        <div>店铺</div>
      </li>
      <li>
        <i class="icon iconfont icon-gouwuche2"></i>
        <div>购物</div>
      </li>
      <li>
        <i class="icon iconfont icon-huiyuanqia"></i>
        <div>会员</div>
      </li>
      <li>
        <i class="icon iconfont icon-zuanshi"></i>
        <div>统计</div>
      </li>
      <li>
        <i class="icon iconfont icon-gongnengjianyi"></i>
        <div>设置</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav{
  width:5%;
  height:100%;
  background-color:#0087DE;
  float:left;
  color:#fff;
}
.iconfont{
  font-size: 24px;
}
.leftnav{
  margin:0;
  padding:0;
}
.leftnav li{
  list-style: none;
  padding:10px;
  border-bottom: 1px solid #aca1a1;
  text-align: center;
  cursor: pointer;
}
</style>
