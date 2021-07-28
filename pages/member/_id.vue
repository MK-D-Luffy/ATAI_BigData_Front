<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师介绍 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">成员介绍</span>
        </h2>
      </header>
      <div class="t-infor-wrap">
        <!-- 讲师基本信息 -->
        <section class="fl t-infor-box c-desc-content">
          <div class="mt20 ml20">
            <section class="t-infor-pic">
              <img :src="teacherList.avatar" style="width:200px;height:200px">
            </section>
            <h3 class="hLh30" style="display:flex;align-items:center">
              <span class="fsize24 c-333">
                {{ teacherList.name }}&nbsp;
                <!--                {{ teacherList.level===1?'高级讲师':'首席讲师' }}-->
              </span>
              <span class="t-tag-bg ml10">{{ teacherList.career }}</span>
            </h3>
            <section class="mt10">

            </section>
            <section class="t-infor-txt">
              <p class="mt20">{{ teacherList.intro }}</p>
            </section>
            <div class="clear"></div>
          </div>
        </section>
        <div class="clear"></div>
      </div>
      <section class="mt30">
        <div>
          <header class="comm-title all-teacher-title c-course-content">
            <h2 class="fl tac">
              <span class="c-333">主要成果</span>
            </h2>
            <section class="c-tab-title">
              <a href="javascript: void(0)">&nbsp;</a>
            </section>
          </header>
          <section>
            <span class="c-333">{{ teacherList.achievement }}</span>
          </section>
        </div>
      </section>
    </section>
    <!-- /讲师介绍 结束 -->
  </div>
</template>
<script>
//引入调用teacher.js文件
import teacherApi from '@/api/teacher'

export default {
  data() {
    return {
      teacherList: [],
      courseList: [],
    }
  },
  created() {
    this.getTeacherDetail()
  },
  methods: {
    //讲师详情的方法
    getTeacherDetail() {
      teacherApi.getTeacherDetailInfo(this.$route.params.id)
        .then(response => {
          this.teacherList = response.data.data.teacher,
            this.courseList = response.data.data.courseList
        })
    },
  }
};
</script>
