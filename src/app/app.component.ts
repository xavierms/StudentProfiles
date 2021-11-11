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

  constructor(private StudentService: StudentService) {
    this.StudentService.GetStudents().subscribe((StudentsSubs) => {
      this.Students = StudentsSubs.students;

      console.log(
        (this.Students = StudentsSubs.students.filter((item) =>
          item.firstName
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
      }); //
      return this.Students;
    });
  }
  ngOnInit(): void {}

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
