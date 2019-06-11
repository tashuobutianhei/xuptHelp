
export default {
    state:{
        islogin:false,
        userInfo:{},
        oauth:''
    },
    mutations:{
        login(state,userInfo){
           state.islogin = true;
           state.userInfo = userInfo
        },
        loginOut(state){
            state.islogin = false;
        },
        changeOauth(state,oauth) {
            state.oauth = oauth;
        }
    }
}