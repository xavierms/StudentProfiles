import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student, student } from '../interfaces/student';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private APIurl = 'https://api.hatchways.io/assessment/students/'

  constructor( private http: HttpClient ) { }

GetStudents(): Observable<Student> {
  return this.http.get<Student>(`${this.APIurl}`);
}
}
