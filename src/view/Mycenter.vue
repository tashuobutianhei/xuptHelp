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
        <router-view></router-view>
      </Content>
    </Layout>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.content{
    min-height: 624px
}
.menu {
  background-color: white;
}
.content {
  margin-top: 10px;
}
</style>
