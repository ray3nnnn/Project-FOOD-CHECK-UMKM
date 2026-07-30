require("dotenv").config();


const express = require("express");
const cors = require("cors");


const {
    testConnection
} = require("./database");



const app = express();



app.use(cors());

app.use(express.json());



// ROUTES

app.use("/api/auth", require("./routes/auth"));
app.use("/api/pemeriksaan", require("./routes/pemeriksaan"));
app.use("/api/owner", require("./routes/owner"));




// TEST API

app.get("/",(req,res)=>{


    res.json({

        success:true,

        message:
        "Food Check UMKM Demo Running"

    });


});




// SERVER

const PORT = process.env.PORT || 5000;

app.listen(PORT, async()=>{


    await testConnection();



    console.log("===============================");


    console.log(
        "Food Check UMKM Server Running"
    );


    console.log(
        "http://localhost:" + PORT
    );


    console.log("===============================");


});