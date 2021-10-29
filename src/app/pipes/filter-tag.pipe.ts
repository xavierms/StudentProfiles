import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTag'
})
export class FilterTagPipe implements PipeTransform {

  transform(value: Array<any>, arg: string): any[] {
    const resultTag= [];
    for (const tag of value) {
   
   if ( tag.tags.toUpperCase().indexOf(arg.toUpperCase()) > -1 ) {
    resultTag.push(tag);
     
    }
    else if (arg.length === 0) {
      value = value;
      console.log(value.length);
    }
  }
  return resultTag;
  }
}
