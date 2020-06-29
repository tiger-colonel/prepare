<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
            prop="rechargeDesc"
            label="充值说明"
            align="center"
            width="160"
        >
        </el-table-column>
        <el-table-column
            prop="count"
            label="金额"
            align="center"
            width="160"
        >
        </el-table-column>
        <el-table-column
            prop="submitTime"
            label="充值提交时间"
            align="center"
            width="120"
        >
        </el-table-column>
        <el-table-column
            prop="receiveTime"
            label="充值到账时间"
            align="center"
            width="120"
        >
        </el-table-column>
        <el-table-column
            prop="status"
            label="状态"
            align="center"
            width="160"
        >
        </el-table-column>
        <el-table-column
            label="操作"
            align="center"
            width="80"
        >
            <template>
                <el-button type="text" size="small">
                    查看打款凭证
                </el-button>
                <el-button type="text" size="small">
                    撤销
                </el-button>
            </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => ({
        tableData: [
            {
                rechargeDesc: '123',
                count: '1',
                submitTime: '2020-01-12',
                receiveTime: '2020-01-12',
                status: '审核中',
            },
            {
                rechargeDesc: '123',
                count: '1',
                submitTime: '2020-01-12',
                receiveTime: '2020-01-12',
                status: '审核中',
            },
        ],
  }),
  methods: {
    selecteShip(ele, item) {
      item.isSelected = !item.isSelected;
      // ele = ele.values.map((i) => {
      //     if (i.desc === item.desc) {
      //         i.isSelected = item.isSelected;
      //     }
      // });
      // this.shipList.forEach((ele1) => {
      //     ele1.values.map((i) => {
      //         if (i.desc === item.desc) {
      //             i.isSelected = item.isSelected;
      //         }
      //     });
      // });
      // this.$set(this.shipList, 'values', ele)
      this.$forceUpdate();
      console.log(item.isSelected, item.high);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .ship-wrap {
    width: 200px;
    height: 100px;
    background: #ccc;
    color: red;
    margin: 20px auto;
  }
  .ship-wrapper-selected {
    color: #ccc;
    background: red;
  }
</style>
