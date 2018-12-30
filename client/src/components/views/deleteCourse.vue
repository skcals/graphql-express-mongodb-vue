<template>
  <div class="delete-course">
    <div class="text-xs-center">
      <v-dialog v-model="dialog" width="500">
        <v-btn slot="activator" flat icon color="red lighten-2">
          <v-icon>delete</v-icon>
        </v-btn>

        <v-card>
          <v-card-title class="headline red darken-2 white--text" primary-title>Delete Course</v-card-title>

          <v-card-text>
            <p class="display-1 pa-2 font-weight-thin">Are you sure want to delete this Course?</p>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="red" class="white--text" @click="deleteCourse(courseData._id)">Delete</v-btn>
            <v-btn color="primary" @click="dialog = false">Back</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { deleteCourseMutation, coursesQuery } from "../constants/graphql";
export default {
  name: "deleteCourse",
  props: {
    courseData: Object
  },
  data() {
    return {
      dialog: false
    };
  },
  methods: {
    deleteCourse(_id) {
      this.$apollo.mutate({
        mutation: deleteCourseMutation,
        variables: {
          _id
        },
        update: (store, { data: { deleteCourse } }) => {
          const data = store.readQuery({ query: coursesQuery });

          const deleteCourseIndex = data.courses
            .map(x => x._id)
            .indexOf(deleteCourse._id);

          data.courses.splice(deleteCourseIndex, 1);
          store.writeQuery({ query: coursesQuery, data });
        }
      });
      this.dialog = false;
    }
  }
};
</script>