import { Injectable } from '@angular/core';
import { Usuario } from '../../view-model/usuario/usuario';
import { SuperService } from '../../providers/super-service/super.service';
import { TaskProcess } from '../../view-model/task-process/task-process';
import { UrlService } from '../../providers/new_url-service/url.service';
import { HolderService } from '../../providers/holder/holder.service';
import { Usuario_N } from '../../view-model/usuario/usuario_n';

@Injectable()
export class LoginService extends SuperService {

    constructor(public urlService: UrlService,
        public holderService: HolderService) {
        super(holderService);
    }

    public entrar(usuario: Usuario): Promise<TaskProcess> {
        let _data: { task: string, input: { type: string, login: string, senha: string }, executor: string };
        _data = { task: "AUTH", input: { type: "auth", login: usuario.matricula, senha: usuario.senha }, executor: "IONIC - Mobile" };
        this.infoResquest = {
            rqst: "post",
            command: "task/queue",
            _data: _data,
            timeout: 60000
        };
        return this.urlService
            .request(this.infoResquest)
            .then(response => {
                return response as TaskProcess
            })
            .catch(super.handleError);
    }

    public gettask(id: String): Promise<any> {
        this.infoResquest = {
            rqst: "get",
            command: "task/",
            _data: id,
            timeout: 10000
        }
        return this.urlService
            .request(this.infoResquest)
            .then(resposta => {
                return resposta as TaskProcess;
            });
    }

    public entrarMock(usuario: Usuario): boolean {
        if (usuario.matricula === "1" && usuario.senha === "1") {
            return true;
        } else {
            return false;
        }
    }

    public entrarnewauth(usuario: Usuario): Promise<boolean> {
        console.log(usuario);
        return Promise.resolve(true);
    }

    public getnewuserauth(): Promise<Usuario_N> {
        let usuario_N: Usuario_N;
        // usuario_N = {
        //     id: "1234",
        //     matricula: "G0034481",
        //     nome: "Fabio Henrique Clem da Silva",
        //     email: null,
        //     cpf: null,
        //     dt_nascimento: null,
        //     senha: null,
        //     area: null,
        //     perfis: null
        // }

        usuario_N = {
            id: "1234",
            matricula: "G0034481",
            nome: "Fabio Henrique Clem da Silva",
            email: "fabioh.silva@telefonica.com",
            cpf: "08110367909",
            dt_nascimento: "10/10/2010",
            senha: null,
            area: "CO",
            perfis: "DEV"
        }

        return Promise.resolve(usuario_N);
    }


}