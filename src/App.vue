
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" :active-name="activeKey">
                    <div class="layout-logo"></div>
                    <div class="layout-nav">
                        <MenuItem name="Home" to="/">
                            <Icon type="ios-navigate"></Icon>
                            主页
                        </MenuItem>
                        <MenuItem name="Mail" to="/Mail">
                            <Icon type="ios-keypad"></Icon>
                            快递代取
                        </MenuItem>
                        <MenuItem name="Food" to="/Food">
                            <Icon type="ios-analytics"></Icon>
                            校园外卖
                        </MenuItem>
                        <MenuItem name="SecondHand" to="/SecondHand">
                            <Icon type="ios-paper"></Icon>
                            二手交易
                        </MenuItem>
                    </div>
                    <div class="avatar">
                        <Avatar style="color: #f56a00;background-color: #fde3cf">U</Avatar>
                         <Dropdown trigger="click" style="margin-left: 20px">
                                <a href="javascript:void(0)">
                                    假装登录了
                                    <Icon type="ios-arrow-down"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem @click.native="toMycenter">个人中心</DropdownItem>
                                    <DropdownItem>退出登录</DropdownItem>
                                </DropdownMenu>
                          </Dropdown>   
                    </div>
                </Menu>
            </Header>
             <Content class="content">
                  <router-view></router-view>
             </Content>
            <Footer class="layout-footer-center">2019 &copy; 软件1602 课设小组</Footer>
        </Layout>
    </div>
</div>
</template>
<script>
    export default {
        data(){
          return {
            activeKey:''
          }
        },
        methods:{
          toMycenter(){
            this.$router.push('/Mycenter')
          }
        },
        mounted(){
          // console.log()
          this.activeKey = window.location.pathname.split('/')[1]
        }
    }
</script>

<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #ffffff;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.avatar{
   margin: 0 auto;
   margin-right: 20px;
   position: absolute;
   right: 0px;
}
.layout-footer-center{
    background-color: rgb(81,90,110);
    text-align: center;
    color: #d7dde4;
}
</style>