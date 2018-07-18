import { Injectable } from '@angular/core';

declare var Notification: any;

@Injectable()
export class NotificationService {

    constructor() { }

    public notify(titulo: string, corpo: string) {
        // let opcoes = { body: corpo, icon: "../../assets/image/warning.jpg" };
        let opcoes = { body: corpo };
        if (!("Notification" in window)) {
            alert("Este navegador não suporta notificações.");
        } else if (Notification.permission === "granted") {
            let notification = new Notification(titulo, opcoes);
            console.log(notification);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    let notification = new Notification(titulo, opcoes);
                    console.log(notification);
                }
            });
        }
    }

    public allowNotify(): Boolean {
        let valid = false;
        if (!("Notification" in window)) {
            alert("Este navegador não suporta notificações.");
        } else if (Notification.permission === "granted") {
            valid = true;
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    valid = true;
                }
            });
        }
        return valid;
    }

}