/**
 * Objeto que irá conter todas as informações para se realizar um request.
 * rqst: POST/GET.
 * command: qual comando será feito.
 * _data: dado a ser passado.
 * otherUrl: se for alguma url que não está mapeada em nosso json.
 * timeout: tempo de espera do request.
 * gettoken: informa para pegar o token (Authorization) do request
 * havetoken: informa se request possui token, caso sim o mesmo esta na HolderService -> headerToken
 */
export class InfoRequest {
    rqst: string;
    command: string;
    _data?: any;
    otherUrl?: string;
    timeout: number;
    gettoken?: boolean;
    havetoken?: boolean;
}