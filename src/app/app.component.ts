import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { StudentService } from './services/student.service';
import { student} from './interfaces/student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'StudentProfiles';
  filterStudent  : string = '';
  filterTags     : string = '';
  Students       : student[] = [];


  constructor(private StudentService: StudentService,
    private FormBuilder: FormBuilder) {}
 
  hayError   : boolean  = false;

  ngOnInit(): void {
    // this.Students
    // .pipe(debounceTime(300))
    // .subscribe( valor => {
    //   console.log('Debouncer:',valor);
    //   this.onDebounce.emit(valor)
      
    // });
    this.getStudent();
    
  }
 
  formAddTags = this.FormBuilder.group({
    tag: ['', [Validators.required]],
  });
  formSearchTags = this.FormBuilder.group({
    tagsName: ['', [Validators.required]],
  });
  formSearchStudents = this.FormBuilder.group({
    firstName: ['', [Validators.required]],
  });
  //search students
  getStudent() {
    this.StudentService.GetStudents().subscribe((Students) => {
      const { students } = Students;
      students.forEach(student =>{
        student.tag =[]; 
      })

      this.Students = students
      console.log(this.Students)
      this.getAverage();
     
      
    });
  }
  searchStudents(){
    this.StudentService.GetStudents().subscribe((Students)=>{
      const { students } = Students;
      console.log(students);
      
      console.log(
       this.Students = this.formSearchStudents.controls.firstName.value.toLowerCase());
    })
  }
  getAverage(){
    //obtener promedio
      this.Students.map((st) => {
        st.avg =
          st.grades.reduce((a, b) => Number(a) + Number(b), 0) /
          st.grades.length;
        return st;
      });
  }
  // searchTag() {
  //   this.StudentService.GetStudents().subscribe((StudentsSubs) => {
  //     const { students } = StudentsSubs;
  //     this.Students = students.filter((studentFilter) =>
  //       studentFilter.tag.includes(this.filterTags.toLowerCase())
  //     );
  //   });
  // }

  //add to tags
  addTag(studentIndex: string) {
   //debugger
    //no permite insertar si no hay valores.
    if (this.formAddTags.controls.tag.value.trim().length === 0 ||  this.Students[Number( studentIndex) -1].tag.indexOf(this.formAddTags.controls.tag.value ) !== -1 ) {
      return;
    }
  
  this.Students[Number( studentIndex) -1].tag.push(this.formAddTags.controls.tag.value);
 
  

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
