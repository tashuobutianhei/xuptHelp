<template>
  <div class="content">
    <Layout>
      <Sider class="menu">
        <Menu active-name="1" class="menu" style="width:200px">
          <MenuItem name="1" to="/Manger/MangerCheck">任务审核</MenuItem>
          <MenuItem name="2" to="/Manger/MangerManger">任务管理</MenuItem>
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
import Tool from '../common/tool.js'


export default {
  // beforeRouteEnter(to, from, next) {
  //   axios({
  //     method: "get",
  //     url: "http://192.168.43.138:9000/manager/",
  //     headers: {
  //       Authorization: `Bearer ${Tool.getCookie("token")}`
  //     }
  //   })
  //     .then(res => {
  //       console.log(res.data);
  //       if(res.data == 'success') {
  //         next()
  //       } else {
  //         next('/')
  //       }
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       next('/')
  //     });
  // },
  data() {
    return {};
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
