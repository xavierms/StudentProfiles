export interface student {
  city: string;
  company: string;
  email: string;
  firstName: string;
  grades: string[];
  id: string;
  lastName: string;
  pic: string;
  skill: string;
  avg: number;
  // tag:string[];
}
export interface Student {
  students: student[];
}
