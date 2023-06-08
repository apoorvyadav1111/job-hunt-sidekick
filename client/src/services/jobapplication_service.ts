import { JobApplicationInfo, JobApplicationPatch } from "@/interfaces/jobapplication";
import http from "./init"

export class JobApplicationService{
    base = '/application';
    async postApplication(body: JobApplicationInfo){
        const resp = await http.post(this.base, body);
        return resp.data;
    }
    async getApplication(){
        const resp = await http.get(this.base);
        return resp.data;
    }
    async putApplication(id:string, patch:JobApplicationPatch){
        const resp = await http.put(`${this.base}/${id}`,patch);
        return resp.data;
    }
    async deleteApplication(id:string){
        const resp = await http.delete(`${this.base}/${id}`);
        return resp.data;
    }
}