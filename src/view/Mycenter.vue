<template>
  <div class="content">
    <Layout>
      <Sider class="menu">
        <Menu active-name="1-1" :open-names="['1']" class="menu" style="width:200px">
          <MenuItem name="1-1" to="/Mycenter/MycenterBody1">个人信息</MenuItem>
          <MenuItem name="1-2" to="/Mycenter/MycenterBody2">我的任务</MenuItem>
          <!-- <MenuItem name="1-3">Option 3</MenuItem>
          <MenuItem name="1-4">Option 4</MenuItem>-->
        </Menu>
      </Sider>
      <Content>
        <router-view></router-view>
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
/* .content{
    min-height: 600px
} */
.menu {
  background-color: white;
}
</style>
