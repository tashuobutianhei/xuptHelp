
<template>
    <div class="layout">
        <Layout>
            <Header class="menu" >
                
                <Menu mode="horizontal" theme="light" :active-name="activeKey" class="menu" >
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
                   
                    <div v-if="$store.state.islogin"  class="avatar" >
                        <Avatar style="color: #f56a00;background-color: #fde3cf">U</Avatar>
                        <Dropdown trigger="click" style="margin-left: 20px">
                                <a href="javascript:void(0)">
                                    {{$store.state.userInfo.nickname}}
                                    <Icon type="ios-arrow-down"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem @click.native="toMycenter">个人中心</DropdownItem>
                                    <DropdownItem @click.native="outLogin">退出登录</DropdownItem>
                                </DropdownMenu>
                        </Dropdown>   
                    </div> 
                     <div v-else class="avatar"  style="color: #FFFFFF;" >
                        <LogOrRegMoal ></LogOrRegMoal>
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
    import LogOrRegMoal from './components/LogOrRegModal'
    export default {
        data(){
          return {
            activeKey:'',
            pathname:window.location.pathname
          }
        },
        components:{
            LogOrRegMoal
        },
        watch:{
            // pathname(){
            //     console.log(1111)
            //          this.activeKey = window.location.pathname.split('/')[1]
            // }
        },
        methods:{
          toMycenter(){
            this.$router.push('/Mycenter')
          },
          outLogin(){
             this.$store.commit('loginOut')
          }
        },
        mounted(){
          this.$store.commit('login',{
                    username:'11111',
                    nickname:'一个昵称',

          })
          this.activeKey = window.location.pathname.split('/')[1]
        }
    }
</script>

<style scoped>
.menu{
    background: black;
    width: 100%;
    position: fixed;
    z-index: 150;
}
.ivu-menu-item{
    color: white !important;
}
.layout{
    border: 1px solid #d7dde4;
    background: #ffffff;
    position: relative;
    border-radius: 4px;
    overflow: hidden;

}
.content{
    /* background-color: b */
    margin-top: 50px;
    background-color: white;
}
.avatar{
   margin: 0 auto;
   margin-right: 80px;
   position: absolute;
   right: 0px;
   z-index: 10;
   cursor: pointer;
}
.layout-footer-center{
    background-color: rgb(0,0,0);
    text-align: center;
    color: #d7dde4;
}
</style>