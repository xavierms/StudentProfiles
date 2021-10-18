import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
    name: 'objToArray'
})

export class ObjToArrayPipe implements PipeTransform {
    transform(Obj: any = []):any {
        return Object.values(Obj);
    }
    // transfom(object: any = []):any{
    //     return Object.values(object);
    // }
}