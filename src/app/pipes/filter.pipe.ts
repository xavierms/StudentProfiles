import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: Array<any>, arg: string): any[] {
    const resultStudent = [];
    for(const student of value){
      if(student.firstName.toUpperCase().indexOf((arg.toUpperCase())) > -1 ){
        resultStudent.push(student);
       console.log(arg);
      };
    };
    return resultStudent;
  }

}
