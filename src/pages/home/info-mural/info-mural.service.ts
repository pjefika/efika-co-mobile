import { Injectable } from '@angular/core';
import { InfoMural } from '../../../view-model/mural/mural';

declare var require: any

@Injectable()
export class InfoMuralService {

    constructor() { }

    public getInfoMuralMock(): Promise<InfoMural[]> {
        let info: InfoMural[] = require("../../../assets/mocks/mural/info-mural.json");
        return Promise.resolve(info);
    }
}