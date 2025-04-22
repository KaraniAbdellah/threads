import express from "express";
import mongoose from "mongoose";
import 'dotenv/config';

const server = express();


server.listen(process.env.PORT, (err) => {
    err ? console.log(`Error While Starting The Server ${err}`) : console.log(`Server Running In Port ${process.env.PORT}`);
});

