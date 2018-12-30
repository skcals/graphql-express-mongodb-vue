const { GraphQLObjectType, GraphQLList } = require("graphql");
const { CourseType, GetCourseById } = require("../type");
const Course = require("../../models/course");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // Get all users
    courses: {
      type: new GraphQLList(CourseType),
      resolve: function() {
        return Course.find()
          .then(courses => {
            const result = courses.reverse();
            return result.map(course => {
              return { ...course._doc, _id: course.id };
            });
          })
          .catch(err => {
            throw err;
          });
      }
    },

    // Get User By Id

    course: {
      type: CourseType,
      args: GetCourseById,
      resolve: function(parent, args) {
        return Course.findById(args._id)
          .then(course => {
            return { ...course._doc, _id: course.id };
          })
          .catch(err => {
            throw err;
          });
      }
    }
  }
});

module.exports = RootQuery;
