import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[macMask]' })
export class MAcMaskDirective {

    constructor(public ngControl: NgControl) { }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event) {
        this.onInputChange(event);
    }

    public onInputChange(event) {
        let newVal = event;
        let r = /([a-f0-9]{2})([a-f0-9]{2})/i, str = newVal.replace(/[^a-f0-9]/ig, "")
        while (r.test(str)) {
            str = str.replace(r, '$1' + ':' + '$2');
        }
        newVal = str.slice(0, 17);
        this.ngControl.valueAccessor.writeValue(newVal);

    }

}