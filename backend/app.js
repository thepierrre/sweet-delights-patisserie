const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const productsRoutes = require("./routes/products-routes");
const categoriesRoutes = require("./routes/categories-routes");
const usersRoutes = require("./routes/users-routes");
const loginRoutes = require("./routes/login-routes");
const sessionRoutes = require("./routes/session-routes");

const app = express();

const port = 5003;

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    genid: (req) => {
      return uuidv4();
    },
    secret: "my-supersecret-key",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 604800000, httpOnly: true },
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true"); // If you need to send cookies
  next();
});

// app.use("/api/home", homeRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/session/", sessionRoutes);
// app.use("/api/session/:sessionId", sessionRoutes);
app.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

mongoose
  .connect(
    "mongodb+srv://piotrowczarczyk98:A8pQkRvBeV5IoUVh@e-shop-cluster.jfp1kue.mongodb.net/shop-app?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(port);
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log(err);
  });
