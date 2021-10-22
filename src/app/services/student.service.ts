import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { student } from '../interfaces/student';


@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private APIurl = 'https://api.hatchways.io/assessment/students/'

  constructor( private http: HttpClient ) { }

GetStudents(): Observable<student[]> {
  return this.http.get<student[]>(`${this.APIurl}`);
}
}
