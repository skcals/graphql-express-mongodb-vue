const express = require("express");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");
const schema = require("./schema/schema");
const app = express();

const db = require("./config/keys").MongoDB_URI;

mongoose.set("useFindAndModify", false);
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("database connected..."))
  .catch(err => {
    throw err;
  });

app.use(cors());

app.use(
  "/graphql",
  graphqlHttp({
    schema,
    graphiql: true
  })
);

const port = Process.env.PORT || 3000;

app.listen(port, () => console.log("app is running port 3000"));
