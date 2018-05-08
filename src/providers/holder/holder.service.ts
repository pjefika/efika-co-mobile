import { Cadastro } from "../../view-model/cadastro/cadastro";
import { Injectable } from "@angular/core";
import { Certification } from "../../view-model/certification/certification";

@Injectable()
export class HolderService {

    /**
    * Valida se é ambiente de Produção ou de QA
    * True para Mock.
    * False para Produção/QA - Vide link na UrlService.
    */
    public isMock: boolean = false;

    /**
    * Valida o Link se é Produção / QA
    * True para Link de Produção 
    * False para Link de QA
    */
    public isLinkProd: boolean = true;

    // Variavel para segurar informação se usuário está ou não logado.
    public estalogado: boolean;

    public showhidetab: boolean;

    // Segura a instância inserida
    public instancia: string;
    // Segura o Cadastro buscado pelo usuário
    public cadastro: Cadastro;
    // Segura o Fulltest realizado pelo usuário
    public certification: Certification;

    /**
    * Variavel de controle de menu do rodapé 
    * Para ativar e inativar botões deixando os mesmos ativos e inativos.
    */
    public tabCadastroAtivo: boolean = false;
    public tabFulltestAtivo: boolean = false;
    public tabHomeAtivo: boolean = true;

    // Lista de ONT's
    //public onts: Ont[];

    constructor() { }

}