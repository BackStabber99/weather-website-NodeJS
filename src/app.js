const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 8000;

var geocode = require("./utils/geocode");
const openWeather = require("./utils/openWeather");

//path for express config
const publicDirPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup hanbar engine and view location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Mayank",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mayank",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpText:
      "For any refernce contact owner of site at jainmayank16041999@gmail.com",
    name: "Mayank",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide address",
    });
  }
  geocode(req.query.address, (err, data) => {
    if (err) {
      return res.send({
        error: err,
      });
    }

    const { latitude = undefined, longitude = undefined, location } = data;

    openWeather(latitude, longitude, (err, weatherData) => {
      if (err) {
        return res.send({
          error: err,
        });
      }
      return res.send({
        forcast: weatherData,
        location,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Provide search message",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    title: "404",
    errorMessage: "Help article not found",
    name: "Mayank",
  });
});

app.get("*", (req, res) => {
  res.render("notFound", {
    title: "404",
    errorMessage: "Page not found",
    name: "Mayank",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
