const express=require("express");
const router=express.Router();
const{analytics}=require("../controllers/analytics.controller");

router.get("/",analytics);
module.expprts=routers;