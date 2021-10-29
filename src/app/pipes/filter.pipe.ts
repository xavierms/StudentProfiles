import { Pipe, PipeTransform } from '@angular/core';
import { student } from '../interfaces/student';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: Array<any>, arg: string): any[] {
    const resultStudent = [];
    for (const student of value) {
      if (
        student.firstName.toUpperCase().indexOf(arg.toUpperCase()) > -1 ||
        student.lastName.toUpperCase().indexOf(arg.toUpperCase()) > -1 
      ) {
        resultStudent.push(student);
      }
    }
    return resultStudent;
  }
}
