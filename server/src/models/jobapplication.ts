const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const jobApplicationSchema = new Schema(
	{ 
        'applicationId' : {
            type: String
        }, 
        'starred':{
            type: Boolean
        },
        'company' : {
            type: String
        }, 
        'postingId' : {
            type: String
        }, 
        'postingUrl' : {
            type: String
        },
        'dashboardUrl' : {
            type: String
        },
        'referral' :{
            type: String
        },
        'note' :{
            type: String
        },
        'recruiter' : {
            type: String
        },
        'stack' : {
            type: String
        },
        'status' : {
            type: Schema.Types.Mixed
        },
        'pending':{
            type: Schema.Types.Mixed
        },
        'appliedDate' : { 
            type : Date, 
            default: Date.now 
        }
	},
	{ timestamps: true }
);

jobApplicationSchema.index({ applicationId: 1});

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
