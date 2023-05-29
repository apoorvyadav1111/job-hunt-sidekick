import { NextFunction, Request, Response } from "express";
const JobApplication = require("../models/jobapplication");

exports.getApplication =async (req: Request,res: Response, next:NextFunction) => {
    try{
        const data = await JobApplication.find({});
        res.status(200).send(data);
    }catch(err){
        console.log(err)
        res.status(400).send(err);
    }
}

exports.getDueApplication =async (req: Request,res: Response, next:NextFunction) => {
    res.status(200).send('Get Due Application');
}

exports.putApplication =async (req: Request,res: Response, next:NextFunction) => {
    const { jobId } = req.params;
    res.status(200).send(`Put ${jobId} Application`);
}

exports.postApplication =async (req: Request,res: Response, next:NextFunction) => {
    console.log(req.body);
    const jobapp = new JobApplication(req.body);
    jobapp.pending = [];
    try{
        jobapp.save()
        res.status(200).send(`Post new Application`);
    }catch(err){
        console.log("here")
        res.status(400).send(err);
    }
}

