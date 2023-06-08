import { NextFunction, Request, Response } from "express";
const JobApplication = require("../models/jobapplication");


exports.getCompanyDDL = async (req:Request, res:Response, next: NextFunction) => {
    try{
        const company = await JobApplication.find({}, {'company':1}).distinct('company');
        res.status(200).send(company);
    }catch(err){
        res.status(500).send('Internal Server Error')
    }
}

exports.getStackDDL = async (req:Request, res:Response, next: NextFunction) => {
    try{
        const stack = await JobApplication.find({}, {'stack':1}).distinct('stack');
        res.status(200).send(stack);
    }catch(err){
        res.status(500).send('Internal Server Error')
    }

}

