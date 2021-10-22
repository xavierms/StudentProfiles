import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'objToArray'
})

export class ObjToArrayPipe implements PipeTransform {
    transform(value: any = [], ...args: any[]):any {
        return Object.values(value);
    }
    // transfom(object: any = []):any{
    //     return Object.values(object);
    // }
}