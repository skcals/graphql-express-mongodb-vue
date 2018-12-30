<template>
  <v-app>
    <div class="home">
      <!-- toolbar -->
      <v-toolbar class="teal lighten-1 white--text elevation-1" fixed>
        <v-toolbar-title class="headline">wz courses</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <add-course/>
        </v-toolbar-items>
      </v-toolbar>

      <!-- main container -->
      <div class="container mt-5">
        <div class="app-loading" v-if="loading">
          <div class="display-1 white--text loading-text">loading...</div>
        </div>
        <course-card :course_data="this.courses"/>
      </div>
    </div>
  </v-app>
</template>

<script>
import { coursesQuery } from "./constants/graphql";
import CourseCard from "./views/courseCard";
import addCourse from "./views/addCourse";
import deleteCourse from "./views/deleteCourse";
export default {
  name: "home",
  components: {
    CourseCard,
    addCourse,
    deleteCourse
  },
  data() {
    return {
      courses: [],
      loading: 0,
      filterCourses: [],

      categories: [
        "Node.js",
        "PHP",
        "Javascript",
        "Mongodb",
        "Graphql",
        "Ruby-on-Rails",
        "MySql",
        "Vue",
        "Angular",
        "React",
        "Materialize_css",
        "Bootstrap"
      ]
    };
  },

  methods: {
    findCourse: function(n) {
      return (this.filterCourses = this.courses.filter(x =>
        x.category.includes(n)
      ));
    }
  },

  apollo: {
    courses: {
      query: coursesQuery
    }
  }
};
</script>

<style lang="css">
.app-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(11, 11, 12, 0.9);
  z-index: 2000;
}
.loading-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>