
const Discord = require('discord.js')
const express = require("express");
const session = require("express-session");
const hbs = require("express-handlebars");
const passport = require("./passport");
const BotClient = require("./bot");
const path = require("path");
const app = express();

app
  .set("port", process.env.PORT || 3000)
  .use(express.static("public"))
  .use(
    session({
      secret: "dashboardfeliz",
      resave: false,
      saveUninitialized: false,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .set("views", path.join(__dirname, "../views"))
  .set("view engine", ".hbs")
  .engine(".hbs", hbs({ extname: ".hbs" }))
  .use((req, res, next) => {
    req.BotClient = BotClient;
    next();
  })
  .use("/", require("../routes/routes"));

app.get("/comandos", (req, res) => {
res.render("comandos",{
title: "comandos"
})
})

app.get("/404", (req, res) => {
res.render("404",{
title: "error"
})
})
app.get("/prueba", (req, res) => {
res.render("prueba",{
title: "prueba"
})
})

app.get("/formulario", (req, res) => {
res.render("formulario",{
title: "formulario"
})
})

app.get("/bots", (req, res) => {
res.render("bots",{
title: "bots"
})
})

module.exports = app;
