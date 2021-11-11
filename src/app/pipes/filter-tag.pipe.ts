import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTag'
})
export class FilterTagPipe implements PipeTransform {

  transform(value: Array<any>, arg: string): any[] {
    const resultTag= [];
    for (const student of value) {
   if(student.tags == 0){

     if ( student.tags.toUpperCase().indexOf(arg.toUpperCase()) > -1 ) {
       
      }{
        resultTag.push(student);
  
      }
   }
  }
  return resultTag;
  }
}
