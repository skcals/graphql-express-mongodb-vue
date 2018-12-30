<template>
  <v-layout justify-center>
    <v-btn flat dark @click="dialog = true" class="white--text">Create New
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title class="teal lighten-1">
          <span class="headline white--text">Create Course</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="addCourseForm" v-model="valid">
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    label="Title"
                    v-model="courseInput.title"
                    :rules="[v => !!v || 'Title is required', v=>!!(v && v.length<=100)||'Title max length 100']"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field
                    label="Instructor Name"
                    v-model="courseInput.author"
                    :rules="[v => !!v || 'Instructor name is required', v=>!!(v && v.length<=25)||'instructor max length 25']"
                    required
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                    label="Description"
                    v-model="courseInput.description"
                    counter="2000"
                    :rules="[v => !!v || 'Description is required',   v=>!!(v && v.length<=2000)||'Description max length 2000']"
                    required
                  ></v-textarea>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-select
                    label="Category"
                    v-model="courseInput.category"
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
                    v-model="courseInput.level"
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
                    v-model.number="courseInput.amount"
                    :rules="[v => !!v || 'Course amount is required']"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-text-field
                    label="Course Duration"
                    suffix="Hours"
                    required
                    type="number"
                    v-model.number="courseInput.duration"
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
          <v-btn color="green darken-1 white--text" @click="addCourse" :disabled="!valid">Save</v-btn>
          <v-btn color="red darken-1 white--text" @click="dialogClose">Close</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { addCourseMutation, coursesQuery } from "../constants/graphql";
export default {
  name: "addCourse",

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
      courseInput: {
        title: null,
        author: null,
        description: null,
        category: [],
        level: null,
        amount: null,
        duration: null
      }
    };
  },
  methods: {
    addCourse: function() {
      if (this.$refs.addCourseForm.validate()) {
        const {
          title,
          description,
          author,
          duration,
          level,
          category,
          amount
        } = this.$data.courseInput;

        this.$apollo.mutate({
          mutation: addCourseMutation,
          variables: {
            title,
            description,
            author,
            duration,
            level,
            category,
            amount
          },

          update: (store, { data: { createCourse } }) => {
            const data = store.readQuery({ query: coursesQuery });

            data.courses.unshift(createCourse);
            store.writeQuery({ query: coursesQuery, data });
          }
        });
        this.dialog = false;
        this.$refs.addCourseForm.reset();
      }
    },

    dialogClose: function() {
      this.dialog = false;
      this.$refs.addCourseForm.reset();
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