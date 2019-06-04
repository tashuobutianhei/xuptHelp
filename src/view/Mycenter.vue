<template>
  <div class="content">
    <Layout>
        <Sider>
            <Menu active-name="1-2" :open-names="['1']" class="menu">
            <Submenu name="1">
                <template slot="title">
                <Icon type="ios-analytics"/>Navigation One
                </template>

                <MenuItem name="1-1">Option 1</MenuItem>
                <MenuItem name="1-2">Option 2</MenuItem>

                <MenuItem name="1-3">Option 3</MenuItem>
                <MenuItem name="1-4">Option 4</MenuItem>
            </Submenu>
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
  min-height: 600px;
}
</style>
