<template>
  <div>
    <Table class="table" border :columns="columns" :data="List">
      <template slot-scope="{ row }" slot="time">
        <Time :time="row.time"></Time>
      </template>
    </Table>
    <Page class="page" :current="current" :page-size="page_size" :total="total" @on-change="changPage"/>
  </div>
</template>
<script>
import CONST from "../common/index.js";

export default {
  data() {
    return {
      List: [],
      current:1,
      page_size: 5,
      total: 20,
      columns: [
        {
          title: "id",
          key: "commentId"
        },
        {
          title: "用户名",
          key: "user"
        },
        {
          title: "评论内容",
          key: "content"
        },
        {
          title: "时间",
          key: "time",
          slot: "time"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.remove(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  components: {},
  methods: {
    remove(i) {
      console.log(i);
      this.axios({
        url: "http://192.168.43.138:9000/comment/" + i.row.commentId,
        method: "delete"
      })
        .then(res => {
          console.log(res);
          if (res.data == "success") {
            this.$Message.success("删除成功");
            this.getComment(this.current)
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    changPage(e) {
      this.current=e
      this.getComment(e);
    },
    getComment(page) {
      this.axios({
        method: "put",
        url: "http://192.168.43.138:9000/comment/" + page
      })
        .then(res => {
          console.log(res.data);
          this.List = res.data.rows;
          this.total = res.data.totals;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getComment(1);
  }
};
</script>
<style scoped>
.no {
  width: 20%;
  margin: 100px 50%;
  transform: translateX(-50%);
  text-align: center;
}
.table {
  width: 100%;
  overflow: hidden;
}
.page {
  width: 30%;
  margin: 10px 50%;
  transform: translateX(-50%);
}
</style>

