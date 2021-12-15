import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { StudentService } from './services/student.service';
import { student, Student } from './interfaces/student';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { TemplateBindingParseResult } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'StudentProfiles';
  filterStudent  : string = '';
  filterTags     : string = '';
  nuevo          : string = '';
  Tags           : string[] = [];
  Students       : student[] = [];
  studentFiltered: string[]=[]
  numberprueba?: number;
push: any;

  constructor(private StudentService: StudentService) {}
  debouncer: Subject<string> = new Subject();
 

   onDebounce:EventEmitter<string> = new EventEmitter();
  hayError   : boolean  = false;

  ngOnInit(): void {
    // this.Students
    // .pipe(debounceTime(300))
    // .subscribe( valor => {
    //   console.log('Debouncer:',valor);
    //   this.onDebounce.emit(valor)
      
    // });
    this.searchStudent();
  }
 

  //search students
  searchStudent() {
    this.StudentService.GetStudents().subscribe((StudentsSubs) => {
      const { students } = StudentsSubs;
      console.log(
        (this.Students = students.filter((studentFilter) =>
          studentFilter.firstName
            .toLowerCase()
            .includes(this.filterStudent.toLowerCase())
            
        ))
      );
      //obtener promedio
      this.Students.map((st) => {
        st.avg =
          st.grades.reduce((a, b) => Number(a) + Number(b), 0) /
          st.grades.length;
        return st;
      });
    });
  }

  searchTag() {
    this.StudentService.GetStudents().subscribe((StudentsSubs) => {
      const { students } = StudentsSubs;
      this.Students = students.filter((studentFilter) =>
        studentFilter.tag.includes(this.filterTags.toLowerCase())
      );
    });
  }

  //add to tags
  addTag(index: any) {
   //debugger
    //no permite insertar si no hay valores.
    // if (this.nuevo.trim().length === 0) {
    //   return;
//     }



  this.Students[index].tag.push(this.Students[index].inputTag);


    
console.log(this.nuevo);


  }

  //toggle the icon plus to icon minus
  clicking(e: any) {
    //console.log(e);
    const { path, target } = e;
    //console.log(
    [...path[2].querySelector('.dropdownlist')?.classList].includes('open');
    //);

    const dropEl = path[2].querySelector('.dropdownlist');
    //
    if (![...dropEl.classList].includes('open')) {
      //no open
      //console.log('if');
      //console.log(target.classList);
      target.classList.replace('fa-plus', 'fa-minus');
      //console.log(target.classList);

      return dropEl.classList.add('open');
    }
    target.classList.replace('fa-minus', 'fa-plus');
    return dropEl.classList.remove('open');
  }
}
