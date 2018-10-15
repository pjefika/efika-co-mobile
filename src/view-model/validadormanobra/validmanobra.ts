import { ValidMotivo } from "./validmotivo";
import { ValidConclusao } from "./validconclusao";

export class ValidManobra {
    analises: ValidMotivo[];
    manobrar: boolean;
    conclusao: ValidConclusao;
}