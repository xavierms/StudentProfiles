import { Component } from '@angular/core';

import { StudentService } from './services/student.service';
import { student, Student } from './interfaces/student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'StudentProfiles';
  Students: student[] = [];
  filterStudent = '';
  filterTags = '';
  // clearInput ='';
  tags:string[]=[];
  nuevo:string ='';


  constructor(private StudentService: StudentService) {
    this.StudentService.GetStudents().subscribe(StudentsSubs => {
      this.Students = StudentsSubs.students;
      //obtener promedio
      this.Students.map((st) => {
        st.avg =
          st.grades.reduce((a, b) => Number(a) + Number(b), 0) /
          st.grades.length;
        return st;
      });//
    });
  }
  ngOnInit(): void {}

  addTag(){
    // this.Students.forEach(element => {
    //no permite insertar si no hay valores.
    
      if(this.nuevo.trim().length === 0){
  return;
      }
  this.tags.push(this.nuevo);
  console.log(this.tags);
  console.log(this.nuevo);
      
    // });

//   }
//   Search() {
//     if (this.nuevo.length > 0) {
//       this.tags = this.tags.filter(res => {
//         return res.toLowerCase().match(this.nuevo.toLowerCase());
//       })
//     }
//     else if (this.nuevo.length === 0) {
//       this.tags = this.tags;
//       console.log(this.tags.length);
//     }
 }
  clicking(e: any) {
    console.log(e);
    const { path, target } = e;
    console.log(
      [...path[2].querySelector('.dropdownlist')?.classList].includes('open')
    );

    const dropEl = path[2].querySelector('.dropdownlist');
    //
    if (![...dropEl.classList].includes('open')) {
      //no open
      console.log('if');
      console.log(target.classList);
      target.classList.replace('fa-plus', 'fa-minus');
      console.log(target.classList);

      return dropEl.classList.add('open');
    }
    target.classList.replace('fa-minus', 'fa-plus');
    return dropEl.classList.remove('open');
  }
}
