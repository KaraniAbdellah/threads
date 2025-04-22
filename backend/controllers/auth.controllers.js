import express from "express";
import mongoose from "mongoose";

const auth = async (req, res) => {
    res.json("Hello Auth");
}

export {auth};
