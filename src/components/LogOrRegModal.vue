<template>
  <div>
    <Modal v-model="loginVisble" title="登录" @on-ok="loginok" :loading="loginloading">
      <Form ref="formLogin" :model="formLogin" :rules="loginruleValidate" :label-width="100">
        <FormItem label="用户名" prop="username">
          <Input v-model="formLogin.username" placeholder="用户名，唯一标识"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="formLogin.password" placeholder="密码" type="password"></Input>
        </FormItem>
      </Form>
      <P class="goreg">
        没有账号？那不行啊，
        <span @click="goToReg">赶紧注册</span>
      </P>
    </Modal>
    <Modal v-model="regVisble" title="注册" @on-ok="regok" :loading="regloading">
      <Form ref="formReg" :model="formReg" :rules="RegruleValidate" :label-width="100">
        <FormItem label="用户名" prop="username">
          <Input v-model="formReg.username" placeholder="用户名，唯一标识" icon="md-people"></Input>
        </FormItem>
        <FormItem label="昵称" prop="nickname">
          <Input v-model="formReg.nickname" placeholder="起一个响亮的名字吧" icon="md-contact"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input v-model="formReg.password" placeholder="密码" type="password" icon="md-clipboard"></Input>
        </FormItem>
        <FormItem label="再输一遍" prop="passwordAgain">
          <Input
            v-model="formReg.passwordAgain"
            placeholder="和密码一致哦"
            type="password"
            icon="md-clipboard"
          ></Input>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="formReg.email" placeholder="绑定邮箱吧" type="email" icon="md-mail"></Input>
        </FormItem>
      </Form>
      <P class="goreg">
        有账号了？
        <span @click="goToLogin">马上登录</span>
      </P>
    </Modal>
    <span @click="loginVisble=true">登录</span>
  </div>
</template>
<script>
import axios from "axios";
axios.defaults.withCredentials = true; //配置为true
import Tool from "../common/tool.js";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("输入密码哦"));
      } else {
        if (this.formReg.password !== "") {
          // 对第二个密码框单独验证
          this.$refs.formReg.validateField("passwordAgain");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("再输一次密码吧"));
      } else if (value !== this.formReg.password) {
        callback(new Error("尴尬了!两次不一样"));
      } else {
        callback();
      }
    };
    return {
      loginVisble: false,
      regVisble: false,
      loginloading: true,
      regloading: true,
      formLogin: {
        username: "",
        password: ""
      },
      loginruleValidate: {
        username: [
          {
            required: true,
            message: "用户名必填哦",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码来一波",
            trigger: "blur"
          }
        ]
      },
      formReg: {
        username: "",
        nickname: "",
        password: "",
        passwordAgain: "",
        email: ""
      },
      RegruleValidate: {
        username: [
          {
            required: true,
            message: "地址必填哦",
            trigger: "blur"
          }
        ],
        nickname: [
          {
            required: true,
            message: "地址必填哦",
            trigger: "blur"
          }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        passwordAgain: [{ validator: validatePassCheck, trigger: "blur" }],
        email: [
          {
            required: true,
            message: "地址必填哦",
            trigger: "blur"
          },
          {
            type: "email",
            message: "格式不正确哦",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    regok() {
      this.$refs["formReg"].validate(valid => {
        if (valid) {
          let formData = new FormData();
          formData.append("username", this.formReg.username);
          formData.append("password", this.formReg.password);

          this.axios({
            method: "post",
            url: "http://192.168.43.138:9000/admin/register",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData
          })
            .then(res => {
              // console.log(res.data);
              if (res.data == "success") {
                this.$Message.success("注册成功!");
                this.$refs["formReg"].resetFields();
              } else {
                this.$Message.error("注册失败，稍后重试!");
              }
              // if (res.data.status == "success") {

              // }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$Message.error("信息填完哦!");
        }
      });
    },
    loginok() {
      this.$refs["formLogin"].validate(valid => {
        if (valid) {
          let formData = new FormData();
          formData.append("username", this.formLogin.username);
          formData.append("password", this.formLogin.password);

          this.axios({
            method: "post",
            url: "http://192.168.43.138:9000/admin/login",
            headers: { "Content-Type": "multipart/form-data" },
            data: formData
          })
            .then(res => {
              console.log(res);
              if (res.data != "error") {
                Tool.setCookie("token", res.data);
                Tool.setCookie("username", this.formLogin.username);

                this.$Message.success("登录成功!");

                this.$store.commit("login", {
                  userName: this.formLogin.username,
                  nickName: "1111"
                });

                this.$refs["formLogin"].resetFields();
                this.axios({
                  method: "get",
                  url: "http://192.168.43.138:9000/manager/"
                })
                  .then(res => {
                    if (res.data == "success") {
                      this.$store.commit("changeOauth", "manger");
                    } else {
                    }
                  })
                  .catch(err => {
                    console.log(err);
                  });
              } else {
                this.$Message.error('登录失败，检查密码')
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$Message.error("存在错误信息!");
        }
      });
    },

    goToReg() {
      this.loginVisble = false;
      this.regVisble = true;
    },
    goToLogin() {
      this.regVisble = false;
      this.loginVisble = true;
    }
  }
};
</script>
<style scoped>
.goreg {
  width: 100%;
  text-align: center;
  color: #aaaaaa;
}
.goreg span {
  cursor: pointer;
  color: blue;
}
</style>
