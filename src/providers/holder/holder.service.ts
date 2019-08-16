import { Cadastro } from "../../view-model/cadastro/cadastro";
import { Injectable } from "@angular/core";
import { Certification } from "../../view-model/certification/certification";
import { UserFull } from "../../view-model/usuario/userfull";
import { RespostaGenerica } from "../../view-model/resposta/resposta-generica";
import { Valids } from "../../view-model/fulltest/validacao";
import { ProbSolucao } from "../../view-model/fulltest/prob_solucao";

@Injectable()
export class HolderService {

    /**
    * Valida se é ambiente de Produção ou de QA
    * True para Mock.
    * False para Produção/QA - Vide link na UrlService.
    */
    public isMock: boolean = true;

    /**
    * Valida o Link se é Produção / QA
    * True para Link de Produção 
    * False para Link de QA
    */
    public isLinkProd: boolean = true;

    // Variavel para segurar informação se usuário está ou não logado.
    public estalogado: boolean;

    public showhidetab: boolean;

    // Segura o usuario buscado
    public user: UserFull;

    // Segura a instância inserida
    public instancia: string;
    // Segura o Cadastro buscado pelo usuário
    public cadastro: Cadastro;
    // Segura o Fulltest realizado pelo usuário
    public certification: Certification;
    // Segura o ip local da rede conectada
    public myip: string;

    public validManobra: RespostaGenerica;

    public certificationTV: RespostaGenerica;

    public configBHSVlans: Valids[];

    public probSolucao: ProbSolucao[];

    /**
    * Variavel de controle de menu do rodapé 
    * Para ativar e inativar botões deixando os mesmos ativos e inativos.
    */
    public tabCadastroAtivo: boolean = false;
    public tabFulltestAtivo: boolean = false;
    public tabHomeAtivo: boolean = true;

    public btnFazFulltestAtivo: boolean = false;

    // Lista de ONT's
    //public onts: Ont[];

    /**
    * Para os request de GET task 
    */
    public rtimeout: number = 15000;
    public rcount: number = 20;

    public emManutencao: boolean = false;

    public validipspublicandprivate: boolean = false;

    public validchangeBHS: boolean;

    public headerToken: string;

    public errorneedfkid: boolean = false;

    public instanciaBuscada: string;
    
    constructor() { }

}