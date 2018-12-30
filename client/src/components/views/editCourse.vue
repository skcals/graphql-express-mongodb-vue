<template>
  <div>
    <v-btn flat icon @click="dialogOpen" class="blue--text">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title class="teal lighten-1">
          <span class="headline white--text">Update Course</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="editCourseForm" v-model="valid">
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    label="Title"
                    v-model="courseEditInput.title"
                    :rules="[v => !!v || 'Title is required']"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    label="Instructor Name"
                    v-model="courseEditInput.author"
                    :rules="[v => !!v || 'Instructor name is required']"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    label="Description"
                    v-model="courseEditInput.description"
                    counter="2000"
                    :rules="[v => !!v || 'Description is required',   v=>!!(v && v.length<=2000)||'Description max length 2000']"
                    required
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    label="Category"
                    v-model="courseEditInput.category"
                    class="category_chip"
                    :items="categories"
                    counter="5"
                    chips
                    multiple
                    :rules="[v => !!v || 'Course Category is required',   v=>!!(v && v.length<=5)||'Category max length is 5']"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    label="Course Level"
                    v-model="courseEditInput.level"
                    class="level_chip"
                    :items="level"
                    chips
                    :rules="[v => !!v || 'Course level is required']"
                    required
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm6>
                  <v-text-field
                    label="Amount"
                    prefix="$"
                    type="number"
                    required
                    v-model.number="courseEditInput.amount"
                    :rules="[v => !!v || 'Course amount is required']"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Course Duration"
                    suffix="Hours"
                    required
                    type="number"
                    v-model.number="courseEditInput.duration"
                    :rules="[v => !!v || 'Course Duration is required']"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-form>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1 white--text" @click="editCourse" :disabled="!valid">Save</v-btn>
          <v-btn color="red darken-1 white--text" @click="dialogClose">Close</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { editCourseMutation, coursesQuery } from "../constants/graphql";
export default {
  name: "editCourse",
  props: {
    courseData: Object
  },

  data() {
    return {
      dialog: false,
      valid: true,
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
      ],
      level: ["All Levels", "Beginner", "Intermediate", "Expert"],
      courseEditInput: {
        ...this.courseData
      }
    };
  },

  methods: {
    editCourse: function() {
      if (this.$refs.editCourseForm.validate()) {
        const {
          _id,
          title,
          description,
          author,
          duration,
          level,
          category,
          amount
        } = this.courseEditInput;

        this.$apollo
          .mutate({
            mutation: editCourseMutation,
            variables: {
              _id,
              title,
              description,
              author,
              duration,
              level,
              category,
              amount
            },
            update: (store, { data: { updateCourse } }) => {
              const data = store.readQuery({ query: coursesQuery });

              const updateCourseIndex = data.courses
                .map(x => x._id)
                .indexOf(updateCourse._id);

              data.courses[updateCourseIndex] = updateCourse;
              store.writeQuery({ query: coursesQuery, data });
            }
          })
          .then(data => console.log("updated..."))
          .catch(err => console.log(err));

        this.dialog = false;
      }
    },

    dialogClose: function() {
      this.dialog = false;
    },
    dialogOpen: function() {
      this.dialog = true;
    }
  }
};
</script>


<style lang="css">
.category_chip .v-chip {
  background: #009688 !important;
  color: white !important;
}
.level_chip .v-chip {
  background: #fff !important;
}
</style>