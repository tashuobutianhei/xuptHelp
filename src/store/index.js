
export default {
    state:{
        islogin:false,
        userInfo:{}
    },
    mutations:{
        login(state,userInfo){
           state.islogin = true;
           state.userInfo = userInfo
        },
        loginOut(state){
            state.islogin = false;
        },
    }
}