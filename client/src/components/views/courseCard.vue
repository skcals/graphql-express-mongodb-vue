<template>
  <div class="courseCard">
    <v-layout row wrap pt-4>
      <v-flex md4>
        <div class="py-2">
          <div class="headline">All categories</div>
          <div v-for="(n, i) in categories" :key="i" class="categories">
            <span
              @click="findCourse(n)"
              :class="[course_category==n?'teal--text subheading':'black--text']"
            >{{n}}</span>
          </div>
        </div>
      </v-flex>
      <v-flex md8>
        <v-layout row wrap>
          <v-flex sm6>
            <v-chip label v-if="course_category.length">
              {{course_category}} &nbsp;
              ({{filterList.length}})
              <v-icon right @click="showAllCourses">close</v-icon>
            </v-chip>
            <v-chip label v-else>All Courses ({{filterList.length}})</v-chip>

            <div v-if="filterList.length<=0" class="headline pt-5">
              <span
                v-if="course_category!=''"
              >Sorry, we couldn't find any results for "{{course_category}}"</span>
              <span v-if="course_category==''">
                <p class="headline">No Course found</p>
              </span>
            </div>
          </v-flex>
          <v-flex sm6>
            <div class="pagination text-xs-right" v-if="this.pageCount>1">
              <v-btn
                fab
                small
                class="teal lighten-2 white--text elevation-1"
                :disabled="pageNumber<=0"
                @click="pageNumber--"
              >
                <v-icon>keyboard_arrow_left</v-icon>
              </v-btn>
              {{pageNumber+1}} of {{pageCount}}
              <v-btn
                fab
                small
                class="teal lighten-2 white--text elevation-1"
                :disabled="pageNumber>=pageCount-1"
                @click="pageNumber++"
              >
                <v-icon>keyboard_arrow_right</v-icon>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>

        <transition-group name="list">
          <div xs12 v-for="course in courseData" :key="course._id">
            <transition name="fade">
              <v-layout row wrap v-if="course.title">
                <v-flex pa-2>
                  <v-card class="card-border">
                    <v-layout row wrap style="position:relative">
                      <v-flex xs12 md5>
                        <v-img
                          :src="'../../../../imgs/'+imgUrls[Math.floor(Math.random()*imgUrls.length)]+'.jpg'"
                          aspect-ratio="1.5"
                          max-height="200"
                        ></v-img>
                      </v-flex>
                      <v-flex xs12 md7 sm7>
                        <v-card-title primary-title>
                          <div style="width:100%;">
                            <div class="title blue--text text--darken-3">{{course.title}}</div>
                            <br>
                            <span class="pa-2">
                              <i class="font-weight-bold">by:-</i>
                              {{ course.author}}
                            </span>
                            |
                            <span class="pa-2">{{course.duration}} hrs</span>
                            |
                            <v-chip
                              level
                              class="level-chip ma-2"
                              :class="levelColor(course.level)"
                              text-color="white"
                            >{{course.level}}</v-chip>
                          </div>
                          <div class="pa-2 py-3 grey--text text--darken-1">
                            <span v-if="course.updatedAt">{{lastUpdated(course.updatedAt)}}</span>
                            <span v-if="course.updatedAt!= course.createdAt" class="ml-2">(updated)</span>
                          </div>
                          <div class="my-4 hidden-sm-and-up"></div>
                          <div class="amount-class">
                            <span class="headline">${{course.amount}}</span>
                          </div>
                        </v-card-title>
                      </v-flex>
                    </v-layout>
                    <v-divider light></v-divider>
                    <v-card-actions>
                      <div>
                        <v-chip
                          color="teal"
                          outline
                          v-for="(category, index) in course.category"
                          :key="index"
                        >{{category}}</v-chip>
                      </div>
                      <v-spacer></v-spacer>

                      <div class="button-flex">
                        <div>
                          <view-course
                            :courseData="course"
                            :lastUpdated="lastUpdated(course.updatedAt)"
                          />
                        </div>
                        <div>
                          <edit-course :courseData="course"/>
                        </div>
                        <div>
                          <delecte-course :courseData="course"/>
                        </div>
                      </div>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </transition>
          </div>
        </transition-group>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import viewCourse from "./viewCourse";
import editCourse from "./editCourse";
import delecteCourse from "./deleteCourse";
export default {
  name: "courseCard",
  components: {
    viewCourse,
    editCourse,
    delecteCourse
  },
  props: {
    course_data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      filterCourses: [],
      course_category: "",
      imgUrls: [...Array(12).keys()],
      showItems: 5,
      pageNumber: 0,

      categories: [
        "Node.js",
        "PHP",
        "Python",
        "Javascript",
        "Mongodb",
        "Graphql",
        "MySql",
        "Vue",
        "Angular",
        "React",
        "Wordpress",
        "Laravel",
        "Django"
      ]
    };
  },

  computed: {
    filterList() {
      if (this.course_category == "") {
        return this.course_data;
      }
      return this.course_data.filter(x =>
        x.category.includes(this.course_category)
      );
    },
    pageCount() {
      return Math.ceil(this.filterList.length / this.showItems);
    },
    courseData() {
      const start = this.pageNumber * this.showItems;
      const end = start + this.showItems;
      return this.filterList.slice(start, end);
    }
  },
  methods: {
    findCourse: function(n) {
      this.pageNumber = 0;
      this.course_category = n;
    },
    showAllCourses: function() {
      this.pageNumber = 0;
      this.course_category = "";
    },
    lastUpdated(prew_date) {
      const current_date = Date.now();
      const last_updated = parseInt(prew_date);
      var elapsed = Math.abs(current_date - last_updated);

      var second = 1000;
      var minute = second * 60;
      var hour = minute * 60;
      var day = hour * 24;
      var month = day * 30;
      var year = day * 365;

      const getTimewithString = x => {
        const a = Math.round(elapsed / eval(x));
        return a + (a == 1 ? ` ${x} ago` : ` ${x}s ago`);
      };

      var args;
      if (elapsed < 1000 * 5) {
        return "Just now";
      } else if (elapsed < minute) {
        args = "second";
      } else if (elapsed < hour) {
        args = "minute";
      } else if (elapsed < day) {
        args = "hour";
      } else if (elapsed < month) {
        args = "day";
      } else if (elapsed < year) {
        args = "month";
      } else {
        args = "year";
      }

      return getTimewithString(args);
    },
    levelColor: function(level) {
      const colors = {
        "All Levels": "teal lighten-2 ",
        Beginner: "green lighten-2 ",
        Intermediate: "blue lighten-2 ",
        Expert: "purple lighten-2 "
      };

      return colors[level] || "black";
    }
  }
};
</script>
<style lang="css">
.card-border {
  border: 1px solid rgba(100, 100, 100, 0.4) !important;
  box-shadow: none !important;
}
.button-flex {
  display: flex;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.5s linear;
}
.list-enter,
.list-leave-to {
  transform: rotateX(90deg);
  opacity: 0;
}

.level-chip.v-chip .v-chip__content {
  height: auto !important;
}

.amount-class {
  position: absolute;
  bottom: 10px;
  right: 10px;
}

.categories {
  cursor: pointer;
  display: block;
}

.categories:hover {
  color: orange;
}

@media screen and (max-width: 550px) {
  .categories {
    display: inline-block !important;
    margin: 4px 10px;
  }
}
</style>