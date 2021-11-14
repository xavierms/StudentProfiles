import { Component } from '@angular/core';

import { StudentService } from './services/student.service';
import { student } from './interfaces/student';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'StudentProfiles';
  filterStudent = '';
  filterTags = '';
  nuevo: string = '';
  Students: student[] = [];
  Tags: string[] = [];
  taggs: any[] = [];

  constructor(private StudentService: StudentService) {}
  ngOnInit(): void {
    this.searchStudent('');
  }
 //search students
  searchStudent(studentParam: string) {
    this.StudentService.GetStudents().subscribe((StudentsSubs) => {
      const { students } = StudentsSubs;
      this.Students = students;
      this.Students = students.filter((studentFilter) =>
        studentFilter.firstName
          .toLowerCase()
          .includes(studentParam.toLowerCase())
      );
      //obtener promedio
      this.Students.map((st) => {
        st.avg =
          st.grades.reduce((a, b) => Number(a) + Number(b), 0) /
          st.grades.length;
        return st;
      }); //
      return this.Students;
    });
  }
 //add to tags
  addTag() {
    // this.Tags.push(this.nuevo);
    this.Students.forEach((st) => {
      st.tag.push(this.nuevo);
    });

    console.log(this.nuevo);
    console.log(this.Tags);

    //no permite insertar si no hay valores.
    if (this.nuevo.trim().length === 0) {
      return;
    }
    // this.Students.student.tag.push(this.nuevo);
    // console.log(this.tags);

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
