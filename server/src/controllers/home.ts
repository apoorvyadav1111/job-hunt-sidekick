import { NextFunction, Request, Response } from "express";
const JobApplication = require("../models/jobapplication");
import * as mongo from 'mongodb';

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

    try{
        const patch = req.body;
        if(patch.starred!==undefined){
            patch.starred = patch.starred==='false'?false:true;
        }
        if(patch._id!==undefined){
            delete patch._id;
        }
        const updateOpts = {returnDocument: mongo.ReturnDocument.AFTER, upsert:false};
        const resp = await JobApplication.findOneAndUpdate({_id:jobId}, patch, updateOpts);
        res.status(200).send(resp);
    }catch(err){
        console.log("here")
        res.status(400).send(err);
    }
}

exports.postApplication = async (req: Request,res: Response, next:NextFunction) => {
    const jobapp = new JobApplication(req.body);
    jobapp.pending = [];
    try{
        jobapp.save()
        res.status(200).send(`Post new Application`);
    }catch(err){
        res.status(400).send(err);
    }
}

exports.deleteApplication = async (req: Request,res: Response, next:NextFunction) => {
    const { jobId } = req.params;
    console.log(req.params);
    try{
        await JobApplication.deleteOne({_id:jobId});
        res.status(200).send('done');
    }catch(err){
        res.status(400).send(err);
    }
}