import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'macmask'
})

export class MacMaskPipe implements PipeTransform {

    transform(value: any): any {
        let newVal = value;
        let r = /([a-f0-9]{2})([a-f0-9]{2})/i, str = newVal.replace(/[^a-f0-9]/ig, "")
        while (r.test(str)) {
            str = str.replace(r, '$1' + ':' + '$2');
        }
        newVal = str.slice(0, 17);
        return newVal;
    }

}