import gql from "graphql-tag";

// view all courses
export const coursesQuery = gql`
  query courseType {
    courses {
      _id
      title
      description
      author
      duration
      level
      category
      amount
      createdAt
      updatedAt
    }
  }
`;

// create Course
export const addCourseMutation = gql`
  mutation ACmutation(
    $title: String!
    $description: String!
    $author: String!
    $duration: Int!
    $level: String!
    $category: [String!]!
    $amount: Int!
  ) {
    createCourse(
      title: $title
      description: $description
      author: $author
      duration: $duration
      level: $level
      category: $category
      amount: $amount
    ) {
      _id
      title
      description
      author
      duration
      level
      category
      amount
      createdAt
      updatedAt
    }
  }
`;

// edit course
export const editCourseMutation = gql`
  mutation ECmutation(
    $_id: ID!
    $title: String
    $description: String
    $author: String
    $duration: Int
    $level: String
    $category: [String]
    $amount: Int
  ) {
    updateCourse(
      _id: $_id
      title: $title
      description: $description
      author: $author
      duration: $duration
      level: $level
      category: $category
      amount: $amount
    ) {
      _id
      title
      description
      author
      duration
      level
      category
      amount
      createdAt
      updatedAt
    }
  }
`;

// delete Course

export const deleteCourseMutation = gql`
  mutation DCmutation($_id: ID!) {
    deleteCourse(_id: $_id) {
      _id
      title
      description
      author
      duration
      level
      category
      amount
    }
  }
`;
