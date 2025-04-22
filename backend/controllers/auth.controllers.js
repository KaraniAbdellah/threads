import express from "express";
import mongoose from "mongoose";

const signup = async (req, res) => {
  res.json("Hello signup");
};

const logout = async (req, res) => {
  res.json("Hello LogOut");
};

const login = async (req, res) => {
  res.json("Hello Login");
};

export { signup, logout, login };
