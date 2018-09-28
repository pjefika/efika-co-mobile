import { ValidMotivo } from "../validadormanobra/validmotivo";
import { ValidConclusao } from "../validadormanobra/validconclusao";
import { Stbs } from "../fulltestTV/stbs";

export class RespostaGenerica {
    analises?: ValidMotivo[];
    manobrar?: boolean;
    conclusao?: ValidConclusao;

    situacao?: string;
    stbs?: Stbs[];
    mensagem?: string;
}