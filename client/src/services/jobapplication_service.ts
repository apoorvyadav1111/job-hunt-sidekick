import { JobApplicationInfo } from "@/interfaces/jobapplication";
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
}