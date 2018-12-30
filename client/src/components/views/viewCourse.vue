<template>
  <div class="view-course">
    <div class="text-xs-center">
      <v-dialog v-model="dialog" max-width="800">
        <v-btn slot="activator" flat icon color="purple lighten-2">
          <v-icon>open_in_new</v-icon>
        </v-btn>

        <v-card>
          <v-card-title class="headline teal lighten-2 white--text" primary-title>
            {{courseData.title}}
            <span
              class="subheading ml-4 black--text"
              v-if="courseData.createdAt != courseData.updatedAt"
            >(Updated)</span>
          </v-card-title>
          <v-card-text>
            <div class="px-4 py-2 grey lighten-3">
              <div class="headline">Created By</div>
              {{courseData.author}}
            </div>
            <div class="pa-4 mt-2 grey lighten-3">
              <div class="headline">Description</div>
              {{courseData.description}}
            </div>
            <v-divider></v-divider>
            <div class="pa-4 grey lighten-3 mt-2">
              <span>
                <v-icon>access_time</v-icon>
                {{courseData.duration}} hours
                <span class="mx-4">|</span>
                <v-icon>sort</v-icon>
                {{courseData.level}}
                <span class="mx-4">|</span>
                Last Updated :- {{lastUpdated}}
              </span>
            </div>
            <v-divider></v-divider>
            <div class="pa-4 mt-2 grey lighten-3">
              <div class="headline">Categories</div>
              <span v-for="(category, index) in courseData.category" :key="index">
                <v-chip label color>{{category}}</v-chip>
              </span>
            </div>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" flat @click="dialog = false">Back</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "viewCourse",
  props: {
    courseData: Object,
    lastUpdated: String
  },
  data() {
    return {
      dialog: false
    };
  }
};
</script>