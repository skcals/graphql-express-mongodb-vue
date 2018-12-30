const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList
} = require("graphql");

exports.CourseType = new GraphQLObjectType({
  name: "courseType",
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    author: { type: GraphQLString },
    duration: { type: GraphQLInt },
    level: { type: GraphQLString },
    category: { type: new GraphQLList(GraphQLString) },
    amount: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString }
  })
});

exports.CourseInputArgs = {
  title: { type: new GraphQLNonNull(GraphQLString) },
  description: { type: new GraphQLNonNull(GraphQLString) },
  author: { type: new GraphQLNonNull(GraphQLString) },
  level: { type: new GraphQLNonNull(GraphQLString) },
  category: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
  duration: { type: new GraphQLNonNull(GraphQLInt) },
  amount: { type: new GraphQLNonNull(GraphQLInt) }
};

exports.UpdateCourseInputArgs = {
  _id: { type: new GraphQLNonNull(GraphQLID) },
  title: { type: GraphQLString },
  description: { type: GraphQLString },
  author: { type: GraphQLString },
  level: { type: GraphQLString },
  category: { type: new GraphQLList(GraphQLString) },
  duration: { type: GraphQLInt },
  amount: { type: GraphQLInt }
};

exports.GetCourseById = {
  _id: { type: new GraphQLNonNull(GraphQLID) }
};
