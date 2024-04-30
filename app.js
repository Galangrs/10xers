require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const public = require("./Router/public")
const admin = require("./Router/admin")
const hadleError = require("./Middelware/handleError")

const app = express();
const port = process.env.port || 80;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", public)
app.use("/admin", admin)
app.get("/",(req,res)=>{
    res.json({"message":"massuk"})
});

app.use(hadleError)

app.listen(port, "0.0.0.0", () => {
    console.log("Server berjalan pada port", port, "dengan IPv4 saja");
});
