import { Component } from '@angular/core';
import { Student } from './interfaces/student';
import { StudentService } from './services/student.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private StudentService: StudentService) {
    this.StudentService.GetStudents().subscribe(StudentsSubs => {
      this.Students = StudentsSubs;
    console.log(this.Students);
   
    });
   
  }
  
  title = 'StudentProfiles';
 
  Students: Student[] = [];
  filterStudent = '';

  
  clicking(e: any) {
    console.log(e);
    const { path, target } = e;
    console.log(
      [...path[2].querySelector('.dropdownlist')?.classList].includes('open')
    );
    const dropEl = path[2].querySelector('.dropdownlist');
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
 //obtener promedio
  StudentAverage = this.Students.map((st)=>{
    st.avg = st.grades.reduce( (a, b) =>  Number(a) + Number(b), 0 ) / st.grades.length; 
    return st

  })


  
  ngOnInit(): void {

 
  }
}


