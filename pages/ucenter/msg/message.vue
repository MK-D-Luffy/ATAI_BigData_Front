<template>
  <article class="col-7 fl">
    <div class="u-r-cont" style="border-left:1px dotted #ddd;padding-left:40px;min-height:540px">
      <section>
        <div>
          <section class="c-infor-tabTitle c-tab-title">

            <a href="javascript: void(0)" title="我的比赛" class="current">
              消息管理
            </a>
          </section>
        </div>
        <div class="mt40">
          <!--          <section v-if="this.competitionList.length === 0" class="no-data-wrap">-->
          <!--            <em class="icon30 no-data-ico">&nbsp;</em>-->
          <!--            <span class="c-666 fsize14 ml10 vam">您还没有参加比赛哦！</span>-->
          <!--          </section>-->

          <!--          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选-->
          <!--          </el-checkbox>-->
          <!--          <div style="margin: 15px 0;"></div>-->
          <!--          <ul>-->
          <!--            <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">-->
          <!--              <el-checkbox v-for="city in cities" :label="city" :key="city">{{ city }}-->

          <!--              <li>-->
          <!--                <el-popover-->
          <!--                  placement="top-start"-->
          <!--                  title="标题"-->
          <!--                  width="200"-->
          <!--                  trigger="hover"-->
          <!--                  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">-->
          <!--                  <el-button slot="reference">hover 激活</el-button>-->
          <!--                </el-popover>-->
          <!--              </li>-->
          <!--              </el-checkbox>-->
          <!--            </el-checkbox-group>-->
          <!--          </ul>-->
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :show-header="false"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="日期"
              width="40">
                <i class="el-icon-message-solid"></i>
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              show-overflow-tooltip>
              <el-popover
                placement="top-start"
                title="标题"
                width="200"
                trigger="hover"
                content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                <span slot="reference">hover 激活</span>
              </el-popover>
            </el-table-column>
          </el-table>
          <div style="margin-top: 20px">
            <el-button @click="toggleSelection(tableData)">全选标志</el-button>
            <el-button @click="toggleSelection()">删除</el-button>
            <el-button @click="toggleSelection()">标为已读</el-button>
          </div>

        </div>
      </section>
    </div>
  </article>
</template>

<script>
//引入调用competition.js文件
import competitionApi from '@/api/competition'

export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      multipleSelection: []
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>
