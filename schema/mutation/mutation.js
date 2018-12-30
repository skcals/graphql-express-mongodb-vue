const { GraphQLObjectType } = require("graphql");

const {
  CourseType,
  CourseInputArgs,
  UpdateCourseInputArgs,
  GetCourseById
} = require("../type");
const Course = require("../../models/course");

const RootMutation = new GraphQLObjectType({
  name: "RootMutationType",
  fields: {
    // Create Course
    createCourse: {
      type: CourseType,
      args: CourseInputArgs,
      resolve(parent, args) {
        const courseData = {
          title: args.title,
          description: args.description,
          author: args.author,
          duration: args.duration,
          category: args.category,
          level: args.level,
          amount: args.amount
        };
        const course = new Course(courseData);
        return course
          .save()
          .then(result => {
            return {
              ...result._doc,
              _id: result.id
            };
          })
          .catch(err => {
            throw err;
          });
      }
    },

    // Update Course

    updateCourse: {
      type: CourseType,
      args: UpdateCourseInputArgs,
      resolve(parent, args) {
        return Course.findByIdAndUpdate(args._id, args, {
          new: true
        })
          .then(result => {
            return {
              ...result._doc,
              _id: result.id
            };
          })
          .catch(err => {
            throw err;
          });
      }
    },

    // Delete Course

    deleteCourse: {
      type: CourseType,
      args: GetCourseById,
      resolve(parent, args) {
        const courseId = args._id;
        return Course.findByIdAndDelete(courseId)
          .then(result => {
            return { ...result, _id: result.id };
          })
          .catch(err => {
            throw err;
          });
      }
    }
  }
});

module.exports = RootMutation;
