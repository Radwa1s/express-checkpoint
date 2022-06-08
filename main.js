const express = require("express");
const app = express();
const path = require("path");
app.set("view engine", "ejs");
app.use(express.static(__dirname + "public"));
app.use(express.static(path.join(__dirname, "public")));

const workingdays = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hours = date.getHours();

  const dayoff = [0, 6];
  const opentime = [9, 10, 11, 12, 13, 14, 15, 16];

  if (dayoff.includes(day)) {
    res.redirect("/closingtime");
  } else if (!opentime.includes(hours)) {
    res.redirect("/closehours");
  }

  return next();
};
app.get("/closingtime", (req, res) => {
  res.render("closingtime");
});

app.get("/closehours", (req, res) => {
  res.render("closehours");
});
app.use(workingdays);

app.get("/", (req, res) => {
  res.render("homePage");
});

app.get("/ourservices", (req, res) => {
  res.render("ourServices");
});
app.get("/contactus", (req, res) => {
  res.render("contactUs");
});
app.listen(2000, () => {
  console.log("running on 2000");
});
