import { Pipe, PipeTransform } from "@angular/core/";

@Pipe({ name: 'beautifying' })
export class KeyBeautifyingPipe implements PipeTransform {

    transform(value: string) {
        if (value == "rede") {
            return "Inventário de Rede"
        }
        if (value == "linha") {
            return "Informações de Linha"
        }
        if (value == "radius") {
            return "Informações Radius"
        }
        if (value == "servicos") {
            return "Informações de Serviço"
        }

        if (value) {

            if (value.length < 4) {
                return value.toUpperCase()
            }

            let arr: string[] = [];
            value.split('').forEach(element => {
                if (element == element.toUpperCase() && isNaN(Number(element))) {
                    element = " " + element
                }
                arr.push(element);
            });
            return arr.join("").charAt(0).toUpperCase() + arr.join("").slice(1);
        }
        return value;
    }

}

@Pipe({ name: 'capitalize' })
export class Capitalize implements PipeTransform {

    transform(value: string) {
        if (value) {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }
        return value;
    }

}