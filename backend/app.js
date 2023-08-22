const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("cookie-session");
const { v4: uuidv4 } = require("uuid");
const productsRoutes = require("./routes/products-routes");
const cartRoutes = require("./routes/cart-routes");
const categoriesRoutes = require("./routes/categories-routes");
const usersRoutes = require("./routes/users-routes");
const loginRoutes = require("./routes/login-routes");
const sessionRoutes = require("./routes/session-routes");

const app = express();

const port = process.env.PORT;
const mySecret = process.env.SECRET;
const mongoDBConnect = process.env.MONGODB;

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    genid: (req) => {
      return uuidv4();
    },
    secret: mySecret,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 604800000, httpOnly: true, secure: true },
    sameSite: "none",
  })
);

app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://sweet-delights-patisserie.netlify.app"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/api/categories", categoriesRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/session/", sessionRoutes);
app.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

mongoose
  .connect(mongoDBConnect)
  .then(() => {
    app.listen(port);
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log(err);
  });
