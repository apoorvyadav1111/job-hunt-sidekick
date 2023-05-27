import { NextFunction, Request, Response } from "express";

exports.getApplication =async (req: Request,res: Response, next:NextFunction) => {
    res.status(200).send('Get All Application');
}

exports.getDueApplication =async (req: Request,res: Response, next:NextFunction) => {
    res.status(200).send('Get Due Application');
}

exports.putApplication =async (req: Request,res: Response, next:NextFunction) => {
    const { jobId } = req.params;
    res.status(200).send(`Put ${jobId} Application`);
}

exports.postApplication =async (req: Request,res: Response, next:NextFunction) => {
    res.status(200).send(`Post new Application`);
}

