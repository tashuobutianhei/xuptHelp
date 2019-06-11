<template>
  <div class="content">
    <Layout>
      <Sider class="menu">
        <Menu :active-name="active" class="menu" style="width:200px">
          <MenuItem name="MangerCheck" to="/Manger/MangerCheck">任务审核</MenuItem>
          <MenuItem name="MangerManger" to="/Manger/MangerManger">任务管理</MenuItem>
          <MenuItem name="MangerComment" to="/Manger/MangerComment">评论管理</MenuItem>
        </Menu>
      </Sider>
      <Content>
        <router-view></router-view>
      </Content>
    </Layout>
  </div>
</template>
<script>
import vueApp from "../main.js";
import AppVue from "../App.vue";
import axios from "axios";
import Tool from "../common/tool.js";

export default {
  data() {
    return {
      active:''
    };
  },
  created() {
    if(window.location.pathname == '/Manger'){
      this.$router.push('/Manger/MangerCheck');
      this.active = window.location.pathname.split('/')[2]
    } else {
     this.active = window.location.pathname.split('/')[2]
    }
  }
};
</script>
<style scoped>
/* .content {
  min-height: 623px;
}
.menu {
  background-color: white;
} */
.content {
  margin-top: 10px;
}
.menu {
  min-height: 560px;
  background-color: white;
}
</style>
