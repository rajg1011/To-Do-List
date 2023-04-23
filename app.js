require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const { getDate } = require("./date"); //apne aap add hua
const requireDate = require(__dirname + "/date.js"); //to add date.js file
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs"); // to set ejs files engine

mongoose
  .connect(
    `mongodb+srv://${process.env.USER_NAME}:${process.env.PASSWORD}@cluster0.k2fmo0w.mongodb.net/emailDb`
  )
  .then(() => console.log("Mongoose Connection Successfull"))
  .catch((err) => console.log(err.message));

const todoSchema = new mongoose.Schema({
  work: String,
});

const todoListItem = mongoose.model("todoListItem", todoSchema);

const item1 = new todoListItem({
  work: "General List (Dont click on 1st checkbox)",
});

const item2 = new todoListItem({
  work: "U can go on different List by just URL/list_name",
});

const item3 = new todoListItem({
  work: "Repeat",
});

const items = [item1, item2, item3];

const addDocument = async () => {
  try {
    const insertDone = await todoListItem.insertMany(items);
  } catch (err) {
    console.log(err.message);
  }
};

// addDocument();

app.get("/", (request, response) => {
  const todayDate = requireDate.getDate();
  const findItem = async () => {
    try {
      const itemFound = await todoListItem.find({});
      if (itemFound.length === 0) {
        addDocument();
        response.redirect("/");
      } else {
        response.render("index", {
          todayDate: todayDate,
          itemFound: itemFound,
          listname: "(General List)",
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  findItem();
});

app.post("/", (req, res) => {
  item = req.body.newData;
  const saveData = async () => {
    try {
      const toAdd = new todoListItem({
        work: item,
      });
      await toAdd.save();
      res.redirect("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  saveData();
});

app.post("/delete", (req, res) => {
  var checkboxDetails = req.body.checkbox;
  const deleteData = async () => {
    try {
      const removeData = await todoListItem.findByIdAndRemove(checkboxDetails);
      res.redirect("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  deleteData();
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server Is Started");
});
