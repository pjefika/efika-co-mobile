import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({ selector: '[serialMask]' })
export class SerialMaskDirective {
    constructor(public ngControl: NgControl) { }

    @HostListener('ngModelChange', ['$event'])
    onModelChange(event) {
        this.onInputChange(event);
    }

    public onInputChange(event) {
        let newVal = event;
        if (newVal.length > 24) {
            newVal = newVal.substring(0, newVal.length - 1);
        }
        this.ngControl.valueAccessor.writeValue(newVal);
    }

}