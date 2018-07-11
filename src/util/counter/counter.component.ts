import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'counter-component',
    templateUrl: 'counter.component.html'
})

export class CounterComponent implements OnInit {

    @Input() timer: number;

    constructor() { }

    ngOnInit() {
        this.validcounter();
    }

    private validcounter() {
        if (this.timer) { }
    }

}