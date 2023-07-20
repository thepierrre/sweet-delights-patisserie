// import express from "express";
// import mongoose from "mongoose";
const express = require("express");
const mongoose = require("mongoose");

// const homeRoutes = require("./routes/home-routes");
const productsRoutes = require("./routes/products-routes");
const categoriesRoutes = require("./routes/categories-routes");

const app = express();

const port = 5003;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

// app.use("/api/home", homeRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);

mongoose
  .connect(
    "mongodb+srv://piotr_o:Yt8DkBvBq3buLwHZ@shop-cluster.dstrzvj.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port);
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log(err);
  });
