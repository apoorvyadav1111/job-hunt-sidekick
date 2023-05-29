export type BaseStatus = 'APPLIED' | 'IN REVIEW' | 'ACCEPTED' | 'OFFER LETTER RECEIVED';
export type OAStatus = 'OA RECV' | 'OA DONE';
export type InterviewStatus = 'OA' 
  | 'OA PASSED' 
  | 'TECH INT 1'  
  | 'TECH INT 2' 
  | 'TECH INT 3' 
  | 'MANG INT 1'
  | 'MANG INT 2' 
  | 'HR INT 1'
  | 'HR INT 2'
  | 'OTHER';

export type Status = BaseStatus | OAStatus | InterviewStatus;

export type TaskStatus = 'IN PROGRESS' | 'DONE';

export interface StatusLog{
  status: Status,
  review?: string
  updated: Date
}

export interface Task{
  task_detail:string,
  status: TaskStatus;
  due_date: Date;
}
export type Tasks = Task[];

export type StatusHistory = StatusLog[];

export interface JobApplicationInfo{
  company: string,
  postingId?: string,
  stack?:string,
  postingUrl?: URL | string,
  dashboardUrl?: URL | string
  referral?: string,
  note?: string,
  recruiter?: string,
  status:StatusHistory,
  pending: Tasks,
}

export interface JobApplication extends JobApplicationInfo{
  jobId: string
  appliedDate: Date,

}

// const a:JobApplication = {
//   company:'TCS',
//   jobId:'R12',
//   postingUrl:new URL('https://tcs.com'),
//   referral:'',
//   appliedDate: new Date(),
//   status: [{status:'APPLIED', updated:new Date()}],
//   pending:[],
//   note:'Demo',
// }