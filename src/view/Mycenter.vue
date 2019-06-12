<template>
  <div class="content">
    <Layout>
      <Sider class="menu">
        <Menu active-name="1" class="menu" style="width:200px">
          <MenuItem name="1" to="/Mycenter/MycenterBody1">个人信息</MenuItem>
          <MenuItem name="2" to="/Mycenter/MycenterBody2">任务记录</MenuItem>
        </Menu>
      </Sider>
      <Content>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {


};
</script>
<style scoped>
.content {
  min-height: 623px; 
}
.menu {
  background-color: white;
}
.content {
  margin-top: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
