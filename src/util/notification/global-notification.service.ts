import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Rx';
import { WebsocketService } from '../../providers/websocket-notification/websocket.service';


@Injectable()
export class GlobalNotificationService {

    public messages: Subject<string>;

    constructor(websocketService: WebsocketService) {
        this.messages = <Subject<string>>websocketService
            .connect("ws://54.94.208.183:8085/socket")
            .map((response: MessageEvent): string => {
                console.log(response);

                let data = response.data
                return data;
            });
    }

}