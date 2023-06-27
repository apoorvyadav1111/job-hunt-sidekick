import { Status, TaskStatus } from "@/interfaces/jobapplication";
import http from "./init"

export class DDLService{
    base = "/ddl"
    async getCompanyDDL(){
        const resp = await http.get(`${this.base}/company`);
        return resp.data;
    }
    async getStackDDL(){
        const resp = await http.get(`${this.base}/stack`);
        return resp.data;
    }

    getStatusDDL(){
        const data: Status[] = [
             'OA PASSED' 
            , 'TECH INT 1'  
            , 'TECH INT 2' 
            , 'TECH INT 3' 
            , 'MANG INT 1'
            , 'MANG INT 2' 
            , 'HR INT 1'
            , 'HR INT 2'
            , 'OTHER'
            , 'APPLIED' 
            , 'IN REVIEW' 
            , 'ACCEPTED' 
            , 'OFFER LETTER RECEIVED'
            , 'OA RECV' 
            , 'OA DONE'
            , 'OA'
            , 'REJECTED'
        ]
        return data;
    }

    getPendingStatusDDL(){
        const data: TaskStatus[] = [
            'RECEIVED',
            'IN PROGRESS',
            'DONE'
        ]
        return data;
    }
}